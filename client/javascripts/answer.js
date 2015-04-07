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
        
        var divTemp = $("<div>");
        var spanTemp = $("<span>").addClass("btn-option");

        divTemp.append();
        
        var buttonInc = $("<button>");
        buttonInc.attr("type","button");
        buttonInc.attr("id","+"+response.id);
        buttonInc.addClass("btn btn-success btn-xs like");
        
        var buttonDec = $("<button>");
        buttonDec.addClass("btn btn-danger btn-xs dislike");
        buttonDec.attr("type","button");
        buttonDec.attr("id","-"+response.id);
        
        spanTemp.append(buttonInc);
        spanTemp.append(buttonDec);

        divTemp.append(spanTemp);
        divTemp.append($("<span>").addClass("option").text("   "+answer.answer));
        divTemp.append($("<span>").addClass("votes"+response.id).text("+"+response.upVotes+", -"+response.downVotes));
        
        $(".question-answers").append(divTemp);


        
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
