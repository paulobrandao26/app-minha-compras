import type { Compra } from '../types';
import { calcularValorParcela, formatarMoeda } from '../utils';

interface CompraListProps {
  compras: Compra[];
  onApagar: (id: string) => void;
  onEditar: (compra: Compra) => void;
}

export function CompraList({ compras, onApagar, onEditar }: CompraListProps) {
  const totalParcelasAtuais = compras.reduce((soma, c) => soma + calcularValorParcela(c), 0);

  if (compras.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-6">
        Nenhuma compra cadastrada ainda.
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-6 flex flex-col gap-3">
      {compras.map((c) => (
        <div
          key={c.id}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl p-4"
        >
          <div className="flex justify-between items-start gap-2">
            <div>
              <p className="text-white font-medium">{c.descricao}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {new Date(c.data + 'T00:00:00').toLocaleDateString('pt-BR')} · {c.cartao}
              </p>
            </div>
            <span className="text-xs bg-white/10 text-gray-300 rounded-full px-2 py-1 whitespace-nowrap">
              {c.parcelaAtual}/{c.totalParcelas}
            </span>
          </div>

          <div className="flex justify-between items-end mt-3">
            <div>
              <p className="text-xs text-gray-500">Valor total: {formatarMoeda(c.valor)}</p>
              <p className="text-lg font-semibold text-white">
                {formatarMoeda(calcularValorParcela(c))}
                <span className="text-xs text-gray-500 font-normal"> nesta parcela</span>
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => onEditar(c)}
                className="text-teal-400 hover:underline text-xs"
              >
                Editar
              </button>
              <button
                onClick={() => onApagar(c.id)}
                className="text-red-400 hover:underline text-xs"
              >
                Apagar
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl px-4 py-3 flex justify-between font-semibold text-white">
        <span>Total das parcelas em aberto</span>
        <span>{formatarMoeda(totalParcelasAtuais)}</span>
      </div>
    </div>
  );
}