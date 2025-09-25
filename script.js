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

// Show personalized greeting
function showGreeting(name, team) {
  const teamNames = {
    water: "Team Water Wise",
    zero: "Team Net Zero",
    power: "Team Renewables",
  };

  greetingEl.textContent = `Welcome, ${name}! You've been checked into ${teamNames[team]}.`;
}
function updateCounts() {
  attendeeCountEl.textContent = allAttendees.length;
  const progress = (allAttendees.length / TOTAL_CAPACITY) * 100;
  progressBar.style.width = `${progress}%`;

  for (const team in teams) {
    teamCounts[team].textContent = teams[team].length;
  }

  // 🎉 Celebration trigger
  if (allAttendees.length === TOTAL_CAPACITY) {
    const winningTeam = getWinningTeam();
    alert(`🎉 Attendance goal reached! ${winningTeam} has the most attendees!`);
  }
}

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
// Save to localStorage
function saveProgress() {
  localStorage.setItem("attendees", JSON.stringify(allAttendees));
  localStorage.setItem("teams", JSON.stringify(teams));
}

// Load from localStorage
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

// Call on page load
window.addEventListener("load", loadProgress);

// Call after each check-in
form.addEventListener("submit", function (e) {
  // ... existing check-in logic ...
  saveProgress();
});
