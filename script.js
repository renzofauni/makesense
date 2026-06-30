const currentPage = document.body.dataset.page;
const nav = document.querySelector(".nav");
const menuCheckbox = document.querySelector(".menu-checkbox");

document.querySelectorAll("[data-nav-page]").forEach((link) => {
  if (link.dataset.navPage === currentPage) {
    link.classList.add("is-active");
    link.setAttribute("aria-current", "page");
  }
});

nav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    if (menuCheckbox) {
      menuCheckbox.checked = false;
    }
  }
});
