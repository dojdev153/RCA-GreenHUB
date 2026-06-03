import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, LockKeyhole } from "lucide-react";
import CTAButton from "../../components/common/CTAButton.jsx";
import GlassCard from "../../components/common/GlassCard.jsx";
import RoleCard from "../../components/common/RoleCard.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { roleOptions } from "../../data/mockData.js";
import { routeForRole } from "../../utils/routes.js";

export default function LoginPage() {
  const { role, setRole } = useAuth();
  const [selectedRole, setSelectedRole] = useState(role);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setRole(selectedRole);
    navigate(routeForRole(selectedRole));
  }

  return (
    <main className="app-surface flex min-h-screen items-center justify-center px-4 py-10">
      <GlassCard className="grid w-full max-w-6xl overflow-hidden lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative min-h-96 bg-[#050816] p-8 text-white sm:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(116,243,43,0.34),transparent_18rem)]" />
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#74F32B] text-[#123D1D]">
                <Leaf className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-lg font-black">GreenHubRCA</span>
            </Link>
            <h1 className="mt-16 text-4xl font-black tracking-tight sm:text-6xl">Choose a role and enter the prototype.</h1>
            <p className="mt-5 max-w-md text-base leading-7 text-white/72">This is frontend-only mock authentication. The selected role routes you to that portal for presenting the platform flow.</p>
          </div>
        </section>
        <form onSubmit={handleSubmit} className="p-6 sm:p-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#74F32B]/20 text-[#123D1D]">
            <LockKeyhole className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-3xl font-black text-[#050816]">Login</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-bold text-[#123D1D]">Email</span>
              <input className="w-full rounded-2xl border border-[#123D1D]/10 bg-white/80 px-4 py-3 outline-none transition focus:border-[#74F32B]" placeholder="name@rca.ac.rw" type="email" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-bold text-[#123D1D]">Password</span>
              <input className="w-full rounded-2xl border border-[#123D1D]/10 bg-white/80 px-4 py-3 outline-none transition focus:border-[#74F32B]" placeholder="Prototype password" type="password" />
            </label>
          </div>
          <p className="mt-6 text-sm font-bold text-[#123D1D]">Login as</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {roleOptions.map((option) => (
              <RoleCard key={option.value} label={option.label} selected={selectedRole === option.value} onClick={() => setSelectedRole(option.value)} />
            ))}
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <CTAButton type="submit">Enter Portal</CTAButton>
            <CTAButton to="/register" variant="secondary">Create Account</CTAButton>
          </div>
        </form>
      </GlassCard>
    </main>
  );
}
