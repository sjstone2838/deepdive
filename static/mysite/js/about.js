$(document).ready(function(){

	$('#overviewBtn').click(function(){
		$(".about").css("display","none");
		$('#overview').fadeIn("fast");
	});

	$('#guideBtn').click(function(){
		$(".about").css("display","none");
		$('#guide').fadeIn("fast");
	});

	$('#designBtn').click(function(){
		$(".about").css("display","none");
		$('#design').fadeIn("fast");
	});

	$('#contactsBtn').click(function(){
		$(".about").css("display","none");
		$('#contacts').fadeIn("fast");
	});

	$('.closeBox').click(function(){
		$(this).parent().fadeOut("fast");
	});

});