import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { AppProvider, useApp } from '../context/AppContext'

const TestConsumer = () => {
  const {
    darkMode, toggleDarkMode,
    language, toggleLanguage,
    totalXP, addQuestion,
    questionsAsked,
    quizzesCompleted, completeQuiz,
    timelineProgress, updateTimeline,
  } = useApp()

  return (
    <div>
      <span data-testid="darkMode">{darkMode.toString()}</span>
      <span data-testid="language">{language}</span>
      <span data-testid="xp">{totalXP}</span>
      <span data-testid="questions">{questionsAsked}</span>
      <span data-testid="quizzes">{quizzesCompleted}</span>
      <span data-testid="timeline">{timelineProgress}</span>
      <button onClick={toggleDarkMode}>toggle dark</button>
      <button onClick={toggleLanguage}>toggle lang</button>
      <button onClick={addQuestion}>add question</button>
      <button onClick={() => completeQuiz(80)}>complete quiz</button>
      <button onClick={() => updateTimeline(3)}>update timeline</button>
    </div>
  )
}

describe('AppContext', () => {
  it('provides default dark mode as true', () => {
    render(<AppProvider><TestConsumer /></AppProvider>)
    expect(screen.getByTestId('darkMode').textContent).toBe('true')
  })

  it('toggles dark mode', () => {
    render(<AppProvider><TestConsumer /></AppProvider>)
    fireEvent.click(screen.getByText('toggle dark'))
    expect(screen.getByTestId('darkMode').textContent).toBe('false')
  })

  it('provides default language as en', () => {
    render(<AppProvider><TestConsumer /></AppProvider>)
    expect(screen.getByTestId('language').textContent).toBe('en')
  })

  it('toggles language from en to ta', () => {
    render(<AppProvider><TestConsumer /></AppProvider>)
    fireEvent.click(screen.getByText('toggle lang'))
    expect(screen.getByTestId('language').textContent).toBe('ta')
  })

  it('toggles language back from ta to en', () => {
    render(<AppProvider><TestConsumer /></AppProvider>)
    fireEvent.click(screen.getByText('toggle lang'))
    fireEvent.click(screen.getByText('toggle lang'))
    expect(screen.getByTestId('language').textContent).toBe('en')
  })

  it('starts with 0 XP', () => {
    render(<AppProvider><TestConsumer /></AppProvider>)
    expect(screen.getByTestId('xp').textContent).toBe('0')
  })

  it('adds 10 XP when a question is asked', () => {
    render(<AppProvider><TestConsumer /></AppProvider>)
    fireEvent.click(screen.getByText('add question'))
    expect(screen.getByTestId('xp').textContent).toBe('10')
  })

  it('increments questionsAsked counter', () => {
    render(<AppProvider><TestConsumer /></AppProvider>)
    fireEvent.click(screen.getByText('add question'))
    fireEvent.click(screen.getByText('add question'))
    expect(screen.getByTestId('questions').textContent).toBe('2')
  })

  it('increments quizzesCompleted on completeQuiz', () => {
    render(<AppProvider><TestConsumer /></AppProvider>)
    fireEvent.click(screen.getByText('complete quiz'))
    expect(screen.getByTestId('quizzes').textContent).toBe('1')
  })

  it('adds XP on quiz completion', () => {
    render(<AppProvider><TestConsumer /></AppProvider>)
    fireEvent.click(screen.getByText('complete quiz'))
    // score 80 * 5 = 400 XP
    expect(screen.getByTestId('xp').textContent).toBe('400')
  })

  it('updates timeline progress', () => {
    render(<AppProvider><TestConsumer /></AppProvider>)
    fireEvent.click(screen.getByText('update timeline'))
    expect(screen.getByTestId('timeline').textContent).toBe('3')
  })

  it('adds XP on timeline update', () => {
    render(<AppProvider><TestConsumer /></AppProvider>)
    fireEvent.click(screen.getByText('update timeline'))
    expect(screen.getByTestId('xp').textContent).toBe('15')
  })

  it('does not decrease timeline progress', () => {
    render(<AppProvider><TestConsumer /></AppProvider>)
    fireEvent.click(screen.getByText('update timeline'))
    // timeline should be 3 after first click
    expect(screen.getByTestId('timeline').textContent).toBe('3')
  })
})
