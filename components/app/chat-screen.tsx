'use client'

import { useEffect, useRef, useState } from 'react'
import { Bot, SendHorizontal, X } from 'lucide-react'
import { chat } from '@/lib/app-content'

type Message = { id: number; from: 'bot' | 'me'; text: string; time: string }

const now = () => new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })

export function ChatScreen({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>(() => [{ id: 0, from: 'bot', text: chat.greeting, time: now() }])
  const [draft, setDraft] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function send(e: React.FormEvent) {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    setDraft('')
    setMessages((m) => [...m, { id: m.length, from: 'me', text, time: now() }])
    setTimeout(() => {
      setMessages((m) => [...m, { id: m.length, from: 'bot', text: chat.reply, time: now() }])
    }, 700)
  }

  return (
    <div role="dialog" aria-modal="true" aria-label={chat.title} className="fixed inset-0 z-50 mx-auto flex w-full max-w-md flex-col bg-[#f8f9fc]">
      <header className="flex items-center gap-3 bg-brand px-5 pb-5 pt-[max(env(safe-area-inset-top),1.5rem)] text-white">
        <h1 className="text-2xl font-bold">{chat.title}</h1>
        <span className="rounded-full bg-white/25 px-3 py-0.5 text-sm font-semibold">{chat.badge}</span>
        <button type="button" onClick={onClose} aria-label="ปิดแชท" className="ml-auto flex size-10 items-center justify-center rounded-full hover:bg-white/10">
          <X className="size-6" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-6" aria-live="polite">
        <ul className="flex flex-col gap-4">
          {messages.map((m) =>
            m.from === 'bot' ? (
              <li key={m.id} className="flex items-start gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <Bot className="size-6" />
                </span>
                <div className="max-w-[78%]">
                  <p className="rounded-2xl bg-[#e6e7eb] px-4 py-3 text-base leading-relaxed text-neutral-800">{m.text}</p>
                  <p className="mt-1 text-xs text-neutral-500">{m.time}</p>
                </div>
              </li>
            ) : (
              <li key={m.id} className="ml-auto max-w-[78%] text-right">
                <p className="rounded-2xl bg-brand px-4 py-3 text-left text-base leading-relaxed text-white">{m.text}</p>
                <p className="mt-1 text-xs text-neutral-500">{m.time}</p>
              </li>
            ),
          )}
        </ul>
        <div ref={endRef} />
      </div>

      <form onSubmit={send} className="bg-white px-4 pb-[max(env(safe-area-inset-bottom),1rem)] pt-3">
        <div className="flex items-center gap-2 rounded-full border border-neutral-200 py-1.5 pl-5 pr-1.5">
          <label htmlFor="chat-input" className="sr-only">
            {chat.placeholder}
          </label>
          <input
            id="chat-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.nativeEvent.isComposing || e.keyCode === 229)) e.preventDefault()
            }}
            placeholder={chat.placeholder}
            className="min-w-0 flex-1 bg-transparent text-lg outline-none placeholder:text-neutral-400"
          />
          <button type="submit" aria-label="ส่งข้อความ" className="flex size-11 items-center justify-center rounded-full bg-brand text-white transition active:scale-95">
            <SendHorizontal className="size-5 fill-white" />
          </button>
        </div>
      </form>
    </div>
  )
}
