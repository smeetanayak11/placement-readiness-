import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function History() {
  const navigate = useNavigate()
  const [entries, setEntries] = useState([])

  useEffect(() => {
    // Load all history from localStorage
    const history = JSON.parse(localStorage.getItem('analysisHistory') || '[]')
    setEntries(history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
  }, [])

  const loadEntry = (entry) => {
    localStorage.setItem('currentAnalysis', JSON.stringify(entry))
    navigate('/prp/04-results')
  }

  const deleteEntry = (id) => {
    const updated = entries.filter(e => e.id !== id)
    localStorage.setItem('analysisHistory', JSON.stringify(updated))
    setEntries(updated)
  }

  if (entries.length === 0) {
    return (
      <div className="p-5 max-w-4xl">
        <div className="heading-h2 mb-3">Analysis History</div>
        <div className="card">
          <p className="text-base text-gray">No analyses yet. Start by analyzing a JD to build your history.</p>
          <button
            onClick={() => navigate('/prp/01-home')}
            className="btn-primary mt-3"
          >
            New Analysis
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-5 max-w-4xl">
      <div className="heading-h2 mb-3">Analysis History</div>
      <div className="space-y-2">
        {entries.map(entry => (
          <div key={entry.id} className="card">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="heading-h4">{entry.company || 'Unnamed'}</h3>
                {entry.role && <p className="text-base text-gray">{entry.role}</p>}
                <p className="text-sm text-gray mt-1">
                  {new Date(entry.createdAt).toLocaleDateString()} - Score: {entry.finalScore || entry.baseScore}/100
                </p>
              </div>
              <div className="flex gap-1 ms-auto">
                <button
                  onClick={() => loadEntry(entry)}
                  className="btn-primary text-sm"
                >
                  View
                </button>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="btn-secondary text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
