// Define are dimensions, chart's margins and dimensions of chart area (using activiies from D3 day 3 as example)
var svgWidth = 750;
var svgHeight = 300;
var margin = {
  top: 10,
  right: 30,
  bottom: 5,
  left: 20
};
// Define dimensions of the chart area
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
// Create an SVG wrapper, append an SVG group that will hold our chart,and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);
// Append SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
// Load data from csv file
d3.csv("assets/data/data.csv").then(function(healthData) {
  // Print the health data
  console.log(healthData);
  //start function to extract income and health data
  healthData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });
  // Creating scales for the chart
  var xLinearScale = d3.scaleLinear().range([0, svgWidth]);
  var yLinearScale = d3.scaleLinear().range([svgHeight, 0]);
  //  creating the axes
  var xAxis = d3.axisBottom(xLinearScale);
  var yAxis = d3.axisLeft(yLinearScale);
  //set x/y minimums & max
  var xMinimum;
  var xMaximum;
  var yMinimum;
  var yMaximum;
  xMinimum = d3.min(healthData, function(data) {
      return data.healthcare;
  });
  xMaximum = d3.max(healthData, function(data) {
      return data.healthcare;
  });
  yMinimum = d3.min(healthData, function(data) {
      return data.poverty;
  });
  yMaximum = d3.max(healthData, function(data) {
      return data.poverty;
  });
  //print mins and max to console
  console.log(xMaximum);
  console.log(xMinimum);
  console.log(yMaximum);
  console.log(yMinimum);
  //set mins/max in scale
  xLinearScale.domain([xMinimum, xMaximum]);
  yLinearScale.domain([yMinimum, yMaximum]);
  // Append x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);
  // Append y-axis
  chartGroup.append("g").call(yAxis);
  // Create code to build the bar chart using health data extracted 
  chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.healthcare ))
    .attr("cy", d => yLinearScale(d.poverty ))
    .attr("r", 8)
    .attr("fill", "#16ABCC")
    .attr("opacity", .70);
  // text with in circles
  chartGroup.selectAll("text.text-circles")
    .data(healthData)
    .enter()
    .append("text")
    .classed("text-circles",true)
    .text(d => d.abbr)
    .attr("y", d => yLinearScale(d.healthcare))
    .attr("x", d => xLinearScale(d.poverty))
    .attr("text-anchor","middle")
    .attr("font-size","8px");
  //http://bl.ocks.org/weiglemc/6185069
  // set y axis
  svg.append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "middle")
      .text("Lacking Healthcare (%)");
  // set x axis
  svg.append("text")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "middle")
      .text("Poverty Rate (%)");
});
