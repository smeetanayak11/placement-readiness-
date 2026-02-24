import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'

function CircularProgress({ progress = 72, label = 'Readiness Score' }) {
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <svg width="200" height="200" className="mb-3">
        <circle
          cx="100"
          cy="100"
          r="45"
          fill="none"
          stroke="#F0EFEB"
          strokeWidth="8"
        />
        <circle
          cx="100"
          cy="100"
          r="45"
          fill="none"
          stroke="#8B0000"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
          transform="rotate(-90 100 100)"
        />
        <text
          x="100"
          y="100"
          textAnchor="middle"
          dy="0.3em"
          className="font-serif text-3xl font-bold"
          fill="#8B0000"
        >
          {progress}
        </text>
      </svg>
      <p className="text-sm text-gray">{label}</p>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)

  useEffect(() => {
    // In a real app, this would come from an API or user session
    setData({
      readinessScore: 72,
      skillBreakdown: [
        { name: 'DSA', value: 75 },
        { name: 'System Design', value: 60 },
        { name: 'Communication', value: 80 },
        { name: 'Resume', value: 85 },
        { name: 'Aptitude', value: 70 },
      ],
      continuePractice: {
        topic: 'Dynamic Programming',
        completed: 3,
        total: 10,
      },
      weeklyGoals: {
        solved: 12,
        target: 20,
        daysActive: [true, true, true, false, true, true, false],
      },
      upcomingAssessments: [
        { name: 'DSA Mock Test', date: 'Tomorrow', time: '10:00 AM' },
        { name: 'System Design Review', date: 'Wed', time: '2:00 PM' },
        { name: 'HR Interview Prep', date: 'Friday', time: '11:00 AM' },
      ],
    })
  }, [])

  if (!data) return <div className="p-5">Loading...</div>

  return (
    <div className="p-5">
      {/* Overall Readiness */}
      <div className="card mb-5">
        <h2 className="heading-h3 mb-3">Overall Readiness</h2>
        <div className="flex justify-center">
          <CircularProgress progress={data.readinessScore} />
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
        {/* Skill Breakdown */}
        <div className="card">
          <h3 className="heading-h4 mb-3">Skill Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data.skillBreakdown}>
                <PolarGrid stroke="#E5E4E0" />
                <PolarAngleAxis dataKey="name" stroke="#999999" />
                <PolarRadiusAxis stroke="#E5E4E0" />
                <Radar
                  name="Score"
                  dataKey="value"
                  stroke="#8B0000"
                  fill="#8B0000"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Continue Practice */}
        <div className="card">
          <h3 className="heading-h4 mb-3">Continue Practice</h3>
          <h4 className="text-lg font-medium mb-2">{data.continuePractice.topic}</h4>
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray">Progress</span>
              <span className="font-medium">{data.continuePractice.completed}/{data.continuePractice.total} completed</span>
            </div>
            <div className="bg-hover rounded-base h-2">
              <div
                className="bg-accent h-2 rounded-base transition-all"
                style={{ width: `${(data.continuePractice.completed / data.continuePractice.total) * 100}%` }}
              />
            </div>
          </div>
          <button className="btn-primary w-full">Continue</button>
        </div>
      </div>

      {/* Weekly Goals and Upcoming */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
        {/* Weekly Goals */}
        <div className="card">
          <h3 className="heading-h4 mb-3">Weekly Goals</h3>
          <p className="text-base mb-3">
            Problems Solved: <strong>{data.weeklyGoals.solved}/{data.weeklyGoals.target} this week</strong>
          </p>
          <div className="bg-hover rounded-base h-2 mb-3">
            <div
              className="bg-success h-2 rounded-base transition-all"
              style={{ width: `${(data.weeklyGoals.solved / data.weeklyGoals.target) * 100}%` }}
            />
          </div>
          <div className="flex justify-between gap-1">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
              <div key={day} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mb-1 ${
                    data.weeklyGoals.daysActive[idx]
                      ? 'bg-success text-white'
                      : 'bg-hover text-gray'
                  }`}
                >
                  {day.charAt(0)}
                </div>
                <span className="text-xs text-gray">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Assessments */}
        <div className="card">
          <h3 className="heading-h4 mb-3">Upcoming Assessments</h3>
          <div className="space-y-2">
            {data.upcomingAssessments.map((assessment, idx) => (
              <div key={idx} className="flex items-start justify-between pb-2 border-b border-border last:border-b-0">
                <div>
                  <p className="text-base font-medium">{assessment.name}</p>
                  <p className="text-sm text-gray">{assessment.date} · {assessment.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="card bg-accent text-white text-center">
        <p className="text-base mb-2">Ready to analyze a job description and get personalized prep?</p>
        <button
          onClick={() => navigate('/prp/01-home')}
          className="bg-white text-accent px-2 py-[12px] rounded-base font-semibold hover:bg-hover inline-block"
        >
          Analyze JD
        </button>
      </div>
    </div>
  )
}

