// ===============================
// Check Receptionist Login
// ===============================

const user = JSON.parse(localStorage.getItem("user"));

if (!user || user.role !== "Receptionist") {

    alert("Access Denied!");

    window.location.href = "login.html";

}


// ===============================
// Welcome Receptionist
// ===============================

document.getElementById("receptionName").innerHTML =
    `Welcome ${user.username} 👩‍💼`;


// ===============================
// Load Dashboard Data
// ===============================

async function loadDashboard() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/dashboard"
        );

        const data = await response.json();

        document.getElementById("totalPatients").innerText =
            data.totalPatients;

        document.getElementById("totalAppointments").innerText =
            data.totalAppointments;

        document.getElementById("totalBills").innerText =
            data.totalBills;

    }

    catch (error) {

        console.log("Dashboard Error:", error);

    }

}

loadDashboard();


// ===============================
// Recent Patients
// ===============================

async function loadRecentPatients() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/patients"
        );

        const patients = await response.json();

        const tbody =
            document.querySelector("#recentPatientsTable tbody");

        if (!tbody) return;

        tbody.innerHTML = "";

        patients.slice(0, 5).forEach(patient => {

            tbody.innerHTML += `

            <tr>

                <td>${patient.full_name}</td>

                <td>${patient.phone}</td>

                <td>${patient.disease}</td>

            </tr>

            `;

        });

    }

    catch (error) {

        console.log(error);

    }

}

loadRecentPatients();


// ===============================
// Logout
// ===============================

document.getElementById("logoutBtn")
.addEventListener("click", () => {

    localStorage.removeItem("user");

});