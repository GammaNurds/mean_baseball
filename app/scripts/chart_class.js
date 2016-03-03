"use strict";
color = "rgba(0,0,220,0.2)";
color = "rgba(220,0,0,0.2)";

color = "rgba(0,220,0,0.2)";

color = "rgba(0,220,220,0.2)";


color = "rgba(220,220,0,0.2)";

// local chart options
var options = {

    //Boolean - Whether we show the angle lines out of the radar
    angleShowLineOut: true,

    //String - Colour of the angle line
    angleLineColor: "rgba(0,0,0,.1)",

    //Number - Pixel width of the angle line
    angleLineWidth: 1,

    //String - Point label font declaration
    pointLabelFontFamily: "'Arial'",

    //String - Point label font weight
    pointLabelFontStyle: "normal",

    //Number - Point label font size in pixels
    pointLabelFontSize: 10,

    //String - Point label font colour
    pointLabelFontColor: "#666",

    //Boolean - Whether to show a dot for each point
    pointDot: true,

    //Number - Radius of each point dot in pixels
    pointDotRadius: 3,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth: 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius: 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke: true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth: 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill: true,

    //String - A legend template
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",

    multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>",

    // Boolean - If we want to override with a hard coded scale
    scaleOverride: true,
    // ** Required if scaleOverride is true **
    // Number - The number of steps in a hard coded scale
    scaleSteps: 5,
    // Number - The value jump in the hard coded scale
    scaleStepWidth: 20,
    // Number - The scale starting value
    scaleStartValue: 0,
    //Boolean - Whether to show labels on the scale
    scaleShowLabels: false,
    // Boolean - Whether the scale should begin at zero
    scaleBeginAtZero: true,
    //Boolean - Whether to show lines for each scale point
    scaleShowLine: true

};

var data = {
    labels: ["Pitching", "Concentration", "Batting", "Success", "Trash Talk"],
    datasets: [{
        label: "Player Skills",
        fillColor: color,
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [pitching, concentration, batting, success, trashtalk]
    }, ]
};

var ChartClass = function(newColor) {
    var min = 10;
    var max = 10;
    var min_trashtalk = 10;
    var color;
    var data;

    var pitching = 50;  // strike perc
    var batting = 50;  // hit perc
    var concentration = 50;
    var success = 50;  // win perc
    var trashtalk = 50;
    
    this.init = function() {
        console.log("new chart!");
        this.setColor(newColor);
    };

    this.setColor = function(newColor) {
        color = newColor;
    };

    this.setData = function() {
        data = {
            labels: ["Pitching", "Concentration", "Batting", "Success", "Trash Talk"],
            datasets: [{
                label: "Player Skills",
                fillColor: color,
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [pitching, concentration, batting, success, trashtalk]
            }]
        };
    }; 

    this.init(); // run init method
    

};


function showSpiderChart(player, pitching, batting, concentration, success, trashtalk) {


 

    // append required html tag to results div-tag
    $("#result").append('<canvas id="spiderChart" class="newLine" width="300" height="300"></canvas>');
    $("#legend").empty();
    $("#legend").append('<p>Pitching: Strike ratio<br>Concentration: Ball stat.<br>Batting: AVG stat.<br>Success: Win stat.</p>');
    $("#spiderChart").css("float", "left");
    // Get context with jQuery - using jQuery's .get() method.
    var ctx = $("#spiderChart").get(0).getContext("2d");

    var myChart = new Chart(ctx).Radar(data, options);

}