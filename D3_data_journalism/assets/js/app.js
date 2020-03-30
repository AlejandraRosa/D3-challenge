// Define are dimensions, chart's margins and dimensions of chart area (using activiy 2.3 as example)
var svgWidth = 960;
var svgHeight = 500;
var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};
// Define dimensions of the chart area
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select(".scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);
// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

// Load data from hours-of-tv-watched.csv
d3.csv("assets/data/data.csv").then(function(healthData) {
  // Print the health data
  console.log(healthData);
  
  healthData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });
  // Create scale functions
  var xLinearScale = d3.scaleLinear().range([0, svgWidth]);
  var yLinearScale = d3.scaleLinear().range([svgHeight, 0]);
  //  creating axis func.
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);
  var xMin;
  var xMax;
  var yMin;
  var yMax;
  xMin = d3.min(healthData, function(data) {
      return data.healthcare;
  });
  xMax = d3.max(healthData, function(data) {
      return data.healthcare;
  });
  yMin = d3.min(healthData, function(data) {
      return data.poverty;
  });
  yMax = d3.max(healthData, function(data) {
      return data.poverty;
  });
  xLinearScale.domain([xMin, xMax]);
  yLinearScale.domain([yMin, yMax]);
  console.log(xMin);
  console.log(yMax);
  // Append axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${svgHeight})`)
    .call(bottomAxis);
  chartGroup.append("g")
    .call(leftAxis);
  // Create code to build the bar chart using the tvData.
  chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.healthcare +1.5))
    .attr("cy", d => yLinearScale(d.poverty +0.3))
    .attr("r", 2)
    .attr("fill", "#69b3a2")
    .attr("opacity", .8)

});