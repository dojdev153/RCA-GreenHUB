const toneMap = {
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  Approved: "bg-[#74F32B]/20 text-[#123D1D] border-[#74F32B]/40",
  Featured: "bg-[#050816] text-white border-[#050816]",
  Testing: "bg-sky-100 text-sky-700 border-sky-200",
  Rejected: "bg-rose-100 text-rose-700 border-rose-200",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${toneMap[status] ?? "bg-white text-[#123D1D] border-[#123D1D]/10"}`}>
      {status}
    </span>
  );
}
