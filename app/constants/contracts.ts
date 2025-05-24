// constants/contracts.ts
import { ContractAddresses } from "../types/contracts";

export const CONTRACTS: ContractAddresses = {
  CONTRACT_ADDRESS: "0x...", // Replace with your Hygenia contract address
  TOKEN_ADDRESS: "0x...",    // Replace with your ERC20 token address
};

// Network configuration
export const NETWORK = "mainnet-alpha" as const; // or "goerli-alpha" for testnet

// Token decimals (usually 18 for most ERC20 tokens)
export const TOKEN_DECIMALS = 18;