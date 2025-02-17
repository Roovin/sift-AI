

(() => {
  window.addEventListener('load', (event) => {
function createVisualization(overall, profile, geography) {
  const QUARTERS = overall.map((o) => o.QUARTER);
  const QUARTER_LABELS = QUARTERS.map((q) => `Q${Math.floor((parseInt((q.split('-')[1])) + 2) / 3)} ${parseInt(q.split('-')[0])}`);

  // DIFF
  var currentFilter = {};

  overall = overall.map((o) => {
    return {
      x: QUARTERS.indexOf(o.QUARTER),
      ar: o.ATO_ATTEMPT_RATE * 100,
      tfr: o.TFA_RATE * 100,
      // cr: o.CHARGEBACK_RATE * 100
    }
  });

  profile = profile.map((p) => {
    return {
      x: QUARTERS.indexOf(p.QUARTER),
      profile: p.PROFILE,
      ar: p.ATO_ATTEMPT_RATE * 100,
      tfr: p.TFA_RATE * 100,
      // cr: p.CHARGEBACK_RATE * 100
    }
  });

  geography = geography.map((g) => {
    return {
      x: QUARTERS.indexOf(g.QUARTER),
      geography: g.GEOGRAPHY,
      ar: g.ATO_ATTEMPT_RATE * 100,
      tfr: g.TFA_RATE * 100,
      // cr: g.CHARGEBACK_RATE * 100
    }
  });

  function createPanel(selector, dataKey, color) {
    d3.select(`#${selector}`).selectAll("*").remove();

    // line break util
    function breakLines(d) {
      var el = d3.select(this);
      var words = QUARTER_LABELS[d].split(" ");
      el.text('');

      for (var i = 0; i < words.length; i++) {
          var tspan = el.append("tspan").text(words[i]);
          if (i > 0)
              tspan.attr("x", 0).attr("dy", "13");
      }
    }

    // DIFF
    var containerWidth = document.querySelector(`#${selector}`).offsetWidth;

    // DIFF
    // chart setup
    var margin = {top: 10, right: 30, bottom: 40, left: 60},
        width = containerWidth - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var svg = d3.select(`#${selector}`)
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear().range([15, width + margin.right - 15]);
    var xAxis = d3.axisBottom().scale(x).ticks(5).tickPadding(10);
    xAxis.tickFormat((d,i) => QUARTER_LABELS[i]);

    var y = d3.scaleLinear().range([height, 0]);
    var yAxis = d3.axisLeft().scale(y).ticks(5).tickFormat((d,i) => d + '%');

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class", "x-axis")

    svg.append("g")
      .attr("class","y-axis")

      // create gradient
    svg.append("linearGradient")
      .attr("id", "gradient-" + selector)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", "0%")
      .attr("x2", 0).attr("y2", height)
      .selectAll("stop")
      .data([{
          offset: "0%",
          color: color + "32"
        },
        {
          offset: "50%",
          color: color + "19"
        },
        {
          offset: "100%",
          color: "transparent"
        }
      ])
      .enter().append("stop")
      .attr("offset", function(d) {
        return d.offset;
      })
      .attr("stop-color", function(d) {
        return d.color;
      });

    var tooltip = d3.select(`#${selector}`)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("color", color);

    // data update function
    svg.update = function(data) {

      x.domain([0, d3.max(data, function(d) { return d.x }) ]);
      svg.selectAll(".x-axis")
        .call(xAxis);

      svg.selectAll("g.x-axis g text").each(breakLines);

      y.domain([0, d3.max(data.concat(overall), function(d) { return d[dataKey]  }) ]);
      svg.selectAll(".y-axis")
        .transition(500)
        .call(yAxis);

      // DIFF
      svg.selectAll(".y-axis g.tick line")
        .transition(500)
        .attr("x2", containerWidth);

      // define the area
      var areaFn = d3.area()
          .x(function(d) { return x(d.x); })
          .y0(height)
          .y1(function(d) { return y(d[dataKey]); });
          
      // define the line
      var lineFn = d3.line()
          .x(function(d) { return x(d.x); })
          .y(function(d) { return y(d[dataKey]); });

      var area = svg.selectAll(".area")
          .data([data, overall]);

      area
          .enter()
          .append("path")
          .data([data, overall])
          .attr("class", "area")
          .merge(area)
          .transition()
          .duration(500)
          .attr("d", areaFn)
          .attr("fill", function(d, i) {
            if (i == 0) {
              return `url(#gradient-${selector})`;
            }
            return "none";
          });

      var line = svg.selectAll(".line")
        .data([data, overall]);

      line.enter()
        .append("path")
        .attr("class", function(d, i) {
          if (i == 0) {
            return "line";
          }
          return "line overall";
        })
        .merge(line)
        .transition()
        .duration(500)
        .attr("d", d3.line()
          .x(function(d) { return x(d.x); })
          .y(function(d) { return y(d[dataKey]); })
        )
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2.5);

      var yGrid = (g) => g
        .attr("class", "grid-lines")
        .selectAll("line")
        .data(y.ticks())
        .join("line")
        .attr("x1", margin.left)
        .attr("x2", width - margin.right)
        .attr("y1", d => yScale(d))
        .attr("y2", d => yScale(d))

      var cursor;

      if (svg.select(".cursor").node()) {
        cursor = svg.select(".cursor");
      } else {
        cursor = svg.append("g").classed("cursor", true).style("display", "none");
        cursor.append("line").attr("x1", 0).attr("x2", 0).attr("stroke", color);
        cursor.append("circle").attr("r", 3.5).attr("fill", color).attr("stroke", color).attr("stroke-width", 2.5);
      }

      const bg = svg.select(".bg").node() ? 
          svg.select(".bg") : 
          svg.append("rect")
            .attr("class", "bg")
            .attr("width", width + margin.right)
            .attr("height", height)
            .attr("opacity", "0");

      bg.on("mousemove", function(mouse) {
          var [mouseX, mouseY] = d3.mouse(this);

          var [min, max] = d3.extent(data, d => d.x);

          var ratioX = mouseX / width;
          var dataX = min + Math.round(ratioX * (max - min));

          var curDataY = data.find(d => d.x === dataX)[dataKey]; 
          var overallDataY = overall.find(d => d.x === dataX)[dataKey];
          var curY = y(curDataY);
          var overallY = y(overallDataY);
          var diffCur = Math.abs(mouseY - curY);
          var diffOverall = Math.abs(mouseY - overallY);

          var isCur = diffCur <= diffOverall;

          var dataY = isCur ? curDataY : overallDataY;

          cursor.attr("transform", `translate(${x(dataX)}, ${0})`);
          cursor.select("line").attr("y1", y(dataY)).attr("y2", height);
          cursor.select("circle").attr("cy", y(dataY));

          if (isCur) {
            cursor.select("circle").attr("fill", color);
          } else {
            cursor.select("circle").attr("fill", "white");
          }

          cursor.style("display", "block");

          tooltip
            .html("<div class='tooltip-date'>" + QUARTER_LABELS[dataX] + "</div>" + dataY.toPrecision(2) + "%");

          tooltipWidth = tooltip.node().getBoundingClientRect().width; 

          tooltip
            .style("opacity", 1)
            .style("left", x(dataX) + 60 - (tooltipWidth / 2) + "px")
            .style("top", y(dataY) - 45 + "px")          
        });

        svg.select(".bg").on("mouseout", function(mouse) {
          tooltip.style("opacity", 0)
          cursor.style("display", "none");
        });
    };

    return svg;
  }

  var panel1 = createPanel("attempt", "ar", "#7132D6");
  var panel2 = createPanel("two-factor", "tfr", "#36CCBE");
  // var panel2 = createPanel("chargeback", "cr", "#316CFF");

  panel1.update(overall);
  panel2.update(overall);
  // panel3.update(overall);

 
var d = document.getElementById('filter-industry-container-new');
var f = document.getElementById('filter-industry-new');
var j = document.getElementById('filter-geography-new');
var g = document.getElementById('filter-geography-container-new');
      d.addEventListener('mouseover', function () {
								f.classList.add('show'), f.classList.remove('hide');
                d.classList.add('active'), d.classList.remove('non-active');
							}),
								d.addEventListener('mouseout', function () {
									f.classList.add('hide'), f.classList.remove('show');
                   d.classList.add('non-active'), d.classList.remove('active');
								});
      g.addEventListener('mouseover', function () {
								j.classList.add('show'), j.classList.remove('hide');
                   g.classList.add('active'), g.classList.remove('non-active');
							}),
								g.addEventListener('mouseout', function () {
									j.classList.add('hide'), j.classList.remove('show');
                  g.classList.add('non-active'), g.classList.remove('active');
								});



var filter_industry_new = document.querySelectorAll(".filter-industry-new li");
var filter_geography_new = document.querySelectorAll(".filter-geography-new li");
filter_industry_new.forEach((list) => {
  list.addEventListener("click", function(event) {
    updateAll("industry", event.target.getAttribute('value'));
    document.getElementById("filter-industry-container-new").classList.toggle("grayed", false);
    document.getElementById("filter-geography-container-new").selectedIndex = 0;
    document.getElementById("filter-geography-container-new").classList.toggle("grayed", true);
  });
});
filter_geography_new.forEach((list1) => {
  list1.addEventListener("click", function(event) {
    updateAll("geography", event.target.getAttribute('value'));
    document.getElementById("filter-geography-container-new").classList.toggle("grayed", false);
    document.getElementById("filter-industry-container-new").selectedIndex = 0;
    document.getElementById("filter-industry-container-new").classList.toggle("grayed", true);
  });
 });


var reset_industry = document.querySelectorAll(".filter-industry-reset-new");
var reset_geography = document.querySelectorAll(".filter-geo-reset-new");

reset_industry.forEach((list) => {
  list.addEventListener("click", function() {
  panel1.update(overall);
  panel2.update(overall);
  });
});
reset_geography.forEach((list) => {
  list.addEventListener("click", function() {
  panel1.update(overall);
  panel2.update(overall);
  });
});
 
  // DIFF
  var updateAll = function(which, filter) {
    if (which === "industry") {
      panel1.update(profile.filter((p) => p.profile === filter));
      panel2.update(profile.filter((p) => p.profile === filter));
      // panel3.update(profile.filter((p) => p.profile === filter));
    } else if (which === "geography") {
      panel1.update(geography.filter((g) => g.geography === filter));
      panel2.update(geography.filter((g) => g.geography === filter));
      // panel3.update(geography.filter((g) => g.geography === filter));
    } else {
      panel1.update(overall);
      panel2.update(overall);
      // panel3.update(overall);
    }
    currentFilter = {which, filter};
  }

  function debounce(func, time) {
      var time = time || 100;
      var timer;
      return function(event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, time, event);
      };
  }

  function resizeContent() {
    panel1 = createPanel("attempt", "ar", "#7132D6");
    panel2 = createPanel("two-factor", "tfr", "#36CCBE");
    // panel3 = createPanel("review", "rr", "#36CCBE");

    updateAll(currentFilter.which, currentFilter.filter);
  }


  // form script


	
			setUpSubmitButton();

	
	var submitBtn;
	var submitState = false;
	var initialSetup = false;
    function checkSubmitStatus() {
      if(submitBtn){
        if (submitState) {
          submitBtn.removeAttribute('disabled');
        } else {
          submitBtn.setAttribute('disabled', 'disabled');
        }
      }
      }
      	function handleCheckboxes() {
		var checkboxes = document.querySelectorAll('input[type="checkbox"]');
		var importantCheckboxes = [checkboxes[0], checkboxes[1]];
		var importantCheckedCount = 0;

		importantCheckboxes.forEach((ch) => {
			ch.addEventListener('click', (e) => {
				if (e.target.checked) {
					importantCheckedCount += 1;
				} else {
					importantCheckedCount -= 1;
				}

				if (importantCheckedCount > 0) {
					submitState = true;
				} else {
					submitState = false;
				}
				checkSubmitStatus();
			});
		});
	}
  function handleSubmitLogic() {
		var radioBtns = document.querySelectorAll('input[type="radio"]');

		if (radioBtns.length !== 0) {
			checkSubmitStatus();
			radioBtns[0].addEventListener('click', () => {
				submitState = true;
				checkSubmitStatus();
			});

			radioBtns[1].addEventListener('click', () => {
				submitState = false;
				checkSubmitStatus();
				window.setTimeout(handleCheckboxes, 100);
			});
		}
	}
  	function setUpSubmitButton() {
		if (document.querySelector('.mktoForm')) {
			submitBtn = document.querySelector('.mktoForm button[type="submit"]');
			handleSubmitLogic();
		} else {
			submitState = true;
		}
		initialSetup = true;
	}

  window.addEventListener("resize", debounce( resizeContent, 200 ));
}

  var overall = [{"QUARTER":"2023-01-01","ATO_ATTEMPT_RATE":0.02368545,"TFA_RATE":0.0851930476},{"QUARTER":"2023-04-01","ATO_ATTEMPT_RATE":0.0337768065,"TFA_RATE":0.0912976406},{"QUARTER":"2023-07-01","ATO_ATTEMPT_RATE":0.0312123182,"TFA_RATE":0.0973430149},{"QUARTER":"2023-10-01","ATO_ATTEMPT_RATE":0.0249564179,"TFA_RATE":0.1039975507},{"QUARTER":"2024-01-01","ATO_ATTEMPT_RATE":0.0250435672,"TFA_RATE":0.1010048551}];

  var profile = [{"PROFILE":"Buy now, pay later","QUARTER":"2023-01-01","ATO_ATTEMPT_RATE":0.0,"TFA_RATE":0.0},{"PROFILE":"Buy now, pay later","QUARTER":"2023-04-01","ATO_ATTEMPT_RATE":0.148148,"TFA_RATE":0.0},{"PROFILE":"Buy now, pay later","QUARTER":"2023-07-01","ATO_ATTEMPT_RATE":0.1666665,"TFA_RATE":0.0},{"PROFILE":"Buy now, pay later","QUARTER":"2023-10-01","ATO_ATTEMPT_RATE":0.0,"TFA_RATE":0.0},{"PROFILE":"Buy now, pay later","QUARTER":"2024-01-01","ATO_ATTEMPT_RATE":0.0,"TFA_RATE":0.0},{"PROFILE":"Cryptocurrency","QUARTER":"2023-01-01","ATO_ATTEMPT_RATE":0.019713,"TFA_RATE":0.1275285},{"PROFILE":"Cryptocurrency","QUARTER":"2023-04-01","ATO_ATTEMPT_RATE":0.0110436,"TFA_RATE":0.1753566667},{"PROFILE":"Cryptocurrency","QUARTER":"2023-07-01","ATO_ATTEMPT_RATE":0.008939,"TFA_RATE":0.1661845},{"PROFILE":"Cryptocurrency","QUARTER":"2023-10-01","ATO_ATTEMPT_RATE":0.0085876,"TFA_RATE":0.1350825714},{"PROFILE":"Cryptocurrency","QUARTER":"2024-01-01","ATO_ATTEMPT_RATE":0.0061342,"TFA_RATE":0.1029928571},{"PROFILE":"Digital goods & services","QUARTER":"2023-01-01","ATO_ATTEMPT_RATE":0.0059629286,"TFA_RATE":0.0144177143},{"PROFILE":"Digital goods & services","QUARTER":"2023-04-01","ATO_ATTEMPT_RATE":0.0064100714,"TFA_RATE":0.0141927143},{"PROFILE":"Digital goods & services","QUARTER":"2023-07-01","ATO_ATTEMPT_RATE":0.0068124667,"TFA_RATE":0.0280721333},{"PROFILE":"Digital goods & services","QUARTER":"2023-10-01","ATO_ATTEMPT_RATE":0.0070600667,"TFA_RATE":0.0356312667},{"PROFILE":"Digital goods & services","QUARTER":"2024-01-01","ATO_ATTEMPT_RATE":0.0047851333,"TFA_RATE":0.0262494667},{"PROFILE":"Digital wallets","QUARTER":"2023-01-01","ATO_ATTEMPT_RATE":0.134181,"TFA_RATE":0.993816},{"PROFILE":"Digital wallets","QUARTER":"2023-04-01","ATO_ATTEMPT_RATE":0.079549,"TFA_RATE":0.998153},{"PROFILE":"Digital wallets","QUARTER":"2023-07-01","ATO_ATTEMPT_RATE":0.051421,"TFA_RATE":0.526173},{"PROFILE":"Digital wallets","QUARTER":"2023-10-01","ATO_ATTEMPT_RATE":0.0664765,"TFA_RATE":0.570385},{"PROFILE":"Digital wallets","QUARTER":"2024-01-01","ATO_ATTEMPT_RATE":0.0756005,"TFA_RATE":0.589389},{"PROFILE":"Food ordering & delivery","QUARTER":"2023-01-01","ATO_ATTEMPT_RATE":0.148855,"TFA_RATE":0.046702},{"PROFILE":"Food ordering & delivery","QUARTER":"2023-04-01","ATO_ATTEMPT_RATE":0.244391,"TFA_RATE":0.0048685},{"PROFILE":"Food ordering & delivery","QUARTER":"2023-07-01","ATO_ATTEMPT_RATE":0.195334,"TFA_RATE":0.051867},{"PROFILE":"Food ordering & delivery","QUARTER":"2023-10-01","ATO_ATTEMPT_RATE":0.164299,"TFA_RATE":0.042229},{"PROFILE":"Food ordering & delivery","QUARTER":"2024-01-01","ATO_ATTEMPT_RATE":0.1960145,"TFA_RATE":0.034893},{"PROFILE":"Loyalty","QUARTER":"2023-01-01","ATO_ATTEMPT_RATE":0.0973805,"TFA_RATE":0.1234395},{"PROFILE":"Loyalty","QUARTER":"2023-04-01","ATO_ATTEMPT_RATE":0.0947355,"TFA_RATE":0.120918},{"PROFILE":"Loyalty","QUARTER":"2023-07-01","ATO_ATTEMPT_RATE":0.0911635,"TFA_RATE":0.112137},{"PROFILE":"Loyalty","QUARTER":"2023-10-01","ATO_ATTEMPT_RATE":0.089659,"TFA_RATE":0.1081525},{"PROFILE":"Loyalty","QUARTER":"2024-01-01","ATO_ATTEMPT_RATE":0.1054715,"TFA_RATE":0.1223305},{"PROFILE":"Marketplaces","QUARTER":"2023-01-01","ATO_ATTEMPT_RATE":0.0193375455,"TFA_RATE":0.1430177273},{"PROFILE":"Marketplaces","QUARTER":"2023-04-01","ATO_ATTEMPT_RATE":0.0202329167,"TFA_RATE":0.12665375},{"PROFILE":"Marketplaces","QUARTER":"2023-07-01","ATO_ATTEMPT_RATE":0.0175067857,"TFA_RATE":0.1105791429},{"PROFILE":"Marketplaces","QUARTER":"2023-10-01","ATO_ATTEMPT_RATE":0.0191102857,"TFA_RATE":0.1155626429},{"PROFILE":"Marketplaces","QUARTER":"2024-01-01","ATO_ATTEMPT_RATE":0.0197255714,"TFA_RATE":0.1198817857},{"PROFILE":"On Demand Other","QUARTER":"2023-10-01","ATO_ATTEMPT_RATE":0.0,"TFA_RATE":0.0},{"PROFILE":"On Demand Other","QUARTER":"2024-01-01","ATO_ATTEMPT_RATE":0.000015,"TFA_RATE":0.0},{"PROFILE":"Online travel & lodging","QUARTER":"2023-01-01","ATO_ATTEMPT_RATE":0.0,"TFA_RATE":0.0},{"PROFILE":"Online travel & lodging","QUARTER":"2023-04-01","ATO_ATTEMPT_RATE":0.0,"TFA_RATE":0.0},{"PROFILE":"Online travel & lodging","QUARTER":"2023-07-01","ATO_ATTEMPT_RATE":0.0,"TFA_RATE":0.0},{"PROFILE":"Online travel & lodging","QUARTER":"2023-10-01","ATO_ATTEMPT_RATE":0.0,"TFA_RATE":0.0},{"PROFILE":"Online travel & lodging","QUARTER":"2024-01-01","ATO_ATTEMPT_RATE":0.0,"TFA_RATE":0.0},{"PROFILE":"Remittances","QUARTER":"2023-01-01","ATO_ATTEMPT_RATE":0.0007002,"TFA_RATE":0.0295278},{"PROFILE":"Remittances","QUARTER":"2023-04-01","ATO_ATTEMPT_RATE":0.0020246,"TFA_RATE":0.02885},{"PROFILE":"Remittances","QUARTER":"2023-07-01","ATO_ATTEMPT_RATE":0.0013856,"TFA_RATE":0.0253942},{"PROFILE":"Remittances","QUARTER":"2023-10-01","ATO_ATTEMPT_RATE":0.0005928,"TFA_RATE":0.023528},{"PROFILE":"Remittances","QUARTER":"2024-01-01","ATO_ATTEMPT_RATE":0.0001618,"TFA_RATE":0.0250382},{"PROFILE":"Retail","QUARTER":"2023-01-01","ATO_ATTEMPT_RATE":0.0191503636,"TFA_RATE":0.0985088182},{"PROFILE":"Retail","QUARTER":"2023-04-01","ATO_ATTEMPT_RATE":0.03340475,"TFA_RATE":0.1098146667},{"PROFILE":"Retail","QUARTER":"2023-07-01","ATO_ATTEMPT_RATE":0.0330474545,"TFA_RATE":0.1067278182},{"PROFILE":"Retail","QUARTER":"2023-10-01","ATO_ATTEMPT_RATE":0.0302493636,"TFA_RATE":0.1142070909},{"PROFILE":"Retail","QUARTER":"2024-01-01","ATO_ATTEMPT_RATE":0.0341686364,"TFA_RATE":0.1158410909},{"PROFILE":"Ticketing","QUARTER":"2023-01-01","ATO_ATTEMPT_RATE":0.0810885,"TFA_RATE":0.0032725},{"PROFILE":"Ticketing","QUARTER":"2023-04-01","ATO_ATTEMPT_RATE":0.1053035,"TFA_RATE":0.1738515},{"PROFILE":"Ticketing","QUARTER":"2023-07-01","ATO_ATTEMPT_RATE":0.1315405,"TFA_RATE":0.4367725},{"PROFILE":"Ticketing","QUARTER":"2023-10-01","ATO_ATTEMPT_RATE":0.1249435,"TFA_RATE":0.6020405},{"PROFILE":"Ticketing","QUARTER":"2024-01-01","ATO_ATTEMPT_RATE":0.07537,"TFA_RATE":0.615018},{"PROFILE":"Transportation","QUARTER":"2023-01-01","ATO_ATTEMPT_RATE":0.0077946667,"TFA_RATE":0.0000036667},{"PROFILE":"Transportation","QUARTER":"2023-04-01","ATO_ATTEMPT_RATE":0.010241,"TFA_RATE":0.00322775},{"PROFILE":"Transportation","QUARTER":"2023-07-01","ATO_ATTEMPT_RATE":0.00633375,"TFA_RATE":0.00020225},{"PROFILE":"Transportation","QUARTER":"2023-10-01","ATO_ATTEMPT_RATE":0.0073085,"TFA_RATE":0.01459375},{"PROFILE":"Transportation","QUARTER":"2024-01-01","ATO_ATTEMPT_RATE":0.00443025,"TFA_RATE":0.0133985},{"PROFILE":"iGaming & online gambling","QUARTER":"2023-01-01","ATO_ATTEMPT_RATE":0.0,"TFA_RATE":0.0},{"PROFILE":"iGaming & online gambling","QUARTER":"2023-04-01","ATO_ATTEMPT_RATE":0.0,"TFA_RATE":0.0},{"PROFILE":"iGaming & online gambling","QUARTER":"2023-07-01","ATO_ATTEMPT_RATE":0.0,"TFA_RATE":0.0},{"PROFILE":"iGaming & online gambling","QUARTER":"2023-10-01","ATO_ATTEMPT_RATE":0.0,"TFA_RATE":0.0},{"PROFILE":"iGaming & online gambling","QUARTER":"2024-01-01","ATO_ATTEMPT_RATE":0.0,"TFA_RATE":0.0},{"PROFILE":"All fintech","QUARTER":"2023-01-01","ATO_ATTEMPT_RATE":0.0287338667,"TFA_RATE":0.133809},{"PROFILE":"All fintech","QUARTER":"2023-04-01","ATO_ATTEMPT_RATE":0.0420438,"TFA_RATE":0.1522736875},{"PROFILE":"All fintech","QUARTER":"2023-07-01","ATO_ATTEMPT_RATE":0.0418828125,"TFA_RATE":0.1412175294},{"PROFILE":"All fintech","QUARTER":"2023-10-01","ATO_ATTEMPT_RATE":0.0223858125,"TFA_RATE":0.1344607222},{"PROFILE":"All fintech","QUARTER":"2024-01-01","ATO_ATTEMPT_RATE":0.0246015,"TFA_RATE":0.1260877778}];

  var geography = [{"GEOGRAPHY":"AMER","QUARTER":"2023-01-01","ATO_ATTEMPT_RATE":0.02794792,"TFA_RATE":0.0930090962},{"GEOGRAPHY":"AMER","QUARTER":"2023-04-01","ATO_ATTEMPT_RATE":0.0398270769,"TFA_RATE":0.1000935283},{"GEOGRAPHY":"AMER","QUARTER":"2023-07-01","ATO_ATTEMPT_RATE":0.0372863519,"TFA_RATE":0.1092316296},{"GEOGRAPHY":"AMER","QUARTER":"2023-10-01","ATO_ATTEMPT_RATE":0.0292126545,"TFA_RATE":0.1168079455},{"GEOGRAPHY":"AMER","QUARTER":"2024-01-01","ATO_ATTEMPT_RATE":0.0299859818,"TFA_RATE":0.1150024182},{"GEOGRAPHY":"APAC","QUARTER":"2023-01-01","ATO_ATTEMPT_RATE":0.0,"TFA_RATE":0.000002},{"GEOGRAPHY":"APAC","QUARTER":"2023-04-01","ATO_ATTEMPT_RATE":0.0000765,"TFA_RATE":0.0000015},{"GEOGRAPHY":"APAC","QUARTER":"2023-07-01","ATO_ATTEMPT_RATE":0.000047,"TFA_RATE":0.000002},{"GEOGRAPHY":"APAC","QUARTER":"2023-10-01","ATO_ATTEMPT_RATE":0.000001,"TFA_RATE":0.000001},{"GEOGRAPHY":"APAC","QUARTER":"2024-01-01","ATO_ATTEMPT_RATE":0.0,"TFA_RATE":0.0000015},{"GEOGRAPHY":"EMEA","QUARTER":"2023-01-01","ATO_ATTEMPT_RATE":0.0064736667,"TFA_RATE":0.035865},{"GEOGRAPHY":"EMEA","QUARTER":"2023-04-01","ATO_ATTEMPT_RATE":0.006705,"TFA_RATE":0.0402783333},{"GEOGRAPHY":"EMEA","QUARTER":"2023-07-01","ATO_ATTEMPT_RATE":0.011121,"TFA_RATE":0.04602075},{"GEOGRAPHY":"EMEA","QUARTER":"2023-10-01","ATO_ATTEMPT_RATE":0.008707,"TFA_RATE":0.035424},{"GEOGRAPHY":"EMEA","QUARTER":"2024-01-01","ATO_ATTEMPT_RATE":0.000006,"TFA_RATE":0.00000175},{"GEOGRAPHY":"LATAM","QUARTER":"2023-01-01","ATO_ATTEMPT_RATE":0.000862,"TFA_RATE":0.070515},{"GEOGRAPHY":"LATAM","QUARTER":"2023-04-01","ATO_ATTEMPT_RATE":0.0005772,"TFA_RATE":0.0695423333},{"GEOGRAPHY":"LATAM","QUARTER":"2023-07-01","ATO_ATTEMPT_RATE":0.0018704286,"TFA_RATE":0.0627695714},{"GEOGRAPHY":"LATAM","QUARTER":"2023-10-01","ATO_ATTEMPT_RATE":0.0056087143,"TFA_RATE":0.076212},{"GEOGRAPHY":"LATAM","QUARTER":"2024-01-01","ATO_ATTEMPT_RATE":0.004096,"TFA_RATE":0.080524}];

createVisualization(overall, profile, geography);
  });
})();
