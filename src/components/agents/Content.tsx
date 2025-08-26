"use client";

import { useState } from "react";
import TypewriterText from "../TypewriterText";

export default function AgentContent() {
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const content: string[] = [

    "The rise of DLMM (Dynamic Liquidity Market Maker) pools in DeFi has created new opportunities for Liquidity Providers (LPs) to earn high returns, but it also introduces challenges such as impermanent loss, high volatility, and the need for real-time management.",
    "Traditional tools often fail to meet the demands of DLMM environments, particularly in addressing impermanent loss and high volatility. The ELIZA DLMM Plugin solves these issues by leveraging real-time data streams and AI-driven analytics to enable precise and automated liquidity management.",
    "The ELIZA DLMM Plugin combines several key features:",
    "Advanced Analytics: Real-time market and sentiment analysis to guide decision-making. For example, the plugin identifies tokens with sudden volume spikes and correlates them with positive sentiment trends on Twitter to uncover profitable opportunities.",
    "Automated Bot Functions: Integration with self-custody wallets and rule-based strategies. The bot can automatically reallocate liquidity to higher APY pools during periods of volatility, reducing the need for manual intervention.",
    "Dynamic Execution: Ensures optimal positioning during market fluctuations by executing timely liquidity reallocations and token swaps.",
    "In addition, the Aither System complements the ELIZA plugin by providing a robust communication framework for AI agents. This system enables collaborative and dynamic strategy refinement, enhancing decision-making in complex multi-agent liquidity management scenarios.",
    "Together, these components form a powerful ecosystem designed to address the challenges and complexities of DLMM environments effectively.",
    "Remember, the sky is only the beginning."
    
  ];

  const handleParagraphComplete = () => {
    if (currentParagraph < content.length - 1) {
      setCurrentParagraph((prev) => prev + 1);
    }
  };

  return (
    <div className="space-y-4 max-w-3xl">
      {content.map((paragraph, index) => (
        <div key={index} className="text-white">
          {index === currentParagraph && (
            <TypewriterText
              text={paragraph}
              onComplete={handleParagraphComplete}
              typingDuration={0.5}
            />
          )}
          {index < currentParagraph && <p>{paragraph}</p>}
        </div>
      ))}
    </div>
  );
}
