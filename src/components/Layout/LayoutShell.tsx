import type { ReactNode } from 'react'
import { Panel } from './Panel'
import { TopBar } from './TopBar'
import type { LayoutMode } from './TopBar'
import { DashboardPanel } from '../Dashboard/DashboardPanel'
import { CanvasPanel } from '../Canvas/CanvasPanel'

interface LayoutShellProps {
  mode: LayoutMode
  onModeChange: (mode: LayoutMode) => void
  children: ReactNode
}

export function LayoutShell({ mode, onModeChange, children }: LayoutShellProps) {
  const showDashboard = mode !== 'focus'
  const dashboardCollapsed = mode === 'work'
  const showCanvas = mode === 'full' || mode === 'work'

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-background text-foreground">
      <TopBar mode={mode} onModeChange={onModeChange} />
      
      <div className="flex flex-1 overflow-hidden">
        <Panel 
          id="dashboard-panel"
          width={280}
          collapsed={!showDashboard || dashboardCollapsed}
          collapsedWidth={!showDashboard ? 0 : 64}
          className="border-r border-border"
        >
          {dashboardCollapsed ? (
            <div className="h-full bg-background flex flex-col items-center py-4 border-r border-border">
              <div className="w-8 h-8 rounded bg-[var(--surface-2)] flex items-center justify-center text-accent font-bold mb-4">
                D
              </div>
            </div>
          ) : (
            <DashboardPanel />
          )}
        </Panel>

        <Panel 
          id="chat-panel"
          flex={1}
          className="min-w-[400px]"
        >
          <div className="h-full flex flex-col max-w-4xl mx-auto w-full">
            {children}
          </div>
        </Panel>

        <Panel 
          id="canvas-panel"
          flex={1.2}
          collapsed={!showCanvas}
          className="border-l border-border"
        >
          <CanvasPanel />
        </Panel>
      </div>
    </div>
  )
}
