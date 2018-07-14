# Purpose

To create a mock store-front cli app. Bamazon utilizes `inquirer`, `mysql`, and `console.table` node modules to function; all of these work in tandem to execute certain actions depending on how you're interacting with bamazon. The user can choose to access bamazon through customer, manager, or supervisor. This application is executed via node.

# Installation

`package.json` specifies the npm dependency required for this application to work. Run `npm install` on the command line, OR `npm install <package name(s) here>` for functionality.

**Running the apps**

Type `node bamazonCustomer`, `node bamazonManager`, or `node bamazonSupervisor` in the terminal while in the directory to run the specific app that is desired.

# Demos 

## Customer

<img src="images/b-customer.gif" style="height: 450px; width: 700px;" alt="customer">

## Manager

<img src="images/b-manager.gif" style="height: 450px; width: 700px;" alt="manager">

## Supervisor

<img src="images/b-supervisor.gif" style="height: 450px; width: 700px;" alt="supervisor">

# Under the Hood

## Customer

**Main Functions**

* `choicesShow`
* `upDatter`
* `itemLogger`
* `productSales`
* `buyerScript`

`choicesShow()` is called to start the application.

**Main Functionality**

*choicesShow()*

Connects to the database to pull product names and the quantity associated with it, then calls `buyerScript()`.

*upDatter()*

Updates the product in the database with information received from `buyerScript()`, then calls `itemLogger()` with arguments that will allow `itemLogger()` to update the database.

*itemLogger()*

Gives notification on the item bought, and how much was spend. Calls `productSales()` with an argument that takes the total cost as an argument.

*productSales()*

Updates `product_sales` in `bamazon.products` with the customer total and ends the connection. `product_sales` is used in `bamazonSupervisor.js`.

*buyerScript()*

Receives the product information from `choicesShow()` and asks the user what they want to buy, and how much of that item they want to buy. If there isn't enough stock for the demands of the purchase, the user is notified of a stock shortage. If there is enough stock to satisfy the demand, `upDatter()` is called using these argument parameters: the product name, how much of the product was purchased, and how much of the product is in stock.

# Manager

**Main Functions**

* `listPrada`
* `loItemSho`
* `stockAdd`
* `stockPrompt`
* `newItemAdd`
* `lastGrabber`
* `microManage`
* `managerStarter`

`managerStarter()` is called to start the application.