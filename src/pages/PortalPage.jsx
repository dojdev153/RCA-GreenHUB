import { useMemo, useState } from "react";
import { announcements, budgetRequests, projects, supportRequests, users } from "../data/mockData.js";
import { portalConfigs } from "../data/portalConfigs.jsx";
import PortalShell from "../components/portal/PortalShell.jsx";
import PortalTabs from "../components/portal/PortalTabs.jsx";
import ProjectFeed from "../components/portal/ProjectFeed.jsx";
import SupportRequestCard from "../components/cards/SupportRequestCard.jsx";
import BudgetRequestCard from "../components/cards/BudgetRequestCard.jsx";
import AnnouncementCard from "../components/cards/AnnouncementCard.jsx";
import EmptyState from "../components/common/EmptyState.jsx";

function filterProjects(items, tab) {
  if (!tab || tab === "All" || tab === "Featured" || tab === "Pending Review" || tab === "Web Projects" || tab === "IoT Projects" || tab === "RCA Campus") {
    if (tab === "Featured") return items.filter((item) => item.status === "Featured" || item.points >= 145);
    return items;
  }

  if (tab.includes("Web")) return items.filter((item) => item.category.includes("Web"));
  if (tab.includes("Embedded") || tab.includes("IoT")) return items.filter((item) => item.category.includes("Embedded"));
  if (tab.includes("RCA") || tab.includes("Campus")) return items.filter((item) => item.target.includes("RCA"));
  if (tab.includes("Nyabihu")) return items.filter((item) => item.target.includes("Nyabihu"));
  if (tab.includes("Idea")) return items.filter((item) => item.stage === "Idea" || item.category.includes("Idea"));
  if (tab.includes("Support") || tab.includes("Needs")) return items.filter((item) => item.supportNeeded?.length);
  if (tab.includes("Ready")) return items.filter((item) => item.status.includes("Ready") || item.stage === "Testing");
  if (tab.includes("Testing")) return items.filter((item) => item.stage === "Testing");
  if (tab.includes("Prototype")) return items.filter((item) => item.stage === "Prototype");
  if (tab.includes("Implementation")) return items.filter((item) => item.stage.includes("Implemented") || item.status === "Featured");
  if (tab.includes("Community")) return items.filter((item) => item.target.includes("Nyabihu") || item.stage.includes("Community"));
  if (tab.includes("High Impact")) return items.filter((item) => item.points >= 145);

  return items;
}

export default function PortalPage({ portalKey, view }) {
  const [activeTab, setActiveTab] = useState(0);
  const config = portalConfigs[portalKey] ?? portalConfigs.student;
  const activeTabLabel = config.tabs?.[activeTab];
  const user = users[config.userKey] ?? users.student;

  const center = useMemo(() => {
    if (view === "support" || config.contentType === "support") {
      return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-1">
          {supportRequests.map((request) => (
            <SupportRequestCard key={request.id} request={request} />
          ))}
        </div>
      );
    }

    if (view === "budget" || config.contentType === "budget") {
      return (
        <div className="space-y-5">
          {budgetRequests.map((request) => (
            <BudgetRequestCard key={request.id} request={request} />
          ))}
        </div>
      );
    }

    if (view === "announcements" || config.contentType === "announcements") {
      return (
        <div className="space-y-5">
          {announcements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      );
    }

    const source = config.projects ?? projects;
    const filtered = filterProjects(source, activeTabLabel);

    if (!filtered.length) {
      return <EmptyState title="No matching projects yet" body="Try another tab or use the prototype actions to create a new project flow." actionLabel="Post Project" to="/post-project" />;
    }

    return <ProjectFeed projects={filtered} actions={config.actions} />;
  }, [activeTabLabel, config, view]);

  return (
    <PortalShell
      user={user}
      stats={config.stats}
      quickLinks={config.quickLinks}
      navLinks={config.navLinks}
      title={config.title}
      eyebrow={config.eyebrow}
      description={config.description}
      rightCards={config.rightCards}
      tabs={<PortalTabs tabs={config.tabs} active={activeTab} onChange={setActiveTab} />}
      center={center}
    />
  );
}
