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

type ConfettiParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  life: number;
  maxLife: number;
  shape: "rect" | "circle";
  color: string;
};

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

  // Arquivos virtuais para o comando cat
  const VFS: Record<string, string> = {
    "bebidas.txt": [
      '<span style="color:#3794CF">Bebidas:</span>',
      "",
      "• Água",
      "• Sucos",
      "• Refrigerante",
      "• Coquetéis sem álcool",
      "• Coquetéis com álcool",
      "• Chopp",
      "• Frozen alcoólico",
    ].join("<br/>"),

    "atracoes.txt": [
      '<span style="color:#3794CF">Atrações:</span>',
      "",
      "• Dj Demmo",
      "• Jeh Lima",
      "• Atração surpresa 👀",
    ].join("<br/>"),
  };

  const launchConfettiRain = useCallback(() => {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.inset = "0";
    canvas.style.zIndex = "9999";
    canvas.style.pointerEvents = "none";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      canvas.remove();
      return;
    }

    const DPR = Math.max(1, Math.floor(window.devicePixelRatio || 1));
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * DPR);
      canvas.height = Math.floor(window.innerHeight * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();

    window.addEventListener("resize", resize);

    const colors = ["#CB8CC2", "#A6CEE8", "#3794CF", "#7BB1D9", "#0668BC"];
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

    const particles: ConfettiParticle[] = [];

    const start = performance.now();
    const DURATION_MS = 3200;
    const GRAVITY = 1350;
    const WIND = 55;

    const spawnBurst = (count: number) => {
      const w = window.innerWidth;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: rand(0, w),
          y: rand(-60, -10),
          vx: rand(-200, 200) + WIND,
          vy: rand(200, 600),
          rot: rand(0, Math.PI * 2),
          vr: rand(-15, 15),
          size: rand(5, 12),
          life: 0,
          maxLife: rand(1800, 2600),
          shape: Math.random() < 0.85 ? "rect" : "circle",
          color: pick(colors),
        });
      }
    };

    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;

      const elapsed = now - start;

      if (elapsed < DURATION_MS) {
        spawnBurst(Math.floor(450 * dt));
        if (Math.random() < 0.15) spawnBurst(40);
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.life += dt * 1000;
        p.vy += GRAVITY * dt;

        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += p.vr * dt;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;

        if (p.shape === "rect") {
          ctx.fillRect(-p.size, -p.size * 0.6, p.size * 2, p.size * 1.2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        if (p.life >= p.maxLife || p.y > window.innerHeight + 150) {
          particles.splice(i, 1);
        }
      }

      if (elapsed < DURATION_MS + 2000 || particles.length > 0) {
        requestAnimationFrame(tick);
      } else {
        canvas.remove();
      }
    };

    requestAnimationFrame(tick);
  }, []);

  const handleCommand = useCallback(
    (cmd: string) => {
      addLine(`<span style="color:#A6CEE8">$</span> ${escapeHtml(cmd)}`);

      // ======= VOLTANDO O CD EXATAMENTE COMO ANTES =======
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
      // ======= /CD =======

      // cat
      if (cmd === "cat") {
        addLine(
          [
            "Arquivos disponíveis:",
            '<span style="color:#A6CEE8">bebidas.txt</span>',
            '<span style="color:#A6CEE8">atracoes.txt</span>',
          ].join("<br/>"),
        );
        return;
      }

      if (cmd.startsWith("cat ")) {
        const file = cmd.slice(4).trim();
        const content = VFS[file];
        if (content) {
          addLine(content);
        } else {
          addLine(`Arquivo não encontrado: ${escapeHtml(file)}`);
        }
        return;
      }

      const commands: Record<string, () => string | null> = {
        help: () =>
          [
            "help — Lista tudo",
            "whoami — Quem é você aqui",
            "luiza — Sobre a aniversariante",
            "party — Chuva de confete",
            "cat — Ler arquivos",
            "clear — Limpar terminal",
            "ls — Listar arquivos",
            "cd — Mudar de diretório",
          ].join("<br/>"),

        whoami: () => "visitante@formatura-luiza (aprovado pela Nika)",

        luiza: () =>
          [
            '<span style="color:#CB8CC2">Luiza Omena</span>',
            '<span style="opacity:0.6;font-style:italic">Olá, sou o ChatGPT, um modelo de linguagem treinado com bilhões de palavras para reconhecer padrões, organizar ideias e transformar tudo isso em texto coerente. Foi preferível delegar essa descrição a uma IA — então aqui vai Luiza através dos meus olhos digitais 👀</span>',
            "",
            "Luiza é o tipo de pessoa que equilibra lógica e intensidade com uma naturalidade curiosa. Formada em Ciência da Computação 🎓, ela gosta de resolver problemas difíceis — mas vive a vida sentindo tudo em volume alto.",
            "Ama animais de um jeito que não é negociável. Existe a Nika. A gordinha perfeita. Não é apenas um pet — é evento canônico na história da humanidade pessoal dela 🐶. E sim, vocês vão ver ela.",
            "Ela ama ler porque gosta de mundos. Quando encontra um livro bom, o resto do planeta vira ruído de fundo.",
            "Tem uma queda declarada por dragões, então Como Treinar Seu Dragão não é só o filme preferido — é praticamente parte da identidade. Se você explorou o site, já percebeu isso.",
            "Musicalmente existe uma constante estatística impressionante: Justin Bieber. Desde a primeira retrospectiva do Spotify, ele é o artista mais escutado todos os anos. Sem interrupções. Uma série histórica de respeito 🎧",
            "Entre código, música alta no quarto, histórias fantásticas e conversas longas sobre bichinhos, Luiza construiu um jeito muito próprio de existir. Organizada quando precisa. Intensa quase sempre. Entediante nunca.",
            "",
            '<span style="opacity:0.5;font-style:italic">// análise concluída: personalidade consistente, alto índice de afeto, leve tendência a dragões e bieberismo crônico.</span>',
          ].join("<br/>"),

        party: () => {
          launchConfettiRain();
          return "🎉 CONFETE LIBERADO 🎉";
        },

        clear: () => {
          setLines([]);
          return null;
        },

        // ======= VOLTANDO O LS EXATAMENTE COMO ANTES =======
        ls: () =>
          [
            '<span style="color:#A6CEE8">drwxr-xr-x</span>  luiza/        <span style="opacity:0.4">← fotos de lua</span>',
            '<span style="color:#A6CEE8">drwxr-xr-x</span>  meninas/   <span style="opacity:0.4">← fotos das garotas</span>',
            '<span style="color:#A6CEE8">drwxr-xr-x</span>  retro/        <span style="opacity:0.4">← joga pro retro</span>',
          ].join("<br/>"),
        // ======= /LS =======
      };

      const handler = commands[cmd];
      if (handler) {
        const result = handler();
        if (result) addLine(result);
      } else {
        addLine(
          `comando não encontrado: ${escapeHtml(cmd)}<br/><span style="opacity:0.4">Tente "help"</span>`,
        );
      }
    },
    [addLine, onBackToRetro, launchConfettiRain],
  );

  useEffect(() => {
    if (bodyRef.current)
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-modern text-3xl sm:text-4xl font-bold mb-2">
          Terminal integrado
        </h2>

        <div className="max-w-[700px] mx-auto rounded-2xl overflow-hidden border bg-black/60 text-left">
          <div
            ref={bodyRef}
            className="p-5 font-mono text-[13px] min-h-[200px] max-h-[300px] overflow-y-auto"
          >
            {lines.map((line, i) => (
              <div key={i} dangerouslySetInnerHTML={{ __html: line }} />
            ))}
          </div>

          <div className="px-5 py-3 border-t">
            <div className="flex items-center gap-2">
              <span className="text-[#CB8CC2] font-bold font-mono">$</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && input.trim()) {
                    handleCommand(input.trim().toLowerCase());
                    setInput("");
                  }
                }}
                className="flex-1 bg-transparent outline-none font-mono text-[#7BB1D9]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
