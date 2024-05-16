// Constructores
function Seguro(vehiculo, year, tipo) {
    this.vehiculo = vehiculo;
    this.year = year;
    this.tipo = tipo;
}
function UI() { }

// Prototypes
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
    formulario.insertBefore(div, document.querySelector('#resultado')); 
    setTimeout(() => {
        div.remove();
    },3000)

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
    
}