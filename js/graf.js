var graficar = function(title, destino, datos) {

	var margin = {top: 40, right: 20, bottom: 30, left: 50},
		width = $(destino).width() - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

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

	var svg = d3.select(destino).append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	x.domain(d3.extent(datos, function(d,i) { return d.tiempo; }));
	y.domain(d3.extent(datos, function(d,i) { return d.amplitud; }));
	
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
		.datum(datos)
		.attr("class", "line")
		.attr("d", line);

	svg.append("text")
		.attr("x", (width / 2))             
		.attr("y", 0 - (margin.top / 2))
		.attr("text-anchor", "middle")  
		.style("font-size", "16px") 
		.text(title);
}