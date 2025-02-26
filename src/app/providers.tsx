'use client'

import { OnchainKitProvider } from '@coinbase/onchainkit'
import { base } from 'wagmi/chains' 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { coinbaseWallet } from 'wagmi/connectors'
import { baseSepolia } from 'wagmi/chains'



const wagmiConfig = createConfig({
  chains: [baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: 'UBIQ',
    }),
  ],
  ssr: true,
  transports: {
    [baseSepolia.id]: http(),
  },
})

const queryClient = new QueryClient()



export function Providers(props: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
    >
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          {props.children}
        </QueryClientProvider>
      </WagmiProvider>
    </OnchainKitProvider>
  )
}
