function dividir(cuotas, meses){
    return cuotas / meses;
}

let cuotas = 1;
let meses = 0;
let resultado = parseInt(0);

// PREGUNTAR SOBRE CUANTO DINERO VA A SOLICITAR ----------
do {
    let inputCuotas = prompt("Ingrese el monto a solicitar (en USD)");
    
    if (inputCuotas === null) {
        continue; 
    }

    cuotas = parseInt(inputCuotas);

    if (isNaN(cuotas) || cuotas < 0) {
        alert("Por favor, ingrese un monto válido mayor o igual a 0.");
    } else if (cuotas < 1000) {
        alert("El monto mínimo a solicitar es 1.000 USD");
    } else if (cuotas > 100000) {
        alert("El monto máximo a solicitar es 100.000 USD");
    } else {
        break; // Sale del bucle si el monto es válido
    }
} while (true);

// PREGUNTAR SOBRE CUANTOS MESES VA A PAGAR ---------------
do {
    let inputMeses = prompt("Ingrese el número de meses en los que pagará el préstamo");

    if (inputMeses === null) {
        continue; 
    }

    meses = parseInt(inputMeses);

    if (isNaN(meses) || meses < 0) {
        alert("Por favor, ingrese un número de meses válido mayor o igual a 0.");
    } else if (meses < 3) {
        alert("El número mínimo de meses es 3.");
    } else if (meses > 69) {
        alert("El número máximo de meses es 69.");
    } else {
        break; 
    }
} while (true);


resultado = dividir(cuotas, meses);
resultado = Math.floor(resultado);

alert("Solicitando " + cuotas + " a " + meses + " meses, tendrás que pagar mensualmente " + resultado + " USD");