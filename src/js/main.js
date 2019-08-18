"use strict";

import {
  get
} from "http";
import {
  link
} from "fs";
import {
  compileFunction
} from "vm";
// import { TIMEOUT } from "dns";

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
      // console.log(repo);
      repoList.innerHTML += `<li class="projects__card">
      <div class="projects__wrapper">
        <img class="projects__logo" src="assets/img/icons/githubIcon.svg" alt="Github icon.">
        <h4 class="projects__name">${name}</h4>
        <p class="projects__description">${
          description ? description : (description = "No description")
        }</p>
      </div>
      <div class="projects__links">
        <img class="projects__icon" src="assets/img/icons/demoIcon.svg" alt="Link for live project.">
        <a class="projects__link projects__link--border" href="${
          homepage ? homepage : (homepage = "")
        }">Demo</a>
        <img class="projects__icon" src="assets/img/icons/codeIcon.svg" alt="Link for code.">
        <a class="projects__link" href="${html_url}">Github</a>
      </div>
    </li>`;
    }
    // Rest repos by click button
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
        const moreRepoList = document.createElement("li");
        moreRepoList.classList.add("projects__card", "projects__card--slideIn");
        repoList.appendChild(moreRepoList);
        moreRepoList.innerHTML += `
      <div class="projects__wrapper">
        <img class="projects__logo" src="assets/img/icons/githubIcon.svg" alt="Github icon.">
        <h4 class="projects__name">${name}</h4>
        <p class="projects__description">${
          description ? description : (description = "No description")
        }</p>
      </div>
      <div class="projects__links">
        <img class="projects__icon" src="assets/img/icons/demoIcon.svg" alt="Link for live project.">
        <a class="projects__link projects__link--border" href="${
          homepage ? homepage : (homepage = "")
        }">Demo</a>
        <img class="projects__icon" src="assets/img/icons/codeIcon.svg" alt="Link for code.">
        <a class="projects__link" href="${html_url}">Github</a>
      </div>`;
        let click = 0;
        lessRepo.addEventListener("click", () => {
          moreRepoList.classList.add("projects__card--slideOut");
          moreRepoList.classList.remove("projects__card--slideIn");
          moreRepo.style.display = "block";
          lessRepo.style.display = "none";
          click = click + 1;
          if (click > 1) {
            repoList.removeChild(moreRepoList);
          }
        });
        if (moreRepo) {
          moreRepo.style.display = "none";
          lessRepo.style.display = "block";
        }
      }
    });
  })
  .catch(error => console.log("error:", error));




function animateSkills() {
  const scrollheight = window.scrollY;

  // Animate working knowledge
  const greenSkillList = document.querySelectorAll(".skills__item--green-js");
  const greenHeight = document.querySelector(".skills__list--green-js").clientHeight;
  const greenHeightfromTop = document.querySelector(".skills__list--green-js").offsetTop;
  if (greenHeightfromTop / 2 < greenHeight + scrollheight) {
    for (let i = 0; i < greenSkillList.length; i++) {
      setTimeout(function () {
        greenSkillList[i].classList.add("skills__item--js");

      }, 200 * i);
      if (scrollheight > greenHeight + greenHeightfromTop) {
        greenSkillList[i].classList.remove("skills__item--js");

      }

    }
  }

  // Animate know smoething about
  const purpureSkillList = document.querySelectorAll(".skills__item--purpure-js");
  const purpureHeight = document.querySelector(".skills__list--purpure-js").clientHeight;
  const purpureHeightFromTop = document.querySelector(".skills__list--purpure-js").offsetTop;
  if (purpureHeightFromTop - 2 * purpureHeight < purpureHeight + scrollheight) {
    for (let i = 0; i < purpureSkillList.length; i++) {
      setTimeout(function () {
        purpureSkillList[i].classList.add("skills__item--js");

      }, 200 * i);
      if (scrollheight > purpureHeight + purpureHeightFromTop) {
        purpureSkillList[i].classList.remove("skills__item--js");

      }
    }
  }

  // Animate want to learn 
  const blueSkillList = document.querySelectorAll(".skills__item--blue-js");
  const blueHeight = document.querySelector(".skills__list--blue-js").clientHeight;
  const blueHeightFromTop = document.querySelector(".skills__list--blue-js").offsetTop;

  if (blueHeightFromTop < blueHeight + scrollheight) {
    for (let i = 0; i < blueSkillList.length; i++) {
      setTimeout(function () {
        blueSkillList[i].classList.add("skills__item--js");

      }, 200 * i);
      if (scrollheight > blueHeight + blueHeightFromTop) {
        blueSkillList[i].classList.remove("skills__item--js");

      }
    }
  }






}

window.addEventListener("scroll", animateSkills);