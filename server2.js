//Michael's server didn't work for me for some reason, so I just made a mini version of the server
//later we could just merge this with Michael's server since it is more complete

var express = require("express"),
    http = require("http"),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    app = express(),
    comments = JSON.parse(fs.readFileSync('json/comments.json', 'utf8')),
    questions = JSON.parse(fs.readFileSync('json/questions.json', 'utf8'));
    //still need to add answers array

app.use(express.static(__dirname + "/Website"));

// tell Express to parse incoming
// JSON objects
app.use(bodyParser.urlencoded({extended:true}));


http.createServer(app).listen(3000);
console.log("Server listening to port 3000");

app.post("/comments", function (req, res) {
   var newCommentObj = req.body;
   newCommentObj.id = comments.length+1;
   comments[newCommentObj.id-1] = newCommentObj;

   //for debugging purposes, to check if comments are successfully being saved in the server
   var i;
   for(i=0; i<comments.length; i++) {
     console.log(comments[i]);
   }
   console.log('---');

   res.json(newCommentObj);
});

app.post("/questions", function (req, res) {
  var newQuestion = req.body,
    currDate = new Date();
  newQuestion.id = questions.length+1;
  newQuestion.isActive = true;
  questions[newQuestion.id-1] = newQuestion;
  //this if statement should eventually go somewhere else, where the client is requesting the server for the list of all questions.
  if(newQuestion.expirationDate < currDate) {
    newQuestion.isActive = false
  }
  res.json(newQuestion);
});
