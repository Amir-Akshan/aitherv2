import WhitepaperContent from "@/components/whitepaper/Content";

export default function Whitepaper() {
  return (
    <div className="flex min-h-full items-center justify-center py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
          <h1 className="text-xl font-bold mb-8 text-white text-center">Create</h1>
          <WhitepaperContent />
        </div>
      </div>
    </div>
  );
}
