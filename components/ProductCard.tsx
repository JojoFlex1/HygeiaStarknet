"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ThumbsUp, ThumbsDown, Sparkles } from "lucide-react";
import { useCart } from "@/app/context/cart-context";
import { Contract, CallData, Abi, cairo } from "starknet";
import { useConnect, useAccount, useContract } from "@starknet-react/core";
import hygeniaAbi from "@/lib/hygeia.json";
import BigNumber from "bignumber.js";

type ProductProps = {
  image: string;
  title: string;
  description: string;
  price: number;
  category?: string;
  discountedPrice?: number;
  tokensEarned?: number;
  isSponsored?: boolean;
  views?: number;
  orderId?: number; // Add order ID for the product
};

// Replace with your actual contract address
const CONTRACT_ADDRESS = "0x73751fd6a6a217b3f52b4ba2e24617cd4f2af760547448ab5d4ff507136f7a8";

export default function ProductCard({
  image,
  title,
  description,
  price,
  category = "Health",
  discountedPrice,
  tokensEarned = 10,
  isSponsored = false,
  views = 2400,
  orderId = Math.floor(Math.random() * 1000000), // Generate random order ID or pass from props
}: ProductProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRated, setIsRated] = useState(false);
  const [userRating, setUserRating] = useState<"like" | "dislike" | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const { account, address } = useAccount();
  const { addToCart } = useCart();

  // Create contract instance
  const { contract } = useContract({
    abi: hygeniaAbi as Abi,
    address: CONTRACT_ADDRESS,
  });

  const handleBuyNow = async () => {
    if (!account || !contract) {
      alert("Please connect your wallet first");
      return;
    }

    console.log("Contract Address:", CONTRACT_ADDRESS);
    console.log("Account Address:", address);
    console.log("Contract Instance:", contract);

    setIsProcessingPayment(true);

    try {
      const finalPrice = discountedPrice || price;
      
      // Convert price to appropriate format using BigNumber like in the transfer example
      const amountToTransfer = BigNumber(finalPrice).multipliedBy(10 ** 18).toNumber();
      
      // Create contract instance for multicall operations
      const contractInstance = new Contract(hygeniaAbi as Abi, CONTRACT_ADDRESS, account);
      
      // Populate calls using the contract instance (similar to transfer example)
      const paymentCall = contractInstance.populate('make_payment', [orderId, cairo.uint256(amountToTransfer)]);
      
      // You can add more calls here if needed, for example:
      // const tokenRewardCall = contractInstance.populate('award_tokens', [address, tokensEarned]);
      
      // Create multicall array similar to the transfer example
      const multicall = [
        {
          contractAddress: CONTRACT_ADDRESS,
          entrypoint: 'make_payment',
          calldata: paymentCall.calldata
        },
        // Add more calls if needed:
        // {
        //   contractAddress: CONTRACT_ADDRESS,
        //   entrypoint: 'award_tokens',
        //   calldata: tokenRewardCall.calldata
        // },
      ];

      // Execute multicall using account.execute() like in the transfer example
      const result = await account.execute(multicall);
      
      console.log("Multicall result:", result);
      
      // Wait for transaction confirmation
      const receipt = await account.waitForTransaction(result.transaction_hash);
      
      // Check transaction success
      const isSuccessful = 
        ('execution_status' in receipt && receipt.execution_status === "SUCCEEDED") ||
        ('finality_status' in receipt && (receipt.finality_status === "ACCEPTED_ON_L2" || receipt.finality_status === "ACCEPTED_ON_L1"));

      if (isSuccessful) {
        setIsDetailsOpen(false);
        alert(`Payment successful! Transaction hash: ${result.transaction_hash}`);
        
        // Optionally add to cart after successful payment
        addToCart({
          title,
          price: finalPrice,
          image,
          quantity: 1,
        });
      } else {
        throw new Error("Transaction failed or was reverted");
      }
    } catch (error: unknown) {
      console.error("Payment failed:", error);
      
      let errorMessage = "Unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = String(error.message);
      }
      
      alert(`Payment failed: ${errorMessage}`);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleRate = (rating: "like" | "dislike") => {
    if (isRated) return;
    setUserRating(rating);
    setIsRated(true);
  };

  return (
    <>
      <Card className="product-card flex flex-col w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-lg border border-pink-500 dark:border-pink-400 bg-white dark:bg-gray-900 text-black dark:text-white scale-95">
        {isSponsored && (
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-pink-500 to-pink-400 text-white text-xs py-1 px-2 flex items-center justify-center font-medium z-20">
            <Sparkles className="h-3 w-3 mr-1" />
            Sponsored Product
          </div>
        )}
        <div className="relative w-full h-48">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>

        <div className="p-4 space-y-2 flex flex-col flex-grow">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg">{title}</h3>
            <span className="flex items-center gap-1 text-pink-500 font-semibold text-sm">
              ✦ {tokensEarned}
            </span>
          </div>

          <div className="flex gap-2 items-baseline">
            {discountedPrice ? (
              <>
                <span className="text-pink-600 dark:text-pink-400 font-bold">
                  ${discountedPrice}
                </span>
                <span className="line-through text-muted-foreground text-sm">
                  ${price}
                </span>
              </>
            ) : (
              <span className="font-bold">${price}</span>
            )}
            <Badge variant="outline" className="ml-auto border-pink-400 text-pink-600 dark:text-pink-300">
              {category}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 dark:text-gray-300">{description}</p>

          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              className="w-full border-pink-500 text-pink-600 hover:bg-pink-100 dark:hover:bg-pink-900"
              onClick={() => setIsDetailsOpen(true)}
            >
              View Details
            </Button>
            <Button
              className="w-full bg-pink-600 hover:bg-pink-700 text-white dark:bg-pink-500 dark:hover:bg-pink-600"
              onClick={handleBuyNow}
              disabled={isProcessingPayment}
            >
              {isProcessingPayment ? "Processing..." : "Buy Now"}
            </Button>
          </div>
        </div>
      </Card>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[425px] dark:bg-gray-900 dark:text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {title}
              {isSponsored && (
                <Badge className="border-none bg-pink-500 text-white">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Sponsored
                </Badge>
              )}
            </DialogTitle>
            <DialogDescription className="dark:text-gray-300">
              Get full details and reviews.
            </DialogDescription>
          </DialogHeader>

          <img src={image} alt={title} className="w-full h-48 object-cover rounded-md" />
          <p className="text-sm dark:text-gray-300">{description}</p>

          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2">
              <Badge variant="outline" className="border-pink-400 text-pink-600 dark:text-pink-300">{category}</Badge>
              <Badge variant="outline" className="border-pink-400 text-pink-600 dark:text-pink-300">
                ♥ {(views / 1000).toFixed(1)}K views
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={userRating === "like" ? "default" : "outline"}
                size="sm"
                onClick={() => handleRate("like")}
                disabled={isRated}
                className={
                  userRating === "like"
                    ? "bg-pink-600 hover:bg-pink-700 text-white"
                    : "border-pink-500 text-pink-600 dark:text-pink-300 hover:bg-pink-50 dark:hover:bg-pink-800"
                }
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button
                variant={userRating === "dislike" ? "default" : "outline"}
                size="sm"
                onClick={() => handleRate("dislike")}
                disabled={isRated}
                className={
                  userRating === "dislike"
                    ? "bg-pink-600 hover:bg-pink-700 text-white"
                    : "border-pink-500 text-pink-600 dark:text-pink-300 hover:bg-pink-50 dark:hover:bg-pink-800"
                }
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDetailsOpen(false)}
              className="border-pink-500 text-pink-600 hover:bg-pink-100 dark:hover:bg-pink-900"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                addToCart({
                  title,
                  price: discountedPrice || price,
                  image,
                  quantity: 1,
                });
                setIsDetailsOpen(false);
              }}
              className="bg-pink-600 hover:bg-pink-700 text-white dark:bg-pink-500 dark:hover:bg-pink-600"
            >
              Add to Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
