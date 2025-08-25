"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface Document {
  id: string
  name: string
  content: string
  dateModified: string
  dateCreated: string
  projectId: string
}

interface Project {
  id: string
  name: string
  description: string
  dateCreated: string
  dateModified: string
  documentCount: number
  color: string
  status: "active" | "archived" | "completed"
}

interface DocumentsContextType {
  // Data
  projects: Project[]
  documents: Document[]
  selectedProject: Project | null
  selectedDocument: Document | null
  
  // Actions
  addProject: (project: Omit<Project, "id" | "dateCreated" | "dateModified" | "documentCount">) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  deleteProject: (id: string) => void
  selectProject: (project: Project | null) => void
  
  addDocument: (document: Omit<Document, "id" | "dateCreated" | "dateModified">) => void
  updateDocument: (id: string, updates: Partial<Document>) => void
  deleteDocument: (id: string) => void
  selectDocument: (document: Document | null) => void
  
  getProjectDocuments: (projectId: string) => Document[]
}

const DocumentsContext = createContext<DocumentsContextType | undefined>(undefined)

// Mock data
const mockProjects: Project[] = [
  {
    id: "1",
    name: "Focus App Development",
    description: "Documentation and resources for building the Focus productivity app",
    dateCreated: "2024-11-01",
    dateModified: "2024-12-01",
    documentCount: 8,
    color: "blue",
    status: "active"
  },
  {
    id: "2",
    name: "Marketing Strategy",
    description: "Marketing plans, campaigns, and brand guidelines",
    dateCreated: "2024-10-15",
    dateModified: "2024-11-28",
    documentCount: 12,
    color: "green",
    status: "active"
  },
  {
    id: "3",
    name: "Personal Finance Planning",
    description: "Investment research, budget planning, and financial documents",
    dateCreated: "2024-09-20",
    dateModified: "2024-11-25",
    documentCount: 6,
    color: "purple",
    status: "active"
  },
  {
    id: "4",
    name: "100 Days Challenge",
    description: "Progress tracking, daily logs, and reflection documents",
    dateCreated: "2024-08-01",
    dateModified: "2024-12-01",
    documentCount: 15,
    color: "orange",
    status: "active"
  },
  {
    id: "5",
    name: "Archived Project",
    description: "Old project documentation that's been completed",
    dateCreated: "2024-06-01",
    dateModified: "2024-08-15",
    documentCount: 4,
    color: "gray",
    status: "archived"
  }
]

const mockDocuments: Document[] = [
  // Focus App Development
  {
    id: "1",
    name: "Project Requirements",
    dateModified: "2024-12-01",
    dateCreated: "2024-11-01",
    projectId: "1",
    content: "# Focus App - Project Requirements\n\n## Overview\nBuilding a productivity app to help users maintain focus and track their 100-day journey of habit formation.\n\n## Core Features\n- **Task Management**: Create, organize, and track tasks\n- **Time Tracking**: Pomodoro timer and focus sessions\n- **Progress Analytics**: Visual progress tracking\n- **Goal Setting**: Set and monitor long-term objectives\n- **Finance Tracking**: Personal budget and expense management\n- **Documents**: Knowledge management system\n\n## Technical Stack\n- **Frontend**: Next.js 15, React 19, TypeScript\n- **Styling**: Tailwind CSS, Custom components\n- **State Management**: React Context, Custom hooks\n- **Deployment**: Vercel\n\n## Success Criteria\n- ✅ Responsive design across all devices\n- ✅ Dark mode support\n- ✅ Intuitive user experience\n- 🔄 Real-time updates and sync\n- 🔄 Performance optimization"
  },
  {
    id: "2",
    name: "Technical Architecture",
    dateModified: "2024-11-28",
    dateCreated: "2024-11-05",
    projectId: "1",
    content: "# Technical Architecture\n\n## Component Structure\n```\nsrc/\n├── app/                 # Next.js app router\n├── components/          # Reusable UI components\n│   ├── ui/             # Base UI components\n│   ├── partials/       # Layout components\n│   └── [feature]/      # Feature-specific components\n├── contexts/           # React contexts for state\n├── lib/               # Utilities and helpers\n└── styles/            # Global styles\n```\n\n## State Management\n- **TaskContext**: Task CRUD operations\n- **DayContext**: 100-day challenge progress\n- **FinanceContext**: Financial data management\n- **DocumentsContext**: Knowledge management\n- **ThemeContext**: Dark/light mode toggle\n\n## Key Patterns\n- Context + Reducer for complex state\n- Custom hooks for business logic\n- Compound components for flexibility\n- Controlled components for forms"
  },
  {
    id: "3",
    name: "Development Notes",
    dateModified: "2024-11-25",
    dateCreated: "2024-11-10",
    projectId: "1",
    content: "# Development Notes\n\n## Current Sprint Progress\n\n### Completed ✅\n- [x] Basic app structure and routing\n- [x] Dashboard layout with collapsible sidebar\n- [x] Task management with drag & drop\n- [x] Finance tracking with budget management\n- [x] Dark mode implementation\n- [x] Document management system\n\n### In Progress 🔄\n- [ ] Markdown editor for documents\n- [ ] Advanced task filtering\n- [ ] Data persistence layer\n\n### Next Up 📋\n- [ ] User authentication\n- [ ] Cloud sync capabilities\n- [ ] Mobile app version\n\n## Technical Decisions\n\n### Why Next.js 15?\n- Built-in routing and performance optimizations\n- Server-side rendering capabilities\n- Excellent developer experience\n\n### Why Context over Redux?\n- Simpler for this app's scope\n- Built into React\n- Less boilerplate code"
  },
  
  // Marketing Strategy
  {
    id: "4",
    name: "Brand Strategy",
    dateModified: "2024-11-28",
    dateCreated: "2024-10-15",
    projectId: "2",
    content: "# Focus App - Brand Strategy\n\n## Brand Identity\n\n### Mission\nEmpower individuals to build lasting habits and achieve their goals through focused, intentional action.\n\n### Vision\nTo be the go-to productivity platform for people committed to personal growth and continuous improvement.\n\n### Values\n- **Simplicity**: Clean, intuitive design that doesn't overwhelm\n- **Progress**: Focus on incremental improvement over perfection\n- **Consistency**: Building habits through daily practice\n- **Mindfulness**: Encouraging intentional use of time and resources\n\n## Target Audience\n\n### Primary Users\n- **Productivity Enthusiasts**: People actively seeking better systems\n- **Habit Builders**: Users committed to long-term behavior change\n- **Goal-Oriented Individuals**: Those with specific objectives to achieve\n\n### Demographics\n- Age: 25-45\n- Income: Middle to upper-middle class\n- Tech-savvy with smartphone/computer access\n- Values personal development and self-improvement"
  },
  {
    id: "5",
    name: "Content Strategy",
    dateModified: "2024-11-26",
    dateCreated: "2024-10-20",
    projectId: "2",
    content: "# Content Marketing Strategy\n\n## Content Pillars\n\n### 1. Productivity Tips\n- Time management techniques\n- Focus strategies and methods\n- Tool recommendations and reviews\n- Workflow optimization\n\n### 2. Habit Formation\n- Science of habit building\n- Common challenges and solutions\n- Success stories and case studies\n- Progress tracking methods\n\n### 3. Personal Development\n- Goal setting frameworks\n- Mindset and motivation\n- Life balance strategies\n- Self-reflection practices\n\n## Content Calendar\n\n### Weekly Schedule\n- **Monday**: Motivation Monday (inspirational content)\n- **Wednesday**: Productivity Wednesday (tips and techniques)\n- **Friday**: Feature Friday (app updates and tutorials)\n\n### Monthly Themes\n- **January**: New Year, New Habits\n- **April**: Spring Cleaning (digital and physical)\n- **September**: Back to School productivity\n- **December**: Year-end reflection and planning"
  },
  
  // Personal Finance Planning
  {
    id: "6",
    name: "Investment Research",
    dateModified: "2024-11-25",
    dateCreated: "2024-09-20",
    projectId: "3",
    content: "# Investment Research Notes\n\n## Portfolio Allocation Strategy\n\n### Current Allocation\n- **70% Stocks** (Mix of index funds and individual stocks)\n- **20% Bonds** (Government and corporate bonds)\n- **10% Alternatives** (REITs, commodities)\n\n### Target Companies for Research\n\n#### Technology Sector\n- **Apple (AAPL)**: Stable growth, strong ecosystem\n- **Microsoft (MSFT)**: Cloud dominance, enterprise focus\n- **Google (GOOGL)**: Search monopoly, AI leadership\n\n#### Index Funds\n- **VTI**: Total Stock Market Index\n- **VXUS**: International Stock Index\n- **BND**: Total Bond Market Index\n\n## Risk Assessment\n\n### High Risk, High Reward\n- Individual tech stocks\n- Growth-focused funds\n- International emerging markets\n\n### Low Risk, Stable Returns\n- Government bonds\n- High-yield savings accounts\n- Blue-chip dividend stocks\n\n## Action Items\n- [ ] Review quarterly earnings reports\n- [ ] Rebalance portfolio monthly\n- [ ] Research new investment opportunities\n- [ ] Track expense ratios and fees"
  },
  {
    id: "7",
    name: "Budget Planning 2024",
    dateModified: "2024-11-22",
    dateCreated: "2024-09-25",
    projectId: "3",
    content: "# 2024 Budget Plan\n\n## Income Sources\n\n### Primary Income\n- **Salary**: $62,400/year ($5,200/month)\n- **Freelance Work**: $9,600/year ($800/month)\n- **Investment Income**: $1,800/year ($150/month)\n- **Total Annual Income**: $73,800\n\n## Monthly Budget Breakdown\n\n### Fixed Expenses (Needs - 50%)\n- **Rent**: $1,200\n- **Utilities**: $180\n- **Phone**: $80\n- **Insurance**: $150\n- **Groceries**: $400\n- **Transportation**: $200\n- **Total**: $2,210\n\n### Variable Expenses (Wants - 30%)\n- **Dining Out**: $200\n- **Entertainment**: $150\n- **Shopping**: $100\n- **Hobbies**: $100\n- **Total**: $550\n\n### Savings & Investments (20%)\n- **Emergency Fund**: $500\n- **Investment Account**: $800\n- **Retirement (401k)**: $600\n- **Total**: $1,900\n\n## Goals for 2024\n- ✅ Build 6-month emergency fund\n- 🔄 Increase investment portfolio by 25%\n- 📋 Start side business for additional income"
  },
  
  // 100 Days Challenge
  {
    id: "8",
    name: "Daily Progress Log",
    dateModified: "2024-12-01",
    dateCreated: "2024-08-01",
    projectId: "4",
    content: "# 100 Days Challenge - Progress Log\n\n## Current Status: Day 120+ 🎉\n\n### Week 1-2: Foundation Building\n**Goals**: Establish basic habits and routines\n- ✅ Wake up at 6:00 AM daily\n- ✅ 30-minute morning exercise\n- ✅ Healthy breakfast routine\n- ✅ Evening reflection journaling\n\n**Challenges**: Adjusting sleep schedule, motivation dips\n**Solutions**: Gradual bedtime shifts, accountability partner\n\n### Week 3-4: Momentum Building\n**Goals**: Add complexity and maintain consistency\n- ✅ Focus app development (2 hours daily)\n- ✅ Reading 30 minutes before bed\n- ✅ Meal prep on Sundays\n- 🔄 Meditation practice (still inconsistent)\n\n**Key Insight**: Consistency matters more than perfection\n\n### Week 5-8: System Optimization\n**Goals**: Refine systems and processes\n- ✅ Implement time-blocking\n- ✅ Weekly review sessions\n- ✅ Digital minimalism practices\n- ✅ Financial tracking routine\n\n### Current Focus Areas\n- **Health**: Maintaining exercise routine\n- **Productivity**: Focus app development\n- **Finance**: Budget optimization\n- **Learning**: Daily knowledge acquisition"
  },
  {
    id: "9",
    name: "Key Learnings & Insights",
    dateModified: "2024-11-30",
    dateCreated: "2024-08-15",
    projectId: "4",
    content: "# 100 Days Challenge - Key Learnings\n\n## Major Breakthroughs\n\n### 1. The Power of Systems Over Goals\n**Insight**: Focusing on daily systems rather than end goals led to more consistent progress.\n\n**Example**: Instead of \"lose 10 pounds,\" focused on \"exercise 30 minutes daily\" and \"eat vegetables with every meal.\"\n\n**Result**: More sustainable habits and less stress about outcomes.\n\n### 2. Environment Design Matters\n**Insight**: Physical and digital environments significantly impact behavior.\n\n**Changes Made**:\n- Workout clothes laid out the night before\n- Phone in another room while working\n- Healthy snacks pre-portioned and visible\n- Work desk organized and distraction-free\n\n### 3. The Compound Effect is Real\n**Insight**: Small daily actions create exponential results over time.\n\n**Evidence**:\n- Day 1: Could barely run 1 mile\n- Day 100: Completed a 10K run\n- Day 1: Struggled to focus for 25 minutes\n- Day 100: Regular 2-hour deep work sessions\n\n## Challenges Overcome\n\n### Perfectionism\n**Problem**: All-or-nothing thinking leading to giving up\n**Solution**: \"Good enough\" mindset and 1% improvement focus\n\n### Social Pressure\n**Problem**: Others questioning the intense commitment\n**Solution**: Clear communication about priorities and finding supportive community\n\n### Plateau Periods\n**Problem**: Weeks where progress seemed stagnant\n**Solution**: Tracking leading indicators, not just outcomes\n\n## What I'd Do Differently\n- Start with fewer habits (3-4 max)\n- Build in more flexibility for unexpected events\n- Celebrate small wins more frequently\n- Connect with others doing similar challenges earlier"
  }
]

export function DocumentsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(mockProjects)
  const [documents, setDocuments] = useState<Document[]>(mockDocuments)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)

  const addProject = (projectData: Omit<Project, "id" | "dateCreated" | "dateModified" | "documentCount">) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      dateCreated: new Date().toISOString().split('T')[0],
      dateModified: new Date().toISOString().split('T')[0],
      documentCount: 0
    }
    setProjects(prev => [...prev, newProject])
  }

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === id 
          ? { ...project, ...updates, dateModified: new Date().toISOString().split('T')[0] }
          : project
      )
    )
  }

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id))
    setDocuments(prev => prev.filter(doc => doc.projectId !== id))
    if (selectedProject?.id === id) {
      setSelectedProject(null)
      setSelectedDocument(null)
    }
  }

  const selectProject = (project: Project | null) => {
    setSelectedProject(project)
    setSelectedDocument(null)
  }

  const addDocument = (documentData: Omit<Document, "id" | "dateCreated" | "dateModified">) => {
    const newDocument: Document = {
      ...documentData,
      id: Date.now().toString(),
      dateCreated: new Date().toISOString().split('T')[0],
      dateModified: new Date().toISOString().split('T')[0]
    }
    setDocuments(prev => [...prev, newDocument])
    
    // Update project document count
    updateProject(documentData.projectId, {})
  }

  const updateDocument = (id: string, updates: Partial<Document>) => {
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === id
          ? { ...doc, ...updates, dateModified: new Date().toISOString().split('T')[0] }
          : doc
      )
    )
  }

  const deleteDocument = (id: string) => {
    const document = documents.find(doc => doc.id === id)
    setDocuments(prev => prev.filter(doc => doc.id !== id))
    if (selectedDocument?.id === id) {
      setSelectedDocument(null)
    }
    
    // Update project document count
    if (document) {
      updateProject(document.projectId, {})
    }
  }

  const selectDocument = (document: Document | null) => {
    setSelectedDocument(document)
  }

  const getProjectDocuments = (projectId: string) => {
    return documents.filter(doc => doc.projectId === projectId)
  }

  const value: DocumentsContextType = {
    projects,
    documents,
    selectedProject,
    selectedDocument,
    addProject,
    updateProject,
    deleteProject,
    selectProject,
    addDocument,
    updateDocument,
    deleteDocument,
    selectDocument,
    getProjectDocuments,
  }

  return (
    <DocumentsContext.Provider value={value}>
      {children}
    </DocumentsContext.Provider>
  )
}

export function useDocuments() {
  const context = useContext(DocumentsContext)
  if (context === undefined) {
    throw new Error("useDocuments must be used within a DocumentsProvider")
  }
  return context
}