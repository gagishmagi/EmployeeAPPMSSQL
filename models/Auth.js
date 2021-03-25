const {dbConn,sql} = require("../config/db.config")
const jwt = require('jsonwebtoken')

exports.login = function(){

}

exports.register = function () {

}

exports.generateAccessToken = function (userData){
    return jwt.sign(userData, process.env.TOKEN_SECRET, { expiresIn: '2d' })
}
