// This file contains JavaScript code that fetches data from the GitHub API to automatically display new repositories on the portfolio site.

const githubUsername = 'blackhorse182'; // Replace with your GitHub username
const reposContainer = document.getElementById('projects');

async function fetchRepositories() {
    try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const repositories = await response.json();
        displayRepositories(repositories);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function displayRepositories(repositories) {
    reposContainer.innerHTML = ''; // Clear existing content
    repositories.forEach(repo => {
        const projectTile = document.createElement('div');
        projectTile.className = 'project-tile';
        projectTile.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || 'No description available'}</p>
            <a href="${repo.html_url}" target="_blank">View Project</a>
        `;
        reposContainer.appendChild(projectTile);
    });
}

// Fetch repositories when the page loads
document.addEventListener('DOMContentLoaded', fetchRepositories);