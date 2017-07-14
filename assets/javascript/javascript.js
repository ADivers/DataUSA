var nameLookup;
      d3.json("https://api.datausa.io/attrs/geo/", function(error, data) {

        data = d3plus.dataFold(data);
        nameLookup = data.reduce(function(obj, d) {
          obj[d.id] = d.display_name;
          return obj;
        }, {});

        // console.log(nameLookup);
      
        var chart = new d3plus.BarChart();

        var settings = {
          data: "https://api.datausa.io/api/?show=geo&sumlevel=state&required=patients_readmitted_within_30_days_of_discharge&year=latest",
          discrete: "y",
          groupBy: "geo",
          label: function(d) {
            return nameLookup[d.geo];
          },
          select: "#viz",
          y: function(d) {
            return d.geo;
          },
          x: function(d) {
            return d.patients_readmitted_within_30_days_of_discharge;
          }
        };

        var arcStyles = {
          fill: function(d) {
            if (d.geo == "01000US") {
              return "#85bc25";
            }
            else {
              return "#62b5e5";
            }
          }
        };

        chart
          .config(settings)
          .shapeConfig(arcStyles)
          .render();


      });
