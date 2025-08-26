"use client";

import { useState } from "react";
import TypewriterText from "../TypewriterText";
import { AnimatePresence, motion } from "framer-motion";

export default function SoraLabsDefinition() {
  const [currentLine, setCurrentLine] = useState(0);
  const lines = [
    "アイサーラボ",
    "AitherLabs",
    "[Ai-sa-ra-bo] · noun",
    "Empowering Solana with AI-Driven On-Chain Intelligence.",
    "AitherLabs is a network of intelligent agents transforming Solana with real-time insights, analytics, and security.",
    "Inspiration from Eliza (a16z)",
    "Close beta, request on Twitter",
    "Explore Documentation"
  ];

  const handleLineComplete = () => {
    if (currentLine < lines.length - 1) {
      setCurrentLine((prev) => prev + 1);
    }
  };

  return (
    <div className="space-y-2"> 
      {lines.map((line, index) => (
        <div
          key={line}
          className={`${
            index === 0 || index === 1
              ? "text-2xl font-medium text-white"
              : index === 2
              ? "text-sm text-white"
              : "text-sm text-white"
          }`}
        >
          {index === currentLine && (
            <TypewriterText
              text={line}
              onComplete={handleLineComplete}
              typingDuration={0.5}
            />
          )}
          {index < currentLine && line}
          {index === 2 && currentLine > 2 && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full border-t border-white/40 my-4 origin-left"
              />
            </AnimatePresence>
          )}
        </div>
      ))}
    </div>
  );
}
