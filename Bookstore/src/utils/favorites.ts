const FavBooks = "favorites"; 
export function getFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FavBooks);   
    return raw ? JSON.parse(raw) : [];      
  } catch {
    return [];                            
  }
}

// check if the book is there
export function isFavorite(isbn13: string): boolean {
  return getFavorites().includes(isbn13);
}

// Add/Delete the book from favorites
export function toggleFavorite(isbn13: string): string[] {
  const list = new Set(getFavorites());      
  if (list.has(isbn13)) list.delete(isbn13);
  else list.add(isbn13);                     
  const arr = Array.from(list);              
  localStorage.setItem(FavBooks, JSON.stringify(arr)); 
  return arr;                               
}
