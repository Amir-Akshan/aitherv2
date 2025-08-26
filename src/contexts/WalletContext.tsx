'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface WalletContextType {
  connected: boolean;
  wallet: any;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [wallet, setWallet] = useState<any>(null);

  useEffect(() => {
    // Check if Phantom wallet is installed
    const checkIfWalletIsConnected = async () => {
      try {
        const { solana } = window as any;
        
        if (solana?.isPhantom) {
          const response = await solana.connect({ onlyIfTrusted: true });
          setWallet(response);
          setConnected(true);
        }
      } catch (error) {
        console.log('Wallet not connected');
      }
    };

    // Listen for wallet connection changes
    const handleAccountChange = () => {
      setWallet(null);
      setConnected(false);
      console.log('Wallet disconnected externally');
    };

    checkIfWalletIsConnected();

    // Add event listeners
    const { solana } = window as any;
    if (solana?.isPhantom) {
      solana.on('accountChanged', handleAccountChange);
      solana.on('disconnect', handleAccountChange);
    }

    // Cleanup
    return () => {
      if (solana?.isPhantom) {
        solana.off('accountChanged', handleAccountChange);
        solana.off('disconnect', handleAccountChange);
      }
    };
  }, []);

  const connect = async () => {
    try {
      const { solana } = window as any;
      
      if (solana?.isPhantom) {
        const response = await solana.connect();
        setWallet(response);
        setConnected(true);
        console.log('Connected to Phantom wallet:', response.publicKey.toString());
      } else {
        alert('Phantom wallet is not installed. Please install it from https://phantom.app/');
      }
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  const disconnect = () => {
    try {
      // Phantom wallet doesn't have a native disconnect method
      // We just clear our local state
      setWallet(null);
      setConnected(false);
      console.log('Disconnected from Phantom wallet');
    } catch (error) {
      console.error('Error disconnecting from wallet:', error);
    }
  };

  return (
    <WalletContext.Provider value={{ connected, wallet, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
