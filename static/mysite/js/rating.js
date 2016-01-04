$(document).ready(function(){
var rating = 0;

	$('.ratingStar').click(function(){
		id = $(this).attr("id").split("-")[1];
		rating = id;
		$('.ratingStar').html("&#9734")
		for (var i = 0; i < id; i++){ 
			$('#ratingStar-'+ (i + 1)).html("&#9733");
		}
		$.ajax({
	        type: 'POST',
	        url: '/lessons/course_rate/',
	        data: {
	        	'coursepk': $("#coursepk").html(),
	        	'rating': rating
	        }
		});
	});
});