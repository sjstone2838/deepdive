$(document).ready(function(){

	// remove course from enrolled list
	$(".removeCourse").click(function(){
		coursepk = $(this).attr("id");
		coursepk = coursepk.split(".")[1];
		call = "remove"
		$.ajax({
		        type: 'POST',
		        url: '/lessons/manage_enrollment/',
		        data: {'coursepk':coursepk, 'call': call},
		        success: function(response) {
	            	location.reload();
	        	}
		    });
	});	

	// enroll in course 
	$(".addCourse").click(function(){
		coursepk = $(this).attr("id");
		coursepk = coursepk.split(".")[1];
		call = "enroll"
		$.ajax({
		        type: 'POST',
		        url: '/lessons/manage_enrollment/',
		        data: {'coursepk':coursepk, 'call': call},
		        success: function(response) {
	            	location.reload();
	        	}
		    });
	});	
});