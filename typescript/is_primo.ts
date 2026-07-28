/*
 * DESCRIPCIÓN DEL PROBLEMA: VALIDACIÓN DE NÚMEROS PRIMOS
 *
 * Implementa dos funciones para determinar si un número entero es primo.
 * Una función debe usar una validación directa y la otra una versión optimizada
 * que descarte pares y reduzca iteraciones.
 */

const isPrimoOptimized = (n: number) => {
  if (n === 2) return true;

  if (n % 2 === 0 || n === 1) return false;

  for (let i: number = 3; i < n; i += 2) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
};

const isPrimo = (n: number) => {
  if (n === 2) return true;
  if (n % 2 === 0 || n === 1) return false;

  for (let i: number = n; i > 1; i--) {
    if (i != n && n % i === 0) return false;
  }
  return true;
};

function runTests() {
  console.log("Ejecutando pruebas de números primos...\n");

  const cases: Array<{ input: number; expected: boolean; name: string }> = [
    { input: 0, expected: false, name: "cero" },
    { input: 1, expected: false, name: "uno" },
    { input: 2, expected: true, name: "dos" },
    { input: 3, expected: true, name: "tres" },
    { input: 4, expected: false, name: "compuesto par" },
    { input: 17, expected: true, name: "primo impar" },
    { input: 21, expected: false, name: "compuesto impar" },
    { input: 97, expected: true, name: "primo mayor" },
  ];

  for (const testCase of cases) {
    const normal = isPrimo(testCase.input);
    const optimized = isPrimoOptimized(testCase.input);
    console.assert(
      normal === testCase.expected,
      `Falló: ${testCase.name} normal debe devolver ${testCase.expected}. Obtenido: ${normal}`,
    );
    console.assert(
      optimized === testCase.expected,
      `Falló: ${testCase.name} optimizado debe devolver ${testCase.expected}. Obtenido: ${optimized}`,
    );

    if (normal === testCase.expected && optimized === testCase.expected) {
      console.log(`✓ ${testCase.name} pasado`);
    }
  }

  console.log("\nPruebas completadas");
}

runTests();
