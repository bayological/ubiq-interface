'use client'

import { useState } from 'react'
import { Container } from './Container'
import { GridPattern } from './GridPattern'

type Message = {
  text: string
  isUser: boolean
  timestamp: string
}

export function ChatInterface() {
  const [hasInteracted, setHasInteracted] = useState(false)

  // Mock messages for demonstration
  const mockMessages: Message[] = [
    {
      text: 'Claim my UBIQ',
      isUser: true,
      timestamp: '12:01 PM',
    },
    {
      text: "You've received 103 UBIQ—adjusted for local economy",
      isUser: false,
      timestamp: '12:01 PM',
    },
  ]

  return (
    <div className="relative h-[calc(100vh-4rem-23px)]">
      {!hasInteracted ? (
        // Initial Search-like Interface
        <div className="flex h-full flex-col items-center justify-center">
          <div className="mb-8 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text font-display text-4xl font-bold text-transparent">
            How can I help you with UBIQ today?
          </div>
          <div className="w-full max-w-2xl px-4">
            <input
              type="text"
              placeholder="Ask UBIQ about your income..."
              className="w-full rounded-full border border-gray-200 bg-white/80 px-6 py-4 text-lg shadow-sm backdrop-blur-sm transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setHasInteracted(true)
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
              {mockMessages.map((message, index) => (
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
                  placeholder="Type your message..."
                  className="flex-1 rounded-full border border-gray-200 bg-white/80 px-4 py-2 backdrop-blur-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="ml-2 rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700">
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
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
