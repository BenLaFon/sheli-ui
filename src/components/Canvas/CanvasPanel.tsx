import { Palette } from 'lucide-react';
import { useCanvasStore } from '@/stores/canvasStore';
import { CanvasToolbar } from './CanvasToolbar';
import { ProvenanceBar } from './ProvenanceBar';

export function CanvasPanel() {
  const { activeArtifact, mode } = useCanvasStore();

  const renderContent = () => {
    if (!activeArtifact || mode === 'empty') {
      return (
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="bg-[var(--surface-2)] border border-border rounded-xl p-8 max-w-md w-full text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[var(--surface-3)] flex items-center justify-center mb-4">
              <Palette className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Your Canvas</h3>
            <p className="text-sm text-muted-foreground">
              Content will appear here when you visualize something from chat.
            </p>
          </div>
        </div>
      );
    }

    switch (mode) {
      case 'preview':
        return (
          <div className="flex-1 bg-white w-full h-full overflow-hidden">
            <iframe 
              srcDoc={activeArtifact.content} 
              sandbox="allow-scripts allow-same-origin"
              className="w-full h-full border-0"
              title={activeArtifact.title}
            />
          </div>
        );
      case 'viz':
        return (
          <div className="flex-1 p-6 overflow-auto bg-[var(--surface-1)]">
            <pre className="p-4 rounded-lg bg-[var(--surface-2)] border border-border text-sm font-mono text-foreground overflow-x-auto">
              <code>{activeArtifact.content}</code>
            </pre>
          </div>
        );
      case 'browser':
      case 'editor':
      case 'interactive':
        return (
          <div className="flex-1 p-6 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2 capitalize">{mode} Mode</h3>
              <p className="text-sm text-muted-foreground">Coming soon</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full bg-background flex flex-col overflow-hidden">
      <div className="p-4 border-b border-border shrink-0">
        <h2 className="text-accent font-semibold text-sm uppercase tracking-wider">Canvas</h2>
      </div>
      
      {activeArtifact && mode !== 'empty' && (
        <>
          <CanvasToolbar />
          <ProvenanceBar />
        </>
      )}
      
      {renderContent()}
    </div>
  );
}
