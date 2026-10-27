const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Menu openen" : "Menu sluiten");
    primaryNav.classList.toggle("is-open", !isOpen);
  });

  primaryNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement && window.matchMedia("(max-width: 850px)").matches) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Menu openen");
      primaryNav.classList.remove("is-open");
    }
  });
}

const filterButtons = document.querySelectorAll(".filter-button");
const carCards = document.querySelectorAll(".offer-grid .car-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    carCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.fuel !== filter;
    });
  });
});

const contactForm = document.querySelector("#contact-form");
const formFeedback = document.querySelector("#form-feedback");

if (contactForm instanceof HTMLFormElement && formFeedback) {
  const topicSelect = contactForm.querySelector('select[name="topic"]');
  const messageField = contactForm.querySelector('textarea[name="message"]');
  const requestedCar = new URLSearchParams(window.location.search).get("auto");

  if (requestedCar && topicSelect && messageField) {
    topicSelect.value = "Een leaseauto";
    messageField.value = `Ik heb een vraag over de ${requestedCar}.`;
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    formFeedback.textContent = "Bedankt voor je bericht! Dit is een voorbeeldwebsite: je bericht is niet echt verzonden. Neem contact op via hallo@noordlease.nl.";
    formFeedback.classList.add("is-visible");
    contactForm.reset();
  });
}
