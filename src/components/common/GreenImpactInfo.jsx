import { pointRules } from "../../data/mockData.js";
import GlassCard from "./GlassCard.jsx";

export default function GreenImpactInfo() {
  return (
    <GlassCard className="p-5">
      <h3 className="text-lg font-black text-[#050816]">How Green Impact Points work</h3>
      <p className="mt-2 text-sm leading-6 text-[#6B7280]">
        Points recognize the type and reach of each environmental contribution. Ideas are encouraged, direct campus action is highly visible, and Nyabihu District work reflects wider community impact.
      </p>
      <div className="mt-4 space-y-2">
        {pointRules.map((rule) => (
          <div key={rule.category} className="flex items-center justify-between gap-3 rounded-2xl bg-white/70 px-4 py-3">
            <span className="text-sm font-bold text-[#123D1D]">{rule.category}</span>
            <span className="text-sm font-black text-[#050816]">{rule.points}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
