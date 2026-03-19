import { create } from 'zustand'

export type VoiceState = 'idle' | 'listening' | 'thinking' | 'speaking'

interface VoiceStore {
  isActive: boolean
  voiceState: VoiceState
  transcript: string
  activate: () => void
  deactivate: () => void
  setState: (state: VoiceState) => void
  setTranscript: (text: string) => void
}

export const useVoiceStore = create<VoiceStore>((set) => ({
  isActive: false,
  voiceState: 'idle',
  transcript: '',
  activate: () => set({ isActive: true, voiceState: 'idle', transcript: '' }),
  deactivate: () => set({ isActive: false, voiceState: 'idle', transcript: '' }),
  setState: (state) => set({ voiceState: state }),
  setTranscript: (text) => set({ transcript: text }),
}))
