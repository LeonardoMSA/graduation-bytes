import { useState, useEffect, useRef } from 'react';
import { getStoredRsvp } from '@/lib/rsvpStorage';
import { sendMessage, subscribeToMessages, type Message } from '@/lib/messagesFirestore';

function formatRelativeTime(timestamp: { toDate: () => Date } | null): string {
  if (!timestamp) return '';
  const now = Date.now();
  const then = timestamp.toDate().getTime();
  const diffSec = Math.floor((now - then) / 1000);

  if (diffSec < 60) return 'agora';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}min`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h`;
  return `${Math.floor(diffSec / 86400)}d`;
}

export function MessagesSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return subscribeToMessages(setMessages);
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    setSending(true);
    const guestName = getStoredRsvp()?.name;
    await sendMessage(trimmed, guestName).catch(() => {});
    setText('');
    setSending(false);
  };

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-lg mx-auto text-center">
        <p className="font-mono text-xs tracking-[4px] uppercase text-[#7BB1D9] mb-4">
          Mural de recados
        </p>
        <h2 className="font-modern text-3xl sm:text-4xl font-bold mb-8 leading-tight">
          Deixe uma{' '}
          <span
            className="text-[#3794CF]"
            style={{ textShadow: '0 0 24px rgba(55,148,207,0.4)' }}
          >
            mensagem
          </span>
        </h2>

        <div className="glass rounded-3xl p-8 sm:p-12">
          <div
            ref={listRef}
            className="mb-6 text-left overflow-y-auto"
            style={{ maxHeight: 280 }}
          >
            {messages.length === 0 && (
              <p className="text-center opacity-40 text-sm py-6">
                Nenhuma mensagem ainda. Seja o primeiro!
              </p>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className="mb-3">
                <div
                  className="inline-block rounded-2xl px-4 py-2 text-sm"
                  style={{
                    background: 'rgba(55,148,207,0.15)',
                    maxWidth: '85%',
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.text}
                </div>
                <div className="text-[10px] opacity-40 mt-0.5 ml-2">
                  {formatRelativeTime(msg.createdAt)}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Escreva uma mensagem..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono placeholder:opacity-30 focus:outline-none focus:border-[#3794CF]/60 transition-colors"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!text.trim() || sending}
              className={`px-5 py-3 rounded-xl font-modern font-bold text-sm transition-all ${
                text.trim() && !sending
                  ? 'bg-[#3794CF] text-white cursor-pointer hover:shadow-[0_0_20px_rgba(55,148,207,0.4)]'
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
