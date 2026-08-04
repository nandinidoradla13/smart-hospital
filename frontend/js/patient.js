let editPatientId = null;
let allPatients = [];
async function loadPatients() {
    try {

        const response = await fetch("https://smart-hospital-backend-r2mu.onrender.com/api/patients");

        const patients = await response.json();
        allPatients = patients;

        displayPatients(patients);
    }catch (error) {

        console.log(error);
        alert("Unable to load patients.");

    }
}

loadPatients();

function displayPatients(patients){

    const table = document.getElementById("patientTable");

    table.innerHTML = "";

    patients.forEach(patient=>{

        table.innerHTML += `
        <tr>

            <td>${patient.id}</td>
            <td>${patient.full_name}</td>
            <td>${patient.age}</td>
            <td>${patient.gender}</td>
            <td>${patient.phone}</td>
            <td>${patient.disease}</td>

            <td>

                <button class="edit-btn" onclick="editPatient(${patient.id})">
                    Edit
                </button>

                <button class="delete-btn" onclick="deletePatient(${patient.id})">
                    Delete
                </button>

            </td>

        </tr>
        `;

    });

}
const modal = document.getElementById("patientModal");

document.getElementById("addPatientBtn").onclick = () => {
    modal.style.display = "flex";
};

document.getElementById("closeModal").onclick = () => {
    modal.style.display = "none";
};

window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
};
const patientForm = document.getElementById("patientForm");

patientForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const patient = {

        full_name: document.getElementById("full_name").value,
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        blood_group: document.getElementById("blood_group").value,
        disease: document.getElementById("disease").value

    };

    try {

        const url = editPatientId 
           ?`https://smart-hospital-backend-r2mu.onrender.com/api/patients/${editPatientId}`
           : "https://smart-hospital-backend-r2mu.onrender.com/api/patients";

       const method = editPatientId ? "PUT" : "POST";

          const response = await fetch(url, {
    method,

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(patient)

        });

        const data = await response.json();

        alert(data.message);

        modal.style.display = "none";

        patientForm.reset();
        editPatientId=null;

        loadPatients();

    } catch (error) {

        console.log(error);

        alert("Unable to save patient.");

    }

});
async function deletePatient(id) {

    const confirmDelete = confirm("Are you sure you want to delete this patient?");

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(`https://smart-hospital-backend-r2mu.onrender.com/api/patients/${id}`, {

            method: "DELETE"

        });

        const data = await response.json();

        alert(data.message);

        loadPatients();

    } catch (error) {

        console.log(error);

        alert("Unable to delete patient.");

    }

}

async function editPatient(id) {

    editPatientId = id;

   const response = await fetch("https://smart-hospital-backend-r2mu.onrender.com/api/patients");
    const patients = await response.json();

    const patient = patients.find(p => p.id == id);

    document.getElementById("full_name").value = patient.full_name;
    document.getElementById("age").value = patient.age;
    document.getElementById("gender").value = patient.gender;
    document.getElementById("phone").value = patient.phone;
    document.getElementById("email").value = patient.email;
    document.getElementById("address").value = patient.address;
    document.getElementById("blood_group").value = patient.blood_group;
    document.getElementById("disease").value = patient.disease;

    modal.style.display = "flex";

}
document.getElementById("searchInput").addEventListener("input", function(){

    const keyword = this.value.toLowerCase();

    const filtered = allPatients.filter(patient =>

        patient.full_name.toLowerCase().includes(keyword) ||

        patient.phone.includes(keyword) ||

        patient.disease.toLowerCase().includes(keyword)

    );

    displayPatients(filtered);

});