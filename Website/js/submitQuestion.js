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

function printOutcome (response) {
  var out = $("<p>");
  out.text("Returned from the server: Question id "+response.id+", title:"+response.title+", body:"+response.body+", expDate:"+response.expirationDate);
  $("#questions").append(out);
}

var main = function () {
  "use strict";
  console.log("eh");
  jQuery('#datetimepicker').datetimepicker();

  $("#submit a").on("click", function (event) {
    if($("#qTitle input").val() !== "" && $("#qBody textarea").val() !== "" && $("#expDate input").val() !== "") {
      console.log("fields not empty");
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
        $.post('questions', question, function (response) {
          console.log("client side:" + response);
          printOutcome(response);
          alert("Your question has been submitted!");
        });

        //resetting parameters
        $("#qTitle input").val("");
        $("#qBody textarea").val("");
        $("#image input").val("");
        $("#expDate input").val("");
      }
    }
    else {
      alert("Please enter the question title, question body, and the expiration date.");
    }
  });
};
$(document).ready(main);
