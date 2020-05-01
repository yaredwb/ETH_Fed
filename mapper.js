//
// Source code for interactive map
// @author: Yared W. Bekele
//

var margin = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10
}, width = parseInt(d3.select(".viz").style("width"))
  , width = width - margin.left - margin.right
  , mapRatio = 0.45
  , height = width * mapRatio
  , active = d3.select(null);

// Amharic equivalents for regions
var regionAmhNames = {
  'Addis Abeba': 'አዲስ አበባ',
  'Afar': 'አፋር',
  'Amhara': 'አማራ',
  'Benshangul-Gumaz': 'ቤኒሻንጉል ጉሙዝ',
  'Dire Dawa': 'ድሬዳዋ',
  'Gambela Peoples': 'ጋምቤላ',
  'Harari People': 'ሐረሪ',
  'Oromia': 'ኦሮሚያ',
  'Somali': 'ሶማሊ',
  'Southern Nations, Nationalities and Peoples': 'ደቡብ',
  'Tigray': 'ትግራይ'
};

// Amharic equivalents for zones
var zoneAmhNames = {
  "Mi'irabawi" : 'ምዕራባዊ',
  "Semien Mi'irabaw" : 'ሰሜን ምዕራባዊ',
  'Mehakelegnaw' : 'መሃከለኛው',
  'Misraqawi' : 'ምስራቃዊ',
  'Debubawi' : 'ደቡባዊ',
  'Semen Gondar' : 'ሰሜን ጎንደር',
  'Debub Gondar' : 'ደቡብ ጎንደር',
  'Agew Awi' : 'አገው አዊ',
  'Wag Himra' : 'ዋግ ኸምራ',
  'Semen Wello' : 'ሰሜን ወሎ',
  'Debub Wollo' : 'ደቡብ ወሎ',
  'Oromia' : 'ኦሮሚያ',
  'Argoba' : 'አርጎባ',
  'North Shewa' : 'ሰሜን ሸዋ',
  'Misraq Gojjam' : 'ምስራቅ ጎጃም',
  'Mirab Gojjam' : 'ምዕራብ ጎጃም',
  'Bahir Dar Special Zone' : 'ባህር ዳር ልዩ ዞን',
  'Siti' : 'ሲቲ',
  'Fafan' : 'ፋፋን',
  'Jarar' : 'ጃራር',
  'Doolo' : 'ዶሎ',
  'Korahe' : 'ቆራሄ',
  'Shabelle' : 'ሸበሌ',
  'Afder' : 'አፍደር',
  'Liben' : 'ሊበን',
  'Nogob' : 'ኖጎብ',
  'Asosa' : 'አሶሳ',
  'Kemashi' : 'ከማሺ',
  'Metekel' : 'መተከል',
  'Agnuak' : 'አኙዋክ',
  'Nuer' : 'ኑዌር',
  'Majang' : 'መዠንገር',
  'Debub Omo' : 'ደቡብ ኦሞ',
  'Konso' : 'ኮንሶ',
  'Alle' : 'አሌ',
  'Derashe' : 'ደራሼ',
  'Burji' : 'ቡርጂ',
  'Amaro' : 'አማሮ',
  'Gamo Gofa' : 'ጋሞ ጎፋ',
  'Basketo' : 'ባስኬቶ',
  'Wolayita' : 'ዎላይታ',
  'Sidama' : 'ሲዳማ',
  'Gedeo' : 'ጌዲኦ',
  'Hadiya' : 'ሐዲያ',
  'Kembata Tembaro' : 'ከምባታ ጠምባሮ',
  'Alaba' : 'አላባ',
  'Silti' : 'ሥልጤ',
  'Gurage' : 'ጉራጌ',
  'Yem' : 'የም',
  'Keffa' : 'ከፋ',
  'Konta' : 'ኮንታ',
  'Dawro' : 'ዳውሮ',
  'Bench Maji' : 'ቤንች ማጂ',
  'Sheka' : 'ሸካ',
  'Mirab Welega' : 'ምዕራብ ወለጋ',
  'Kelem Wellega' : 'ቄለም ወለጋ',
  'Misraq Wellega' : 'ምስራቅ ወለጋ',
  'Ilubabor' : 'ኢሉባቦር',
  'Jimma' : 'ጅማ',
  'Horo Guduru' : 'ሆሮ ጉድሩ',
  'Mirab Shewa' : 'ምዕራብ ሸዋ',
  'Debub Mirab Shewa' : 'ደቡብ ምዕራብ ሸዋ',
  'North Shewa' : 'ሰሜን ሸዋ',
  'Misraq Shewa' : 'ምስራቅ ሸዋ',
  'Mirab Hararghe' : 'ምዕራብ ሐረርጌ',
  'Misraq Harerge' : 'ምስራቅ ሐረርጌ',
  'Bale' : 'ባሌ',
  'Arsi' : 'አርሲ',
  'Mirab Arsi' : 'ምዕራብ አርሲ',
  'Guji' : 'ጉጂ',
  'Borena' : 'ቦረና',
  'Afar Zone 1' : 'አውሲ ረሱ',
  'Afar Zone 2' : 'ክልበቲ  ረሱ',
  'Afar Zone 3' : 'ጋቢ ረሱ',
  'Afar Zone 4' : 'ፈንቲ ረሱ',
  'Afar Zone 5' : 'ሀሪ ረሱ'
};

var svg = d3.select(".viz").append("svg")
  .attr("class", "center-container")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

svg.append("rect")
  .attr("class", "background center-container")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .on("click", clicked);

var regions = d3.json("gadm36_ETH_1.json");
var zones = d3.json("gadm36_ETH_2.json");

Promise.all([regions, zones])
  .then(ready);

var projection = d3.geoMercator().translate([width / 2, height / 2]).scale(width*2.2).center([40, 9]);
var path = d3.geoPath().projection(projection);

var g = svg.append("g")
  .attr("class", "center-container center-items regions")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom);

var tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

function ready(values) {

  g.append("g")
    .attr("id", "zones")
    .selectAll("path")
    .data(values[1].features)
    .enter()
    .append("path")
    .attr("d", path)
    .on("mouseover", function(d) {
      tooltip.transition()
      .duration(200)
      .style("opacity", 0.9);      
      tooltip.html(zoneAmhNames[d.properties.NAME_2])
      .style('display', 'inline');
    })
    .on("mousemove", function(d) {
      tooltip.html(zoneAmhNames[d.properties.NAME_2])
      .style("left", (d3.event.pageX - 100) + "px")
      .style("top", (d3.event.pageY - 30) + "px");
    })
    .on("mouseout", function(d) {
      tooltip.transition()
      .duration(500)
      .style("opacity", 0)
    })
    .attr("class", "zone-boundary");
    //.on("click", reset);

  g.append("g")
    .attr("id", "regions")
    .selectAll("path")
    .data(values[0].features)
    .enter()
    .append("path")
    .attr("d", path)
    .on("mouseover", function(d) {
      tooltip.transition()
      .duration(200)
      .style("opacity", 0.9);
      tooltip.html(regionAmhNames[d.properties.NAME_1])
      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY + 50) + "px");
    })
    .on("mousemove", function(d) {
      tooltip.html(regionAmhNames[d.properties.NAME_1])
      .style("left", (d3.event.pageX - 100) + "px")
      .style("top", (d3.event.pageY - 30) + "px");
    })
    .on("mouseout", function(d) {
      tooltip.transition()
      .duration(500)
      .style("opacity", 0)
    })
    .attr("class", "region")
    .on("click", clicked);

  g.append("path")
    .datum(values[0], function (a, b) {
      return a !== b;
    })
    .attr("id", "region-borders")
    .attr("d", path);
}

function clicked(d) {
  if (d3.select('.background').node() === this) return reset();

  if (active.node() === this) return reset();

  active.classed("active", false);
  active = d3.select(this).classed("active", true);

  var bounds = path.bounds(d),
    dx = bounds[1][0] - bounds[0][0],
    dy = bounds[1][1] - bounds[0][1],
    x = (bounds[0][0] + bounds[1][0]) / 2,
    y = (bounds[0][1] + bounds[1][1]) / 2,
    scale = .9 / Math.max(dx / width, dy / height),
    translate = [width / 2 - scale * x, height / 2 - scale * y];

  g.transition()
    .duration(750)
    .style("stroke-width", 1.5 / scale + "px")
    .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
}

function reset() {
  active.classed("active", false);
  active = d3.select(null);

  g.transition()
    .delay(100)
    .duration(750)
    .style("stroke-width", "1.5px")
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
}
