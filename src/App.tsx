import { useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import { Login } from './components/Login';
import { CompraForm } from './components/CompraForm';
import { CompraList } from './components/CompraList';
import { GradientHeading } from './components/GradientHeading';
import { IconCarousel } from './components/IconCarousel';
import { StatsBar } from './components/StatsBar';
import { CursorRingField } from './components/CursorRingField';
import type { Compra, Cartao } from './types';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [carregandoSessao, setCarregandoSessao] = useState(true);

  const [compras, setCompras] = useState<Compra[]>([]);
  const [carregandoCompras, setCarregandoCompras] = useState(false);
  const [compraEditando, setCompraEditando] = useState<Compra | null>(null);
  const [filtroCartao, setFiltroCartao] = useState<Cartao | 'Todos'>('Todos');
  const [filtroMes, setFiltroMes] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setCarregandoSessao(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // busca as compras no banco assim que existir uma sessão ativa
  useEffect(() => {
    if (!session) return;
    buscarCompras();
  }, [session]);

  async function buscarCompras() {
    setCarregandoCompras(true);

    const { data, error } = await supabase
      .from('compras')
      .select('*')
      .order('data', { ascending: false });

    if (error) {
      console.error('Erro ao buscar compras:', error.message);
    } else if (data) {
      // o banco usa snake_case (parcela_atual), o front usa camelCase (parcelaAtual) — converte aqui
      const compraConvertida: Compra[] = data.map((c) => ({
        id: c.id,
        descricao: c.descricao,
        valor: Number(c.valor),
        data: c.data,
        cartao: c.cartao,
        parcelaAtual: c.parcela_atual,
        totalParcelas: c.total_parcelas,
      }));
      setCompras(compraConvertida);
    }

    setCarregandoCompras(false);
  }

  async function handleSalvar(compra: Compra) {
    const existe = compras.some((c) => c.id === compra.id);

    const linhaBanco = {
      descricao: compra.descricao,
      valor: compra.valor,
      data: compra.data,
      cartao: compra.cartao,
      parcela_atual: compra.parcelaAtual,
      total_parcelas: compra.totalParcelas,
    };

    if (existe) {
      const { error } = await supabase
        .from('compras')
        .update(linhaBanco)
        .eq('id', compra.id);

      if (error) {
        console.error('Erro ao editar compra:', error.message);
        return;
      }
    } else {
      const { error } = await supabase.from('compras').insert(linhaBanco);

      if (error) {
        console.error('Erro ao criar compra:', error.message);
        return;
      }
    }

    setCompraEditando(null);
    buscarCompras(); // recarrega a lista do banco pra refletir a mudança
  }

  async function handleApagar(id: string) {
    const { error } = await supabase.from('compras').delete().eq('id', id);

    if (error) {
      console.error('Erro ao apagar compra:', error.message);
      return;
    }

    buscarCompras();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setCompras([]);
  }

  const comprasFiltradas = compras.filter((c) => {
    const passaCartao = filtroCartao === 'Todos' || c.cartao === filtroCartao;
    const passaMes = filtroMes === '' || c.data.startsWith(filtroMes);
    return passaCartao && passaMes;
  });

  if (carregandoSessao) {
    return <div className="min-h-screen bg-[#04050a]" />;
  }

  if (!session) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-[#04050a] relative">
      <CursorRingField />

      <div className="relative z-10 pt-12 pb-10 px-4">
        <div className="max-w-screen-sm mx-auto flex flex-col items-center gap-4">
          <IconCarousel />
          <div className="text-center">
            <GradientHeading size="xl">Minhas Compras</GradientHeading>
            <p className="text-gray-400 mt-2">Organize o que é seu, separado do resto.</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-gray-500 hover:text-gray-300 underline"
          >
            Sair
          </button>
        </div>

        <StatsBar compras={compras} />

        <div className="flex justify-center mt-10">
          <CompraForm
            onSalvar={handleSalvar}
            compraEditando={compraEditando}
            onCancelarEdicao={() => setCompraEditando(null)}
          />
        </div>

        <div className="max-w-2xl mx-auto mt-6 flex gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Cartão</label>
            <select
              value={filtroCartao}
              onChange={(e) => setFiltroCartao(e.target.value as Cartao | 'Todos')}
              className="border border-white/15 bg-white/5 backdrop-blur-md text-white rounded px-3 py-2"
            >
              <option value="Todos" className="bg-[#04050a]">Todos</option>
              <option value="Nubank" className="bg-[#04050a]">Nubank</option>
              <option value="Hipercard" className="bg-[#04050a]">Hipercard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Mês</label>
            <input
              type="month"
              value={filtroMes}
              onChange={(e) => setFiltroMes(e.target.value)}
              className="border border-white/15 bg-white/5 backdrop-blur-md text-white rounded px-3 py-2"
            />
          </div>

          {(filtroCartao !== 'Todos' || filtroMes !== '') && (
            <button
              onClick={() => {
                setFiltroCartao('Todos');
                setFiltroMes('');
              }}
              className="text-sm text-teal-400 hover:underline pb-2"
            >
              Limpar filtros
            </button>
          )}
        </div>

        {carregandoCompras ? (
          <p className="text-center text-gray-400 mt-6">Carregando...</p>
        ) : (
          <CompraList
            compras={comprasFiltradas}
            onApagar={handleApagar}
            onEditar={setCompraEditando}
          />
        )}
      </div>
    </div>
  );
}

export default App;