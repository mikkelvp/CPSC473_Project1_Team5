// Global Variables
var $activeContainer;        // Controls which page is being shown
var $activeQuestion;    // Controls which question on the questions page shows answers below it

var main = function () {

  // Used in submission of new question
  $('#datetimepicker').datetimepicker();

  // Change Pages
  $activeContainer = $('#homepage');
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
  
  // On button press - submit new question
  $('#submitBtn').click(function(e) {
    e.preventDefault();
    submitQuestion();
  });
  
  // Click on question - view question in detail
  $activeQuestion = null;
  $(document).on('click', '.item h2', function () {
    //changePage('#question', loadQuestion($(this).attr('questionId')));
    loadAnswers($(this).parent('.item').attr('questionId'));
  });
  
  // Click on submit button - submit answer to question
  $(document).on('click', '#submitAnswerBtn', function () {
    
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
  $activeContainer.fadeOut('fast', function () {
    $(idOfPage).fadeIn('fast');
    $activeContainer = $(idOfPage);
    if (typeof callback == "function") {
      callback();
    }
  });
}

function loadQuestions () {
  // Return all questions
  $.get('/api/questions', function (questions) {
    var questionContainer = $('#questions .jumbotron .container #frontPage');
    questionContainer.empty();
    $.each(questions, function() {
      if (this.id) {
        var item = $('<div class="item" questionId="' + this.id + '">');
        var _q = $('<h2>');
        item.append(_q.text(this.title));
        questionContainer.prepend(item);
      }
    });
  });
}

function loadAnswers (questionId) {
  // Return single question with specified id and display it below the question clicked
  $.get('/api/questions/' + questionId, function (question) {
    var answerContainer = $('<div questionId="' + question.id + '">');
    $.each(question.answers, function (key, value) {
      answerContainer.append($('<p class="answer" answerId="' + key + '">').text(value));
    });
    answerContainer.hide();
    
    var $questionContainer = $('.item[questionId="' + question.id + '"]');
    
    if ($activeQuestion) {
      if ($activeQuestion.is($questionContainer)) {
        $('.item[questionId="' + question.id + '"] div').slideUp('fast', function () {
          $('.item[questionId="' + question.id + '"] div').remove();
          $activeQuestion = null;
        });
      }
      else {
        $activeQuestion.find('div .answer').slideUp('fast', function () {
          $('.item div[questionId="' + $activeQuestion.attr('questionId') + '"]').remove();
          $activeQuestion = $questionContainer;
          $activeQuestion.append(answerContainer);
          answerContainer.slideDown('fast');
        });
      }
    }
    else {
      $activeQuestion = $questionContainer;
      $activeQuestion.append(answerContainer)
      answerContainer.slideDown('fast');
    }
    
  });
}

function loadQuestion (id) {
  // Return single question with specified id
  $.get('/api/questions/' + id, function (question) {
    var item = $('<div questionId="' + question.id + '">');
    $('#question .jumbotron .container').empty();
    
    item.append($('<h2>').text(question.title));
    item.append($('<p>').text(question.body));
    item.append();
    if (question.isActive !== true) {
      item.append($('<h3>').text('Status: Inactive'));
    }
    else {
      item.append($('<h3>').text('Status: Active'));
      item.append($('<button id="submitAnswerBtn" class="btn btn-default" role="button">Submit</button>'))
    }
    $('#question .jumbotron .container').append(item);
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