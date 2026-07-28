/**
 * ## Reto 2: El Cifrador César Dinámico (Intermedio)
 *
 * ### Descripción
 * Encripta un texto desplazando cada letra N posiciones en el abecedario.
 *
 * ### Reglas de oro (Requisitos)
 * 1. Mantener mayúsculas y minúsculas en su lugar.
 * 2. Ignorar y mantener igual caracteres especiales (espacios, números, comas, etc.).
 * 3. Soportar desbordamientos usando módulo (desplazamiento > 26).
 * 4. (Opcional) Soportar desplazamientos negativos.
 *
 * ### Casos de Prueba (Test Cases)
 * - ("abc", 1) -> "bcd"
 * - ("xyz", 3) -> "abc"
 * - ("¡Hola, 123!", 5) -> "¡Mtqa, 123!"
 * - ("Prueba", 28) -> "Rtwgdc" (28 % 26 = 2 posiciones)
 * - ("Python", -3) -> "Mv qelk"
 */

const stringDicc =
  "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyzÁÉÍÓÚÜáéíóúü .,;:_!¡?¿()[]{}/\\@#$%" +
  '"' +
  "'*+=<>";

function ceaserCipher(tex: string, key: number): string {
  let cipherText: string = "";

  for (const caracter of tex) {
    const valueCharacterFound = stringDicc.indexOf(caracter);

    if (valueCharacterFound < 0) {
      cipherText += caracter;
      continue;
    }
    const diccSize = stringDicc.length - 1;

    const c = (valueCharacterFound + key) % diccSize;

    cipherText += stringDicc[c];
  }

  return cipherText;
}

function decipher(text: string, key: number) {
  let decipherText: string = "";

  for (const caracter of text) {
    const valueCharacterFound = stringDicc.indexOf(caracter);

    if (valueCharacterFound < 0) {
      decipherText += caracter;
      continue;
    }
    const diccSize = stringDicc.length - 1;

    const m = (valueCharacterFound - (key % diccSize) + diccSize) % diccSize;

    decipherText += stringDicc[m];
  }

  return decipherText;
}
function runTests() {
  console.log("Ejecutando pruebas de cifrado César...\n");

  const cases: Array<{ input: string; key: number; expected: string; name: string }> = [
    { input: "abc", key: 1, expected: "bcd", name: "desplazamiento básico" },
    { input: "ABC", key: 1, expected: "BCD", name: "mantiene mayúsculas" },
    { input: "xyz", key: 3, expected: "abc", name: "desbordamiento del alfabeto" },
    { input: "Hola", key: 5, expected: "Mtqf", name: "palabra con mayúscula inicial" },
  ];

  for (const testCase of cases) {
    const actual = ceaserCipher(testCase.input, testCase.key);
    console.assert(
      actual === testCase.expected,
      `Falló: ${testCase.name} debe devolver "${testCase.expected}". Obtenido: "${actual}"`,
    );

    const decoded = decipher(actual, testCase.key);
    console.assert(
      decoded === testCase.input,
      `Falló: ${testCase.name} descifrado debe devolver "${testCase.input}". Obtenido: "${decoded}"`,
    );

    if (actual === testCase.expected && decoded === testCase.input) {
      console.log(`✓ ${testCase.name} pasado`);
    }
  }

  console.log("\nPruebas completadas");
}

runTests();
