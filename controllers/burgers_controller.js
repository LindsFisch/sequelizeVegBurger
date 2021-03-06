
var express = require("express");

var router = express.Router();

var db = require("../models");
// db.sequelize.sync();


router.get("/", function (req, res) {
    res.redirect("/burgers");
});

//GET all burgers
router.get("/burgers", function (req, res) {
    var query = {};
    if (req.query.customer_id) {
        query.CustomerId = req.query.customer_id;
    }
    db.Burger.findAll({
        where: query,
        include: [db.Customer]
    }).then(function (data) {
        var burgerObj = {
            burgers: data
        };
        res.render("index", burgerObj);
    });
});

//Post new burger input
router.post("/burgers/create", function (req, res) {
    db.Burger.create({
        burger_name: req.body.burger_name
    }).then(function (data) {
        res.redirect("/burgers");
    });
});

//update input with customer name and devoured
router.put("/burgers/:id", function (req, res) {

    var burgerEaten = req.body.devoured;
    var burgerId = req.params.id;
    //creating a customer from user input
    if (req.body.customer_name === "") {
        console.log("Please enter Customer name");
    } else {
        db.Customer.create({
            name: req.body.customer_name
        }).then(function (data) {
            //updating the burger table with the new customer input
            db.Burger.update({
                devoured: burgerEaten,
                CustomerId: data.id
            }, {
                    where: {
                        id: burgerId
                    },
                    include: [db.Customer]

                }).then(function (data) {
                    console.log(data);
                    res.redirect("/burgers");
                });
        });
    };



});


module.exports = router;