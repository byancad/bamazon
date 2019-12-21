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
    inquirer.prompt({
      name: "item",
      type: "input",
      message: "What item would you like to purhcase?"
    });
  });
};

// function start() {
//   inquirer.prompt({
//     name: "item",
//     type: "input",
//     message: "What would you like to purchase?"
//   });
//   .then(function(answer) {
//     // based on their answer, either call the bid or the post functions
//     if (answer.postOrBid === "POST") {
//       postAuction();
//     } else if (answer.postOrBid === "BID") {
//       bidAuction();
//     } else {
//       connection.end();
//     }
//   });
//
