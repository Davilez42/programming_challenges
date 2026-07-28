/*
 * DESCRIPCIÓN DEL PROBLEMA: NÚMEROS PERDIDOS
 *
 * Dado un arreglo de enteros ordenado y sin repetidos, calcula qué números
 * faltan entre el menor y el mayor valor.
 *
 * Reglas:
 * 1. El arreglo puede estar en orden ascendente o descendente.
 * 2. Si el arreglo no mantiene un único orden, debe lanzar un error.
 * 3. Si contiene valores repetidos, debe lanzar un error.
 */

const calc_lost_solution1 = (array: number[]): Array<number> => {
  const output: number[] = [];
  let asc = false;
  let desc = false;

  for (let i: number = 0; i < array.length; i++) {
    //caluclo si falta su consecutivo
    if (
      i < array.length - 1 &&
      (array[i + 1] !== array[i] + 1 || array[i + 1] !== array[i] - 1)
    ) {
      if (array[i + 1] < array[i]) {
        if (asc) throw new Error("El array debe de ser ascendente");
        desc = true;
        for (let j: number = array[i] - 1; j > array[i + 1]; j--) {
          output.push(j);
        }
        continue;
      }
      asc = true;
      if (desc) throw new Error("El array debe de ser descendente");
      for (let j: number = array[i] + 1; j < array[i + 1]; j++) {
        output.push(j);
      }
    }
    if (array[i + 1] === array[i])
      throw new Error("No pueden haber elementos repetidos");
  }
  return output;
};
7;

const calc_lost_solution2 = (array: number[]): Array<number> => {
  const output: number[] = [];
  const asc = array[0] < array[array.length - 1];

  for (let i: number = 0; i < array.length - 1; i++) {
    if (asc && array[i] < array[i + 1]) {
      continue;
    }
    if (!asc && array[i] > array[i + 1]) {
      continue;
    }
    throw new Error("La entrada es incorrecta");
  }
  //relleno el arreglo con los que faltan
  if (asc) {
    for (let i = array[0]; i <= array[array.length - 1]; i++) {
      if (!array.includes(i)) {
        output.push(i);
      }
    }
  } else {
    for (let i = array[0]; i >= array[array.length - 1]; i--) {
      if (!array.includes(i)) {
        output.push(i);
      }
    }
  }

  return output;
};

function runTests() {
  console.log("Ejecutando pruebas de números perdidos...\n");

  const isEqual = (a: unknown, b: unknown) =>
    JSON.stringify(a) === JSON.stringify(b);

  const cases: Array<{ input: number[]; expected: number[]; name: string }> = [
    { input: [1, 2, 4, 6], expected: [3, 5], name: "ascendente con huecos" },
    { input: [6, 4, 2, 1], expected: [5, 3], name: "descendente con huecos" },
    { input: [3, 4, 5], expected: [], name: "sin números faltantes" },
    { input: [-2, 1], expected: [-1, 0], name: "incluye negativos" },
  ];

  for (const testCase of cases) {
    const actual1 = calc_lost_solution1(testCase.input);
    const actual2 = calc_lost_solution2(testCase.input);
    const solution1Ok = isEqual(actual1, testCase.expected);
    const solution2Ok = isEqual(actual2, testCase.expected);

    console.assert(
      solution1Ok,
      `Falló: ${testCase.name} solution1 debe devolver ${JSON.stringify(testCase.expected)}. Obtenido: ${JSON.stringify(actual1)}`,
    );
    console.assert(
      solution2Ok,
      `Falló: ${testCase.name} solution2 debe devolver ${JSON.stringify(testCase.expected)}. Obtenido: ${JSON.stringify(actual2)}`,
    );

    if (solution1Ok && solution2Ok) {
      console.log(`✓ ${testCase.name} pasado`);
    }
  }

  const invalidCases = [
    { input: [1, 3, 2], name: "orden mezclado" },
    { input: [1, 2, 2, 3], name: "valores repetidos" },
  ];

  for (const testCase of invalidCases) {
    let failedAsExpected = false;
    try {
      calc_lost_solution2(testCase.input);
    } catch {
      failedAsExpected = true;
    }

    console.assert(
      failedAsExpected,
      `Falló: ${testCase.name} debe lanzar un error de validación`,
    );
    if (failedAsExpected) {
      console.log(`✓ ${testCase.name} pasado`);
    }
  }

  console.log("\nPruebas completadas");
}

runTests();
