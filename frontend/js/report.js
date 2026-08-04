// ===============================
// Load Report Data
// ===============================

async function loadReports() {

    try {

        const response = await fetch("https://smart-hospital-s6ag.onrender.com/api/dashboard");

        const data = await response.json();

        // Dashboard Counts
        document.getElementById("reportPatients").innerText =
            data.totalPatients;

        document.getElementById("reportDoctors").innerText =
            data.totalDoctors;

        document.getElementById("reportAppointments").innerText =
            data.totalAppointments;

        document.getElementById("reportBills").innerText =
            data.totalBills;

        document.getElementById("reportRevenue").innerText =
            "₹" + data.totalRevenue;

        document.getElementById("totalMedicines").innerText =
            data.totalMedicines;

    }

    catch (error) {

        console.log("Report Error:", error);

        alert("Unable to load report.");

    }

}

loadReports();


// ===============================
// Print Report
// ===============================

document.getElementById("printReportBtn").addEventListener("click", () => {

    window.print();

});


// ===============================
// Report Generated Date & Time
// ===============================

const today = new Date();

console.log(
    "Report Generated:",
    today.toLocaleString()
);