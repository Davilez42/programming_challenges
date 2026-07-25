/**
 * 📄 Enunciado
Dada una cadena de caracteres, encuentra la subcadena más larga que no contenga ningún carácter repetido.

📥 Entrada
Una cadena de longitud n, por ejemplo:
"abrkaabcdefghijjxxx"

📤 Salida esperada
La subcadena más larga sin caracteres repetidos.

En el ejemplo: "abcdefghij" (longitud 10).
**/

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

console.log(longestUniqueSubstr("abrkaabcdefghijjxxx")); //abcdefghij
console.log(longestUniqueSubstr("12312345abcabc")); // "12345abc"
console.log(longestUniqueSubstr("aaaaa")); // "a"
console.log(longestUniqueSubstr("")); // ""
console.log(longestUniqueSubstr("abcdef")); // "abcdef"
console.log(longestUniqueSubstr("abcabcbb")); // "abc"
console.log(longestUniqueSubstr("pwwkew")); // "wke"  (or "kew")
console.log(longestUniqueSubstr("abrkaabcdefghijjxxx")); // "abcdefghij"
console.log(longestUniqueSubstr("a!b@c#a!")); // "!b@c#"
