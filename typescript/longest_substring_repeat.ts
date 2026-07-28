/**
 * ============================================================================
 * DESCRIPCIÓN DEL PROBLEMA: SUBCADENA MÁS LARGA CON AT MOST K CARACTERES DISTINTOS
 * (Longest Substring with At Most K Distinct Characters)
 * ============================================================================
 *
 * Consigna:
 * Dada una cadena de texto `s` y un número entero `k`, encuentra la longitud de
 * la subcadena (substring) más larga que contenga COMO MÁXIMO `k` caracteres
 * distintos.
 *
 * Reglas de construcción:
 * 1. Una "subcadena" es una secuencia continua de caracteres dentro de la cadena.
 * 2. Distingue entre mayúsculas y minúsculas ('a' != 'A').
 * 3. Si `k = 0` o la cadena está vacía, el resultado debe ser `0`.
 * 4. Si `k` es mayor o igual a la cantidad de caracteres únicos en `s`, la
 *    respuesta será la longitud de la cadena completa.
 *
 * Ejemplos:
 * - s = "eceba", k = 2 -> 3  (La subcadena más larga es "ece", tiene 'e' y 'c')
 * - s = "aa",    k = 1 -> 2  (La subcadena más larga es "aa", solo tiene 'a')
 * - s = "WORLD", k = 4 -> 4  (Subcadenas como "WORL" o "ORLD" tienen 4 distintos)
 * - s = "ab",    k = 5 -> 2  (Toda la cadena "ab" solo tiene 2 distintos, que es <= 5)
 * - s = "",      k = 2 -> 0
 *
 * Complejidad esperada:
 * - Tiempo: O(n) — Utilizando el patrón de Ventana Deslizante (Sliding Window).
 * - Espacio: O(k) — Un mapa/diccionario para mantener las frecuencias de
 *   máximo k + 1 caracteres distintos a la vez.
 * ============================================================================
 */

function lengthOfLongestSubstringKDistinct(s: string, k: number): number {
  const memoFrecuency: Map<string, number> = new Map([]);
  let left = 0;
  let right = 0;
  let longestSize = 0;

  if (k == 0) return k;

  for (let i = 0; i < s.length; i++) {
    const character = s[i];

    const inMemoCharacterFrecuency = memoFrecuency.get(character) ?? 0;

    if (inMemoCharacterFrecuency === 0 && memoFrecuency.size == k) {
      while (memoFrecuency.size == k) {
        const c = s[left];

        const characterFrecuency = memoFrecuency.get(c);

        if (characterFrecuency != undefined) {
          const characterFrecuency_ = characterFrecuency - 1;
          if (characterFrecuency_ == 0) {
            memoFrecuency.delete(c);
          } else {
            memoFrecuency.set(c, characterFrecuency_);
          }
        }
        left++;
      }
    }

    longestSize = Math.max(longestSize, right + 1 - left);

    memoFrecuency.set(character, inMemoCharacterFrecuency + 1);

    right++;
  }

  return longestSize;
}

// ============================================================================
//  SUITE DE PRUEBAS
// ============================================================================

function runTests() {
  console.log(
    "⏳ Ejecutando pruebas de Subcadena con Máximo K Caracteres Distintos...\n",
  );

  const isEqual = (a: unknown, b: unknown) =>
    JSON.stringify(a) === JSON.stringify(b);

  let passed = 0;
  let failed = 0;

  const testCases: {
    s: string;
    k: number;
    expected: number;
    description: string;
  }[] = [
    // 1. Casos Borde
    { s: "", k: 2, expected: 0, description: "Cadena vacía debe devolver 0" },
    { s: "abc", k: 0, expected: 0, description: "k = 0 debe devolver 0" },
    { s: "a", k: 1, expected: 1, description: "Cadena de un solo carácter" },
    {
      s: "aaaaa",
      k: 1,
      expected: 5,
      description: "Todos los caracteres iguales con k = 1",
    },

    // 2. Casos Estándar
    { s: "eceba", k: 2, expected: 3, description: "'eceba' con k=2 -> 'ece'" },
    { s: "aa", k: 1, expected: 2, description: "'aa' con k=1" },
    { s: "WORLD", k: 4, expected: 4, description: "'WORLD' con k=4" },
    {
      s: "ab",
      k: 5,
      expected: 2,
      description: "k mayor que el tamaño de la cadena",
    },

    // 3. Batalla de Pruebas (Casos de Estrés y Desplazamientos)
    {
      s: "aabaccc",
      k: 2,
      expected: 4,
      description: "'aabaccc' con k=2 -> 'accc' o 'aaba'",
    },
    {
      s: "abaccc",
      k: 2,
      expected: 4,
      description: "'abaccc' con k=2 -> 'accc'",
    },
    {
      s: "aabacbe",
      k: 2,
      expected: 4,
      description: "'aabacbe' con k=2 -> 'aaba'",
    },
    {
      s: "caabacbe",
      k: 2,
      expected: 4,
      description: "'caabacbe' con k=2 -> 'aaba'",
    },
    {
      s: "abccde",
      k: 2,
      expected: 3,
      description: "'abccde' con k=2 -> 'bcc' o 'ccd'",
    },
    {
      s: "abccddde",
      k: 2,
      expected: 5,
      description: "'abccddde' con k=2 -> 'ccddd'",
    },
    {
      s: "abccdeefgh",
      k: 2,
      expected: 3,
      description: "'abccdeefgh' con k=2 -> 'ccd' o 'dee'",
    },
    {
      s: "caabaa",
      k: 2,
      expected: 5,
      description: "'caabaa' con k=2 -> 'aabaa'",
    },

    // 4. Sensibilidad a Mayúsculas y Caracteres Especiales
    {
      s: "aAaA",
      k: 1,
      expected: 1,
      description:
        "Distingue mayúsculas ('a' != 'A') -> 'aA' o 'Aa' son 2 distintos",
    },
    {
      s: "aA",
      k: 2,
      expected: 2,
      description: "Mayúsculas y minúsculas con k=2",
    },
    {
      s: "a b c a",
      k: 2,
      expected: 3,
      description: "Incluye espacios como caracteres válidos ('a b')",
    },
  ];

  testCases.forEach(({ s, k, expected, description }, index) => {
    const result = lengthOfLongestSubstringKDistinct(s, k);
    if (isEqual(result, expected)) {
      console.log(`✓ [Prueba ${index + 1}] Pasó: ${description}`);
      passed++;
    } else {
      console.error(
        `❌ [Prueba ${index + 1}] Falló: ${description}\n   Entrada: s="${s}", k=${k}\n   Esperado: ${expected} | Obtenido: ${result}`,
      );
      failed++;
    }
  });

  console.log(
    `\n📊 Resumen: ${passed} pasadas, ${failed} fallidas de ${testCases.length} pruebas.`,
  );
}

runTests();
