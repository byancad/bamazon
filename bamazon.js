let mysql = require("mysql");
let inquirer = require("inquirer");

let connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "olives13",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  table();
});

let table = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    for (let i = 0; i < res.length; i++) {
      console.log(
        res[i].item_id +
          ". " +
          res[i].product_name +
          ", " +
          res[i].department +
          ", $" +
          res[i].price +
          ", " +
          res[i].stock_quantity +
          "\n-------------------------------------"
      );
    }
    start(res);
    // console.log(res);
  });
};

let start = function(res) {
  inquirer
    .prompt({
      name: "item",
      type: "input",
      message: "What item would you like to purhcase? (enter product name)"
    })
    .then(function(answer) {
      // console.log(res.length);
      for (let i = 0; i < res.length; i++) {
        if (answer.item == res[i].product_name) {
          inquirer
            .prompt({
              name: "quant",
              type: "input",
              message: "How many units of these would you like to buy?",
              validate: function(value) {
                if (isNaN(value) == false) {
                  return true;
                } else {
                  return false;
                }
              }
            })
            .then(function(answer) {
              let price = 0;
              if (answer.quant > 0 && res[i].stock_quantity >= answer.quant) {
                res[i].stock_quantity = res[i].stock_quantity - answer.quant;
                console.log(
                  "You purchased " + answer.quant + " your total will be..."
                );
                price = answer.quant * res[i].price;
                console.log("Okay your total will be $" + price);
                inquirer.prompt({
                  name: "continue",
                  type: "confirm",
                  message: "would you like to continue shopping?",
                  default: true
                });
                // .then(function(answer) {
                //   console.log(answer);
                //   if (answer == "true") {
                //     start();
                //   }
                // });
              } else {
                console.log("Insufficient Quantity! Lets try again, friend.");
                start();
              }
            });
        }
      }
    });
};
