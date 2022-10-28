function comprarProductos() {
    let producto = '';
    let precio = 0;
    let cantidad = 0;
    let totalCompra = 0;
    let cantidadTotal = 0;
    let seguirComprando = false;

    do {
        producto = prompt('¿Quieres comprar una bicicleta, un neopreno, unas zapatillas o todo?', 'Ej: todo');
        cantidad = parseInt(prompt('¿Cuántas unidades quieres comprar?'));

        let cantidadValidada = validarCantidad(cantidad);

        switch (producto) {
            case 'bicicleta':
                precio = 6500;
                break;
            case 'neopreno':
                precio = 350;
                break;
            case 'zapatillas':
                precio = 145;
                break;
                case 'todo':
                precio = 6995;
                break;
            default:
                alert('Alguno de los datos ingresados no son correctos.');
                precio = 0;
                cantidad = 0;
                break;
        }

        totalCompra += precio * cantidadValidada;
        seguirComprando = confirm('¿Quieres agregar otro producto?');

    } while (seguirComprando)

    const totalConDescuento = aplicarDescuento(totalCompra);
    const totalConEnvio = calcularEnvio(totalConDescuento);

    return totalConEnvio;
}

function validarCantidad(cantidad) {
    while(Number.isNaN(cantidad) || cantidad === 0) {
        if (cantidad !== 0) {
            alert('Debe agregar un número.')
        } else {
            alert('Debe ingresar un número diferente a cero.')
        }
        cantidad = parseInt(prompt('¿Cuantos quieres comprar?'));
    }

    return cantidad;
}

function aplicarDescuento(totalCompra) {
    let totalConDescuento = 0;

    if (totalCompra >= 5000) {
        totalConDescuento = totalCompra * 0.9;
        return totalConDescuento;
    } else {
        return totalCompra;
    }
}

function calcularEnvio(totalCompra) {
    let tieneEnvioADomicilio = false;

    tieneEnvioADomicilio = confirm('¿Quiere envio a domicilio?');

    if (tieneEnvioADomicilio && totalCompra >= 2000) {
        alert('El envio para esta compra es gratuito. El total de la compra es: '+totalCompra);
    } else if (tieneEnvioADomicilio && totalCompra < 2000 && totalCompra !== 0) {
        totalCompra += 700;
        alert('El envío cuesta 45€. El total de la compra es: '+totalCompra);
    } else {
        alert('El total de la compra es: '+totalCompra);
    }

    return totalCompra;
}

function calcularCantidadDeCuotas() {
    let cuotas = 0;
    let tieneCuotas = false;

    tieneCuotas = confirm('¿Quieres pagar en cuotas?');

    if (tieneCuotas) {
        cuotas = parseInt(prompt('¿En cuántas cuotas quieres pagar?'));
        if (cuotas === 0) {
            cuotas = 1;
        } else if (Number.isNaN(cuotas)) {
            calcularCantidadDeCuotas();
        }
    } else {
        cuotas = 1;
    }

    return cuotas;
}

function calcularIntereses(cuotas) {
    let tasa = 6.7;
    let sinIntereses = 0;
    let tasaTotal = 0;
    let interesesTotales = 0;

    if (cuotas === 1) {
        return sinIntereses;
    } else {
        tasaTotal = tasa + cuotas * 0.2;
        interesesTotales = tasaTotal * cuotas;
        return interesesTotales;
    }
}

function calcularTotalAPagar(totalCompra, cuotas, intereses) {
    totalCompra = totalCompra + intereses;
    let valorCuota = totalCompra / cuotas;
    alert('El total a pagar es: '+totalCompra+'€ en '+cuotas+' cuotas de '+valorCuota+'€');
}

const totalCompra = comprarProductos();
const cuotas = calcularCantidadDeCuotas();
const intereses = calcularIntereses(cuotas);

calcularTotalAPagar(totalCompra, cuotas, intereses);

