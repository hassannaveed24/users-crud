const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

const Database = require("./utils/db.js");
const AppError = require("./utils/AppError.js");

const { errorController } = require("./controllers/errors.controller.js");

const app = express();

dotenv.config({ path: path.resolve(process.cwd(), `.${process.env.NODE_ENV}.env`) });

const port = process.env.PORT || 5500;

app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`);

    //Creating DB connection
    new Database()
        .connect()
        .then(() => console.log("Connected to DB"))
        .catch((err) => {
            console.log("Can not connect to DB");
            console.log(err.message);
        });

    app.use(express.json());

    app.use(cors());

    // $ and . characters are removed completely from user-supplied input in the following places:
    // - req.body
    // - req.params
    // - req.headers
    // - req.query
    app.use(
        mongoSanitize(),
        //     {
        //     allowDots: true,
        // }
    );

    //Default Route starts
    app.get("/", (req, res) => {
        res.status(200).send(`Server running at PORT ${port}`);
    });
    //Default Route ends

    app.use("/auth", require("./routes/auth.route.js")); //auth routes

    app.use("*", (req, res, next) => next(new AppError(`Cannot find ${req.originalUrl} on the server!`, 404))); //invalid route
    app.use(errorController); //error handler
});
