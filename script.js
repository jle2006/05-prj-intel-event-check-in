// Constants
const TOTAL_CAPACITY = 50;
const teams = {
  water: [],
  zero: [],
  power: [],
};
let allAttendees = [];

// DOM Elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCountEl = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greetingEl = document.getElementById("greeting");
const resetBtn = document.getElementById("resetBtn");
const teamCounts = {
  water: document.getElementById("waterCount"),
  zero: document.getElementById("zeroCount"),
  power: document.getElementById("powerCount"),
};

// Submit handler
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const team = teamSelect.value;

  if (!name || !team || !teams.hasOwnProperty(team)) {
    alert("Please enter a valid name and select a team.");
    return;
  }

  if (allAttendees.includes(name)) {
    alert(`${name} has already checked in.`);
    return;
  }

  if (allAttendees.length >= TOTAL_CAPACITY) {
    alert("Attendance limit reached.");
    return;
  }

  teams[team].push(name);
  allAttendees.push(name);

  updateCounts();
  showGreeting(name, team);
  saveProgress();
  form.reset();
});

// Greeting
function showGreeting(name, team) {
}