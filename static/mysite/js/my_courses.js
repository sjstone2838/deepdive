$(document).ready(function(){
//	NOTE: JS USED BY INDEX.HTML AND MY_COURSES.HTML
var coursepk = 0;
	
	// remove course from enrolled list; INDEX.HTML
	$(".removeCourse").click(function(){
		$("#removeCourseAlert").removeClass("Hide");
		coursepk = $(this).attr("id");
		coursepk = coursepk.split(".")[1];
	});

	$("#removeCourseBtn").click(function(){
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

	$("#removeCourseClose").click(function(){
		$("#removeCourseAlert").addClass("Hide");
	});

	// enroll in course; MY_COURSES.HTML
	$(".addCourse").click(function(){
		coursepk = $(this).attr("id");
		coursepk = coursepk.split(".")[1];
		console.log(coursepk);
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