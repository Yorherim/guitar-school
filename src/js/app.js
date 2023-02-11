import { checkWebp } from "./functions/index.js";

const anchors = document.querySelectorAll("a[href^='#']");

for (let i = 0; i < anchors.length; i++) {
  const anchor = anchors[i];
  const href = anchor.getAttribute("href");

  if (href.length > 1) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: "smooth" });
    });
  }
}

const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("hamburger_active");
  navbar.classList.toggle("navbar__menu-active");
});

checkWebp();
