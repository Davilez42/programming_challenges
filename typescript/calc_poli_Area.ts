/*
 * DESCRIPCIÓN DEL PROBLEMA: ÁREA DE POLÍGONOS
 *
 * Crea una única función (importante que sólo sea una) que sea capaz
 * de calcular y retornar el área de un polígono.
 * - La función recibirá por parámetro sólo UN polígono a la vez.
 * - Los polígonos soportados serán Triángulo, Cuadrado y Rectángulo.
 * - Imprime el cálculo del área de un polígono de cada tipo.
 */

interface Shape {
  calcArea: () => number;
}

class Triangle implements Shape {
  constructor(readonly base: number, readonly h: number) {}

  calcArea(): number {
    return (this.base * this.h) / 2;
  }
}

class Square implements Shape {
  constructor(readonly base: number) {}

  calcArea(): number {
    return this.base * this.base;
  }
}

class Rectángule implements Shape {
  constructor(readonly base: number, readonly h: number) {}

  calcArea(): number {
    return this.base * this.h;
  }
}

function calcAreaShape(shape: Shape) {
  return shape.calcArea();
}

function runTests() {
  console.log("Ejecutando pruebas de área de polígonos...\n");

  const cases: Array<{ shape: Shape; expected: number; name: string }> = [
    { shape: new Triangle(3, 4), expected: 6, name: "triángulo" },
    { shape: new Square(5), expected: 25, name: "cuadrado" },
    { shape: new Rectángule(3, 9), expected: 27, name: "rectángulo" },
  ];

  for (const testCase of cases) {
    const actual = calcAreaShape(testCase.shape);
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
