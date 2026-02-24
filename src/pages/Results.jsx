import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  extractSkills, 
  generateChecklist, 
  generatePlan, 
  generateQuestions, 
  calculateScore,
  generateRoundMapping,
  inferCompanySize
} from '../utils/analysisEngine'

export default function Results() {
  const navigate = useNavigate()
  const [analysis, setAnalysis] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load current analysis from localStorage
    const current = localStorage.getItem('currentAnalysis')
    if (!current) {
      navigate('/prp/01-home')
      return
    }

    let analysisEntry = JSON.parse(current)

    // If skills not yet extracted, perform full analysis
    if (!analysisEntry.extractedSkills || !analysisEntry.extractedSkills.coreCS) {
      const extracted = extractSkills(analysisEntry.jdText)
      const checklist = generateChecklist(extracted)
      const plan = generatePlan(extracted)
      const questions = generateQuestions(extracted, analysisEntry.company, analysisEntry.role)
      const baseScore = calculateScore(extracted, analysisEntry.company, analysisEntry.role, analysisEntry.jdText)
      const roundMapping = generateRoundMapping(analysisEntry.company || 'Unknown', extracted)
      const companyInfo = inferCompanySize(analysisEntry.company || 'Unknown')

      analysisEntry = {
        ...analysisEntry,
        extractedSkills: extracted,
        checklist,
        plan7Days: plan,
        questions,
        baseScore,
        skillConfidenceMap: {},
        finalScore: baseScore,
        roundMapping,
        companyInfo,
        updatedAt: new Date().toISOString(),
      }

      // Initialize confidence map
      Object.values(extracted).forEach(skillsList => {
        skillsList.forEach(skill => {
          analysisEntry.skillConfidenceMap[skill] = 'practice'
        })
      })

      localStorage.setItem('currentAnalysis', JSON.stringify(analysisEntry))
    }

    // Also save to history
    const history = JSON.parse(localStorage.getItem('analysisHistory') || '[]')
    const existingIndex = history.findIndex(h => h.id === analysisEntry.id)
    if (existingIndex >= 0) {
      history[existingIndex] = analysisEntry
    } else {
      history.push(analysisEntry)
    }
    localStorage.setItem('analysisHistory', JSON.stringify(history))

    setAnalysis(analysisEntry)
    setLoading(false)
  }, [navigate])

  const toggleSkillConfidence = (skill) => {
    setAnalysis(prev => {
      const newConfidenceMap = { ...prev.skillConfidenceMap }
      newConfidenceMap[skill] = newConfidenceMap[skill] === 'know' ? 'practice' : 'know'

      // Calculate new score
      let scoreAdjustment = 0
      Object.values(newConfidenceMap).forEach(confidence => {
        scoreAdjustment += confidence === 'know' ? 2 : -2
      })
      const newFinalScore = Math.max(0, Math.min(100, prev.baseScore + scoreAdjustment))

      const updated = {
        ...prev,
        skillConfidenceMap: newConfidenceMap,
        finalScore: newFinalScore,
        updatedAt: new Date().toISOString(),
      }

      localStorage.setItem('currentAnalysis', JSON.stringify(updated))

      // Also update history
      const history = JSON.parse(localStorage.getItem('analysisHistory') || '[]')
      const existingIndex = history.findIndex(h => h.id === prev.id)
      if (existingIndex >= 0) {
        history[existingIndex] = updated
        localStorage.setItem('analysisHistory', JSON.stringify(history))
      }

      return updated
    })
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  if (loading) return <div className="p-5">Loading...</div>
  if (!analysis) return <div className="p-5">No analysis found</div>

  return (
    <div className="p-5">
      {/* Header Section */}
      <div className="mb-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="heading-h2">{analysis.company || 'Job Analysis'}</div>
            {analysis.role && <p className="text-base text-gray">{analysis.role}</p>}
          </div>
          <div className="text-right">
            <div className="text-4xl font-serif text-accent font-bold">{analysis.finalScore}</div>
            <p className="text-sm text-gray">Readiness Score</p>
          </div>
        </div>

        {/* Company Info */}
        {analysis.companyInfo && (
          <div className="card mb-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm font-medium text-gray">Company Size</p>
                <p className="text-base font-medium">{analysis.companyInfo.size}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray">Estimate</p>
                <p className="text-base font-medium">{analysis.companyInfo.estimate} employees</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 border-b border-border">
        {['overview', 'skills', 'rounds', 'plan', 'checklist', 'questions'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2 py-[12px] font-medium text-base border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-accent text-accent'
                : 'border-transparent text-gray hover:text-text-primary'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-3">
          <div className="card">
            <h3 className="heading-h4 mb-2">Analysis Summary</h3>
            <div className="space-y-2 text-base">
              <p><strong>Company:</strong> {analysis.company || 'Not provided'}</p>
              <p><strong>Role:</strong> {analysis.role || 'Not provided'}</p>
              <p><strong>JD Length:</strong> {analysis.jdText.length} characters</p>
              <p><strong>Base Score:</strong> {analysis.baseScore}</p>
              <p><strong>Final Score:</strong> {analysis.finalScore}</p>
            </div>
          </div>
        </div>
      )}

      {/* Skills Tab */}
      {activeTab === 'skills' && (
        <div className="space-y-3">
          {Object.entries(analysis.extractedSkills).map(([category, skills]) => (
            skills.length > 0 && (
              <div key={category} className="card">
                <h3 className="heading-h4 mb-2 capitalize">{category}</h3>
                <div className="flex flex-wrap gap-1">
                  {skills.map(skill => {
                    const confidence = analysis.skillConfidenceMap[skill] || 'practice'
                    const isKnown = confidence === 'know'
                    return (
                      <button
                        key={skill}
                        onClick={() => toggleSkillConfidence(skill)}
                        className={`px-2 py-1 rounded-base text-sm font-medium transition-colors ${
                          isKnown
                            ? 'bg-success text-white border border-success'
                            : 'bg-white border border-warning text-warning'
                        }`}
                      >
                        {isKnown ? '✓' : '!'}  {skill}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {/* Rounds Tab */}
      {activeTab === 'rounds' && (
        <div className="space-y-3">
          {analysis.roundMapping && analysis.roundMapping.map((round, idx) => (
            <div key={idx} className="card">
              <h3 className="heading-h4 mb-2">{round.roundTitle}</h3>
              <p className="text-base text-gray mb-2">{round.whyItMatters}</p>
              <div className="flex flex-wrap gap-1">
                {round.focusAreas && round.focusAreas.map((area, i) => (
                  <span key={i} className="badge-neutral">{area}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Plan Tab */}
      {activeTab === 'plan' && (
        <div className="space-y-3">
          {analysis.plan7Days && analysis.plan7Days.map((day, idx) => (
            <div key={idx} className="card">
              <h3 className="heading-h4 mb-2">{day.day}: {day.focus}</h3>
              <ul className="list-disc list-inside space-y-1">
                {day.tasks.map((task, i) => (
                  <li key={i} className="text-base">{task}</li>
                ))}
              </ul>
            </div>
          ))}
          <button
            onClick={() => copyToClipboard(analysis.plan7Days.map(d => `${d.day}: ${d.focus}\n${d.tasks.join('\n')}`).join('\n\n'))}
            className="btn-secondary w-full"
          >
            Copy 7-day plan
          </button>
        </div>
      )}

      {/* Checklist Tab */}
      {activeTab === 'checklist' && (
        <div className="space-y-3">
          {analysis.checklist && analysis.checklist.map((round, idx) => (
            <div key={idx} className="card">
              <h3 className="heading-h4 mb-2">{round.roundTitle}</h3>
              <ul className="space-y-2">
                {round.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button
            onClick={() => copyToClipboard(analysis.checklist.map(c => `${c.roundTitle}\n${c.items.map(i => `☐ ${i}`).join('\n')}`).join('\n\n'))}
            className="btn-secondary w-full"
          >
            Copy checklist
          </button>
        </div>
      )}

      {/* Questions Tab */}
      {activeTab === 'questions' && (
        <div className="space-y-3">
          {analysis.questions && analysis.questions.map((q, idx) => (
            <div key={idx} className="card">
              <p className="text-base font-medium mb-1">Q{idx + 1}. {q}</p>
            </div>
          ))}
          <button
            onClick={() => copyToClipboard(analysis.questions.map((q, i) => `${i + 1}. ${q}`).join('\n\n'))}
            className="btn-secondary w-full"
          >
            Copy 10 questions
          </button>
        </div>
      )}

      {/* Export Options */}
      <div className="mt-5 bg-white border border-border p-3 rounded-base">
        <h3 className="heading-h4 mb-2">Export</h3>
        <button
          onClick={() => {
            const allText = `PLACEMENT READINESS ANALYSIS
Company: ${analysis.company || 'N/A'}
Role: ${analysis.role || 'N/A'}
Readiness Score: ${analysis.finalScore}/100

=== EXTRACTED SKILLS ===
${Object.entries(analysis.extractedSkills).map(([cat, skills]) => `${cat}: ${skills.join(', ')}`).join('\n')}

=== 7-DAY PLAN ===
${analysis.plan7Days.map(d => `${d.day}: ${d.focus}\n${d.tasks.join('\n')}`).join('\n\n')}

=== ROUND CHECKLIST ===
${analysis.checklist.map(r => `${r.roundTitle}\n${r.items.map(i => `☐ ${i}`).join('\n')}`).join('\n\n')}

=== INTERVIEW QUESTIONS ===
${analysis.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}`
            
            const blob = new Blob([allText], { type: 'text/plain' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `prp-${analysis.company || 'analysis'}.txt`
            a.click()
          }}
          className="btn-primary w-full"
        >
          Download as TXT
        </button>
      </div>
    </div>
  )
}
