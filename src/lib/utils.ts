import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** shadcn's class merger; the reference components import it as `@/lib/utils`. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
