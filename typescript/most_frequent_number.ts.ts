/**
 * DESCRIPCIÓN DEL PROBLEMA: NÚMERO MÁS FRECUENTE
 *
 * Dada una lista de números enteros, devuelve el número que más se repite y
 * cuántas veces aparece.
 *
 * Reglas:
 * 1. Si la lista está vacía, debe retornar null.
 * 2. Si hay empate, se acepta el primer número que alcance la mayor frecuencia.
 * 3. La respuesta debe tener la forma { number, total }.
 */

const numbersRepeat = (n: Array<number>): Record<string, number> | null => {
  if (n.length === 0) return null;
  const numbersCount: Map<number, number> = new Map([]);
  let maxTotalRepeat: number = 0;
  let maxNumberRepeat: number = n[0];
  for (let i = 0; i < n.length; i++) {
    const element = n[i];
    let total: number = numbersCount.get(element) ?? 0;

    total++;

    if (total > maxTotalRepeat) {
      maxTotalRepeat = total;
      maxNumberRepeat = element;
    }

    numbersCount.set(element, total);
  }
  return {
    number: maxNumberRepeat,
    total: maxTotalRepeat,
  };
};

function runTests() {
  console.log("Ejecutando pruebas de número más frecuente...\n");

  const isEqual = (a: unknown, b: unknown) =>
    JSON.stringify(a) === JSON.stringify(b);

  const cases: Array<{
    input: number[];
    expected: Record<string, number> | null;
    name: string;
  }> = [
    { input: [], expected: null, name: "lista vacía" },
    { input: [5], expected: { number: 5, total: 1 }, name: "un solo elemento" },
    {
      input: [1, 2, 3, 3, 3, 4, 4],
      expected: { number: 3, total: 3 },
      name: "frecuencia dominante",
    },
    {
      input: [1, 1, 2, 2],
      expected: { number: 1, total: 2 },
      name: "empate por primera frecuencia máxima",
    },
    {
      input: [-1, -1, -1, 2, 2],
      expected: { number: -1, total: 3 },
      name: "números negativos",
    },
  ];

  for (const testCase of cases) {
    const actual = numbersRepeat(testCase.input);
    const passed = isEqual(actual, testCase.expected);
    console.assert(
      passed,
      `Falló: ${testCase.name} debe devolver ${JSON.stringify(testCase.expected)}. Obtenido: ${JSON.stringify(actual)}`,
    );

    if (passed) {
      console.log(`✓ ${testCase.name} pasado`);
    }
  }

  console.log("\nPruebas completadas");
}

runTests();
