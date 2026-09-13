import { useEffect, useRef } from 'react';

interface Ponto {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
}

export function CursorRingField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const ESPACAMENTO = 42;
    const RAIO_INFLUENCIA = 140;
    const DESLOCAMENTO_MAX = 22;
    const SUAVIZACAO = 0.12; // quão rápido cada bolinha "persegue" seu alvo

    let pontos: Ponto[] = [];
    let animationFrameId: number;
    let largura = 0;
    let altura = 0;

    // mouse fora da tela por padrão, pra nenhum ponto reagir antes do usuário mexer o mouse
    const mouse = { x: -9999, y: -9999 };

    function montarGrade() {
      const dpr = window.devicePixelRatio || 1;
      largura = window.innerWidth;
      altura = window.innerHeight;

      canvas!.width = largura * dpr;
      canvas!.height = altura * dpr;
      canvas!.style.width = `${largura}px`;
      canvas!.style.height = `${altura}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      pontos = [];
      for (let x = ESPACAMENTO / 2; x < largura; x += ESPACAMENTO) {
        for (let y = ESPACAMENTO / 2; y < altura; y += ESPACAMENTO) {
          pontos.push({ baseX: x, baseY: y, x, y });
        }
      }
    }

    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function handleMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function desenhar() {
      ctx!.clearRect(0, 0, largura, altura);

      for (const p of pontos) {
        const dx = p.baseX - mouse.x;
        const dy = p.baseY - mouse.y;
        const distancia = Math.sqrt(dx * dx + dy * dy);

        let alvoX = p.baseX;
        let alvoY = p.baseY;

        if (distancia < RAIO_INFLUENCIA && distancia > 0.01) {
          const forca = (1 - distancia / RAIO_INFLUENCIA) * DESLOCAMENTO_MAX;
          alvoX = p.baseX + (dx / distancia) * forca;
          alvoY = p.baseY + (dy / distancia) * forca;
        }

        // suaviza o movimento em vez de "teleportar" pro alvo
        p.x += (alvoX - p.x) * SUAVIZACAO;
        p.y += (alvoY - p.y) * SUAVIZACAO;

        const proximidade = Math.max(0, 1 - distancia / RAIO_INFLUENCIA);
        const tamanho = 1.5 + proximidade * 2;
        const opacidade = 0.25 + proximidade * 0.6;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, tamanho, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(45, 212, 191, ${opacidade})`; // teal
        ctx!.fill();
      }

      animationFrameId = requestAnimationFrame(desenhar);
    }

    montarGrade();
    desenhar();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', montarGrade);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', montarGrade);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}