const themeLabel = document.getElementById("themeLabel");
const styleLabel = document.getElementById("styleLabel");
const vibeLabel = document.getElementById("vibeLabel");
const headlineText = document.getElementById("headlineText");
const supportText = document.getElementById("supportText");
const tickerText = document.getElementById("tickerText");
const darkModeButton = document.getElementById("darkModeButton");
const lightModeButton = document.getElementById("lightModeButton");
const accentButton = document.getElementById("accentButton");
const styleButtons = Array.from(document.querySelectorAll(".style-button"));
const stars = document.getElementById("stars");

const styles = ["signal", "ion", "vector"];

const styleContent = {
  signal: {
    label: "Signal blue",
    vibe: "Precise and premium",
    headline: "High-trust interfaces with real motion discipline.",
    support: "Finally AI Agency combines AI-assisted speed with strong taste, making launch pages, product experiences, and branded demos feel custom.",
    ticker: "Signal blue system active"
  },
  ion: {
    label: "Ion violet",
    vibe: "Strategic and modern",
    headline: "A sharper visual system for brands that need presence without noise.",
    support: "This mode pushes the tech signal a little further while keeping the typography, structure, and motion presentation-ready.",
    ticker: "Ion violet system active"
  },
  vector: {
    label: "Vector mint",
    vibe: "Calm technical confidence",
    headline: "Cleaner energy for premium brands with a more restrained tone.",
    support: "Vector mint shifts the page into a lighter-feeling, enterprise-friendly direction without losing the agency signature.",
    ticker: "Vector mint system active"
  }
};

let currentStyleIndex = 0;

function setTheme(theme) {
  const isDark = theme === "dark";
  document.body.dataset.theme = theme;
  themeLabel.textContent = isDark ? "Dark mode" : "Light mode";
  darkModeButton.classList.toggle("is-active", isDark);
  lightModeButton.classList.toggle("is-active", !isDark);
}

function setStyle(style) {
  const content = styleContent[style];
  document.body.dataset.style = style;
  styleLabel.textContent = content.label;
  vibeLabel.textContent = content.vibe;
  headlineText.textContent = content.headline;
  supportText.textContent = content.support;
  tickerText.textContent = content.ticker;
  currentStyleIndex = styles.indexOf(style);

  styleButtons.forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.style === style);
  });
}

function createStars(total = 48) {
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < total; index += 1) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 72}%`;
    star.style.opacity = (0.28 + Math.random() * 0.52).toFixed(2);
    star.style.setProperty("--duration", `${4 + Math.random() * 6}s`);
    fragment.appendChild(star);
  }

  stars.replaceChildren(fragment);
}

function createPulse(originX, originY, count = 12) {
  for (let index = 0; index < count; index += 1) {
    const pulse = document.createElement("span");
    pulse.className = "star";
    pulse.style.left = `${originX}px`;
    pulse.style.top = `${originY}px`;
    pulse.style.opacity = "1";
    pulse.style.transform = "scale(1.8)";
    pulse.style.setProperty("--duration", `${0.8 + Math.random() * 0.8}s`);
    document.body.appendChild(pulse);
    const animation = pulse.animate(
      [
        { transform: "translate(0, 0) scale(0.8)", opacity: 1 },
        {
          transform: `translate(${(Math.random() - 0.5) * 140}px, ${(Math.random() - 0.5) * 120}px) scale(0.1)`,
          opacity: 0
        }
      ],
      { duration: 900, easing: "ease-out" }
    );
    animation.addEventListener("finish", () => pulse.remove(), { once: true });
  }
}

function cycleStyle() {
  currentStyleIndex = (currentStyleIndex + 1) % styles.length;
  setStyle(styles[currentStyleIndex]);
  createPulse(window.innerWidth * 0.76, window.innerHeight * 0.36, 10);
}

darkModeButton.addEventListener("click", () => setTheme("dark"));
lightModeButton.addEventListener("click", () => setTheme("light"));
accentButton.addEventListener("click", cycleStyle);

styleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setStyle(button.dataset.style);
    const rect = button.getBoundingClientRect();
    createPulse(rect.left + rect.width / 2, rect.top + rect.height / 2, 8);
  });
});

window.addEventListener("pointermove", (event) => {
  if (Math.random() > 0.012) {
    return;
  }

  createPulse(event.clientX, event.clientY, 3);
});

createStars();
setTheme("dark");
setStyle("signal");