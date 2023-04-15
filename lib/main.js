const appContainer = document.querySelector(
  "div[data-container='virtual-keyboard']"
);

function createKey(label, note, frequency, callback) {
  const node_key = document.createElement("button");

  node_key.dataset.label = label;
  node_key.dataset.note = note;
  node_key.dataset.frequency = frequency;
  node_key.innerText = `${note} (${label})`;

  node_key.addEventListener("click", callback);

  return node_key;
}

function playSound({ frequency }) {
  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  oscillator.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.5);
}

async function handleCallback(ev) {
  const { label, note, frequency } = ev.currentTarget.dataset;
  return new Promise((resolve) => {
    resolve({ label, note, frequency, $: ev.currentTarget });
  });
}
const keys = [
  {
    label: "Do",
    note: "C",
    frequency: 261.63,
    handleCallback: (ev) => handleCallback(ev).then(playSound),
  },
  {
    label: "Ré",
    note: "D",
    frequency: 293.66,
    handleCallback: (ev) => handleCallback(ev).then(playSound),
  },
  {
    label: "Mi",
    note: "E",
    frequency: 329.63,
    handleCallback: (ev) => handleCallback(ev).then(playSound),
  },
  {
    label: "Fá",
    note: "F",
    frequency: 349.23,
    handleCallback: (ev) => handleCallback(ev).then(playSound),
  },
  {
    label: "Sol",
    note: "G",
    frequency: 392.0,
    handleCallback: (ev) => handleCallback(ev).then(playSound),
  },
  {
    label: "La",
    note: "A",
    frequency: 440.0,
    handleCallback: (ev) => handleCallback(ev).then(playSound),
  },
  {
    label: "Si",
    note: "B",
    frequency: 493.88,
    handleCallback: (ev) => handleCallback(ev).then(playSound),
  },
];

const elements = keys.map(({ label, note, frequency, handleCallback }) => {
  return createKey(label, note, frequency, handleCallback);
});

appContainer.innerHTML = `
  <ul class="grid" id="keys">
  </ul>
`;

const keysContainer = document.querySelector("#keys");

elements.forEach((el) => {
  const item = document.createElement("li", {
    dataset: {
      id: el.note,
    },
  });

  item.appendChild(el);

  keysContainer.appendChild(item);
});
