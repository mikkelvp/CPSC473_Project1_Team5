var main = function () {
	$(".question-answers").on("click", function (event) {   	
    	var answerType=
    	{
    		type:""
    	};
    	//if type is like, set type to upVote, if not to downVote
    	var id=event.target.id,
    		idType = id.substring(0,1),
    		idNum = id.substring(1);
    	if(idType =="+") {
    		answerType.type="upVote";
    	}
    	else if(idType =="-") {
    		answerType.type="downVote";
    	}

    	$.post('api/answers/'+idNum, answerType, function (response) {
    		//print out the upVotes and downVotes	
    		$(".votes"+response.id).text("+"+response.upVotes+", -"+response.downVotes);
    		
    	});
  })
}

$(document).ready(main);