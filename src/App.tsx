import { memo, useState, useEffect, useCallback } from 'react'
import { DEFAULT_SETTINGS } from './utils/constants'
import { useSessionStore } from './stores/sessionStore'
import { useMessageStore } from './stores/messageStore'
import { useVoiceStore } from './stores/voiceStore'
import { useEventStream } from './hooks/useEventStream'
import { useMessageHandling } from './hooks/useMessageHandling'
import { ChatContainer } from './components/Chat/ChatContainer'
import { MessageInput } from './components/Chat/MessageInput'
import { SettingsPanel } from './components/Settings/SettingsPanel'
import { LayoutShell } from './components/Layout/LayoutShell'
import { CommandPalette } from './components/CommandPalette/CommandPalette'
import { VoiceModeOverlay } from './components/Voice/VoiceModeOverlay'
import type { LayoutMode } from './components/Layout/TopBar'

const MemoizedSettingsPanel = memo(SettingsPanel)

function App() {
  const [selectedMode, setSelectedMode] = useState<string>(DEFAULT_SETTINGS.MODE)
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('full')
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  
  const { sessionId, isInitializing, error: sessionError, initializeSession } = useSessionStore()
  const { 
    addErrorMessage
  } = useMessageStore()
  const { isActive: isVoiceActive, activate: activateVoice, deactivate: deactivateVoice } = useVoiceStore()
  
  const { hasReceivedFirstEvent, setHasReceivedFirstEvent, isLoading, setIsLoading } = useEventStream()
  const { handleMessageSubmit } = useMessageHandling()

  useEffect(() => {
    initializeSession()
  }, [initializeSession])

  useEffect(() => {
    if (sessionError) {
      addErrorMessage(sessionError)
    }
  }, [sessionError, addErrorMessage])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && !e.shiftKey && !e.altKey && !e.ctrlKey) {
        if (e.key === '1') {
          e.preventDefault()
          document.getElementById('dashboard-panel')?.focus()
        } else if (e.key === '2') {
          e.preventDefault()
          document.getElementById('chat-panel')?.focus()
        } else if (e.key === '3') {
          e.preventDefault()
          document.getElementById('canvas-panel')?.focus()
        } else if (e.key.toLowerCase() === 'k') {
          e.preventDefault()
          setCommandPaletteOpen(prev => !prev)
        } else if (e.key === '/') {
          e.preventDefault()
          if (isVoiceActive) {
            deactivateVoice()
          } else {
            activateVoice()
          }
        }
      }
      
      if (e.metaKey && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault()
        setLayoutMode(prev => prev === 'focus' ? 'full' : 'focus')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isVoiceActive, activateVoice, deactivateVoice])

  const onMessageSubmit = useCallback(async (userInput: string) => {
    await handleMessageSubmit(
      userInput, 
      selectedMode, 
      isLoading, 
      setIsLoading, 
      hasReceivedFirstEvent, 
      setHasReceivedFirstEvent
    )
  }, [handleMessageSubmit, selectedMode, isLoading, setIsLoading, hasReceivedFirstEvent, setHasReceivedFirstEvent])

  return (
    <LayoutShell mode={layoutMode} onModeChange={setLayoutMode} onOpenCommandPalette={() => setCommandPaletteOpen(true)}>
      <CommandPalette 
        isOpen={commandPaletteOpen} 
        onClose={() => setCommandPaletteOpen(false)} 
        onModeChange={setLayoutMode}
        layoutMode={layoutMode}
      />
      <div className="relative flex flex-col h-full p-4">
        <ChatContainer isLoading={isLoading} />

        <div className="space-y-2 mt-auto pt-4">
          <MemoizedSettingsPanel 
            selectedMode={selectedMode}
            onModeChange={setSelectedMode}
          />
          
          <MessageInput
            onSubmit={onMessageSubmit}
            disabled={isLoading || !sessionId || isInitializing}
            isLoading={isLoading}
            isInitializing={isInitializing}
          />
        </div>
        
        <VoiceModeOverlay />
      </div>
    </LayoutShell>
  )
}

export default App
