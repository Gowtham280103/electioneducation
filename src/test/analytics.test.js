import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  trackPageView,
  trackEvent,
  trackQuestionAsked,
  trackQuizCompleted,
  trackTimelineStep,
  trackLanguageToggle,
  trackThemeToggle,
  trackBadgeEarned,
  GA_TRACKING_ID,
} from '../utils/analytics'

describe('Google Analytics Utilities', () => {
  beforeEach(() => {
    window.gtag = vi.fn()
  })

  it('GA_TRACKING_ID should be defined', () => {
    expect(GA_TRACKING_ID).toBeDefined()
    expect(typeof GA_TRACKING_ID).toBe('string')
    expect(GA_TRACKING_ID.length).toBeGreaterThan(0)
  })

  it('trackPageView calls gtag with page_view event', () => {
    trackPageView('Home')
    expect(window.gtag).toHaveBeenCalledWith('event', 'page_view', expect.objectContaining({
      page_title: 'Home',
    }))
  })

  it('trackEvent calls gtag with correct parameters', () => {
    trackEvent('test_action', 'test_category', 'test_label', 1)
    expect(window.gtag).toHaveBeenCalledWith('event', 'test_action', {
      event_category: 'test_category',
      event_label: 'test_label',
      value: 1,
    })
  })

  it('trackQuestionAsked tracks AI_Chat category', () => {
    trackQuestionAsked('How does voting work?')
    expect(window.gtag).toHaveBeenCalledWith('event', 'question_asked', expect.objectContaining({
      event_category: 'AI_Chat',
      event_label: 'How does voting work?',
    }))
  })

  it('trackQuizCompleted tracks Quiz category with score', () => {
    trackQuizCompleted(80)
    expect(window.gtag).toHaveBeenCalledWith('event', 'quiz_completed', expect.objectContaining({
      event_category: 'Quiz',
      value: 80,
    }))
  })

  it('trackTimelineStep tracks Timeline category', () => {
    trackTimelineStep('Voter Registration')
    expect(window.gtag).toHaveBeenCalledWith('event', 'timeline_step_viewed', expect.objectContaining({
      event_category: 'Timeline',
      event_label: 'Voter Registration',
    }))
  })

  it('trackLanguageToggle tracks Settings category', () => {
    trackLanguageToggle('ta')
    expect(window.gtag).toHaveBeenCalledWith('event', 'language_toggled', expect.objectContaining({
      event_category: 'Settings',
      event_label: 'ta',
    }))
  })

  it('trackThemeToggle tracks Settings category', () => {
    trackThemeToggle('dark')
    expect(window.gtag).toHaveBeenCalledWith('event', 'theme_toggled', expect.objectContaining({
      event_category: 'Settings',
      event_label: 'dark',
    }))
  })

  it('trackBadgeEarned tracks Gamification category', () => {
    trackBadgeEarned('Quiz Champion')
    expect(window.gtag).toHaveBeenCalledWith('event', 'badge_earned', expect.objectContaining({
      event_category: 'Gamification',
      event_label: 'Quiz Champion',
    }))
  })

  it('does not throw when gtag is not available', () => {
    delete window.gtag
    expect(() => trackPageView('Home')).not.toThrow()
    expect(() => trackEvent('action', 'category')).not.toThrow()
    expect(() => trackQuestionAsked('test')).not.toThrow()
  })
})
