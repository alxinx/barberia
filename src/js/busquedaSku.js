const codigoInput = document.getElementById('codigo');

codigoInput.addEventListener('change', async (e) => {
  const valor = e.target.value.trim();
  if (!valor) return;

  const res = await fetch(`/panel/puntosDeVenta/buscarSkuEan/${valor}`);
  const data = await res.json();

  const contenedor = document.getElementById('botonAgregarProducto');
  const contenedorBtnAdd = document.getElementById('botonAgregarInventario');


  if (!data.ok) {
    document.getElementById('nombre').value = "No existe"
    document.getElementById('codigo').value = ""
    contenedor.innerHTML = `

      <a href="/panel/administrativo/productosServicios/nuevo" target="_blank" class="px-5 py-2 rounded-lg text-sm font-medium text-white bg-green-500 cursor-pointer">  EL PRODUCTO NO EXITSTE. HAS CLICK AQUI PARA AGREGARLO </a>
        `;
    contenedorBtnAdd.innerHTML = ``
    return;
  }

  const { producto } = data;

  document.getElementById('nombre').value = producto.nombreProductoServicio;
  document.getElementById('idProductoServicio').value = producto.idProductoServicio;
  contenedor.innerHTML = ``;
  contenedorBtnAdd.innerHTML = `<button 
            type="submit"
            class="px-5 py-2 rounded-lg text-sm font-medium text-white bg-green-500 cursor-pointer"
        >
            AGREGAR AL INVENTARIO DE LA TIENDA
        </button>`
});


const form = document.getElementById('formInventario');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const btn = form.querySelector('button');
  btn.disabled = true;

  const res = await fetch('/panel/inventario/agregar', {
    method: 'POST',
    body: new FormData(form)
  });

  const data = await res.json();

  if (!data.ok) {
    btn.disabled = false;
    alert('Error');
    return;
  }


  //await cargarInventario();

  // 2️⃣ feedback
  alert('Producto agregado');

  // 3️⃣ reset parcial
  form.reset();
  btn.disabled = false;
});
