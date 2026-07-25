/**
 * ============================================================================
 * 📄 DESCRIPCIÓN DEL PROBLEMA: DOS SUMAS II - ARREGLO ORDENADO (Two Sum II)
 * ============================================================================
 *
 * Consigna:
 * Dado un arreglo de enteros `numbers` que YA ESTÁ ORDENADO de forma ascendente,
 * encuentra dos números tales que sumen un número objetivo `target` específico.
 *
 * Devuelve un arreglo con los ÍNDICES de esos dos números.
 *
 * Reglas de construcción:
 * 1. El arreglo ya viene ordenado de menor a mayor.
 * 2. Existe exactamente una solución válida por cada prueba.
 * 3. No puedes usar el mismo elemento dos veces.
 *
 * Ejemplos:
 * - numbers = [2, 7, 11, 15], target = 9  -> [0, 1]  (2 + 7 = 9)
 * - numbers = [2, 3, 4],      target = 6  -> [0, 2]  (2 + 4 = 6)
 * - numbers = [-1, 0],        target = -1 -> [0, 1]  (-1 + 0 = -1)
 *
 * Complejidad esperada:
 * - Tiempo: O(n) — Recorrer el arreglo una sola vez con dos punteros opuestos.
 * - Espacio: O(1) auxiliar — Sin mapas o arreglos extra.
 * ============================================================================
 */

// ============================================================================
// 🛠️ TU SOLUCIÓN
// ============================================================================

function twoSum(numbers: number[], target: number): number[] {
  let i = 0;
  let j = numbers.length - 1;

  while (i < j) {
    const sum = numbers[i] + numbers[j];
    if (sum == target) {
      return [i, j];
    }
    if (sum < target) {
      i++;
    } else {
      j--;
    }
  }

  return [];
}

// ============================================================================
// 🧪 SUITE DE PRUEBAS (Zero Imports / Ejecutable con: npx tsx <nombre_archivo>.ts)
// ============================================================================

function runTests() {
  console.log("⏳ Ejecutando pruebas de Two Sum II...\n");

  const isEqual = (a: unknown, b: unknown) =>
    JSON.stringify(a) === JSON.stringify(b);

  // 1. Caso Estándar 1
  console.assert(
    isEqual(twoSum([2, 7, 11, 15], 9), [0, 1]),
    "❌ Falló: [2, 7, 11, 15] con target 9 debe devolver [0, 1]",
  );
  console.log("✓ Caso estándar 1 pasado");

  // 2. Caso Estándar 2
  console.assert(
    isEqual(twoSum([2, 3, 4], 6), [0, 2]),
    "❌ Falló: [2, 3, 4] con target 6 debe devolver [0, 2]",
  );
  console.log("✓ Caso estándar 2 pasado");

  // 3. Con Números Negativos
  console.assert(
    isEqual(twoSum([-1, 0], -1), [0, 1]),
    "❌ Falló: [-1, 0] con target -1 debe devolver [0, 1]",
  );
  console.assert(
    isEqual(twoSum([-5, -3, 1, 2, 4], -4), [0, 2]),
    "❌ Falló: [-5, -3, -1, 2, 4] con target -4 debe devolver [0, 2]",
  );
  console.log("✓ Casos con números negativos pasados");

  // 4. Elementos Duplicados
  console.assert(
    isEqual(twoSum([1, 2, 3, 4, 4, 9], 8), [3, 4]),
    "❌ Falló: elementos duplicados [1, 2, 3, 4, 4, 9] con target 8 debe devolver [3, 4]",
  );
  console.log("✓ Caso de elementos duplicados pasado");

  console.log("\n✅ ¡Pruebas completadas!");
}

// Ejecutar el runner de pruebas al ejecutar el archivo
runTests();
