import { Link } from "react-router-dom";
import { ArrowRight, Building2 } from "lucide-react";
import GlassCard from "../common/GlassCard.jsx";
import GreenImpactBadge from "../common/GreenImpactBadge.jsx";

export default function DepartmentCard({ department }) {
  return (
    <GlassCard hover className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#050816] text-white">
          <Building2 className="h-6 w-6" aria-hidden="true" />
        </div>
        <GreenImpactBadge points={department.points} compact />
      </div>
      <h3 className="mt-5 text-2xl font-black text-[#050816]">{department.name}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#6B7280]">{department.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {department.supportFocus.map((item) => (
          <span key={item} className="rounded-full bg-[#F3FFE9] px-3 py-1 text-xs font-bold text-[#123D1D]">
            {item}
          </span>
        ))}
      </div>
      <Link to={department.route} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#74F32B] px-4 py-2.5 text-sm font-bold text-[#123D1D]">
        Open portal
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </GlassCard>
  );
}
