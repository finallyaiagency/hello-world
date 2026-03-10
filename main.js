const themes = [
  {
    id: "neon-sunrise",
    mood: "Neon daydream",
    title: "CSS skies with JavaScript fireflies.",
    description: "Tap the controls and the whole place changes personality without losing the plot."
  },
  {
    id: "night-arcade",
    mood: "Midnight arcade",
    title: "The park lights flip on and the mountains start glowing.",
    description: "Same scene, different energy: cooler palette, sharper contrast, and a little more after-hours swagger."
  },
  {
    id: "mint-horizon",
    mood: "Mint horizon",
    title: "Soft sunlight, clean air, and a suspiciously photogenic river.",
    description: "This pass leans breezy and bright, like somebody color-graded your hello world on purpose."
  }
];

const particleField = document.getElementById("particleField");
const themeButton = document.getElementById("themeButton");
const burstButton = document.getElementById("burstButton");
const turboButton = document.getElementById("turboButton");
const moodLabel = document.getElementById("moodLabel");
const sceneTitle = document.getElementById("sceneTitle");
const sceneDescription = document.getElementById("sceneDescription");

let themeIndex = 0;
let autoBurstHandle = null;

function applyTheme(index) {
  const theme = themes[index];
  document.body.dataset.theme = theme.id;
  moodLabel.textContent = theme.mood;
  sceneTitle.textContent = theme.title;
  sceneDescription.textContent = theme.description;
}

function createParticle(x, y, driftX, driftY, hueOffset) {
  const particle = document.createElement("span");
  particle.className = "particle";
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  particle.style.setProperty("--drift-x", `${driftX}px`);
  particle.style.setProperty("--drift-y", `${driftY}px`);
  particle.style.background = `radial-gradient(circle, hsl(${hueOffset} 100% 88%) 0%, hsla(${hueOffset} 100% 80% / 0.08) 78%)`;
  particle.style.boxShadow = `0 0 20px hsla(${hueOffset} 100% 75% / 0.85)`;
  particleField.appendChild(particle);
  particle.addEventListener("animationend", () => particle.remove(), { once: true });
}

function burstParticles(count = 16) {
  const bounds = particleField.getBoundingClientRect();

  for (let index = 0; index < count; index += 1) {
    const x = bounds.width * (0.18 + Math.random() * 0.64);
    const y = bounds.height * (0.22 + Math.random() * 0.52);
    const driftX = (Math.random() - 0.5) * 180;
    const driftY = -70 - Math.random() * 140;
    const hue = 32 + Math.round(Math.random() * 180);
    createParticle(x, y, driftX, driftY, hue);
  }
}

function rotateTheme() {
  themeIndex = (themeIndex + 1) % themes.length;
  applyTheme(themeIndex);
  burstParticles(20);
}

function setTurboMode(enabled) {
  document.body.dataset.turbo = String(enabled);
  turboButton.setAttribute("aria-pressed", String(enabled));
  turboButton.textContent = enabled ? "Turbo engaged" : "Turbo drift";

  window.clearInterval(autoBurstHandle);
  autoBurstHandle = enabled ? window.setInterval(() => burstParticles(8), 1200) : null;
}

themeButton.addEventListener("click", rotateTheme);
burstButton.addEventListener("click", () => burstParticles(22));
turboButton.addEventListener("click", () => {
  const nextState = document.body.dataset.turbo !== "true";
  setTurboMode(nextState);
  burstParticles(nextState ? 28 : 10);
});

window.addEventListener("pointermove", (event) => {
  if (Math.random() > 0.1) {
    return;
  }

  const rect = particleField.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
    return;
  }

  createParticle(x, y, (Math.random() - 0.5) * 90, -50 - Math.random() * 70, 40 + Math.round(Math.random() * 220));
});

applyTheme(themeIndex);
burstParticles(18);
