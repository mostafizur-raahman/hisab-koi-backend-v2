const express = require("express");
const config = require("./config");
const app = express();
const router = require("./src/routes");
const morgan = require("morgan");
const connectDatabase = require("./src/utils/db");
const globalErrorHandler = require("./src/utils/globalError");

// middleware
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Hello hisb koi v2.",
    });
});

// routes
app.use("/api", router);
app.use(globalErrorHandler);
// db calling
connectDatabase();
app.listen(config.port, () => {
    console.debug(`${new Date()}\nHisab koi is running on port ${config.port}`);
});
