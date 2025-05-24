'use client'
import { useAccount, useReadContract, useSendTransaction } from '@starknet-react/core'
import { useState, useEffect } from 'react'
import { Contract } from 'starknet'

// Example contract ABI (replace with your contract's ABI)
// Note: ABI must be declared as const for proper typing
const contractABI = [
  {
    name: 'get_balance',
    type: 'function',
    inputs: [],
    outputs: [{ name: 'balance', type: 'core::felt252' }],
    state_mutability: 'view'
  },
  {
    name: 'increase_balance',
    type: 'function',
    inputs: [{ name: 'amount', type: 'core::felt252' }],
    outputs: [],
    state_mutability: 'external'
  }
] as const

const CONTRACT_ADDRESS = '0x...' // Replace with your actual contract address

export function ContractInteraction() {
  const { address } = useAccount()
  const { sendAsync } = useSendTransaction({})
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [refetchTrigger, setRefetchTrigger] = useState(0)

  // Read contract balance
  const { data: balance, isLoading: isBalanceLoading, refetch } = useReadContract({
    functionName: 'get_balance',
    args: [],
    abi: contractABI,
    address: CONTRACT_ADDRESS,
    enabled: !!CONTRACT_ADDRESS && CONTRACT_ADDRESS !== '0x...'
  })

  // Refetch balance when refetchTrigger changes
  useEffect(() => {
    if (refetchTrigger > 0) {
      refetch()
    }
  }, [refetchTrigger, refetch])

  const handleIncreaseBalance = async () => {
    if (!amount || !address) return
    
    setIsLoading(true)
    try {
      const result = await sendAsync([{
        contractAddress: CONTRACT_ADDRESS,
        entrypoint: 'increase_balance',
        calldata: [amount]
      }])
      
      console.log('Transaction successful:', result)
      
      // Trigger balance refetch after a short delay
      setTimeout(() => {
        setRefetchTrigger(prev => prev + 1)
      }, 2000)
      
    } catch (error) {
      console.error('Transaction failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (CONTRACT_ADDRESS === '0x...') {
    return (
      <div className="p-4 border border-yellow-300 rounded-lg bg-yellow-50">
        <h3 className="font-semibold mb-2">Contract Interaction</h3>
        <p className="text-yellow-700">Please update CONTRACT_ADDRESS with your actual contract address.</p>
      </div>
    )
  }

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold mb-4">Contract Interaction</h3>
      <div className="space-y-4">
        <div>
          <p><strong>Current Balance:</strong> {
            isBalanceLoading ? 'Loading...' : (balance?.toString() || '0')
          }</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Amount to Add</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter amount"
          />
        </div>
        <button
          onClick={handleIncreaseBalance}
          disabled={!amount || isLoading || !address}
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Increase Balance'}
        </button>
        {!address && (
          <p className="text-sm text-red-600">Please connect your wallet first</p>
        )}
      </div>
    </div>
  )
}