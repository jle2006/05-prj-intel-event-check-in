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
  const teamNames = {
    water: "Team Water Wise",
    zero: "Team Net Zero",
    power: "Team Renewables",
  };
  greetingEl.textContent = `Welcome, ${name}! You've been checked into ${teamNames[team]}.`;
}

// Update UI
function updateCounts() {
  attendeeCountEl.textContent = allAttendees.length;
  const progress = (allAttendees.length / TOTAL_CAPACITY) * 100;
  progressBar.style.width = `${progress}%`;

  for (const team in teams) {
    teamCounts[team].textContent = teams[team].length;

    const listEl = document.getElementById(`${team}List`);
    listEl.innerHTML = "";
    teams[team].forEach((name) => {
      const li = document.createElement("li");
      li.textContent = name;
      listEl.appendChild(li);
    });
  }

  if (allAttendees.length === TOTAL_CAPACITY) {
    const winningTeam = getWinningTeam();
    alert(`🎉 Attendance goal reached! ${winningTeam} has the most attendees!`);
  }
}

// Determine winning team
function getWinningTeam() {
  let max = 0;
  let winner = "No team";
  for (const team in teams) {
    if (teams[team].length > max) {
      max = teams[team].length;
      winner = {
        water: "Team Water Wise",
        zero: "Team Net Zero",
        power: "Team Renewables",
      }[team];
    }
  }
  return winner;
}

// Save progress
function saveProgress() {
  localStorage.setItem("attendees", JSON.stringify(allAttendees));
  localStorage.setItem("teams", JSON.stringify(teams));
}

// Load progress
function loadProgress() {
  const savedAttendees = JSON.parse(localStorage.getItem("attendees"));
  const savedTeams = JSON.parse(localStorage.getItem("teams"));

  if (savedAttendees && savedTeams) {
    allAttendees = savedAttendees;
    for (const team in teams) {
      teams[team] = savedTeams[team] || [];
    }
    updateCounts();
  }
}

// Reset button
resetBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to reset all check-ins?")) {
    // Clear only relevant keys
    localStorage.removeItem("attendees");
    localStorage.removeItem("teams");

    // Reset data
    allAttendees = [];
    for (const team in teams) {
      teams[team] = [];
    }

    // Clear greeting and update UI
    greetingEl.textContent = "";
    updateCounts();
  }
});

// Load on page start
window.addEventListener("load", loadProgress);

// ...existing code...

// Greeting
function showGreeting(name, team) {

