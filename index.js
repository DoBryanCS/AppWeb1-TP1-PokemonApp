import { pokemonapiURL } from './commun.js';
let pokemons = null

console.log(pokemonapiURL);

function genererPokemons(data) {
    let a = '';
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
        return a;
    }

async function obtenirHabitats() {
    //obtenir les habitats
    const resultat = await fetch(`${pokemonapiURL}/habitats`);
    if (resultat.ok) {
        const data = await resultat.json();

        const habitats = document.getElementById("habitats");
        habitats.innerHTML = '<option></option>';
        for (let i = 0; i < data.length; i += 1) {
            habitats.innerHTML += `<option>${data[i].name}</option>`;
        }
    }
}
obtenirHabitats();

async function obtenirPoketypes() {
    //obtenir les habitats
    const resultat = await fetch(`${pokemonapiURL}/poketypes`);
    if (resultat.ok) {
        const data = await resultat.json();

        const poketypes = document.getElementById("poketypes");
        poketypes.innerHTML = '<option></option>';
        for (let i = 0; i < data.length; i += 1) {
            poketypes.innerHTML += `<option>${data[i].name}</option>`;
        }
    }
}
obtenirPoketypes();

async function obtenirSpecies() {
    //obtenir les habitats
    const resultat = await fetch(`${pokemonapiURL}/species`);
    if (resultat.ok) {
        const data = await resultat.json();

        const species = document.getElementById("species");
        species.innerHTML = '<option></option>';
        for (let i = 0; i < data.length; i += 1) {
            species.innerHTML += `<option>${data[i].name}</option>`;
        }
    }
}
obtenirSpecies();

async function FiltrerPokemons() {
    const habitats = document.getElementById('habitats').value;
    const poketypes = document.getElementById('poketypes').value;
    const species = document.getElementById('species').value;
  
    let data = pokemons;
    console.log(data);
    if (habitats !== '') {
      data = data.filter((a) => a.habitat.name === habitats);
    }
    if (poketypes !== '') {
       data = data.filter((a) => {
           for (let index = 0; index < a.poketypes.length; index++) {
               if (a.poketypes[index].name === poketypes) {
                   return a.poketypes[index].name === poketypes
               }
           }
       })
    }
    if (species !== '') {
      data = data.filter((a) => a.species.name === species);
    }
  
    document.getElementById('pokemons').innerHTML = genererPokemons(data);
}
  
document.getElementById('btnFiltrer').addEventListener('click', FiltrerPokemons);
  
async function ObtenirPokemons() {
    const url = `${pokemonapiURL}/pokemons`;
  
    // obtenir les albums
    const resultat = await fetch(url);
    if (resultat.ok) {
      pokemons = await resultat.json();
      FiltrerPokemons();
    } else {
      console.log(resultat.statusText);
    }
  }
  ObtenirPokemons();

  function verif() {
    if (sessionStorage.getItem("a") != null) {
        document.getElementById("afficherConnexion").setAttribute("class", "button is-light is-hidden");
        document.getElementById("afficherDeconnexion").setAttribute("class", "button is-light is-danger");
        document.getElementById("favorites").setAttribute("class", "navbar-item");
    } else {
        document.getElementById("afficherConnexion").setAttribute("class", "button is-light");
        document.getElementById("afficherDeconnexion").setAttribute("class", "button is-light is-danger is-hidden");
    }
}


document.getElementById('afficherDeconnexion').addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = './index.html'
});

verif();