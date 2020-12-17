const express = require("express");

const axios = require("axios");
const ejs = require("ejs");
var JSAlert = require("js-alert");
var bodyParser = require("body-parser");

var dat = {};
var err = "";

const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function (req, response){
//   axios.get(' https://cricapi.com/api/playerStats?pid='+v, {
//   headers: {
//    'apikey': 'X6sFEeyufChRsJ46VxB9mzzrdpk2'
//   }
// })
// .then((res) => {
//   p = res.data['imageURL'];
//   console.log(p);
// })
// .catch((error) => {
//   console.error(error)
// })
response.render("index",);
})
app.get("/details", function (req, res){
  res.render('details');
})
app.post("/", function(req, res){
  const v = req.body.search;
    axios.get(' https://cricapi.com/api/playerStats?pid='+v, {
    headers: {
     'apikey': 'X6sFEeyufChRsJ46VxB9mzzrdpk2'
    }
  })
  .then((resp) => {
    console.log(resp.data);
    if(resp.data["error"] === 'error'){
      JSAlert.alert("CANNOT FIND");
      console.log("cannont find!!!");
      res.render("index");
    }
    else{
    // const ['bowling', 'batting'] = resp.data['data'];
    res.render("details",{data:resp.data,
    bowl:resp.data['data'].bowling,
    bat: resp.data['data'].batting});}
  })
  .catch((error) => {
    console.error(error)
  })
console.log(v);
})

app.listen(3000, function(){
  console.log("port 3000");
})
