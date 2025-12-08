function mostrarPreciosXPunto(valor) {
    
    const seccion = document.getElementById('preciosPuntos'); // o el id que uses

    if (!seccion) return;

    if (valor === 'No') {
        seccion.classList.remove('hidden');
    } else {
        seccion.classList.add('hidden');
    }
}
function mostrarCampoPrecios(input) {
    const ocultar = 'precio_'+input.id
    const seccion = document.getElementById(ocultar);
    if(input.checked===false){
        seccion.classList.add('hidden')
        seccion.querySelector('input').disabled = true;

        
    }else {
        seccion.classList.remove('hidden');
        seccion.querySelector('input').disabled = false;
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