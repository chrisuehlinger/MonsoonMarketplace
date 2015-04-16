var width = window.innerWidth,
    height = window.innerHeight;

var projection = d3.geo.orthographic()
    .scale(500)
    .translate([width / 2, height / 2])
    .clipAngle(90);

var path = d3.geo.path()
    .projection(projection);

var globe = {type: "Sphere"}

var λ = d3.scale.linear()
    .domain([0, width])
    .range([-90, -70]);

var φ = d3.scale.linear()
    .domain([0, height])
    .range([9, -9]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.on("mousemove", function() {
  var p = d3.mouse(this);
  console.log(p);
  projection.rotate([λ(p[0]/1), φ(p[1]/1)]);
  svg.selectAll("path").attr("d", path);
});

d3.json("data/world-110m.json", function(error, world) {
  svg.append("path")
      .datum(globe)
      .attr("fill", "#4292ff")
      .attr("d", path);
  
  svg.append("path")
      .datum(topojson.feature(world, world.objects.land))
      .attr("class", "land")
      .attr("d", path);
    
  svg.append("path")
    .datum(topojson.feature(world, world.objects.countries))
    .attr("stroke", "#fff")
    .attr("d", path);
});