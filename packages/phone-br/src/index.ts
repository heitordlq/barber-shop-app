/**
 * Telefone BR: exibição/máscara no padrão (11) 9 9999-9999 (celular) ou (11) 9999-9999 (10 dígitos).
 * Valores para API: apenas dígitos nacionais (até 11), sem 55 inicial quando redundante.
 */

/** Só dígitos, no máximo 11 após DDD; remove prefixo 55 se sobrar mais de 11 dígitos. */
export function phoneDigitsForApi(value: string | null | undefined): string {
  if (value == null || value === "") return "";
  let d = String(value).replace(/\D/g, "");
  if (d.startsWith("55") && d.length > 11) d = d.slice(2);
  return d.slice(0, 11);
}

/**
 * Formata para exibição / valor de input mascarado.
 * Aceita colar texto com símbolos; reformatar a partir dos dígitos.
 */
export function formatBrazilPhone(value: string | null | undefined): string {
  const d = phoneDigitsForApi(value);
  if (!d) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length >= 11) {
    const n = d.slice(0, 11);
    return n[2] === "9"
      ? `(${n.slice(0, 2)}) ${n[2]} ${n.slice(3, 7)}-${n.slice(7, 11)}`
      : `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7, 11)}`;
  }
  if (d.length === 10) {
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6, 10)}`;
  }
  if (d[2] === "9") {
    if (d.length <= 3) return `(${d.slice(0, 2)}) ${d[2]}`;
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d[2]} ${d.slice(3)}`;
    return `(${d.slice(0, 2)}) ${d[2]} ${d.slice(3, 7)}-${d.slice(7)}`;
  }
  return `(${d.slice(0, 2)}) ${d.slice(2)}`;
}

/** Busca: compara apenas dígitos (ex.: lista com DB sem máscara vs busca mascarada). */
export function phoneDigitsMatchNormalized(a: string | null | undefined, b: string | null | undefined): boolean {
  return phoneDigitsForApi(a) === phoneDigitsForApi(b);
}

/** `haystack` contém a sequência numérica de `query` (para filtro de busca). */
export function phoneHaystackIncludesQuery(
  haystack: string | null | undefined,
  query: string | null | undefined,
): boolean {
  const h = phoneDigitsForApi(haystack);
  const q = phoneDigitsForApi(query);
  if (!q) return true;
  return h.includes(q);
}
