import { MessageSquare, CornerUpLeft } from 'lucide-react';
import { useCanvasStore } from '@/stores/canvasStore';

export function ProvenanceBar() {
  const { activeArtifact, clearArtifact } = useCanvasStore();
  
  if (!activeArtifact) return null;

  const getRelativeTime = (timestamp: number) => {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const daysDifference = Math.round((timestamp - Date.now()) / (1000 * 60 * 60 * 24));
    const hoursDifference = Math.round((timestamp - Date.now()) / (1000 * 60 * 60));
    const minutesDifference = Math.round((timestamp - Date.now()) / (1000 * 60));
    
    if (Math.abs(daysDifference) > 0) return rtf.format(daysDifference, 'day');
    if (Math.abs(hoursDifference) > 0) return rtf.format(hoursDifference, 'hour');
    if (Math.abs(minutesDifference) > 0) return rtf.format(minutesDifference, 'minute');
    return 'just now';
  };

  return (
    <div className="h-8 bg-[var(--surface-1)] border-b border-border flex items-center justify-between px-3 shrink-0 text-xs">
      <div className="flex items-center gap-2 text-muted-foreground truncate">
        <MessageSquare className="w-3.5 h-3.5 shrink-0" />
        <span className="truncate">
          From: <span className="font-medium text-foreground">{activeArtifact.title}</span>
        </span>
        <span className="text-[var(--text-3)]">·</span>
        <span className="text-[var(--text-3)] shrink-0">{getRelativeTime(activeArtifact.createdAt)}</span>
      </div>
      
      <button 
        onClick={clearArtifact}
        className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors shrink-0 ml-4"
      >
        <CornerUpLeft className="w-3.5 h-3.5" />
        <span>Return</span>
      </button>
    </div>
  );
}
