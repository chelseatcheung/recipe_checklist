var express= require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');
var request = require('request');

var dotenv = require('dotenv');
dotenv.load();

// app.get('/', function (req, res) {
//   res.send('')
// })
app.use(bodyParser.json());
app.use(express.static(__dirname));

var searchRecipe = 'http://api.yummly.com/v1/api/recipes?_app_id=' + process.env.APPID + '&_app_key=' + process.env.APIKEY + '&q=';


app.post('/callyumly', function(req, res, next){
  var sendBack;
  var query = searchRecipe + req.body.info
  request(query, function (error, response, body) {
    if(error){
        return console.log('Error:', error);
    }
    if(response.statusCode !== 200){
        return console.log('Invalid Status Code Returned:', response.statusCode);
    }
    sendBack = response.body;
    res.send(sendBack);
  });
});



app.listen(process.env.PORT || 8000);
console.log('Listening...');

