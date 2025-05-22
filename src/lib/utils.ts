
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
}

export function generateImagePlaceholder(width: number = 800, height: number = 800, text: string = 'StyleTees'): string {
  const colors = ['1a237e', 'ff5252', '424242', '607d8b'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return `https://via.placeholder.com/${width}x${height}/${randomColor}/ffffff?text=${encodeURIComponent(text)}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getDiscountPrice(originalPrice: number, discountPercentage: number): number {
  if (!discountPercentage) return originalPrice;
  return originalPrice * (1 - discountPercentage / 100);
}
