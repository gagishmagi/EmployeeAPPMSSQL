const dbConn = require("../config/db.config")

var Employee = function (employee) {
    this.first_name = employee.first_name;
    this.last_name = employee.last_name;
    this.email = employee.email;
    this.phone = employee.phone;
    this.organization = employee.organization;
    this.designation = employee.designation;
    this.salary = employee.salary;
    this.status = employee.status ? employee.status : 1;
    this.created_at = new Date();
    this.updated_at = new Date();
}


Employee.create = function (newEmp, result){
    dbConn.query(`INSERT INTO employees values ${newEmp}`, function(err, res){
        if(err){
            console.log("error:", err)
            return result(err, null)
        }
        else{
            console.log(res.insertID)
            return result(null, res.insertID)
        }
    })
}

Employee.findAll = function(result) {
    console.log("in model Emplyee, findAll")
    dbConn.query('Select * from Employees', function(err, res){
        if (err) {
            console.log("error:", err)
            return result(err, null)
        } else {
            console.log("Employees ", res)
            return result(null, res)
        }
    })
}

Employee.findById = function(id, result) {
    dbConn.query(`Select * from Employees where EmployeeID = ${id}`, function (err, res) {
        if (err) {
            console.log("error:", err)
            return result(err, null)
        } else {
            console.log("Employee ", res)
            return result(null, res)
        }
    })
}

module.exports = Employee
