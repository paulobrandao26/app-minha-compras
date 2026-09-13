import type { Compra } from '../types';
import { calcularValorRestante, formatarMoeda } from '../utils';

interface StatsBarProps {
  compras: Compra[];
}

export function StatsBar({ compras }: StatsBarProps) {
  const totalRestante = compras.reduce((soma, c) => soma + calcularValorRestante(c), 0);
  const quantidade = compras.length;

  return (
    <div className="max-w-screen-sm mx-auto mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl px-8 py-5 flex justify-around text-center">
      <div>
        <p className="text-2xl font-bold text-white">{formatarMoeda(totalRestante)}</p>
        <p className="text-xs text-gray-400 mt-1">restante a pagar</p>
      </div>
      <div className="w-px bg-white/10" />
      <div>
        <p className="text-2xl font-bold text-white">{quantidade}</p>
        <p className="text-xs text-gray-400 mt-1">{quantidade === 1 ? 'compra cadastrada' : 'compras cadastradas'}</p>
      </div>
    </div>
  );
}