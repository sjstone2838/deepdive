$(document).ready(function(){	
	
	function getCourseData(coursepk, course_name){
		$.ajax({
	        type: 'POST',
	        url: '/lessons/publish/',
	        data: {'coursepk': coursepk},
	        success: function(response) {
			}
		});
	}

	$("#courseSelect").change(function(){
		getCourseData($(this).val(),$("option:selected").text());
	});


	$(".tab").click(function(){
		$(".tab").css("background-color","#f1f1f4").css("border-top","2px solid lightgrey").css("border-left","2px solid lightgrey").css("border-right","2px solid lightgrey");
		$(this).css("background-color","lightgrey").css("border","none");
		$(".analyzeBlock").addClass("Hide");
		$(".publish").css("display","none");
		if ($(this).attr("id") == "courseInviteTab"){
			$("#courseInviteBlock").removeClass("Hide");
			$("#publishCourseInvites").css("display","inline-block");
		} else {
			$("#newUserInviteBlock").removeClass("Hide");
			$("#publishNewUserInvites").css("display","inline-block");
		}
	});

	$("#newUserEmailEntry").keypress(function (e) {
		var key = e.which;
		if(key == 13 && $(this).val() != ""){  // the enter key code
			// verify actual email address
			alias = $(this).val().split('@')[0]
			domain = "";
			suffix = "";
			if ($(this).val().split('@')[1] != undefined){
				domain = $(this).val().split('@')[1].split('.')[0];
				if ($(this).val().split('@')[1].split('.')[1] != undefined){
					suffix = $(this).val().split('@')[1].split('.')[1];
				}
			}

			if (alias.length == 0 || domain.length == 0 || suffix.length == 0){
				$("#errorText").text("Invalid email. Please use another email.");
			} else if ($(this).val().split(' ').length != 1){
				$("#errorText").text("Invalid email. Please use an address without spaces");
			} else {
				$("#newUserEmails").append("<div class = 'emailContainer'><span class = 'emailAddress'>" + $(this).val() + "</span><div class = 'btn btn-default removeBtn'> Remove </div></div>");
				$(this).val(""); 
			}
		}
		$(".removeBtn").click(function(){
			$(this).parent().remove();
		});
	}); 

	$("#searchUsers").keypress(function (e) {
		var key = e.which;
		if(key == 13 && $(this).val() != ""){  // the enter key code
			$("#searchResults").html("");
			$.ajax({
		        type: 'POST',
		        url: '/lessons/search_users/',
		        data: {'search': $(this).val()},
		        success: function(response) {
					for (i = 0; i < response.selected_users.length; i++) {
						user = response.selected_users[i];
						$("#searchResults").append("<div class = 'emailContainer' id = '" + user["email"] + "'>" + user["first_name"] + " " + user["last_name"] + "<div class = 'btn btn-default selectBtn'> Select </div></div>" );
					}
					$(".selectBtn").click(function(){
						$("#selectedUsers").append("<div class = 'emailContainer' id = '" + $(this).parent().attr("id") + "'>" + $(this).parent().text().replace("Select","") + "<div class = 'btn btn-default removeBtn'> Remove </div></div>" );
						$(this).parent().remove();
						$(".removeBtn").click(function(){
							$(this).parent().remove();
						});
					})
				}
			});
		}	
	}); 
	
	// Publish to new users
	$("#publishNewUserInvites").click(function(){
		$("#errorText").text("");
		$("#verificationText").text("");

		if ($("#courseSelect").val() == null){
			$("#errorText").text("You must select a course for your invites");
		} else  if ($("#newUserEmails").find($(".emailContainer")).length == 0){
			$("#errorText").text("You must select at least one email address");
		} else {
			var coursepk = $("#courseSelect").val();
			var emails = [];
			$('.emailAddress').each(function(){
	    		emails.push($(this).text());
	    	});
	    	$.ajax({
		        type: 'POST',
		        url: '/lessons/invite/',
		        data: {'type': 'newUserInvite','coursepk': coursepk, 'emails': JSON.stringify(emails)},
		        success: function(response) {
					$("#verificationText").text(response.status);
				}
			});
		}
	});

	// Publish to existing users
	$("#publishCourseInvites").click(function(){
		$("#errorText").text("");
		$("#verificationText").text("");

		if ($("#courseSelect").val() == null){
			$("#errorText").text("You must select a course for your invites");
		} else  if ($("#selectedUsers").find($(".emailContainer")).length == 0){
			$("#errorText").text("You must select at least one email address");
		} else {
			var coursepk = $("#courseSelect").val();
			var emails = [];
			
			$("#selectedUsers").find($(".emailContainer")).each(function(){
	    		emails.push($(this).attr("id"));
	    	});

	    	$.ajax({
		        type: 'POST',
		        url: '/lessons/invite/',
		        data: {'type': 'courseInvite','coursepk': coursepk, 'emails': JSON.stringify(emails)},
		        success: function(response) {
					$("#verificationText").text(response.status);
				}
			});
		}
	});	




});

