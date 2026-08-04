const db = require("../db");

exports.getDashboard = (req, res) => {

    const sql = `
        SELECT
        (SELECT COUNT(*) FROM patients) AS totalPatients,
        (SELECT COUNT(*) FROM doctors) AS totalDoctors,
        (SELECT COUNT(*) FROM appointments) AS totalAppointments,
        (SELECT COUNT(*) FROM bills) AS totalBills,
        (SELECT COUNT(*) FROM pharmacy) AS totalMedicines,
        (SELECT IFNULL(SUM(total_amount),0) FROM bills) AS totalRevenue
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result[0]);

    });

};