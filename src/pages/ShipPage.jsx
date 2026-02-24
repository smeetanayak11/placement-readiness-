import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ShipPage() {
  const navigate = useNavigate()
  const [canShip, setCanShip] = useState(false)

  useEffect(() => {
    const checklist = JSON.parse(localStorage.getItem('testChecklist') || '{}')
    const allPassed = Object.keys(checklist).length === 10 && Object.values(checklist).every(v => v === true)
    setCanShip(allPassed)
  }, [])

  if (!canShip) {
    return (
      <div className="p-5 max-w-4xl">
        <div className="heading-h2 mb-3">🔒 Ship Locked</div>
        <div className="card">
          <p className="text-base mb-3">
            All tests must pass before you can ship. Go back to the test checklist and verify all 10 items.
          </p>
          <button
            onClick={() => navigate('/prp/07-test')}
            className="btn-primary"
          >
            ← Back to Tests
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-5 max-w-4xl">
      <div className="heading-h2 mb-3">🚀 Ready to Ship</div>
      
      <div className="space-y-3">
        <div className="card bg-accent text-white">
          <p className="text-lg font-semibold">
            ✓ All tests passed! The Placement Readiness Platform is production-ready.
          </p>
        </div>

        <div className="card">
          <h3 className="heading-h4 mb-2">Deployment Checklist</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-accent">✓</span>
              <span className="text-base">All features implemented and tested</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent">✓</span>
              <span className="text-base">Data persistence working with localStorage</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent">✓</span>
              <span className="text-base">Premium design system applied throughout</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent">✓</span>
              <span className="text-base">No console errors on core pages</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent">✓</span>
              <span className="text-base">Analysis logic working as expected</span>
            </li>
          </ul>
        </div>

        <div className="card">
          <h3 className="heading-h4 mb-2">What's Included</h3>
          <ul className="space-y-2 text-base">
            <li>✓ Landing page with hero and features</li>
            <li>✓ Job Description analysis with skill extraction</li>
            <li>✓ Intelligent readiness score calculation</li>
            <li>✓ Round mapping based on company size</li>
            <li>✓ 7-day preparation plan</li>
            <li>✓ Interactive skill assessment</li>
            <li>✓ Interview question generator</li>
            <li>✓ Export functionality</li>
            <li>✓ History management</li>
            <li>✓ Full data persistence</li>
          </ul>
        </div>

        <div className="card">
          <h3 className="heading-h4 mb-2">Next Steps</h3>
          <ul className="space-y-2 text-base">
            <li>1. Deploy to production server</li>
            <li>2. Set up analytics tracking</li>
            <li>3. Configure email notifications</li>
            <li>4. Promote to beta users</li>
            <li>5. Collect feedback and iterate</li>
          </ul>
        </div>

        <button
          onClick={() => navigate('/prp/01-home')}
          className="btn-primary w-full"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  )
}
