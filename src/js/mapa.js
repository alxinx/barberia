(function() {
    const lat = 6.2476;
    const lng = -75.5658;
    const mapa = L.map('mapa').setView([lat, lng ], 16);
    let marker;

    const  geocodeService = L.esri.Geocoding.geocodeService();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);


    marker = new L.marker([lat, lng], {
        draggable : true,
        autoPan : true,
    }).addTo(mapa)

    //Detecto  lat y lng
    marker.on('moveend', function(e){
            marker = e.target
            console.log(marker)
            const posicion = marker.getLatLng()

            console.log(posicion['lat'])

            let latitud = posicion['lat'];
            let longitud = posicion['lng'];

            mapa.panTo(new L.LatLng(latitud, longitud))


            //Get street information

            geocodeService.reverse().latlng(posicion, 13).run( function(error, resultado){
                
                const inputCiudad = document.querySelector('#ciudad');
                const inputDireccion = document.querySelector('#direccion');
                inputCiudad.value = resultado.address.City;
                inputDireccion.value = resultado.address.Address;
                

            

            })


    })


})()