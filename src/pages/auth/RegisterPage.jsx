import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, UserPlus } from "lucide-react";
import CTAButton from "../../components/common/CTAButton.jsx";
import GlassCard from "../../components/common/GlassCard.jsx";
import RoleCard from "../../components/common/RoleCard.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { roleOptions } from "../../data/mockData.js";
import { routeForRole } from "../../utils/routes.js";

export default function RegisterPage() {
  const { setRole } = useAuth();
  const [selectedRole, setSelectedRole] = useState("student");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setRole(selectedRole);
    navigate(routeForRole(selectedRole));
  }

  return (
    <main className="app-surface flex min-h-screen items-center justify-center px-4 py-10">
      <GlassCard className="w-full max-w-6xl p-6 sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="inline-flex items-center gap-2 text-[#050816]">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#74F32B] text-[#123D1D]">
              <Leaf className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-lg font-black">GreenHubRCA</span>
          </Link>
          <CTAButton to="/login" variant="secondary">Login</CTAButton>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#74F32B]/20 text-[#123D1D]">
              <UserPlus className="h-7 w-7" aria-hidden="true" />
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-[#050816] sm:text-6xl">Create a prototype account</h1>
            <p className="mt-5 text-base leading-7 text-[#6B7280]">Select any role to preview its GreenHubRCA portal. No backend connection is active yet.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-bold text-[#123D1D]">Full name</span>
                <input className="w-full rounded-2xl border border-[#123D1D]/10 bg-white/80 px-4 py-3 outline-none transition focus:border-[#74F32B]" placeholder="Your name" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-bold text-[#123D1D]">Email</span>
                <input className="w-full rounded-2xl border border-[#123D1D]/10 bg-white/80 px-4 py-3 outline-none transition focus:border-[#74F32B]" placeholder="name@rca.ac.rw" type="email" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-bold text-[#123D1D]">Password</span>
                <input className="w-full rounded-2xl border border-[#123D1D]/10 bg-white/80 px-4 py-3 outline-none transition focus:border-[#74F32B]" placeholder="Prototype password" type="password" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-bold text-[#123D1D]">Department / organization</span>
                <input className="w-full rounded-2xl border border-[#123D1D]/10 bg-white/80 px-4 py-3 outline-none transition focus:border-[#74F32B]" placeholder="RCA / Partner" />
              </label>
            </div>
            <p className="mt-6 text-sm font-bold text-[#123D1D]">Role</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {roleOptions.map((option) => (
                <RoleCard key={option.value} label={option.label} selected={selectedRole === option.value} onClick={() => setSelectedRole(option.value)} />
              ))}
            </div>
            <div className="mt-7">
              <CTAButton type="submit">Create Account</CTAButton>
            </div>
          </form>
        </div>
      </GlassCard>
    </main>
  );
}
