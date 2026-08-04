// ===============================
// Date & Time
// ===============================

function updateDateTime(){

    let now = new Date();

    let dateTime = now.toLocaleString();

    document.getElementById("dateTime").innerHTML = 
        "📅 " + dateTime;

}


setInterval(updateDateTime,1000);

updateDateTime();



// ===============================
// Dashboard Data Fetch
// ===============================

async function loadDashboard(){

    try{

        const response = await fetch(
            "http://localhost:5000/api/dashboard"
        );

        const data = await response.json();


        document.getElementById("totalPatients").innerText =
            data.totalPatients;


        document.getElementById("totalDoctors").innerText =
            data.totalDoctors;


        document.getElementById("totalAppointments").innerText =
            data.totalAppointments;


        document.getElementById("totalBills").innerText =
            data.totalBills;


    }

    catch(error){

        console.log("Dashboard Error:",error);

    }

}



loadDashboard();




// ===============================
// Recent Patients
// ===============================

async function loadRecentPatients(){

    try{

        const response = await fetch(
            "http://localhost:5000/api/patients"
        );


        const patients = await response.json();


        let table = 
        document.getElementById("recentPatientsTable");


        table.innerHTML="";


        patients.slice(0,5).forEach(patient=>{


            table.innerHTML += `

            <tr>

                <td>${patient.full_name}</td>

                <td>${patient.disease}</td>

            </tr>

            `;


        });


    }

    catch(error){

        console.log("Patient Error:",error);

    }


}



loadRecentPatients();






// ===============================
// Today's Appointments
// ===============================

async function loadRecentAppointments(){


    try{


        const response = await fetch(
            "http://localhost:5000/api/appointments"
        );


        const appointments = await response.json();



        let table =
        document.getElementById("recentAppointmentsTable");


        table.innerHTML="";



        appointments.slice(0,5).forEach(app=>{


            table.innerHTML += `

            <tr>

            <td>${app.patient_name}</td>

            <td>${app.doctor_name}</td>

            </tr>

            `;


        });



    }


    catch(error){

        console.log("Appointment Error:",error);

    }


}



loadRecentAppointments();





// ===============================
// Buttons
// ===============================


document.getElementById("dashboardBtn").onclick=function(){

    document.getElementById("dashboard")
    .scrollIntoView({
        behavior:"smooth"
    });

};



document.getElementById("loginBtn").onclick=function(){

    alert("Hospital Login Page Coming Soon");

};