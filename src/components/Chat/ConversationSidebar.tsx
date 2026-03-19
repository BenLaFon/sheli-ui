import { X, Search, MessageSquare } from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

interface ConversationSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function ConversationSidebar({ isOpen, onClose }: ConversationSidebarProps) {
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      
      <div 
        className={cn(
          "fixed top-0 left-0 h-full w-[320px] bg-[var(--surface-1)] border-r border-border z-50 transform transition-transform duration-300 ease-out flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Conversations</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-[var(--surface-2)] border border-border rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-6">
          <div>
            <h3 className="px-2 text-xs font-medium text-muted-foreground mb-2">Today</h3>
            <div className="space-y-1">
              <button className="w-full flex flex-col items-start p-2 rounded-md hover:bg-[var(--surface-2)] transition-colors text-left group">
                <div className="flex items-center gap-2 w-full">
                  <MessageSquare className="h-4 w-4 text-muted-foreground group-hover:text-accent shrink-0" />
                  <span className="text-sm font-medium text-foreground truncate">React Component Refactoring</span>
                </div>
                <span className="text-xs text-muted-foreground pl-6">2 hours ago</span>
              </button>
              <button className="w-full flex flex-col items-start p-2 rounded-md hover:bg-[var(--surface-2)] transition-colors text-left group">
                <div className="flex items-center gap-2 w-full">
                  <MessageSquare className="h-4 w-4 text-muted-foreground group-hover:text-accent shrink-0" />
                  <span className="text-sm font-medium text-foreground truncate">API Integration Setup</span>
                </div>
                <span className="text-xs text-muted-foreground pl-6">5 hours ago</span>
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="px-2 text-xs font-medium text-muted-foreground mb-2">Yesterday</h3>
            <div className="space-y-1">
              <button className="w-full flex flex-col items-start p-2 rounded-md hover:bg-[var(--surface-2)] transition-colors text-left group">
                <div className="flex items-center gap-2 w-full">
                  <MessageSquare className="h-4 w-4 text-muted-foreground group-hover:text-accent shrink-0" />
                  <span className="text-sm font-medium text-foreground truncate">Database Schema Design</span>
                </div>
                <span className="text-xs text-muted-foreground pl-6">Yesterday</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
