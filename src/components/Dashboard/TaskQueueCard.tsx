import { ListTodo } from 'lucide-react'

export function TaskQueueCard() {
  return (
    <div className="bg-[var(--surface-2)] border border-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <ListTodo className="w-4 h-4 text-accent" />
        <h3 className="font-medium text-sm text-foreground">Tasks</h3>
      </div>
      
      <div className="flex flex-col items-center justify-center py-4 text-center space-y-2">
        <p className="text-sm text-foreground font-medium">No pending tasks.</p>
        <p className="text-xs text-muted-foreground max-w-[200px]">
          Schedule recurring tasks or queue work for later.
        </p>
      </div>
    </div>
  )
}
