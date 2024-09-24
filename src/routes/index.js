const { Router } = require("express");
const userRoutes = require("./user");

const router = new Router();

router.use("/v1/user", userRoutes);

module.exports = router;
