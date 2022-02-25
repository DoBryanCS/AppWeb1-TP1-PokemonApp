
import { pokemonapiURL } from './commun.js';

console.log(pokemonapiURL);

async function authentication() {
    const email = document.getElementById('email').value;
    const mdp = document.getElementById('password').value;
    if (email == "e2072765@site.com" && mdp == "e2072765") {
        // créer un objet contenant les champs nécessaires pour /auth/token
        // dans cet exemple, /auth/token veut recevoir un json contenant
        // un champ username et un champ password.
        const body = { email: email, password: mdp };
        // effectuer le fetch
        const response = await fetch(`${pokemonapiURL}/auth/token`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(body),
        });
        // traiter la réponse
        if (response.ok) {
            const data = await response.json();
            console.log(`Le jeton d'authentication: ${data.token}`);
            sessionStorage.setItem('a', data.token);
            window.location.href = './favorites.html';
        } else {
            console.error('une erreur sest produite');
        }
    }
}

function annuler() {
    window.location.href = './index.html'
}
document.getElementById('connexion').addEventListener('click', authentication);
document.getElementById('annuler').addEventListener('click', annuler);


    

