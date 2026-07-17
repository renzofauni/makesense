const currentPage = document.body.dataset.page;
const header = document.querySelector(".site-header");
const nav = document.querySelector(".nav");
const menuCheckbox = document.querySelector(".menu-checkbox");
const motionTargets = [
  ".brand",
  ".nav",
  ".kicker",
  ".hero h1",
  ".services > .section-intro h1",
  ".lead",
  ".actions",
  ".service-row",
  ".approach-art",
  ".approach h2",
  ".email-panel",
];

const syncHeaderFrost = () => {
  header?.classList.toggle("is-frosted", window.scrollY > 8);
};

syncHeaderFrost();
window.addEventListener("scroll", syncHeaderFrost, { passive: true });

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("motion-ready");

  const revealItems = document.querySelectorAll(motionTargets.join(","));
  revealItems.forEach((item, index) => {
    item.classList.add("reveal-item");
    item.style.setProperty("--reveal-delay", `${Math.min(index * 70, 420)}ms`);
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.12,
    },
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  document.querySelectorAll(".asterisk").forEach((asterisk) => {
    let spinRampFrame;
    let spinIsPrimed = false;

    const setSpinSpeed = (speed) => {
      asterisk.getAnimations().forEach((animation) => {
        if (animation.animationName?.startsWith("asterisk-spin")) {
          animation.updatePlaybackRate(speed);
        }
      });
    };

    const easeInOut = (progress) => -(Math.cos(Math.PI * progress) - 1) / 2;

    const triggerSpinRamp = () => {
      const duration = 500;
      const maxSpeed = 80;
      const startTime = performance.now();

      window.cancelAnimationFrame(spinRampFrame);

      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const wave = Math.sin(easeInOut(progress) * Math.PI);
        setSpinSpeed(1 + (maxSpeed - 1) * wave);

        if (progress < 1) {
          spinRampFrame = window.requestAnimationFrame(tick);
          return;
        }

        setSpinSpeed(1);
      };

      spinRampFrame = window.requestAnimationFrame(tick);
    };

    asterisk.addEventListener("pointerenter", () => {
      if (spinIsPrimed) {
        return;
      }

      spinIsPrimed = true;
      triggerSpinRamp();
    });

    asterisk.addEventListener("pointerleave", () => {
      spinIsPrimed = false;
    });
  });
}

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
