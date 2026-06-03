import {
  BadgeDollarSign,
  Building2,
  CalendarDays,
  ClipboardList,
  Cpu,
  FileText,
  GitBranch,
  Globe,
  Handshake,
  Megaphone,
  Sparkles,
  Sprout,
  Trophy,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { announcements, budgetRequests, events, impactStats, projects, supportRequests } from "./mockData.js";

const publicProjects = projects.filter((project) => project.public);
const webProjects = projects.filter((project) => project.department === "Web Development");
const embeddedProjects = projects.filter((project) => project.department === "Embedded Systems");
const environmentProjects = projects.filter((project) => project.department === "School & Community Environment");

const portalNav = {
  student: [
    { label: "Home", to: "/student" },
    { label: "Post", to: "/student/post-project" },
    { label: "Projects", to: "/student/projects" },
    { label: "Requests", to: "/student/support-requests" },
  ],
  teacher: [
    { label: "Home", to: "/teacher" },
    { label: "Reviews", to: "/teacher/reviews" },
    { label: "Mentorship", to: "/teacher/mentorship" },
    { label: "Endorsed", to: "/teacher/endorsed-projects" },
  ],
  departments: [
    { label: "All", to: "/departments" },
    { label: "Web", to: "/departments/web" },
    { label: "Embedded", to: "/departments/embedded" },
    { label: "Environment", to: "/departments/environment" },
  ],
  head: [{ label: "Home", to: "/head-departments" }],
  secretary: [
    { label: "Home", to: "/secretary" },
    { label: "Announcements", to: "/secretary/announcements" },
    { label: "Reports", to: "/secretary/reports" },
    { label: "Meetings", to: "/secretary/meetings" },
  ],
  finance: [
    { label: "Home", to: "/finance" },
    { label: "Requests", to: "/finance/requests" },
    { label: "Materials", to: "/finance/materials" },
    { label: "Partners", to: "/finance/partner-support" },
  ],
  investor: [
    { label: "Home", to: "/investor" },
    { label: "Projects", to: "/investor/projects" },
    { label: "Impact", to: "/investor/impact" },
    { label: "Support", to: "/investor/support" },
  ],
};

const defaultInsights = [
  {
    title: "Upcoming activities",
    icon: CalendarDays,
    items: events,
    actionLabel: "View calendar",
    to: "/secretary/meetings",
  },
  {
    title: "Top Green Impact projects",
    icon: Trophy,
    items: publicProjects.slice(0, 3).map((project) => ({ title: project.title, value: `${project.points}` })),
  },
];

export const portalConfigs = {
  student: {
    title: "Student innovation feed",
    eyebrow: "Student Portal",
    description: "Post ideas, discover teams, request support, and build environmental solutions with RCA GreenTech Initiative.",
    userKey: "student",
    navLinks: portalNav.student,
    tabs: ["All", "Web Platforms", "Embedded / IoT", "RCA Environment", "Nyabihu Community", "Ideas", "Seeking Support"],
    projects,
    actions: ["View Project", "Support", "Comment", "Join Team"],
    stats: [
      { label: "Projects posted", value: "6" },
      { label: "Contributions", value: "18" },
      { label: "Support asks", value: "3" },
      { label: "Team invites", value: "5" },
    ],
    quickLinks: [
      { label: "Post Project", to: "/student/post-project", highlight: true },
      { label: "My Projects", to: "/student/projects" },
      { label: "Support Requests", to: "/student/support-requests" },
    ],
    rightCards: [
      ...defaultInsights,
      {
        title: "My support requests",
        icon: ClipboardList,
        items: supportRequests.map((request) => ({ title: request.title, meta: request.status })),
        actionLabel: "Post Project",
        to: "/post-project",
      },
    ],
  },
  teacher: {
    title: "Mentor review room",
    eyebrow: "Teacher Portal",
    description: "Review student work, give feedback, endorse promising ideas, and recommend public-ready projects.",
    userKey: "teacher",
    navLinks: portalNav.teacher,
    tabs: ["Pending Review", "Promising", "Needs Feedback", "Ready for Prototype", "Ready for Implementation", "Featured"],
    projects,
    actions: ["Review", "Give Feedback", "Endorse", "Recommend for Support", "Recommend for Investors"],
    stats: [
      { label: "Reviewed", value: "34" },
      { label: "Endorsed", value: "16" },
      { label: "Mentorships", value: "9" },
      { label: "Featured", value: "5" },
    ],
    quickLinks: [
      { label: "Review Queue", to: "/teacher/reviews", highlight: true },
      { label: "Mentorship", to: "/teacher/mentorship" },
      { label: "Endorsed Projects", to: "/teacher/endorsed-projects" },
    ],
    rightCards: [
      {
        title: "Review queue",
        icon: ClipboardList,
        items: projects.slice(0, 3).map((project) => ({ title: project.title, meta: project.status })),
      },
      {
        title: "Projects needing mentor support",
        icon: Users,
        items: supportRequests.map((request) => ({ title: request.project, meta: request.title })),
      },
      defaultInsights[1],
    ],
  },
  web: {
    title: "Web development support feed",
    eyebrow: "Department Portal",
    description: "Manage web-based environmental projects, support requests, demos, hosting needs, and UI implementation.",
    userKey: "web",
    navLinks: portalNav.departments,
    tabs: ["Web Projects", "Support Requests", "In Development", "Ready for Demo", "Needs Hosting", "Featured"],
    projects: webProjects,
    actions: ["View Project", "Accept Support", "Assign Member", "Mark Ready"],
    stats: [
      { label: "Active web projects", value: "12" },
      { label: "Support asks", value: "5" },
      { label: "Ready demos", value: "4" },
      { label: "Hosting needs", value: "3" },
    ],
    quickLinks: [
      { label: "All Departments", to: "/departments" },
      { label: "Embedded Portal", to: "/departments/embedded" },
      { label: "Environment Portal", to: "/departments/environment" },
    ],
    rightCards: [
      {
        title: "Web support focus",
        icon: Globe,
        items: [
          { title: "UI/UX polish", meta: "3 active asks" },
          { title: "Hosting and database", meta: "4 active asks" },
          { title: "Demo readiness", meta: "2 projects" },
        ],
      },
      defaultInsights[1],
    ],
  },
  embedded: {
    title: "Embedded systems prototype feed",
    eyebrow: "Department Portal",
    description: "Coordinate IoT projects, material requests, prototype testing, component needs, and hardware mentorship.",
    userKey: "embedded",
    navLinks: portalNav.departments,
    tabs: ["IoT Projects", "Material Requests", "Prototype Stage", "Testing", "Needs Components", "Featured"],
    projects: embeddedProjects,
    actions: ["View Project", "Accept Request", "Assign Support", "Mark Prototype"],
    stats: [
      { label: "IoT projects", value: "15" },
      { label: "Material asks", value: "7" },
      { label: "Prototype stage", value: "6" },
      { label: "Testing", value: "4" },
    ],
    quickLinks: [
      { label: "All Departments", to: "/departments" },
      { label: "Web Portal", to: "/departments/web" },
      { label: "Environment Portal", to: "/departments/environment" },
    ],
    rightCards: [
      {
        title: "Components needed",
        icon: Cpu,
        items: [
          { title: "Ultrasonic sensors", meta: "Smart dustbin pilot" },
          { title: "Soil moisture sensors", meta: "Plant watering system" },
          { title: "Weatherproof casings", meta: "Outdoor testing" },
        ],
      },
      defaultInsights[1],
    ],
  },
  environment: {
    title: "School and community environment feed",
    eyebrow: "Department Portal",
    description: "Coordinate planting, cleanup campaigns, outdoor improvements, waste actions, and Nyabihu outreach.",
    userKey: "environment",
    navLinks: portalNav.departments,
    tabs: ["RCA Campus", "Nyabihu District", "Planting", "Cleaning Campaigns", "Outdoor Improvements", "Community Outreach", "Featured"],
    projects: environmentProjects,
    actions: ["View Project", "Approve Activity", "Assign Volunteers", "Request Budget"],
    stats: [
      { label: "Active actions", value: "18" },
      { label: "Volunteers", value: "64" },
      { label: "Budget asks", value: "4" },
      { label: "Outreach plans", value: "3" },
    ],
    quickLinks: [
      { label: "All Departments", to: "/departments" },
      { label: "Web Portal", to: "/departments/web" },
      { label: "Embedded Portal", to: "/departments/embedded" },
    ],
    rightCards: [
      {
        title: "Activity needs",
        icon: Sprout,
        items: [
          { title: "Flower seedlings", meta: "Garden improvement" },
          { title: "Volunteer teams", meta: "Cleaning campaign" },
          { title: "District coordination", meta: "Tree planting outreach" },
        ],
      },
      defaultInsights[0],
    ],
  },
  head: {
    title: "All departments coordination feed",
    eyebrow: "Head of Departments Portal",
    description: "Monitor department progress, approve collaboration, review escalations, and forward priority requests.",
    userKey: "head",
    navLinks: portalNav.head,
    tabs: ["All Departments", "Web Development", "Embedded Systems", "School & Community Environment", "Cross-Department Projects", "Escalated Requests"],
    projects,
    actions: ["View Project", "Approve Collaboration", "Request Update", "Feature Project", "Mark Priority"],
    stats: [
      { label: "Departments", value: "3" },
      { label: "Active projects", value: "39" },
      { label: "Escalations", value: "9" },
      { label: "Featured", value: "14" },
    ],
    quickLinks: [
      { label: "Web Department", to: "/departments/web" },
      { label: "Embedded Department", to: "/departments/embedded" },
      { label: "Environment Department", to: "/departments/environment" },
    ],
    rightCards: [
      {
        title: "Department performance",
        icon: GitBranch,
        items: [
          { title: "Environment", value: "850" },
          { title: "Embedded", value: "730" },
          { title: "Web", value: "620" },
        ],
      },
      {
        title: "Pending approvals",
        icon: Sparkles,
        items: supportRequests.map((request) => ({ title: request.title, meta: request.department })),
      },
    ],
  },
  secretary: {
    title: "Records and communications feed",
    eyebrow: "Secretary Portal",
    description: "Create announcements, keep meeting notes, manage reports, document activities, and organize initiative records.",
    userKey: "secretary",
    navLinks: portalNav.secretary,
    tabs: ["Announcements", "Meeting Notes", "Reports", "Member Records", "Activity Logs", "Documents"],
    contentType: "announcements",
    stats: [
      { label: "Records created", value: "58" },
      { label: "Meetings", value: "4" },
      { label: "Reports due", value: "6" },
      { label: "Documents", value: "23" },
    ],
    quickLinks: [
      { label: "Create Announcement", to: "/secretary/announcements", highlight: true },
      { label: "Add Meeting Note", to: "/secretary/meetings" },
      { label: "Reports", to: "/secretary/reports" },
    ],
    rightCards: [
      {
        title: "Upcoming meetings",
        icon: CalendarDays,
        items: events,
      },
      {
        title: "Missing reports",
        icon: FileText,
        items: [
          { title: "Embedded material report", meta: "Due this week" },
          { title: "Community outreach summary", meta: "Needs photos" },
          { title: "Finance approval summary", meta: "Awaiting review" },
        ],
      },
    ],
  },
  finance: {
    title: "Funding and material request feed",
    eyebrow: "Finance Portal",
    description: "Review budget requests, approve materials, track spending, and organize partner support leads.",
    userKey: "finance",
    navLinks: portalNav.finance,
    tabs: ["Budget Requests", "Material Requests", "Approved", "Pending", "Rejected", "Partner Support"],
    contentType: "budget",
    stats: [
      { label: "Pending", value: "12" },
      { label: "Approved", value: "RWF 2.4M" },
      { label: "Materials", value: "9" },
      { label: "Partners", value: "7" },
    ],
    quickLinks: [
      { label: "Budget Requests", to: "/finance/requests", highlight: true },
      { label: "Material Requests", to: "/finance/materials" },
      { label: "Partner Support", to: "/finance/partner-support" },
    ],
    rightCards: [
      {
        title: "Funding summary",
        icon: Wallet,
        items: impactStats,
      },
      {
        title: "Partner support leads",
        icon: Handshake,
        items: [
          { title: "Local nursery", meta: "Seedlings interest" },
          { title: "Tech partner", meta: "Sensor kits" },
          { title: "Community group", meta: "Planting coordination" },
        ],
      },
    ],
  },
  investor: {
    title: "Public project discovery",
    eyebrow: "Investor / Partner Portal",
    description: "Browse approved GreenTech projects, explore impact metrics, and express support interest.",
    userKey: "investor",
    navLinks: portalNav.investor,
    tabs: ["Featured", "Seeking Support", "Web Platforms", "Embedded / IoT", "RCA Campus", "Nyabihu District", "High Impact"],
    projects: publicProjects,
    actions: ["View Project", "Express Interest"],
    stats: [
      { label: "Public projects", value: "14" },
      { label: "Impact points", value: "3,420" },
      { label: "Support needs", value: "18" },
      { label: "District actions", value: "5" },
    ],
    quickLinks: [
      { label: "Public Projects", to: "/investor/projects", highlight: true },
      { label: "Impact Metrics", to: "/investor/impact" },
      { label: "Support RCA GreenTech", to: "/investor/support" },
    ],
    rightCards: [
      {
        title: "Impact statistics",
        icon: Zap,
        items: impactStats,
      },
      {
        title: "Support categories",
        icon: BadgeDollarSign,
        items: [
          { title: "Materials and components", meta: "IoT and campus actions" },
          { title: "Funding and transport", meta: "Nyabihu outreach" },
          { title: "Mentorship and visibility", meta: "Public showcases" },
        ],
        actionLabel: "Contact initiative",
        to: "/investor/support",
      },
    ],
  },
};

export const specialContent = {
  support: supportRequests,
  budget: budgetRequests,
  announcements,
};

export const portalIcons = {
  Megaphone,
  Building2,
};
