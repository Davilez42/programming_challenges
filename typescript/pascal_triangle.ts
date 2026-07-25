/**
 * ============================================================================
 * DESCRIPCIÓN DEL PROBLEMA: TRIÁNGULO DE PASCAL
 * ============================================================================
 *
 * Consigna:
 * Escribe una función `generatePascal(numRows: number): number[][]` que reciba
 * un entero no negativo `numRows` y devuelva las primeras `numRows` filas del
 * Triángulo de Pascal.
 *
 * Reglas de construcción:
 * 1. La primera fila (índice 0) es siempre [1].
 * 2. Todas las filas comienzan y terminan con el número 1.
 * 3. Cada elemento central en [i][j] se calcula sumando los dos elementos
 *    directamente superiores de la fila anterior:
 *    Fila[i][j] = Fila[i-1][j-1] + Fila[i-1][j]
 *
 * Ejemplos:
 * - numRows = 0 -> []
 * - numRows = 1 -> [[1]]
 * - numRows = 5 -> [
 *  [1],
 *  [1, 1],
 *  [1, 2, 1],
 *  [1, 3, 3, 1],
 *  [1, 4, 6, 4, 1]
 * ]
 *
 * Complejidad esperada:
 * - Tiempo: O(numRows^2)
 * - Espacio: O(numRows^2)
 * ============================================================================
 */

// ============================================================================
//  SUITE DE PRUEBAS
// ============================================================================

function generatePascal(n: number): number[][] {
  if (n < 0) {
    throw new Error("input is incorrect, values negatives are not valid.");
  }
  if (n === 0) {
    return [];
  }

  const rows: number[][] = [[1]];

  for (let i = 1; i < n; i++) {
    const lastRow: number[] = rows[rows.length - 1];
    const row: number[] = [1];
    for (let j = 1; j < i; j++) {
      row.push(lastRow[j - 1] + lastRow[j]);
    }
    row.push(1);
    rows.push(row);
  }

  return rows;
}

function runTests() {
  console.log("⏳ Ejecutando pruebas del Triángulo de Pascal...\n");

  const isEqual = (a: unknown, b: unknown) =>
    JSON.stringify(a) === JSON.stringify(b);

  // 1. Casos Borde y Límites
  console.assert(
    isEqual(generatePascal(0), []),
    "❌ Falló: numRows = 0 debe devolver []",
  );
  console.assert(
    isEqual(generatePascal(1), [[1]]),
    "❌ Falló: numRows = 1 debe devolver [[1]]",
  );
  console.assert(
    isEqual(generatePascal(2), [[1], [1, 1]]),
    "❌ Falló: numRows = 2 debe devolver [[1], [1, 1]]",
  );
  console.log("✓ Casos borde pasados");

  // 2. Caso Estándar
  const expected5 = [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]];
  console.assert(
    isEqual(generatePascal(5), expected5),
    "❌ Falló: numRows = 5 incorrecto",
  );
  console.log("✓ Caso estándar (5 filas) pasado");

  // 3. Invariantes Matemáticos
  const result10 = generatePascal(10);

  result10.forEach((row, index) => {
    // La fila 'i' debe tener i + 1 elementos
    console.assert(
      row.length === index + 1,
      `❌ Falló: Fila ${index} no tiene longitud ${index + 1}`,
    );

    // Cada fila debe ser simétrica (palíndromo)
    console.assert(
      isEqual(row, [...row].reverse()),
      `❌ Falló: Fila ${index} no es simétrica`,
    );

    // La suma de los elementos de la fila 'n' debe ser 2^n
    const sum = row.reduce((acc, curr) => acc + curr, 0);
    console.assert(
      sum === Math.pow(2, index),
      `❌ Falló: Suma de la fila ${index} debe ser ${Math.pow(2, index)}`,
    );
  });
  console.log(
    "✓ Invariantes matemáticos (tamaño, simetría y suma 2^n) pasados",
  );

  console.log("\n✅ ¡Pruebas completadas!");
}

// Ejecutar el runner de pruebas al ejecutar el archivo
runTests();
