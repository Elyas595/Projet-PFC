// On récupere les éléments html qu'on va modifier
const boutons = document.querySelectorAll('.btn');
const messageElement = document.getElementById('message');
const scoreJoueurElement = document.getElementById('score-joueur');
const scoreOrdiElement = document.getElementById('score-ordi');
const choixJoueurElement = document.getElementById('choix-joueur');
const choixOrdiElement = document.getElementById('choix-ordi');
const btnReset = document.getElementById('btn-reset');

//variables pour stocker les scores
let scoreJoueur = 0;
let scoreOrdi = 0;

//Objet pour convertir les choix en emojis
const choixEmojis = {
    pierre: '🪨',
    feuille: '📃',
    ciseaux: '✂️'
};

// Fonction pour générer le choix de l'ordinateur
function genererChoixOrdi() {
    const choix = ['pierre', 'feuille', 'ciseaux'];
    const random = Math.floor(Math.random() * 3);
    return choix[random]; // ← CORRECTION ICI
}

// Fonction pour déterminer le gagnant
function determinerGagnant(joueur, ordi) {
    // Egalité
    if (joueur === ordi) {
        return 'egalite';
    }
    //sinon on verifie les regles du jeu
    if (
        (joueur === 'pierre' && ordi === 'ciseaux') ||
        (joueur === 'feuille' && ordi === 'pierre') ||
        (joueur === 'ciseaux' && ordi === 'feuille')
    ) {
        return 'victoire';
    } else {
        return 'defaite';
    }
}

// Fonction pour mettre à jour le score et l'affichage
function afficherResultat(resultat) {
    // on enleve les classes precedentes
    messageElement.className = 'message';
    //on affiche le bon message selon le resultat
    if (resultat === 'victoire') {
        messageElement.textContent = 'Vous avez gagné ! 🎉';
        messageElement.classList.add('victoire');
        scoreJoueur++;
        scoreJoueurElement.textContent = scoreJoueur;
    } else if (resultat === 'defaite') {
        messageElement.textContent = 'Vous avez perdu ! 😞';
        messageElement.classList.add('defaite');
        scoreOrdi++;
        scoreOrdiElement.textContent = scoreOrdi;
    } else {
        messageElement.textContent = "Égalité ! 🤝";
        messageElement.classList.add('egalite');
    }
}

//fonction principale pour jouer un tour
function jouer(choixJoueur) {
    //generer le choix de l'ordi
    const choixOrdi = genererChoixOrdi(); // ← CORRECTION ICI
    //afficher les choix avec emojis
    choixJoueurElement.textContent = choixEmojis[choixJoueur]; // ← CORRECTION ICI
    choixOrdiElement.textContent = choixEmojis[choixOrdi]; // ← CORRECTION ICI
    //determiner le gagnant
    const resultat = determinerGagnant(choixJoueur, choixOrdi);
    //afficher le resultat
    afficherResultat(resultat);
}

// Ajouter les écouteurs d'événements aux boutons

boutons.forEach(bouton => {
    bouton.addEventListener('click', function () {

        // Récupérer le choix du joueur à partir de l'attribut data-choix
        const choixJoueur = this.getAttribute('data-choix');


        // on ajoute la classe active pour l'animation
        boutons.forEach(btn => btn.classList.remove('active')); 
        this.classList.add('active');
        //on lance une partie
        jouer(choixJoueur);
    });
});

//  réinitialisation
function reinitialiser() {
    scoreJoueur = 0;
    scoreOrdi = 0;
    scoreJoueurElement.textContent = '0';
    scoreOrdiElement.textContent = '0';
    choixJoueurElement.textContent = '❓';
    choixOrdiElement.textContent = '❓';
    messageElement.textContent = 'Faites votre choix pour commencer le jeu !';
    messageElement.className = 'message';
    boutons.forEach(btn => btn.classList.remove('active'));
}

//evenement de reinitialisation
btnReset.addEventListener('click', reinitialiser);