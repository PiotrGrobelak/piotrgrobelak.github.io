"use strict";

// service worker registration - remove if you're not going to use it

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function() {
//     navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
//       // Registration was successful
//       console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     }, function(err) {
//       // registration failed :(
//       console.log('ServiceWorker registration failed: ', err);
//     });
//   });
// }

// place your code below


console.log(`Hello world!`);


const repoList = document.querySelector('.projects__cards--js');

fetch('https://api.github.com/users/piotrgrobelak/repos?sort=pushed')
  .then(response => response.json())
  .then(response => {
    const repos = response;
    for (const repo of repos) {
      let {
        name,
        description,
        html_url,
        updated_at,
        deployments_url,
        homepage
      } = repo;

      if (!description) {
        description = "No description"
      }

      repoList.innerHTML += `<li class="projects__card">
      <div class="projects__wrapper">
        <img class="projects__logo" src="assets/img/icons/githubIcon.svg" alt="Github icon.">
        <h4 class="projects__name">${name}</h4>
        <p class="projects__description">${description}</p>
      </div>
      <div class="projects__links">
        <img class="projects__icon" src="assets/img/icons/demoIcon.svg" alt="Link for live project.">
        <a class="projects__link projects__link--border" href="${html_url}">Demo</a>
        <img class="projects__icon" src="assets/img/icons/codeIcon.svg" alt="Link for code.">
        <a class="projects__link" href="${homepage}">Github</a>
      </div>
    </li>`





    }
  });