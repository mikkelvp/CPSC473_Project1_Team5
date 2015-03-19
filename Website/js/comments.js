var main = function () {
  "use strict";

  console.log("test");

  var info={
    id:0,
    comment:"",
    user:""
  };

  var readInfo = function () {
    if($(".username-input input").val() !== "" && $(".comment-input textarea").val() !== "") {
      info.user=$(".username-input input").val();
      info.comment=$(".comment-input textarea").val();

      $.post('comments', info, function (response) {
        console.log("client side");
        console.log(response);
        alert("Your comment has been posted");   //eventually get rid of this alert and append the current comment to the html page at the end of comment section

      });

      //empty the fields
      $(".username-input input").val("");
      $(".comment-input textarea").val("");
    }
  };

  $(".submit button").on("click", function (event) {
    readInfo();
  });

  $(".comment-input textarea").on("keypress", function (event) {
    if (event.keyCode === 13) {
      readInfo();
    }
  });
};

$(document).ready(main);
