// Skill extraction from JD text
const SKILL_KEYWORDS = {
  coreCS: ['DSA', 'OOP', 'DBMS', 'OS', 'Networks', 'Data Structures', 'Algorithms', 'Object-Oriented', 'Database', 'Operating System', 'Networking'],
  languages: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'C#', 'Go', 'Rust', 'Ruby', 'PHP'],
  web: ['React', 'Next.js', 'Node.js', 'Express', 'REST', 'GraphQL', 'Vue', 'Angular', 'HTML', 'CSS', 'Web Development'],
  data: ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Database', 'NoSQL', 'Firebase'],
  cloud: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'DevOps', 'Cloud'],
  testing: ['Selenium', 'Cypress', 'Playwright', 'JUnit', 'PyTest', 'Testing', 'QA'],
}

export function extractSkills(jdText) {
  const textLower = jdText.toLowerCase()
  const extracted = {
    coreCS: [],
    languages: [],
    web: [],
    data: [],
    cloud: [],
    testing: [],
    other: [],
  }

  // Extract skills from categories
  Object.entries(SKILL_KEYWORDS).forEach(([category, keywords]) => {
    keywords.forEach(keyword => {
      if (textLower.includes(keyword.toLowerCase())) {
        if (!extracted[category].includes(keyword)) {
          extracted[category].push(keyword)
        }
      }
    })
  })

  // If no skills detected, use general fresher stack
  const hasAnySkill = Object.values(extracted).some(arr => arr.length > 0)
  if (!hasAnySkill) {
    extracted.other = ['Communication', 'Problem solving', 'Basic coding', 'Projects']
  }

  return extracted
}

// Generate round-wise preparation checklist
export function generateChecklist(extractedSkills) {
  const checklist = [
    {
      roundTitle: 'Round 1: Aptitude / Basics',
      items: [
        'Understand fundamentals',
        'Practice basic logic',
        'Prepare for numerical reasoning',
        'Review English comprehension',
        'Take mock aptitude tests',
        'Analyze your weak areas',
        'Create quick reference sheet',
        'Practice under time pressure',
      ]
    },
    {
      roundTitle: 'Round 2: DSA + Core CS',
      items: [
        'Master data structures',
        'Practice sorting and searching',
        'Learn tree and graph concepts',
        'Solve 50+ DSA problems',
        'Understand time complexity',
        'Review OS fundamentals',
        'Study DBMS concepts',
        'Practice coding under time limit',
      ]
    },
    {
      roundTitle: 'Round 3: Technical Interview',
      items: [
        'Showcase your projects',
        'Explain tech stack depth',
        'Practice system design',
        'Prepare for behavioral questions',
        'Mock interview practice',
        'Review your GitHub',
        'Plan project walkthrough',
        'Study company products',
      ]
    },
    {
      roundTitle: 'Round 4: HR / Managerial',
      items: [
        'Prepare self introduction',
        'Understand company culture',
        'Research company background',
        'Prepare career goals',
        'Practice salary negotiation',
        'Prepare thoughtful questions',
        'Review your resume',
        'Mock HR round',
      ]
    },
  ]

  // Customize based on skills
  if (extractedSkills.languages.length > 0) {
    checklist[2].items.push(`Practice ${extractedSkills.languages[0]}`)
  }
  if (extractedSkills.web.length > 0) {
    checklist[2].items.push(`Review ${extractedSkills.web[0]} patterns`)
  }
  if (extractedSkills.cloud.length > 0) {
    checklist[1].items.push(`Study ${extractedSkills.cloud[0]} services`)
  }

  return checklist
}

// Generate 7-day preparation plan
export function generatePlan(extractedSkills) {
  const plan = [
    {
      day: 'Day 1-2',
      focus: 'Basics + Core CS',
      tasks: [
        'Review OS fundamentals',
        'Study data structures basics',
        'Practice 5 basic questions',
        'Understand time complexity',
      ]
    },
    {
      day: 'Day 3-4',
      focus: 'DSA + Coding Practice',
      tasks: [
        'Master arrays and linked lists',
        'Practice 10 coding problems',
        'Learn sorting algorithms',
        'Implement 3 data structures from scratch',
      ]
    },
    {
      day: 'Day 5',
      focus: 'Projects + Resume Alignment',
      tasks: [
        'List your 2-3 best projects',
        'Align projects with JD skills',
        'Prepare 2-minute project explanations',
        'Update resume if needed',
      ]
    },
    {
      day: 'Day 6',
      focus: 'Mock Interview Questions',
      tasks: [
        'Generate likely interview questions',
        'Practice HR questions',
        'Record yourself answering',
        'Get feedback from peers',
      ]
    },
    {
      day: 'Day 7',
      focus: 'Revision + Weak Areas',
      tasks: [
        'Revise weak concepts',
        'Re-practice difficult problems',
        'Mock interview round',
        'Final readiness check',
      ]
    },
  ]

  // Customize based on detected skills
  if (extractedSkills.web.length > 0) {
    plan[4].tasks.push('Review frontend/backend patterns')
  }
  if (extractedSkills.testing.length > 0) {
    plan[1].tasks.push('Practice automation testing concepts')
  }

  return plan
}

// Generate likely interview questions
export function generateQuestions(extractedSkills, company = '', role = '') {
  const questions = []

  // Core questions
  if (extractedSkills.coreCS.includes('DSA')) {
    questions.push('How would you optimize search in sorted data? Discuss time/space complexity.')
    questions.push('Explain the difference between array and linked list. When to use each?')
    questions.push('What is a hash table and how does it handle collisions?')
  }

  if (extractedSkills.data.includes('SQL') || extractedSkills.data.length > 0) {
    questions.push('Explain indexing and when it helps improve query performance.')
    questions.push('What is database normalization and why is it important?')
  }

  if (extractedSkills.languages.includes('Java')) {
    questions.push('Explain multithreading and synchronization in Java.')
    questions.push('What are the SOLID principles and how do you apply them?')
  }

  if (extractedSkills.languages.includes('Python')) {
    questions.push('What is the GIL (Global Interpreter Lock) in Python?')
    questions.push('Explain list comprehensions and when to use them.')
  }

  if (extractedSkills.web.includes('React') || extractedSkills.web.includes('Next.js')) {
    questions.push('Explain React hooks and the lifecycle of useEffect.')
    questions.push('What are state management options? Discuss Redux vs Context API.')
    questions.push('Explain async/await and promises in JavaScript.')
  }

  if (extractedSkills.cloud.includes('AWS') || extractedSkills.cloud.includes('Docker')) {
    questions.push('What is containerization and how does Docker help?')
    questions.push('Explain microservices architecture and when to use it.')
  }

  if (extractedSkills.testing.length > 0) {
    questions.push('What is the difference between unit and integration testing?')
    questions.push('How do you approach automating test scenarios?')
  }

  // Generic fallback questions
  if (questions.length < 10) {
    const genericQuestions = [
      'Tell me about a challenging project and how you solved it.',
      'How do you debug a complex system issue?',
      'What software development practices do you follow?',
      'How do you handle tight deadlines?',
      'Describe your biggest learning in recent projects.',
      'How do you stay updated with technology?',
      'Explain a recent system design you worked on.',
      'What is your approach to writing clean, maintainable code?',
      'How do you ensure code quality in your team?',
      'Describe a time you had to learn something quickly.',
    ]
    
    const needed = 10 - questions.length
    for (let i = 0; i < needed && i < genericQuestions.length; i++) {
      questions.push(genericQuestions[i])
    }
  }

  return questions.slice(0, 10)
}

// Calculate readiness score
export function calculateScore(extractedSkills, company = '', role = '', jdText = '') {
  let score = 35 // Base score

  // +5 per category with skills
  Object.values(extractedSkills).forEach(skills => {
    if (skills.length > 0) {
      score += 5
    }
  })

  // +10 for company provided
  if (company.trim()) score += 10

  // +10 for role provided
  if (role.trim()) score += 10

  // +10 for substantial JD
  if (jdText.length > 800) score += 10

  // Cap at 100
  return Math.min(score, 100)
}

// Infer company size
export function inferCompanySize(company) {
  const enterprise = ['Amazon', 'Google', 'Microsoft', 'Apple', 'Infosys', 'TCS', 'Wipro', 'Accenture', 'IBM', 'Facebook', 'Meta', 'Tesla', 'Netflix', 'LinkedIn', 'Oracle', 'Salesforce']
  
  if (enterprise.some(e => company.toLowerCase().includes(e.toLowerCase()))) {
    return { size: 'Enterprise', estimate: '2000+' }
  }

  // Default to startup for unknown
  return { size: 'Startup', estimate: '<200' }
}

// Generate round mapping based on company and skills
export function generateRoundMapping(company, extractedSkills) {
  const companyInfo = inferCompanySize(company)
  const isEnterprise = companyInfo.size === 'Enterprise'

  let roundMapping = []

  if (isEnterprise) {
    roundMapping = [
      { roundTitle: 'Online Assessment', focusAreas: ['DSA', 'Aptitude'], whyItMatters: 'Initial screening to handle volume' },
      { roundTitle: 'Technical Round 1', focusAreas: ['DSA', 'Coding'], whyItMatters: 'Coding fundamentals and problem solving' },
      { roundTitle: 'Technical Round 2', focusAreas: ['System Design', 'Core CS'], whyItMatters: 'Deeper technical knowledge' },
      { roundTitle: 'Managerial Round', focusAreas: ['Leadership', 'Communication'], whyItMatters: 'Fit and growth potential' },
      { roundTitle: 'HR Round', focusAreas: ['Behavioral', 'Culture'], whyItMatters: 'Final cultural fit assessment' },
    ]
  } else {
    roundMapping = [
      { roundTitle: 'Technical Round 1', focusAreas: ['Practical coding', 'Project discussion'], whyItMatters: 'Quick assessment of actual skills' },
      { roundTitle: 'Technical Round 2', focusAreas: ['System thinking', 'Architecture'], whyItMatters: 'Problem-solving approach' },
      { roundTitle: 'Founder / Manager Chat', focusAreas: ['Fit', 'Learning attitude'], whyItMatters: 'Culture alignment and growth mindset' },
    ]
  }

  // Customize based on detected skills
  if (extractedSkills.web.length > 0) {
    roundMapping.forEach(round => {
      if (round.focusAreas.includes('Technical')) {
        round.focusAreas.push('Frontend/Backend')
      }
    })
  }

  return roundMapping
}
