// ===============================
// Date & Time
// ===============================

function updateDateTime() {

    const now = new Date();

    document.getElementById("dateTime").innerHTML =
        "📅 " + now.toLocaleString();

}

setInterval(updateDateTime, 1000);

updateDateTime();


// ===============================
// Dashboard Cards
// ===============================

async function loadDashboard() {

    try {

        const response = await fetch("http://localhost:5000/api/dashboard");

        const data = await response.json();

        document.getElementById("totalPatients").innerText =
            data.totalPatients;

        document.getElementById("totalDoctors").innerText =
            data.totalDoctors;

        document.getElementById("totalAppointments").innerText =
            data.totalAppointments;

        document.getElementById("totalBills").innerText =
            data.totalBills;

        if (document.getElementById("totalMedicines")) {

            document.getElementById("totalMedicines").innerText =
                data.totalMedicines;

        }

    }

    catch (error) {

        console.log(error);

    }

}

loadDashboard();


// ===============================
// Recent Patients
// ===============================

async function loadRecentPatients() {

    try {

        const response = await fetch("http://localhost:5000/api/patients");

        const patients = await response.json();

        const tbody = document.querySelector("#recentPatientsTable tbody");

        tbody.innerHTML = "";

        patients.slice(0, 5).forEach(patient => {

            tbody.innerHTML += `

            <tr>

                <td>${patient.full_name}</td>

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
// Recent Appointments
// ===============================

async function loadRecentAppointments() {

    try {

        const response = await fetch("http://localhost:5000/api/appointments");

        const appointments = await response.json();

        const tbody =
            document.querySelector("#recentAppointmentsTable tbody");

        tbody.innerHTML = "";

        appointments.slice(0, 5).forEach(app => {

            tbody.innerHTML += `

            <tr>

                <td>${app.patient_name}</td>

                <td>${app.doctor_name}</td>

            </tr>

            `;

        });

    }

    catch (error) {

        console.log(error);

    }

}

loadRecentAppointments();


// ===============================
// Chart
// ===============================

const ctx = document.getElementById("hospitalChart");

if (ctx) {

    fetch("http://localhost:5000/api/dashboard")

        .then(res => res.json())

        .then(data => {

            new Chart(ctx, {

                type: "bar",

                data: {

                    labels: [

                        "Patients",

                        "Doctors",

                        "Appointments",

                        "Bills",

                        "Medicines"

                    ],

                    datasets: [{

                        label: "Hospital Report",

                        data: [

                            data.totalPatients,

                            data.totalDoctors,

                            data.totalAppointments,

                            data.totalBills,

                            data.totalMedicines

                        ]

                    }]

                }

            });

        });

}