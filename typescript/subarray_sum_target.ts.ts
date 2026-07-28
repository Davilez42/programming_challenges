/**
 * DESCRIPCIÓN DEL PROBLEMA: SUBARREGLOS CON SUMA OBJETIVO
 *
 * Dado un arreglo de enteros positivos y un número objetivo, encuentra todos
 * los subarreglos continuos cuya suma sea exactamente igual al objetivo.
 *
 * Reglas:
 * 1. Un subarreglo debe usar elementos consecutivos del arreglo original.
 * 2. Si existen varias respuestas, se deben devolver todas en orden de aparición.
 * 3. Si no existe ninguna coincidencia, se debe retornar null.
 */

const sumSubarray = (n: Array<number>, sumTarget: number) => {
  const subArrays: number[][] = [];

  let left: number = 0;
  let sum: number = 0;

  for (let rigth = 0; rigth < n.length; rigth++) {
    sum += n[rigth];

    while (sum > sumTarget && left <= rigth) {
      sum -= n[left];
      left++;
    }

    if (sum == sumTarget) {
      subArrays.push(n.slice(left, rigth + 1));
    }
  }

  return subArrays.length === 0 ? null : subArrays;
};

function runTests() {
  console.log("Ejecutando pruebas de subarreglos con suma objetivo...\n");

  const isEqual = (a: unknown, b: unknown) =>
    JSON.stringify(a) === JSON.stringify(b);

  const cases: Array<{
    input: number[];
    target: number;
    expected: number[][] | null;
    name: string;
  }> = [
    { input: [1, 3, 2, 5, 7, 2], target: 12, expected: [[5, 7]], name: "caso base" },
    {
      input: [1, 3, 2, 5, 7, 2, 1, 4, 5, 6, 7, 5, 12, 4, 4, 4, 4],
      target: 12,
      expected: [[5, 7], [2, 1, 4, 5], [7, 5], [12], [4, 4, 4], [4, 4, 4]],
      name: "múltiples coincidencias",
    },
    { input: [2, 2, 2], target: 4, expected: [[2, 2], [2, 2]], name: "ventanas repetidas" },
    { input: [1, 2, 3], target: 10, expected: null, name: "sin coincidencias" },
  ];

  for (const testCase of cases) {
    const actual = sumSubarray(testCase.input, testCase.target);
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
