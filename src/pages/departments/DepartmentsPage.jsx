import { Link } from "react-router-dom";
import { ArrowRight, Leaf } from "lucide-react";
import TopNavbar from "../../components/layout/TopNavbar.jsx";
import DepartmentCard from "../../components/cards/DepartmentCard.jsx";
import GlassCard from "../../components/common/GlassCard.jsx";
import GreenImpactInfo from "../../components/common/GreenImpactInfo.jsx";
import { departments, projects } from "../../data/mockData.js";

const navLinks = [
  { label: "All", to: "/departments" },
  { label: "Web", to: "/departments/web" },
  { label: "Embedded", to: "/departments/embedded" },
  { label: "Environment", to: "/departments/environment" },
];

export default function DepartmentsPage() {
  return (
    <div className="app-surface">
      <TopNavbar portal links={navLinks} userInitials="DP" />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#123D1D]/70">Departments</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-[#050816] sm:text-6xl">Three connected teams supporting RCA GreenTech projects</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[#6B7280]">
              Open any department portal to review projects, accept support requests, assign members, and present the complete collaboration flow.
            </p>
          </div>
          <GlassCard className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#74F32B] text-[#123D1D]">
                <Leaf className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-black text-[#050816]">{projects.length}</p>
                <p className="text-sm font-semibold text-[#6B7280]">Mock projects available</p>
              </div>
            </div>
          </GlassCard>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          {departments.map((department) => (
            <DepartmentCard key={department.id} department={department} />
          ))}
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[1fr_1fr]">
          <GreenImpactInfo />
          <GlassCard className="p-5">
            <h2 className="text-lg font-black text-[#050816]">Cross-department collaboration</h2>
            <p className="mt-2 text-sm leading-6 text-[#6B7280]">
              Web, embedded, and environment departments can coordinate support across the same project. This makes the prototype feel like a living project network instead of a static admin tool.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {departments.map((department) => (
                <Link key={department.id} to={department.route} className="rounded-2xl border border-[#123D1D]/10 bg-white/70 p-4 text-sm font-black text-[#123D1D] transition hover:border-[#74F32B]/70 hover:bg-[#F3FFE9]">
                  {department.name}
                  <ArrowRight className="mt-3 h-4 w-4" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </GlassCard>
        </section>
      </main>
    </div>
  );
}
