// Firebase Configuration - Google Services Integration
import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent, setUserProperties } from 'firebase/analytics'
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore'
import { getPerformance } from 'firebase/performance'

// Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyElectionEducatorDemo2024",
  authDomain: "election-educator-ai.firebaseapp.com",
  projectId: "election-educator-ai",
  storageBucket: "election-educator-ai.appspot.com",
  messagingSenderId: "317275340485",
  appId: "1:317275340485:web:election2024educatorai",
  measurementId: "G-ELECTION2024AI"
}

// Initialize Firebase app
let app = null
let analytics = null
let db = null
let perf = null

export const initFirebase = () => {
  try {
    app = initializeApp(firebaseConfig)

    // Initialize Analytics
    if (typeof window !== 'undefined') {
      analytics = getAnalytics(app)
      perf = getPerformance(app)
    }

    // Initialize Firestore
    db = getFirestore(app)

    console.log('✅ Firebase initialized successfully')
    return { app, analytics, db }
  } catch (error) {
    console.warn('Firebase init error (demo mode):', error.message)
    return { app: null, analytics: null, db: null }
  }
}

// ─── Analytics Events ───────────────────────────────────────────────────────

export const logPageView = (pageName) => {
  try {
    if (analytics) {
      logEvent(analytics, 'page_view', {
        page_title: pageName,
        page_location: window.location.href,
        page_path: `/${pageName.toLowerCase()}`,
      })
    }
    // Also fire gtag if available
    if (window.gtag) {
      window.gtag('event', 'page_view', { page_title: pageName })
    }
  } catch (e) { /* silent fail */ }
}

export const logQuestionAsked = (question, language) => {
  try {
    if (analytics) {
      logEvent(analytics, 'question_asked', {
        question_text: question.substring(0, 100),
        language,
        timestamp: Date.now(),
      })
    }
    if (window.gtag) {
      window.gtag('event', 'question_asked', {
        event_category: 'AI_Chat',
        event_label: question.substring(0, 100),
      })
    }
  } catch (e) { /* silent fail */ }
}

export const logQuizCompleted = (score, totalQuestions, percentage) => {
  try {
    if (analytics) {
      logEvent(analytics, 'quiz_completed', {
        score,
        total_questions: totalQuestions,
        percentage,
        passed: percentage >= 50,
      })
    }
    if (window.gtag) {
      window.gtag('event', 'quiz_completed', {
        event_category: 'Quiz',
        value: percentage,
      })
    }
  } catch (e) { /* silent fail */ }
}

export const logTimelineStepViewed = (stepId, stepTitle) => {
  try {
    if (analytics) {
      logEvent(analytics, 'timeline_step_viewed', {
        step_id: stepId,
        step_title: stepTitle,
      })
    }
  } catch (e) { /* silent fail */ }
}

export const logBadgeEarned = (badgeName) => {
  try {
    if (analytics) {
      logEvent(analytics, 'badge_earned', {
        badge_name: badgeName,
        timestamp: Date.now(),
      })
    }
    if (window.gtag) {
      window.gtag('event', 'badge_earned', {
        event_category: 'Gamification',
        event_label: badgeName,
      })
    }
  } catch (e) { /* silent fail */ }
}

export const logLanguageChanged = (language) => {
  try {
    if (analytics) {
      logEvent(analytics, 'language_changed', { language })
      setUserProperties(analytics, { preferred_language: language })
    }
  } catch (e) { /* silent fail */ }
}

export const logThemeChanged = (theme) => {
  try {
    if (analytics) {
      logEvent(analytics, 'theme_changed', { theme })
      setUserProperties(analytics, { preferred_theme: theme })
    }
  } catch (e) { /* silent fail */ }
}

// ─── Firestore Database ──────────────────────────────────────────────────────

export const saveChatMessage = async (question, answer, language) => {
  try {
    if (!db) return null
    const docRef = await addDoc(collection(db, 'chat_history'), {
      question,
      answer: answer.substring(0, 500),
      language,
      timestamp: serverTimestamp(),
      platform: 'web',
    })
    return docRef.id
  } catch (e) {
    return null
  }
}

export const saveQuizResult = async (score, total, percentage) => {
  try {
    if (!db) return null
    const docRef = await addDoc(collection(db, 'quiz_results'), {
      score,
      total,
      percentage,
      passed: percentage >= 50,
      timestamp: serverTimestamp(),
    })
    return docRef.id
  } catch (e) {
    return null
  }
}

export const getTopQuestions = async () => {
  try {
    if (!db) return []
    const q = query(
      collection(db, 'chat_history'),
      orderBy('timestamp', 'desc'),
      limit(10)
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (e) {
    return []
  }
}

export const saveUserProgress = async (xp, badges, timelineProgress) => {
  try {
    if (!db) return null
    const docRef = await addDoc(collection(db, 'user_progress'), {
      xp,
      badges_count: badges,
      timeline_progress: timelineProgress,
      timestamp: serverTimestamp(),
    })
    return docRef.id
  } catch (e) {
    return null
  }
}

export { analytics, db }
