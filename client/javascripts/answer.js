//for reading in the suggested answer in the question page

var main = function () {
  

  var answer={
    id:0,
    upVotes:0,
    downVotes:0,
    answer:""
    
  };


  var readAnswer = function () {
    if($(".suggest input").val() !== "") {   //fields should not be empty
      
      answer.answer=$(".suggest input").val();
      
      $.post('api/answers', answer, function (response) {
        $(".question-answers").append($("<li>").text(answer.answer));
      });

      //empty the fields
      $(".suggest input").val("");
    }
  };

  $(".suggest button").on("click", function (event) {
    readAnswer();
    return false;
  });

  $(".suggest input").on("keypress", function (event) {
    if (event.keyCode === 13) {
      readAnswer();
      return false;
    }
  });
};

$(document).ready(main);
