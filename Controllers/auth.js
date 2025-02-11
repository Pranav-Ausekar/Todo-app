import createError from '../utils/error.js';
import { connectToDB } from '../utils/connect.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function register(req, res, next) {
    // res.send('register from controller')
    const data = req.body;
    console.log(data);

    //  check if the data contains email & password
    if (!data?.email || !data?.password) {
        return next(createError(400, "Missing fields"));
    };

    await connectToDB();
    console.log("DB Connection Successful");

    const alreadyRegistered = await User.exists({ email: data.email });
    // console.log("Checked user existence");
    if (alreadyRegistered) return next(createError(400, "User already exists."));
    // res.send("register");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    // console.log(newUser);
    await newUser.save();
    res.status(201).json("User created successfully.");
    // console.log("user created successfully")
    // res.send(newUser);
}


export async function login(req, res, next) {
    const data = req.body;

    if (!data?.email || !data?.password) {
        return next(createError(400, "Missing Fields"));
    }

    await connectToDB()
    const user = await User.findOne({ email: req.body.email });
    // here the user will automaically get '_id' i.e. provided by the mongoDB whan user log'g in 
    // so that '_id' we are sending while creating a token
    if (!user) return next(createError(400, "User dose not exists."));



    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordCorrect) return next(createError(400, "Incorrect Password."));

    // create jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    console.log(`Token : ${token}`);

    // res.send("Login controller");
    // send created token to the client
    res.cookie("access_token", token, {
        httpOnly: true, // makes cookie inaccessiable to javascript, only server can access the cookie
        // secure: process.env.NODE_ENV === "production"
        secure: true, // Must be true for cross-origin requests
        sameSite: "None" // Allows sending cookies across domains
    })
        .status(200)
        .json("User logged in!");
}

export async function logout(req, res, next) {
    res.clearCookie('access_token',
        {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        }
    )
        .status(200)
        .json({ message: "Logged out successfully" });
}