let $seccionDescuentos = document.getElementById('descuentos');
let $cantidadDeTickets = document.getElementById('inputCantidad');
let $btnBorrar = document.getElementById('btnBorrar');
let $btnResumen = document.getElementById('btnResumen');
let $formTicket = document.getElementById('formularioTicket');
let $inputCategoria = document.getElementById('inputCategoria');
let $precioTicket = document.getElementById('precioTicket');
let $total = document.getElementById('total');

const precioDelTicket = 200;


let datos = [
  {
    rol: "Estudiante",
    descuento: 80,
    colorCaja: "primary"
  },
  {
    rol: "Trainee",
    descuento: 50,
    colorCaja: "info"
  },
  {
    rol: "Junior",
    descuento: 15,
    colorCaja: "warning"
  }
]
colocarDatosEnElHTML(datos);



document.addEventListener('click', (e) => {
  if (e.target === $btnBorrar) {
    if (confirm("Seguro que desea borrar los datos?")) {
      $formTicket.reset();
    }
  }
  if (e.target === $btnResumen) {
    if (esEntero($cantidadDeTickets.value)) {
      let cantidadTickets = parseInt($cantidadDeTickets.value);
      let valorSelect = $inputCategoria.options[$inputCategoria.selectedIndex].value;
      totalAPagar(cantidadTickets, valorSelect);
    }
  }
})



function totalAPagar(cantidadTickets, categoriaElegida) {

  let datosSegunLaCategoria = obtenerDatosSegunLaCategoria(datos, categoriaElegida);
  let total = (cantidadTickets * precioDelTicket) * (1 - (datosSegunLaCategoria.descuento / 100));
  $total.innerText = total;
}


function obtenerDatosSegunLaCategoria(datos, categoriaElegida) {
  for (let index = 0; index < datos.length; index++) {
    if (datos[index].rol === categoriaElegida) {
      return datos[index];
    }
  }
}

function colocarDatosEnElHTML(datos) {

  datos.forEach((dato) => {
    crearCajaDeDescuento(dato)
    colocarCategorias(dato);
  });
  $precioTicket.innerText = precioDelTicket;
}

function esEntero(numero) {
  if (isNaN(numero) || !numero.trim()) {
    alert("Debe colocar un numero");
    return false;
  } else {
    if (numero % 1 != 0) {
      alert("Debe colocar un numero entero");
      return false;
    }
    return true;
  }
}

function crearCajaDeDescuento({ rol, descuento, colorCaja }) {
  let div = document.createElement('div');
  div.classList.add('col-12', 'col-md-6', 'col-xl-4', 'px-1');
  div.innerHTML = `
    <div class="p-4 text-center border border-${colorCaja} ">
      <h3>${rol}</h3>
      <p>
        <span class="h5">Tienen un descuento</span><br>
        <strong><span>${descuento}</span>%</strong><br>
        <span class="text-muted">* presentar documentacion</span>
      </p>
    </div>
  `;
  $seccionDescuentos.appendChild(div);
}

function colocarCategorias({ rol }) {
  let option = document.createElement('option');
  option.value = rol;
  option.innerText = rol;
  $inputCategoria.appendChild(option);
}