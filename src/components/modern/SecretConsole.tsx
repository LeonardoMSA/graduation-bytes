import { useState, useRef, useCallback, useEffect } from 'react';

function escapeHtml(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

interface SecretConsoleProps {
  onEasterEgg: (id: string, name: string, desc: string) => void;
}

export function SecretConsole({ onEasterEgg }: SecretConsoleProps) {
  const [lines, setLines] = useState<string[]>([
    '<span style="opacity:0.4;font-style:italic">// Bem-vindo ao terminal secreto da Luiza!</span>',
    '<span style="opacity:0.4;font-style:italic">// Digite "help" para ver os comandos disponíveis</span>',
    '<span style="color:#c8ff00">$</span> <span style="color:#00e5ff">echo</span> <span style="color:#ff2d7b">"Olá, visitante! 👋"</span>',
    'Olá, visitante! 👋',
  ]);
  const [input, setInput] = useState('');
  const bodyRef = useRef<HTMLDivElement>(null);

  const addLine = useCallback(
    (html: string) => setLines((prev) => [...prev, html]),
    []
  );

  const handleCommand = useCallback(
    (cmd: string) => {
      addLine(
        `<span style="color:#c8ff00">$</span> ${escapeHtml(cmd)}`
      );

      const commands: Record<string, () => string | null> = {
        help: () =>
          [
            '<span style="color:#00e5ff">Comandos disponíveis:</span>',
            '<span style="color:#c8ff00">help</span>     — Mostra este menu',
            '<span style="color:#c8ff00">whoami</span>   — Quem é você?',
            '<span style="color:#c8ff00">luiza</span>    — Sobre a formanda',
            '<span style="color:#c8ff00">party</span>    — 🎉🎉🎉',
            '<span style="color:#c8ff00">matrix</span>   — Pílula vermelha?',
            '<span style="color:#c8ff00">sudo</span>     — Tente se atrever...',
            '<span style="color:#c8ff00">coffee</span>   — Essencial',
            '<span style="color:#c8ff00">42</span>       — A resposta',
            '<span style="color:#c8ff00">clear</span>    — Limpar terminal',
            '<span style="color:#c8ff00">ls</span>       — Listar arquivos',
          ].join('<br/>'),

        whoami: () => {
          onEasterEgg('whoami', '🔍 Whoami', 'Rodou whoami no terminal!');
          return '<span style="color:#ff2d7b">visitante@formatura-luiza</span> (convidado VIP)';
        },

        luiza: () =>
          [
            '<span style="color:#ff2d7b">Luiza Omena</span> — Futura Bacharela em CC 🎓',
            'Apaixonada por código, café e resolver problemas impossíveis.',
            '<span style="opacity:0.4;font-style:italic">// she codes, she conquers</span>',
          ].join('<br/>'),

        party: () => {
          onEasterEgg('party', '🎉 Party Mode', 'Ativou o party mode!');
          return '🎉🎊🥳 PARTY MODE ACTIVATED 🥳🎊🎉';
        },

        matrix: () => {
          onEasterEgg('matrix', '💊 The Matrix', 'Escolheu a pílula vermelha!');
          return [
            '<span style="color:#00e5ff">Wake up, Neo...</span>',
            '<span style="color:#ff2d7b">The Matrix has you...</span>',
            '<span style="opacity:0.4;font-style:italic">Follow the white rabbit. 🐇</span>',
          ].join('<br/>');
        },

        sudo: () =>
          [
            '<span style="color:#ff2d7b">[sudo] senha para visitante:</span> ********',
            '<span style="color:#ff5f57">Acesso negado!</span> Bom try, hacker 😏',
          ].join('<br/>'),

        coffee: () => {
          onEasterEgg('coffee', '☕ Coffee Lover', 'Pediu café no terminal!');
          return [
            'Preparando café... ☕',
            '████████████████████ 100%',
            '<span style="color:#ff2d7b">Café pronto!</span> Agora sim, podemos codar! 💻',
          ].join('<br/>');
        },

        '42': () => {
          onEasterEgg('42', '🌌 Hitchhiker', 'Encontrou a resposta!');
          return [
            '<span style="color:#00e5ff">42</span> — A Resposta para a Vida, o Universo e Tudo Mais.',
            "<span style=\"opacity:0.4;font-style:italic\">// \"Don't Panic\" — Douglas Adams</span>",
          ].join('<br/>');
        },

        clear: () => {
          setLines([]);
          return null;
        },

        hack: () =>
          [
            '<span style="color:#ff5f57">⚠️ ALERTA DE SEGURANÇA ⚠️</span>',
            'Just kidding 😂 Isso aqui é um convite, não o Pentagon.',
            '<span style="opacity:0.4;font-style:italic">// mas legal que você tentou</span>',
          ].join('<br/>'),

        ls: () =>
          [
            '<span style="color:#c8ff00">drwxr-xr-x</span>  formatura/',
            '<span style="color:#c8ff00">drwxr-xr-x</span>  aniversario/',
            '-rw-r--r--  <span style="color:#ff2d7b">convite.html</span>',
            '-rw-r--r--  <span style="color:#ff2d7b">segredo.txt</span> <span style="opacity:0.4">← 🤔</span>',
            '-rwx------  <span style="color:#ff2d7b">.hidden_easter_egg</span>',
          ].join('<br/>'),

        'cat segredo.txt': () => {
          onEasterEgg('cat-segredo', '📄 Cat Master', 'Leu o arquivo secreto!');
          return [
            '<span style="color:#ff2d7b">Conteúdo de segredo.txt:</span>',
            '',
            '"Todo grande programador já foi um iniciante que não desistiu."',
            '',
            '<span style="opacity:0.4;font-style:italic">// — Luiza, provavelmente às 3h da manhã</span>',
          ].join('<br/>');
        },

        'cat .hidden_easter_egg': () => {
          onEasterEgg('hidden-egg', '🥚 Hidden Egg', 'Encontrou o arquivo oculto!');
          return [
            '<span style="color:#00e5ff">🏆 CONQUISTA DESBLOQUEADA!</span>',
            'Você encontrou o arquivo secreto!',
            '<span style="color:#ff2d7b">"A curiosidade é o motor da inovação."</span>',
          ].join('<br/>');
        },

        easter: () =>
          '🥚 Easter eggs: veja o contador no topo da tela!<br/><span style="opacity:0.4;font-style:italic">// Continue explorando...</span>',
      };

      const handler = commands[cmd];
      if (handler) {
        const result = handler();
        if (result) addLine(result);
      } else {
        addLine(
          `<span style="color:#ff5f57">comando não encontrado:</span> ${escapeHtml(cmd)}<br/><span style="opacity:0.4">Tente "help"</span>`
        );
      }
    },
    [addLine, onEasterEgg]
  );

  useEffect(() => {
    if (bodyRef.current)
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  return (
    <section
      className="py-24 px-6"
      style={{ background: 'hsl(250,30%,10%)' }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-mono text-xs tracking-[4px] uppercase text-[#c8ff00] mb-4">
          Para devs 🤓
        </p>
        <h2 className="font-modern text-3xl sm:text-4xl font-bold mb-2 leading-tight">
          Terminal <span className="text-[#c8ff00]">secreto</span>
        </h2>
        <p className="opacity-50 text-sm mb-8">
          Digite comandos para descobrir Easter Eggs! Tente:{' '}
          <code className="text-[#c8ff00]">help</code>
        </p>

        <div className="max-w-[700px] mx-auto rounded-2xl overflow-hidden border border-white/[0.08] bg-black/60 text-left">
          <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.08]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span className="flex-1 text-center font-mono text-[11px] opacity-30">
              luiza@formatura:~
            </span>
          </div>

          <div
            ref={bodyRef}
            className="p-5 font-mono text-[13px] leading-[1.8] opacity-70 min-h-[200px] max-h-[300px] overflow-y-auto"
          >
            {lines.map((line, i) => (
              <div
                key={i}
                className="mb-1"
                dangerouslySetInnerHTML={{ __html: line }}
              />
            ))}
          </div>

          <div className="px-5 py-3 border-t border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="text-purple-500 font-bold font-mono">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && input.trim()) {
                    handleCommand(input.trim().toLowerCase());
                    setInput('');
                  }
                }}
                placeholder="Digite um comando..."
                autoComplete="off"
                spellCheck={false}
                className="flex-1 bg-transparent border-none outline-none font-mono text-[13px] text-[#c8ff00] placeholder:opacity-30"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
