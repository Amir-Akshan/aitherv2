"use client";

import { useState, useEffect } from "react";

interface TokenDataProps {
  selectedToken: string;
  setSelectedToken: (token: string) => void;
  tokenData: TokenInfo | null;
  setTokenData: (data: TokenInfo | null) => void;
}

interface TokenInfo {
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

export default function TokenData({ selectedToken, setSelectedToken, tokenData, setTokenData }: TokenDataProps) {
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searching, setSearching] = useState(false);

  // Tokens da Pump.fun - será preenchido automaticamente
  const [pumpfunTokens, setPumpfunTokens] = useState<Array<{
    mintAddress: string;
    symbol: string;
    name: string;
    priceUSD: number;
    volume: number;
  }>>([]);
  const SOL_ADDRESS = "So11111111111111111111111111111111111111112";

  const fetchTokenData = async (tokenAddress: string) => {
    try {
      // Query GraphQL para buscar dados do token na Pump.fun
      const query = `
        query GetPumpFunTokenData($address: String!) {
          Solana {
            DEXTrades(
              limitBy: { by: Trade_Buy_Currency_MintAddress, count: 1 }
              limit: { count: 1 }
              where: {
                Trade: {
                  Buy: {
                    Currency: {
                      MintAddress: { is: $address }
                    }
                  }
                }
                Transaction: { Result: { Success: true } }
              }
            ) {
              Trade {
                Buy {
                  Price(maximum: Block_Time)
                  PriceInUSD(maximum: Block_Time)
                  Currency {
                    Name
                    Symbol
                    MintAddress
                    Decimals
                  }
                }
                Sell {
                  AmountInUSD
                }
              }
            }
          }
        }
      `;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos timeout

      const response = await fetch('https://graphql.bitquery.io', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BITQUERY_API_KEY || ''}`,
        },
        body: JSON.stringify({
          query,
          variables: { address: tokenAddress }
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      return data.data.Solana.DEXTrades[0]?.Trade;
    } catch (error) {
      console.error('Erro ao buscar dados do token:', error);
      return null;
    }
  };

  const fetchPumpFunTokens = async () => {
    try {
      const query = `
        query GetTopPumpFunTokens {
          Solana {
            DEXTrades(
              limitBy: { by: Trade_Buy_Currency_MintAddress, count: 1 }
              limit: { count: 20 }
              orderBy: { descending: Trade_Sell_AmountInUSD }
              where: {
                Trade: {
                  Buy: {
                    Currency: {
                      MintAddress: { notIn: ["11111111111111111111111111111111", "So11111111111111111111111111111111111111112"] }
                    }
                    PriceInUSD: { gt: 0.000001 }
                  }
                  Sell: { AmountInUSD: { gt: "1" } }
                }
                Transaction: { Result: { Success: true } }
              }
            ) {
              Trade {
                Buy {
                  Currency {
                    MintAddress
                    Symbol
                    Name
                  }
                  PriceInUSD
                }
                Sell {
                  AmountInUSD
                }
              }
            }
          }
        }
      `;

      const response = await fetch('https://graphql.bitquery.io', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BITQUERY_API_KEY || ''}`,
        },
        body: JSON.stringify({ query })
      });

      const data = await response.json();
      
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      const tokens = data.data.Solana.DEXTrades.map((trade: any) => ({
        mintAddress: trade.Trade.Buy.Currency.MintAddress,
        symbol: trade.Trade.Buy.Currency.Symbol || 'TOKEN',
        name: trade.Trade.Buy.Currency.Name || 'Pump.fun Token',
        priceUSD: trade.Trade.Buy.PriceInUSD || 0,
        volume: trade.Trade.Sell.AmountInUSD || 0
      }));

      setPumpfunTokens(tokens);
      return tokens;
    } catch (error) {
      console.error('Erro ao buscar tokens da Pump.fun:', error);
      // Fallback para tokens conhecidos
      const fallbackTokens = [
        {
          mintAddress: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",
          symbol: "TOKEN1",
          name: "Fallback Token 1",
          priceUSD: 0,
          volume: 0
        },
        {
          mintAddress: "Axdr6x6FWiTGKkFN3moWyQ18qR4U9o4z3568EAnppump",
          symbol: "TOKEN2",
          name: "Fallback Token 2",
          priceUSD: 0,
          volume: 0
        },
        {
          mintAddress: "9SfaFqiMrt7EjALNivrksGNFXb2c7vnR7ScM7pzmdaos",
          symbol: "TOKEN3",
          name: "Fallback Token 3",
          priceUSD: 0,
          volume: 0
        }
      ];
      setPumpfunTokens(fallbackTokens);
      return fallbackTokens;
    }
  };

  const fetchTokenMetadata = async (tokenAddress: string) => {
    try {
      const query = `
        query GetPumpFunTokenMetadata($address: String!) {
          Solana {
            TokenSupplyUpdates(
              where: {
                TokenSupplyUpdate: {
                  Currency: {
                    MintAddress: { is: $address }
                  }
                }
                Instruction: {
                  Program: {
                    Address: { is: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P" }
                    Method: { is: "create" }
                  }
                }
              }
              limit: { count: 1 }
            ) {
              TokenSupplyUpdate {
                Amount
                Currency {
                  Name
                  Symbol
                  MintAddress
                  Decimals
                  Uri
                }
              }
              Block {
                Time
              }
              Transaction {
                Signer
              }
            }
          }
        }
      `;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos timeout

      const response = await fetch('https://graphql.bitquery.io', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BITQUERY_API_KEY || ''}`,
        },
        body: JSON.stringify({
          query,
          variables: { address: tokenAddress }
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      return data.data.Solana.TokenSupplyUpdates[0];
    } catch (error) {
      console.error('Erro ao buscar metadata do token:', error);
      return null;
    }
  };

  const searchToken = async (tokenAddress: string) => {
    setSearching(true);
    setError("");

    try {
      const tokenData = await fetchTokenData(tokenAddress);
      const tokenMetadata = await fetchTokenMetadata(tokenAddress);
      
      if (tokenData) {
        // Se temos dados do token mas não metadata, criar token básico
        const newToken: TokenInfo = {
          name: tokenData.Buy.Currency.Name || "Custom Token",
          symbol: tokenData.Buy.Currency.Symbol || "TOKEN",
          mintAddress: tokenAddress,
          price: tokenData.Buy.Price || 0,
          priceUSD: tokenData.Buy.PriceInUSD || 0,
          marketCap: (tokenData.Buy.PriceInUSD || 0) * 1000000, // Supply estimado
          volume24h: tokenData.Sell.AmountInUSD || 0,
          liquidity: 0,
          creator: "Unknown",
          creationTime: new Date().toISOString(),
          decimals: tokenData.Buy.Currency.Decimals || 9,
          supply: 1000000 // Supply estimado
        };

        setTokens([newToken]);
        setSelectedToken(tokenAddress);
        setTokenData(newToken);
        setError(""); // Limpar erro se sucesso
      } else {
        setError("Token não encontrado ou sem dados de trading. Verifique se o endereço está correto.");
      }
    } catch (error) {
      console.error('Erro ao buscar token:', error);
      if (error instanceof Error) {
        setError(`Erro ao buscar token: ${error.message}`);
      } else {
        setError("Erro desconhecido ao buscar token");
      }
    } finally {
      setSearching(false);
    }
  };

  const loadTokens = async () => {
    setLoading(true);
    setError("");

    try {
      const tokenList: TokenInfo[] = [];

      // Primeiro, buscar tokens populares da Pump.fun
      const pumpTokens = await fetchPumpFunTokens();

      // Buscar dados dos tokens da Pump.fun
      for (const tokenInfo of pumpTokens) {
        try {
          const tokenData = await fetchTokenData(tokenInfo.mintAddress);
          const tokenMetadata = await fetchTokenMetadata(tokenInfo.mintAddress);
          
          if (tokenData && tokenMetadata) {
            tokenList.push({
              name: tokenInfo.name,
              symbol: tokenInfo.symbol,
              mintAddress: tokenInfo.mintAddress,
              price: tokenData.Buy.Price || 0,
              priceUSD: tokenData.Buy.PriceInUSD || 0,
              marketCap: (tokenData.Buy.PriceInUSD || 0) * (tokenMetadata.TokenSupplyUpdate.Amount || 0),
              volume24h: tokenInfo.volume,
              liquidity: 0,
              creator: tokenMetadata.Transaction.Signer || "Pump.fun",
              creationTime: tokenMetadata.Block.Time || "",
              decimals: tokenMetadata.TokenSupplyUpdate.Currency.Decimals || 9,
              supply: tokenMetadata.TokenSupplyUpdate.Amount || 0
            });
          }
        } catch (error) {
          console.error(`Erro ao carregar token ${tokenInfo.mintAddress}:`, error);
        }
      }

      // Buscar dados do SOL
      try {
        const solData = await fetchTokenData(SOL_ADDRESS);
        const solMetadata = await fetchTokenMetadata(SOL_ADDRESS);
        
        if (solData && solMetadata) {
          tokenList.push({
            name: "Solana",
            symbol: "SOL",
            mintAddress: SOL_ADDRESS,
            price: solData.Buy.Price || 0,
            priceUSD: solData.Buy.PriceInUSD || 0,
            marketCap: (solData.Buy.PriceInUSD || 0) * (solMetadata.TokenSupplyUpdate.Amount || 0),
            volume24h: solData.Sell.AmountInUSD || 0,
            liquidity: 0,
            creator: "Solana Foundation",
            creationTime: solMetadata.Block.Time || "",
            decimals: solMetadata.TokenSupplyUpdate.Currency.Decimals || 9,
            supply: solMetadata.TokenSupplyUpdate.Amount || 0
          });
        }
      } catch (error) {
        console.error('Erro ao carregar SOL:', error);
      }

      setTokens(tokenList);
      
      // Selecionar o primeiro token por padrão
      if (tokenList.length > 0) {
        setSelectedToken(tokenList[0].mintAddress);
        setTokenData(tokenList[0]);
      }
    } catch (error) {
      setError("Erro ao carregar dados dos tokens da Pump.fun");
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTokens();
  }, []);

  const handleTokenSelect = (token: TokenInfo) => {
    setSelectedToken(token.mintAddress);
    setTokenData(token);
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatPrice = (price: number) => {
    if (price < 0.0001) return `$${price.toExponential(4)}`;
    return `$${price.toFixed(6)}`;
  };

  return (
    <div className="space-y-4">
      {/* Pump.fun Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-orange-500 mb-2">Pump.fun</h2>
        <p className="text-sm text-gray-400">Token Analytics</p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Pesquisar token por endereço..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && searchInput.trim()) {
              searchToken(searchInput.trim());
            }
          }}
          className="w-full px-4 py-2 pl-10 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
        />
        <button
          onClick={() => searchInput.trim() && searchToken(searchInput.trim())}
          disabled={searching || !searchInput.trim()}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500 disabled:opacity-50"
        >
          {searching ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </button>
      </div>

      {/* Quick Search Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => {
            setSearchInput("6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P");
            searchToken("6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P");
          }}
          className="px-3 py-1 text-xs bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
        >
          Buscar Token Específico
        </button>
        <button
          onClick={() => {
            setSearchInput("");
            loadTokens();
          }}
          className="px-3 py-1 text-xs bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
        >
          Pump.fun Tokens
        </button>
        <button
          onClick={() => {
            console.log('API Key:', process.env.NEXT_PUBLIC_BITQUERY_API_KEY ? 'Configurada' : 'Não configurada');
            setError("Verificando API...");
            // Teste simples da API
            fetch('https://graphql.bitquery.io', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BITQUERY_API_KEY || ''}`,
              },
              body: JSON.stringify({
                query: `{
                  Solana {
                    DEXTrades(
                      limit: { count: 1 }
                    ) {
                      Trade {
                        Buy {
                          Currency {
                            MintAddress
                            Symbol
                            Name
                          }
                        }
                      }
                    }
                  }
                }`
              })
            })
            .then(response => response.json())
            .then(data => {
              console.log('API Response:', data);
              if (data.errors) {
                setError(`Erro API: ${data.errors[0].message}`);
              } else if (data.data && data.data.Solana && data.data.Solana.DEXTrades) {
                setError("✅ API funcionando! Conectado com sucesso ao Bitquery.");
              } else {
                setError("⚠️ API conectada, mas resposta inesperada. Verifique os logs.");
              }
            })
            .catch(error => {
              console.error('API Error:', error);
              setError(`Erro de conexão: ${error.message}`);
            });
          }}
          className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Testar API
        </button>
      </div>

      {/* Tokens List */}
      <div>
        <h3 className="text-lg font-medium text-white mb-3">Pump.fun Tokens</h3>
        
        {(loading || searching) ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            <span className="ml-2 text-gray-400">
              {searching ? "Pesquisando token..." : "Carregando tokens da Pump.fun..."}
            </span>
          </div>
        ) : error ? (
          <div className="text-red-400 text-center py-4">{error}</div>
        ) : (
          <div className="space-y-3">
            {tokens.map((token) => (
              <div
                key={token.mintAddress}
                onClick={() => handleTokenSelect(token)}
                className={`p-3 rounded-lg border cursor-pointer transition-all hover:bg-white/5 ${
                  selectedToken === token.mintAddress 
                    ? 'border-orange-500 bg-orange-500/10' 
                    : 'border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {token.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-medium text-white">{token.name}</div>
                      <div className="text-sm text-gray-400">{token.symbol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-white">{formatPrice(token.price)}</div>
                    <div className="text-sm text-gray-400">{formatNumber(token.marketCap)}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400">24h Vol:</span>
                    <div className="text-white">{formatNumber(token.volume24h)}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Liquidity:</span>
                    <div className="text-white">{formatNumber(token.liquidity)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Token Details */}
      {tokenData && (
        <div className="mt-6 p-6 bg-white/5 rounded-lg border border-white/20">
          {/* Header Section */}
          <div className="text-center mb-6">
            {/* Profile Picture */}
            <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {tokenData.symbol.slice(0, 2).toUpperCase()}
            </div>
            
            {/* Token Name and Symbol */}
            <h3 className="text-2xl font-bold text-white mb-1">${tokenData.symbol}</h3>
            <p className="text-lg text-gray-300 mb-2">{tokenData.name}</p>
            <p className="text-sm text-gray-400">Pump.fun Token</p>
          </div>

          {/* Key Metrics Panel */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-xs text-gray-400 mb-1">MCAP</div>
              <div className="text-lg font-bold text-white">{formatNumber(tokenData.marketCap)}</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-xs text-gray-400 mb-1">24H VOL</div>
              <div className="text-lg font-bold text-white">{formatNumber(tokenData.volume24h)}</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-xs text-gray-400 mb-1">PRICE</div>
              <div className="text-lg font-bold text-white">{formatPrice(tokenData.price)}</div>
            </div>
          </div>

          {/* Contract Address */}
          <div className="mb-4 p-3 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Contract Address:</span>
              <button 
                onClick={() => navigator.clipboard.writeText(tokenData.mintAddress)}
                className="text-orange-400 hover:text-orange-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <div className="text-sm text-white font-mono mt-1">
              {tokenData.mintAddress.slice(0, 8)}...{tokenData.mintAddress.slice(-8)}
            </div>
          </div>

          {/* Creator and Additional Info */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Created by:</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-white font-mono">
                  {tokenData.creator.slice(0, 8)}...{tokenData.creator.slice(-8)}
                </span>
                <button 
                  onClick={() => navigator.clipboard.writeText(tokenData.creator)}
                  className="text-orange-400 hover:text-orange-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Creation Time:</span>
              <span className="text-sm text-white">
                {new Date(tokenData.creationTime).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Supply:</span>
              <span className="text-sm text-white">
                {tokenData.supply.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Decimals:</span>
              <span className="text-sm text-white">{tokenData.decimals}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
