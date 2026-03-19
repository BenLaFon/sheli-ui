import { create } from 'zustand';

export type CanvasMode = 'preview' | 'interactive' | 'browser' | 'editor' | 'viz' | 'empty';

export interface CanvasArtifact {
  id: string;
  type: CanvasMode;
  content: string;
  title: string;
  sourceMessage?: string;
  createdAt: number;
}

interface CanvasState {
  activeArtifact: CanvasArtifact | null;
  mode: CanvasMode;
  history: CanvasArtifact[];
  setArtifact: (artifact: CanvasArtifact) => void;
  clearArtifact: () => void;
  setMode: (mode: CanvasMode) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  activeArtifact: null,
  mode: 'empty',
  history: [],
  setArtifact: (artifact) => set((state) => ({
    activeArtifact: artifact,
    mode: artifact.type,
    history: [...state.history, artifact]
  })),
  clearArtifact: () => set({
    activeArtifact: null,
    mode: 'empty'
  }),
  setMode: (mode) => set({ mode })
}));
