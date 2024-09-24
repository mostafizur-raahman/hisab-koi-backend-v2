const { default: mongoose } = require("mongoose");
const { mongo_uri } = require("../../config");

const connectDatabase = async () => {
    try {
        await mongoose.connect(mongo_uri);

        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }

    mongoose.connection.on("error", (err) => {
        console.error("MongoDB error:", err);
    });
};

module.exports = connectDatabase;
