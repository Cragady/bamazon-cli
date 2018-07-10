var inquirer = require("inquirer");
var mysql = require("mysql");

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
        console.log(manPass);
        switch(true){
            case action === manPass[0]:
                console.log("sale");
                //list all (item id's, names, prices, quantities)
                break;
            case action === manPass[1]:
                console.log("low i");
                /*list all inventory items lower than five and 
                list number left*/
                break;
            case action === manPass[2]:
                console.log("add i");
                /*just updates the stock number after prompt 
                then lists new number left*/
                break;
            case action === manPass[3]:
                console.log("new pro");
                //adds completely new product after prompt
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