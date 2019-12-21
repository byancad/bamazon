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
      // console.log(answer);
      for (let i = 0; i < res.length; i++) {
        if (answer.item == res[i].product_name) {
          inquirer
            .prompt({
              name: "quant",
              type: "input",
              message: "How many of these would you like to buy?"
              // validate: function(value) {
              //   if (isNaN(value) == false) {
              //     return true;
              //   } else {
              //     return false;
              //   }
              // }
            })
            .then(function(answer) {
              console.log(answer);
            });
        }
      }
    });
};
