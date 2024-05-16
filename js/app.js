// Constructores
function Seguro(vehiculo, year, tipo) {
    this.vehiculo = vehiculo;
    this.year = year;
    this.tipo = tipo;
}
function UI() { }

// Prototypes
// Realiza la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function() {
    let precioCotizado
    const precioBase = 20000;
    switch(this.vehiculo) {
        case '1':
            this.vehiculo = 'Moto'
            precioCotizado = precioBase * 1.05;
            break;
        case '2':
            this.vehiculo = 'Auto';
            precioCotizado = precioBase * 1.25;
            break;
        case '3':
            this.vehiculo = 'Camioneta';
            precioCotizado = precioBase * 1.5;
            break;
        default:
            break;
    }

    // Leer el año
    const antiguedad = new Date().getFullYear() - this.year;

    // Cada año hay que reducir 3% el valor del seguro
    precioCotizado -= ((antiguedad * 3) * precioCotizado) / 100;
    // console.log(precioCotizado);
    if(this.tipo === 'basico') {
        precioCotizado *= 1.30;
        // console.log('El precio es', precioCotizado);
    } else {
        precioCotizado *= 1.50;
        // console.log('El precio es',precioCotizado);
    }
    return precioCotizado;
}


// Llena el select con los años
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
            min = max - 20;

    const selectYear = document.querySelector('#year');
    for(let i = max; i >= min; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

// Mostrar alertas en pantalla
UI.prototype.mostrarAlerta = (mensaje, tipo) => {
    // Crea el div, y lo inserta en el HTML. 
    const div = document.createElement('div');

    if(tipo === 'error') {
        div.classList.add('error', 'mt-10');
    } else{
        div.classList.add('correcto', 'mt-10');
    }
    div.classList.add('mensaje')
    div.textContent = mensaje;

    // Insertar en el HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#cargando')); 
    setTimeout(() => {
        div.remove();
    },3000)

}

UI.prototype.mostrarResultado = ( total, seguro) => {
    
    // Crear el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
        <p class="header"> Tu Cotización </p>
        <p class="font-bold"> Vehiculo: <span class="font-normal">${seguro.vehiculo}</span> </p>
        <p class="font-bold"> Año: <span class="font-normal">${seguro.year}</span></p>
        <p class="font-bold"> Tipo: <span class="font-normal capitalize">${seguro.tipo}</span></p>
        <p class="font-bold"> Precio: <span class="font-normal">$ ${total} </span> </p>
    `;
    const resultadoDiv = document.querySelector('#resultado');
    
    // Mostrar spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    // Ocultar spinner y mostrar resultado
    setTimeout(() => {
        spinner.style.display = 'none';
        resultadoDiv.appendChild(div);
    }, 3000)
}


// Instanciar UI
const ui = new UI();
// console.log(ui);

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones();
});

// Eventos
eventListener();
function eventListener() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}


// Funciones
function cotizarSeguro(e) {
    e.preventDefault();
    // console.log('Boton cotizar seguro');

    // Leer el vehiculo seleccionado
    const vehiculo = document.querySelector('#vehiculo').value;
    // console.log(vehiculo);
    // Leer el año seleccionado
    const year = document.querySelector('#year').value;

    // Leer el tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(vehiculo === '' || year === '' || tipo === '') {
        // console.log('Todos los campos son obligatorios');
        ui.mostrarAlerta('Todos los campos son obligatorios', 'error');
        return;
    } 
        ui.mostrarAlerta('Cotizando...', 'correcto');

    // Ocultar las cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if(resultados != null) {
        resultados.remove();
    }
    
    // Intanciar el seguro
    const seguro = new Seguro(vehiculo, year, tipo);
    const total = seguro.cotizarSeguro();
    // console.log(seguro);

    // Cotizar el seguro
    ui.mostrarResultado(total, seguro);
}