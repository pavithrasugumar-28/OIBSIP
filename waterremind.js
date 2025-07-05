let reminderTimeout = null;
const intervalInput = document.getElementById("intervalInput");
const darkToggle = document.getElementById("darkModeToggle");
const voiceToggle = document.getElementById("voiceToggle");
const statusEl = document.getElementById("status");
const emojiContainer = document.getElementById("emojiContainer");
const currentTimeDisplay = document.getElementById("currentTime");
const nextReminderDisplay = document.getElementById("nextReminder");

let femaleVoice = null;

// 🌙 Dark Mode
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
  darkToggle.checked = true;
}
darkToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", darkToggle.checked);
});

// 🗣️ Voice setup
function loadVoices() {
  const voices = speechSynthesis.getVoices();
  femaleVoice = voices.find(v =>
    /female/i.test(v.name) ||
    v.name.toLowerCase().includes("zira") ||
    (v.lang.startsWith("en") && v.name.toLowerCase().includes("female"))
  ) || voices.find(v => v.lang.startsWith("en"));
}
speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

// 🕒 Clock
function updateClock() {
  const now = new Date();
  currentTimeDisplay.innerText = "Current Time: " + now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// 🧠 Reminder logic
function startReminder() {
  const delayMinutes = parseInt(intervalInput.value);
  if (isNaN(delayMinutes) || delayMinutes < 1) {
    alert("Please enter a valid number of minutes.");
    return;
  }

  const now = new Date();
  const next = new Date(now.getTime() + delayMinutes * 60000);
  nextReminderDisplay.innerText = "Next Reminder: " + next.toLocaleTimeString();

  statusEl.innerText = `🔔 Reminder set for ${delayMinutes} minute(s) from now...`;

  reminderTimeout = setTimeout(() => {
    if (voiceToggle.checked) {
      const msg = new SpeechSynthesisUtterance("💧 Time to drink water!");
      msg.voice = femaleVoice || null;
      msg.pitch = 1;
      msg.rate = 1;
      speechSynthesis.speak(msg);
    }

    alert("💧 Time to drink water!");
    statusEl.innerText = "✅ Reminder triggered. Start again if needed.";
    nextReminderDisplay.innerText = "Next Reminder: --:--";
  }, delayMinutes * 60000);
}

function stopReminder() {
  clearTimeout(reminderTimeout);
  statusEl.innerText = "⏸️ Reminder stopped.";
  nextReminderDisplay.innerText = "Next Reminder: --:--";
}

// 💫 Emoji Magic
const emojiList = ["💧", "🚰", "🥤", "🫗", "💙"];

function createFloatingEmoji() {
  const emoji = document.createElement("span");
  emoji.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];
  emoji.classList.add("floaty");

  emoji.style.left = Math.random() * 100 + "%";
  emoji.style.top = "100vh";
  emoji.style.fontSize = (20 + Math.random() * 12) + "px";
  emoji.style.opacity = 0;

  const duration = 9 + Math.random() * 4;
  emoji.style.animationDuration = `${duration}s`;

  emojiContainer.appendChild(emoji);
  setTimeout(() => emoji.remove(), duration * 1000);
}
setInterval(createFloatingEmoji, 600);