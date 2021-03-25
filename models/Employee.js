const { dbConn , sql} = require("../config/db.config")

var Employee = function (employee) {
    this.first_name = employee.first_name;
    this.last_name = employee.last_name;
    this.title = employee.title;
    // this.email = employee.email;
    // this.phone = employee.phone;
    // this.organization = employee.organization;
    // this.designation = employee.designation;
    // this.salary = employee.salary;
    // this.status = employee.status ? employee.status : 1;
    this.created_at = new Date();
    this.updated_at = new Date();
}


Employee.create = function (newEmp, result){
    dbConn
    .input('FirstName', sql.VarChar(30), newEmp.first_name)
    .input('LastName', sql.VarChar(30), newEmp.last_name)
    .input('Title', sql.VarChar(30), newEmp.title)
    .query(`INSERT INTO Employees (Title, FirstName, LastName) values (@Title,@FirstName,@LastName)`, function (err, res) {
        if(err){
            console.log("error:", err)
            return result(err, null)
        }
        else{
            return result(null, res.insertID)
        }
    })
}

Employee.findAll = function(result) {
    dbConn.query('Select * from Employees', function(err, res){
        if (err) {
            console.log("error:", err)
            return result(err, null)
        } else {
            return result(null, res)
        }
    })
}

Employee.findById = function(id, result) {
    dbConn
    .input('id', sql.Int(), id)
    .query(`Select * from Employees where EmployeeID = @id`, function (err, res) {
        if (err) {
            console.log("error:", err)
            return result(err, null)
        } else {
            return result(null, res)
        }
    })
}

Employee.update = function (id, employee, result) {
    dbConn
    .input('FirstName', sql.VarChar(30), employee.first_name)
    .input('LastName', sql.VarChar(30), employee.last_name)
    .input('Title', sql.VarChar(30), employee.title)
    .input('id', sql.Int(), id)
    .query(`UPDATE employees SET FirstName = @FirstName ,LastName=@LastName,Title=@Title WHERE EmployeeID = @id`, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Employee.patchUpdate = function (id, employee, result) {
    for (const key in employee) {
        if (Object.hasOwnProperty.call(employee, key)) {
            dbConn
            .input('key',sql.VarChar(30), key )
            .input('value', sql.VarChar(30), employee[key])
            .input('id', sql.Int(), id)
            .query(` UPDATE employees SET @key = @value  WHERE EmployeeID = @id `, function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                } else {
                    result(null, res);
                }
            });
        }
    }
};


Employee.delete = function (id, result) {
    dbConn
    .input('id', sql.Int(), id)
    .query(`DELETE FROM employees WHERE EmployeeID = @id`, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = Employee
