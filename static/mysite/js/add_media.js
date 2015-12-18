$(document).ready(function(){	
	
	// show course logo preview
	function previewCourseLogo(input) {
	    if (input.files && input.files[0]) {
	        var reader = new FileReader();
	        reader.onload = function (e) {
	            $('#preview').attr('src', e.target.result).removeClass("Hide");
	        }
	        reader.readAsDataURL(input.files[0]);
	    }
	}

	$("#id_docfile").change(function(){
	    previewCourseLogo(this);
	});
});