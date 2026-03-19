import React, { memo } from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { ExternalLink } from 'lucide-react'
import type { ChatMessage } from '../../stores/messageStore'
import { useCanvasStore } from '../../stores/canvasStore'

interface MessageBubbleProps {
  message: ChatMessage
}

export const MessageBubble = memo(({ message }: MessageBubbleProps) => {
  const setArtifact = useCanvasStore(state => state.setArtifact)
  
  const handleOpenInCanvas = () => {
    setArtifact({
      id: message.id,
      type: 'preview',
      content: message.content,
      title: 'Chat message',
      createdAt: Date.now()
    })
  }

  return (
    <div className="flex items-start gap-3 max-w-full group">
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarFallback>
          {message.type === 'user' ? 'U' : 
           message.type === 'assistant' ? 'A' : 
           message.type === 'event' ? '⚡' : '!'}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0 relative">
         <div className={`rounded-lg p-3 max-w-full ${
           message.type === 'user' ? 'bg-blue-50' : 
           message.type === 'event' ? 'bg-yellow-50 text-yellow-800' :
           message.type === 'error' ? 'bg-red-50 text-red-700' : 
           'bg-gray-50'
         } ${message.type === 'assistant' ? 'prose prose-sm max-w-none' : ''}`}>
           {message.type === 'assistant' ? (
             <ReactMarkdown
               components={{
                 code({ inline, className, children, ...props }: {
                   inline?: boolean
                   className?: string
                   children?: React.ReactNode
                 }) {
                   const match = /language-(\w+)/.exec(className || '')
                   return !inline && match ? (
                     <SyntaxHighlighter
                       style={oneDark}
                       language={match[1]}
                       PreTag="div"
                       {...props}
                     >
                       {String(children).replace(/\n$/, '')}
                     </SyntaxHighlighter>
                   ) : (
                     <code className={className} {...props}>
                       {children}
                     </code>
                   )
                 },
               }}
             >
               {message.content}
             </ReactMarkdown>
           ) : (
             <div className="whitespace-pre-wrap">{message.content}</div>
           )}
           {message.type === 'event' && message.content.includes('...') && (
             <div className="mt-2">
               <div className="animate-pulse flex space-x-1">
                 <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                 <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                 <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
               </div>
             </div>
           )}
         </div>
         {message.type === 'assistant' && (
           <button
             onClick={handleOpenInCanvas}
             className="absolute -bottom-3 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--surface-1)] border border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent text-xs shadow-sm z-10"
           >
             <ExternalLink className="w-3.5 h-3.5" />
             <span>Open in Canvas</span>
           </button>
         )}
       </div>
     </div>
  )
})

MessageBubble.displayName = "MessageBubble"

export default MessageBubble