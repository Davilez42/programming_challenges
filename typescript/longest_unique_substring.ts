/**
 * DESCRIPCIÓN DEL PROBLEMA: SUBCADENA MÁS LARGA SIN CARACTERES REPETIDOS
 *
 * Dada una cadena de texto, encuentra la subcadena continua más larga que no
 * contenga caracteres repetidos.
 *
 * Reglas:
 * 1. La búsqueda debe respetar el orden original de la cadena.
 * 2. Si hay varias respuestas con la misma longitud, se acepta la primera que
 *    aparezca durante el recorrido.
 * 3. Una cadena vacía debe devolver una cadena vacía.
 *
 * Ejemplo:
 * - "abrkaabcdefghijjxxx" -> "abcdefghij"
 */

const longestUniqueSubstr = (n: string) => {
  let map: Record<string, number> = {};
  let left = 0;
  let rigth = 0;
  let maxSubString: string = "";

  for (let i = 0; i < n.length; i++) {
    const character: string = n.at(i) as string;
    const characterInMap = map[character];

    if (
      characterInMap !== undefined &&
      characterInMap >= left &&
      characterInMap <= rigth
    ) {
      left = map[character] + 1;
    }
    const subString: string = n.substring(left, rigth + 1);
    if (subString.length > maxSubString.length) {
      maxSubString = subString;
    }
    map[character] = i;
    rigth += 1;
  }

  return maxSubString;
};

function runTests() {
  console.log("Ejecutando pruebas de subcadena más larga sin repetidos...\n");

  const cases: Array<{ input: string; expected: string; name: string }> = [
    { input: "", expected: "", name: "cadena vacía" },
    { input: "aaaaa", expected: "a", name: "todos los caracteres repetidos" },
    { input: "abcdef", expected: "abcdef", name: "sin caracteres repetidos" },
    { input: "abcabcbb", expected: "abc", name: "repetición al final de ventana" },
    { input: "pwwkew", expected: "wke", name: "ventana se desplaza por duplicado interno" },
    {
      input: "abrkaabcdefghijjxxx",
      expected: "abcdefghij",
      name: "caso largo con reinicio de ventana",
    },
    { input: "a!b@c#a!", expected: "a!b@c#", name: "caracteres especiales" },
  ];

  let passed = 0;

  for (const testCase of cases) {
    const actual = longestUniqueSubstr(testCase.input);
    console.assert(
      actual === testCase.expected,
      `Falló: ${testCase.name} debe devolver "${testCase.expected}". Obtenido: "${actual}"`,
    );

    if (actual === testCase.expected) {
      console.log(`✓ ${testCase.name} pasado`);
    }
    passed++;
  }

  console.log(`\nPruebas completadas: ${passed}/${cases.length} ejecutadas`);
}

runTests();
