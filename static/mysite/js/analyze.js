$(document).ready(function(){

	function resetData(){
    	$(".analyzeBlock").fadeOut("fast");	
    	$(".editTabs").fadeOut("fast");	
    	$(".tab").css("backgroundColor","lightgrey");
		$("#chartBtn").css("backgroundColor","#f1f1f4");
    }

	function showSummaryData(response){
		$('.dynamic').remove();
		var content = "";
		$("#total_enrolled").html(response.total_enrolled);
		$("#total_dropped").html(response.total_dropped);
		$("#currently_enrolled").html(response.total_enrolled - response.total_dropped);
		$.each(response.module_completion_set, function(i){
				content += "<tr class = 'dynamic'><td> Completed Module " + (i+1) + ": " + $(this)[0].name+ "</td><td>" + $(this)[0].count + "</td><td>" + $(this)[0].percent_of_total + "%</td><td>" + $(this)[0].avg_score + "%</td></tr>";
			});
		$("#summaryTable").append(content);//.parent().fadeIn("fast");
	}

	function showDetailedData(response){
		var content = "<table class = 'dataHeader' style = 'table-layout: fixed; margin: 0px;'> <tr> <th style = 'width: 25%;'> Enrollee </th><th style = 'width: 25%;'> Date Enrolled</th><th style = 'width: 25%;'> Status </th><th> Average Score </th></tr></table>";
		$.each(response.enrollees, function(i){
			var header = "";
			var details = "";
			header += "<div><table class = 'dataHeader' style = 'table-layout: fixed; margin: 0px;'> <tr style = 'margin: 0px'> <td style = 'width: 25%;'> <span class = 'arrow'> &#9660</span>" + $(this)[0].name + "</td>";
			header += "<td style = 'width: 25%;'>" + $(this)[0].date_enrolled+ "</td>";
			header += "<td style = 'width: 25%;'>" + $(this)[0].date_dropped+ "</td>";

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
			header += "<td><span class = 'averageScore'> Average Score: " + average_score + "</span></td></tr></table>";
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

	function showTimeChart(response){
		series = []
		for (var i = 0; i < response.time_chart['module_count'] + 1; i++){
			
			series_name = "";
			if (i == 0){
				series_name = "All Enrollees";
			} else if (i == response.time_chart['module_count']){
				series_name = "Passed Module " + i +" (Finished Course)";
			} else {
				series_name = "Passed Module " + i;
			}
			series[i] = {
				name: series_name,
	            data: response.time_chart['y-values-' + i],
	            pointInterval: 1 * 24 * 36e5,
	            pointStart: Date.UTC(
	            	response.time_chart['x-origin-year'],
	            	response.time_chart['x-origin-month'] - 1,
	            	response.time_chart['x-origin-day']
	            )
			}
		}
			
		$('#timeChart').highcharts({
		    title: {
	            text: 'Enrollee Status by Date',
	            x: -20 //center
	        },
	        xAxis: {
		        type: 'datetime',
	            tickInterval: 7 * 24 * 36e5, // one week
	            labels: {
	                  format: '{value: %b %d, %Y}',
	                align: 'right',
	                rotation: -30
	            }
	        },
	        series: series
	    });


		$(document).find("text:contains('Highcharts')").remove()
		$(document).find("text:contains('to be removed')").parent().parent().remove()
	}

	function showRatingChart(response, course_name){
		ratings_array = response.rating_chart;

		// Make monochrome colors and set them as default for all pies
	    Highcharts.getOptions().plotOptions.pie.colors = (function () {
	        var colors = [],
	            base = Highcharts.getOptions().colors[0],
	            i;

	        for (i = 0; i < 10; i += 1) {
	            // Start out with a darkened base color (negative brighten), and end
	            // up with a much brighter color
	            colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
	        }
	        return colors;
	    }());

		$('#ratingChart').highcharts({
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false,
	            type: 'pie'
	        },
	        title: {
	            text: 'Rating (0-5 stars) by % of Votes'
	        },
	        tooltip: {
	            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    }
	                }
	            }
	        },
	        series: [{
	            name: course_name,
	            colorByPoint: true,
	            data: [{
	                name: '0 stars',
	                y: ratings_array[0]
	            }, {
	                name: '1 star',
	                y: ratings_array[1],
	            }, {
	                name: '2 stars',
	                y: ratings_array[2]
	            }, {
	                name: '3 stars',
	                y: ratings_array[3]
	            }, {
	                name: '4 stars',
	                y: ratings_array[4]
	            }, {
	                name: '5 stars',
	                y: ratings_array[5],
	                sliced: true,
	                selected: true
	            }]
	        }]
	    });

		$(document).find("text:contains('Highcharts')").remove()
	}

	function getCourseData(coursepk, course_name){
	    resetData();
		$.ajax({
	        type: 'POST',
	        url: '/lessons/analyze/',
	        data: {'coursepk': coursepk},
	        success: function(response) {
	        	$("#chartData").fadeIn("fast");
	        	$(".editTabs").fadeIn("fast");
	        	showModuleChart(response);
	        	showAverageChart(response);
	        	showTimeChart(response);
				showSummaryData(response);
				showRatingChart(response, course_name);
			    showDetailedData(response);
			}
		});
	}

	$("#courseSelect").change(function(){
		getCourseData($(this).val(),$("option:selected").text());
	});

	$("#tableBtn").click(function(){
		$(".analyzeBlock").fadeOut("fast");
		$(".tab").css("backgroundColor","lightgrey");
		$(this).css("backgroundColor","#f1f1f4");
		$("#tableData").fadeIn("fast");
	});

	$("#chartBtn").click(function(){
		$(".analyzeBlock").fadeOut("fast");
		$(".tab").css("backgroundColor","lightgrey");
		$(this).css("backgroundColor","#f1f1f4");
		$("#chartData").fadeIn("fast");
	});

	$("#detailsBtn").click(function(){
		$(".analyzeBlock").fadeOut("fast");
		$(".tab").css("backgroundColor","lightgrey");
		$(this).css("backgroundColor","#f1f1f4");
		$("#detailedData").fadeIn("fast");
    });

});