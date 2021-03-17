let Employee = require("../models/Employee")

exports.findAll = function (req,res) {
    Employee.findAll(function(err, employees){
        // console.log('In Employees controller , findAll')
        if(err)
            res.send(err)
        else
            res.json(employees)
    })
}


exports.findOneEmployee = function(req, res){
    Employee.findById(req.params.id, function(err, employee){
        if(err)
            res.send(err)
        else
            res.json(employee)
    })
}
