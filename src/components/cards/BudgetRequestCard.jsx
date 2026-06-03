import GreenImpactBadge from "../common/GreenImpactBadge.jsx";
import GlassCard from "../common/GlassCard.jsx";
import StatusBadge from "../common/StatusBadge.jsx";

export default function BudgetRequestCard({ request }) {
  return (
    <GlassCard hover className="p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full bg-[#F3FFE9] px-3 py-1 text-xs font-bold text-[#123D1D]">{request.department}</span>
        <StatusBadge status={request.status} />
      </div>
      <h3 className="mt-4 text-xl font-black text-[#050816]">{request.title}</h3>
      <p className="mt-2 text-sm text-[#6B7280]">{request.materials}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-white/70 p-4">
          <p className="text-xs font-bold text-[#6B7280]">Amount requested</p>
          <p className="mt-1 text-lg font-black text-[#050816]">{request.amount}</p>
        </div>
        <div className="rounded-2xl bg-white/70 p-4">
          <p className="text-xs font-bold text-[#6B7280]">Urgency</p>
          <p className="mt-1 text-lg font-black text-[#050816]">{request.urgency}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <GreenImpactBadge points={request.points} compact />
        {["Approve", "Reject", "Request Clarification", "View Project"].map((action, index) => (
          <button
            key={action}
            type="button"
            className={`rounded-full border px-3 py-2 text-xs font-bold transition ${
              index === 0 ? "border-[#74F32B] bg-[#74F32B] text-[#123D1D]" : "border-[#123D1D]/10 bg-white/70 text-[#123D1D] hover:border-[#74F32B]/70"
            }`}
          >
            {action}
          </button>
        ))}
      </div>
    </GlassCard>
  );
}
