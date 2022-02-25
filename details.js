import { pokemonapiURL } from './commun.js';

console.log(pokemonapiURL);

let params = (new URL(document.location)).searchParams;
let id = params.get("pokemonId");


async function detailspokemon() {
    const resultat = await fetch(`${pokemonapiURL}/pokemon?pokemonId=` + id);
    if (resultat.ok) {
        const data = await resultat.json();
        document.getElementById("name").innerHTML = data.name;
        document.getElementById("hp").innerHTML = data.hp;
        document.getElementById("attack").innerHTML = data.attack;
        document.getElementById("defense").innerHTML = data.defense;
        document.getElementById("height").innerHTML = data.height;
        document.getElementById("specialattack").innerHTML = data.specialattack;
        document.getElementById("specialdefense").innerHTML = data.specialdefense;
        document.getElementById("speed").innerHTML = data.speed;
        document.getElementById("weight").innerHTML = data.weight;
        document.getElementById("imgURL").src = data.imgURL;
        document.getElementById("cryURL").innerHTML = data.cryURL;
        document.getElementById("habitatName").innerHTML = data.habitat.name;
        document.getElementById("speciesName").innerHTML = data.species.name;
        document.getElementById("evolutionName").innerHTML = data.evolution.name;
        document.getElementById("evolutionImgURL").src = data.evolution.imgURL;
        document.getElementById("evolutionEvolutionName").innerHTML = data.evolution.evolution.name;
        document.getElementById("evolutionEvolutionImgURL").src = data.evolution.evolution.imgURL;
        }
    }
    detailspokemon();


    function verifConnection() {
        if (sessionStorage.getItem("a") != null) {
                document.getElementById("afficherDeconnexion").setAttribute("class", "button is-light is-danger");
                document.getElementById("favorites").setAttribute("class", "navbar-item");
        } else {  
                document.getElementById("afficherDeconnexion").setAttribute("class", "button is-light is-danger is-hidden");   
        }
    }
    

    document.getElementById('afficherDeconnexion').addEventListener('click', () => {
        sessionStorage.clear();
        window.location.href = './index.html'
    });

    
    document.getElementById('ajouterFavoris').addEventListener('click', async () => {
        const bearerToken = 'Bearer ' + sessionStorage.getItem('a');
        const resultat = await fetch(`${pokemonapiURL}/favorite?pokemonId=` + id, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            headers: { authorization: bearerToken },
        });
        if (resultat.ok) {
            
            window.location.reload();
        }

    })

    document.getElementById('supprimerFavoris').addEventListener('click', async () => {
        const bearerToken = 'Bearer ' + sessionStorage.getItem('a');
        const resultat = await fetch(`${pokemonapiURL}/favorite?pokemonId=` + id, {
            headers: { 'Content-Type': 'application/json' },
            method: 'DELETE',
            headers: { authorization: bearerToken },
        });
        if (resultat.ok) {
            
            window.location.reload();
        }

    })


  
async function buttonFavoris() {
    const bearerToken = 'Bearer ' + sessionStorage.getItem('a');
        const resultat = await fetch(`${pokemonapiURL}/favorite?pokemonId=` + id, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
            headers: { authorization: bearerToken },
        });
        if (resultat.ok) {
        const data = await resultat.json();
        console.log(JSON.stringify(data.isFavorite))
            if (JSON.stringify(data.isFavorite) == "true") {
                document.getElementById("ajouterFavoris").setAttribute("class", "button is-primary is-hidden");
                document.getElementById("supprimerFavoris").setAttribute("class", "button is-danger")
            } else {
                document.getElementById("ajouterFavoris").setAttribute("class", "button is-primary");
                document.getElementById("supprimerFavoris").setAttribute("class", "button is-danger is-hidden")
            }
        }
    }

buttonFavoris();
verifConnection();