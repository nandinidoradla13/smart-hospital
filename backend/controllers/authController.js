const db = require("../db");

// Register
exports.register = (req, res) => {

    const { username, email, password, role } = req.body;

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, result) => {

           if (err) {
    console.log(err);
    return res.status(500).json({
        message: err.message
    });
}
            if (result.length > 0) {
                return res.status(400).json({
                    message: "Email already exists"
                });
            }

            db.query(
                "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
                [username, email, password, role],
                (err) => {

                    if (err) {
    console.log(err);
    return res.status(500).json({
        message: err.message
    });
}
                    res.json({
                        message: "Registration Successful"
                    });

                }
            );

        }
    );

};

// Login
exports.login = (req, res) => {

    const { email, password } = req.body;

    const sql = `
    SELECT * FROM users
    WHERE email=? AND password=?
    `;

    db.query(sql, [email, password], (err, result) => {

        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }

        res.json({
            message: "Login Success",
            user: result[0]
        });

    });

};