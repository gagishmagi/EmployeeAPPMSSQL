let Employee = require("../models/Employee")
let Auth = require("../models/Auth")
let bcrypt = require('bcrypt')
const saltRounds = 10

exports.findAll = function (req, res) {
    if(req.user)
        console.log(req.user)
    Employee.findAll(function (err, employees) {
        if (err)
            res.send(err)
        else {
            let recordset = employees.recordset
            recordset = recordset.map(record => {
                // console.log(record)
                const {Title, FirstName, LastName, EmployeeID} = record
                return {Title, FirstName, LastName, EmployeeID}
            });
            res.json({error: false, message : 'success' ,recordset})
        }
    })
}


exports.addEmployee = function (req, res) {
    const FirstName = req.body.FirstName
    const LastName = req.body.LastName
    const Title = req.body.Title

    let EmployeeData = {
        first_name: FirstName,
        last_name: LastName,
        title: Title
    }

    Employee.create(EmployeeData, function (err) {
        // console.log('In Employees controller , findAll')
        if (err)
            res.send(err)

        else
            res.json({error:false, message: 'Employee Added successfully'})

    })
}

exports.findOneEmployee = function (req, res) {
    Employee.findById(req.params.id, function (err, employee) {
        if (err)
            res.send(err)
        else{
            if (employee.recordset[0]){
                const {
                    Title,
                    LastName,
                    FirstName,
                    EmployeeID
                } = employee.recordset[0]
                res.json({
                    error: false,
                    message: 'success',
                    employee: {
                        Title,
                        LastName,
                        FirstName,
                        EmployeeID
                    }
                })

            }else{
                res.send({
                    error: true,
                    message: 'Can\'t find user'
                })
            }

        }
    })
}

exports.update = function (req, res) {
    const employee = {
        first_name: req.body.FirstName,
        last_name: req.body.LastName,
        title: req.body.Title,
    }
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field'
        });
    } else {
        if(req.method === 'PATCH'){
            Employee.patchUpdate(req.params.id, new Employee(employee), function (err, employee) {
                if (err)
                    return res.send({
                        error: true,
                        message: err.message,
                        employee: employee
                    });

                res.json({
                    error: false,
                    message: 'Employee successfully updated'
                });

            });
        }else{
            Employee.update(req.params.id, new Employee(employee), function (err, employee) {
                if (err)
                    return res.send({
                        error: true,
                        message: err.message
                    });

                res.json({
                    error: false,
                    message: 'Employee successfully updated'
                });

            });
        }
        Employee.update(req.params.id, new Employee(employee), function (err, employee) {
            if (err)
                return res.send({error: true, message: err.message});

            res.json({
                error: false,
                message: 'Employee successfully updated'
            });

        });
    }
};

exports.deleteEmployee = function (req, res) {
    Employee.delete(req.params.id, function (err, employee) {
        if (err)
            res.send({
                error: true,
                message: err.message
            });
        else

        res.json({
            error: false,
            message: 'Employee successfully deleted'
        });
    });
};


exports.createNewUser = function(req,res){


    let username = req.body.username
    let password = req.body.password

    if (req.body.password) {
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                if (err)
                    console.log(err)
                password = hash

                const user = {
                    username: 'gagi',
                    lastname: 'shmagi',
                    pass: password
                }

                const {pass,...other} = user
                console.log(other)

                const token = Auth.generateAccessToken(other)

                return res.json({
                    token
                })

            })
    }




}
