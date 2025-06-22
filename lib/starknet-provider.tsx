'use client'
import { StarknetConfig, publicProvider } from '@starknet-react/core'
import { mainnet, sepolia } from '@starknet-react/chains'
import { braavos } from '@starknet-react/core'

const chains = [mainnet, sepolia]
const provider = publicProvider()
const connectors = [braavos()]

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  return (
    <StarknetConfig
      chains={chains}
      provider={provider}
      connectors={connectors}
      autoConnect={false}
    >
      {children}
    </StarknetConfig>
  )
}