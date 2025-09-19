import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type VariantProps<T extends (...args: any) => any> = Omit<Parameters<T>[0], "class" | "className">

export function cva(
  base?: string,
  config?: {
    variants?: Record<string, Record<string, string>>
    defaultVariants?: Record<string, string>
  },
) {
  return (props?: Record<string, any>) => {
    if (!config?.variants) return base

    const { variants, defaultVariants } = config
    let result = base || ""

    // Apply variant classes
    Object.entries(variants).forEach(([key, variantOptions]) => {
      const value = props?.[key] ?? defaultVariants?.[key]
      if (value && variantOptions[value]) {
        result += " " + variantOptions[value]
      }
    })

    // Add any additional className
    if (props?.className) {
      result += " " + props.className
    }

    return result.trim()
  }
}
