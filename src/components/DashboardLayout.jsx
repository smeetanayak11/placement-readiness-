import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { BarChart3, BookOpen, CheckSquare, Database, Home, User } from 'lucide-react'

export default function DashboardLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    { path: '/app/dashboard', label: 'Dashboard', icon: Home },
    { path: '/app/practice', label: 'Practice', icon: BookOpen },
    { path: '/app/assessments', label: 'Assessments', icon: CheckSquare },
    { path: '/app/resources', label: 'Resources', icon: Database },
    { path: '/app/profile', label: 'Profile', icon: User },
  ]

  // Track if we're in the PRP section
  const isPRP = location.pathname.startsWith('/prp')

  const prpItems = [
    { path: '/prp/01-home', label: '01 Home' },
    { path: '/prp/02-analyze', label: '02 Analyze' },
    { path: '/prp/03-history', label: '03 History' },
    { path: '/prp/04-results', label: '04 Results' },
    { path: '/prp/07-test', label: '07 Test' },
    { path: '/prp/08-ship', label: '08 Ship' },
  ]

  const itemsToShow = isPRP ? prpItems : navItems

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-border">
        {/* Sidebar Header */}
        <div className="border-b border-border p-3">
          <h2 className="heading-h4">Placement Prep</h2>
        </div>

        {/* Navigation */}
        <nav className="p-2">
          {itemsToShow.map((item) => {
            const Icon = navItems.find(n => n.path === item.path)?.icon
            const isActive = location.pathname === item.path
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full text-left px-2 py-[12px] rounded-base text-base font-medium transition-colors duration-150 flex items-center gap-2 ${
                  isActive
                    ? 'bg-accent text-white'
                    : 'text-text-primary hover:bg-hover'
                }`}
              >
                {Icon && <Icon size={20} />}
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* User Avatar Placeholder */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 border-t border-border pt-3">
          <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-semibold">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">User</p>
            <p className="text-xs text-gray truncate">user@email.com</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-white sticky top-0 z-10">
          <div className="h-14 px-5 flex items-center justify-between">
            <h1 className="heading-h3">Placement Readiness</h1>
            <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-semibold">
              U
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
