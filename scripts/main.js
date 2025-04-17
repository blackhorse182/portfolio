// Ce fichier contient du code JavaScript pour récupérer les dépôts GitHub et les afficher en français.

const githubUsername = 'blackhorse182'; // Remplacez par votre nom d'utilisateur GitHub
const reposContainer = document.getElementById('projects');

async function fetchRepositories() {
    try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
        if (!response.ok) {
            throw new Error('La réponse du réseau n\'est pas correcte');
        }
        const repositories = await response.json();
        displayRepositories(repositories);
    } catch (error) {
        console.error('Il y a eu un problème avec l\'opération fetch :', error);
    }
}

function displayRepositories(repositories) {
    reposContainer.innerHTML = ''; // Efface le contenu existant
    repositories.forEach(repo => {
        const projectTile = document.createElement('div');
        projectTile.className = 'project-tile';
        projectTile.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || 'Aucune description disponible'}</p>
            <a href="${repo.html_url}" target="_blank">Voir le projet</a>
        `;
        reposContainer.appendChild(projectTile);
    });
}

// Récupère les dépôts lorsque la page est chargée
document.addEventListener('DOMContentLoaded', fetchRepositories);