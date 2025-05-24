'use client'
import { useAccount, useBalance, useNetwork } from '@starknet-react/core'

// Utility function to format balance
function formatBalance(value: bigint | string, decimals: number = 18): string {
  const divisor = BigInt(10 ** decimals)
  const quotient = BigInt(value) / divisor
  const remainder = BigInt(value) % divisor
  
  if (remainder === 0n) {
    return quotient.toString()
  }
  
  const decimalStr = remainder.toString().padStart(decimals, '0')
  const trimmedDecimal = decimalStr.replace(/0+$/, '')
  
  return trimmedDecimal ? `${quotient}.${trimmedDecimal}` : quotient.toString()
}

export function WalletStatus() {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { data: balance } = useBalance({
    address,
    token: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7', // ETH token address
  })

  if (!isConnected || !address) {
    return (
      <div className="p-4 border border-gray-300 rounded-lg">
        <p className="text-gray-500">Wallet not connected</p>
      </div>
    )
  }

  return (
    <div className="p-4 border border-green-300 rounded-lg bg-green-50">
      <h3 className="font-semibold mb-2">Wallet Status</h3>
      <div className="space-y-2 text-sm">
        <p><strong>Address:</strong> {address}</p>
        <p><strong>Network:</strong> {chain.name}</p>
        {balance && (
          <p><strong>ETH Balance:</strong> {formatBalance(balance.value, balance.decimals)} ETH</p>
        )}
      </div>
    </div>
  )
}