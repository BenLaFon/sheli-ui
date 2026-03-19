import { Zap, MessageSquare, Mic, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function QuickActionsCard() {
  return (
    <div className="bg-[var(--surface-2)] border border-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-4 h-4 text-accent" />
        <h3 className="font-medium text-sm text-foreground">Quick Actions</h3>
      </div>
      
      <div className="flex flex-col gap-2">
        <Button variant="outline" className="w-full justify-start text-accent hover:text-accent-foreground border-accent/20 hover:border-accent/50 bg-accent/5 hover:bg-accent/10">
          <MessageSquare className="w-4 h-4 mr-2" />
          New Chat
        </Button>
        
        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
          <Mic className="w-4 h-4 mr-2" />
          Voice Mode
        </Button>
        
        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
          <Play className="w-4 h-4 mr-2" />
          Run Agent
        </Button>
      </div>
    </div>
  )
}
