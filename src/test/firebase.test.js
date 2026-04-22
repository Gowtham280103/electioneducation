import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  logPageView,
  logQuestionAsked,
  logQuizCompleted,
  logTimelineStepViewed,
  logBadgeEarned,
  logLanguageChanged,
  logThemeChanged,
} from '../services/firebase'

describe('Firebase Google Services Integration', () => {
  beforeEach(() => {
    window.gtag = vi.fn()
  })

  it('logPageView fires gtag page_view event', () => {
    logPageView('Home')
    expect(window.gtag).toHaveBeenCalledWith('event', 'page_view',
      expect.objectContaining({ page_title: 'Home' })
    )
  })

  it('logPageView works for all pages', () => {
    const pages = ['Home', 'Chat', 'Timeline', 'Quiz', 'Facts']
    pages.forEach(page => {
      logPageView(page)
    })
    expect(window.gtag).toHaveBeenCalledTimes(pages.length)
  })

  it('logQuestionAsked fires with correct category', () => {
    logQuestionAsked('How does voting work?', 'en')
    expect(window.gtag).toHaveBeenCalledWith('event', 'question_asked',
      expect.objectContaining({ event_category: 'AI_Chat' })
    )
  })

  it('logQuizCompleted fires with score value', () => {
    logQuizCompleted(80, 8, 80)
    expect(window.gtag).toHaveBeenCalledWith('event', 'quiz_completed',
      expect.objectContaining({ event_category: 'Quiz', value: 80 })
    )
  })

  it('logBadgeEarned fires with badge name', () => {
    logBadgeEarned('Quiz Champion')
    expect(window.gtag).toHaveBeenCalledWith('event', 'badge_earned',
      expect.objectContaining({
        event_category: 'Gamification',
        event_label: 'Quiz Champion',
      })
    )
  })

  it('logLanguageChanged does not throw', () => {
    expect(() => logLanguageChanged('ta')).not.toThrow()
  })

  it('logThemeChanged does not throw', () => {
    expect(() => logThemeChanged('dark')).not.toThrow()
  })

  it('logTimelineStepViewed does not throw', () => {
    expect(() => logTimelineStepViewed(1, 'Voter Registration')).not.toThrow()
  })

  it('all functions handle missing gtag gracefully', () => {
    delete window.gtag
    expect(() => logPageView('Home')).not.toThrow()
    expect(() => logQuestionAsked('test', 'en')).not.toThrow()
    expect(() => logQuizCompleted(80, 8, 80)).not.toThrow()
    expect(() => logBadgeEarned('Test')).not.toThrow()
    expect(() => logLanguageChanged('ta')).not.toThrow()
    expect(() => logThemeChanged('light')).not.toThrow()
    expect(() => logTimelineStepViewed(1, 'Step 1')).not.toThrow()
  })
})
