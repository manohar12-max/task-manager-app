const express = require('express');
const router = express.Router();

const {register,login,getCurrentUser} = require('../controllers/authControllers.js');

router.post('/register', register);
router.post('/login', login);




module.exports = router;
