const userSchema = {
    type: "object",
    properties: {
        name: { type: "string", minLength: 2 },
        email: { type: "string" },
        password: { type: "string" },
        image: { type: "string" },
        password: { type: "string" },
        confirmPassword: { type: "string" },
        loginType: { type: "string", enum: ["google", "email"] },
        profession: { type: "string" },
        gender: { type: "string", enum: ["male", "female"] },
        fcmToken: { type: "string" },
        incomeReasons: {
            type: "array",
            items: { type: "string" },
            minItems: 1,
        },
        expenseReasons: {
            type: "array",
            items: { type: "string" },
            minItems: 1,
        },
    },
    required: [
        "name",
        "email",
        "password",
        "confirmPassword",
        "loginType",
        "profession",
        "gender",
        "fcmToken",
        "incomeReasons",
        "expenseReasons",
        "image",
        "loginType",
    ],
    // additionalProperties: false,
};

module.exports = userSchema;
