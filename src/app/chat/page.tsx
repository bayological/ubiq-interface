import { type Metadata } from 'next'
import { ChatInterface } from '@/components/ChatInterface'

export const metadata: Metadata = {
  description: 'UBIQ Chat Interface - Your Smart Universal Income Assistant',
}

export default function ChatPage() {
  return <ChatInterface />
}
