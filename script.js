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

document.querySelectorAll("[data-copy-email]").forEach((button) => {
  button.addEventListener("click", async () => {
    const email = button.dataset.copyEmail;
    const status = button.parentElement?.querySelector(".copy-status");

    try {
      await navigator.clipboard.writeText(email);
      button.textContent = "Email Copied";
      if (status) {
        status.textContent = "Copied to clipboard.";
      }
    } catch {
      if (status) {
        status.textContent = email;
      }
    }

    window.setTimeout(() => {
      button.textContent = "Copy Email";
      if (status) {
        status.textContent = "";
      }
    }, 2500);
  });
});
