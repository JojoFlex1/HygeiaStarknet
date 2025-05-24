'use client'
import { useAccount, useSendTransaction } from '@starknet-react/core'
import { useState } from 'react'

// Utility function to convert ETH to wei (18 decimals)
function parseEther(value: string): string {
  const [integer, decimal = ''] = value.split('.')
  const paddedDecimal = decimal.padEnd(18, '0').slice(0, 18)
  return BigInt(integer + paddedDecimal).toString()
}

export function TransferETH() {
  const { address } = useAccount()
  const { sendAsync } = useSendTransaction({})
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [txHash, setTxHash] = useState('')

  const handleTransfer = async () => {
    if (!address || !recipient || !amount) return

    setIsLoading(true)
    try {
      const amountWei = parseEther(amount)
      
      const result = await sendAsync([{
        contractAddress: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7', // ETH contract
        entrypoint: 'transfer',
        calldata: [recipient, amountWei, '0']
      }])
      

      setTxHash(result.transaction_hash)
      console.log('Transfer successful:', result)
    } catch (error) {
      console.error('Transfer failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold mb-4">Transfer ETH</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Recipient Address</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Amount (ETH)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.001"
            step="0.001"
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={handleTransfer}
          disabled={!recipient || !amount || isLoading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Sending...' : 'Send ETH'}
        </button>
        {txHash && (
          <div className="p-2 bg-green-100 rounded">
            <p className="text-sm">Transaction Hash: {txHash}</p>
            <a
              href={`https://starkscan.co/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline text-sm"
            >
              View on StarkScan
            </a>
          </div>
        )}
      </div>
    </div>
  )
}