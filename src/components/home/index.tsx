"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import SoraDefinition from "./SoraDefinition";
import SoraLabsDefinition from "./SoraLabDefinition";

export default function AnimatedDefinition() {
  const [showSoraLabs, setShowSoraLabs] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDeleting(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSoraComplete = () => {
    setShowSoraLabs(true);
  };

  return (
    <div className="p-4 flex items-center justify-center w-full">
      <AnimatePresence mode="wait">
        {!showSoraLabs ? (
          <motion.div
            key="sora"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SoraDefinition
              isDeleting={isDeleting}
              onComplete={handleSoraComplete}
            />
          </motion.div>
        ) : (
          <motion.div
            key="sora-labs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <SoraLabsDefinition />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
