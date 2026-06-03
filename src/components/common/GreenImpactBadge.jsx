import { Zap } from "lucide-react";
import { shortNumber } from "../../utils/routes.js";

export default function GreenImpactBadge({ points, compact = false }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-[#74F32B]/40 px-3 py-1.5 text-xs font-black text-[#123D1D]"
      style={{
        background: "rgba(116,243,43,0.15)",
        boxShadow: "0 0 18px rgba(116,243,43,0.22)",
      }}
    >
      <Zap className="h-3 w-3 text-[#74F32B]" aria-hidden />
      {shortNumber(points)}
      {compact ? " GIP" : " Green Impact Points"}
    </span>
  );
}
