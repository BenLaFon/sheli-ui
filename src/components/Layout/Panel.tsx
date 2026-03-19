import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PanelProps {
  id: string
  width?: number | string
  flex?: number | string
  collapsed?: boolean
  collapsedWidth?: number | string
  className?: string
  children: ReactNode
}

export function Panel({
  id,
  width,
  flex,
  collapsed = false,
  collapsedWidth = 0,
  className,
  children
}: PanelProps) {
  return (
    <div
      id={id}
      className={cn(
        'h-full overflow-y-auto transition-all duration-smooth ease-out flex-shrink-0',
        className
      )}
      style={{
        width: collapsed ? collapsedWidth : width,
        flex: collapsed ? `0 0 ${collapsedWidth}px` : flex,
        opacity: collapsed && collapsedWidth === 0 ? 0 : 1,
        pointerEvents: collapsed && collapsedWidth === 0 ? 'none' : 'auto',
      }}
    >
      <div className={cn(
        'h-full w-full transition-opacity duration-smooth',
        collapsed && collapsedWidth === 0 ? 'opacity-0' : 'opacity-100'
      )}>
        {children}
      </div>
    </div>
  )
}
