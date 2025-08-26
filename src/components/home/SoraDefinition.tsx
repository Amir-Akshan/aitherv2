"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import TypewriterText from "../TypewriterText";
import CursorBlinker from "../CursorBlinker";

export default function SoraDefinition({
  isDeleting,
  onComplete,
}: {
  isDeleting: boolean;
  onComplete: () => void;
}) {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const lines = [
    "アイサー",
    "Aither",
    "[Ai-sa] ·noun",
    "Empowering Solana with AI-Driven On-Chain Intelligence.",
    "Smarter analytics",
    "Close beta, request on Twitter",
    "Read Our Whitepaper                                                       ",
    
  ];

  useEffect(() => {
    if (isDeleting) {
      setDisplayedLines(lines);
      setCurrentLine(lines.length - 1);
      setIsComplete(false);
    }
  }, [isDeleting]);

  useEffect(() => {
    if (isComplete && displayedLines.length === 0) {
      onComplete();
    }
  }, [isComplete, displayedLines, onComplete]);

  const handleLineComplete = () => {
    if (isDeleting) {
      setDisplayedLines((prev) => prev.filter((_, i) => i !== currentLine));
      if (currentLine > 0) {
        setCurrentLine((prev) => prev - 1);
      } else {
        setIsComplete(true);
      }
    } else {
      setDisplayedLines((prev) => [...prev, lines[currentLine]]);
      if (currentLine < lines.length - 1) {
        setCurrentLine((prev) => prev + 1);
      } else {
        setIsComplete(true);
      }
    }
  };

  return (
    <div className="space-y-2">
      {lines.map((line, index) => {
        const isPlainText =
          displayedLines.includes(line) &&
          (!isDeleting || index !== currentLine);

        const isTypingOrDeleting = index === currentLine && !isComplete;

        return (
          <div
            key={line}
            className={
              index === 0 || index === 1
                ? "text-2xl font-medium text-white"
                : index === 2
                ? "text-sm text-white"
                : "text-sm text-white"
            }
          >
            {isTypingOrDeleting && (
              <TypewriterText
                text={line}
                isDeleting={isDeleting}
                onComplete={handleLineComplete}
                typingDuration={0.5}
              />
            )}

            {isPlainText && (
              <span>
                {line}
                {index === lines.length - 1 && isComplete && !isDeleting && (
                  <CursorBlinker />
                )}
              </span>
            )}

            {index === 2 && (
              <AnimatePresence>
                {displayedLines.includes(lines[2]) && currentLine !== 2 && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full border-t border-white/40 my-4 origin-left"
                  />
                )}
              </AnimatePresence>
            )}
          </div>
        );
      })}
    </div>
  );
}
