'use client'
import { useAccount, useConnect, useDisconnect } from '@starknet-react/core'
import { useState } from 'react'

export function WalletConnection() {
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { address, isConnected, isConnecting } = useAccount()
  const [isLoading, setIsLoading] = useState(false)

  const handleConnect = async () => {
    setIsLoading(true)
    try {
      const braavosConnector = connectors.find(
        connector => connector.id === 'braavos'
      )
      if (braavosConnector) {
        await connect({ connector: braavosConnector })
      }
    } catch (error) {
      console.error('Connection failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = async () => {
    await disconnect()
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-green-600">
          Connected: {formatAddress(address)}
        </span>
        <button
          onClick={handleDisconnect}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting || isLoading}
      className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
    >
      {isConnecting || isLoading ? 'Connecting...' : 'Connect Braavos Wallet'}
    </button>
  )
}