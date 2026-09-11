import { FileText } from "lucide-react";
import GlassCard from "../common/GlassCard.jsx";

export default function AnnouncementCard({ announcement }) {
  return (
    <GlassCard hover className="p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#74F32B]/20 text-[#123D1D]">
          <FileText className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[#6B7280]">{announcement.type}</p>
          <p className="text-sm font-semibold text-[#123D1D]">{announcement.date}</p>
        </div>
      </div>
      <h3 className="mt-4 text-xl font-black text-[#050816]">{announcement.title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#4B5563]">{announcement.body}</p>
      <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3">
        <span className="text-xs font-bold text-[#6B7280]">Author</span>
        <span className="text-sm font-black text-[#123D1D]">{announcement.author}</span>
      </div>
    </GlassCard>
  );
}
