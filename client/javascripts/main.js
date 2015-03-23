var main = function () {
	
	$.get("api/questions", function(response) {
		for(var i=1; i<=response.length; i++) {
			if(response[i].isActive) {
				var qElement = $("<a>");
				//qElement.attr("href","/index.html");
				qElement.attr("id",response[i].id);
				qElement.text(response[i].title);
				$(".question-list").append(qElement);
				$(".question-list").append($("<br>"));
			}
		}

	});


};

$(document).ready(main);