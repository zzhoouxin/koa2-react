/**
 * 整合所有子路由
 */

const router = require("koa-router")();
const login = require("./userInfo");
router.use("/login", login.routes(), login.allowedMethods());

module.exports = router;
