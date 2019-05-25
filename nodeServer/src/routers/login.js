/**
 * restful api 子路由
 */

const router = require('koa-router')()
const userInfoController = require('../controllers/userInfoController')

const routers = router.post('/user/signUp', userInfoController.signUp)


module.exports = routers
