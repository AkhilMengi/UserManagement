const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { } = require('express-validator')

const { Register } = require('./model/register')

const app = express()
const PORT = 3600;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

mongoose.connect("mongodb://localhost:27017/userManagement", {})
    .then(() => console.log('Mongoose is connected to MongoDB'))
    .catch((error) => console.log('Connection error:', error));


//Register

app.post('/register', async (req,res) => {

    try {
        const { firstName, lastName, email, phoneNumber, password } = req.body;
        const existingUser = await Register.findOne({ email });
        if (existingUser) {
            res.status(200).json({ message: "User already Exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new Register({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            password: hashedPassword
        })
        await newUser.save();
        res.status(201).json({ message: "User Registered Successfully" })

    } catch (error) {
        console.error('Registration error:', error); // Log the error to the console
        res.status(500).json({ message: 'Server error', error });
    }

})

app.get('/', (req, res) => {
    res.send("Hello User Management System")
})

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`)
})