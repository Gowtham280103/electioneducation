import { describe, it, expect } from 'vitest'
import {
  electionSteps,
  quizQuestions,
  didYouKnowFacts,
  suggestedQuestions,
  aiResponses,
  badges,
} from '../data/electionData'

describe('electionSteps', () => {
  it('should have 7 election steps', () => {
    expect(electionSteps).toHaveLength(7)
  })

  it('each step should have required fields', () => {
    electionSteps.forEach(step => {
      expect(step).toHaveProperty('id')
      expect(step).toHaveProperty('icon')
      expect(step).toHaveProperty('title')
      expect(step).toHaveProperty('description')
      expect(step).toHaveProperty('details')
      expect(step).toHaveProperty('color')
      expect(step).toHaveProperty('duration')
    })
  })

  it('step ids should be sequential from 1 to 7', () => {
    const ids = electionSteps.map(s => s.id)
    expect(ids).toEqual([1, 2, 3, 4, 5, 6, 7])
  })

  it('first step should be Voter Registration', () => {
    expect(electionSteps[0].title).toBe('Voter Registration')
  })

  it('last step should be Results & Government', () => {
    expect(electionSteps[6].title).toBe('Results & Government')
  })

  it('each step should have at least one detail', () => {
    electionSteps.forEach(step => {
      expect(step.details.length).toBeGreaterThan(0)
    })
  })

  it('each step should have Tamil translation', () => {
    electionSteps.forEach(step => {
      expect(step).toHaveProperty('titleTa')
      expect(step).toHaveProperty('descriptionTa')
      expect(step.titleTa).toBeTruthy()
    })
  })
})

describe('quizQuestions', () => {
  it('should have 8 quiz questions', () => {
    expect(quizQuestions).toHaveLength(8)
  })

  it('each question should have required fields', () => {
    quizQuestions.forEach(q => {
      expect(q).toHaveProperty('id')
      expect(q).toHaveProperty('question')
      expect(q).toHaveProperty('options')
      expect(q).toHaveProperty('correct')
      expect(q).toHaveProperty('explanation')
      expect(q).toHaveProperty('category')
    })
  })

  it('each question should have exactly 4 options', () => {
    quizQuestions.forEach(q => {
      expect(q.options).toHaveLength(4)
    })
  })

  it('correct answer index should be between 0 and 3', () => {
    quizQuestions.forEach(q => {
      expect(q.correct).toBeGreaterThanOrEqual(0)
      expect(q.correct).toBeLessThanOrEqual(3)
    })
  })

  it('minimum voting age question should have correct answer 18', () => {
    const ageQuestion = quizQuestions.find(q => q.question.includes('minimum age'))
    expect(ageQuestion).toBeDefined()
    expect(ageQuestion.options[ageQuestion.correct]).toContain('18')
  })

  it('NOTA question should have correct answer as None Of The Above', () => {
    const notaQuestion = quizQuestions.find(q => q.question.includes('NOTA'))
    expect(notaQuestion).toBeDefined()
    expect(notaQuestion.options[notaQuestion.correct]).toBe('None Of The Above')
  })

  it('EVM question should have correct answer as Electronic Voting Machine', () => {
    const evmQuestion = quizQuestions.find(q => q.question.includes('EVM'))
    expect(evmQuestion).toBeDefined()
    expect(evmQuestion.options[evmQuestion.correct]).toBe('Electronic Voting Machine')
  })

  it('Lok Sabha seats question should answer 543', () => {
    const lsQuestion = quizQuestions.find(q => q.question.includes('Lok Sabha'))
    expect(lsQuestion).toBeDefined()
    expect(lsQuestion.options[lsQuestion.correct]).toBe('543')
  })
})

describe('didYouKnowFacts', () => {
  it('should have 6 facts', () => {
    expect(didYouKnowFacts).toHaveLength(6)
  })

  it('each fact should have required fields', () => {
    didYouKnowFacts.forEach(fact => {
      expect(fact).toHaveProperty('id')
      expect(fact).toHaveProperty('fact')
      expect(fact).toHaveProperty('factTa')
      expect(fact).toHaveProperty('icon')
      expect(fact).toHaveProperty('color')
    })
  })

  it('facts should mention India voter count', () => {
    const voterFact = didYouKnowFacts.find(f => f.fact.includes('960 million'))
    expect(voterFact).toBeDefined()
  })
})

describe('suggestedQuestions', () => {
  it('should have at least 5 suggested questions', () => {
    expect(suggestedQuestions.length).toBeGreaterThanOrEqual(5)
  })

  it('all suggested questions should be non-empty strings', () => {
    suggestedQuestions.forEach(q => {
      expect(typeof q).toBe('string')
      expect(q.length).toBeGreaterThan(0)
    })
  })
})

describe('aiResponses', () => {
  it('should have a default response', () => {
    expect(aiResponses).toHaveProperty('default')
    expect(aiResponses.default).toHaveProperty('title')
    expect(aiResponses.default).toHaveProperty('content')
    expect(aiResponses.default).toHaveProperty('tags')
  })

  it('should have response for NOTA', () => {
    expect(aiResponses).toHaveProperty('what is nota')
    expect(aiResponses['what is nota'].title).toContain('NOTA')
  })

  it('should have response for voting', () => {
    expect(aiResponses).toHaveProperty('how does voting work')
  })

  it('each response should have title, content and tags', () => {
    Object.values(aiResponses).forEach(response => {
      expect(response).toHaveProperty('title')
      expect(response).toHaveProperty('content')
      expect(response).toHaveProperty('tags')
      expect(Array.isArray(response.tags)).toBe(true)
    })
  })
})

describe('badges', () => {
  it('should have 6 badges', () => {
    expect(badges).toHaveLength(6)
  })

  it('each badge should have required fields', () => {
    badges.forEach(badge => {
      expect(badge).toHaveProperty('id')
      expect(badge).toHaveProperty('name')
      expect(badge).toHaveProperty('icon')
      expect(badge).toHaveProperty('description')
      expect(badge).toHaveProperty('threshold')
      expect(badge).toHaveProperty('type')
    })
  })

  it('badge ids should be unique', () => {
    const ids = badges.map(b => b.id)
    const uniqueIds = [...new Set(ids)]
    expect(ids).toHaveLength(uniqueIds.length)
  })
})
