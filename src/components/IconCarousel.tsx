import { Banknote, Calculator, CreditCard, Landmark, PiggyBank, Receipt, ShieldCheck, Wallet } from 'lucide-react';

const icones = [CreditCard, Wallet, Receipt, PiggyBank, Banknote, Landmark, ShieldCheck, Calculator];

interface ColunaProps {
  direcao: 'up' | 'down';
  duracao: string;
}

function Coluna({ direcao, duracao }: ColunaProps) {
  const lista = [...icones, ...icones];

  return (
    <div className="h-40 overflow-hidden relative">
      <div
        className={`flex flex-col gap-4 ${direcao === 'up' ? 'animate-scroll-up' : 'animate-scroll-down'}`}
        style={{ animationDuration: duracao }}
      >
        {lista.map((Icone, i) => (
          <div
            key={i}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 mx-auto shrink-0"
          >
            <Icone className="w-4 h-4 text-gray-500" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function IconCarousel() {
  return (
    <div className="grid grid-cols-3 gap-3 max-w-[180px] mx-auto [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]">
      <Coluna direcao="up" duracao="16s" />
      <Coluna direcao="down" duracao="20s" />
      <Coluna direcao="up" duracao="13s" />
    </div>
  );
}