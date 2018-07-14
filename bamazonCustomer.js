var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3307, //change to 3307 for laptop and submittal
    user: "root",
    password: "root",
    database: "bamazon"
});

function choicesShow(){
    connection.query("SELECT product_name, stock_quantity FROM bamazon.products", function(err, res){
        if(err) throw err;
        var arrPasser = [];
        var arrCount = [];
        for(var i = 0; i < res.length; i++){
            arrPasser.push(res[i].product_name);
            arrCount.push(res[i].stock_quantity);
        };
        buyerScript(arrPasser, arrCount);
    })
};

function upDatter(itmNam, numBough, itmQuant){
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: itmQuant
            },
            {
                product_name: itmNam
            }
        ],
        function(err, res){
            if(err) throw err;
            itemLogger(itmNam, numBough)
        }
    );
};

function itemLogger(itmWrite, stockQua){
    var query = "SELECT * FROM bamazon.products WHERE product_name = '" + itmWrite + "'";
    connection.query(query, function(err, res){
        var totalSpent = parseFloat((res[0].price * stockQua).toFixed(2));
        var spendingPass = res[0].product_sales + totalSpent;
        console.log("You just spent $" + totalSpent.toFixed(2) + " on " + stockQua + " new/used '" + itmWrite + "(s)'!");
        productSales(itmWrite, spendingPass);
    });

}

function productSales(itmPass ,moneh){
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                product_sales: moneh
            },
            {
                product_name: itmPass
            }
        ],
        function(err, res){
            if (err) throw err;
            connection.end()
    });
};

function buyerScript(choicedArr, choicedCount){
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
            type: "input",
            validate: function(input){
                var validInput = /^\d+$/;
                if(!input){
                    return "You must specify quantity.";
                } else if (input.match(validInput)){
                    return true;
                } else {
                    return "Please input a numerical value";
                };
            }
        }
    ]).then(answer =>{
        var indexer = choicedArr.indexOf(answer.pointer);
        var stock = choicedCount[indexer];
        stock -= parseFloat(answer.quantity);
        switch(true){
            case stock >= 0:
                upDatter(answer.pointer, answer.quantity, stock);
                return;
            case stock < 0:
                console.log("Insufficient quantity in stock! Please review purchase.");
                connection.end();
                return;
            default:
                console.log("Please buy something");
                return;
        }
    });
};

choicesShow();

