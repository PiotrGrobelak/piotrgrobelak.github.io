"use strict";

import { get } from "http";

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

const repoList = document.querySelector(".projects__cards--js");
const moreRepo = document.querySelector(".projects__button--more-js");
const lessRepo = document.querySelector(".projects__button--less-js");

lessRepo.style.display = "none";

fetch("https://api.github.com/users/piotrgrobelak/repos?sort=pushed")
  .then(response => response.json())
  .then(response => {
    const repos = response;

    for (const repo of repos.slice(0, 4)) {
      let {
        name,
        description,
        html_url,
        updated_at,
        deployments_url,
        homepage
      } = repo;

      if (!description) {
        description = "No description";
      }

      if (!homepage) {
        homepage = "";
      }

      repoList.innerHTML += `<li class="projects__card">
      <div class="projects__wrapper">
        <img class="projects__logo" src="assets/img/icons/githubIcon.svg" alt="Github icon.">
        <h4 class="projects__name">${name}</h4>
        <p class="projects__description">${description}</p>
      </div>
      <div class="projects__links">
        <img class="projects__icon" src="assets/img/icons/demoIcon.svg" alt="Link for live project.">
        <a class="projects__link projects__link--border" href="${homepage}">Demo</a>
        <img class="projects__icon" src="assets/img/icons/codeIcon.svg" alt="Link for code.">
        <a class="projects__link" href="${html_url}">Github</a>
      </div>
    </li>`;
    }
    moreRepo.addEventListener("click", () => {
      for (const repo of repos.slice(4)) {
        let {
          name,
          description,
          html_url,
          updated_at,
          deployments_url,
          homepage
        } = repo;

        if (!description) {
          description = "No description";
        }

        if (!homepage) {
          homepage = "";
        }
        const moreRepoList = document.createElement("li");
        moreRepoList.classList.add("projects__card");
        repoList.appendChild(moreRepoList);

        moreRepoList.innerHTML += `
      <div class="projects__wrapper">
        <img class="projects__logo" src="assets/img/icons/githubIcon.svg" alt="Github icon.">
        <h4 class="projects__name">${name}</h4>
        <p class="projects__description">${description}</p>
      </div>
      <div class="projects__links">
        <img class="projects__icon" src="assets/img/icons/demoIcon.svg" alt="Link for live project.">
        <a class="projects__link projects__link--border" href="${homepage}">Demo</a>
        <img class="projects__icon" src="assets/img/icons/codeIcon.svg" alt="Link for code.">
        <a class="projects__link" href="${html_url}">Github</a>
      </div>`;

        lessRepo.addEventListener("click", () => {
          repoList.removeChild(moreRepoList);
          moreRepo.style.display = "block";
          lessRepo.style.display = "none";
        });
      }
      if (moreRepo) {
        moreRepo.style.display = "none";
        lessRepo.style.display = "block";
      }
    });
  })
  .catch(error => console.log("error:", error));
