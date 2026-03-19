import { Bot } from 'lucide-react'

export function AgentActivityCard() {
  return (
    <div className="bg-[var(--surface-2)] border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-accent" />
          <h3 className="font-medium text-sm text-foreground">Agents</h3>
        </div>
        <div className="bg-[var(--surface-3)] text-muted-foreground text-[10px] font-medium px-2 py-0.5 rounded-full">
          0
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center py-4 text-center space-y-2">
        <p className="text-sm text-foreground font-medium">No agents running.</p>
        <p className="text-xs text-muted-foreground max-w-[200px]">
          Agents work in the background while you chat.
        </p>
        <p className="text-xs text-muted-foreground italic mt-2">
          Try: "Research the latest AI news"
        </p>
      </div>
    </div>
  )
}
