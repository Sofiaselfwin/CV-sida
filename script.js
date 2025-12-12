// Simple shared JavaScript for all pages

document.addEventListener("DOMContentLoaded", () => {
  setupDynamicYear();
  setupToggleSections();
  setupContactForm();
  setupMessageCounter();
});

function setupDynamicYear() {
  const el = document.querySelector("[data-year]");
  if (!el) return;
  el.textContent = new Date().getFullYear();
}

function setupToggleSections() {
  const toggles = document.querySelectorAll("[data-toggle-target]");
  if (!toggles.length) return;

  toggles.forEach((header) => {
    const targetId = header.getAttribute("data-toggle-target");
    const target = document.getElementById(targetId);
    if (!target) return;

    header.addEventListener("click", () => {
      const isHidden = target.hasAttribute("hidden");
      if (isHidden) {
        target.removeAttribute("hidden");
      } else {
        target.setAttribute("hidden", "");
      }

      const icon = header.querySelector(".toggle-icon");
      if (icon) {
        icon.textContent = isHidden ? "−" : "+";
      }
    });
  });
}

function setupContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Förhindra att formuläret skickas någonstans
    
    const nameField = form.querySelector('input[name="name"]');
    const emailField = form.querySelector('input[name="email"]');
    const messageField = form.querySelector('textarea[name="message"]');
    const successEl = form.querySelector("[data-form-success]");

    let isValid = true;
    clearErrors(form);

    if (!nameField.value.trim() || nameField.value.trim().length < 2) {
      showError(nameField, "Ange ditt namn (minst 2 tecken).");
      isValid = false;
    }

    if (!isValidEmail(emailField.value)) {
      showError(emailField, "Ange en giltig e‑postadress.");
      isValid = false;
    }

    if (!messageField.value.trim() || messageField.value.trim().length < 20) {
      showError(messageField, "Skriv ett meddelande på minst 20 tecken.");
      isValid = false;
    }

    if (!isValid) {
      if (successEl) successEl.textContent = "";
      return;
    }

    // Visa bekräftelsemeddelande
    if (successEl) {
      successEl.textContent = "Tack! Ditt meddelande har mottagits. (Detta är en testversion - inget skickas.)";
      successEl.style.color = "#819891";
    }

    // Rensa formuläret efter 3 sekunder
    setTimeout(() => {
      form.reset();
      if (successEl) successEl.textContent = "";
      // Återställ meddelanderäknaren
      const counterEl = form.querySelector("[data-message-counter]");
      if (counterEl) counterEl.textContent = "0 / 800";
    }, 3000);
  });
}

function clearErrors(form) {
  const fields = form.querySelectorAll(".field-invalid");
  fields.forEach((field) => field.classList.remove("field-invalid"));

  const errors = form.querySelectorAll("[data-error]");
  errors.forEach((el) => (el.textContent = ""));
}

function showError(inputEl, message) {
  const field = inputEl.closest(".form-row");
  if (!field) return;
  field.classList.add("field-invalid");

  const errorEl = field.querySelector("[data-error]");
  if (errorEl) {
    errorEl.textContent = message;
  }
}

function isValidEmail(value) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(value.trim());
}

function setupMessageCounter() {
  const messageField = document.querySelector('textarea[name="message"]');
  const counterEl = document.querySelector("[data-message-counter]");
  if (!messageField || !counterEl) return;

  const maxLength = parseInt(messageField.getAttribute("maxlength") || "800", 10);

  const update = () => {
    const length = messageField.value.length;
    counterEl.textContent = `${length} / ${maxLength}`;
  };

  messageField.addEventListener("input", update);
  update();
}


