
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role ENUM('Admin','Doctor','Receptionist') NOT NULL
);

INSERT INTO users(username,email,password,role) VALUES
('Admin','admin@gmail.com','admin123','Admin'),
('Dr. Rajesh','doctor@gmail.com','doctor123','Doctor'),
('Reception','reception@gmail.com','reception123','Receptionist');

-- ===========================
-- PATIENTS
-- ===========================

CREATE TABLE patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100),
    age INT,
    gender VARCHAR(20),
    phone VARCHAR(20),
    email VARCHAR(100),
    address TEXT,
    blood_group VARCHAR(10),
    disease VARCHAR(100)
);

INSERT INTO patients(full_name,age,gender,phone,email,address,blood_group,disease)
VALUES
('Ramesh Kumar',25,'Male','9876543210','ramesh@gmail.com','Hyderabad','O+','Fever'),
('Sita Devi',32,'Female','9876543211','sita@gmail.com','Warangal','A+','Diabetes'),
('Mahesh',40,'Male','9876543212','mahesh@gmail.com','Karimnagar','B+','BP');

-- ===========================
-- DOCTORS
-- ===========================

CREATE TABLE doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100),
    specialization VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    experience INT
);

INSERT INTO doctors(full_name,specialization,phone,email,experience)
VALUES
('Dr. Rajesh','Cardiology','9876500001','doctor@gmail.com',12),
('Dr. Priya','Neurology','9876500002','priya@gmail.com',8);

-- ===========================
-- APPOINTMENTS
-- ===========================

CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    doctor_id INT,
    appointment_date DATE,
    appointment_time TIME,
    status VARCHAR(30),

    FOREIGN KEY(patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY(doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
);

INSERT INTO appointments
(patient_id,doctor_id,appointment_date,appointment_time,status)
VALUES
(1,1,CURDATE(),'10:00:00','Confirmed'),
(2,2,CURDATE(),'11:30:00','Pending'),
(3,1,CURDATE(),'02:00:00','Completed');

-- ===========================
-- BILLS
-- ===========================

CREATE TABLE bills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    appointment_id INT,
    consultation_fee DECIMAL(10,2),
    medicine_fee DECIMAL(10,2),
    test_fee DECIMAL(10,2),
    total_amount DECIMAL(10,2),
    payment_status VARCHAR(30),

    FOREIGN KEY(patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY(appointment_id) REFERENCES appointments(id) ON DELETE CASCADE
);

INSERT INTO bills
(patient_id,appointment_id,consultation_fee,medicine_fee,test_fee,total_amount,payment_status)
VALUES
(1,1,500,300,200,1000,'Paid'),
(2,2,600,250,150,1000,'Pending');

-- ===========================
-- PHARMACY
-- ===========================

CREATE TABLE pharmacy (
    id INT AUTO_INCREMENT PRIMARY KEY,
    medicine_name VARCHAR(100),
    category VARCHAR(100),
    quantity INT,
    price DECIMAL(10,2),
    expiry_date DATE
);

INSERT INTO pharmacy
(medicine_name,category,quantity,price,expiry_date)
VALUES
('Paracetamol','Tablet',100,20,'2027-12-31'),
('Amoxicillin','Capsule',80,45,'2027-08-31'),
('Cetirizine','Tablet',120,15,'2027-10-15');

-- ===========================
-- DASHBOARD TEST QUERIES
-- ===========================

SELECT COUNT(*) AS totalPatients FROM patients;
SELECT COUNT(*) AS totalDoctors FROM doctors;
SELECT COUNT(*) AS totalAppointments FROM appointments;
SELECT COUNT(*) AS totalBills FROM bills;
SELECT COUNT(*) AS totalMedicines FROM pharmacy;
SELECT IFNULL(SUM(total_amount),0) AS totalRevenue FROM bills;
