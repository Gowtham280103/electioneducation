// Google Analytics utility for Election Process Educator AI

export const GA_TRACKING_ID = 'G-ELECTION2024'

// Track page views
export const trackPageView = (pageName) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
    })
  }
}

// Track events
export const trackEvent = (action, category, label = '', value = 0) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Specific tracking functions
export const trackQuestionAsked = (question) => {
  trackEvent('question_asked', 'AI_Chat', question)
}

export const trackQuizCompleted = (score) => {
  trackEvent('quiz_completed', 'Quiz', 'score', score)
}

export const trackTimelineStep = (stepName) => {
  trackEvent('timeline_step_viewed', 'Timeline', stepName)
}

export const trackLanguageToggle = (language) => {
  trackEvent('language_toggled', 'Settings', language)
}

export const trackThemeToggle = (theme) => {
  trackEvent('theme_toggled', 'Settings', theme)
}

export const trackBadgeEarned = (badgeName) => {
  trackEvent('badge_earned', 'Gamification', badgeName)
}
