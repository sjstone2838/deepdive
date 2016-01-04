$(document).ready(function(){
	var welcomeIndex = 0;

	$(".welcomeBackground").fadeIn(2000);
	$(".welcomeBlock").fadeIn(2000);

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

	function showHighlights(welcomeIndex){
		$(".highlight").css("border","none");
		if (welcomeIndex == 1){
			$("#enrollBtn").css("border","15px yellow solid");
			$("#learnBtn").css("border","15px yellow solid");
		}
		else if (welcomeIndex == 2){
			$("#teachBtn").css("border","15px yellow solid");
		}
		else if (welcomeIndex == 3){
			$("#analyzeBtn").css("border","15px yellow solid");
		}
		else {}
	}

	$(".welcomeBlock").click(function(){
		$("#indexBall-" + welcomeIndex).removeClass("indexBallHighlight");
		$("#welcomeBlock-" + welcomeIndex).toggle("slide", {direction:'left'}) // For slide action; requires jQuery-UI
		//$("#welcomeBlock-" + welcomeIndex).addClass("Hide");
		welcomeIndex ++;
		welcomeIndex = welcomeIndex % 5;
		$("#welcomeBlock-" + welcomeIndex).delay(300).toggle("slide", {direction:'right'}); // For slide action; requires jQuery-UI
		//$("#welcomeBlock-" + welcomeIndex).removeClass("Hide");
		$("#indexBall-" + welcomeIndex).addClass("indexBallHighlight")
		showHighlights(welcomeIndex);
		//console.log ("line21");
	});
});