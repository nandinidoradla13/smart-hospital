const db = require("../db");

// Get All Doctors
const getDoctors = (req, res) => {

    const sql = "SELECT * FROM doctors ORDER BY id DESC";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

// Add Doctor
const addDoctor = (req, res) => {
console.log("BODY:", req.body);
    const {
        full_name,
        specialization,
        experience,
        phone,
        email,
        consultation_fee
    } = req.body;

    const sql = `
        INSERT INTO doctors
        (full_name, specialization, experience, phone, email, consultation_fee)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            full_name,
            specialization,
            experience,
            phone,
            email,
            consultation_fee
        ],
        (err) =>{
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: "Doctor Added Successfully"
            });

        }
    );

};
// Delete Doctor
const deleteDoctor = (req,res)=>{
    const { id } = req.params;

    const sql = "DELETE FROM doctors WHERE id = ?";

    db.query(sql, [id], (err) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            success: true,
            message: "Doctor Deleted Successfully"
        });

    });

};
// Update Doctor
const updateDoctor = (req, res) => {

    const { id } = req.params;

    const {
        full_name,
        specialization,
        experience,
        phone,
        email,
        consultation_fee
    } = req.body;

    const sql = `
        UPDATE doctors
        SET
            full_name = ?,
            specialization = ?,
            experience = ?,
            phone = ?,
            email = ?,
            consultation_fee = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            full_name,
            specialization,
            experience,
            phone,
            email,
            consultation_fee,
            id
        ],
        (err) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: "Doctor Updated Successfully"
            });

        }
    );

};
module.exports = {
    getDoctors,
    addDoctor,
    deleteDoctor,
    updateDoctor
};