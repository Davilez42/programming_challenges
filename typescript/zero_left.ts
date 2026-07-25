/**
 * ============================================================================
 * DESCRIPCIÓN DEL PROBLEMA: MOVER CEROS (Move Zeroes)
 * ============================================================================
 *
 * Consigna:
 * Escribe una función `moveZeroes(nums: number[]): number[]` que reciba un
 * arreglo de números y mueva todos los `0` al final del arreglo, manteniendo
 * el orden relativo de los demás elementos no nulos.
 *
 * Reglas de construcción:
 * 1. Debes modificar el arreglo (o retornar uno nuevo con los ceros desplazados).
 * 2. El orden de los números distintos de cero DEBE mantenerse igual.
 *
 * Ejemplos:
 * - nums = [0, 1, 0, 3, 12] -> [1, 3, 12, 0, 0] [1,0,3,4,0,0,0,6,4,0,0,9]
 * - nums = [0]             -> [0]
 * - nums = [1, 2, 3]       -> [1, 2, 3]
 *
 * Complejidad esperada:
 * - Tiempo: O(n) — Recorrer el arreglo una sola vez (o un par de pasadas simples).
 * - Espacio: O(1) auxiliar (si modificas in-place) o O(n) si retornas una copia.
 * ============================================================================
 */

// ============================================================================
// 🛠️ TU SOLUCIÓN
// ============================================================================

function moveZeroes(nums: number[]): number[] {
  let j = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      if (j !== i) {
        const temp = nums[j];
        nums[j] = nums[i];
        nums[i] = temp;
      }
      j++;
    }
  }

  return nums;
}

//console.log(moveZeroes([4, 2, 4, 0, 0, 3, 0, 5, 1, 0]));

// ============================================================================
// 🧪 SUITE DE PRUEBAS (Zero Imports / Ejecutable con: npx tsx <nombre_archivo>.ts)
// ============================================================================

function runTests() {
  console.log("⏳ Ejecutando pruebas de Mover Ceros...\n");

  const isEqual = (a: unknown, b: unknown) =>
    JSON.stringify(a) === JSON.stringify(b);

  // 1. Casos Borde y Límites
  console.assert(
    isEqual(moveZeroes([]), []),
    "❌ Falló: Arreglo vacío debe devolver []",
  );
  console.assert(
    isEqual(moveZeroes([0]), [0]),
    "❌ Falló: [0] debe devolver [0]",
  );
  console.assert(
    isEqual(moveZeroes([5]), [5]),
    "❌ Falló: Un solo número no cero [5] debe devolver [5]",
  );
  console.log("✓ Casos borde pasados");

  // 2. Sin Ceros
  console.assert(
    isEqual(moveZeroes([1, 2, 3]), [1, 2, 3]),
    "❌ Falló: Arreglo sin ceros no debe cambiar",
  );
  console.log("✓ Caso sin ceros pasado");

  // 3. Todos Ceros
  console.assert(
    isEqual(moveZeroes([0, 0, 0]), [0, 0, 0]),
    "❌ Falló: Arreglo de solo ceros no debe cambiar",
  );
  console.log("✓ Caso de solo ceros pasado");

  // 4. Casos Estándar
  console.assert(
    isEqual(moveZeroes([0, 1, 0, 3, 12]), [1, 3, 12, 0, 0]),
    "❌ Falló: [0, 1, 0, 3, 12] debe devolver [1, 3, 12, 0, 0]",
  );
  console.assert(
    isEqual(
      moveZeroes([4, 2, 4, 0, 0, 3, 0, 5, 1, 0]),
      [4, 2, 4, 3, 5, 1, 0, 0, 0, 0],
    ),
    "❌ Falló: mezcla con múltiples ceros intermedios incorrecta",
  );
  console.log("✓ Casos estándar pasados");

  console.log("\n✅ ¡Pruebas completadas!");
}

// Ejecutar el runner de pruebas al ejecutar el archivo
runTests();
