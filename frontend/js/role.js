// ===============================
// Check Login
// ===============================

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {

    alert("Please Login First!");

    window.location.href = "login.html";

}


// ===============================
// Hide Menus Based on Role
// ===============================

function hideMenu(className) {

    const menu = document.querySelector(className);

    if (menu) {

        menu.style.display = "none";

    }

}


// ===============================
// Admin
// ===============================

if (user.role === "Admin") {

    console.log("Admin Login");

}


// ===============================
// Doctor
// ===============================

if (user.role === "Doctor") {

    hideMenu(".menu-doctors");

    hideMenu(".menu-billing");

    hideMenu(".menu-pharmacy");

    hideMenu(".menu-reports");

}


// ===============================
// Receptionist
// ===============================

if (user.role === "Receptionist") {

    hideMenu(".menu-doctors");

    hideMenu(".menu-pharmacy");

    hideMenu(".menu-reports");

}


// ===============================
// Logout
// ===============================

const logout = document.querySelector('a[href="login.html"]');

if (logout) {

    logout.addEventListener("click", function () {

        localStorage.removeItem("user");

    });

}