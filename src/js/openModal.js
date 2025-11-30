(function () {
    const btnAbrir = document.getElementById('btnAbrirModal');
    const btnCerrar = document.getElementById('btnCerrarModal');
    const btnCancelar = document.getElementById('btnCancelarModal');
    const modal = document.getElementById('modalBarbero');

    if (!btnAbrir || !modal) return;

    function abrirModal() {
      modal.classList.remove('hidden');
      // opcional: bloquear scroll del body
      document.body.classList.add('overflow-hidden');
    }

    function cerrarModal() {
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }

    btnAbrir.addEventListener('click', abrirModal);
    btnCerrar.addEventListener('click', cerrarModal);
    btnCancelar.addEventListener('click', cerrarModal);

    // cerrar si hace click en el fondo oscuro (pero no en el contenido)
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        cerrarModal();
      }
    });

    // cerrar con ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        cerrarModal();
      }
    });
  })()