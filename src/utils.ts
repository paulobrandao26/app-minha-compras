import type { Compra } from './types';

export function calcularValorParcela(c: Compra): number {
  return c.valor / c.totalParcelas;
}

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}