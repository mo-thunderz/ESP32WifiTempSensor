var array_length = 10;
var xValues = [];
for (let i = 0; i < array_length; i++) {
  xValues[i] = i;
}

var yValues = [];

const myChart = new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{
        scaleLabel: {
            display: true,
            labelString: 'Temperature (°C)'
        },
        ticks: {min: 14, max:30}}],
      xAxes: [{
            display: false
        },
        {
            scaleLabel: {
                display: true,
                labelString: 'Measurement number'
            }
        }]

    }
  }
});

var output = document.getElementById('ID_RANDOM_INTENSITY_VALUE');

var Socket;

function init() {
  Socket = new WebSocket('ws://' + window.location.hostname + ':81/');
  Socket.onmessage = function(event) {
    processCommand(event);
  };
}

function processCommand(event) {
  var obj = JSON.parse(event.data);
  var type = obj.type;
  if (type.localeCompare("graph_update") == 0) {
    console.log(obj.value);
    var temp_values = obj.value;
    for(var i=0, length = temp_values.length; i < length; i++) {
      temp_values[i] = temp_values[i] / 10;
    }
    myChart.data.datasets[0].data = temp_values;
    myChart.update();
  }
}
window.onload = function(event) {
  init();
}