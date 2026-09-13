import type { Compra } from './types';

export function calcularValorRestante(c: Compra): number {
  const valorPorParcela = c.valor / c.totalParcelas;
  const parcelasRestantes = c.totalParcelas - c.parcelaAtual + 1;
  return valorPorParcela * parcelasRestantes;
}

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}