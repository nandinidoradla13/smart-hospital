let editBillId = null;
let allBills = [];

// Load Bills
async function loadBills() {

    try {

        const response = await fetch("http://localhost:5000/api/bills");

        const bills = await response.json();

        allBills = bills;

        displayBills(bills);

    } catch (error) {

        console.log(error);

        alert("Unable to load bills.");

    }

}

loadBills();

// Display Bills
function displayBills(bills) {

    const table = document.getElementById("billTable");

    table.innerHTML = "";

    bills.forEach(bill => {

        table.innerHTML += `
        <tr>

            <td>${bill.id}</td>
            <td>${bill.patient_name}</td>
            <td>₹${bill.total_amount}</td>
            <td>${bill.payment_status}</td>

            <td>

                <button class="edit-btn"
                    onclick="editBill(${bill.id})">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteBill(${bill.id})">
                    Delete
                </button>

                <button onclick="printBill(${bill.id})">
                    Print
                </button>

            </td>

        </tr>
        `;

    });

}

// Modal
const modal = document.getElementById("billModal");

document.getElementById("addBillBtn").onclick = async () => {

    editBillId = null;

    document.getElementById("billForm").reset();

    modal.style.display = "flex";

    await loadPatients();

    await loadAppointments();

};

document.getElementById("closeBillModal").onclick = () => {

    modal.style.display = "none";

};

window.onclick = (e) => {

    if (e.target == modal) {

        modal.style.display = "none";

    }

};

// Load Patients
async function loadPatients() {

    const response = await fetch("http://localhost:5000/api/patients");

    const patients = await response.json();

    const select = document.getElementById("patient_id");

    select.innerHTML = `<option value="">Select Patient</option>`;

    patients.forEach(patient => {

        select.innerHTML += `
        <option value="${patient.id}">
            ${patient.full_name}
        </option>
        `;

    });

}

// Load Appointments
async function loadAppointments() {

    const response = await fetch("http://localhost:5000/api/appointments");

    const appointments = await response.json();

    const select = document.getElementById("appointment_id");

    select.innerHTML = `<option value="">Select Appointment</option>`;

    appointments.forEach(app => {

        select.innerHTML += `
        <option value="${app.id}">
            ${app.patient_name} - ${app.doctor_name}
        </option>
        `;

    });

}

// Calculate Total
function calculateTotal() {

    const consultation =
        Number(document.getElementById("consultation_fee").value) || 0;

    const medicine =
        Number(document.getElementById("medicine_fee").value) || 0;

    const test =
        Number(document.getElementById("test_fee").value) || 0;

    document.getElementById("total_amount").value =
        consultation + medicine + test;

}

document.getElementById("consultation_fee")
.addEventListener("input", calculateTotal);

document.getElementById("medicine_fee")
.addEventListener("input", calculateTotal);

document.getElementById("test_fee")
.addEventListener("input", calculateTotal);

// Save / Update Bill

const billForm = document.getElementById("billForm");

billForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const bill = {

        patient_id: document.getElementById("patient_id").value,
        appointment_id: document.getElementById("appointment_id").value,
        consultation_fee: document.getElementById("consultation_fee").value,
        medicine_fee: document.getElementById("medicine_fee").value,
        test_fee: document.getElementById("test_fee").value,
        total_amount: document.getElementById("total_amount").value,
        payment_status: document.getElementById("payment_status").value

    };

    try {

        const url = editBillId
            ? `http://localhost:5000/api/bills/${editBillId}`
            : "http://localhost:5000/api/bills";

        const method = editBillId ? "PUT" : "POST";

        const response = await fetch(url, {

            method,

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(bill)

        });

        const data = await response.json();

        alert(data.message);

        billForm.reset();

        editBillId = null;

        modal.style.display = "none";

        loadBills();

    } catch (error) {

        console.log(error);

        alert("Unable to save bill.");

    }

});

// Edit Bill
async function editBill(id) {

    editBillId = id;

    await loadPatients();

    await loadAppointments();

    const bill = allBills.find(b => b.id == id);

    if (!bill) return;

    document.getElementById("patient_id").value = bill.patient_id;
    document.getElementById("appointment_id").value = bill.appointment_id;
    document.getElementById("consultation_fee").value = bill.consultation_fee;
    document.getElementById("medicine_fee").value = bill.medicine_fee;
    document.getElementById("test_fee").value = bill.test_fee;
    document.getElementById("total_amount").value = bill.total_amount;
    document.getElementById("payment_status").value = bill.payment_status;

    modal.style.display = "flex";

}

// Delete Bill
async function deleteBill(id) {

    if (!confirm("Are you sure you want to delete this bill?")) return;

    try {

        const response = await fetch(
            `http://localhost:5000/api/bills/${id}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        alert(data.message);

        loadBills();

    } catch (error) {

        console.log(error);

        alert("Unable to delete bill.");

    }

}

// Print Bill
function printBill(id) {

    window.open(
        `http://localhost:5000/api/bills/print/${id}`,
        "_blank"
    );

}

// Search Bill
document.getElementById("searchBill").addEventListener("input", function () {

    const search = this.value.toLowerCase();

    const filteredBills = allBills.filter(bill =>

        bill.patient_name.toLowerCase().includes(search) ||

        bill.payment_status.toLowerCase().includes(search)

    );

    displayBills(filteredBills);

});