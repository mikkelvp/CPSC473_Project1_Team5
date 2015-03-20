// Global Variables
var $activeContainer = $('#homepage');

var main = function () {

  // Used in submission of new question
  $('#datetimepicker').datetimepicker();

  $('.mainChanger').click(function(e) {
    // Prevent normal function of link & fade the current active page
    e.preventDefault();
    $activeContainer.fadeOut('fast');
    
    // Check class of clicked element for id of page to change to & set active page
    if ($(this).hasClass('homepage')) {
      $('#homepage').fadeIn('fast');
      $activeContainer = $('#homepage');
    }
    else if ($(this).hasClass('questions')) {
      loadQuestions();
      $('#questions').fadeIn('fast');
      $activeContainer = $('#questions');
    }
    else if ($(this).hasClass('newQuestion')) {
      $('#newQuestion').fadeIn('fast');
      $activeContainer = $('#newQuestion');
    }
    else if ($(this).hasClass('question')) {
      $('#question').fadeIn('fast');
      $activeContainer = $('#question');
    }

  });
  
  // On button press - submit question
  $('#submitBtn').click(function(e) {
    e.preventDefault();
    submitQuestion();
  });
    
    /*
    // Loop through answers and insert them in answers array
    $('#answerList li').each(function() {
      answers.push($(this).text());
    });
    
    jsonObject.isActive = true;
    jsonObject.question = question;
    jsonObject.answers = answers;
    jsonObject.expirationDate = Date.now().toString();
    //jsonObject.images = ;
    
  });*/

};

$(document).ready(main);

function changePage (idOfPage, callback) {
  // Pass in the string value of the id to change to e.g. #homepage
  $activeContainer.fadeOut('fast');
  $(idOfPage).fadeIn('fast');
  $activeContainer = $(idOfPage);
  if (typeof callback == "function") {
    callback();
  }
}

function loadQuestions () {
  // Return all questions
  $.get('/api/questions', function (questions) {
    $('#questions .jumbotron .container').empty();
    $.each(questions, function() {
      var item = $('<div class="item">');
      var _q = $('<h2>');
      item.append(_q.text(this.title));
      $('#questions .jumbotron .container').prepend(item);
    });
  });
}

function loadQuestion (id) {
  // Return single question with specified id
  console.log("testing loadQuestion");
  $.get('/api/questions/:' + id, function (question) {
    $('#question .jumbotron .container').empty();
    $('#question .jumbotron .container').append(question);
  });
}

function submitQuestion () {
  // Submits new question JSON object to server
  var question = {
    id:0,
    isActive:false,
    title:"",
    body:"",
    answers:{},
    expirationDate:{},
    image:{},
    comments:{}
  };
  
  if($("#qTitle input").val() !== "" && $("#qBody textarea").val() !== "" && $("#expDate input").val() !== "") {
    question.title = $("#qTitle input").val();
    question.body = $("#qBody textarea").val();
    question.image = $("#image input").val();
    //checking if the date/time entered is valid
    var currDate = new Date();
    if(new Date($("#expDate input").val()) < currDate) {
      $("#expDate input").val("");
      alert("Please select a date/time later than the current date/time.");
    }
    else {
      question.expirationDate = new Date($("#expDate input").val());
      
      //post request
      $.post('/api/questions', question, function (response) {
        console.log("client side:" + response.id);
        changePage('#question', loadQuestion(response.id));
      });
      /*
      //resetting parameters
      $("#qTitle input").val("");
      $("#qBody textarea").val("");
      $("#image input").val("");
      $("#expDate input").val("");*/
    }
  }
  else {
    alert("Please enter the question title, question body, and the expiration date.");
  }
}