/**
## Reto 1: El Limpiador de Palíndromos (Principiante)

### Descripción
Escribe una función que determine si una frase es un palíndromo (se lee igual de izquierda a derecha que de derecha a izquierda). El truco principal es que el programa debe "limpiar" el texto antes de evaluarlo.

### Reglas de oro (Requisitos)
1. **Eliminar espacios:** `"a b"` debe convertirse en `"ab"`.
2. **Ignorar mayúsculas:** `"A"` y `"a"` deben tratarse como la misma letra.
3. **Eliminar signos de puntuación y símbolos:** Ignorar `¡ ! , . ¿ ? : ; -` etc.
4. **Normalizar acentos:** Las letras con tilde (`á`, `é`, `í`, `ó`, `ú`) deben convertirse en sus versiones limpias (`a`, `e`, `i`, `o`, `u`).

### Casos de Prueba (Test Cases)

| Entrada | Salida Esperada | ¿Qué está probando este caso? |
| :--- | :--- | :--- |
| `"Anilina"` | `true` | Palabra simple con una mayúscula al inicio. |
| `"La ruta nos aportó otro paso natural."` | `true` | Frase larga con mayúscula, tilde en la ó (`aportó`) y punto final. |
| `"¡Yo dono rosas, oro no doy!"` | `true` | Tiene signos de exclamación, coma y espacios asimétricos. |
| `"¿Acaso hubo búhos acá?"` | `true` | Signos de interrogación y múltiples tildes (`ú`, `á`). |
| `"A man, a plan, a canal: Panama"` | `true` | El palíndromo clásico en inglés. Prueba dos puntos y comas. |
| `"Programación"` | `false` | Una palabra común que no es palíndromo (para asegurar que el código no dé falsos positivos). |

 */

function clearText(text: string): string {
  return text
    .replaceAll(" ", "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll(/[^a-zA-Z0-9]/g, "");
}

function isPalindromo(text: string): boolean {
  const textClean: string = clearText(text);
  for (let i = 0; i < Math.ceil(textClean.length / 2); i++) {
    const leftLetter = textClean.charAt(i);
    const rightLetter = textClean.charAt(textClean.length - i - 1);

    if (leftLetter.toLowerCase() !== rightLetter.toLocaleLowerCase()) {
      return false;
    }
  }

  return true;
}

function runTests() {
  console.log("Ejecutando pruebas de palíndromos...\n");

  const cases: Array<{ input: string; expected: boolean; name: string }> = [
    { input: "Anilina", expected: true, name: "palabra simple" },
    {
      input: "La ruta nos aportó otro paso natural.",
      expected: true,
      name: "frase larga con tilde y punto",
    },
    {
      input: "¡Yo dono rosas, oro no doy!",
      expected: true,
      name: "signos y espacios asimétricos",
    },
    {
      input: "¿Acaso hubo búhos acá?",
      expected: true,
      name: "interrogación y tildes",
    },
    {
      input: "A man, a plan, a canal: Panama",
      expected: true,
      name: "palíndromo clásico con puntuación",
    },
    { input: "Programación", expected: false, name: "no palíndromo" },
  ];

  for (const testCase of cases) {
    const actual = isPalindromo(testCase.input);
    console.assert(
      actual === testCase.expected,
      `Falló: ${testCase.name} debe devolver ${testCase.expected}. Obtenido: ${actual}`,
    );

    if (actual === testCase.expected) {
      console.log(`✓ ${testCase.name} pasado`);
    }
  }

  console.log("\nPruebas completadas");
}

runTests();
