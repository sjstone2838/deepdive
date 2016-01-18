$(document).ready(function(){
    var text_element = 1;
    var answersChecked = false;
    var text_element_count = $('.lessonElement').length;

    // Hide back button when when viewing first lesson 	
    function displayBack(){
    	if ( text_element == 1){
    		$(".Back").css("display","none");	
    	}
    	else {
    		$(".Back").css("display","inline-block");
    	}
    }

    // Hide Quiz button except when viewing last lesson 
    // EDITED OUT	
    function displayQuiz(){
    	if ( text_element != text_element_count){
    		$(".Quiz").css("display","none");	
    	}
    	else {
    		$(".Quiz").css("display","none");
    	}
	}

    // Hide Next button when viewing last lesson 	
    function displayNext(){
    	if ( text_element == 1){
	    	$(".Next").text("Next");	
    		$(".Next").css("display","inline-block");
	    }
	    else if ( text_element < text_element_count){
    		$(".Next").text("Next");
    		$(".Next").css("display","inline-block");
    	}
    	else {
	    	$(".Next").css("display","none");	
    	}
	}

	function displayLessonButtons(){
		displayBack();
		displayQuiz();
		displayNext();
	}

	// call when hitting next button
	function shiftLessonsLeft(){
		var incomingElement;
		var departingElement;
		$('.lessonElement').each(function(){
	    	if ($(this).attr("id") == text_element){
	    	 departingElement = $(this);
	    	}
    	});
    	text_element++;
    	$('.lessonElement').each(function(){
	    	if ($(this).attr("id") == text_element){
	    	 incomingElement = $(this);
	    	}
    	});
		var width = departingElement.outerWidth();
		departingElement.animate({right: '+='+(1.5*width)});
		incomingElement.css("display","block").animate({right: '+='+(1.5*width)});
		departingElement.delay(0).queue(function() { $(this).css("display","none").dequeue();});
	}

	// call when hitting back button
	function shiftLessonsRight(){
		var incomingElement;
		var departingElement;
		$('.lessonElement').each(function(){
	    	if ($(this).attr("id") == text_element){
	    	 departingElement = $(this);
	    	}
    	});
    	text_element--;
    	$('.lessonElement').each(function(){
	    	if ($(this).attr("id") == text_element){
	    	 incomingElement = $(this);
	    	}
    	});
		var width = departingElement.outerWidth();
		incomingElement.css("display","block").animate({right: '-='+(1.5*width)});
		departingElement.animate({right: '-='+(1.5*width)});
	}

	// override the natural absolute positioning (off-screen) of the first element
	// so it is centered onscreen
	function showFirstLessonElement(){
		$('#1').css("display","block").css("right","25%");
	}

	function addStatusElement(){
		if (text_element == 1){
			$('.statusBar').append('<div class = "statusElement firstStatusElement" id = "1"></div>');
		}
		else if (text_element == text_element_count){
			$('.statusBar').append('<div class = "statusElement lastStatusElement" id = "' + text_element_count + '"></div>');
		}
		else {
			$('.statusBar').append('<div class = "statusElement" id = "' + text_element + '"></div>');
		}
		$('.statusElement').css('width',((1/text_element_count)*100) + "%");
		//var percentProgress = Math.round(((1/text_element_count)* text_element * 100)) + "%";
		var percentProgress = "Page " + text_element + " of "  + text_element_count;
		$('#percentProgress').text(percentProgress);
	}

	function removeStatusElement(){
		$('#'+text_element).remove();
	}

	//move HintContent left onto screen on click
	$('.lessonHintsHeader').click(function(){
		if ($(this).hasClass("clicked")){
			$(this).removeClass("clicked");
			//var width = $('.lessonHintsContent').outerWidth();
			//$('.lessonHintsContent').animate({right: '-='+width});
			$('.lessonHintsContent').slideUp("slow");
		}
		else {
			$(this).addClass("clicked");
			//var width = $('.lessonHintsContent').outerWidth();
			//$('.lessonHintsContent').animate({right: '+='+width});
			$('.lessonHintsContent').slideDown("slow");
		}
	});

	// to be run when Page is loaded
	displayLessonButtons();
	showFirstLessonElement();
	addStatusElement();

    // Increment counter when Next clicked 	
    $(".Next").click(function(){
			if (text_element == text_element_count){
				return;
			}
			else {
   			shiftLessonsLeft();
   			displayLessonButtons();      			
			addStatusElement();  			
			}	
	});

	// Decrement counter when Back clicked 	
    $(".Back").click(function(){
			removeStatusElement();  
			shiftLessonsRight();
			displayLessonButtons();
		//var percentProgress = Math.round(1/(text_element_count - 1) * text_element * 100) + "% Complete";
		var percentProgress = "Page " + text_element + " of "  + text_element_count;
		$('#percentProgress').text(percentProgress);
	});

	// check Quiz answers submitted 
	$('.submitButton').click(function(){
		if (answersChecked == false) {
	    	var i = 0;
	    	var correctCount = 0; 

	    	function checkAnswer(form,answer,answerKey){
	    		if (answer.toUpperCase() == answerKey.toUpperCase()){
	    			$(form).find(".verificationText").text("Correct!").css("color","green");
	    			//$(form).css("color","green");
	    			correctCount++;	
	    		}
	    		else {
	    			$(form).find(".verificationText").text("Incorrect").css("color","red");
	    			//$(form).css("color","red");
    			}
    			console.log("Answer was " + answer + " and key was " + answerKey)
			}
			
			$('.Question').each(function(){
		    	if ($(this).parent().css('display') == "block"){
			    	var inputType = $(this).attr("type");
			    	//for radio button questions
			    	if (inputType == "radio"){
			    		var answer = $("input[type='radio']:checked",this).val();
			    		checkAnswer($(this),answer,answerKey[i]);
		    		}
		    		// for free response questions	
			    	else {
						var answer = $("input[type='text']",this).val();
			    		checkAnswer($(this),answer,answerKey[i]);
			    	}
		    	}
		    	i++;
	    	});
    	}
	});

});
