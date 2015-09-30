var generadoraDeCajones = function(frecuenciaDeSampleo,numeroDeMuestras,amplitud,periodo,ancho) {
	var data
	=	[]
	,	t
	=	0
	,	z
	=	0;

	for (var i=0; i < numeroDeMuestras; i++) {
		
		data.push(
			{
				amplitud:	(z < ancho) ? amplitud : 0 	
			,	tiempo:		t
			}
		)

		if (z == periodo)
			z=0;
		else
			z++;

		t = t + (1/frecuenciaDeSampleo);

	}

	return	data
}

var	generadoraDeSeno = function(frecuenciaDeSampleo,numeroDeMuestras,amplitud) {
	var data
	=	[]
	,	t
	=	0

	for (var i=0; i < numeroDeMuestras; i++) {
		
		data.push(
			{
				amplitud:	amplitud*math.sin(t)
			,	tiempo:		t
			}
		);

		t = t + (1/frecuenciaDeSampleo);

	}

	return	data
}

var graficarModulacionPAM = function(frecuenciaDeSampleo, numeroDeMuestras, senial, cajonera) {

	var margin = {top: 20, right: 20, bottom: 30, left: 50},
		width = $('#waveformChart').width() - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	var senial = generadoraDeSeno(frecuenciaDeSampleo,numeroDeMuestras,senial.amplitud);

	var moduladora = generadoraDeCajones(frecuenciaDeSampleo,numeroDeMuestras,cajonera.amplitud,cajonera.periodo,cajonera.ancho);

	var pam = [];

	for (var indice in moduladora) {

		if (moduladora[indice].amplitud != 0)
			pam.push(
				{
					amplitud:	senial[indice].amplitud
				,	tiempo:		moduladora[indice].tiempo
				}
			)
		else
			pam.push(moduladora[indice])
	
	}

	var x = d3.scale.linear()
		.range([0, width]);

	var y = d3.scale.linear()
		.range([height, 0]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

	var line = d3.svg.line()
		.x(function(d,i) { return x(d.tiempo);})
		.y(function(d,i) { return y(d.amplitud);});

	var svg = d3.select("#waveformChart").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	x.domain(d3.extent(pam, function(d,i) { return d.tiempo; }));
	y.domain(d3.extent(pam, function(d,i) { return d.amplitud; }));
	
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.append("text")
		.text("Tiempo");

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Amplitud");

	svg.append("path")
		.datum(pam)
		.attr("class", "line")
		.attr("d", line);
}

$(function () {

	$('button').on('click', function(){

	$('#waveformChart svg').remove();

	graficarModulacionPAM(
		parseFloat($('#frecuenciaDeMuestreo').val())	//	Frecuencia de Sampleo
	,	parseInt($('#numeroDeMuestras').val())			//	Numero de Muestras
	,	{
			amplitud:	parseFloat($('#amplitudSenial').val())
		}
	,	{
			amplitud:	parseFloat($('#amplitudModuladora').val())
		,	periodo:	parseFloat($('#periodoModuladora').val())
		,	ancho:		parseFloat($('#anchoModuladora').val())
		}
	);

});

$('button').click();
	
});