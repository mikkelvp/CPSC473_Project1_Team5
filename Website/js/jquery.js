

var main = function () {

  // Switch pages
  var $activeContainer = $('#homepage');
  
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
  $('#questionForm button').click(function() {
    // create JSON string by pulling from HTML DOM objects
    var jsonObject = {};
    var question = $('').val();
    var answers = {};
    
    if (question === "") {
      alert("Please fill out all form entries");
      return;
    }
    
    // Loop through answers and insert them in answers array
    $('#answerList li').each(function() {
      answers.push($(this).text());
    });
    
    jsonObject.isActive = true;
    jsonObject.question = question;
    jsonObject.answers = answers;
    jsonObject.expirationDate = Date.now().toString();
    //jsonObject.images = ;
    
  });

};

$(document).ready(main);

function loadQuestions () {
  // Return list of questions
  $.post('/questions', function (questions) {
    $('#questions .jumbotron .container').empty();
    $.each(questions, function() {
      var item = $('<div class="item">');
      var _q = $('<h2>');
      item.append(_q.text(this.title));
      $('#questions .jumbotron .container').prepend(item);
    });
  });
}