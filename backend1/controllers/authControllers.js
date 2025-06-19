const db = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });
 
  const hashedPassword = bcrypt.hashSync(password, 10);
  const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

  db.run(sql, [name, email, hashedPassword], (err) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ message: "Email already in use" });
    }
    res.status(201).json({ message: "User registered successfully" });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err || !user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
};

const getCurrentUser = (req, res) => {
  db.get(
    `SELECT id, name, email FROM users WHERE id = ?`,
    [req.user.id],
    (err, user) => {
      if (err || !user) return res.status(404).json({ msg: "User not found" });

      res.json(user);
    }
  );
};

module.exports = {
  register,
  login,
  getCurrentUser,
};
