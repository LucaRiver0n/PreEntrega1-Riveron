// Variables
  let numbers = [];
  let total = 0;

  // Solicitar números al usuario
  let cantidadNumeros = parseInt(prompt("¿Cuántos números deseas ingresar?"))

  for (let i = 0; i < cantidadNumeros; i++) {
    let numero = parseFloat(prompt(`Ingrese el número ${i + 1}:`))
    numbers.push(numero);
  }

  function sumarNumeros(arr) {
    return arr.reduce((acc, curr) => acc + curr, 0)
  }

  function encontrarMayor(arr) {
    return Math.max(...arr)
  }

  function filtrarPares(arr) {
    return arr.filter(num => num % 2 === 0)
  }

  total = sumarNumeros(numbers)
  let mayorNumero = encontrarMayor(numbers)
  let numerosPares = filtrarPares(numbers)

  document.write(`<p>Los números ingresados son: ${numbers.join(', ')}</p>`)
  document.write(`<p>La suma de los números es: ${total}</p>`)
  document.write(`<p>El mayor número es: ${mayorNumero}</p>`)
  document.write(`<p>Los números pares son: ${numerosPares.join(', ')}</p>`)






