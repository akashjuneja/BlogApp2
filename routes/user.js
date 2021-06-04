const controllers=require('../controllers/user.js')

const routes=[{
    method: 'POST',
    url: '/api/register',
    handler:controllers.createUser
},{
    method: 'POST',
    url: '/api/login',
    handler:controllers.loginUser
}]

module.exports=routes;