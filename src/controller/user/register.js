const User = require("../../models/user/user.model");
const userSchema = require("../../models/user/user.schema");
const Fault = require("../../utils/Fault");
const validator = require("../../utils/requestValidator");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
    try {
        const data = req.body;

        const existUser = await User.findOne({
            email: data.email,
            isDeleted: false,
        });

        if (existUser) {
            throw new Fault("Alreday register, please sign in.", 409);
        }

        validator(userSchema, data);

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        delete data.confirmPassword;

        const newUser = await User.create(data);

        return res.status(201).json({
            message: "User create successfully",
            data: newUser,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
};
