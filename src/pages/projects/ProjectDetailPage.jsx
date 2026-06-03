import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, CheckCircle2, HeartHandshake, MessageCircle, Users } from "lucide-react";
import TopNavbar from "../../components/layout/TopNavbar.jsx";
import GlassCard from "../../components/common/GlassCard.jsx";
import GreenImpactBadge from "../../components/common/GreenImpactBadge.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import CTAButton from "../../components/common/CTAButton.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import GreenImpactInfo from "../../components/common/GreenImpactInfo.jsx";
import { projects } from "../../data/mockData.js";
import { useAuth } from "../../context/AuthContext.jsx";

const roleActions = {
  student: ["Support", "Comment", "Join Team"],
  teacher: ["Endorse", "Give Feedback", "Recommend for Support"],
  department: ["Request Budget", "Assign Support", "Mark Ready"],
  finance: ["Approve Budget", "Request Clarification"],
  investor: ["Express Interest", "Contact Initiative"],
  head: ["Feature Project", "Mark Priority"],
  secretary: ["Document Activity", "Export Mock Report"],
};

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { role, user } = useAuth();
  const project = projects.find((item) => item.id === id);
  const actions = roleActions[role] ?? ["Support", "Comment", "Join Team", "Endorse", "Request Budget", "Express Interest"];

  if (!project) {
    return (
      <div className="app-surface min-h-screen">
        <TopNavbar portal links={[]} userInitials={user.avatar} />
        <main className="mx-auto max-w-4xl px-4 py-12">
          <EmptyState title="Project not found" body="This prototype route does not match a mock project yet." actionLabel="Back to projects" to="/student/projects" />
        </main>
      </div>
    );
  }

  return (
    <div className="app-surface">
      <TopNavbar portal links={[]} userInitials={user.avatar} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link to="/student/projects" className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#123D1D]/10 bg-white/72 px-4 py-2 text-sm font-bold text-[#123D1D] transition hover:border-[#74F32B]/70">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to projects
        </Link>

        <section className={`relative overflow-hidden rounded-[36px] bg-gradient-to-br ${project.imageTone} p-6 sm:p-10`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(116,243,43,0.42),transparent_18rem),radial-gradient(circle_at_90%_12%,rgba(5,8,22,0.14),transparent_18rem)]" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <GreenImpactBadge points={project.points} />
                <StatusBadge status={project.status} />
                <span className="rounded-full bg-white/76 px-3 py-1 text-xs font-bold text-[#123D1D]">{project.category}</span>
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-[#050816] sm:text-6xl">{project.title}</h1>
              <p className="mt-4 text-lg font-bold text-[#123D1D]">{project.author} / {project.department}</p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#4B5563]">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {actions.map((action, index) => (
                  <button
                    key={action}
                    type="button"
                    className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition ${
                      index === 0 ? "border-[#74F32B] bg-[#74F32B] text-[#123D1D]" : "border-[#123D1D]/10 bg-white/72 text-[#123D1D] hover:border-[#74F32B]/70"
                    }`}
                  >
                    {index === 0 ? <HeartHandshake className="h-4 w-4" aria-hidden="true" /> : <MessageCircle className="h-4 w-4" aria-hidden="true" />}
                    {action}
                  </button>
                ))}
              </div>
            </div>
            <GlassCard className="p-5">
              <h2 className="text-lg font-black text-[#050816]">Project media</h2>
              <div className="mt-4 aspect-video rounded-3xl border border-[#123D1D]/10 bg-white/65 p-5">
                <div className="flex h-full items-center justify-center rounded-2xl bg-[#050816] text-center text-sm font-bold text-white/80">
                  Image / video placeholder for prototype presentation
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            {[
              ["Problem statement", project.problem],
              ["Proposed solution", project.solution],
              ["Environmental impact", project.environmentalImpact],
              ["Teacher feedback", project.feedback],
            ].map(([title, body]) => (
              <GlassCard key={title} className="p-6">
                <h2 className="text-xl font-black text-[#050816]">{title}</h2>
                <p className="mt-3 text-base leading-7 text-[#4B5563]">{body}</p>
              </GlassCard>
            ))}

            <GlassCard className="p-6">
              <h2 className="text-xl font-black text-[#050816]">Timeline and department support</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-5">
                {["Idea", "Planning", "Prototype", "Testing", "Implemented at RCA"].map((step) => {
                  const done = project.timeline.includes(step);
                  return (
                    <div key={step} className={`rounded-2xl border p-4 ${done ? "border-[#74F32B]/50 bg-[#74F32B]/16" : "border-[#123D1D]/10 bg-white/70"}`}>
                      <CheckCircle2 className={`h-5 w-5 ${done ? "text-[#123D1D]" : "text-[#6B7280]/40"}`} aria-hidden="true" />
                      <p className="mt-3 text-sm font-black text-[#050816]">{step}</p>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </div>

          <aside className="space-y-5">
            <GlassCard className="p-5">
              <h2 className="text-lg font-black text-[#050816]">Project snapshot</h2>
              <div className="mt-4 space-y-3">
                {[
                  ["Target area", project.target],
                  ["Team", project.team],
                  ["Current stage", project.stage],
                  ["Impact area", project.impactArea],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-white/70 px-4 py-3">
                    <p className="text-xs font-bold text-[#6B7280]">{label}</p>
                    <p className="mt-1 text-sm font-black text-[#123D1D]">{value}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
            <GlassCard className="p-5">
              <h2 className="text-lg font-black text-[#050816]">Support needed</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.supportNeeded.map((support) => (
                  <span key={support} className="inline-flex items-center gap-2 rounded-full bg-[#F3FFE9] px-3 py-2 text-xs font-bold text-[#123D1D]">
                    <Users className="h-3.5 w-3.5" aria-hidden="true" />
                    {support}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white/70 p-4">
                <CalendarDays className="h-5 w-5 text-[#123D1D]" aria-hidden="true" />
                <p className="text-sm font-bold text-[#6B7280]">Next review: June 7, 2026</p>
              </div>
            </GlassCard>
            <GreenImpactInfo />
            <CTAButton to="/post-project" className="w-full">Post Similar Project</CTAButton>
          </aside>
        </section>
      </main>
    </div>
  );
}
