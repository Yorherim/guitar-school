const anchors = document.querySelectorAll("a[href^='#']");

for (let i = 0; i < anchors.length; i++) {
  const anchor = anchors[i];
  const href = anchor.getAttribute("href");

  if (href.length > 1) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href'))
        .scrollIntoView({ behavior: "smooth" });
    });
  }
}
