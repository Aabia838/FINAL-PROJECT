// DOM element references
var userName = document.getElementById("userName");
var userEmail = document.getElementById("email"); // Fixed typo from 'userEamil' to 'userEmail'
var userPass = document.getElementById("password");
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");

// Signup function
function signupFunc() {
  let usersArray = localStorage.getItem("users");
  if (usersArray) {
    usersArray = JSON.parse(usersArray);
  } else {
    usersArray = []; // Initialize if no users exist
  }

  // Check if email is already in use
  for (var i = 0; i < usersArray.length; i++) {
    if (userEmail.value == usersArray[i].userEmail) {
      alert("Email already in use");
      return; // Exit function if email exists
    }
  }
  if (!userEmail.value || !userPass.value || !userName.value) {
    alert("All fields must be filled");
    return;
  }
  
  // Create new user object
  const userObj = {
    userName: userName.value,
    userEmail: userEmail.value,
    userPass: userPass.value,
  };

  // Add new user to usersArray and save back to localStorage
  usersArray.push(userObj);
  localStorage.setItem("users", JSON.stringify(usersArray));

  // Clear the input fields
  userName.value = "";
  userEmail.value = "";
  userPass.value = "";

  alert("Signed up successfully");
}

// Login function
function loginFunc() {
  let usersArray = JSON.parse(localStorage.getItem("users"));
  if (!usersArray) {
    alert("No users found. Please sign up first.");
    return;
  }

  var flag = false;
  for (var i = 0; i < usersArray.length; i++) {
    if (
      loginEmail.value == usersArray[i].userEmail &&
      loginPassword.value == usersArray[i].userPass
    ) {
      flag = true;
      alert("Logged in successfully");
      // Optionally, redirect to the home page or store login state
      // Example: window.location.href = "home.html";
      break; // Exit the loop after successful login
    }
  }

  if (!flag) {
    alert("Please enter correct credentials");
  }
}

