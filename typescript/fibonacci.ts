/*
 * DESCRIPCIÓN DEL PROBLEMA: SERIE DE FIBONACCI
 *
 * Escribe un programa que imprima los 50 primeros números de la sucesión
 * de Fibonacci empezando en 0.
 * - La serie Fibonacci se compone por una sucesión de números en
 *   la que el siguiente siempre es la suma de los dos anteriores.
 *   0, 1, 1, 2, 3, 5, 8, 13...
 */

function calcFibonacci(n: number): void {
  let a = 0;
  let b = 1;
  for (let i = 0; i < n; i++) {
    const k = a + b;
    console.log(a);
    a = b;
    b = k;
  }
}
const memory: Map<number, number> = new Map();
function calcFibonacciRecursive(n: number): number {
  if (memory.has(n)) {
    return memory.get(n) as number;
  }

  if (n === 0 || n === 1) return n;

  // calcula el fibonacci
  const result: number =
    calcFibonacciRecursive(n - 1) + calcFibonacciRecursive(n - 2);

  // guardo en memoria el fibonacci ya calculado
  memory.set(n, result);

  return result;
}
function generateFibonacciSerie(n: number): void {
  for (let i = 0; i < n; i++) {
    console.log(calcFibonacciRecursive(i));
  }
}

function captureOutput(callback: () => void): string[] {
  const originalLog = console.log;
  const output: string[] = [];
  console.log = (value?: unknown) => {
    output.push(String(value));
  };

  try {
    callback();
  } finally {
    console.log = originalLog;
  }

  return output;
}

function runTests() {
  console.log("Ejecutando pruebas de Fibonacci...\n");

  const expectedFirstTen = ["0", "1", "1", "2", "3", "5", "8", "13", "21", "34"];
  const loopOutput = captureOutput(() => calcFibonacci(10));
  const recursiveOutput = captureOutput(() => generateFibonacciSerie(10));

  const isEqual = (a: unknown, b: unknown) =>
    JSON.stringify(a) === JSON.stringify(b);

  console.assert(
    isEqual(loopOutput, expectedFirstTen),
    `Falló: serie iterativa debe devolver ${JSON.stringify(expectedFirstTen)}. Obtenido: ${JSON.stringify(loopOutput)}`,
  );
  if (isEqual(loopOutput, expectedFirstTen)) {
    console.log("✓ Serie iterativa pasada");
  }

  console.assert(
    isEqual(recursiveOutput, expectedFirstTen),
    `Falló: serie recursiva debe devolver ${JSON.stringify(expectedFirstTen)}. Obtenido: ${JSON.stringify(recursiveOutput)}`,
  );
  if (isEqual(recursiveOutput, expectedFirstTen)) {
    console.log("✓ Serie recursiva pasada");
  }

  const fibonacci20 = calcFibonacciRecursive(20);
  console.assert(
    fibonacci20 === 6765,
    `Falló: fibonacci(20) debe devolver 6765. Obtenido: ${fibonacci20}`,
  );
  if (fibonacci20 === 6765) {
    console.log("✓ Fibonacci(20) pasado");
  }

  console.log("\nPruebas completadas");
}

runTests();
