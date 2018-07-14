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

function depsShow(queryPass){
    connection.query(queryPass, function(err, res){
        if(err) throw err;
        console.table(res);
        connection.end();
    });
};

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
                    WHERE products.department_name=departments.department_name
                    GROUP BY department_id;`
                depsShow(query)
        }
    });
};

soupView();