import { useRef, useEffect, memo, useState } from 'react'
import { Menu } from 'lucide-react'
import { ScrollArea } from '../ui/scroll-area'
import { Button } from '../ui/button'
import { MessageBubble } from './MessageBubble'
import { useMessageStore } from '../../stores/messageStore'
import { ConversationSidebar } from './ConversationSidebar'

interface ChatContainerProps {
  isLoading: boolean
}

const MemoizedMessageBubble = memo(MessageBubble)

export const ChatContainer = ({ isLoading }: ChatContainerProps) => {
  const { messages } = useMessageStore()
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages, isLoading])

  return (
    <>
      <ConversationSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="relative h-[calc(100vh-280px)] mb-4 border rounded-lg flex flex-col">
        <div className="absolute top-2 left-2 z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarOpen(true)}
            className="h-8 w-8 bg-[var(--surface-1)]/80 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground shadow-sm"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 pt-12">
          <div className="space-y-4">
            {messages.map((message) => (
              <MemoizedMessageBubble key={message.id} message={message} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  )
}
