export function validarObligatorio(valor: string) {
  return valor.trim() !== '';
}

export function validarCantidad(cantidad: string) {
  const numero = Number(cantidad);
  return !isNaN(numero) && numero > 0;
}