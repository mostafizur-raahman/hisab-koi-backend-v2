const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        image: String,
        password: String,
        confirmPassword: String,
        loginType: {
            type: String,
            enum: ["google", "email"],
        },
        profession: String,
        gender: {
            type: String,
            enum: ["male", "female"],
        },
        role: {
            type: String,
            default: "User",
        },
        fcmToken: String,
        incomeReasons: [String],
        expenseReasons: [String],
        recentDeeds: [String],
        isVerified: {
            type: Boolean,
            default: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
