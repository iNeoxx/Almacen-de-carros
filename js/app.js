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

// Agregar evento onchange a cada select
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;
    guardarFiltro('marca', datosBusqueda.marca);
    filtrarAuto();
});

year.addEventListener('change', e => {
    datosBusqueda.year = e.target.value;
    guardarFiltro('year', datosBusqueda.year);
    filtrarAuto();
});

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;
    guardarFiltro('minimo', datosBusqueda.minimo);
    filtrarAuto();
});

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;
    guardarFiltro('maximo', datosBusqueda.maximo);
    filtrarAuto();
});

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = e.target.value;
    guardarFiltro('puertas', datosBusqueda.puertas);
    filtrarAuto();
});

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    guardarFiltro('color', datosBusqueda.color);
    filtrarAuto();
});

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    guardarFiltro('transmision', datosBusqueda.transmision);
    filtrarAuto();
});

//funciones
function guardarFiltro(nombreFiltro, valorFiltro) {
    localStorage.setItem(nombreFiltro, valorFiltro);
}

function cargarFiltro(nombreFiltro, elementoSelect) {
    const valorFiltro = localStorage.getItem(nombreFiltro);
    if (valorFiltro && !datosBusqueda[nombreFiltro]) {
      // Solo asigna el valor del localStorage si no hay un valor previo en datosBusqueda
      elementoSelect.value = valorFiltro;
      datosBusqueda[nombreFiltro] = valorFiltro;
    }
  }

//eventos

document.addEventListener("DOMContentLoaded", () => {
    // cargar valores guardados en localStorage para cada select
    cargarFiltro('marca', marca);
    cargarFiltro('year', year);
    cargarFiltro('minimo', minimo);
    cargarFiltro('maximo', maximo);
    cargarFiltro('puertas', puertas);
    cargarFiltro('color', color);
    cargarFiltro('transmision', transmision);

    // mostrarAutos(baseDeDatosAutos);
    // llenarSelectYear();
    // Si hay autos almacenados en el localStorage
  if (localStorage.getItem("autos")) {
    // Obtener los autos del localStorage y convertirlos de nuevo a un objeto JavaScript
    const autosGuardados = JSON.parse(localStorage.getItem("autos"));
    // Mostrar los autos en la página
    mostrarAutos(autosGuardados);
  } else {
    // Mostrar un mensaje indicando que no hay ningún auto almacenado en el localStorage
    const noHayAutos = document.createElement("div");
    noHayAutos.classList.add("alerta");
    noHayAutos.textContent = "No hay autos almacenados en el Local Storage";
    resultado.appendChild(noHayAutos);
  }

  llenarSelectYear();
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
    });

    // Guardar los carros en el LocalStorage
    localStorage.setItem('autos', JSON.stringify(autos));
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
    
    let autosAlmacenados = JSON.parse(localStorage.getItem('autos'));
    const resultado = [...baseDeDatosAutos, ...autosAlmacenados]
      .filter(filtrarMarca)
      .filter(filtrarYear)
      .filter(filtrarMinimo)
      .filter(filtrarMaximo)
      .filter(filtrarPuertas)
      .filter(filtrarColor)
      .filter(filtrarTransmision);
  
    if (resultado.length) {
      mostrarAutos(resultado);
      localStorage.setItem('autos', JSON.stringify(resultado));
    } else {
      noHayResultado();
      localStorage.setItem('autos', JSON.stringify([]));
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

//db
const baseDeDatosAutos  = [
	{
		marca: 'BMW',
		modelo: 'Serie 3',
		year: 2020,
		precio: 30000,
		puertas: 4,
		color: 'Blanco',
		transmision: 'automatico',
		foto:  '/fotos/bmwserie3Blanco.png'  
	},
	{ 
        marca: 'Audi', 
        modelo: 'A4', 
        year: 2020, 
        precio: 40000, 
        puertas: 4, 
        color: 'Negro', 
        transmision: 'automatico',
		foto: '/fotos/audiA42020Negro.png'  
    },
	{
		marca: 'Ford',
		modelo: 'Mustang',
		year: 2015,
		precio: 20000,
		puertas: 2,
		color: 'Negro',
		transmision: 'automatico',
		foto: '/fotos/fordMustang2015.png'  
	},
	{ 
        marca: 'Audi', 
        modelo: 'A6', 
        year: 2020, 
        precio: 35000, 
        puertas: 4, 
        color: 'Negro', 
        transmision: 'automatico',
		foto: '/fotos/audiA6.png'   
    },
	{
		marca: 'BMW',
		modelo: 'Serie 5',
		year: 2016,
		precio: 70000,
		puertas: 4,
		color: 'Rojo',
		transmision: 'automatico',
		foto: '/fotos/bmwm5.png'  
	},
	{
		marca: 'Mercedes Benz',
		modelo: 'Clase C',
		year: 2015,
		precio: 25000,
		puertas: 4,
		color: 'Blanco',
		transmision: 'automatico',
		foto: '/fotos/mercedesc.png'  
	},
	{
		marca: 'Chevrolet',
		modelo: 'Camaro',
		year: 2018,
		precio: 60000,
		puertas: 2,
		color: 'Rojo',
		transmision: 'manual',
		foto: '/fotos/camarored.png'  
	},
	{ 
        marca: 'Ford', 
        modelo: 'Mustang', 
        year: 2019, 
        precio: 80000, 
        puertas: 2, 
        color: 'Rojo', 
        transmision: 'manual',
		foto: '/fotos/mustangred.png'  
    },
	{
		marca: 'Dodge',
		modelo: 'Challenger',
		year: 2020,
		precio: 40000,
		puertas: 4,
		color: 'Blanco',
		transmision: 'automatico',
		foto: '/fotos/dodgeblanco.png'  
	},
	{ 
        marca: 'Audi', 
        modelo: 'A3', 
        year: 2017, 
        precio: 55000, 
        puertas: 2, 
        color: 'Negro', 
        transmision: 'manual',
		foto: '/fotos/audiA42020Negro.png'  
    },
	{
		marca: 'Dodge',
		modelo: 'Challenger',
		year: 2020,
		precio: 25000,
		puertas: 2,
		color: 'Rojo',
		transmision: 'manual',
		foto: '/fotos/dodgerojo.png'  
	},
	{
		marca: 'Mercedes Benz',
		modelo: 'Clase C',
		year: 2018,
		precio: 45000,
		puertas: 4,
		color: 'Azul',
		transmision: 'automatico',
		foto: '/fotos/mercedesazul.png'  
	},
	{
		marca: 'BMW',
		modelo: 'Serie 5',
		year: 2019,
		precio: 90000,
		puertas: 4,
		color: 'Blanco',
		transmision: 'automatico',
		foto: '/fotos/bmwserie3Blanco.png'  
	},
	{ 
        marca: 'Ford', 
        modelo: 'Mustang', 
        year: 2017, 
        precio: 60000, 
        puertas: 2, 
        color: 'Negro', 
        transmision: 'manual',
		foto: '/fotos/fordMustang2015.png'  
    },
	{
		marca: 'Dodge',
		modelo: 'Challenger',
		year: 2015,
		precio: 35000,
		puertas: 2,
		color: 'Azul',
		transmision: 'automatico',
		foto: '/fotos/dodgeazul.png'  
	},
	{
		marca: 'BMW',
		modelo: 'Serie 3',
		year: 2018,
		precio: 50000,
		puertas: 4,
		color: 'Blanco',
		transmision: 'automatico',
		foto: '/fotos/bmwserie3Blanco.png'  
	},
	{
		marca: 'BMW',
		modelo: 'Serie 5',
		year: 2017,
		precio: 80000,
		puertas: 4,
		color: 'Negro',
		transmision: 'automatico',
		foto: '/fotos/bmwserie5negro.png'  
	},
	{
		marca: 'Mercedes Benz',
		modelo: 'Clase C',
		year: 2018,
		precio: 40000,
		puertas: 4,
		color: 'Blanco',
		transmision: 'automatico',
		foto: '/fotos/mercedesc.png'  
	},
	{ 
        marca: 'Audi', 
        modelo: 'A4', 
        year: 2016, 
        precio: 30000, 
        puertas: 4, 
        color: 'Azul', 
        transmision: 'automatico',
		foto: '/fotos/audia4azul.png'  
    },
    { 
        marca: 'Nissan', 
        modelo: 'Sentra', 
        year: 2020, 
        precio: 12000, 
        puertas: 4, 
        color: 'Blanco', 
        transmision: 'manual',
		foto: '/fotos/nissansentrablanco.png'  
    },
    { 
        marca: 'Honda', 
        modelo: 'Civic', 
        year: 2018, 
        precio: 13000, 
        puertas: 2, 
        color: 'Negro', 
        transmision: 'automatico',
		foto: '/fotos/hondanegro.png'  
    },
    { 
        marca: 'Toyota', 
        modelo: 'Corolla', 
        year: 2020, 
        precio: 17000, 
        puertas: 4, 
        color: 'Rojo', 
        transmision: 'manual',
		foto: '/fotos/toyotarojo.png'  
    },
];

function cargarAutosDesdeLocalStorage() {
    const autosEnLocalStorage = JSON.parse(localStorage.getItem("autos"));
    if (autosEnLocalStorage && autosEnLocalStorage.length) {
      mostrarAutos(autosEnLocalStorage);
    } else {
      mostrarAutos(baseDeDatosAutos);
    }
  }
  window.addEventListener("load", cargarAutosDesdeLocalStorage);

