"use client";

import { motion } from "framer-motion";
import { RoadmapItem } from "@/types/roadmap";

const roadmapData: RoadmapItem[] = [
  {
    id: "zen-1",
    title: "Aither/Eva Framework",
    description: "Initial release of the Eva Framework.",
    quarter: "Q1",
    year: 2025,
    status: "completed",
  },
  {
    id: "toolkit-1",
    title: "Toolkit",
    description: "Release of the Toolkit framework.",
    quarter: "Q1",
    year: 2025,
    status: "completed",
  },
  {
    id: "solana-toolkit-1",
    title: "Solana Toolkit Release",
    description: "Full release of Solana-specific AI tools and integrations.",
    quarter: "Q1",
    year: 2025,
    status: "in-progress",
  },
  {
    id: "hana-1",
    title: "Mine Launch",
    description:
      "Launch of Mine, our AI Twitter agent powered by Eva and Toolkit.",
    quarter: "Q1",
    year: 2025,
    status: "in-progress",
  },
  {
    id: "consumer-product-1",
    title: "Consumer Product Release",
    description:
      "Consumer facing product release; product will be voted on by the community.",
    quarter: "Q2",
    year: 2025,
    status: "planned",
  },
];

const statusColors = {
  completed: "bg-sora-secondary",
  "in-progress": "bg-sora-light",
  planned: "bg-gray-400",
};

const legendItems = [
  { status: "completed" as const, label: "Completed" },
  { status: "in-progress" as const, label: "In Progress" },
  { status: "planned" as const, label: "Planned" },
];

export default function Roadmap() {
  return (
    <div className="relative mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4 mb-12"
      >
        <div className="flex items-center justify-center gap-6">
          {legendItems.map((item) => (
            <div key={item.status} className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  statusColors[item.status]
                } border border-sora-secondary/20`}
              />
              <span className="text-xs text-white">{item.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="absolute left-4 md:left-1/2 top-12 bottom-0 w-[2px] bg-sora-accent" />

      <div className="space-y-16">
        {roadmapData.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex ${
                isLeft
                  ? "justify-start md:justify-start"
                  : "justify-start md:justify-end"
              } items-center`}
            >
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2">
                <div
                  className={`w-4 h-4 rounded-full ${
                    statusColors[item.status]
                  } border-4 border-white shadow-sm`}
                />
              </div>

              <div
                className={`w-full md:w-[calc(50%-3rem)] pl-12 ${
                  isLeft ? "md:pr-12 md:pl-0" : "md:pl-12"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">
                      {item.quarter} {item.year}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-white">{item.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
