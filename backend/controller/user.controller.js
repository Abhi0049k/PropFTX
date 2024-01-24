const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userValidation } = require("../validations");

const register = async (req, res, next) => {
    let { email, password } = req.body;
    try {
        const check = userValidation.safeParse({ email, password });
        if (!check.success) return next({ status: 422, message: 'Invalid Input' });
        const userExists = await userModel.find({ email });
        if (userExists.length > 0) return next({ status: 409, message: 'User Already Exists' });
        password = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
        const newUser = new userModel({ email, password });
        await newUser.save();
        res.status(201).send({ message: 'Account Created' });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const check = userValidation.safeParse({ email, password });
        if (!check.success) return next({ status: 422, message: 'Invalid Input' });
        const userDetails = await userModel.findOne({ email });
        if (!userDetails) return next({ status: 404, message: "User Doesn't Exist" });
        const result = await bcrypt.compare(password, userDetails.password);
        if (!result) return next({ status: 404, message: "User Not Found" });
        const token = jwt.sign({ email: userDetails.email }, process.env.JWT_SECRET_KEY);
        res.status(200).send({ token });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

module.exports = { register, login }