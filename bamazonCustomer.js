var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "root",
    database: "bamazon"
});

function choicesShow(){
    connection.query("SELECT product_name FROM products", function(err, res){
        if(err) throw err;
        var arrPasser = [];
        for(var i = 0; i < res.length; i++){
            arrPasser.push(res[i].product_name);
        };
        connection.end();
        buyerScript(arrPasser);
    })
};

function buyerScript(choicedArr){
    inquirer.prompt([
        {
            name: "pointer",
            message: "What item would you like to buy?",
            type: "list",
            choices: choicedArr
        },
        {
            name: "quantity",
            message: "How many would you like to order?",
            type: "input"
        }
    ]).then(answer =>{
        console.log(answer.pointer);
        console.log(answer.quantity);
    });
};

choicesShow();

