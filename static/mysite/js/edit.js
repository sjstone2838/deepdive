$(document).ready(function(){
var call = "";
var coursepk = "";
var moduleIndex = "";
var moduleElementIndex = "";
var questionIndex = "";

	$('.tab').click(function(){
		if ($(this).hasClass("available")){
			show($(this).attr("id").split("Tab")[0]);
		}
	});

	function show(obj){
		$('.editBlock').addClass("Hide");
		$('.'+obj).removeClass("Hide");
		$('.tab').css("background-color","lightgrey");
		$('#'+obj+"Tab").css("background-color","#f1f1f4");
	}

	function getCourses(){
		call = "get_courses";
		$.ajax({
	        type: 'POST',
	        url: '/lessons/edit_data/',
	        data: {'call': call},
	        success: function(response) {
            	var courses = response.courses;
            	var dropdowns = "<option value='' disabled selected>Select course...</option>";
            	$.each(courses,function(i){
            		dropdowns += "<option value='" + courses[i]['pk'] + "''> " + courses[i]['name'] + "</option>"
            	});
            	$("#courseSelect").html(dropdowns);
            	if (coursepk != ""){
	        		$('select[id="courseSelect"]').find('option[value=' + coursepk+ ']').attr("selected",true);
        		}
			}
		});
	}

	getCourses();

	function courseSelect(coursepk){
		//coursepk = course.val();
		call = "get_modules";

		$.ajax({
	        type: 'POST',
	        url: '/lessons/edit_data/',
	        data: {'call': call, 'coursepk':coursepk},
	        success: function(response) {
            	var modules = response.modules;
            	var dropdowns = "<option value='' disabled selected>Select module...</option>";
            	$.each(modules,function(i){
            		dropdowns += "<option value='" + (i+1) + "''> " + (i+1) + ". " + modules[i]['name'] + "</option>"
            	});
            	$('#moduleSelect').prop('disabled', false).css("background-color","white").html(dropdowns);
            	$('#course_name').val(response.courseobj['name']);
            	$('#course_genre').val(response.courseobj['genre']);
            	CKEDITOR.instances['course_description'].setData(response.courseobj['description']);
			}
		});
		$('#moduleElementSelect').prop('disabled', true).css("background-color","lightgrey").html("Select module element...");
		$('#questionSelect').prop('disabled', true).css("background-color","lightgrey").html("Select question...");
		
		$('.tab').addClass("Hide")
		$('#module_index').html("");
		$('#module_name').val("");
		CKEDITOR.instances['module_hints'].setData("");
		$('#courseTab').addClass("available").removeClass("Hide");	
		$('#moduleTab').addClass("available").removeClass("Hide");	
		show("course");
	}

	function moduleSelect(modIndex,shift){
		moduleIndex = Number(modIndex) + Number(shift);
		call = "get_module_elements";

		$.ajax({
	        type: 'POST',
	        url: '/lessons/edit_data/',
	        data: {'call': call, 'coursepk': coursepk, 'moduleIndex':moduleIndex},
	        success: function(response) {
            	var moduleElements = response.moduleElements;
            	//console.log(response.moduleElements);
            	var dropdowns = "<option value='' disabled selected>Select module element ...</option>";

            	$.each(moduleElements,function(i){
            		dropdowns += "<option value='" + (i+1) + "''> " + (i+1) + ". " + moduleElements[i]['name'] + "</option>"
            	});

            	$('#moduleElementSelect').prop('disabled', false).css("background-color","white").html(dropdowns);
            	$('#module_name').val(response.module['name']);
            	$('#module_index').html(moduleIndex);
            	CKEDITOR.instances['module_hints'].setData(response.module['hints']);
        		$('select[id="moduleSelect"]').find('option[value=' + moduleIndex+ ']').attr("selected",true);
			}
		});
		$('#questionSelect').prop('disabled', true).css("background-color","lightgrey").html("Select question...");
		
		$('#moduleTab').addClass("available");
		$('#moduleElementTab').addClass("available").removeClass("Hide");
		$('#moduleElement_index').html("");
		$('#moduleElement_name').val("");
		$('#moduleElement_type').val("");
		CKEDITOR.instances['moduleElement_text'].setData("")
		$('#questionTab').addClass("Hide");
		show('module');
	}

	function moduleElementSelect(modElementIndex, shift){
		moduleElementIndex = Number(modElementIndex) + Number(shift);
		call = "get_questions";

		$.ajax({
	        type: 'POST',
	        url: '/lessons/edit_data/',
	        data: {'call': call, 'coursepk': coursepk, 'moduleIndex':moduleIndex,'moduleElementIndex':moduleElementIndex},
	        success: function(response) {
            	var questions = response.questions;
            	var dropdowns = "<option value='' disabled selected>Select questions ...</option>";

            	$.each(questions,function(i){
            		dropdowns += "<option value='" + (i+1) + "''> " + (i+1) + ". " + questions[i]['text'] + "</option>"
            	});

            	$('#questionSelect').prop('disabled', false).css("background-color","white").html(dropdowns);
            	$('#moduleElement_name').val(response.moduleElement['name']);
            	$('#moduleElement_index').html(moduleElementIndex);
            	$('#moduleElement_type').val(response.moduleElement['type']);
            	CKEDITOR.instances['moduleElement_text'].setData(response.moduleElement['text']);
            	$('select[id="moduleElementSelect"]').find('option[value=' + moduleElementIndex+ ']').attr("selected",true);
			}
		});
		$('#moduleElementTab').addClass("available");
		$('#questionTab').addClass("available").removeClass("Hide");
		$('#question_index').html("");
		$('#question_type').val("");
		CKEDITOR.instances['question_text'].setData("");
		$('#question_answer').val("");
		$('#answerChoices').remove();

		show('moduleElement');
	}

	function questionSelect(qIndex, shift){
		questionIndex = Number(qIndex) + Number(shift);
		call = "get_answers";

		$.ajax({
	        type: 'POST',
	        url: '/lessons/edit_data/',
	        data: {'call': call, 'coursepk': coursepk, 'moduleIndex':moduleIndex,'moduleElementIndex':moduleElementIndex, 'questionIndex':questionIndex},
	        success: function(response) {
            	//$('#question_name').val(response.question['name']);
            	$('#question_index').html(questionIndex);
            	$('#question_type').val(response.question['type']);
            	CKEDITOR.instances['question_text'].setData(response.question['text']);
            	$('#question_answer').val(response.question['answer']);
	            $('#answerChoices').html("");
            	if (response.question['type'] == "Radio"){
	            	$.each(response.answers, function(i){
	            		$('#answerChoices').append('<p></p><div style="width: 90px; display: inline-block;"> Choice '+ (i+1)+ "</div><input class = 'answerChoice' value = '"+response.answers[i]+"' style='width: 260px; display: inline-block;'>");
	            	});
            	}
            	$('select[id="questionSelect"]').find('option[value=' + questionIndex+ ']').attr("selected",true);
			}
		});
		$('#questionTab').addClass("available");
		//$('#question-New').html("Add new question to Module Element " + $('#moduleElementSelect').val() + " in Module: " + $('#moduleSelect option:selected').text());		
		show('question');
	}

	$('#courseSelect').change(function(){
		coursepk = $(this).val();
		courseSelect(coursepk);
	});
	
	$('#moduleSelect').change(function(){
		moduleSelect($(this).val(),0);
	});

	$('#moduleElementSelect').change(function(){
		moduleElementSelect($(this).val(),0);
	});

	$('#questionSelect').change(function(){
		questionSelect($(this).val(),0);
	});

	// add new element type
	$('.add').click(function(){
		$(this).removeClass("btn-info").addClass("btn-primary");
		object_type = $(this).attr("id").split("-")[0];
		$('#'+object_type+"-Current").removeClass("btn-primary").addClass("btn-info");
		$('#'+object_type+"-EditButtons").addClass("Hide");
		$('#'+object_type+"-CreateButtons").removeClass("Hide");

		if (object_type == "module"){
			$('#module_name').val("");
			$('#module_index').html("Will be added last");
			CKEDITOR.instances['module_hints'].setData("");
			//$('select[id="moduleSelect"]').find('option[value=' + moduleIndex+ ']').attr("selected",false);
		}
		else if (object_type == "moduleElement"){
			$('#moduleElement_name').val("");
			$('#moduleElement_type').val("");
			$('#moduleElement_index').html("Will be added last");
			CKEDITOR.instances['moduleElement_text'].setData("");
		}
		else {
			$('#question_type').val("");
			$('#question_index').html("Will be added last");
			CKEDITOR.instances['question_text'].setData("");
			$('#question_answer').val("");
			$.each($(".answerChoice"), function(i){
				$(this).val("");
			});
		}
	});

	// edit currently shown element
	$('.current').click(function(){
		$(this).removeClass("btn-info").addClass("btn-primary");
		object_type = $(this).attr("id").split("-")[0];
		$('#'+object_type+"-New").removeClass("btn-primary").addClass("btn-info");
		$('#'+object_type+"-CreateButtons").addClass("Hide");
		$('#'+object_type+"-EditButtons").removeClass("Hide");

		if (object_type == "module"){
			moduleSelect(moduleIndex,0);
		}
		else if (object_type == "moduleElement"){
			moduleElementSelect(moduleElementIndex,0);
		}
		else {
			questionSelect(questionIndex,0);
		}
	});

	// EDIT FUNCTIONS

	// shift = 1 for move back, -1 for move forward
	function refreshObj(object_type, shift){
		if (object_type == "course"){
    		getCourses();
		}
		else if (object_type == "module"){
			getCourses();
			courseSelect(coursepk);
			moduleSelect(moduleIndex,shift);
		}
		else if  (object_type == "moduleElement"){
			getCourses();
			courseSelect(coursepk);
			moduleSelect(moduleIndex,0);
			moduleElementSelect(moduleElementIndex,shift);
		}
		else if  (object_type == "question"){
			getCourses();
			courseSelect(coursepk);
			moduleSelect(moduleIndex,0);
			moduleElementSelect(moduleElementIndex,0);
			questionSelect(questionIndex,shift);
		}
		else{}
	}

	function sendContent(obj,call){
		object_type = obj.attr("id").split("-")[0];
		var course = {}, module = {}, moduleElement = {}, question = {}, answers = {};
		
		if (object_type == "course"){
			course['name'] = $('#course_name').val();
			course['genre'] = $('#course_genre').val();
			course['description'] = CKEDITOR.instances['course_description'].getData();
		}
		else if (object_type == "module"){
			module['name'] = $('#module_name').val();
			module['hints'] = CKEDITOR.instances['module_hints'].getData();
		}
		else if (object_type == "moduleElement"){
			moduleElement['name'] = $('#moduleElement_name').val();
			moduleElement['type'] = $('#moduleElement_type').val();
			moduleElement['text'] = CKEDITOR.instances['moduleElement_text'].getData();
		}
		else if (object_type == "question"){
			question['type'] = $('#question_type').val();
			question['text'] = CKEDITOR.instances['question_text'].getData();
			question['answer'] = $('#question_answer').val();
			$.each($(".answerChoice"), function(i){
				answers['choice'+i] = $(this).val();
			});
		}
		else{
		}
		$.ajax({
	        type: 'POST',
	        url: '/lessons/edit_data/',
	        data: {'call': call, 
	        	'object_type': object_type, 
	        	'coursepk':coursepk,
	        	'moduleIndex': moduleIndex,
	        	'moduleElementIndex': moduleElementIndex,
	        	'questionIndex': questionIndex,
	        	'course':course,
	        	'module': module,
	        	'moduleElement': moduleElement,
	        	'question': question,
	        	'answers': answers
	        },
	        success: function(response) {
	        	refreshObj(object_type, 0);
	        	$('#'+ object_type + '-Response').show().html(response.success).fadeOut(3000);
	        }
        });
    }

	$('.edit').click(function(){
		sendContent($(this),"edit");
	});

	$('.create').click(function(){
		sendContent($(this),"create");
	});

	// CONSOLIDATE DELETE, MOVE FORWARD< and MOVE BACK INTO ONE FUNCTION
	$('.delete').click(function(){
		call = "delete";
		object_type = $(this).attr("id").split("-")[0];
		$.ajax({
	        type: 'POST',
	        url: '/lessons/edit_data/',
	        data: {'call': call, 
	        	'object_type': object_type, 
	        	'coursepk':coursepk,
	        	'moduleIndex': moduleIndex,
	        	'moduleElementIndex': moduleElementIndex,
	        	'questionIndex': questionIndex
	        },
	        success: function(response) {
	        	refreshObj(object_type, 0);
	        	$('#'+ object_type + '-Response').show().html(response.success).fadeOut(3000);
	        }
        });
	});
	
	$('.moveForward').click(function(){
		call = "move_forward";
		object_type = $(this).attr("id").split("-")[0];
		$.ajax({
	        type: 'POST',
	        url: '/lessons/edit_data/',
	        data: {'call': call, 
	        	'object_type': object_type, 
	        	'coursepk':coursepk,
	        	'moduleIndex': moduleIndex,
	        	'moduleElementIndex': moduleElementIndex,
	        	'questionIndex': questionIndex
	        },
	        success: function(response) {
	        	if (response.success == "Moved forward") {
	        		refreshObj(object_type, -1);
	        	}        		
	        	$('#'+ object_type + '-Response').show().html(response.success).fadeOut(3000);
	        }
        });
	});

	$('.moveBack').click(function(){
		call = "move_back";
		object_type = $(this).attr("id").split("-")[0];
		$.ajax({
	        type: 'POST',
	        url: '/lessons/edit_data/',
	        data: {'call': call, 
	        	'object_type': object_type, 
	        	'coursepk':coursepk,
	        	'moduleIndex': moduleIndex,
	        	'moduleElementIndex': moduleElementIndex,
	        	'questionIndex': questionIndex
	        },
	        success: function(response) {
	        	refreshObj(object_type, 1);
	        	$('#'+ object_type + '-Response').show().html(response.success).fadeOut(3000);
	        }
        });
	});

});