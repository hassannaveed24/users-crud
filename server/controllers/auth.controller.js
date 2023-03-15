const { promisify } = require("util");
const _ = require("lodash");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { signToken } = require("../utils/jwt.js");
const User = require("../models/users.model.js");
const { catchAsync } = require("./errors.controller");
const AppError = require("../utils/AppError");
const { Crypto } = require("../services/crypto.js");
const { emailInstance } = require("../services/email.js");
const { emailHtml, welcomeEmailBody } = require("../constants.js");

module.exports.registerUser = catchAsync(async function (req, res, next) {
    const body = _.pick(req.body, ["name", "email"]);

    if (Object.keys(body).length < 2) return next(new AppError("Please enter a valid user", 400));
    body.name = body.name.trim().toLowerCase();

    const password = Crypto.genSubString(8);

    await User.create({ ...body, password });

    const nameArr = body.name.split(" ");

    for (let index = 0; index < nameArr.length; index++) {
        nameArr[index] = nameArr[index].charAt(0).toUpperCase() + nameArr[index].slice(1);
    }

    const capitalizedName = nameArr.join(" ");

    emailInstance.send({
        senderEmail: process.env.SENDER_EMAIL,
        senderName: process.env.SENDER_NAME,
        receivers: [
            {
                email: body.email,
            },
        ],
        subject: `Welcome to ${process.env.SENDER_NAME}`,
        htmlContent: emailHtml(
            welcomeEmailBody({
                receiverEmail: body.email,
                receiverName: capitalizedName,
                receiverPassword: password,
                applicationName: process.env.APP_NAME,
            }),
        ),
    });

    res.status(200).json();
});

module.exports.loginUser = catchAsync(async function (req, res, next) {
    const body = _.pick(req.body, ["email", "password"]);

    if (Object.keys(body).length < 2) return next(new AppError("Please enter a valid user", 400));

    const userPassword = await User.find(
        {
            email: body.email,
        },
        "password",
    );

    console.log("userPassword");
    console.log(userPassword);

    res.status(200).json();
});
