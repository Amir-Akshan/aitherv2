"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useWallet } from "@/contexts/WalletContext";

const navLinks = [
  { href: "/whitepaper", label: "Create" },
  { href: "/token", label: "Token" },
  { href: "https://aither-1.gitbook.io/aither/", label: "How It Works?", external: true },
  { href: "/docs", label: "Docs" },

  { href: "https://x.com/PyxisLabsAI", label: "X", external: true },
  { href: "https://discord.gg/pyxislabs", label: "Support", external: true },
  //{ href: "/roadmap", label: "Roadmap" },

];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { connected, connect, disconnect, wallet } = useWallet();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.getElementById("mobile-menu");
      const button = document.getElementById("mobile-menu-button");
      if (
        isMenuOpen &&
        nav &&
        !nav.contains(event.target as Node) &&
        !button?.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 w-full bg-sego backdrop-blur-md z-50 border-b border-sora-secondary/20">
      <nav className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-lg text-gray-700 transition-colors flex items-center"
        >
          <Image
            src="/logo3.png"
            alt="AitherLabs Logo"
            width={55}
            height={55}
            priority
          /> 
          AitherLabs
        </Link>

        <div className="hidden md:flex gap-8 text-sm items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              className={`transition-colors ${
                link.label === "Token" 
                  ? "text-orange-500 hover:text-orange-600" 
                  : "text-gray-700 hover:text-orange-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Wallet Connect Button */}
          <button
            onClick={connected ? disconnect : connect}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium text-sm ${
              connected 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
          >
            <svg
              className="w-4 h-4"
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
            {connected 
              ? (wallet as { publicKey?: { toString: () => string } })?.publicKey?.toString().slice(0, 4) + '...' + (wallet as { publicKey?: { toString: () => string } })?.publicKey?.toString().slice(-4)
              : 'Connect Wallet'
            }
          </button>
        </div>

        <button
          id="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg border-sora-secondary/20"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="absolute top-14 left-0 w-full bg-sego border-b border-sora-secondary/20 md:hidden"
          >
            <div className="flex flex-col p-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  className={`transition-colors ${
                    link.label === "Token" 
                      ? "text-orange-500 hover:text-orange-600" 
                      : "text-gray-700 hover:text-orange-500"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Wallet Connect Button */}
              <button
                onClick={() => {
                  if (connected) {
                    disconnect();
                  } else {
                    connect();
                  }
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium text-sm mt-4 ${
                  connected 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                <svg
                  className="w-4 h-4"
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
                {connected 
                  ? (wallet as { publicKey?: { toString: () => string } })?.publicKey?.toString().slice(0, 4) + '...' + (wallet as { publicKey?: { toString: () => string } })?.publicKey?.toString().slice(-4)
                  : 'Connect Wallet'
                }
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
