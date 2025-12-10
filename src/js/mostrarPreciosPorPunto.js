function sincronizarPreciosPorPunto() {
  const select = document.getElementById('esPrecioGlobal');
  const valor = select ? select.value : 'Si';

  const contenedor = document.getElementById('preciosPuntos');
  if (!contenedor) return;

  const inputs = contenedor.querySelectorAll('input[name="precioPorPunto[]"]');

  if (valor === 'No') {
    // 👉 No hay precio global → usamos precios por punto
    contenedor.classList.remove('hidden');

    inputs.forEach(input => {
      // id del input: "precio_manila" → saco "manila"
      const idPunto = input.id.replace('precio_', '');
      const checkbox = document.getElementById(idPunto);
      const activo = checkbox && checkbox.checked;

      input.disabled = !activo;   // solo activos se envían
      input.required = activo;    // y solo esos se validan
      if (!activo) {
        input.value = '';         // opcional: limpiar
      }
    });

  } else {
    // 👉 Sí hay precio global → se ignoran los precios por punto
    contenedor.classList.add('hidden');

    inputs.forEach(input => {
      input.disabled = true;
      input.required = false;
      input.value = '';           // opcional
    });
  }
}




function mostrarPreciosXPunto(valor) {
  sincronizarPreciosPorPunto()
}

function mostrarCampoPrecios(input) {
  const ocultarId = 'precio_' + input.id;   // ej: precio_monterrey
  const seccion = document.getElementById(ocultarId);

  console.log(seccion)
  if (!seccion) return;

  const inputs = seccion.querySelectorAll('input');

  if (!input.checked) {
    // ✅ Ocultamos y deshabilitamos los campos de precio
    seccion.classList.add('hidden');

    inputs.forEach(i => {
      i.disabled = true;    // no se envían
      i.required = false;   // el navegador no los valida
      // i.value = '';      // opcional: limpiar
    });

  } else {
    // ✅ Mostramos y habilitamos los campos de precio
    seccion.classList.remove('hidden');

    inputs.forEach(i => {
      i.disabled = false;   // se envían al backend
      // si quieres que sean obligatorios:
      // i.required = true;
    });
  }
}



function ponerPuntosANumeros (input){
   let valor = input.value.replace(/\D/g, "");

  if (!valor) {
    input.value = "";
    return;
  }

  input.value = valor.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
}

// hacerlo global para que el onchange lo encuentre
window.mostrarPreciosXPunto = mostrarPreciosXPunto;
window.mostrarCampoPrecios = mostrarCampoPrecios;
window.ponerPuntosANumeros = ponerPuntosANumeros