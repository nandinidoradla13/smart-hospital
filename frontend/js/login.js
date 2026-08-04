// ===============================
// Show Login / Register
// ===============================

const loginSection = document.getElementById("loginSection");
const registerSection = document.getElementById("registerSection");

document.getElementById("showRegister").addEventListener("click", (e) => {

    e.preventDefault();

    loginSection.style.display = "none";

    registerSection.style.display = "block";

});

document.getElementById("showLogin").addEventListener("click", (e) => {

    e.preventDefault();

    registerSection.style.display = "none";

    loginSection.style.display = "block";

});


// ===============================
// Register
// ===============================

document.getElementById("registerForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const user = {

        username: document.getElementById("username").value,

        email: document.getElementById("registerEmail").value,

        password: document.getElementById("registerPassword").value,

        role: document.getElementById("role").value

    };

    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/register",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(user)

            }
        );

        const data = await response.json();

        alert(data.message);

        if (response.ok) {

            registerSection.style.display = "none";

            loginSection.style.display = "block";

            document.getElementById("registerForm").reset();

        }

    }

    catch (error) {

        console.log(error);

        alert("Registration Failed");

    }

});


// ===============================
// Login
// ===============================

document.getElementById("loginForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;

    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    email,

                    password

                })

            }
        );

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        // Save User
        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        alert("Login Successful");

        // Role Redirect

        if (data.user.role === "Admin") {

            window.location.href = "dashboard.html";

        }

        else if (data.user.role === "Doctor") {

            window.location.href = "doctor-dashboard.html";

        }

        else {

            window.location.href =
                "reception-dashboard.html";

        }

    }

    catch (error) {

        console.log(error);

        alert("Server Error");

    }

});