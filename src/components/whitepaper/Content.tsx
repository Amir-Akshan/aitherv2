"use client";

import { useState, useRef } from "react";
import { useWallet } from "@/contexts/WalletContext";

export default function TokenForm() {
  const { connected, connect } = useWallet();
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const [description, setDescription] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [telegram, setTelegram] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected) {
      connect();
      return;
    }
    console.log({
      name,
      ticker,
      description,
      buyAmount,
      website,
      twitter,
      telegram,
      selectedImage,
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Create a canvas to resize the image
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Set maximum dimensions (80x80 for the circular container)
          const maxSize = 80;
          let { width, height } = img;
          
          // Calculate new dimensions maintaining aspect ratio
          if (width > height) {
            height = (height * maxSize) / width;
            width = maxSize;
          } else {
            width = (width * maxSize) / height;
            height = maxSize;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Draw the resized image
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Convert to base64
          const resizedImage = canvas.toDataURL('image/jpeg', 0.8);
          setSelectedImage(resizedImage);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center text-white h-full w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-6 bg-transparent"
      >
        {/* Upload logo */}
        <div className="flex justify-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <div 
            onClick={handleImageClick}
            className="w-20 h-20 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 cursor-pointer hover:bg-white/20 transition-colors overflow-hidden"
          >
            {selectedImage ? (
              <img 
                src={selectedImage} 
                alt="Uploaded logo" 
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-2xl text-white">+</span>
            )}
          </div>
        </div>

        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-white/40 transition-colors"
        />

        {/* Ticker */}
        <input
          type="text"
          placeholder="Ticker"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          className="w-full p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-white/40 transition-colors"
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-white/40 transition-colors"
        />

        {/* Buy Amount */}
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Initial buy amount (optional)"
            value={buyAmount}
            onChange={(e) => setBuyAmount(e.target.value)}
            className="flex-1 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-white/40 transition-colors"
          />
          <span className="text-gray-300">SOL</span>
        </div>
        <p className="text-xs text-gray-400">
          Amount of SOL to buy initially (0-10 SOL)
        </p>

        {/* Website */}
        <input
          type="url"
          placeholder="Website link (optional)"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-white/40 transition-colors"
        />

        {/* Twitter/X */}
        <input
          type="url"
          placeholder="Twitter/X link (optional)"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
          className="w-full p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-white/40 transition-colors"
        />

        {/* Telegram */}
        <input
          type="url"
          placeholder="Telegram link (optional)"
          value={telegram}
          onChange={(e) => setTelegram(e.target.value)}
          className="w-full p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-white/40 transition-colors"
        />

        {/* Submit */}
        <button
          type="submit"
          className={`w-full py-3 rounded-full text-white font-semibold transition-colors shadow-lg ${
            connected 
              ? 'bg-orange-500 hover:bg-orange-600' 
              : 'bg-orange-500 hover:bg-orange-600'
          }`}
        >
          {connected ? 'Create' : 'Connect Wallet First'}
        </button>
      </form>
    </div>
  );
}
