import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TESTS = [
  { id: 1, label: 'JD required validation works', hint: 'Try to submit empty JD on /prp/01-home' },
  { id: 2, label: 'Short JD warning shows for <200 chars', hint: 'Paste less than 200 chars and try submitting' },
  { id: 3, label: 'Skills extraction groups correctly', hint: 'Analyze a JD and check /prp/04-results Skills tab' },
  { id: 4, label: 'Round mapping changes based on company + skills', hint: 'Try different companies (Amazon vs Startup) in Rounds tab' },
  { id: 5, label: 'Score calculation is deterministic', hint: 'Same JD should give same score' },
  { id: 6, label: 'Skill toggles update score live', hint: 'Click skills and watch score change in real-time' },
  { id: 7, label: 'Changes persist after refresh', hint: 'Toggle a skill, refresh page, check if toggle is still there' },
  { id: 8, label: 'History saves and loads correctly', hint: 'Create analysis, go to /prp/03-history, click View' },
  { id: 9, label: 'Export buttons copy the correct content', hint: 'Click export buttons and verify clipboard content' },
  { id: 10, label: 'No console errors on core pages', hint: 'Open DevTools (F12) and check console for errors' },
]

export default function TestChecklist() {
  const navigate = useNavigate()
  const [checklist, setChecklist] = useState({})
  const [showHints, setShowHints] = useState({})

  useEffect(() => {
    const saved = localStorage.getItem('testChecklist')
    if (saved) {
      setChecklist(JSON.parse(saved))
    }
  }, [])

  const toggleTest = (id) => {
    const updated = {
      ...checklist,
      [id]: !checklist[id]
    }
    setChecklist(updated)
    localStorage.setItem('testChecklist', JSON.stringify(updated))
  }

  const toggleHint = (id) => {
    setShowHints(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const passedCount = Object.values(checklist).filter(Boolean).length
  const allPassed = passedCount === TESTS.length

  const resetChecklist = () => {
    setChecklist({})
    localStorage.removeItem('testChecklist')
  }

  return (
    <div className="p-5 max-w-4xl">
      <div className="heading-h2 mb-2">Test Checklist</div>
      <p className="text-base text-gray mb-3">
        Verify all features work before shipping
      </p>

      {/* Summary */}
      <div className="card mb-3">
        <div className="text-center">
          <div className="text-4xl font-serif text-accent font-bold">{passedCount}</div>
          <p className="text-base font-medium">Tests Passed / {TESTS.length}</p>
          {!allPassed && (
            <p className="text-base text-warning font-medium mt-2">
              ⚠️ Fix issues before shipping
            </p>
          )}
          {allPassed && (
            <p className="text-base text-success font-medium mt-2">
              ✓ Ready to ship!
            </p>
          )}
        </div>
      </div>

      {/* Test Items */}
      <div className="space-y-2 mb-5">
        {TESTS.map(test => (
          <div key={test.id} className="card">
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={checklist[test.id] || false}
                onChange={() => toggleTest(test.id)}
                className="mt-1 w-5 h-5"
              />
              <div className="flex-1">
                <label className="text-base font-medium cursor-pointer">
                  {test.label}
                </label>
                <button
                  onClick={() => toggleHint(test.id)}
                  className="text-sm text-gray hover:text-text-primary mt-1"
                >
                  {showHints[test.id] ? '▼ Hide hint' : '▶ Show hint'}
                </button>
                {showHints[test.id] && (
                  <p className="text-sm text-gray mt-2 pl-2 border-l border-border">
                    {test.hint}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => navigate('/prp/08-ship')}
          disabled={!allPassed}
          className={!allPassed ? 'btn-secondary opacity-50 cursor-not-allowed' : 'btn-primary'}
        >
          Proceed to Ship
        </button>
        <button
          onClick={resetChecklist}
          className="btn-secondary"
        >
          Reset Checklist
        </button>
      </div>
    </div>
  )
}
