# KodNest Premium Build System - Placement Readiness Platform

A premium SaaS-style placement readiness platform built with React, Tailwind CSS, and React Router. Designed with a calm, intentional, and confident philosophy—no gradients, no glassmorphism, no animation noise.

## ✨ Features

### 1. **Landing Page**
- Hero section with call-to-action
- Features grid showcasing platform capabilities
- Professional footer

### 2. **Job Description Analyzer**
- Intelligent skill extraction from JD text
- Smart categorization into: DSA, Languages, Web, Data, Cloud/DevOps, Testing
- Fallback to "General fresher stack" if no skills detected

### 3. **Analysis Engine**
Generates personalized prep materials:
- **Readiness Score** (0-100, deterministic)
- **Extracted Skills** with interactive confidence toggles
- **Round Mapping** based on company size (Startup vs Enterprise)
- **7-Day Prep Plan** adapted to detected skills
- **Round-wise Checklist** with actionable items
- **10 Likely Interview Questions** specific to skills detected
- **Export Tools** (copy buttons, TXT download)

### 4. **Interactive Results**
- Skill confidence toggles ("I know this" / "Need practice")
- Live readiness score updates based on selections
- Persistent changes across sessions
- Company intel card with hiring patterns

### 5. **Dashboard**
- Circular progress indicator (72/100 demo)
- Radar chart for skill breakdown
- Practice progress tracker
- Weekly goals with day-by-day activity
- Upcoming assessments list

### 6. **History Management**
- All analyses saved to localStorage
- Quick access to past sessions
- Load and continue from any saved analysis
- Delete entries when needed

### 7. **Test Checklist & Ship Lock**
- Built-in testing UI with 10 verification items
- Progress tracking ("X/10 tests passed")
- Ship route locked until all tests pass
- Reset functionality for retesting

## 🎨 Design System

**Philosophy**: Calm, Intentional, Coherent, Confident

### Colors
- **Background**: `#F7F6F3` (off-white)
- **Primary Text**: `#111111` (deep black)
- **Accent**: `#8B0000` (deep red)
- **Success**: `#2D5016` (muted green)
- **Warning**: `#9B6F1A` (muted amber)

### Typography
- **Headings**: Georgia/Serif (H1-H4, confident sizing)
- **Body**: Inter/Sans-serif (16-18px, 1.6-1.8 line-height)
- **Max-width for text**: 720px (optimal reading)

### Spacing Scale
All spacing uses 8px increments: 8, 16, 24, 40, 64px
(Never 13px, 27px, or random values)

### Components
- Buttons: 44px+ minimum height, solid colors, no shadows
- Cards: Subtle 1px borders, 24px padding, no drop shadows
- Inputs: Clean borders, clear focus states
- Transitions: 150-200ms, ease-in-out, no bounce

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
cd prp
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173`

### Build

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   └── DashboardLayout.jsx      # Sidebar + header wrapper
├── pages/
│   ├── Landing.jsx              # Entry point
│   ├── Home.jsx                 # JD analysis input
│   ├── Results.jsx              # Full analysis display
│   ├── History.jsx              # Past analyses
│   ├── Dashboard.jsx            # Demo dashboard
│   ├── TestChecklist.jsx        # Test verification
│   ├── ShipPage.jsx             # Ship when tests pass
│   └── [Practice, Resources...] # Placeholder routes
├── utils/
│   └── analysisEngine.js        # Skill extraction & analysis logic
├── App.jsx                      # Router setup
├── main.jsx                     # Entry point
└── index.css                    # Tailwind + design system
```

## 💾 Data Persistence

All data is stored in `localStorage`:

### Keys Used
- `currentAnalysis` - Active analysis being viewed/edited
- `analysisHistory` - Array of all past analyses
- `testChecklist` - Test verification state

### Analysis Entry Schema

```javascript
{
  id: string,
  createdAt: ISO string,
  company: string,
  role: string,
  jdText: string,
  extractedSkills: {
    coreCS: string[],
    languages: string[],
    web: string[],
    data: string[],
    cloud: string[],
    testing: string[],
    other: string[]
  },
  roundMapping: [{ roundTitle, focusAreas[], whyItMatters }],
  checklist: [{ roundTitle, items[] }],
  plan7Days: [{ day, focus, tasks[] }],
  questions: string[],
  baseScore: number,
  skillConfidenceMap: { skill: "know" | "practice" },
  finalScore: number,
  companyInfo: { size, estimate },
  updatedAt: ISO string
}
```

## 🧪 Testing Checklist

Inside `/prp/07-test`, verify:

1. ✅ JD required validation on `/prp/01-home`
2. ✅ Short JD warning for <200 characters
3. ✅ Skills extract and group correctly
4. ✅ Round mapping adapts to company+skills
5. ✅ Score calculation is deterministic
6. ✅ Skill toggles update score in real-time
7. ✅ Changes persist after page refresh
8. ✅ History saves/loads correctly
9. ✅ Export buttons work
10. ✅ No console errors on core pages

**All 10 must pass to unlock `/prp/08-ship`**

## 🔄 Navigation Routes

### Public Routes
- `/` - Landing page

### Premium Platform Routes (under `/prp`)
- `/prp/01-home` - JD analysis input
- `/prp/02-analyze` - (Alias to Results)
- `/prp/03-history` - View past analyses
- `/prp/04-results` - Full analysis & interact
- `/prp/07-test` - Test checklist
- `/prp/08-ship` - Deployment status (locked until tests pass)

### Legacy App Routes (under `/app`)
- `/app/dashboard` - Demo dashboard
- `/app/practice` - Placeholder
- `/app/assessments` - Placeholder
- `/app/resources` - Placeholder
- `/app/profile` - Placeholder

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling (design system integrated)
- **React Router v6** - Routing
- **Recharts** - Charts (radar, progress)
- **Lucide React** - Icons
- **localStorage** - Persistence

## 📊 Analytics

The platform includes no external tracking by default. To add analytics, integrate:

```javascript
// Example: Google Analytics
window.gtag?.('event', 'analyze_jd', {
  company: analysis.company,
  score: analysis.finalScore
})
```

## 🔒 Privacy

All data stays local in the browser (localStorage). No external APIs or scraping.
Everything works offline—refresh the page and your analysis persists.

## 🎯 Next Steps

Once deployed:

1. Add backend API for data persistence across devices
2. Implement user authentication
3. Add email notifications for deadlines
4. Integrate with job boards for auto-JD extraction
5. Add AI-powered q&a with interview prep
6. Implement peer review/mentorship features

## 📄 License

MIT

## 👥 Support

For issues or feature requests, create an issue in the repository.

---

**🚀 Built with attention to detail, calm design, and genuine utility.**
