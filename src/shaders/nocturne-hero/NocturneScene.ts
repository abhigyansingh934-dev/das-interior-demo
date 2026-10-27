export const NOCTURNE_TITLES: Record<string, string> = {
  lumen: "Lumen",
  nocturne: "Nocturne",
  solstice: "Solstice",
  equinox: "Equinox",
  midnight: "Midnight",
};
export const NOCTURNE_VARIANTS = ["lumen", "nocturne", "solstice", "equinox", "midnight"] as const;
export type NocturneVariant = (typeof NOCTURNE_VARIANTS)[number];
export function buildNocturneDocument(_variant?: string) {
  return "";
}
