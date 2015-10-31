var tincan = new TinCan (
    {
        recordStores: [
            {
                endpoint: "https://cloud.scorm.com/tc/public/",
                username: "<Test User>",
                password: "<Test User's Password>",
                allowFail: false
            }
        ]
    }
);

function postToTinCan(location){
  tincan.sendStatement(
    {
        actor: {
            mbox: "mailto:andersondemo@ConnectionsAcademy.com"
        },
        verb: {
            id: "http://adlnet.gov/expapi/verbs/experienced",
            display:{
              und:'visited'
            }
        },
        target: {
            id: "http://localhost:1234/articles/" + location + ".html",
          "definition": {
            "name": {
                "en-US": location
            }
        },
        "objectType": "Activity"
        }
    },
    function(){
      console.log('Just heard back from TinCanJS: ', arguments);
      console.log('Go to http://tincanapi.com/public-lrs/ to see a record of your visit to ' + location);
    }
);
}




var width = window.outerWidth || window.innerWidth,
    height = window.outerHeight || window.innerHeight;


var cities = {
  type:'GeometryCollection',
  geometries:[
    {
      coordinates:[34.7961385,-19.0632529],
      type:'Point',
      properties:{
        name:'Sofala'
      }
    },
    {
      coordinates:[39.666089,-4.0356052],
      type:'Point',
      properties:{
        name:'Mombasa'
      }
    },
    {
      coordinates:[45.3066649,2.0592008],
      type:'Point',
      properties:{
        name:'Mogadishu'
      }
    },
    {
      coordinates:[45.0151531, 12.8106471],
      type:'Point',
      properties:{
        name:'Aden'
      }
    },
    {
      coordinates:[56.4196763,27.1157806],
      type:'Point',
      properties:{
        name:'Hormuz'
      }
    },
    {
      coordinates:[72.6196812,21.4206196],
      type:'Point',
      properties:{
        name:'Cambay'
      }
    },
    {
      coordinates:[75.810814, 11.2558347],
      type:'Point',
      properties:{
        name:'Calicut'
      }
    },
    {
      coordinates:[81.1307194,16.1859021],
      type:'Point',
      properties:{
        name:'Masulipatam'
      }
    },
    {
      coordinates:[6.0559076,80.2119971],
      type:'Point',
      properties:{
        name:'Galle'
      }
    },
    {
      coordinates:[104.7629646,-2.9549685],
      type:'Point',
      properties:{
        name:'Srivajaya'
      }
    },
    {
      coordinates:[109.216263,13.7848405],
      type:'Point',
      properties:{
        name:'Qui-Nhon'
      }
    },
    {
      coordinates:[113.2278442,23.1255978],
      type:'Point',
      properties:{
        name:'Canton'
      }
    }
  ]
};

var unvisitedCities = {
  type:'GeometryCollection',
  geometries:[
    {
      coordinates:[34.7961385,-19.0632529],
      type:'Point',
      properties:{
        name:'Sofala'
      }
    },
    {
      coordinates:[39.666089,-4.0356052],
      type:'Point',
      properties:{
        name:'Mombasa'
      }
    },
    {
      coordinates:[45.3066649,2.0592008],
      type:'Point',
      properties:{
        name:'Mogadishu'
      }
    },
    {
      coordinates:[45.0151531, 12.8106471],
      type:'Point',
      properties:{
        name:'Aden'
      }
    },
    {
      coordinates:[56.4196763,27.1157806],
      type:'Point',
      properties:{
        name:'Hormuz'
      }
    },
    {
      coordinates:[72.6196812,21.4206196],
      type:'Point',
      properties:{
        name:'Cambay'
      }
    },
    {
      coordinates:[75.810814, 11.2558347],
      type:'Point',
      properties:{
        name:'Calicut'
      }
    },
    {
      coordinates:[81.1307194,16.1859021],
      type:'Point',
      properties:{
        name:'Masulipatam'
      }
    },
    {
      coordinates:[6.0559076,80.2119971],
      type:'Point',
      properties:{
        name:'Galle'
      }
    },
    {
      coordinates:[104.7629646,-2.9549685],
      type:'Point',
      properties:{
        name:'Srivajaya'
      }
    },
    {
      coordinates:[109.216263,13.7848405],
      type:'Point',
      properties:{
        name:'Qui-Nhon'
      }
    },
    {
      coordinates:[113.2278442,23.1255978],
      type:'Point',
      properties:{
        name:'Canton'
      }
    }
  ]
};

var visitedCities = {
  type:'GeometryCollection',
  geometries:[ ]
};

var $article = $('article');
var currentMode = 'mapMode';

var landColor = '#fff';
var boundaryColor = '#999';
var oceanColor = '#45e2b4';

var initialScale = height > 500 ? 500 : height > 400 ? 300: 200;
var initialRotation = [-75, 5]
var projection = d3.geo.orthographic()
    .scale(initialScale)
    .translate([5 * width / 8, height / 2])
    .clipAngle(90)
    .rotate(initialRotation);



var canvas = d3.select("canvas")
    .attr("width", width)
    .attr("height", height);

var c = canvas.node().getContext("2d");

var path = d3.geo.path()
    .projection(projection)
    .context(c);

//queue()
//    .defer(d3.json, "data/world-110m.json")
//    //.defer(d3.tsv, "data/brics.tsv")
//    .await(ready);
var fn = {};

ready(null, world);

function ready(error, world) {
  var globe = {type: "Sphere"},
      land = topojson.feature(world, world.objects.land),
      countries = topojson.feature(world, world.objects.countries).features,
      borders = topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }),
      i = -1,
      n = countries.length;

//  countries = countries.filter(function(d) {
//    return names.some(function(n) {
//      if (d.id == n.id) return d.name = n.name;
//    });
//  }).sort(function(a, b) {
//    return a.name.localeCompare(b.name);
//  });

  function render(){
    c.clearRect(0, 0, width, height);
    c.strokeStyle = boundaryColor, c.fillStyle = oceanColor, c.lineWidth = 2, c.beginPath(), path(globe), c.stroke(), c.fill();
    c.fillStyle = "rgba(255,255,255,1.0)", c.beginPath(), path(land), c.fill();
    c.fillStyle = "#f00", c.beginPath(), path(unvisitedCities), c.fill();
    c.fillStyle = "#00f", c.beginPath(), path(visitedCities), c.fill();
    c.strokeStyle = boundaryColor, c.lineWidth = .5, c.beginPath(), path(borders), c.stroke();
  }
  render();
  
  function distance(co1, co2){
    return Math.sqrt((co2[1]-co1[1])*(co2[1]-co1[1]) + (co2[0]-co1[0])*(co2[0]-co1[0]))
  }
  
  function closeEnough(co1, co2){
    return distance(co1, co2) < 5;
  }
  
  function clickHandler(e){
      if(currentMode === 'mapMode'){
        var screenCoordinates = [d3.mouse(this)[0] - 0/2, d3.mouse(this)[1] - 0/2];
        var mapCoordinates = projection.invert(screenCoordinates);

        var i;
        for(i = 0; i < cities.geometries.length; i++){
          if(closeEnough(mapCoordinates, cities.geometries[i].coordinates)){
            console.log(cities.geometries[i].properties.name);
            gotoCountry(cities.geometries[i]);
            break;
          }
        }
      }
  }
  
  fn.transit= function(countryName){
    var i, newCountry;
    for(i = 0; i < cities.geometries.length; i++){
      if(cities.geometries[i].properties.name === countryName){
        console.log(cities.geometries[i].properties.name);
        newCountry = cities.geometries[i]
        break;
      }
    }
    
    if(newCountry){
      backFromCountry(true);
      setTimeout(function(){
        gotoCountry(newCountry);
      }, 2500);
      
    }
  };
  
  function addPoint(coordinates){
    unvisitedCities.geometries.push({
      type: 'Point',
      coordinates:mapCoordinates
    });
    render();
  }
  
  var λ = d3.scale.pow().exponent(2)
    .domain([-width/2, width/2])
    .range([initialRotation[0]-10, initialRotation[0]+10]);

  var φ = d3.scale.pow().exponent(2)
    .domain([-height/2, height/2])
    .range([initialRotation[1]+10, initialRotation[1]-10]);
  
  canvas
    .on('mousedown', clickHandler)
    .on('mousemove', function(){
      if(currentMode === 'mapMode'){
        var p = [d3.mouse(this)[0] - width/2, d3.mouse(this)[1] - height/2];
        projection.rotate([λ(p[0]), φ(p[1])]);
        render();
      }
    })
    .on('touchmove', function(){
      if(currentMode === 'mapMode'){
        var p = [d3.mouse(this)[0] - width/2, d3.mouse(this)[1] - height/2];
        projection.rotate([λ(p[0]), φ(p[1])]);
        render();
      }
    });
  
  d3.select('body')
    .on('keyup', function(e){
        if((d3.event.keyCode === 8 || d3.event.keyCode === 27) && currentMode === 'articleMode'){
          d3.event.preventDefault();
          backFromCountry();
        }
    })
  
  d3.select('.fa-arrow-circle-left')
    .on('click', function(e){
        if(currentMode === 'articleMode'){
          d3.event.preventDefault();
          backFromCountry();
        }
    });
  
  $(window).resize(function(){
    width = window.outerWidth || window.innerWidth;
    height = window.outerHeight || window.innerHeight;
    initialScale = height > 500 ? 500: height > 400 ? 300: 200;
    
    canvas
      .attr("width", width)
      .attr("height", height);

    projection
      .scale(initialScale)
      .translate([5 * width / 8, height / 2])
      .clipAngle(90)
      .rotate(initialRotation);

    λ.domain([-width/2, width/2]);
    φ.domain([-height/2, height/2]);
    
    if(currentMode === 'mapMode')
      render();
  });

  function gotoCountry(country) {
    queue()
    .defer(d3.html, "articles/" + country.properties.name.toLowerCase() + '.html')
    .await(function(error,articleHTML){
      error && console.log(error);
      turnToCountry(country)
      .each('end', zoomIn)
      
      currentMode = 'articleMode';
        $('body')
          .removeClass('map-mode')
          .addClass('article-mode');
      
      setTimeout(function(){
        $article.hide();
        $article.html(articleHTML);
        $article.fadeIn(1000, function(){
          visitedCities.geometries.push(country)
        });
        $('.fa-arrow-circle-left').fadeIn(1000);
        
        history.pushState({}, country.properties.name, '#' + country.properties.name);
        postToTinCan(country.properties.name);
        
      }, 1500)
    });
    
  }
  
  function backFromCountry(inTransit){
    
        
    $article.fadeOut(1000, function(){
      $article.html('');
      zoomOut()
        .each('end',turnFromCountry);
      if(!inTransit){
        $('body')
            .removeClass('article-mode')
            .addClass('map-mode');
          currentMode = 'mapMode';
      }
      history.pushState({}, '', '#');

    });
    $('.fa-arrow-circle-left').fadeOut(1000);
  }

  function turnToCountry(country){
    return d3.transition()
        .duration(1000)
        .tween("rotate", function() {
          var p = d3.geo.centroid(country),
                r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
          return function(t) {
            projection.rotate(r(t));
            c.clearRect(0, 0, width, height);
            render();
          };
        });
  }
  
  function turnFromCountry(){
    return d3.transition()
        .duration(1000)
        .tween("rotate", function() {
          var r = d3.interpolate(projection.rotate(), initialRotation);
          return function(t) {
            projection.rotate(r(t));
            render();
          };
        });
  }

  function zoomIn(){
    return d3.transition()
        .duration(1000)
        .tween("zoom", function() {
          var r = d3.interpolate(projection.scale(), 100000);
          return function(t) {
            projection.scale(r(t));
            c.clearRect(0, 0, width, height);
            c.strokeStyle = boundaryColor, c.fillStyle = 'rgba(69,226,180,' + (1-t) + ')', c.lineWidth = 2, c.beginPath(), path(globe), c.stroke(), c.fill();
            c.fillStyle = "rgba(255,255,255," + (1-t) + ")", c.beginPath(), path(land), c.fill();
            c.fillStyle = "rgba(255,0,0," + (1-t) + ")", c.beginPath(), path(unvisitedCities), c.fill();
            c.fillStyle = "rgba(0,0,255," + (1-t) + ")", c.beginPath(), path(visitedCities), c.fill();
            c.strokeStyle = boundaryColor, c.lineWidth = .5, c.beginPath(), path(borders), c.stroke();
          };
        });
  }
  
  

  function zoomOut(){
    return d3.transition()
        .duration(1000)
        .tween("zoom", function() {
          var r = d3.interpolate(projection.scale(), initialScale);
          return function(t) {
            projection.scale(r(t));
            c.clearRect(0, 0, width, height);
            c.strokeStyle = boundaryColor, c.fillStyle = 'rgba(69,226,180,' + (t) + ')', c.lineWidth = 2, c.beginPath(), path(globe), c.stroke(), c.fill();
            c.fillStyle = "rgba(255,255,255," + (t) + ")", c.beginPath(), path(land), c.fill();
            c.fillStyle = "rgba(255,0,0," + (t) + ")", c.beginPath(), path(unvisitedCities), c.fill();
            c.fillStyle = "rgba(0,0,255," + (t) + ")", c.beginPath(), path(visitedCities), c.fill();
            c.strokeStyle = boundaryColor, c.lineWidth = .5, c.beginPath(), path(borders), c.stroke();
          };
        });
  }

}