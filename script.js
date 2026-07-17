const currentPage = document.body.dataset.page;
const header = document.querySelector(".site-header");
const nav = document.querySelector(".nav");
const menuCheckbox = document.querySelector(".menu-checkbox");

const syncHeaderFrost = () => {
  header?.classList.toggle("is-frosted", window.scrollY > 8);
};

syncHeaderFrost();
window.addEventListener("scroll", syncHeaderFrost, { passive: true });

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
    try {
      await navigator.clipboard.writeText(email);
      const label = button.querySelector(".copy-label");
      if (label) {
        label.textContent = "Email Copied";
      }
    } catch {
      window.location.href = `mailto:${email}`;
    }

    window.setTimeout(() => {
      const label = button.querySelector(".copy-label");
      if (label) {
        label.textContent = email;
      }
    }, 2500);
  });
});
