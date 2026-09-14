import type { Compra } from '../types';
import { calcularValorParcela, formatarMoeda } from '../utils';

interface StatsBarProps {
  compras: Compra[];
}

export function StatsBar({ compras }: StatsBarProps) {
  const totalParcelasAtuais = compras.reduce((soma, c) => soma + calcularValorParcela(c), 0);
  const quantidade = compras.length;

  return (
    <div className="max-w-screen-sm mx-auto mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl px-8 py-5 flex justify-around text-center">
      <div>
        <p className="text-2xl font-bold text-white">{formatarMoeda(totalParcelasAtuais)}</p>
        <p className="text-xs text-gray-400 mt-1">total das parcelas em aberto</p>
      </div>
      <div className="w-px bg-white/10" />
      <div>
        <p className="text-2xl font-bold text-white">{quantidade}</p>
        <p className="text-xs text-gray-400 mt-1">{quantidade === 1 ? 'compra cadastrada' : 'compras cadastradas'}</p>
      </div>
    </div>
  );
}