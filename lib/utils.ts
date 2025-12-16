import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateLTV(purchasePrice: number, arv: number): number {
  if (arv === 0) return 0;
  return Math.round((purchasePrice / arv) * 100);
}

export function calculateLTC(purchasePrice: number, rehabBudget: number, arv: number): number {
  if (arv === 0) return 0;
  return Math.round(((purchasePrice + rehabBudget) / arv) * 100);
}
