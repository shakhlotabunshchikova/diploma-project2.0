const CART_KEY = "bookshop:cart:v1";

export function readCart(): any {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    return parsed?.cart ?? parsed; 
  } catch { return undefined; }
}

export function writeCart(cartState: any): void {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify({ cart: cartState }));
  } catch { /* ignore */ }
}
