$(document).ready(function(){

	$('#login').click(function(){
		username = $('#username').val();
		password = $('#password').val();
		$.ajax({
	        type: 'POST',
	        url: '/lessons/login/',
	        data: {'username': username, 'password': password},
	        success: function(response) {
	        	if (response.status == "success") {
					location.href = "/lessons/";
	        	}
	        	else {
	        		$("#error").html(response.status);
        		}

			}
		});
	});

	$('#new_user').click(function(){
		$('#newUserForm').fadeIn("slow");
	});

	$('#aboutBtn').click(function(){
		$('#about').fadeIn("slow");
	});

	$('.aboutHeader').click(function(){
		if ($(this).hasClass("clicked")){
			$(this).find(".arrow").html("&#9660"); // down arrow
			$(this).removeClass("clicked");
			$(this).parent().find(".aboutText").slideUp("slow");
		}
		else{
			$(this).find(".arrow").html("&#9650"); // up arrow
			$(this).addClass("clicked");
			$(this).parent().find(".aboutText").slideDown("slow");	
		}
		
	});

	$('.closeBox').click(function(){
		$(this).parent().fadeOut("slow");
	});

	$('#create_account').click(function(){
		first_name = $('#new_first_name').val();
		last_name = $('#new_last_name').val();
		username = $('#new_username').val();
		email = $('#new_email').val();
		password = $('#new_password').val()
		confirmation = $('#new_confirmation').val()

		if (first_name == ""){
			$("#newUserError").html("Please enter first name");
		}
		else if (last_name == ""){
			$("#newUserError").html("Please enter last name");
		}
		else if (username == ""){
			$("#newUserError").html("Please enter username");
		}
		else if (email == ""){
			$("#newUserError").html("Please enter email");
		}
		else if (password == ""){
			$("#newUserError").html("Please enter password");
		}
		else if (password != confirmation){
			$("#newUserError").html("Password and confirmation do not match");
		}
		else { 
			$.ajax({
		        type: 'POST',
		        url: '/lessons/new_user/',
		        data: {
		        	'first_name': first_name,
		        	'last_name': last_name,
		        	'email': email,
		        	'username': username, 
		        	'password': password},
		        success: function(response) {
		        	if (response.status == "success") {
						$('#newUserForm').fadeOut("slow");
						$('#loginForm').css('display','none');
						$('#newUserSuccessMsg').html(response.message); 
						$('#newUserSuccess').fadeIn('slow'); 
		        	}
		        	else {
		        		$("#newUserError").html(response.status);
	        		}

				}
			});
		}
	});




});