const db = require("../db");

// GET Patients
const getPatients = (req, res) => {

    db.query("SELECT * FROM patients", (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

// ADD Patient
const addPatient = (req, res) => {

    const {full_name,age,gender,phone,email, address, blood_group, disease} = req.body;

    const sql = `
        INSERT INTO patients
        (full_name, age, gender, phone, email, address, blood_group, disease) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql,[full_name, age,gender,phone,email,address,blood_group, disease],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Patient Added Successfully",
                id: result.insertId
            });

        }
    );

};
// Update Patient
const updatePatient = (req, res) => {
      
    const { id } = req.params;

    const {full_name,age,gender, phone,email,address,blood_group,disease} = req.body;

    const sql = ` UPDATE patients SET full_name=?, age=?, gender=?, phone=?, email=?, address=?,
    blood_group=?,disease=? WHERE id=?`;

    db.query(sql, [full_name,age,gender,phone,email,address,blood_group,disease, id],
        (err) => {

           
            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Patient Updated Successfully"
            });

        }
    );

};
// Delete Patient
const deletePatient = (req, res) => {
      
    const { id } = req.params;

    const sql = "DELETE FROM patients WHERE id=?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Patient Not Found"
            });
        }

        res.json({
            message: "Patient Deleted Successfully"
        });

    });

};

module.exports = {
    getPatients,
    addPatient,
    updatePatient,
    deletePatient
};