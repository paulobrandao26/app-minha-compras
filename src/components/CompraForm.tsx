import { useEffect, useState } from 'react';
import type { Cartao, Compra } from '../types';

interface CompraFormProps {
  onSalvar: (compra: Compra) => void;
  compraEditando: Compra | null;
  onCancelarEdicao: () => void;
}

export function CompraForm({ onSalvar, compraEditando, onCancelarEdicao }: CompraFormProps) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [cartao, setCartao] = useState<Cartao>('Nubank');
  const [parcelaAtual, setParcelaAtual] = useState('1');
  const [totalParcelas, setTotalParcelas] = useState('1');

  useEffect(() => {
    if (compraEditando) {
      setDescricao(compraEditando.descricao);
      setValor(String(compraEditando.valor));
      setData(compraEditando.data);
      setCartao(compraEditando.cartao);
      setParcelaAtual(String(compraEditando.parcelaAtual));
      setTotalParcelas(String(compraEditando.totalParcelas));
    }
  }, [compraEditando]);

  function limparCampos() {
    setDescricao('');
    setValor('');
    setData('');
    setCartao('Nubank');
    setParcelaAtual('1');
    setTotalParcelas('1');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const compraSalva: Compra = {
      id: compraEditando ? compraEditando.id : crypto.randomUUID(),
      descricao,
      valor: Number(valor),
      data,
      cartao,
      parcelaAtual: Number(parcelaAtual),
      totalParcelas: Number(totalParcelas),
    };

    onSalvar(compraSalva);
    limparCampos();
  }

  const inputClass =
    'w-full border border-white/15 bg-white/5 backdrop-blur-md text-white placeholder-gray-500 rounded px-3 py-2 focus:outline-none focus:border-teal-400/50';

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-md w-full p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl"
    >
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Descrição</label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Ex: tênis na loja X"
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Valor (R$)</label>
        <input
          type="number"
          step="0.01"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Data</label>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
          className={`${inputClass} [color-scheme:dark]`}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Cartão</label>
        <select
          value={cartao}
          onChange={(e) => setCartao(e.target.value as Cartao)}
          className={inputClass}
        >
          <option value="Nubank" className="bg-[#04050a]">Nubank</option>
          <option value="Hipercard" className="bg-[#04050a]">Hipercard</option>
        </select>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-1">Parcela atual</label>
          <input
            type="number"
            min="1"
            value={parcelaAtual}
            onChange={(e) => setParcelaAtual(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-1">Total de parcelas</label>
          <input
            type="number"
            min="1"
            value={totalParcelas}
            onChange={(e) => setTotalParcelas(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-teal-500 text-black rounded px-4 py-2 font-medium hover:bg-teal-400 transition-colors"
        >
          {compraEditando ? 'Salvar edição' : 'Adicionar compra'}
        </button>

        {compraEditando && (
          <button
            type="button"
            onClick={() => {
              limparCampos();
              onCancelarEdicao();
            }}
            className="px-4 py-2 rounded border border-white/15 text-gray-300 hover:bg-white/5"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}