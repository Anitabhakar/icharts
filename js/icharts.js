$(document).ready(function () {
    var margin = {top: 30, left: 40, right: 60, bottom: 40}, //Dimension of charts
    width = 500 - margin.right - margin.left,
            height = 400 - margin.bottom - margin.top;

    var chart = d3.selectAll(".charts")   //creation of char area with dimension
            .attr("height", height + margin.top + margin.bottom)
            .attr("width", width + margin.left + margin.right)
            .style("border", "1px solid black")
            .style("float", "center")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");//chart area
//variables for providing the data
    var x = d3.scale.linear()
            .range([0, width]);
    var y = d3.scale.ordinal()
            .rangeRoundBands([height, 0],.3);
//variables for providing axis
    var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
    var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");
    //file containing the data
    d3.tsv("data.tsv", function (error, data) {
//domain of the variable                     
        x.domain([0, d3.max(data, function (d) {
                return d.value;
            })]);
        y.domain(data.map(function (d) {
            return d.name;
        }));
        chart.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);
        chart.append("g")
                .attr("class", "y axis")
                .call(yAxis);
        chart.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) {
                    return 0;
                })
                .attr("width", function (d) {
                    return x(d.value);
        })
                .attr("y", function (d) {
                    return y(d.name);
                })
               .attr("height", y.rangeBand()) ;
                });
              
    });
