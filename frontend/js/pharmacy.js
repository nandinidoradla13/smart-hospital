let editMedicineId = null;
let allMedicines = [];

// Load Medicines
async function loadMedicines() {

    try {

        const response = await fetch("https://smart-hospital-backend-r2mu.onrender.com/api/pharmacy");

        const medicines = await response.json();

        console.log(medicines);

        allMedicines = medicines;

        displayMedicines(medicines);

    } catch (error) {

        console.log(error);

        alert("Unable to load medicines.");

    }

}

loadMedicines();

// Display Medicines
function displayMedicines(medicines) {

    const table = document.getElementById("medicineTable");

    table.innerHTML = "";

    medicines.forEach(medicine => {

        table.innerHTML += `
        <tr>

            <td>${medicine.id}</td>
            <td>${medicine.medicine_name}</td>
            <td>${medicine.category}</td>
            <td>${medicine.quantity}</td>
            <td>₹${medicine.price}</td>
            <td>${medicine.expiry_date}</td>

            <td>

                <button class="edit-btn"
                    onclick="editMedicine(${medicine.id})">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteMedicine(${medicine.id})">
                    Delete
                </button>

            </td>

        </tr>
        `;

    });

}

// Modal
const modal = document.getElementById("medicineModal");

document.getElementById("addMedicineBtn").onclick = () => {

    document.getElementById("medicineForm").reset();

    editMedicineId = null;

    modal.style.display = "flex";

};

document.getElementById("closeMedicineModal").onclick = () => {

    modal.style.display = "none";

};

window.onclick = (e) => {

    if (e.target == modal) {

        modal.style.display = "none";

    }

};

// Add / Update
const medicineForm = document.getElementById("medicineForm");

medicineForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const medicine = {

        medicine_name: document.getElementById("medicine_name").value,
        category: document.getElementById("category").value,
        quantity: document.getElementById("quantity").value,
        price: document.getElementById("price").value,
        expiry_date: document.getElementById("expiry_date").value

    };

    try {

        const url = editMedicineId
            ? `https://smart-hospital-backend-r2mu.onrender.com/api/pharmacy/${editMedicineId}`
            : "https://smart-hospital-backend-r2mu.onrender.com/api/pharmacy";

        const method = editMedicineId ? "PUT" : "POST";

        const response = await fetch(url, {
    method,
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(medicine)
});

console.log(response.status);

const data = await response.json();

console.log(data);

alert(data.message || "Success");

        medicineForm.reset();

        editMedicineId = null;

        modal.style.display = "none";

        loadMedicines();

    } catch (error) {

        console.log(error);

        alert("Unable to save medicine.");

    }

});

// Edit
async function editMedicine(id) {

    editMedicineId = id;

    console.log("Editing ID:", editMedicineId);

    const medicine = allMedicines.find(m => m.id == id);

    if (!medicine) return;

    document.getElementById("medicine_name").value = medicine.medicine_name;
    document.getElementById("category").value = medicine.category;
    document.getElementById("quantity").value = medicine.quantity;
    document.getElementById("price").value = medicine.price;
    document.getElementById("expiry_date").value =
    medicine.expiry_date.split("T")[0];

    modal.style.display = "flex";
}
// Delete
async function deleteMedicine(id) {

    const confirmDelete = confirm("Delete this medicine?");

    if (!confirmDelete) return;

    try {

        const response = await fetch(
            `https://smart-hospital-backend-r2mu.onrender.com/api/pharmacy/${id}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        alert(data.message);

        loadMedicines();

    } catch (error) {

        console.log(error);

        alert("Unable to delete medicine.");

    }

}

// Search
document.getElementById("searchMedicine").addEventListener("input", function(){

    const keyword = this.value.toLowerCase();

    const filtered = allMedicines.filter(medicine =>

        medicine.medicine_name.toLowerCase().includes(keyword) ||

        medicine.category.toLowerCase().includes(keyword) ||

        medicine.quantity.toString().includes(keyword)

    );

    displayMedicines(filtered);

});