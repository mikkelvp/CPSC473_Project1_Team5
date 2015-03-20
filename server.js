#!/usr/bin/env node

var express = require('express'),
	http = require('http'),
	app = express(),
	fs = require('fs'),
	bodyParser = require('body-parser'),
	router = express.Router(),
	// read data from JSON files
	questions = JSON.parse(fs.readFileSync('json/questions.json', 'utf8')),
	comments = JSON.parse(fs.readFileSync('json/comments.json', 'utf8')),
	answers = JSON.parse(fs.readFileSync('json/answers.json', 'utf8'));

app.use(express.static(__dirname + "/Website"));

// set up body-parser to get POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

http.createServer(app).listen(3000);
console.log("Service started on port 3000");

// routes
router.route('/questions')
// return all questions
// GET /questions
.get(function(req, res) {
	var currDate = new Date();
	//if expiration date passed, set question to not active
	for(var i=1; i<questions.length; i++) {
		//console.log(currDate);
		//console.log(questions[i].expirationDate);
		if(questions[i].expirationDate < currDate)
			questions[i].isActive = false;
	}
	res.json(questions);
})
// POST /questions
.post(function(req, res) {
	//console.log(req.body);
	req.body.id = questions.length; // set id to be the next element in the array
	questions[req.body.id] = req.body; // push object from client to array

	res.json({recieved: true, id: req.body.id}); // return something
});

router.route('/answers')
// GET /answers
.get(function(req, res) {
	res.json(answers);
})
// POST /answers
.post(function(req, res) {
	req.body.id = answers.length; 
	answers[req.body.id] = req.body;
	res.json({recieved: true, id: req.body.id});
});

router.route('/comments')
// GET /comments
.get(function(req, res) {
	res.json(comments);
})
// POST /comments
.post(function(req, res) {
	comments[req.body.id] = req.body;
	res.json({recieved: true, id: req.body.id});
});

router.route('/questions/:question_id')
// GET /questions//:question_id
.get(function(req, res) {
	res.json(questions[req.params.question_id]);
});

router.route('/answers/:answer_id')
// GET /answers/:answer_id
.get(function(req, res) {
	res.json(answers[req.params.answer_id]);
});

router.route('/comment/:comment_id')
// GET /comment:comment_id
.get(function(req, res) {
	res.json(comments[req.params.comment_id]);
});


// add /api to routes
app.use('/api', router);
