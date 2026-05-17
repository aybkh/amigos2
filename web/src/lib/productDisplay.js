// Nombre de producto para mostrar en la carta.
// Las pizzas deben salir como "Pizza X" (p. ej. "Margarita" → "Pizza Margarita").
// Si el nombre ya empieza por "pizza" se deja tal cual para no duplicar.
export function displayProductName(name, categoryName) {
  const n = (name || '').trim()
  if (!n) return n
  const cat = (categoryName || '').toLowerCase()
  if (cat.includes('pizza') && !n.toLowerCase().startsWith('pizza')) {
    return `Pizza ${n}`
  }
  return n
}
