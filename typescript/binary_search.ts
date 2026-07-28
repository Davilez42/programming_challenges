/*
 * DESCRIPCIÓN DEL PROBLEMA: BÚSQUEDA BINARIA
 *
 * Dado un arreglo ordenado de números y un elemento objetivo, determina si el
 * elemento existe en el arreglo.
 *
 * Reglas:
 * 1. El arreglo de entrada debe estar ordenado de forma ascendente.
 * 2. La función debe retornar true si el elemento existe y false si no existe.
 * 3. Se comparan tres enfoques: búsqueda binaria iterativa, búsqueda lineal y
 *    búsqueda binaria recursiva.
 */

const binarySearch = (list: number[], element: number): boolean => {
  let i = 0;
  let j = list.length - 1;
  let iterations = 0;
  while (true) {
    let index_mid = i + Math.ceil((j - i) / 2);
    if (list[index_mid] === element) {
      return true;
    }
    if (i === j || list.length === 0) {
      return false;
    }
    if (element > list[index_mid]) {
      i = index_mid + 1;
    } else {
      j = index_mid - 1;
    }
    iterations++;
  }
};

const binarySearchLineal = (list: number[], element: number): Boolean => {
  for (const i of list) {
    if (i === element) {
      return true;
    }
  }
  return false;
};

const binarySearchRecursive = (
  list: number[],
  element: number,
  i: number,
  j: number
): boolean => {
  const index_mid = i + Math.ceil((j - i) / 2);
  const element_mid = list[index_mid];
  if (element_mid === element) {
    return true;
  }
  if (i === j || list.length === 0) {
    //if the i is equal to j then return false, because means that length array is 1
    return false;
  }
  //calculate the i,j to array partition
  if (element < element_mid) {
    return binarySearchRecursive(list, element, i, j - 1);
  } else {
    return binarySearchRecursive(list, element, i + 1, j);
  }
};

function runTests() {
  console.log("Ejecutando pruebas de búsqueda binaria...\n");

  const cases: Array<{ list: number[]; element: number; expected: boolean; name: string }> = [
    { list: [1], element: 1, expected: true, name: "un elemento encontrado" },
    { list: [1], element: 2, expected: false, name: "un elemento no encontrado" },
    { list: [1, 2, 3, 4, 5], element: 1, expected: true, name: "primer elemento" },
    { list: [1, 2, 3, 4, 5], element: 5, expected: true, name: "último elemento" },
    { list: [1, 2, 3, 4, 5], element: 3, expected: true, name: "elemento central" },
    { list: [-10, -3, 0, 8, 11], element: -3, expected: true, name: "números negativos" },
  ];

  for (const testCase of cases) {
    const iterative = binarySearch(testCase.list, testCase.element);
    const lineal = binarySearchLineal(testCase.list, testCase.element);
    const recursive = binarySearchRecursive(
      testCase.list,
      testCase.element,
      0,
      testCase.list.length - 1,
    );

    console.assert(
      iterative === testCase.expected,
      `Falló: ${testCase.name} iterativa debe devolver ${testCase.expected}. Obtenido: ${iterative}`,
    );
    console.assert(
      lineal === testCase.expected,
      `Falló: ${testCase.name} lineal debe devolver ${testCase.expected}. Obtenido: ${lineal}`,
    );
    console.assert(
      recursive === testCase.expected,
      `Falló: ${testCase.name} recursiva debe devolver ${testCase.expected}. Obtenido: ${recursive}`,
    );

    if (
      iterative === testCase.expected &&
      lineal === testCase.expected &&
      recursive === testCase.expected
    ) {
      console.log(`✓ ${testCase.name} pasado`);
    }
  }

  console.log("\nPruebas completadas");
}

runTests();
