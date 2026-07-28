/*
 * DESCRIPCIÓN DEL PROBLEMA: SIMULACIÓN CLIMÁTICA
 *
 * Crea una función que simule las condiciones climáticas (temperatura y probabilidad de lluvia)
 * de un lugar ficticio al pasar un número concreto de días según estas reglas:
 * - La temperatura inicial y el % de probabilidad de lluvia lo define el usuario.
 * - Cada día que pasa:
 *   - 10% de posibilidades de que la temperatura aumente o disminuya 2 grados.
 *   - Si la temperatura supera los 25 grados, la probabilidad de lluvia al día
 *     siguiente aumenta en un 20%.
 *   - Si la temperatura baja de 5 grados, la probabilidad de lluvia al día
 *     siguiente disminuya en un 20%.
 *   - Si llueve (100%), la temperatura del día siguiente disminuye en 1 grado.
 * - La función recibe el número de días de la predicción y muestra la temperatura
 *   y si llueve durante todos esos días.
 * - También mostrará la temperatura máxima y mínima de ese periodo y cuántos días va a llover.
 */

function climateSimulation(
  days: number,
  initTemperature: number,
  initProbabilityToRain: number
): Record<string, unknown> {
  let currentProbabilityToRain: number = initProbabilityToRain;
  let currentTemperature: number = initTemperature;
  let maxTemperature: number = -Infinity;
  let minTemperature: number = Infinity;
  let daysRain: number = 0;

  for (let i = 0; i < days; i++) {
    //aumente o dismunuya la temperatura
    if (Math.random() < 0.1) {
      currentTemperature += Math.random() < 0.5 ? 2 : -2;
    }

    //calcula la probalidad de lluvia del dia siguiente de la temperatura calculada
    if (currentTemperature > 25) {
      currentProbabilityToRain +=
        currentProbabilityToRain + 20 <= 100
          ? 20
          : 100 - currentProbabilityToRain;
    }
    if (currentTemperature < 5) {
      currentProbabilityToRain -=
        currentProbabilityToRain - 20 >= 0 ? 20 : currentProbabilityToRain;
    }
    console.log(
      currentTemperature,
      currentProbabilityToRain,
      Math.random() * 100
    );
    if (Math.random() * 100 <= currentProbabilityToRain) {
      currentTemperature -= 1;
      daysRain += 1;
    }

    //Maximos y minimos
    if (currentTemperature >= maxTemperature) {
      maxTemperature = currentTemperature;
    }
    if (currentTemperature <= minTemperature) {
      minTemperature = currentTemperature;
    }
  }

  return {
    days,
    daysRain,
    maxTemperature,
    minTemperature,
    currentTemperature,
  };
}

function createRandomSequence(values: number[]): () => number {
  let index = 0;
  return () => {
    const value = values[index];
    index++;
    if (value === undefined) {
      return 0.5;
    }
    return value;
  };
}

function runWithMockedRandom<T>(values: number[], callback: () => T): T {
  const originalRandom = Math.random;
  const originalLog = console.log;
  Math.random = createRandomSequence(values);
  console.log = () => undefined;

  try {
    return callback();
  } finally {
    Math.random = originalRandom;
    console.log = originalLog;
  }
}

function runTests() {
  console.log("Ejecutando pruebas de simulación climática...\n");

  const isEqual = (a: unknown, b: unknown) =>
    JSON.stringify(a) === JSON.stringify(b);

  const noRain = runWithMockedRandom(
    [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
    () => climateSimulation(3, 20, 0),
  );
  const noRainExpected = {
    days: 3,
    daysRain: 0,
    maxTemperature: 20,
    minTemperature: 20,
    currentTemperature: 20,
  };

  const noRainOk = isEqual(noRain, noRainExpected);
  console.assert(
    noRainOk,
    `Falló: sin lluvia debe devolver ${JSON.stringify(noRainExpected)}. Obtenido: ${JSON.stringify(noRain)}`,
  );
  if (noRainOk) {
    console.log("✓ Sin lluvia pasado");
  }

  const alwaysRain = runWithMockedRandom(
    [0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
    () => climateSimulation(2, 30, 100),
  );
  const alwaysRainExpected = {
    days: 2,
    daysRain: 2,
    maxTemperature: 29,
    minTemperature: 28,
    currentTemperature: 28,
  };

  const alwaysRainOk = isEqual(alwaysRain, alwaysRainExpected);
  console.assert(
    alwaysRainOk,
    `Falló: lluvia constante debe devolver ${JSON.stringify(alwaysRainExpected)}. Obtenido: ${JSON.stringify(alwaysRain)}`,
  );
  if (alwaysRainOk) {
    console.log("✓ Lluvia constante pasado");
  }

  const temperatureChange = runWithMockedRandom(
    [0.05, 0.25, 0.9, 0.9],
    () => climateSimulation(1, 10, 0),
  );
  const temperatureChangeExpected = {
    days: 1,
    daysRain: 0,
    maxTemperature: 12,
    minTemperature: 12,
    currentTemperature: 12,
  };

  const temperatureChangeOk = isEqual(temperatureChange, temperatureChangeExpected);
  console.assert(
    temperatureChangeOk,
    `Falló: cambio de temperatura debe devolver ${JSON.stringify(temperatureChangeExpected)}. Obtenido: ${JSON.stringify(temperatureChange)}`,
  );
  if (temperatureChangeOk) {
    console.log("✓ Cambio de temperatura pasado");
  }

  console.log("\nPruebas completadas");
}

runTests();
