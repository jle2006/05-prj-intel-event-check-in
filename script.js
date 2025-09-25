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
const teamCounts = {
  water: document.getElementById("waterCount"),
  zero: document.getElementById("zeroCount"),
  power: document.getElementById("powerCount"),
};

// Event Listener
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

  // Update data
  teams[team].push(name);
  allAttendees.push(name);

  // Update UI
  updateCounts();
  showGreeting(name, team);
  form.reset();
});

// Update attendance and team counts
function updateCounts() {
  attendeeCountEl.textContent = allAttendees.length;

  // Update progress bar
  const progress = (allAttendees.length / TOTAL_CAPACITY) * 100;
  progressBar.style.width = `${progress}%`;

  // Update team counts
  for (const team in teams) {
    teamCounts[team].textContent = teams[team].length;
  }
}

// Show personalized greeting
function showGreeting(name, team) {
  const teamNames = {
    water: "Team Water Wise",
    zero: "Team Net Zero",
    power: "Team Renewables",
  };

  greetingEl.textContent = `Welcome, ${name}! You've been checked into ${teamNames[team]}.`;
}
