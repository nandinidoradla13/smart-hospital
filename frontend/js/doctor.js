let editDoctorId = null;
let allDoctors = [];

async function loadDoctors() {

    try {

        const response = await fetch("https://smart-hospital-backend-r2mu.onrender.com/api/doctors");

        const doctors = await response.json();
          allDoctors = doctors;

        displayDoctors(doctors);

    } catch (error) {

        console.log(error);

        alert("Unable to load doctors.");

    }

}

loadDoctors();
function displayDoctors(doctors) {

    const table = document.getElementById("doctorTable");

    table.innerHTML = "";

    doctors.forEach(doctor => {

        table.innerHTML += `
        <tr>

            <td>${doctor.id}</td>
            <td>${doctor.full_name}</td>
            <td>${doctor.specialization}</td>
            <td>${doctor.experience} Years</td>
            <td>${doctor.phone}</td>
            <td>₹${doctor.consultation_fee}</td>

            <td>

                <button class="edit-btn"
                    onclick="editDoctor(${doctor.id})">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteDoctor(${doctor.id})">
                    Delete
                </button>

            </td>

        </tr>
        `;

    });

}
const modal = document.getElementById("doctorModal");

document.getElementById("addDoctorBtn").onclick = () => {

    modal.style.display = "flex";

};

document.getElementById("closeDoctorModal").onclick = () => {

    modal.style.display = "none";

};

window.onclick = (e) => {

    if (e.target == modal) {

        modal.style.display = "none";

    }

};
const doctorForm = document.getElementById("doctorForm");

doctorForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const doctor = {

        full_name: document.getElementById("full_name").value,
        specialization: document.getElementById("specialization").value,
        experience: document.getElementById("experience").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        consultation_fee: document.getElementById("consultation_fee").value

    };

    try {

        const url = editDoctorId
          ? `https://smart-hospital-backend-r2mu.onrender.com/api/doctors/${editDoctorId}`
        :"https://smart-hospital-backend-r2mu.onrender.com/api/doctors";

       const method = editDoctorId ? "PUT" : "POST";

       const response = await fetch(url, {
    method,

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(doctor)

        });

        const data = await response.json();

        alert(data.message);

        doctorForm.reset();
        editDoctorId = null;

        modal.style.display = "none";

        loadDoctors();

    } catch (error) {

        console.log(error);

        alert("Unable to add doctor.");

    }

});
async function deleteDoctor(id) {

    const confirmDelete = confirm("Are you sure you want to delete this doctor?");

    if (!confirmDelete) return;

    try {

        const response = await fetch(`https://smart-hospital-backend-r2mu.onrender.com/api/doctors/${id}`, {

            method: "DELETE"

        });

        const data = await response.json();

        alert(data.message);

        loadDoctors();

    } catch (error) {

        console.log(error);

        alert("Unable to delete doctor.");

    }

}
async function editDoctor(id) {

    editDoctorId = id;

    const doctor = allDoctors.find(d => d.id == id);

    if (!doctor) return;

    document.getElementById("full_name").value = doctor.full_name;
    document.getElementById("specialization").value = doctor.specialization;
    document.getElementById("experience").value = doctor.experience;
    document.getElementById("phone").value = doctor.phone;
    document.getElementById("email").value = doctor.email;
    document.getElementById("consultation_fee").value = doctor.consultation_fee;

    modal.style.display = "flex";
}
// Search Doctor

document.getElementById("searchInput").addEventListener("input", function () {

    const search = this.value.toLowerCase();

    const filteredDoctors = allDoctors.filter(doctor =>

        doctor.full_name.toLowerCase().includes(search) ||
        doctor.specialization.toLowerCase().includes(search) ||
        doctor.phone.toLowerCase().includes(search)

    );

    displayDoctors(filteredDoctors);

});