import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      setErro('Email ou senha incorretos.');
    }

    setCarregando(false);
  }

  return (
    <div className="min-h-screen bg-[#04050a] flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 max-w-sm w-full p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl"
      >
        <h1 className="text-xl font-bold text-white text-center mb-2">Minhas Compras</h1>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-white/15 bg-white/5 backdrop-blur-md text-white rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full border border-white/15 bg-white/5 backdrop-blur-md text-white rounded px-3 py-2"
          />
        </div>

        {erro && <p className="text-red-400 text-sm">{erro}</p>}

        <button
          type="submit"
          disabled={carregando}
          className="bg-teal-500 text-black rounded px-4 py-2 font-medium hover:bg-teal-400 transition-colors disabled:opacity-50"
        >
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}