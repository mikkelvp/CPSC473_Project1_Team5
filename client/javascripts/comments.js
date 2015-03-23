
var main = function () {
  
  var info={
    id:0,
    comment:"",
    user:""
  };


  var readInfo = function () {
    if($(".comments input").val() !== "" && $(".comments textarea").val() !== "") {   //fields should not be empty
      info.user=$(".comments input").val();
      info.comment=$(".comments textarea").val();


      $.post('api/comments', info, function (response) {
        var usernameElement = $("<h3>"), commentElement = $("<p>");
        usernameElement.addClass("username");
        usernameElement.text(info.user);
        commentElement.text(info.comment);
        $(".comments-area").append(usernameElement);
        $(".comments-area").append(commentElement);

      });

      //empty the fields
      $(".comments input").val("");
      $(".comments textarea").val("");
    }
  };

  $(".comments button").on("click", function (event) {
    readInfo();
    return false;
  });

  $(".comments textarea").on("keypress", function (event) {
    if (event.keyCode === 13) {
      readInfo();
      return false;
    }
  });
};

$(document).ready(main);
