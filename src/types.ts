export type Cartao = 'Hipercard' | 'Nubank';

export interface Compra {
  id: string;
  descricao: string;
  valor: number;
  data: string; // formato YYYY-MM-DD
  cartao: Cartao;
  parcelaAtual: number;
  totalParcelas: number;
}