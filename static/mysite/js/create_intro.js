$(document).ready(function(){
	function showOrientation(){
		$(".welcomeBackground").css("z-index","2").fadeIn(2000);
		$(".welcomeBlock").css("z-index","2").fadeIn(2000);
		$("#welcomeCloseBox").fadeIn(2000);
	}

	//increment createvisits count to 1 in views.py, so that orientation does not reappear on refresh
	$.ajax({
        type: 'POST',
        url: '/lessons/increment_createvisits/',
        success: function(response) {
        	if (response.visitcount == 1){
        		showOrientation();
        	}
		}
	});

	var welcomeIndex = 0;

	$("#courseHelp").click(function(){
		showOrientation();
	});

	$('#welcomeCloseBox').click(function(){
		$(".highlight").css("border","none");
		$("#welcomeCloseBox").fadeOut("slow");
		$(".welcomeBlock").fadeOut("slow");
		$(".welcomeBackground").fadeOut("slow");
	});

	$('.endWelcome').click(function(){
		$(".highlight").css("border","none");
		$("#welcomeCloseBox").fadeOut("slow");
		$(".welcomeBlock").fadeOut("slow");
		$(".welcomeBackground").fadeOut("slow");
	});

	// SHIFT RIGHT
	$(".nextBtn").click(function(){
		$("#indexBall-" + welcomeIndex).removeClass("indexBallHighlight");
		//$("#welcomeBlock-" + welcomeIndex).toggle("slide", {direction:'left'}) // For slide action; requires jQuery-UI
		$("#welcomeBlock-" + welcomeIndex).addClass("Hide");
		welcomeIndex ++;
		welcomeIndex = welcomeIndex % 10;
		//$("#welcomeBlock-" + welcomeIndex).delay(300).toggle("slide", {direction:'right'}); // For slide action; requires jQuery-UI
		$("#welcomeBlock-" + welcomeIndex).removeClass("Hide");
		$("#indexBall-" + welcomeIndex).addClass("indexBallHighlight")
	});

	//SHIFT LEFT
	$(".backBtn").click(function(){
		$("#indexBall-" + welcomeIndex).removeClass("indexBallHighlight");
		//$("#welcomeBlock-" + welcomeIndex).toggle("slide", {direction:'left'}) // For slide action; requires jQuery-UI
		$("#welcomeBlock-" + welcomeIndex).addClass("Hide");
		welcomeIndex --;
		if (welcomeIndex == -1){
			welcomeIndex = 9;
		}
		//$("#welcomeBlock-" + welcomeIndex).delay(300).toggle("slide", {direction:'right'}); // For slide action; requires jQuery-UI
		$("#welcomeBlock-" + welcomeIndex).removeClass("Hide");
		$("#indexBall-" + welcomeIndex).addClass("indexBallHighlight")
	});
});