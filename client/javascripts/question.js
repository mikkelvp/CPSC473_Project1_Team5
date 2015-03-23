//for displaying question
var main = function () {

	//need to figure out a way to change the id number after api/questions/
	$.get("api/questions/1", function(response) {
		var diffSec = new Date(response.expirationDate).getTime() - new Date().getTime(),
		 	hours, minutes, expString;

		//computing the remaining time until expiration
		hours = Math.floor(diffSec / 3600);
		diffSec %= 3600;
		minutes = Math.floor(diffSec / 60);

		var titleElement = $("<h1>"), bodyElement = $("<p>"), expElement = $("<p>");
		titleElement.addClass("no-margin");
		titleElement.text(response.title);
		bodyElement.text(response.body);
		expElement.addClass("expires");
		expElement.text("Expiration date: "+ new Date(response.expirationDate)+", question expires in "+hours+" hours "+minutes+" mins");


		$(".active").append($("<span>").text(response.title));
		$(".question-head").prepend(titleElement);
		$(".question-head").append(expElement);
		$(".question-body").prepend(bodyElement);

		var getReq; 
		for(var i=1; i<=response.answers.length; i++) { 
			getReq = "api/answers/"+i;
			$.get(getReq, function(response) {
				//console.log(response.answer);	
				$(".question-answers").append($("<li>").text(response.answer));
			});
		}
		

	});
};

$(document).ready(main);