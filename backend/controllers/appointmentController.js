const db = require("../db");

// Get All Appointments
const getAppointments = (req, res) => {

    const sql = `
       SELECT

appointments.id,

appointments.patient_id,
appointments.doctor_id,

patients.full_name AS patient_name,

doctors.full_name AS doctor_name,

appointments.appointment_date,
appointments.appointment_time,
appointments.status

FROM appointments

JOIN patients
ON appointments.patient_id = patients.id

JOIN doctors
ON appointments.doctor_id = doctors.id

ORDER BY appointments.id DESC`;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};
// Add Appointment
const addAppointment = (req, res) => {

    const {
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time,
        status
    } = req.body;

    const sql = `
        INSERT INTO appointments
        (patient_id, doctor_id, appointment_date, appointment_time, status)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            patient_id,
            doctor_id,
            appointment_date,
            appointment_time,
            status
        ],
        (err) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: "Appointment Booked Successfully"
            });

        }
    );

};

    // Update Appointment
const updateAppointment = (req, res) => {

    const { id } = req.params;

    const {
        patient_id,
        doctor_id,
        appointment_date,
       appointment_time,
        status
    } = req.body;

    const sql = `
        UPDATE appointments
        SET
            patient_id = ?,
            doctor_id = ?,
            appointment_date = ?,
            appointment_time = ?,
            status = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            patient_id,
            doctor_id,
            appointment_date,
            appointment_time,
            status,
            id
        ],
        (err,result) => {
            
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: "Appointment Updated Successfully"
            });

        }
    );

};
// Delete Appointment
const deleteAppointment = (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM appointments WHERE id = ?";

    db.query(sql, [id], (err) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            success: true,
            message: "Appointment Cancelled Successfully"
        });

    });

};
module.exports = {
    getAppointments,
    addAppointment,
    updateAppointment,
    deleteAppointment
};