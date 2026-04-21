import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AppProvider } from '../context/AppContext'
import App from '../App'

const renderWithProvider = (component) => {
  return render(<AppProvider>{component}</AppProvider>)
}

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(document.body).toBeTruthy()
  })

  it('renders the navbar', () => {
    render(<App />)
    expect(screen.getByText(/Election Educator/i)).toBeInTheDocument()
  })

  it('renders the home page by default', () => {
    render(<App />)
    expect(screen.getByText(/AI Powered/i)).toBeInTheDocument()
  })

  it('renders footer with hackathon info', () => {
    render(<App />)
    expect(screen.getByText(/Hack2Skill/i)).toBeInTheDocument()
  })
})
