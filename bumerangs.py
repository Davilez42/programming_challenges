""" /*
 * Crea una función que retorne el número total de bumeranes de
 * un array de números enteros e imprima cada uno de ellos.
 * - Un bumerán (búmeran, boomerang) es una secuencia formada por 3 números
 *   seguidos, en el que el primero y el último son iguales, y el segundo
 *   es diferente. Por ejemplo [2, 1, 2].
 * - En el array [2, 1, 2, 3, 3, 4, 2, 4] hay 2 bumeranes ([2, 1, 2]
 *   y [4, 2, 4]).
 * """

def calc_bumerang(array:list)->list:
    boomerangs = []
    for i in range(0,len(array)-2):
        if array[i]==array[i+2]:
            boomerangs.append(array[i:i+3])
            
    return boomerangs
        
print(calc_bumerang([2, 1, 2, 3, 3, 4, 2, 4]))