let editAppointmentId = null;
let allAppointments = [];
async function loadAppointments() {

    try {

        const response = await fetch("https://smart-hospital-s6ag.onrender.com/api/appointments");

        const appointments = await response.json();

        allAppointments = appointments;

        displayAppointments(appointments);

    } catch (error) {

        console.log(error);

        alert("Unable to load appointments.");

    }

}

loadAppointments();
function displayAppointments(appointments) {

    const table = document.getElementById("appointmentTable");

    table.innerHTML = "";

    appointments.forEach(appointment => {

        table.innerHTML += `
            <tr>
                <td>${appointment.id}</td>
                <td>${appointment.patient_name}</td>
                <td>${appointment.doctor_name}</td>
                <td>${appointment.appointment_date}</td>
                <td>${appointment.appointment_time}</td>
                <td>${appointment.status}</td>

                <td>
                    <button class="edit-btn"
                        onclick="editAppointment(${appointment.id})">
                        Edit
                    </button>

                    <button class="delete-btn"
                        onclick="deleteAppointment(${appointment.id})">
                        Cancel
                    </button>
                </td>
            </tr>
        `;

    });

}
const modal = document.getElementById("appointmentModal");

document.getElementById("addAppointmentBtn").onclick = () => {

    modal.style.display = "flex";

    loadPatients();
    loadDoctors();

};

document.getElementById("closeAppointmentModal").onclick = () => {

    modal.style.display = "none";

};

window.onclick = (e) => {

    if (e.target == modal) {

        modal.style.display = "none";

    }

};
async function loadPatients() {

    const response = await fetch("https://smart-hospital-s6ag.onrender.com/api/patients");

    const patients = await response.json();

    const select = document.getElementById("patient_id");

    select.innerHTML = '<option value="">Select Patient</option>';

    patients.forEach(patient => {

        select.innerHTML += `
            <option value="${patient.id}">
                ${patient.full_name}
            </option>
        `;

    });

}
async function loadDoctors() {

    const response = await fetch("https://smart-hospital-s6ag.onrender.com/api/doctors");

    const doctors = await response.json();

    const select = document.getElementById("doctor_id");

    select.innerHTML = '<option value="">Select Doctor</option>';

    doctors.forEach(doctor => {

        select.innerHTML += `
            <option value="${doctor.id}">
                ${doctor.full_name}
            </option>
        `;

    });

}
const appointmentForm = document.getElementById("appointmentForm");

appointmentForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const appointment = {

        patient_id: document.getElementById("patient_id").value,
        doctor_id: document.getElementById("doctor_id").value,
        appointment_date: document.getElementById("appointment_date").value,
        appointment_time: document.getElementById("appointment_time").value,
        status: document.getElementById("status").value

    };

    try {

        const url = editAppointmentId
    ? `https://smart-hospital-s6ag.onrender.com/api/appointments/${editAppointmentId}`
    : "https://smart-hospital-s6ag.onrender.com/api/appointments";

const method = editAppointmentId ? "PUT" : "POST";

const response = await fetch(url, {
    method,

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(appointment)

        });

        const data = await response.json();

        alert(data.message);

        appointmentForm.reset();
        editAppointmentId = null;

        modal.style.display = "none";

        loadAppointments();

    } catch (error) {

        console.log(error);

        alert("Unable to book appointment.");

    }

});
async function editAppointment(id) {

    editAppointmentId = id;
    await loadPatients();
await loadDoctors();

    const appointment = allAppointments.find(a => a.id == id);

    if (!appointment) return;

    // Patient Dropdown
    document.getElementById("patient_id").value =
        appointment.patient_id;

    // Doctor Dropdown
    document.getElementById("doctor_id").value =
        appointment.doctor_id;

    // Date
    document.getElementById("appointment_date").value =
        appointment.appointment_date;

    // Time
    document.getElementById("appointment_time").value =
        appointment.appointment_time;

    // Status
    document.getElementById("status").value =
        appointment.status;

    // Open Modal
    modal.style.display = "flex";

}
async function deleteAppointment(id) {

    const confirmDelete = confirm(
        "Are you sure you want to cancel this appointment?"
    );

    if (!confirmDelete) return;

    try {

        const response = await fetch(
            `https://smart-hospital-s6ag.onrender.com/api/appointments/${id}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        alert(data.message);

        loadAppointments();

    } catch (error) {

        console.log(error);

        alert("Unable to cancel appointment.");

    }

}
// Search Appointment

document.getElementById("searchAppointment").addEventListener("input", function () {

    const search = this.value.toLowerCase();

    const filteredAppointments = allAppointments.filter(appointment =>

        appointment.patient_name.toLowerCase().includes(search) ||
        appointment.doctor_name.toLowerCase().includes(search) ||
        appointment.status.toLowerCase().includes(search)

    );

    displayAppointments(filteredAppointments);

});