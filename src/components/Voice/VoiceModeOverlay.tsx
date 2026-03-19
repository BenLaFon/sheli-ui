import { useEffect } from 'react'
import { Square } from 'lucide-react'
import { useVoiceStore } from '../../stores/voiceStore'

export function VoiceModeOverlay() {
  const { isActive, voiceState, transcript, deactivate } = useVoiceStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isActive) {
        deactivate()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isActive, deactivate])

  if (!isActive) return null

  const stateLabels = {
    idle: 'Tap to speak',
    listening: 'Listening...',
    thinking: 'Thinking...',
    speaking: 'Speaking...'
  }

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-surface-0/85 backdrop-blur-sm animate-in fade-in duration-300">
      
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md px-6 gap-8">
        
        <div className="relative flex items-center justify-center h-40 w-40">
          <div 
            className={`
              absolute w-[120px] h-[120px] rounded-full transition-all duration-500
              ${voiceState === 'idle' ? 'bg-muted/50 shadow-[0_0_20px_rgba(240,240,242,0.1)] animate-pulse-slow' : ''}
              ${voiceState === 'listening' ? 'bg-info shadow-[0_0_40px_rgba(90,200,250,0.4)] animate-pulse-listening' : ''}
              ${voiceState === 'thinking' ? 'bg-transparent border-4 border-accent border-t-transparent shadow-[0_0_30px_rgba(232,164,74,0.3)] animate-glow-thinking' : ''}
              ${voiceState === 'speaking' ? 'bg-success shadow-[0_0_50px_rgba(52,199,89,0.5)] animate-ring-speaking' : ''}
            `}
          />
          {voiceState === 'thinking' && (
            <div className="absolute w-[80px] h-[80px] rounded-full bg-accent/20 animate-pulse" />
          )}
        </div>

        <div className="text-sm text-muted-foreground font-medium tracking-wide transition-opacity duration-300">
          {stateLabels[voiceState]}
        </div>

        <div className="w-full min-h-[100px] flex items-center justify-center">
          <div className="w-full bg-surface-2/80 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg border border-border/50 transition-all duration-300">
            {transcript ? (
              <p className="text-base text-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-2">
                {transcript}
              </p>
            ) : (
              <p className="text-base text-muted-foreground/60 italic">
                What's on your mind?
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="pb-12 pt-6">
        <button
          onClick={deactivate}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-surface-2 border border-border/50 shadow-lg hover:scale-105 hover:border-accent/50 hover:shadow-[0_0_20px_rgba(232,164,74,0.2)] transition-all duration-200"
          aria-label="Stop voice mode"
        >
          <Square className="w-5 h-5 text-foreground fill-foreground group-hover:text-accent group-hover:fill-accent transition-colors" />
        </button>
      </div>
    </div>
  )
}
