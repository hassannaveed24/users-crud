const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Hashing } = require("../services/hashing");

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is Required"],
            maxLength: [25, "Maximum 25 characters are allowed"],
            validate: {
                validator: (value) => /^[a-zA-Z ]*$/.test(value),
                message: "Invalid name",
            },
            set: (value) => value.trim().toLowerCase(),
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            validate: {
                validator: async function (value) {
                    const count = await this.model("User").countDocuments({ email: value });
                    return count === 0;
                },
                message: "Email already in use",
            },
            match: [new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "i"), "Invalid email address"],
            set: (value) => value.trim().toLowerCase(),
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: [8, "Password must be at least 8 characters"],
            select: false,
        },
    },
    {
        timestamps: true,
    },
);

schema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const password = await Hashing.hash(this.password);

    this.password = password;

    next();
});

schema.methods.isValidPassword = async function (password, encryptedPassword) {
    const isValid = await bcrypt.compare(password, encryptedPassword);
    return isValid;
};

const Model = mongoose.model("User", schema);

module.exports = Model;
