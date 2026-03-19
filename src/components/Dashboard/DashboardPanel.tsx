import { Activity, Bot, Zap, ListTodo } from 'lucide-react'
import { SystemHealthCard } from './SystemHealthCard'
import { AgentActivityCard } from './AgentActivityCard'
import { QuickActionsCard } from './QuickActionsCard'
import { TaskQueueCard } from './TaskQueueCard'

interface DashboardPanelProps {
  isCollapsed?: boolean
}

export function DashboardPanel({ isCollapsed = false }: DashboardPanelProps) {
  if (isCollapsed) {
    return (
      <div className="h-full bg-background flex flex-col items-center py-4 border-r border-border w-[64px]">
        <div className="flex flex-col gap-6 mt-4">
          <div className="p-2 rounded-lg hover:bg-[var(--surface-2)] cursor-pointer text-accent transition-colors" title="System Health">
            <Activity className="w-5 h-5" />
          </div>
          <div className="p-2 rounded-lg hover:bg-[var(--surface-2)] cursor-pointer text-muted-foreground hover:text-foreground transition-colors" title="Agents">
            <Bot className="w-5 h-5" />
          </div>
          <div className="p-2 rounded-lg hover:bg-[var(--surface-2)] cursor-pointer text-muted-foreground hover:text-foreground transition-colors" title="Quick Actions">
            <Zap className="w-5 h-5" />
          </div>
          <div className="p-2 rounded-lg hover:bg-[var(--surface-2)] cursor-pointer text-muted-foreground hover:text-foreground transition-colors" title="Tasks">
            <ListTodo className="w-5 h-5" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-background flex flex-col w-[280px] border-r border-border">
      <div className="p-4 shrink-0 relative">
        <h2 className="text-foreground font-semibold text-lg">Dashboard</h2>
        <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-accent rounded-t-sm"></div>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto space-y-4 custom-scrollbar">
        <SystemHealthCard />
        <AgentActivityCard />
        <QuickActionsCard />
        <TaskQueueCard />
      </div>
    </div>
  )
}
