"use client";

import { useState } from "react";
import TokenData from "./TokenData";
import TokenChart from "./TokenChart";

interface TokenData {
  name: string;
  symbol: string;
  mintAddress: string;
  price: number;
  priceUSD: number;
  marketCap: number;
  volume24h: number;
  liquidity: number;
  creator: string;
  creationTime: string;
  decimals: number;
  supply: number;
}

export default function TokenPage() {
  const [selectedToken, setSelectedToken] = useState<string>("");
  const [tokenData, setTokenData] = useState<TokenData | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
                       <div className="mb-8">
                 <h1 className="text-4xl font-bold text-orange-500 mb-2">AitherDex</h1>
                 <p className="text-gray-300">Pump.fun Token Analytics powered by Bitquery API</p>
               </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Primeira divisão - Menor (1/3 da largura) */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 h-fit">
                               <h2 className="text-xl font-semibold text-orange-400 mb-4">AitherDex</h2>
              <TokenData 
                selectedToken={selectedToken}
                setSelectedToken={setSelectedToken}
                tokenData={tokenData}
                setTokenData={setTokenData}
              />
            </div>
          </div>

          {/* Segunda divisão - Maior (2/3 da largura) */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 min-h-[600px]">
                                   <h2 className="text-xl font-semibold text-orange-400 mb-4">Pump.fun Price Chart</h2>
              <TokenChart 
                selectedToken={selectedToken}
                tokenData={tokenData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
