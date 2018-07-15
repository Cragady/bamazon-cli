//create function to view product sales by department
//console.table the deparments  and department sales
//calculate total profit
//dep_id dep_name over_costs prod_sales tot_prof

//create new department
var inquirer = require("inquirer");
var mysql = require("mysql");
var cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3307, //change to 3307 for laptop and submittal
    user: "root",
    password: "root",
    database: "bamazon"
});

function depsShow(queryPass, gateKeeper){
    connection.query(queryPass, function(err, res){
        if(err) throw err;
        if(gateKeeper){
            writemUp();
        } else {
            console.table(res);
        }
        connection.end();
    });
};

function writemUp(){
    var query = "SELECT * FROM departments ORDER BY department_id DESC LIMIT 1;";
    connection.query(query, function(err, res){
        if(err) throw err;
        console.table(res);
    })
}

function newDepSoup(){
    inquirer.prompt([
        {
            name: "depName",
            message: "What is the department name?",
            type: "input",
            validate: function(input){
                if(!input){
                    return "Please input something";
                } else {
                    return true;
                };
            }
        },
        {
            name: "depCost",
            message: "What is the projected overhead cost?",
            type: "input",
            validate: function(input){
                var validInput = /^\d{1,6}(\.\d{1,2})?$/;
                if(!input){
                    return "You must specify cost.";
                } else if (input.match(validInput)){
                    return true;
                } else {
                    return "Please input a numerical value";
                };
            }
        }
    ]).then(answer =>{
        var query = "INSERT INTO departments(department_name, over_head_costs)";
        query += " VALUES ('"+ answer.depName + "', " + parseFloat(answer.depCost) + ");";
        console.log(query);
        depsShow(query, true);
    });
}

function soupView(){
    inquirer.prompt([
        {
            name: "itmSelect",
            message: "What soup thing would you like to do?",
            type: "list",
            choices: ["View Product Sales by Department", "Create New Department"]
        }
    ]).then(answer =>{
        console.log(answer.itmSelect);
        switch(true){
            case answer.itmSelect === "View Product Sales by Department":
            var query = `SELECT departments.*, SUM(product_sales) AS product_sales, 
                SUM(product_sales)-over_head_costs AS total_profit
                FROM departments
                INNER JOIN products ON products.department_name=departments.department_name
                GROUP BY department_id;`
            depsShow(query);
                break;
            case answer.itmSelect === "Create New Department":
                newDepSoup();
                break;
            default: 
                console.log("Please do something");
                return;
        };
    });
};

soupView();