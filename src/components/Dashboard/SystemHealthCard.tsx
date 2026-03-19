import { Activity } from 'lucide-react'

export function SystemHealthCard() {
  return (
    <div className="bg-[var(--surface-2)] border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-accent" />
          <h3 className="font-medium text-sm text-foreground">System Health</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Online</span>
          <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">CPU (Ryzen 9)</span>
            <span className="text-foreground font-mono">12%</span>
          </div>
          <div className="h-1.5 w-full bg-[var(--surface-3)] rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full" style={{ width: '12%' }}></div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Memory</span>
            <span className="text-foreground font-mono">8.2 / 48 GB</span>
          </div>
          <div className="h-1.5 w-full bg-[var(--surface-3)] rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full" style={{ width: '17%' }}></div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">GPU (RTX 3090)</span>
            <span className="text-foreground font-mono">Idle</span>
          </div>
          <div className="h-1.5 w-full bg-[var(--surface-3)] rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full" style={{ width: '2%' }}></div>
          </div>
        </div>

        <div className="pt-1 flex justify-between text-xs">
          <span className="text-muted-foreground">Uptime</span>
          <span className="text-foreground font-mono">14d 6h</span>
        </div>
      </div>
    </div>
  )
}
