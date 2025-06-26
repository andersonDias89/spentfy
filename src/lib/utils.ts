// lib/utils.ts
export function cn(
  ...inputs: (string | undefined | null | false | 0 | boolean)[]
): string {
  return inputs.filter(Boolean).join(" ");
}
