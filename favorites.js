import { pokemonapiURL } from './commun.js';


console.log(pokemonapiURL);




async function obtenirFavorites() {
    const bearerToken = 'Bearer ' + sessionStorage.getItem('a');
    const response = await fetch(`${pokemonapiURL}/favorites`, {
    method: 'GET',
    headers: { authorization: bearerToken },
    });
    // traiter la réponse
    if (response.ok) {
    const data = await response.json();
    let a =''
        for (let i = 0; i < data.length; i += 1) {
            let poke = '';
            for (let index = 0; index < data[i].poketypes.length; index++) {
                if (poke.length === 0) {
                    poke += `${data[i].poketypes[index].name}`;
                } else {
                    poke += `, ${data[i].poketypes[index].name}`;
                }
            }
            a += `<div class="column is-3-desktop is-4-tablet is-full-mobile">
                    <div class="card large" style="background-color:${data[i].color}">
                        <div class="card-image" >
                        <a href="./details.html?pokemonId=${data[i].pokemonId}">
    
                            <figure class="image is-square" >
                                <img src="${data[i].imgURL}"
                                    alt="${data[i].name}">
                            </figure>
                        </a>
                        </div>
                            <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4 is-spaced no-padding has-text-centered">${data[i].name}</p>
                                    <p class="subtitle is-6"><b><span style='color:black'>Species : </span></b><span style='color:black'>${data[i].species.name}</span></p>
                                    <p class="subtitle is-6"><b><span style='color:black'>Habitat : </span></b><span style='color:black'>${data[i].habitat.name}</span></p>
                                    <p class="subtitle is-6"><b><span style='color:black'>Poketypes : </span></b><span style='color:black'>${poke}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>`;
            }
            document.getElementById("pokemons").innerHTML = a;
    } else {
    console.error('une erreur sest produite');
    }
}

obtenirFavorites();


document.getElementById('afficherDeconnexion').addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = './index.html'
});
