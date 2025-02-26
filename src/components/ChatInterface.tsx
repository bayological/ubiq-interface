'use client'

import { useState } from 'react'
import { Container } from './Container'
import { GridPattern } from './GridPattern'
import { useAccount } from 'wagmi'
import clsx from 'clsx'

type Message = {
  text: string
  isUser: boolean
  timestamp: string
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [hasInteracted, setHasInteracted] = useState(false)
  const { isConnected } = useAccount()
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (text: string) => {
    setIsLoading(true)
    
    // Create new message object
    const newUserMessage: Message = {
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    // Add user message to chat
    setMessages((prev) => [...prev, newUserMessage])

    try {
      // Send message to API
      const response = await fetch(
        'http://localhost:3000/b850bc30-45f8-0041-a00a-83df46d8555d/message',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: text }),
        },
      )

      const data = await response.json()
      console.log(data)

      // Add response to chat
      const botMessage: Message = {
        text: data[0].text,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
      setInputValue('')
    }
  }

  const handleSubmit = (text: string) => {
    if (!text.trim()) return
    sendMessage(text)
    setHasInteracted(true)
  }

  return (
    <div className="relative h-[calc(100vh-4rem-23px)]">
      {!isConnected ? (
        // Wallet Connection Required State
        <div className="flex h-full flex-col items-center justify-center">
          <div className="mb-8 font-display text-3xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-5xl">
            Connect Your Wallet to Start
          </div>
          <div className="text-center text-neutral-600">
            <p className="mb-4">You need to connect your wallet to use UBIQ</p>
          </div>
        </div>
      ) : !hasInteracted ? (
        // Initial Search-like Interface
        <div className="flex h-full flex-col items-center justify-center">
          <div className="mb-8 font-display text-3xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-5xl">
            How can I help you with UBIQ today?
          </div>
          <div className="w-full max-w-2xl px-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask UBIQ about your income..."
              className="w-full rounded-full border border-gray-200 bg-white/80 px-6 py-4 text-lg shadow-sm backdrop-blur-sm transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(inputValue)
                }
              }}
            />
          </div>
        </div>
      ) : (
        // Chat Interface
        <div className="flex h-full flex-col bg-transparent">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-2xl space-y-6 px-4 py-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.isUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p
                      className={`mt-1 text-xs ${
                        message.isUser ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-100 bg-white/90 p-4 backdrop-blur-sm">
            <div className="mx-auto max-w-2xl">
              <div className="flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className={clsx(
                    "flex-1 rounded-full border border-gray-200 bg-white/80 px-4 py-2 backdrop-blur-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500",
                    isLoading && "opacity-50"
                  )}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !isLoading) {
                      handleSubmit(inputValue)
                    }
                  }}
                />
                <button
                  onClick={() => handleSubmit(inputValue)}
                  disabled={isLoading}
                  className={clsx(
                    "ml-2 rounded-full bg-blue-600 p-2 text-white transition-colors",
                    isLoading ? "opacity-50" : "hover:bg-blue-700"
                  )}
                >
                  {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
