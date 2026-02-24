import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-3 py-2 flex items-center justify-between">
          <div className="heading-h4">KodNest Premium Build System</div>
          <button
            onClick={() => navigate('/prp/01-home')}
            className="btn-primary"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-3 py-8">
        <div className="text-center space-y-2">
          <h1 className="heading-h1">Ace Your Placement</h1>
          <p className="text-lg text-gray prose mx-auto">
            Practice, assess, and prepare for your dream job
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-3 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Practice Problems */}
          <div className="card">
            <div className="flex items-start gap-2 mb-2">
              <div className="text-3xl">💻</div>
              <div>
                <h3 className="heading-h4">Practice Problems</h3>
                <p className="text-base text-gray mt-1">
                  Solve curated coding problems with detailed explanations
                </p>
              </div>
            </div>
          </div>

          {/* Mock Interviews */}
          <div className="card">
            <div className="flex items-start gap-2 mb-2">
              <div className="text-3xl">🎬</div>
              <div>
                <h3 className="heading-h4">Mock Interviews</h3>
                <p className="text-base text-gray mt-1">
                  Practice real interview scenarios with AI feedback
                </p>
              </div>
            </div>
          </div>

          {/* Track Progress */}
          <div className="card">
            <div className="flex items-start gap-2 mb-2">
              <div className="text-3xl">📊</div>
              <div>
                <h3 className="heading-h4">Track Progress</h3>
                <p className="text-base text-gray mt-1">
                  Monitor your readiness with detailed analytics
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border mt-8">
        <div className="max-w-7xl mx-auto px-3 py-2 text-center text-sm text-gray">
          © 2026 KodNest Premium Build System. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
