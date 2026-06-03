import { Sprout } from "lucide-react";
import GlassCard from "./GlassCard.jsx";
import CTAButton from "./CTAButton.jsx";

export default function EmptyState({ title = "Nothing here yet", body = "New activity will appear here when the prototype state changes.", actionLabel, to }) {
  return (
    <GlassCard className="p-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#74F32B]/20 text-[#123D1D]">
        <Sprout className="h-7 w-7" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-xl font-bold text-[#050816]">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6B7280]">{body}</p>
      {actionLabel && to ? (
        <div className="mt-5">
          <CTAButton to={to}>{actionLabel}</CTAButton>
        </div>
      ) : null}
    </GlassCard>
  );
}
