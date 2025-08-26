'use client'

import { useWallet } from '@/contexts/WalletContext';
import { ReactNode } from 'react';

export function RequireWallet({ children }: { children: ReactNode }) {
  const { connected, connect } = useWallet();

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl mb-4 text-white">Connect Wallet to Continue</h1>
        <button
          onClick={connect}
          className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          Connect Wallet
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
