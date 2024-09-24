const { Router } = require("express");
const { register } = require("../controller/user/register");

const router = new Router();

router.post("/register", register);

module.exports = router;
