var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3307, //change to 3307 for laptop and submittal
    user: "root",
    password: "root",
    database: "bamazon"
});

function listPrada(){
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM bamazon.products", function(err, res){
        for(var i = 0; i < res.length; i++){
            console.log(`---------------------------------------------------------------------
ID: ${res[i].item_id} | | Item: ${res[i].product_name} | | Price: ${res[i].price.toFixed(2)} | | In Stock: ${res[i].stock_quantity}
---------------------------------------------------------------------`);
        };
    });
};

function loItemSho(){
    connection.query("SELECT product_name, stock_quantity FROM bamazon.products WHERE stock_quantity <= 5", function(err, res){
        for(var i = 0; i < res.length; i++){
            console.log(`-----------------------------------------------------
Item: ${res[i].product_name} | | In Stock: ${res[i].stock_quantity}        
-----------------------------------------------------`);
        };
    });
};

function stockAdd(){
    connection.query("SELECT product_name, stock_quantity FROM bamazon.products", function(err, res){
        var arrPasser = [];
        var arrCount = [];
        for(var i = 0; i < res.length; i++){
            arrPasser.push(res[i].product_name);
            arrCount.push(res[i].stock_quantity);
        };
        stockPrompt(arrPasser, arrCount);
    });
};

function stockPrompt(stockChoice, stockCount){
    inquirer.prompt([
        {
            name: "oldstock",
            message: "What item would you like to re-stock?",
            type: "list",
            choices: stockChoice
        },
        {
            name: "quantity",
            message: "How much do you want to add to the stock?",
            type: "input",
            validate: function(input){
                var validInput = /^\d+$/;
                if(!input){
                    return "You must specify quantity."
                } else if (input.match(validInput)){
                    return true;
                } else {
                    return "Please input a numerical value";
                };
            }
        }
    ]).then(answer =>{
        var item = answer.oldstock;
        var indexer = stockChoice.indexOf(item);
        var stock = stockCount[indexer] + parseFloat(answer.quantity);
        connection.query(
            "UPDATE products SET ? WHERE product_name = '" + item + "'",
            [
                {
                    stock_quantity: stock
                }
            ],
            function(err, res){
                if(err) throw err;
                console.log(`------------------------------------------
New stock quantity for item listed as '${item}': ${stock}
------------------------------------------`);
                connection.end();
            }
        );
    });
};

function newItemAdd(){
    inquirer.prompt([
        {
            name: "idName",
            message: "What is the name of the product you wish to add?",
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
            name: "depName",
            message: "What department does this belong to?",
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
            name: "itmPrice",
            message: "What is the price of the item? (You could sell a penny for $3,000.00 if you like)",
            type: "input",
            validate: function(input){              
                var validInput = /^\d{1,6}(\.\d{1,2})?$/;
                if(!input){
                    return "You must specify quantity.";
                } else if (input.match(validInput)){
                    return true;
                } else {
                    return "Please input a numerical value";
                };
            }
        },
        {
            name: "itmQuant",
            message: "How many of these did you put on order?",
            type: "input",
            validate: function(input){
                var validInput = /^\d+$/;
                if(!input){
                    return "You must specify quantity.";
                } else if (input.match(validInput || validInput.toFixed(2))){
                    return true;
                } else {
                    return "Please input a numerical value";
                };
            }
        }
    ]).then(answer =>{
        var query = "INSERT INTO products (product_name, department_name, price, stock_quantity)";
        query += "VALUES ('" + answer.idName + "', '" + answer.depName + "', " + answer.itmPrice + ", " + answer.itmQuant + ")";
        connection.query(query, function(err, res){
            console.log(`----------------------------------
Row added!
Name: ${answer.idName} | | Department: ${answer.depName} | | Price: ${answer.itmPrice} | | Stock: ${answer.itmQuant}
----------------------------------`);
            connection.end();
        });
    });
}

function microManage(manPass){
    inquirer.prompt([
        {
            name: "action",
            message: "What manager things do you want to do?",
            type: "list",
            choices: manPass
        }
    ]).then(answer =>{
        var action = answer.action;
        switch(true){
            case action === manPass[0]:
                listPrada();
                connection.end();
                break;
            case action === manPass[1]:
                loItemSho();
                connection.end();
                break;
            case action === manPass[2]:
                console.log("add i");
                stockAdd();
                break;
            case action === manPass[3]:
                newItemAdd();
                break;
            default: 
                console.log("What?");
                break;
        }
    });
}

function managerStarter(){
    var actArr = ["View Products For Sale", "View Low Inventory", "Add to Inventory", "Add New Product"];
    microManage(actArr);
}

managerStarter();