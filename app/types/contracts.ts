// types/contracts.ts
import { AccountInterface } from "starknet";

export interface WalletConnection {
  connection: any;
  account: AccountInterface | null;
  isConnected: boolean;
  isConnecting: boolean;
  connectWallet: () => Promise<any>;
  disconnectWallet: () => Promise<void>;
}

export interface PaymentResult {
  transactionHash: string;
  orderId: number;
  amount: bigint;
}

export interface PurchaseError extends Error {
  code?: string;
  reason?: string;
}

export interface ContractAddresses {
  CONTRACT_ADDRESS: string;
  TOKEN_ADDRESS: string;
}

export interface ProductInfo {
  id: string;
  price: number;
  name?: string;
  description?: string;
}