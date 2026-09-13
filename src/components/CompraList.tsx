import type { Compra } from '../types';
import { calcularValorRestante, formatarMoeda } from '../utils';

interface CompraListProps {
  compras: Compra[];
  onApagar: (id: string) => void;
  onEditar: (compra: Compra) => void;
}

export function CompraList({ compras, onApagar, onEditar }: CompraListProps) {
  const totalRestante = compras.reduce((soma, c) => soma + calcularValorRestante(c), 0);

  if (compras.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-6">
        Nenhuma compra cadastrada ainda.
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl overflow-hidden">
      <table className="w-full text-sm text-gray-200">
        <thead className="bg-white/5 text-left text-gray-400">
          <tr>
            <th className="px-4 py-2">Descrição</th>
            <th className="px-4 py-2">Valor total</th>
            <th className="px-4 py-2">Restante</th>
            <th className="px-4 py-2">Data</th>
            <th className="px-4 py-2">Cartão</th>
            <th className="px-4 py-2">Parcela</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {compras.map((c) => (
            <tr key={c.id} className="border-t border-white/5">
              <td className="px-4 py-2">{c.descricao}</td>
              <td className="px-4 py-2 text-gray-400">{formatarMoeda(c.valor)}</td>
              <td className="px-4 py-2 font-medium text-white">{formatarMoeda(calcularValorRestante(c))}</td>
              <td className="px-4 py-2">
                {new Date(c.data + 'T00:00:00').toLocaleDateString('pt-BR')}
              </td>
              <td className="px-4 py-2">{c.cartao}</td>
              <td className="px-4 py-2">{c.parcelaAtual}/{c.totalParcelas}</td>
              <td className="px-4 py-2 text-right whitespace-nowrap">
                <button onClick={() => onEditar(c)} className="text-teal-400 hover:underline text-xs mr-3">
                  Editar
                </button>
                <button onClick={() => onApagar(c.id)} className="text-red-400 hover:underline text-xs">
                  Apagar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="px-4 py-3 bg-white/5 border-t border-white/10 flex justify-between font-semibold text-white">
        <span>Total restante a pagar</span>
        <span>{formatarMoeda(totalRestante)}</span>
      </div>
    </div>
  );
}