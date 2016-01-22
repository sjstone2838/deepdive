$(document).ready(function(){

	var bottom = 20;
	var left = 0;
	for (var i = 0; i < 100; i++){
		$(".bubble").animate({
			left: '+='+ left, 
			bottom: '+='+ bottom},
			//height: '+='+ 1,
			//width: '+='+ 1},
			100, 'linear'
		);
		left = Math.sin(i * 5 / Math.PI) * 8;
	}

	$('#password').keypress(function (e) {
		var key = e.which;
		if(key == 13 && $(this).val() != ""){
			username = $('#username').val();
			password = $(this).val();
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
		}
	});

	$('#new_user').click(function(){
		$('#newUserForm').fadeIn("slow");
	});

	$('#check_invite_code').click(function(){
		var invite_code = $("#invite_code").val();
		$.ajax({
	        type: 'POST',
	        url: '/lessons/check_invite_code/',
	        data: {'invite_code': invite_code},
	        success: function(response) {
        		if (response.status == "verified"){
		        	$("#newUserBlock-0").addClass("Hide");//.toggle("slide", {direction:'left'});
		        	$("#newUserBlock-1").removeClass("Hide");//delay(300).toggle("slide", {direction:'right'});
    			}
    			else {
    				$("#codeError").text("Invalid code. Please try again").removeClass("Hide");
    				console.log()
    			}
    		}	
		});
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

	$('#reset_pw').click(function(){
		$('#resetpw').fadeIn("slow");
	});

	$('#resetpwBtn').click(function(){
		var email = $('#resetpw_email').val();
		console.log (email);
		$.ajax({
	        type: 'POST',
	        url: '/lessons/reset_password/',
	        data: {'email': email},
	        success: function(response) {
	        	$("#resetpwSuccess").text(response.status);
			}
		});
	});

	$('#create_account').click(function(){
		invite_code = $("#invite_code").val();
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
		        	'invite_code': invite_code,
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