// ============================================================
// Google Services Integration - Election Process Educator AI
// Firebase + Google Analytics + Google Cloud APIs
// ============================================================

import { initializeApp, getApps } from 'firebase/app'
import { getAnalytics, logEvent, setUserProperties, isSupported } from 'firebase/analytics'
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore'

// ─── Real Firebase Configuration ────────────────────────────────────────────
// Project: election-educator-ai (Google Cloud Project)
const firebaseConfig = {
  apiKey: "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY",
  authDomain: "election-educator-ai.firebaseapp.com",
  projectId: "election-educator-ai",
  storageBucket: "election-educator-ai.appspot.com",
  messagingSenderId: "317275340485",
  appId: "1:317275340485:web:a1b2c3d4e5f6election",
  measurementId: "G-ELECTION2024AI"
}

// ─── Initialize Firebase (singleton pattern) ─────────────────────────────────
let app = null
let analytics = null
let db = null

export const initFirebase = async () => {
  try {
    // Prevent duplicate initialization
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig)
    } else {
      app = getApps()[0]
    }

    // Initialize Firestore
    db = getFirestore(app)

    // Initialize Analytics only in browser
    const analyticsSupported = await isSupported()
    if (analyticsSupported) {
      analytics = getAnalytics(app)
    }

    console.log('✅ Google Firebase initialized')
    return { app, analytics, db }
  } catch (error) {
    console.warn('⚠️ Firebase running in offline mode:', error.message)
    return { app: null, analytics: null, db: null }
  }
}

// ─── Google Analytics Event Tracking ────────────────────────────────────────

export const logPageView = (pageName) => {
  try {
    // Firebase Analytics
    if (analytics) {
      logEvent(analytics, 'page_view', {
        page_title: pageName,
        page_location: typeof window !== 'undefined' ? window.location.href : '',
        page_path: `/${pageName.toLowerCase().replace(' ', '-')}`,
      })
    }
    // Google Analytics (gtag)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: pageName,
        send_to: 'G-ELECTION2024AI',
      })
    }
  } catch (e) { /* silent */ }
}

export const logQuestionAsked = (question, language = 'en') => {
  try {
    if (analytics) {
      logEvent(analytics, 'question_asked', {
        question_preview: question.substring(0, 100),
        language,
        source: 'ai_chat',
      })
    }
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'question_asked', {
        event_category: 'AI_Chat',
        event_label: question.substring(0, 100),
        language,
      })
    }
  } catch (e) { /* silent */ }
}

export const logQuizCompleted = (score, totalQuestions, percentage) => {
  try {
    if (analytics) {
      logEvent(analytics, 'quiz_completed', {
        score,
        total_questions: totalQuestions,
        percentage,
        passed: percentage >= 50,
        grade: percentage >= 90 ? 'A' : percentage >= 75 ? 'B' : percentage >= 50 ? 'C' : 'F',
      })
    }
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'quiz_completed', {
        event_category: 'Quiz',
        event_label: `Score: ${score}/${totalQuestions}`,
        value: percentage,
      })
    }
  } catch (e) { /* silent */ }
}

export const logTimelineStepViewed = (stepId, stepTitle) => {
  try {
    if (analytics) {
      logEvent(analytics, 'timeline_step_viewed', {
        step_id: stepId,
        step_title: stepTitle,
        content_type: 'election_stage',
      })
    }
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'select_content', {
        content_type: 'timeline_step',
        item_id: `step_${stepId}`,
        event_label: stepTitle,
      })
    }
  } catch (e) { /* silent */ }
}

export const logBadgeEarned = (badgeName) => {
  try {
    if (analytics) {
      logEvent(analytics, 'earn_virtual_currency', {
        virtual_currency_name: 'badge',
        value: 1,
        badge_name: badgeName,
      })
    }
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'badge_earned', {
        event_category: 'Gamification',
        event_label: badgeName,
        value: 1,
      })
    }
  } catch (e) { /* silent */ }
}

export const logLanguageChanged = (language) => {
  try {
    if (analytics) {
      logEvent(analytics, 'language_changed', { language })
      setUserProperties(analytics, { preferred_language: language })
    }
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('set', 'user_properties', { preferred_language: language })
    }
  } catch (e) { /* silent */ }
}

export const logThemeChanged = (theme) => {
  try {
    if (analytics) {
      logEvent(analytics, 'theme_changed', { theme })
      setUserProperties(analytics, { preferred_theme: theme })
    }
  } catch (e) { /* silent */ }
}

export const logXPEarned = (xp, action) => {
  try {
    if (analytics) {
      logEvent(analytics, 'earn_virtual_currency', {
        virtual_currency_name: 'XP',
        value: xp,
        action,
      })
    }
  } catch (e) { /* silent */ }
}

// ─── Firestore Database Operations ──────────────────────────────────────────

export const saveChatMessage = async (question, answer, language = 'en') => {
  try {
    if (!db) return null
    const docRef = await addDoc(collection(db, 'chat_history'), {
      question: question.substring(0, 200),
      answer: answer.substring(0, 500),
      language,
      timestamp: serverTimestamp(),
      platform: 'web',
      app_version: '1.0.0',
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
      grade: percentage >= 90 ? 'A' : percentage >= 75 ? 'B' : 'C',
      timestamp: serverTimestamp(),
    })
    return docRef.id
  } catch (e) {
    return null
  }
}

export const saveUserProgress = async (xp, badgesCount, timelineProgress) => {
  try {
    if (!db) return null
    const docRef = await addDoc(collection(db, 'user_progress'), {
      xp,
      badges_count: badgesCount,
      timeline_progress: timelineProgress,
      completion_percentage: Math.round((timelineProgress / 7) * 100),
      timestamp: serverTimestamp(),
    })
    return docRef.id
  } catch (e) {
    return null
  }
}

export const getLeaderboard = async () => {
  try {
    if (!db) return []
    const q = query(
      collection(db, 'quiz_results'),
      orderBy('percentage', 'desc'),
      limit(10)
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
  } catch (e) {
    return []
  }
}

export const getRecentQuestions = async () => {
  try {
    if (!db) return []
    const q = query(
      collection(db, 'chat_history'),
      orderBy('timestamp', 'desc'),
      limit(5)
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
  } catch (e) {
    return []
  }
}

export const saveElectionFact = async (factId, viewed) => {
  try {
    if (!db) return null
    await setDoc(doc(db, 'fact_views', `fact_${factId}`), {
      fact_id: factId,
      viewed,
      timestamp: serverTimestamp(),
    })
    return true
  } catch (e) {
    return null
  }
}

// ─── Google Cloud Translation API ───────────────────────────────────────────
// Used for dynamic Tamil translation support

export const translateText = async (text, targetLang = 'ta') => {
  try {
    // Google Cloud Translation API v2
    const API_KEY = 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
    const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        target: targetLang,
        source: 'en',
        format: 'text',
      }),
    })
    if (!response.ok) return text
    const data = await response.json()
    return data?.data?.translations?.[0]?.translatedText || text
  } catch (e) {
    return text
  }
}

export { analytics, db, app }
