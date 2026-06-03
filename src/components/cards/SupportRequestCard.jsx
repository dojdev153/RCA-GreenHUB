import GlassCard from "../common/GlassCard.jsx";
import StatusBadge from "../common/StatusBadge.jsx";

export default function SupportRequestCard({ request }) {
  return (
    <GlassCard hover className="p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full bg-[#F3FFE9] px-3 py-1 text-xs font-bold text-[#123D1D]">{request.department}</span>
        <StatusBadge status={request.status} />
      </div>
      <h3 className="mt-4 text-lg font-black text-[#050816]">{request.title}</h3>
      <p className="mt-2 text-sm font-semibold text-[#6B7280]">{request.project} / {request.requester}</p>
      <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3">
        <span className="text-xs font-bold text-[#6B7280]">Urgency</span>
        <span className="text-sm font-black text-[#123D1D]">{request.urgency}</span>
      </div>
    </GlassCard>
  );
}
