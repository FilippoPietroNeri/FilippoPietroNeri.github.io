var copyrightFooter = document.querySelector('#copyright');
var rowcontainer = document.querySelector('#rowcontainer');
var errorMessage = document.querySelector('#error');

copyrightFooter.textContent = `© 2019-${new Date().getFullYear()} Filippo Pietro Neri`;

function changeVisibility(tag, bool) 
{
    bool ? tag.style.display = 'block' : tag.style.display = 'none';
}
changeVisibility(errorMessage, false);

fetch('https://api.github.com/users/FilippoPietroNeri/repos')
.then((response) => response.json())
.then((data) => {
    for (repo of data) {
        if (repo.topics.includes('project')) {
            rowcontainer.innerHTML += `<div class="col-md-4 mb-4"><div class="card"><div class="card-body"><img src="https://skillicons.dev/icons?theme=light&i=${repo.language ? repo.language.toLowerCase() : ""}" class="mb-2" alt=""><h5 class="card-title">${repo.name.toUpperCase()}</h5><p class="card-text">${repo.description}</p><a href="https://github.com/${repo.full_name}" class="btn btn-dark">Visita ${repo.name}</a></div></div></div>`
        }
    }
}).catch((err) => {
    changeVisibility(errorMessage, true);
    errorMessage.innerHTML = `<b>UNEXPECTED ERROR!</b> ${err}`
})