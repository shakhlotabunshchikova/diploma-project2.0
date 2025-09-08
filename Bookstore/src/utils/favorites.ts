export const FAV_SHELF_KEY = "bookshop:favorites:v1";

export function readFavIds(): string[] {
  try {
    const raw = localStorage.getItem(FAV_SHELF_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);

    return Array.isArray(parsed) ? parsed : Array.isArray(parsed?.ids) ? parsed.ids : [];
  } catch {
    return [];
  }
}

export function writeFavIds(ids: string[]): void {
  try {
    localStorage.setItem(FAV_SHELF_KEY, JSON.stringify({ ids }));
  } catch {
  }
}

