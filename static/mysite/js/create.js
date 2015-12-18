$(document).ready(function(){
var moduleDetails = false;
var courseDetails = false;
var moduleElementCount = 0;
var questionArray = [];
var answerChoiceArray = [];

	// show or hide Module Form
	$(".moduleFormDetails").click(function(){
		if (moduleDetails == false) {
			$(".moduleForm").css("display","relative").slideDown('slow');
			$(".moduleFormDetails").text("Hide Details");
			moduleDetails = true;
		}
		else {
			$(".moduleForm").slideUp('slow').queue(function() { $(this).css("display","none").dequeue();});
			$(".moduleFormDetails").text("Expand");
			moduleDetails = false;	
		}
	});

	// show or hide Course Form
	$(".courseFormDetails").click(function(){
		if (courseDetails == false) {
			$(".courseForm").css("display","relative").slideDown('slow');
			$(".courseFormDetails").text("Hide Details");
			courseDetails = true;
		}
		else {
			$(".courseForm").slideUp('slow').queue(function() { $(this).css("display","none").dequeue();});
			$(".courseFormDetails").text("Expand");
			courseDetails = false;	
		}
	});

	// add module Element Form
	$(".moduleElementFormDetails").click(function(){
		moduleElementCount++;
		var module_element_html=`
		<div class = 'addModuleElement' id='addModuleElement${moduleElementCount}'>
			<h2> Module Element ${moduleElementCount}</h2> 
			<input class = 'input' type='text' style = 'width: 500px;' name = 'module_element_name.${moduleElementCount}' placeholder = 'Name'> <br>
			<input class = 'input' list='element_type' name = 'module_element_type.${moduleElementCount}' placeholder = 'Element Type'> <br> 
			<textarea class = 'input' type='text' id = 'module_element_text.${moduleElementCount}'>
					Module element content ...  
			</textarea>
			<script>
	            CKEDITOR.replace( 'module_element_text.${moduleElementCount}',{
	            	toolbar: ckeditor_toolbar
				});
	        </script>
			<br>
			<div id='module_element_error.${moduleElementCount}'></div>
			<div class = 'addQuestionForm btn btn-primary SameLine'> Add a Question </div> 
			<div class = 'removeQuestionForm btn btn-primary SameLine'> Remove last Question </div>
			<div class = 'QuestionForm' id = 'QuestionForm${moduleElementCount}'></div>
		</div>`;
		$(".addModuleElements").append(module_element_html);
		$("#addModuleElement" + moduleElementCount).css("display","relative").queue(function() { $(this).slideDown('slow').dequeue();});

		// Add a question
		$(".addQuestionForm").off().on('click',function(){
			var id = $(this).parent().attr("id");
			id = id.charAt(id.length-1);
			if (questionArray[id] === undefined | 0){
				questionArray[id] = 1;
			}
			else {
				questionArray[id]++;
			}
			var question_html = `
			<div class='moduleElement${id} question${questionArray[id]} Hide'>
				<h3 class = "question"> Question${questionArray[id]}</h3> 
				<input class = 'input' type='text' name = 'question_text.${id}.${questionArray[id]}' placeholder = 'Question text'> <br>
				<input class = 'input' type='text' name = 'question_answer.${id}.${questionArray[id]}' placeholder = 'Answer'><br>
				<input class = 'input' list='question_type' name = 'question_type.${id}.${questionArray[id]}' placeholder = 'Type'><br>
				<div class = 'addAnswerChoiceForm btn btn-success SameLine' id = 'addAnswerChoice.${id}.${questionArray[id]}'> Add an Answer Choice </div> 
				<div class = 'removeAnswerChoiceForm btn btn-success SameLine' id = 'removeAnswerChoice.${id}.${questionArray[id]}'> Remove Last Answer Choice </div>
			</div>`;
			$("#QuestionForm" + id).append(question_html);
			$('.moduleElement' + id + ".question" + questionArray[id]).css("display","relative").queue(function() { $(this).slideDown('slow').dequeue();});

			// Add an answer choice
			$(".addAnswerChoiceForm").off().on('click',function(){
				var str = $(this).attr("id").split(".");
				module_element = str[1];
				question = str[2];

				if (answerChoiceArray[module_element] === undefined ) {
					answerChoiceArray[module_element] = [];
				}
				
				if (answerChoiceArray[module_element][question] === undefined ) {
					answerChoiceArray[module_element][question] = 1;
				}
				else{
					answerChoiceArray[module_element][question]++;
				}

				var answer_html = `
				<p><input class = 'input Hide answerChoice${module_element}-${question}-${answerChoiceArray[module_element][question]}' type='text' name = "answerChoice.${module_element}.${question}.${answerChoiceArray[module_element][question]}" placeholder = 'Answer Choice ${answerChoiceArray[module_element][question]}'></p>
				`;
				$(".moduleElement"+module_element+".question"+question).append(answer_html);
				$(".answerChoice"+module_element+"-"+question+"-"+answerChoiceArray[module_element][question]).slideDown('slow');
			});

			// Remove last answer choice
			$(".removeAnswerChoiceForm").off().on('click',function(){
			var str = $(this).attr("id").split(".");
			module_element = str[1];
			question = str[2];

			if (answerChoiceArray[module_element][question] > 0) {
				$(".answerChoice"+module_element+"-"+question+"-"+answerChoiceArray[module_element][question]).slideUp('slow').queue(function() { $(this).remove().dequeue();});;
				answerChoiceArray[module_element][question]--;
			}
		});

		});
		
		// Remove last question
		$(".removeQuestionForm").off().on('click',function(){
			var id = $(this).parent().attr("id");
			id = id.charAt(id.length-1);
			if (questionArray[id] > 0) {
				$('.moduleElement' + id + ".question" + questionArray[id]).slideUp('slow').queue(function() { $(this).remove().dequeue();});
				questionArray[id]--;
			}
		});
	});

	// Remove last module Element Form
	$(".moduleElementFormRemove").click(function(){
		$("#addModuleElement" + moduleElementCount).slideUp('slow').queue(function() { $(this).remove().dequeue();});
		moduleElementCount--;
	});

	// Submit Module via Ajax
	$('.submitModule').click(function() {
    	var module= {};

    	$('.input').each(function(){
    		module[$(this).attr("name")] = $(this).val();
    	});
    	
    	// append data from CKEDITOR forms
    	module['module_hints'] = CKEDITOR.instances['module_hints'].getData();
    	for (i = 0; i < moduleElementCount; i++) {
    		module['module_element_text.'+ (i+1)] = CKEDITOR.instances['module_element_text.'+ (i+1)].getData();
    	}

    	if ($('[name="module_name"]').val() == ""){
            $('#moduleNameError').html("<p>You must fill in a module name</p>");
    	}

    	/*else if ($('[name="module_element_text.1"]').val() == undefined | $('[name="module_element_text.1"]').val() == ""){
    		$('#moduleNameError').html("<p>You must create at least one module element</p>");
    	}*/

	    else{
		    $.ajax({
		        type: 'POST',
		        url: '/lessons/create_module/',
		        data: {'module':module},
		        // display success or error message
		        success: function(response) {
	            	//	window.location.href = '/lessons/test_result/'
	            	$('#jsonResponseMessage').html(response.jsonResponseMessage);
	            	$('#jsonResponseMessage').parent().slideDown('slow');
	        	}
		    });
	    }
	});

	// Submit Course via Ajax
	$('.submitCourse').click(function() {
    	var course= {};

    	$('.input.course').each(function(){
    		course[$(this).attr("name")] = $(this).val();
    	});
    	course['course_description'] = CKEDITOR.instances['courseDescription'].getData();

    	var formData = new FormData($('form')[0]);

    	if ($('[name="course_name"]').val() == ""){
            $('#courseNameError').html("<p>You must fill in a course name</p>");
    	}

    	else if ($('[name="course_genre"]').val() == ""){
            $('#courseNameError').html("");
            $('#courseGenreError').html("<p>You must fill in a genre</p>");
    	}

    	else if (course['course_description'] == ""){
            $('#courseNameError').html("");
            $('#courseGenreError').html("");
            $('#courseDescriptionError').html("<p>You must fill in a description</p>");
    	}

	    else{
		    $.ajax({
		        type: 'POST',
		        url: '/lessons/create_course/',
		        data: {'course':course},
		        // display success or error message
		        success: function(response) {
	            	//	window.location.href = '/lessons/test_result/'
	            	$('#jsonResponseMessage').html(response.jsonResponseMessage);
	            	$('#jsonResponseMessage').parent().slideDown('slow');
	        	}
		    });
	    }
	});

});