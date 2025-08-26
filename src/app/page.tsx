import AnimatedDefinition from "@/components/home";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
        <AnimatedDefinition />
      </div>
    </div>
  ); 
} 
 