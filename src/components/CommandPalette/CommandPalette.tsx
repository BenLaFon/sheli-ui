import { useState, useEffect, useRef } from 'react'
import { 
  LayoutDashboard, 
  MessageSquare, 
  Palette, 
  Maximize2, 
  Layout, 
  Monitor, 
  Briefcase, 
  Sun, 
  Settings, 
  Keyboard, 
  Search 
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LayoutMode } from '../Layout/TopBar'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onModeChange: (mode: LayoutMode) => void
  layoutMode: LayoutMode
}

export function CommandPalette({ isOpen, onClose, onModeChange, layoutMode }: CommandPaletteProps) {
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setSearch('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [isOpen])

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark')
    if (isDark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('sheli-theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('sheli-theme', 'dark')
    }
    window.dispatchEvent(new Event('theme-changed'))
  }

  const actions = [
    { icon: LayoutDashboard, label: 'Switch to Dashboard', shortcut: '⌘1', action: () => document.getElementById('dashboard-panel')?.focus() },
    { icon: MessageSquare, label: 'Switch to Chat', shortcut: '⌘2', action: () => document.getElementById('chat-panel')?.focus() },
    { icon: Palette, label: 'Switch to Canvas', shortcut: '⌘3', action: () => document.getElementById('canvas-panel')?.focus() },
    { icon: Maximize2, label: 'Focus Mode', shortcut: '⌘⇧F', action: () => onModeChange(layoutMode === 'focus' ? 'full' : 'focus') },
    { icon: Layout, label: 'Full Layout', shortcut: '', action: () => onModeChange('full') },
    { icon: Monitor, label: 'Monitor Layout', shortcut: '', action: () => onModeChange('monitor') },
    { icon: Briefcase, label: 'Work Layout', shortcut: '', action: () => onModeChange('work') },
    { icon: Sun, label: 'Toggle Theme', shortcut: '', action: toggleTheme },
    { icon: Settings, label: 'Settings', shortcut: '⌘,', action: () => console.log('Open settings') },
    { icon: Keyboard, label: 'Keyboard Shortcuts', shortcut: '', action: () => console.log('Show shortcuts') },
  ]

  const filteredActions = actions.filter(a => a.label.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % filteredActions.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => (prev - 1 + filteredActions.length) % filteredActions.length)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].action()
          onClose()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredActions, selectedIndex, onClose])

  useEffect(() => {
    if (isOpen && listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex] as HTMLElement
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [selectedIndex, isOpen])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-[560px] bg-[var(--surface-2)] rounded-lg border border-border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center px-4 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            className="flex-1 h-14 bg-transparent border-none outline-none px-3 text-foreground placeholder:text-muted-foreground"
            placeholder="Type a command..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        
        <div ref={listRef} className="max-h-[400px] overflow-y-auto p-2">
          {filteredActions.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </div>
          ) : (
            filteredActions.map((action, index) => {
              const Icon = action.icon
              const isSelected = index === selectedIndex
              
              return (
                <button
                  key={action.label}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-3 rounded-md text-sm transition-colors",
                    isSelected ? "bg-[var(--surface-3)] text-foreground" : "text-muted-foreground hover:bg-[var(--surface-3)]/50 hover:text-foreground"
                  )}
                  onClick={() => {
                    action.action()
                    onClose()
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{action.label}</span>
                  </div>
                  {action.shortcut && (
                    <span className="text-xs tracking-widest opacity-60">
                      {action.shortcut}
                    </span>
                  )}
                </button>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
