function loadQuestion(questionID) {
	$.get("api/questions/"+questionID, function(response) {
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
		expElement.text("Question expires in "+hours+" hours "+minutes+" mins");

		//updating image
		if(response.image!="") {
			$(".question-img").attr("src",response.image);
		}
		else {
			$(".question-img").attr("src","http://triplecrit.com/wp-content/themes/creativemag/images/default.png");
		}


		$(".active").append($("<span>").text(response.title));
		$(".question-head").prepend(titleElement);
		$(".question-head").append(expElement);
		$(".question-body").prepend(bodyElement);

		//updating answers
		var getReq; 
		for(var i=0; i<response.answers.length; i++) { 
			getReq = "api/answers/"+response.answers[i];
			$.get(getReq, function(response) {
				
		        var divTemp = $("<div>");
		        var spanTemp = $("<span>").addClass("btn-option");

		        divTemp.append();
		        
		        var buttonInc = $("<button>");
		        buttonInc.attr("type","button");
		        buttonInc.addClass("btn btn-success btn-xs like");
		        buttonInc.attr("id","+"+response.id);

		        var buttonDec = $("<button>");
		        buttonDec.addClass("btn btn-danger btn-xs dislike");
		        buttonDec.attr("type","button");
		        buttonDec.attr("id","-"+response.id);
		        
		        spanTemp.append(buttonInc);
		        spanTemp.append(buttonDec);

		        divTemp.append(spanTemp);
		        divTemp.append($("<span>").addClass("option").text(response.answer));
		        divTemp.append($("<span>").addClass("votes"+response.id).text("+"+response.upVotes+", -"+response.downVotes));
		        
		        $(".question-answers").append(divTemp);	
				
			});
		}

		//updating comments
		for(var i=0; i<response.comments.length; i++) { 
			var getReq2 = "api/comments/"+response.comments[i];
			$.get(getReq2, function(response){
				
				var usernameElement = $("<h3>"), commentElement = $("<p>");
		        usernameElement.addClass("username");
		        usernameElement.text(response.user);
		        commentElement.text(response.comment);
		        $(".comments-area").append(usernameElement);
		        $(".comments-area").append(commentElement);
			});
		}
		

	});

}


//for displaying question
var main = function () {
	$.get("api/currQuestion", function(response) {
		loadQuestion(response.id);	
	});
		


};

$(document).ready(main);