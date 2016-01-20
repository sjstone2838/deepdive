$(document).ready(function(){
	// increment login count to 1 in views.py, so that welcome does not reappear on refresh
	$.ajax({
        type: 'POST',
        url: '/lessons/increment_logins/',
	});

	var welcomeIndex = 0;

	$(".welcomeBackground").fadeIn(2000);
	$(".welcomeBlock").fadeIn(2000);
	$(".highlight").css("border","none").attr("disabled","disabled");

	$('#welcomeCloseBox').click(function(){
		$(".highlight").css("border","none").removeAttr("disabled");
		$("#welcomeCloseBox").fadeOut("slow");
		$(".welcomeBlock").fadeOut("slow");
		$(".welcomeBackground").fadeOut("slow");
	});

	$('.endWelcome').click(function(){
		$(".highlight").css("border","none").removeAttr("disabled");
		$("#welcomeCloseBox").fadeOut("slow");
		$(".welcomeBlock").fadeOut("slow");
		$(".welcomeBackground").fadeOut("slow");
	});

	function showHighlights(welcomeIndex){
		$(".highlight").css("box-shadow","none");
		if (welcomeIndex == 1){
			$(".addCourse").css("box-shadow", "0px 0px 30px 15px yellow");
			$("#learnBtn").css("box-shadow", "0px 0px 30px 15px yellow");
		}
		else if (welcomeIndex == 2){
			$("#teachBtn").css("box-shadow", "0px 0px 30px 15px yellow");
		}
		else if (welcomeIndex == 3){
			$("#analyzeBtn").css("box-shadow", "0px 0px 30px 15px yellow");
		}
		else {}
	}
	//SHIFT RIGHT
	$("#nextBtn").click(function(){
		$("#indexBall-" + welcomeIndex).removeClass("indexBallHighlight");
		//$("#welcomeBlock-" + welcomeIndex).toggle("slide", {direction:'left'}) // For slide action; requires jQuery-UI
		$("#welcomeBlock-" + welcomeIndex).addClass("Hide");
		welcomeIndex ++;
		welcomeIndex = welcomeIndex % 5;
		//$("#welcomeBlock-" + welcomeIndex).delay(300).toggle("slide", {direction:'right'}); // For slide action; requires jQuery-UI
		$("#welcomeBlock-" + welcomeIndex).removeClass("Hide");
		$("#indexBall-" + welcomeIndex).addClass("indexBallHighlight")
		showHighlights(welcomeIndex);
	});

	//SHIFT LEFT
	$("#backBtn").click(function(){
		$("#indexBall-" + welcomeIndex).removeClass("indexBallHighlight");
		//$("#welcomeBlock-" + welcomeIndex).toggle("slide", {direction:'left'}) // For slide action; requires jQuery-UI
		$("#welcomeBlock-" + welcomeIndex).addClass("Hide");
		welcomeIndex --;
		if (welcomeIndex == -1){
			welcomeIndex = 4;
		}
		//$("#welcomeBlock-" + welcomeIndex).delay(300).toggle("slide", {direction:'right'}); // For slide action; requires jQuery-UI
		$("#welcomeBlock-" + welcomeIndex).removeClass("Hide");
		$("#indexBall-" + welcomeIndex).addClass("indexBallHighlight")
		showHighlights(welcomeIndex);
	});
});