import { useState, useRef, useCallback, useEffect } from "react";

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

interface SecretConsoleProps {
  onBackToRetro: () => void;
}

export function SecretConsole({ onBackToRetro }: SecretConsoleProps) {
  const [lines, setLines] = useState<string[]>([
    '<span style="opacity:0.4;font-style:italic">// Bem-vindo ao terminal secreto da Luiza!</span>',
    '<span style="opacity:0.4;font-style:italic">// Digite "help" para ver os comandos disponíveis</span>',
    '<span style="color:#A6CEE8">$</span> <span style="color:#3794CF">echo</span> <span style="color:#CB8CC2">"Olá, visitante! 👋"</span>',
    "Olá, visitante! 👋",
  ]);
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  const addLine = useCallback(
    (html: string) => setLines((prev) => [...prev, html]),
    [],
  );

  const handleCommand = useCallback(
    (cmd: string) => {
      addLine(`<span style="color:#A6CEE8">$</span> ${escapeHtml(cmd)}`);

      if (cmd === "cd") {
        addLine(
          [
            '<span style="color:#3794CF">Uso:</span> cd &lt;diretório&gt;',
            "",
            "Exemplo:",
            '  <span style="color:#A6CEE8">cd luiza</span>',
            '  <span style="color:#A6CEE8">cd meninas</span>',
            '  <span style="color:#A6CEE8">cd retro</span>',
            "",
            '<span style="opacity:0.4;font-style:italic">// Use "ls" pra ver os diretórios disponíveis</span>',
          ].join("<br/>"),
        );
        return;
      }

      if (cmd === "cd luiza") {
        addLine('<span style="color:#3794CF">Abrindo luiza/...</span>');
        window.open("/luiza", "_blank");
        return;
      }

      if (cmd === "cd meninas") {
        addLine('<span style="color:#3794CF">Abrindo meninas/...</span>');
        window.open("/meninas", "_blank");
        return;
      }

      if (cmd === "cd retro") {
        addLine('<span style="color:#3794CF">Abrindo retro/...</span>');
        onBackToRetro();
        return;
      }

      if (cmd.startsWith("cd ")) {
        const dir = cmd.slice(3);
        addLine(
          `<span style="color:#0668BC">cd:</span> ${escapeHtml(dir)}: diretório não encontrado`,
        );
        return;
      }

      const commands: Record<string, () => string | null> = {
        help: () =>
          [
            '<span style="color:#3794CF">Comandos disponíveis:</span>',
            "",
            '<span style="color:#A6CEE8">help</span>     — Mostra este menu',
            '<span style="color:#A6CEE8">whoami</span>   — Quem é você?',
            '<span style="color:#A6CEE8">luiza</span>    — Sobre a aniversariante',
            '<span style="color:#A6CEE8">party</span>    — 🎉 Confetes!',
            '<span style="color:#A6CEE8">42</span>       — A resposta',
            '<span style="color:#A6CEE8">clear</span>    — Limpar terminal',
            '<span style="color:#A6CEE8">ls</span>       — Listar arquivos',
            '<span style="color:#A6CEE8">cd</span>       — Mudar de diretório',
          ].join("<br/>"),

        whoami: () => {
          return '<span style="color:#CB8CC2">visitante@formatura-luiza</span> (convidado VIP)';
        },

        luiza: () =>
          [
            '<span style="color:#CB8CC2">Luiza Omena</span> — Bacharela em CC & aniversariante 🎂',
            "Apaixonada por código, café e resolver problemas impossíveis.",
            '<span style="opacity:0.4;font-style:italic">// she codes, she conquers</span>',
          ].join("<br/>"),

        party: () => {
          return "🎉🎊🥳 CONFETES ATIVADOS 🥳🎊🎉";
        },

        "42": () => {
          return [
            '<span style="color:#3794CF">42</span> — A Resposta para a Vida, o Universo e Tudo Mais.',
            '<span style="opacity:0.4;font-style:italic">// "Don\'t Panic" — Douglas Adams</span>',
          ].join("<br/>");
        },

        clear: () => {
          setLines([]);
          return null;
        },

        ls: () =>
          [
            '<span style="color:#A6CEE8">drwxr-xr-x</span>  luiza/        <span style="opacity:0.4">← fotos de lua</span>',
            '<span style="color:#A6CEE8">drwxr-xr-x</span>  meninas/   <span style="opacity:0.4">← fotos das garotas</span>',
            '<span style="color:#A6CEE8">drwxr-xr-x</span>  retro/        <span style="opacity:0.4">← joga pro retro</span>',
          ].join("<br/>"),
      };

      const handler = commands[cmd];
      if (handler) {
        const result = handler();
        if (result) addLine(result);
      } else {
        addLine(
          `<span style="color:#0668BC">comando não encontrado:</span> ${escapeHtml(cmd)}<br/><span style="opacity:0.4">Tente "help"</span>`,
        );
      }
    },
    [addLine],
  );

  useEffect(() => {
    if (bodyRef.current)
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-mono text-xs tracking-[4px] uppercase text-[#7BB1D9] mb-4">
          Para os devs
        </p>
        <h2 className="font-modern text-3xl sm:text-4xl font-bold mb-2 leading-tight">
          Terminal <span className="text-[#3794CF]">integrado</span>
        </h2>
        <p className="opacity-50 text-sm mb-8">
          Tente: <code className="text-[#3794CF]">help</code>
        </p>

        <div className="max-w-[700px] mx-auto rounded-2xl overflow-hidden border border-white/[0.08] bg-black/60 text-left">
          <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.08]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#CB8CC2]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#A6CEE8]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#3794CF]" />
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
              <span className="text-[#CB8CC2] font-bold font-mono">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && input.trim()) {
                    handleCommand(input.trim().toLowerCase());
                    setInput("");
                  }
                }}
                placeholder="Digite um comando..."
                autoComplete="off"
                spellCheck={false}
                className="flex-1 bg-transparent border-none outline-none font-mono text-[13px] text-[#7BB1D9] placeholder:opacity-30"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
