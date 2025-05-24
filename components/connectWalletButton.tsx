"use client"
import React from 'react'
import { Wallet, CheckCircle, AlertCircle } from 'lucide-react'
import { useState } from "react"
import { useAccount, useConnect, useDisconnect } from '@starknet-react/core'

export default function ConnectWalletButton() {
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { address, isConnected, isConnecting } = useAccount()
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const connectWallet = async () => {
    try {
      setError('')
      setIsLoading(true)
      
      // Find Braavos connector specifically
      const braavosConnector = connectors.find(
        connector => connector.id === 'braavos'
      )
      
      if (!braavosConnector) {
        setError('Braavos wallet not detected. Please install Braavos extension.')
        return
      }

      // This will open the Braavos extension popup
      await connect({ connector: braavosConnector })
      
    } catch (err: any) {
      console.error('Connection failed:', err)
      if (err.message?.includes('User rejected')) {
        setError('Connection was rejected by user')
      } else if (err.message?.includes('not installed')) {
        setError('Braavos wallet not installed. Please install the extension.')
      } else {
        setError('Failed to connect wallet. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const disconnectWallet = async () => {
    try {
      setIsLoading(true)
      await disconnect()
      setError('')
    } catch (err) {
      console.error('Disconnect failed:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const isButtonLoading = isLoading || isConnecting

  // If wallet is connected, show connected state
  if (isConnected && address) {
    return (
      <div className="flex flex-col gap-2">
        <button
          onClick={disconnectWallet}
          disabled={isButtonLoading}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 px-6 rounded-full transition-colors duration-200 min-w-[200px]"
        >
          <CheckCircle size={20} />
          <span className="hidden sm:inline">Connected: {formatAddress(address)}</span>
          <span className="sm:hidden">Connected</span>
        </button>
        {/* <p className="text-xs text-gray-600 text-center">
          Click to disconnect wallet
        </p> */}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={connectWallet}
        disabled={isButtonLoading}
        className="flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-400 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-full transition-colors duration-200 min-w-[200px]"
      >
        {isButtonLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <Wallet size={20} />
            <span>Connect Wallet</span>
          </>
        )}
      </button>
      
      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-2 rounded">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
      
      {/* {!error && !isConnected && (
        <p className="text-xs text-gray-600 text-center">
          Click to open Braavos extension
        </p>
      )} */}
    </div>
  )
}