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
    connection.query("SELECT product_name, stock_quantity FROM bamazon.products", function(err, res){
        if(err) throw err;
        var arrPasser = [];
        var arrCount = [];
        for(var i = 0; i < res.length; i++){
            arrPasser.push(res[i].product_name);
            arrCount.push(res[i].stock_quantity);
        };
        connection.end();
        buyerScript(arrPasser, arrCount);
    })
};

function upDatter(itmNam, itmQuant){
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
            connection.end();
        }
    );
};

function itemLogger(itmWrite){
    var query = "SELECT * FROM bamazon.products WHERE product_name = '" + itmWrite + "'";
    connection.query(query, function(err, res){
        console.log(res[0].price.toFixed(2));
        console.log(50.00);
        connection.end();
    });

}

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
            type: "input"
        }
    ]).then(answer =>{
        switch(true){
            case stock > 0:
                quantumPass--;
                upDatter(answer.pointer, answer.quantity);
                break;
            case stock === 0:
                console.log("Insufficient quantity!");
                break;
            default:
                console.log("Please buy something");
        }
        
    });
};

// choicesShow();
itemLogger("Game Boy");

