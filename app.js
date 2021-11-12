

const express = require("express");
const bodyParser = require("body-parser");


const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect('mongodb+srv://saiprakashr42:098274543845@cluster0.eytzc.mongodb.net/todolistDB', { useNewUrlParser: true, useUnifiedTopology: true });

const itemsSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("Item", itemsSchema);


const item1 = new Item({
  name: "Code daily"
});


const item2 = new Item({
  name: "Learn new things daily"
});


const defaultItems = [item1, item2];


app.get("/", function (req, res) {

  Item.find({}, function (err, foundItems) {

    if (foundItems.length === 0) {

      Item.insertMany(defaultItems, function (err) {
        err ? console.log(err) : console.log("Succesfully default Items to database");
      });

      res.redirect('/');


    } else {
      res.render("list", { listTitle: "TodoList", newListItems: foundItems });
    }

  })

});



app.post("/", function (req, res) {

  const itemName = req.body.newItem;
  const item = new Item({
    name: itemName
  });

    item.save();
    res.redirect("/");
});



app.post('/delete', function (req, res) {
  const checkedItemId = req.body.checkbox;
 

  
    Item.findByIdAndRemove(checkedItemId, function (err) {
      err ? console.log(err) : console.log("Succesffully deleted checked Item");
      res.redirect('/');
    })
  
  })

  



app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");

});
