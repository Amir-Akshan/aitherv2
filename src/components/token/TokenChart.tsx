"use client";

import { useState, useEffect, useRef } from "react";

interface TokenChartProps {
  selectedToken: string;
  tokenData: {
    name: string;
    symbol: string;
    price: number;
    marketCap: number;
    decimals: number;
    supply: number;
  } | null;
}

interface ChartData {
  timestamp: number;
  price: number;
  volume: number;
}

export default function TokenChart({ selectedToken, tokenData }: TokenChartProps) {
  const [timeframe, setTimeframe] = useState("1h");
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const timeframes = ["1m", "5m", "15m", "1h", "4h", "1d", "1w"];

  // Buscar dados reais da API GMGN
  const fetchChartData = async (tokenAddress: string, timeframe: string) => {
    try {
      const query = `
        query GetPumpFunChartData($address: String!, $timeframe: String!) {
          Solana {
            DEXTrades(
              where: {
                Trade: {
                  Dex: { ProtocolName: { is: "pump" } }
                  Buy: {
                    Currency: {
                      MintAddress: { is: $address }
                    }
                  }
                }
                Transaction: { Result: { Success: true } }
              }
              orderBy: { ascending: Block_Time }
              limit: { count: 100 }
            ) {
              Block {
                Time
              }
              Trade {
                Buy {
                  Price
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
        body: JSON.stringify({
          query,
          variables: { 
            address: tokenAddress,
            timeframe: timeframe
          }
        })
      });

      const data = await response.json();
      
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

             return data.data.Solana.DEXTrades.map((trade: {
         Block: { Time: string };
         Trade: {
           Buy: { Price: number; PriceInUSD: number };
           Sell: { AmountInUSD: number };
         };
       }) => ({
        timestamp: new Date(trade.Block.Time).getTime(),
        price: trade.Trade.Buy.Price || 0,
        volume: trade.Trade.Sell.AmountInUSD || 0
      }));
    } catch (error) {
      console.error('Erro ao buscar dados do gráfico:', error);
      return [];
    }
  };

  // Função para calcular intervalos de tempo (mantida para referência futura)
  // const getIntervalMs = (tf: string) => {
  //   switch (tf) {
  //     case "1m": return 60 * 1000;
  //     case "5m": return 5 * 60 * 1000;
  //     case "15m": return 15 * 60 * 1000;
  //     case "1h": return 60 * 60 * 1000;
  //     case "4h": return 4 * 60 * 60 * 1000;
  //     case "1d": return 24 * 60 * 60 * 1000;
  //     case "1w": return 7 * 24 * 60 * 60 * 1000;
  //     default: return 60 * 60 * 1000;
  //   }
  // };

  useEffect(() => {
    if (selectedToken) {
      setLoading(true);
      // Buscar dados reais da API GMGN
      fetchChartData(selectedToken, timeframe).then((data) => {
        setChartData(data);
        setLoading(false);
      }).catch((error) => {
        console.error('Erro ao carregar dados do gráfico:', error);
        setLoading(false);
      });
    }
  }, [selectedToken, timeframe]);

  useEffect(() => {
    if (chartData.length > 0 && canvasRef.current) {
      drawChart();
    }
  }, [chartData, tokenData?.price]);

  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    if (chartData.length === 0) return;

    // Calculate price range
    const prices = chartData.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;

    // Calculate time range
    const times = chartData.map(d => d.timestamp);
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);
    const timeRange = maxTime - minTime;

    // Draw grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;

    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = (width / 10) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = (height / 5) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw price line
    ctx.strokeStyle = "#f97316";
    ctx.lineWidth = 2;
    ctx.beginPath();

    chartData.forEach((point, index) => {
      const x = ((point.timestamp - minTime) / timeRange) * width;
      const y = height - (((point.price - minPrice) / priceRange) * height);

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw candlesticks
    const candleWidth = width / chartData.length * 0.8;
    chartData.forEach((point) => {
      const x = ((point.timestamp - minTime) / timeRange) * width;
      
      // Simulate OHLC data
      const open = point.price * (1 + (Math.random() - 0.5) * 0.02);
      const high = Math.max(point.price, open) * (1 + Math.random() * 0.01);
      const low = Math.min(point.price, open) * (1 - Math.random() * 0.01);
      const close = point.price;

      const isGreen = close >= open;
      ctx.fillStyle = isGreen ? "#10b981" : "#ef4444";
      ctx.strokeStyle = isGreen ? "#10b981" : "#ef4444";

      const openY = height - (((open - minPrice) / priceRange) * height);
      const closeY = height - (((close - minPrice) / priceRange) * height);
      const highY = height - (((high - minPrice) / priceRange) * height);
      const lowY = height - (((low - minPrice) / priceRange) * height);

      // Draw wick
      ctx.beginPath();
      ctx.moveTo(x, highY);
      ctx.lineTo(x, lowY);
      ctx.stroke();

      // Draw body
      const bodyHeight = Math.max(1, Math.abs(closeY - openY));
      const bodyY = Math.min(openY, closeY);
      ctx.fillRect(x - candleWidth / 2, bodyY, candleWidth, bodyHeight);
    });

    // Draw price labels
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "12px Arial";
    ctx.textAlign = "right";

    for (let i = 0; i <= 5; i++) {
      const price = minPrice + (priceRange / 5) * i;
      const y = (height / 5) * (5 - i);
      ctx.fillText(`$${price.toFixed(6)}`, width - 10, y + 4);
    }
  };

  const formatPrice = (price: number) => {
    if (price < 0.0001) return `$${price.toExponential(4)}`;
    return `$${price.toFixed(6)}`;
  };

  const getPriceChange = () => {
    if (chartData.length < 2) return { change: 0, percentage: 0 };
    
    const firstPrice = chartData[0].price;
    const lastPrice = chartData[chartData.length - 1].price;
    const change = lastPrice - firstPrice;
    const percentage = (change / firstPrice) * 100;
    
    return { change, percentage };
  };

  const priceChange = getPriceChange();

  return (
    <div className="space-y-4">
      {/* Header with token info and controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {tokenData && (
            <>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                {tokenData.symbol.slice(0, 2)}
              </div>
              <div>
                <div className="text-lg font-semibold text-white">{tokenData.name}</div>
                <div className="text-sm text-gray-400">{tokenData.symbol}</div>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {/* Timeframe selector */}
          <div className="flex bg-white/10 rounded-lg p-1">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  timeframe === tf
                    ? "bg-orange-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Price info */}
      {tokenData && (
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
          <div>
            <div className="text-2xl font-bold text-white">
              {formatPrice(tokenData.price)}
            </div>
            <div className={`text-sm ${priceChange.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {priceChange.change >= 0 ? '+' : ''}{formatPrice(priceChange.change)} ({priceChange.percentage >= 0 ? '+' : ''}{priceChange.percentage.toFixed(2)}%)
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Market Cap</div>
            <div className="text-white font-medium">
              ${(tokenData.marketCap / 1000).toFixed(1)}K
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="relative">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : selectedToken ? (
          <div className="bg-black/20 rounded-lg p-4">
            <canvas
              ref={canvasRef}
              width={800}
              height={400}
              className="w-full h-96"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-96 text-gray-400">
            Select a token to view chart
          </div>
        )}
      </div>

      {/* Volume chart */}
      {chartData.length > 0 && (
        <div className="bg-black/20 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-400 mb-2">Volume</h4>
          <div className="flex items-end space-x-1 h-20">
            {chartData.slice(-20).map((point, index) => (
              <div
                key={index}
                className="flex-1 bg-orange-500/30 rounded-t"
                style={{
                  height: `${(point.volume / Math.max(...chartData.map(d => d.volume))) * 100}%`
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
