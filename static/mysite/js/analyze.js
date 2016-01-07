$(document).ready(function(){

	function showSummaryData(response){
		$('.dynamic').remove();
		var content = "";
		$("#total_enrolled").html(response.total_enrolled);
		$.each(response.module_completion_set, function(i){
				content += "<tr class = 'dynamic'><td> Completed Module " + (i+1) + ": " + $(this)[0].name+ "</td><td>" + $(this)[0].count + "</td><td>" + $(this)[0].percent_of_total + "%</td><td>" + $(this)[0].avg_score + "%</td></tr>";
			});
		$("#summaryTable").append(content).parent().fadeIn("fast");
	}

	function showDetailedData(response){
		var content = "";
		$.each(response.enrollees, function(i){
			var header = "";
			var details = "";
			header += "<div><div class = 'dataHeader'> <span class = 'arrow'> &#9660</span>" + $(this)[0].name;
			var enrollee_score_sum = 0;
			details += "<table class = 'dataDetails Hide' style = 'table-layout: fixed'><tr><th> Module </th><th> Score </th><th> Date </th></tr>" 
			$.each($(this)[0].completion_data, function (j){
				details += "<tr><td>" + (j + 1) +". " + $(this)[0].name + "</td> ";
				details += "<td>" + $(this)[0].score + "</td> ";
				enrollee_score_sum += $(this)[0].score;
				details += "<td>" + $(this)[0].date + "</td></tr>";
			});
			details += "</table></div>"
			//compute average score for individual
			if ($(this)[0].completion_data.length != 0){
				average_score = Math.round(enrollee_score_sum / $(this)[0].completion_data.length) + "%";
			} else {
				average_score = "NA";
			}
			header += "<span class = 'averageScore'> Average Score: " + average_score + "</span></div>";
			content += header + details;
		});
		$("#detailedData").html(content).parent().fadeIn("fast");
		$('.dataHeader').click(function(){
			if ($(this).hasClass("clicked")){
				$(this).find(".arrow").html("&#9660"); // down arrow
				$(this).removeClass("clicked");
				$(this).parent().find(".dataDetails").slideUp("fast");
			}
			else{
				$(this).find(".arrow").html("&#9650"); // up arrow
				$(this).addClass("clicked");
				$(this).parent().find(".dataDetails").slideDown("slow");	
			}
		})
	}
	function showModuleChart(response){
		$('#moduleChart').highcharts({
	        chart: {
	            type: 'column'
	        },
	        title: {
	            text: 'Student Progress: Completions by Module'
	        },
	        xAxis: {
	            categories: response.module_chart['x-values']
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: 'Students by Module Passed'
	            },
	            stackLabels: {
	                enabled: true,
	                style: {
	                    fontWeight: 'bold',
	                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
	                }
	            }
	        },
	        /*legend: {
	            align: 'right',
	            x: -30,
	            verticalAlign: 'top',
	            y: 25,
	            floating: true,
	            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
	            borderColor: '#CCC',
	            borderWidth: 1,
	            shadow: false
	        },
	        tooltip: {
	            headerFormat: '<b>{point.x}</b><br/>',
	            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
	        },*/
	        plotOptions: {
	            column: {
	                stacking: 'normal',
	                dataLabels: {
	                    enabled: false,
	                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
	                    style: {
	                        textShadow: '0 0 3px black'
	                    }
	                }
	            }
	        },
	        series: [{
	            name: "to be removed",
	            data: response.module_chart['y-values']
	        }]
	    });
		$(document).find("text:contains('Highcharts')").remove()
		$(document).find("text:contains('to be removed')").parent().parent().remove()
	}
	
	function showAverageChart(response){
		$('#averageChart').highcharts({
	        chart: {
	            type: 'column'
	        },
	        title: {
	            text: 'Average Score by Module'
	        },
	        xAxis: {
	            categories: response.average_chart['x-values']
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: 'Average Score (0-100%)'
	            },
	            stackLabels: {
	                enabled: false,
	                style: {
	                    fontWeight: 'bold',
	                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
	                },
	            }
	        },
	        /*legend: {
	            align: 'right',
	            x: -30,
	            verticalAlign: 'top',
	            y: 25,
	            floating: true,
	            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
	            borderColor: '#CCC',
	            borderWidth: 1,
	            shadow: false
	        },
	        tooltip: {
	            headerFormat: '<b>{point.x}</b><br/>',
	            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
	        },*/
	        plotOptions: {
	            column: {
	                stacking: 'normal',
	                dataLabels: {
	                    enabled: true,
	                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
	                    style: {
	                        textShadow: '0 0 3px black'
	                    },
	                    format: "{point.y:.1f} %"
	                }
	            }
	        },
	        series: [{
	            name: "to be removed",
	            data: response.average_chart['y-values']
	        }]
	    });
		$(document).find("text:contains('Highcharts')").remove()
		$(document).find("text:contains('to be removed')").parent().parent().remove()
	}

	function getCourseData(coursepk){
		$.ajax({
	        type: 'POST',
	        url: '/lessons/analyze/',
	        data: {'coursepk': coursepk},
	        success: function(response) {
	        	showSummaryData(response);
	        	showDetailedData(response);
	        	showModuleChart(response);
	        	showAverageChart(response);
			}
		});
	}

	$("#courseSelect").change(function(){
		getCourseData($(this).val());
	});
});