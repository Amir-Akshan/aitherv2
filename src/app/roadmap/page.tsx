import Roadmap from "@/components/roadmap/Roadmap";

export default function RoadmapPage() {
  return (
    <div className="flex items-center justify-center py-12 min-h-full">
      <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
          <h1 className="text-xl font-bold mb-2 text-white">Roadmap</h1>
          <p className="text-sm text-gray-300 mb-8">
            This roadmap shows our current plans, but we&apos;re just getting
            started. All completed features are actively maintained and updated.
          </p>
          <Roadmap />
        </div>
      </div>
    </div>
  );
}
