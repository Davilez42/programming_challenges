/**
 * ============================================================================
 * DESCRIPCIÓN DEL PROBLEMA: SUBPADRÓN MÁS LARGO SIN CARACTERES REPETIDOS
 * (Longest Substring Without Repeating Characters)
 * ============================================================================
 *
 * Consigna:
 * Dada una cadena de texto `s`, encuentra la longitud de la subcadena
 * (substring) más larga que NO contenga caracteres repetidos.
 *
 * Reglas de construcción:
 * 1. Una "subcadena" es una secuencia continua de caracteres dentro de la cadena.
 * 2. Distingue entre mayúsculas y minúsculas ('a' != 'A').
 * 3. Puede contener letras, números, espacios y símbolos.
 *
 * Ejemplos:
 * - s = "abcabcbb" -> 3  (La subcadena más larga es "abc")
 * - s = "bbbbb"    -> 1  (La subcadena más larga es "b")
 * - s = "pwwkew"   -> 3  (La subcadena más larga es "wke")
 * - s = ""         -> 0
 *
 * Complejidad esperada:
 * - Tiempo: O(n) — Utilizando el patrón de Ventana Deslizante (Sliding Window).
 * - Espacio: O(k) — Donde k es el tamaño del conjunto de caracteres únicos.
 * ============================================================================
 */

function lengthOfLongestSubstring(s: string): number {
  let longestSize = 0;

  let left = 0;
  let rigth = 0;

  const memo: Map<string, number> = new Map([]);

  for (let i = 0; i < s.length; i++) {
    const character = s[i];
    const characterInMap = memo.get(character);

    if (
      characterInMap !== undefined &&
      characterInMap >= left &&
      characterInMap <= rigth
    ) {
      left = characterInMap + 1;
    }

    const currentSubtrSize = rigth + 1 - left;
    if (currentSubtrSize > longestSize) {
      longestSize = currentSubtrSize;
    }
    memo.set(character, i);

    rigth++;
  }

  return longestSize;
}

// ============================================================================
//  SUITE DE PRUEBAS
// ============================================================================

function runTests() {
  console.log(
    "⏳ Ejecutando pruebas de Subcadena Más Larga Sin Repeticiones...\n",
  );

  const isEqual = (a: unknown, b: unknown) =>
    JSON.stringify(a) === JSON.stringify(b);

  // 1. Casos Borde
  console.assert(
    isEqual(lengthOfLongestSubstring(""), 0),
    "❌ Falló: Cadena vacía debe devolver 0",
  );
  console.assert(
    isEqual(lengthOfLongestSubstring("a"), 1),
    "❌ Falló: Cadena de un solo caracter debe devolver 1",
  );
  console.log("✓ Casos borde pasados");

  // 2. Todos Iguales
  console.assert(
    isEqual(lengthOfLongestSubstring("bbbbb"), 1),
    "❌ Falló: 'bbbbb' debe devolver 1",
  );
  console.log("✓ Caso todos iguales pasado");

  // 3. Casos Estándar
  console.assert(
    isEqual(lengthOfLongestSubstring("abcabcbb"), 3),
    "❌ Falló: 'abcabcbb' debe devolver 3",
  );
  console.assert(
    isEqual(lengthOfLongestSubstring("pwwkew"), 3),
    "❌ Falló: 'pwwkew' debe devolver 3",
  );
  console.assert(
    isEqual(lengthOfLongestSubstring("dvdf"), 3),
    "❌ Falló: 'dvdf' debe devolver 3",
  );
  console.log("✓ Casos estándar pasados");

  // 4. Caracteres Especiales y Espacios
  console.assert(
    isEqual(lengthOfLongestSubstring("a b c a b c"), 3),
    "❌ Falló: 'a b c a b c' con espacios debe considerar el espacio como caracter",
  );
  console.assert(
    isEqual(lengthOfLongestSubstring("aA1!aA1!"), 4),
    "❌ Falló: 'aA1!aA1!' debe distinguir mayúsculas/minúsculas y símbolos",
  );
  console.log("✓ Casos con caracteres especiales pasados");

  console.log("\n✅ ¡Pruebas completadas!");
}

// Ejecutar el runner de pruebas al ejecutar el archivo
runTests();
