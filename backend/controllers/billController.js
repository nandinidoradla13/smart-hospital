const db = require("../db");

const getBills = (req, res) => {

    const sql = `
        SELECT
            bills.*,
            patients.full_name AS patient_name
        FROM bills
        JOIN patients
            ON bills.patient_id = patients.id
        ORDER BY bills.id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};
// Add Bill
const addBill = (req, res) => {
    const {
        patient_id,
        appointment_id,
        consultation_fee,
        medicine_fee,
        test_fee,
        total_amount,
        payment_status
    } = req.body;

    const sql = `
        INSERT INTO bills
        (
            patient_id,
            appointment_id,
            consultation_fee,
            medicine_fee,
            test_fee,
            total_amount,
            payment_status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            patient_id,
            appointment_id,
            consultation_fee,
            medicine_fee,
            test_fee,
            total_amount,
            payment_status
        ],
        (err,) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: "Bill Generated Successfully"
            });

        }
    );

};
const PDFDocument = require("pdfkit");

// Update Bill

const updateBill = (req, res) => {
    const { id } = req.params;

    const {
        patient_id,
        appointment_id,
        consultation_fee,
        medicine_fee,
        test_fee,
        total_amount,
        payment_status
    } = req.body;

    const sql = `
        UPDATE bills
        SET
            patient_id=?,
            appointment_id=?,
            consultation_fee=?,
            medicine_fee=?,
            test_fee=?,
            total_amount=?,
            payment_status=?
        WHERE id=?
    `;

    db.query(
        sql,
        [
            patient_id,
            appointment_id,
            consultation_fee,
            medicine_fee,
            test_fee,
            total_amount,
            payment_status,
            id
        ],
        (err,) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                success: true,
                message: "Bill Updated Successfully"
            });

        }
    );

};

// Delete Bill

const deleteBill = (req, res) => {

    const { id } = req.params;

    db.query(
        "DELETE FROM bills WHERE id=?",
        [id],
        (err) =>{

            if (err)
                return res.status(500).json(err);

            res.json({
                success: true,
                message: "Bill Deleted Successfully"
            });

        }
    );

};

// Print Bill PDF
const printBill = (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT
            bills.*,
            patients.full_name AS patient_name
        FROM bills
        JOIN patients
            ON bills.patient_id = patients.id
        WHERE bills.id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).send("Bill Not Found");
        }

        const bill = result[0];

        const doc = new PDFDocument();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `inline; filename=bill-${id}.pdf`
        );

        doc.pipe(res);

        doc.fontSize(22).text("Smart Hospital", {
            align: "center"
        });

        doc.moveDown();

        doc.fontSize(16).text(`Bill ID : ${bill.id}`);
        doc.text(`Patient : ${bill.patient_name}`);
        doc.text(`Consultation Fee : ₹${bill.consultation_fee}`);
        doc.text(`Medicine Fee : ₹${bill.medicine_fee}`);
        doc.text(`Test Fee : ₹${bill.test_fee}`);
        doc.text(`Total Amount : ₹${bill.total_amount}`);
        doc.text(`Status : ${bill.payment_status}`);

        doc.end();

    });

};

module.exports = {
    getBills,
    addBill,
    updateBill,
    deleteBill,
    printBill
};