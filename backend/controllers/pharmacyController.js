const db = require("../db");

// Get Medicines
exports.getMedicines = (req, res) => {

        //console.log("GET Medicines");

    db.query(
        "SELECT * FROM pharmacy ORDER BY id DESC",
        (err, result) => {

            if (err) return res.status(500).json(err);

             //console.log(result);

            res.json(result);

        }
    );

};

// Add Medicine
exports.addMedicine = (req, res) => {
     //console.log("BODY:", req.body);

    const {
        medicine_name,
        category,
        quantity,
        price,
        expiry_date
    } = req.body;

    const sql = `
    INSERT INTO pharmacy
    (medicine_name,  category, quantity, price, expiry_date)
    VALUES (?,?,?,?,?)
    `;

    db.query(
        sql,
        [
            medicine_name,
            category,
            quantity,
            price,
            expiry_date
        ],
        (err) => {

            if (err) return res.status(500).json(err);
           // console.log(result);

            res.json({
                message: "Medicine Added Successfully"
            });

        }
    );

};

// Update Medicine
exports.updateMedicine = (req, res) => {

    //console.log("===== NEW CONTROLLER RUNNING =====");
    const { id } = req.params;

    //console.log("ID:", id);
    //console.log("BODY:", req.body);

    const {
        medicine_name,
        category,
        quantity,
        price,
        expiry_date
    } = req.body;

    const sql = `
    UPDATE pharmacy
    SET
        medicine_name=?,
        category=?,
        quantity=?,
        price=?,
        expiry_date=?
    WHERE id=?
    `;

    db.query(
        sql,
        [
            medicine_name,
            category,
            quantity,
            price,
            expiry_date,
            id
        ],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            //console.log(result);

            res.json({
                message: "Medicine Updated Successfully"
            });

        }
    );
};
// Delete Medicine
exports.deleteMedicine = (req, res) => {

    const { id } = req.params;

//console.log("Delete ID:", req.params.id);

    db.query(
        "DELETE FROM pharmacy WHERE id=?",
        [id],
        (err,result) => {

            if (err) return res.status(500).json(err);
             //console.log(result);
            res.json({
                message: "Medicine Deleted Successfully"
            });

        }
    );

};