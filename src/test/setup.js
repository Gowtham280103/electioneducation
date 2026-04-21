import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock canvas for jsdom (HTMLCanvasElement not supported in jsdom)
HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
  clearRect: vi.fn(),
  fillStyle: '',
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn(cb => setTimeout(cb, 0))
global.cancelAnimationFrame = vi.fn()
