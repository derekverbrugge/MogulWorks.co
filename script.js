document.addEventListener("DOMContentLoaded", () => {

  async function loadComponent(id, file) {

    const element = document.getElementById(id);

    if (!element) {
      return;
    }

    try {

      const response = await fetch(file);

      if (!response.ok) {
        throw new Error(`Unable to load ${file}`);
      }

      element.innerHTML = await response.text();

    } catch (error) {

      console.error(error);

    }

  }


  Promise.all([
    loadComponent("site-header", "header.html"),
    loadComponent("site-footer", "footer.html")
  ]).then(() => {

    setupNavigation();
    setupCopyright();

  });


  function setupNavigation() {

    const toggle =
      document.getElementById("menu-toggle");

    const nav =
      document.getElementById("main-nav");

    if (!toggle || !nav) {
      return;
    }


    toggle.addEventListener("click", () => {

      const open =
        nav.classList.toggle("is-open");

      toggle.setAttribute(
        "aria-expanded",
        String(open)
      );

      toggle.setAttribute(
        "aria-label",
        open
          ? "Close navigation"
          : "Open navigation"
      );

    });


    nav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("is-open");

        toggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  function setupCopyright() {

    const year =
      document.getElementById("copyright-year");

    if (year) {

      year.textContent =
        new Date().getFullYear();

    }

  }

});
