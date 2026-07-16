import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(price: number): string {
  return `\u20B9${price.toLocaleString("en-IN")}`;
}
