import { Settings, Sun, Moon, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export type LayoutMode = 'full' | 'focus' | 'work' | 'monitor'

interface TopBarProps {
  mode: LayoutMode
  onModeChange: (mode: LayoutMode) => void
  onOpenCommandPalette: () => void
}

export function TopBar({ mode, onModeChange, onOpenCommandPalette }: TopBarProps) {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const updateTheme = () => {
      const stored = localStorage.getItem('sheli-theme')
      const shouldBeDark = stored ? stored === 'dark' : true
      setIsDark(shouldBeDark)
      if (shouldBeDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
    
    updateTheme()
    
    window.addEventListener('theme-changed', updateTheme)
    return () => window.removeEventListener('theme-changed', updateTheme)
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    if (newIsDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('sheli-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('sheli-theme', 'light')
    }
  }

  const modes: { id: LayoutMode; label: string }[] = [
    { id: 'full', label: 'Full' },
    { id: 'focus', label: 'Focus' },
    { id: 'work', label: 'Work' },
    { id: 'monitor', label: 'Monitor' },
  ]

  return (
    <header className="h-12 w-full sticky top-0 z-50 bg-[var(--surface-1)] border-b border-border flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center w-48">
        <span className="text-accent font-bold text-xl leading-none select-none">b</span>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-[var(--surface-2)] hover:bg-[var(--surface-3)] border border-border rounded-md transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Search commands...</span>
          <kbd className="ml-2 text-[10px] font-sans px-1.5 py-0.5 bg-[var(--surface-3)] rounded border border-border">⌘K</kbd>
        </button>

        <div className="flex items-center gap-1 bg-[var(--surface-2)] p-1 rounded-md border border-border">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => onModeChange(m.id)}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-sm transition-colors duration-normal",
                mode === m.id 
                  ? "bg-[var(--surface-4)] text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-[var(--surface-3)]"
              )}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end w-48 gap-3">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground hover:text-foreground">
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Settings className="w-4 h-4" />
        </Button>
        <div className="w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold select-none">
          B
        </div>
      </div>
    </header>
  )
}
