/**
 * Interpreta "YYYY-MM-DD" como dia civil no fuso local do processo Node
 * (componentes de data/hora locais), alinhado a `new Date(y, m - 1, d, ...)`.
 *
 * Evita `new Date("YYYY-MM-DD")`, que no JS é meia-noite UTC e, em fusos como
 * América/São_Paulo, desloca o intervalo e pode excluir o último dia da semana.
 */
export function startOfLocalCalendarDay(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d, 0, 0, 0, 0);
}

export function endOfLocalCalendarDay(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d, 23, 59, 59, 999);
}
