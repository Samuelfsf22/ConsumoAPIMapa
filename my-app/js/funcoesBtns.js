export let coordernadas = []
import { map } from "../main"
import { useGeographic } from "ol/proj"

useGeographic()
document.getElementById('btnEscolherCoordenadas').addEventListener('click', () => {
    document.getElementById('divCEP').classList.add('invisivel')
    document.getElementById('divCoordenada').classList.remove('invisivel')
})

document.getElementById('btnEscolherCEP').addEventListener('click', () => {
    document.getElementById('divCEP').classList.remove('invisivel')
    document.getElementById('divCoordenada').classList.add('invisivel')
})

document.getElementById('btnEnviaViaCEP').addEventListener('click', () => {
    let cep = document.getElementById('inputCEP').value
    let logradouro = document.getElementById('inputLogradouro').value
    mudarView(logradouro, cep);
})

document.getElementById('btnEnviaViaCoordenada').addEventListener('click', () => {
    coordernadas[0] = document.getElementById('inputCoordenadaX').value
    coordernadas[1] = document.getElementById('inputCoordenadaY').value

    map.getView().setCenter(coordernadas)
    map.getView().setZoom(12)
})

// Função para geocodificar e mudar a view
function mudarView(logradouro, cep) {
    
    const endereco = `${logradouro}, ${cep}`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const { lat, lon } = data[0];
                const novasCoordenadas = [lon, lat];

                map.getView().setCenter(novasCoordenadas);
                map.getView().setZoom(15);
            } else {
                console.error('Endereço não encontrado');
            }
        })
        .catch(error => {
            console.error('Erro ao geocodificar:', error);
        });
}
