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
};

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
}: ProductProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRated, setIsRated] = useState(false);
  const [userRating, setUserRating] = useState<"like" | "dislike" | null>(null);

  const handleBuyNow = () => {
    setIsDetailsOpen(false);
  };

  const handleRate = (rating: "like" | "dislike") => {
    if (isRated) return;
    setUserRating(rating);
    setIsRated(true);
  };

  const { addToCart } = useCart();


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
                  KES {discountedPrice}
                </span>
                <span className="line-through text-muted-foreground text-sm">
                  KES {price}
                </span>
              </>
            ) : (
              <span className="font-bold">KES {price}</span>
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
            >
              Buy Now
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
    setIsDetailsOpen(false); // close modal
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
