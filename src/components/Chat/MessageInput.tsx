import React, { useRef, useCallback, type FormEvent } from 'react'
import { Mic } from 'lucide-react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { useVoiceStore } from '../../stores/voiceStore'

interface MessageInputProps {
  onSubmit: (message: string) => void
  disabled: boolean
  isLoading: boolean
  isInitializing: boolean
}

export function MessageInput({ onSubmit, disabled, isLoading, isInitializing }: MessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { isActive, activate } = useVoiceStore()

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault()
    const userInput = textareaRef.current?.value.trim() ?? ''
    if (!userInput || disabled) return
    
    if (textareaRef.current) {
      textareaRef.current.value = ''
    }
    
    onSubmit(userInput)
  }, [onSubmit, disabled])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as FormEvent)
    }
  }, [handleSubmit])

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Textarea
        ref={textareaRef}
        placeholder="Type your message..."
        disabled={disabled}
        className="flex-1 min-h-[60px] resize-none"
        onKeyDown={handleKeyDown}
      />
      <div className="flex flex-col gap-2 self-end">
        <Button 
          type="button"
          variant="outline"
          size="icon"
          disabled={disabled}
          onClick={activate}
          className={isActive ? 'text-accent border-accent bg-accent/10' : ''}
          title="Voice Mode (Cmd+/)"
        >
          <Mic className="w-4 h-4" />
        </Button>
        <Button 
          type="submit" 
          disabled={disabled}
        >
          {isLoading ? 'Sending...' : isInitializing ? 'Initializing...' : 'Send'}
        </Button>
      </div>
    </form>
  )
}