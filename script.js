var startButton = document.getElementById("startButton");
var welcomeSection = document.getElementById("welcomeSection");
var loginSection = document.getElementById("loginSection");
var successSection = document.getElementById("successSection");
var diarySection = document.getElementById("diarySection");
var submitBtn = document.getElementById("submitBtn");
var proceedBtn = document.getElementById("proceedBtn");
var saveBtn = document.getElementById("saveBtn");
var diaryInput = document.getElementById("diaryInput");
var entriesList = document.getElementById("entriesList");
var exitBtn = document.getElementById("exitBtn");

var currentUser = null;
var entries = [
  { username: "john", password: "galingana" }
];

startButton.addEventListener("click", function() {
  welcomeSection.style.display = "none";
  loginSection.style.display = "block";
});

submitBtn.addEventListener("click", function() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  if (username && password) {
    var userExists = entries.find(function(entry) {
      return entry.username === username && entry.password === password;
    });

    if (userExists) {
      currentUser = username;
      loginSection.style.display = "none";
      successSection.style.display = "block";
      proceedBtn.focus();
      loadEntries(currentUser);
      renderEntries(currentUser);
    } else {
      alert("Invalid username or password.");
    }
  } else {
    alert("Please enter both username and password.");
  }
});

proceedBtn.addEventListener("click", function() {
  successSection.style.display = "none";
  diarySection.style.display = "block";
  diaryInput.focus();
});

saveBtn.addEventListener("click", function() {
  if (currentUser) {
    var entry = diaryInput.value.trim();

    if (entry) {
      entries.push({ username: currentUser, entry: entry });
      saveEntries(currentUser);
      renderEntries(currentUser);
      diaryInput.value = "";
      diaryInput.focus();
    } else {
      alert("Please enter a diary entry.");
    }
  }
});

exitBtn.addEventListener("click", function() {
  welcomeSection.style.display = "none";
  loginSection.style.display = "block";
  successSection.style.display = "none";
  diarySection.style.display = "none";
  currentUser = null; // Resetting the currentUser variable
  entries = [{ username: "john", password: "galingana" }]; // Resetting the entries array

  // Clearing the username and password fields
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
});

function saveEntries(username) {
  localStorage.setItem("entries_" + username, JSON.stringify(entries));
}

function loadEntries(username) {
  var storedEntries = localStorage.getItem("entries_" + username);
  if (storedEntries) {
    entries = JSON.parse(storedEntries);
  }
}

function renderEntries(username) {
  entriesList.innerHTML = "";
  entries.forEach(function(entry, index) {
    if (entry.username === username) {
      var li = document.createElement("li");
      li.textContent = entry.entry;

      var deleteBtn = document.createElement("button");
      deleteBtn.className = "deleteBtn";
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", function() {
        deleteEntry(username, index);
      });

      li.appendChild(deleteBtn);
      entriesList.appendChild(li);
    }
  });
}

function deleteEntry(username, index) {
  entries.splice(index, 1);
  saveEntries(username);
  renderEntries(username);
}
