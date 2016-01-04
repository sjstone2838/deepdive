$(document).ready(function(){
	$('.dataHeader').click(function(){
		if ($(this).hasClass("clicked")){
			$(this).find(".arrow").html("&#9660"); // down arrow
			$(this).removeClass("clicked");
			$(this).parent().find(".dataDetails").slideUp("slow");
		}
		else{
			$(this).find(".arrow").html("&#9650"); // up arrow
			$(this).addClass("clicked");
			$(this).parent().find(".dataDetails").slideDown("slow");	
		}
	});
});