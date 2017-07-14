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
          data: "https://api.datausa.io/api/join/?show=geo&sumlevel=state&required=pop,patients_readmitted_within_30_days_of_discharge&year=latest&order=patients_readmitted_within_30_days_of_discharge&sort=asc&cohort=surgical",
          discrete: "y",
          groupBy: "geo",
          label: function(d) {
            return nameLookup[d.geo];
          },
          select: "#viz",
          y: function(d) {
            return d["acs_5yr.yg.geo"];
          },
          x: function(d) {
            return d["dartmouth.ygc_post_discharge.patients_readmitted_within_30_days_of_discharge"] / d["acs_5yr.yg.pop"];
          }
        };

        var arcStyles = {
          fill: function(d) {
            if ( (d["dartmouth.ygc_post_discharge.patients_readmitted_within_30_days_of_discharge"] / d["acs_5yr.yg.pop"]) > .0007 ) {
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
          .yConfig({
            tickFormat: function(d) {
                return nameLookup[d];
            }

          })
          .render();



        var settingsScatter = {
            data: "https://api.datausa.io/api/join/?show=geo&sumlevel=state&required=income,pop,patients_readmitted_within_30_days_of_discharge&year=latest&order=patients_readmitted_within_30_days_of_discharge&sort=asc&cohort=surgical",
            groupBy: "acs_5yr.yg.geo",
            label: function(d) {
                return nameLookup[d["acs_5yr.yg.geo"]];
            },
            select: "#viz2",
            y: function(d) {
                return d["acs_5yr.yg.income"];
            },
            x: function(d) {
                if (d["acs_5yr.yg.pop"])
                    return d["dartmouth.ygc_post_discharge.patients_readmitted_within_30_days_of_discharge"] / d["acs_5yr.yg.pop"];
            }
        };

        var incomeScatterChart = new d3plus.Plot()
        incomeScatterChart
        .config(settingsScatter)
        .shapeConfig(arcStyles)
        .render()


      var settingsScatterAge = {
        data: "https://api.datausa.io/api/join/?show=geo&sumlevel=state&required=age,pop,patients_readmitted_within_30_days_of_discharge&year=latest&order=patients_readmitted_within_30_days_of_discharge&sort=asc&cohort=surgical",
            groupBy: "acs_5yr.yg.geo",
            label: function(d) {
                return nameLookup[d["acs_5yr.yg.geo"]];
            },
            select: "#viz3",
            y: function(d) {
                return d["acs_5yr.yg.age"];
            },
            x: function(d) {
                if (d["acs_5yr.yg.pop"])
                    return d["dartmouth.ygc_post_discharge.patients_readmitted_within_30_days_of_discharge"] / d["acs_5yr.yg.pop"];
            }

            
      };

      var ageScatterChart = new d3plus.Plot()
      ageScatterChart
      .config(settingsScatterAge)
      .shapeConfig(arcStyles)
      .render()
      
});