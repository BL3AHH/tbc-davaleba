const menuToggle = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector(".site-nav");
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");
const formFields = ["name", "email", "message"];

if (menuToggle && siteNavigation) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    siteNavigation.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
    siteNavigation.classList.toggle("is-open", !isExpanded);
  });

  siteNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!siteNavigation.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });
}

if (contactForm && formStatus) {
  formFields.forEach((fieldName) => {
    const field = contactForm.elements[fieldName];
    const errorMessage = document.querySelector(`#${fieldName}-error`);

    field.addEventListener("input", () => {
      field.removeAttribute("aria-invalid");
      errorMessage.textContent = "";
      formStatus.textContent = "";
      formStatus.classList.remove("is-error");
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let firstInvalidField = null;

    formFields.forEach((fieldName) => {
      const field = contactForm.elements[fieldName];
      const errorMessage = document.querySelector(`#${fieldName}-error`);
      let error = "";

      if (!field.value.trim()) {
        error = "Please fill out this field.";
      } else if (!field.checkValidity()) {
        error = "Please enter a valid email address.";
      }

      field.setAttribute("aria-invalid", String(Boolean(error)));
      errorMessage.textContent = error;

      if (error && !firstInvalidField) firstInvalidField = field;
    });

    if (firstInvalidField) {
      formStatus.textContent = "Please check the highlighted fields.";
      formStatus.classList.add("is-error");
      firstInvalidField.focus();
      return;
    }

    formStatus.classList.remove("is-error");
    formStatus.textContent = "Thanks for the note! This demo doesn’t send or store messages.";
    contactForm.reset();
  });
}

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = new Date().getFullYear();