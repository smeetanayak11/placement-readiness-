import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    jdText: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleAnalyze = () => {
    if (!formData.jdText.trim()) {
      setError('JD textarea is required.')
      return
    }

    if (formData.jdText.trim().length < 200) {
      setError('This JD is too short to analyze deeply. Paste full JD for better output.')
      return
    }

    // Save analysis to localStorage
    const analysisEntry = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      company: formData.company,
      role: formData.role,
      jdText: formData.jdText,
      extractedSkills: {},
      roundMapping: [],
      checklist: [],
      plan7Days: [],
      questions: [],
      baseScore: 0,
      skillConfidenceMap: {},
      finalScore: 0,
      updatedAt: new Date().toISOString(),
    }

    localStorage.setItem('currentAnalysis', JSON.stringify(analysisEntry))
    navigate('/prp/04-results')
  }

  return (
    <div className="p-5 max-w-4xl">
      <div className="heading-h2 mb-2">Analyze Your Job Description</div>
      <p className="text-base text-gray prose mb-5">
        Paste your job description to get a personalized placement preparation plan
      </p>

      {error && (
        <div className="bg-white border border-warning p-3 rounded-base mb-3 text-warning">
          <p className="text-base font-medium">{error}</p>
        </div>
      )}

      <div className="space-y-3">
        <div>
          <label className="block text-base font-medium mb-1">Company (optional)</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g., Amazon, Infosys, Startup Inc"
            className="input w-full"
          />
        </div>

        <div>
          <label className="block text-base font-medium mb-1">Role (optional)</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="e.g., Senior Software Engineer, SDE-2"
            className="input w-full"
          />
        </div>

        <div>
          <label className="block text-base font-medium mb-1">Job Description *</label>
          <textarea
            name="jdText"
            value={formData.jdText}
            onChange={handleChange}
            placeholder="Paste the complete job description here..."
            rows="12"
            className="input w-full font-sans resize-none"
          />
        </div>

        <button onClick={handleAnalyze} className="btn-primary w-full">
          Analyze JD
        </button>
      </div>
    </div>
  )
}
