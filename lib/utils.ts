import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number) {
  return new Intl.NumberFormat().format(num)
}

export function getTierColor(tier: string) {
  switch (tier?.toLowerCase()) {
    case 'bronze': return '#cd7f32'
    case 'silver': return '#c0c0c0'
    case 'gold': return '#ffd700'
    case 'platinum': return '#e5e4e2'
    default: return '#8b5cf6' // default violet
  }
}

export function getTierGradient(tier: string) {
  switch (tier?.toLowerCase()) {
    case 'bronze': return 'from-[#cd7f32] to-[#8b4513]'
    case 'silver': return 'from-[#c0c0c0] to-[#708090]'
    case 'gold': return 'from-[#ffd700] to-[#b8860b]'
    case 'platinum': return 'from-[#e5e4e2] to-[#b0c4de]'
    default: return 'from-violet-600 to-purple-600'
  }
}
