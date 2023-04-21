//variables
const resultado = document.querySelector('#resultado');
const year = document.querySelector('#year');
const max = new Date().getFullYear();
const min = max - 10;
const marca = document.querySelector('#marca');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const color = document.querySelector('#color');
const transmision = document.querySelector('#transmision');

let datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    color: '',
    transmision:'',
}

//eventos

document.addEventListener("DOMContentLoaded", () => {
    mostrarAutos(autos);
    llenarSelectYear();
});

marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});

year.addEventListener('change', e => {
    datosBusqueda.year = e.target.value;
    filtrarAuto();
});

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
});

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
});

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = e.target.value;
    filtrarAuto();
});

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();
});

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});

//funciones
function mostrarAutos(autos) {
    limpiarHTML();
    autos.forEach(auto => {
        const {marca, modelo, year, puertas, transmision, precio, color, foto} = auto;
        // const autoHTML =  document.createElement('p');
        const autoHTML = document.createElement('div');
        autoHTML.classList.add('auto');
        autoHTML.innerHTML = `
        <p>${marca} - Año: ${year} - Puertas: ${puertas} - transmision: ${transmision} 
        - Precio: ${precio} - Color: ${color} - Modelo: ${modelo}</p> <img src="${foto}">
        `;
        resultado.appendChild(autoHTML);
    })
}

function llenarSelectYear(){
    for(let i = max; i >= min; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}

function filtrarAuto(){
    const resultado = autos.filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarColor)
    .filter(filtrarTransmision);
    
    if(resultado.length){
        mostrarAutos(resultado);
        localStorage.setItem('autos', JSON.stringify(resultado));
    }
    else{
        noHayResultado();
        localStorage.setItem('autos', null);
    }
    
}

function noHayResultado(){
    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados de busqueda';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto){
    const {marca} = datosBusqueda;
    if(marca){
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto){
    const {year} = datosBusqueda;
    if(year){
        return auto.year === parseInt(year);
    }
    return auto;
}

function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;
    if(minimo){
        return auto.precio >= parseInt(minimo);
    }
    return auto;
}

function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;
    if(maximo){
        return auto.precio <= parseInt(maximo);
    }
    return auto;
}

function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;
    if(puertas){
        return auto.puertas === parseInt(puertas);
    }
    return auto;
}

function filtrarColor(auto){
    const {color} = datosBusqueda;
    if(color){
        return auto.color === color;
    }
    return auto;
}

function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;
    if(transmision){
        return auto.transmision === transmision;
    }
    return auto;
}

function limpiarHTML(){
   while(resultado.firstChild){
    resultado.removeChild(resultado.firstChild);
   }
}