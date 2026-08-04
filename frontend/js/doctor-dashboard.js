// ===============================
// Check Doctor Login
// ===============================

const user = JSON.parse(localStorage.getItem("user"));

if (!user || user.role !== "Doctor") {

    alert("Access Denied!");

    window.location.href = "login.html";

}


// ===============================
// Welcome Doctor
// ===============================

document.getElementById("doctorName").innerHTML =
    `Welcome Dr. ${user.username} 👨‍⚕️`;


// ===============================
// Load Dashboard Data
// ===============================

async function loadDashboard() {

    try {

        const response = await fetch("https://smart-hospital-s6ag.onrender.com/api/dashboard");

        const data = await response.json();

        document.getElementById("totalPatients").innerText =
            data.totalPatients;

        document.getElementById("todayAppointments").innerText =
            data.totalAppointments;

        document.getElementById("completedAppointments").innerText =
            data.totalAppointments;

    }

    catch (error) {

        console.log(error);

    }

}

loadDashboard();


// ===============================
// Load Today's Appointments
// ===============================

async function loadAppointments() {

    try {

        const response = await fetch(
            "https://smart-hospital-s6ag.onrender.com/api/appointments"
        );

        const appointments = await response.json();

        const tbody =
            document.querySelector("#appointmentTable tbody");

        tbody.innerHTML = "";

        appointments.slice(0, 5).forEach(app => {

            tbody.innerHTML += `

            <tr>

                <td>${app.patient_name}</td>

                <td>${app.appointment_time}</td>

                <td>${app.status}</td>

            </tr>

            `;

        });

    }

    catch (error) {

        console.log(error);

    }

}

loadAppointments();


// ===============================
// Logout
// ===============================

document.getElementById("logoutBtn")
.addEventListener("click", () => {

    localStorage.removeItem("user");

});