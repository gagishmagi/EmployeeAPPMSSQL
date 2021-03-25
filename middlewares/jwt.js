const jwt = require('jsonwebtoken')

exports.authenticateToken = function (req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]


    if(token == null)
        return res.status(401).send({message: 'Not allowed to enter'})

    jwt.verify(token, process.env.TOKEN_SECRET,function(err, userData){
        if(err){
            console.log(err)
            return res.status(403).send({message: 'bad token, not allowed'})
        }

        // console.log(userData)
        req.user = userData

        next()

    })

}
