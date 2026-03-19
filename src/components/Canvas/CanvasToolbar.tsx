import { Eye, BarChart3, Globe, FileText, Wand2, Maximize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CanvasMode } from '@/stores/canvasStore';
import { useCanvasStore } from '@/stores/canvasStore';

const MODE_CONFIG: Record<CanvasMode, { icon: React.ElementType; label: string }> = {
  preview: { icon: Eye, label: 'Preview' },
  viz: { icon: BarChart3, label: 'Visualization' },
  browser: { icon: Globe, label: 'Browser' },
  editor: { icon: FileText, label: 'Editor' },
  interactive: { icon: Wand2, label: 'Interactive' },
  empty: { icon: FileText, label: 'Empty' }
};

export function CanvasToolbar() {
  const { mode, clearArtifact } = useCanvasStore();
  
  if (mode === 'empty') return null;
  
  const config = MODE_CONFIG[mode] || MODE_CONFIG.preview;
  const Icon = config.icon;

  return (
    <div className="h-10 bg-[var(--surface-2)] border-b border-border flex items-center justify-between px-3 shrink-0">
      <div className="flex items-center">
        <div className="flex items-center gap-1.5 bg-[var(--surface-3)] px-2.5 py-1 rounded-full text-xs font-medium text-muted-foreground border border-border/50">
          <Icon className="w-3.5 h-3.5" />
          <span>{config.label}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md text-muted-foreground hover:text-foreground">
          <Maximize2 className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 rounded-md text-muted-foreground hover:text-foreground"
          onClick={clearArtifact}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
