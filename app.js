// DOM element references
var userName = document.getElementById("userName");
var userEmail = document.getElementById("email"); 
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

  // Basic email validation
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(userEmail.value)) {
    alert("Please enter a valid email");
    return;
  }

  // Basic password validation
  if (userPass.value.length < 6) {
    alert("Password must be at least 6 characters long");
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
      
      // Store logged-in state in localStorage
      localStorage.setItem("loggedIn", true);
      
      // Redirect to the dashboard page
      window.location.href = "dashboard.html"; // Assuming your dashboard page is called 'dashboard.html'
      break;
    }
  }

  if (!flag) {
    alert("Please enter correct credentials");
  }
}


// Logout function
function logoutFunc() {
  localStorage.removeItem("loggedIn"); // Clear logged-in state
  alert("Logged out successfully");
  // Redirect to the login page
  // Example: window.location.href = "login.html";
}
