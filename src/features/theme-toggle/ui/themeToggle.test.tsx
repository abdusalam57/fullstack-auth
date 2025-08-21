import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeToggle } from './themeToggle'

const setTheme = jest.fn()

jest.mock('next-themes', () => ({
  useTheme: () => ({ setTheme }),
}))

test('should render theme toggle button', () => {
  render(<ThemeToggle />)
  expect(screen.getByRole('button', { name: 'Смена темы' })).toBeInTheDocument()
})

test('should display theme options when button is clicked', async () => {
  render(<ThemeToggle />)
  await userEvent.click(screen.getByRole('button', { name: 'Смена темы' }))

  expect(screen.getByRole('menuitem', { name: 'Светлая' })).toBeInTheDocument()
  expect(screen.getByRole('menuitem', { name: 'Тёмная' })).toBeInTheDocument()
})

test.each([
  { option: 'Светлая', theme: 'light' },
  { option: 'Тёмная', theme: 'dark' },
])(
  'should set $theme theme when $option is selected',
  async ({ option, theme }) => {
    render(<ThemeToggle />)
    await userEvent.click(screen.getByRole('button', { name: 'Смена темы' }))
    await userEvent.click(screen.getByRole('menuitem', { name: option }))

    expect(setTheme).toHaveBeenCalledWith(theme)
  },
)

test('should contain both sun and moon icons', () => {
  render(<ThemeToggle />)
  const button = screen.getByRole('button', { name: 'Смена темы' })
  const svgIcons = button.querySelectorAll('svg')
  expect(svgIcons.length).toBe(2)
})
