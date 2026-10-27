const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

$("#year").textContent = new Date().getFullYear();

const nav = $("#nav");
$("#menuToggle").addEventListener("click", () => nav.classList.toggle("open"));
$$("nav a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));

const toast = $("#toast");
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

$("#copyId").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("626228171");
    showToast("Player ID copied!");
  } catch {
    showToast("Player ID: 626228171");
  }
});

$("#showGameTip").addEventListener("click", () => {
  const tip = $("#gameTip");
  tip.hidden = !tip.hidden;
  $("#showGameTip").innerHTML = tip.hidden ? 'Reveal a Selena tip <span>↗</span>' : 'Hide Selena tip <span>↑</span>';
});

const lightbox = $("#lightbox");
$$(".gallery-item").forEach(item => item.addEventListener("click", () => {
  $("#lightboxImage").src = item.dataset.full;
  lightbox.hidden = false;
}));
$("#lightboxClose").addEventListener("click", () => lightbox.hidden = true);
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) lightbox.hidden = true;
});

const secretModal = $("#secretModal");
let secretClicks = 0;
let secretClickTimer;
$("#secretTrigger").addEventListener("click", () => {
  secretClicks++;
  clearTimeout(secretClickTimer);
  if (secretClicks >= 3) {
    secretModal.hidden = false;
    secretClicks = 0;
  } else {
    showToast("Hmm... there's a little secret here.");
    secretClickTimer = setTimeout(() => secretClicks = 0, 1800);
  }
});
$("#secretClose").addEventListener("click", () => secretModal.hidden = true);
secretModal.addEventListener("click", event => {
  if (event.target === secretModal) secretModal.hidden = true;
});

// Easter egg: type "riam" anywhere outside a text field to reveal the hidden note.
let secretKeys = "";
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    lightbox.hidden = true;
    secretModal.hidden = true;
  }
  if (event.target.matches("input, textarea, [contenteditable='true']")) return;
  secretKeys = (secretKeys + event.key.toLowerCase()).slice(-4);
  if (secretKeys === "riam") {
    secretModal.hidden = false;
    secretKeys = "";
  }
});
