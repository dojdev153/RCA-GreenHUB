import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ImagePlus, Leaf, Send } from "lucide-react";
import TopNavbar from "../../components/layout/TopNavbar.jsx";
import GlassCard from "../../components/common/GlassCard.jsx";
import CTAButton from "../../components/common/CTAButton.jsx";
import GreenImpactInfo from "../../components/common/GreenImpactInfo.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const categories = ["Web Platform", "Embedded / IoT Project", "RCA Campus Environment", "Nyabihu District Community", "Idea / Proposal"];
const departments = ["Web Development", "Embedded Systems", "School & Community Environment"];
const targetAreas = ["RCA Campus", "Nyabihu District", "Both"];
const stages = ["Idea", "Planning", "Prototype", "Testing", "Implemented at RCA", "Community Outreach"];
const supportNeeds = ["Technical support", "Teacher mentorship", "Department support", "Materials", "Funding", "Team members", "Testing space", "Community access"];

export default function PostProjectPage() {
  const { user } = useAuth();
  const [success, setSuccess] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSuccess(true);
  }

  return (
    <div className="app-surface min-h-screen">
      <TopNavbar portal links={[{ label: "Student", to: "/student" }, { label: "Projects", to: "/student/projects" }, { label: "Requests", to: "/student/support-requests" }]} userInitials={user.avatar} />
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <section>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#123D1D]/70">Post project</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-[#050816] sm:text-6xl">Share an environmental idea with GreenHubRCA</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#6B7280]">This is a frontend-only mock submission. It shows the complete student posting flow without backend persistence.</p>

          <GlassCard className="mt-7 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 sm:col-span-2">
                  <span className="text-sm font-bold text-[#123D1D]">Project title</span>
                  <input required className="w-full rounded-2xl border border-[#123D1D]/10 bg-white/82 px-4 py-3 outline-none transition focus:border-[#74F32B]" placeholder="Example: Smart garden watering assistant" />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-bold text-[#123D1D]">Project category</span>
                  <select className="w-full rounded-2xl border border-[#123D1D]/10 bg-white/82 px-4 py-3 outline-none transition focus:border-[#74F32B]">
                    {categories.map((category) => <option key={category}>{category}</option>)}
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-bold text-[#123D1D]">Related department</span>
                  <select className="w-full rounded-2xl border border-[#123D1D]/10 bg-white/82 px-4 py-3 outline-none transition focus:border-[#74F32B]">
                    {departments.map((department) => <option key={department}>{department}</option>)}
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-bold text-[#123D1D]">Target area</span>
                  <select className="w-full rounded-2xl border border-[#123D1D]/10 bg-white/82 px-4 py-3 outline-none transition focus:border-[#74F32B]">
                    {targetAreas.map((target) => <option key={target}>{target}</option>)}
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-bold text-[#123D1D]">Current stage</span>
                  <select className="w-full rounded-2xl border border-[#123D1D]/10 bg-white/82 px-4 py-3 outline-none transition focus:border-[#74F32B]">
                    {stages.map((stage) => <option key={stage}>{stage}</option>)}
                  </select>
                </label>
              </div>

              {["Problem statement", "Proposed solution", "Environmental impact"].map((label) => (
                <label key={label} className="block space-y-2">
                  <span className="text-sm font-bold text-[#123D1D]">{label}</span>
                  <textarea required className="min-h-28 w-full resize-y rounded-2xl border border-[#123D1D]/10 bg-white/82 px-4 py-3 outline-none transition focus:border-[#74F32B]" placeholder={`Write the ${label.toLowerCase()}...`} />
                </label>
              ))}

              <fieldset>
                <legend className="text-sm font-bold text-[#123D1D]">Support needed</legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {supportNeeds.map((need) => (
                    <label key={need} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#123D1D]/10 bg-white/72 px-4 py-3 text-sm font-semibold text-[#123D1D] transition hover:border-[#74F32B]/70">
                      <input type="checkbox" className="h-4 w-4 accent-[#74F32B]" />
                      {need}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-bold text-[#123D1D]">GitHub link</span>
                  <input className="w-full rounded-2xl border border-[#123D1D]/10 bg-white/82 px-4 py-3 outline-none transition focus:border-[#74F32B]" placeholder="https://github.com/..." />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-bold text-[#123D1D]">Live demo link</span>
                  <input className="w-full rounded-2xl border border-[#123D1D]/10 bg-white/82 px-4 py-3 outline-none transition focus:border-[#74F32B]" placeholder="https://..." />
                </label>
              </div>

              <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-[#123D1D]/20 bg-[#F3FFE9]/60 p-6 text-center transition hover:border-[#74F32B]">
                <ImagePlus className="h-9 w-9 text-[#123D1D]" aria-hidden="true" />
                <span className="mt-3 text-sm font-black text-[#050816]">Project image / video upload placeholder</span>
                <span className="mt-1 text-xs font-semibold text-[#6B7280]">Frontend prototype only</span>
                <input type="file" className="sr-only" />
              </label>

              <div className="flex flex-wrap gap-3">
                <CTAButton type="submit" icon={Send}>Submit Project</CTAButton>
                <CTAButton to="/student" variant="secondary">Back to Portal</CTAButton>
              </div>
            </form>
          </GlassCard>
        </section>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <GlassCard className="p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#74F32B] text-[#123D1D]">
              <Leaf className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-xl font-black text-[#050816]">Submission preview</h2>
            <p className="mt-2 text-sm leading-6 text-[#6B7280]">After submitting, the prototype shows a success modal and keeps you in the frontend flow.</p>
          </GlassCard>
          <GreenImpactInfo />
        </aside>
      </main>

      {success ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050816]/50 px-4 backdrop-blur-sm">
          <GlassCard className="max-w-md p-7 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#74F32B] text-[#123D1D]">
              <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-2xl font-black text-[#050816]">Project submitted successfully.</h2>
            <p className="mt-3 text-sm leading-6 text-[#6B7280]">Your idea is now part of GreenHubRCA.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <CTAButton to="/student/projects">View Project Feed</CTAButton>
              <button type="button" onClick={() => setSuccess(false)} className="rounded-full border border-[#123D1D]/10 bg-white px-5 py-2.5 text-sm font-bold text-[#123D1D]">
                Continue Editing
              </button>
            </div>
          </GlassCard>
        </div>
      ) : null}
    </div>
  );
}
