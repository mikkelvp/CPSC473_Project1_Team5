var question = {
  id:0,
  isActive:false,
  title:"",
  body:"",
  answers:[0],
  expirationDate:[0],
  image:"",
  comments:[0]
};

var main = function () {

  jQuery('#datetimepicker').datetimepicker();

  $("#submit a").on("click", function (event) {
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
        $.post('api/questions', question, function (response) {
          console.log("client side:");
	  console.log(response);
          //printOutcome(response);
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
