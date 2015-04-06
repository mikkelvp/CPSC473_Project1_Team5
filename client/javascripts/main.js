var main = function () {	
	$.get("api/questions", function(response) {
		for(var i=1; i<=response.length; i++) {
			if(response[i].isActive) {
				var qElement = $("<a>");
				qElement.attr("id",response[i].id);
				qElement.attr("href","/index.html");
				qElement.text(response[i].title);				
				$(".question-list").append(qElement);
				$(".question-list").append($("<br>"));
			}
		}

	});


	$(".question-list").click(function(event) {	  
		var reqStr = "api/currQuestion/"+event.target.id;
		
		$.get(reqStr, function(response) {
		}); 
  });


};

$(document).ready(main);

