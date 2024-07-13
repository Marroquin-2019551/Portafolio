AOS.init();
// menu
$(document).ready(function() {
    $('.toggle').click(function() {
        $('.menu').toggleClass('active');
        $('.fa-bars').toggleClass('toggleact');
    });

});


// barra de progeso
window.addEventListener('scroll', () => {

    let progresoBarra = document.querySelectorAll('.progreso-barra');
    let values = [
        '80%',
        '60%',
        '30%',
        '40%',
        '70%',
        '50%',
        '30%'
    ];
    progresoBarra.forEach((progreso, index) => {
        progreso.style.width = values[index];
    });
});

// api spotify
// llamdo post para consumir api y obtener token
const llave1 = "grant_type=client_credentials";
const llave2 = "client_id=4aab40b9fca048b7bc6e7e68c92ebc11";
const llave3 = "client_secret=a4136001994e4cfdbbd8dbff180cd33e";

const parametrosPOST = {
    method: "POST",
    headers: { "Content-Type": 'application/x-www-form-urlencoded' },
    body: llave1 + "&" + llave2 + "&" + llave3
}

const urlPOST = "https://accounts.spotify.com/api/token";
fetch(urlPOST, parametrosPOST)
    .then(respuesta => respuesta.json())
    .then(datos => llamarDatos(datos))

function llamarDatos(datos) {
    let token = datos.access_token;
    token = "Bearer " + token;

    const urlGET = "https://api.spotify.com/v1/artists/3ygJTpJJIK7eEeC2EFRl9D/top-tracks?country=es";

    const parametrosGET = {
        method: "GET",
        headers: { "Authorization": token }
    }

    fetch(urlGET, parametrosGET)
        .then(respuesta => respuesta.json())
        .then(datos => depurarArtista(datos.tracks))
}

function depurarArtista(datos) {
    datos.pop()
    for (canciones of datos) {

        console.log(canciones)
        const div = document.createElement('div')
        div.className = 'tarjetas'
        const { album: { images: { 0: { url } }, name: album }, name: cancion, preview_url } = canciones;

        div.innerHTML = `
                            <div class="imagen-tarjeta">
                                <img src="${url}" alt="" id="imagen">
                            </div>
                            <div class="contenido-tarjeta">
                                <h3 class="titulo-tarjeta" id="titulo">${cancion}</h3>
                                <p id="album" class="album">${album}</p>
                                <div class="controles-tarjeta">
                                    <audio src="${preview_url}" id="audio" controls></audio>
                                </div>
                            </div>
                        `;
        document.querySelector('.grupo-tarjetas').appendChild(div)

    }



}
