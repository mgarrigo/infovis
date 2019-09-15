$('document').ready(function() {
  console.log("Staring JS.");
  getCsvAndAddRevenues();
});


function generateTextElement(text, pathNumber, offset) {
  let clone = $("#svg_36").clone();
  clone.removeAttr("id");
  clone.children().attr("xlink:href", "#path-" + pathNumber);
  clone.children().attr("startOffset", offset);
  clone.children().text(text);
  clone.children().attr("text-anchor", "middle")
  clone.appendTo("#svg_1");
  return clone;
}

function getCsvAndAddRevenues() {
  $.ajax({
    type: "GET",
    url: "https://download.data.world/s/z542umptjqvqqlpceiyjv45asq6bgo",
    dataType: "text",
    success: function(response) {
      let data = $.csv.toArrays(response);
//       console.log(data);
      for(year = 2013; year <= 2019; year++) {
        data
          .filter((row) => row[0] == year)
          .forEach((row, index) => {
//           console.log(row);
            addElementWithRevenue(row, offsets[year]);
        })
      }
    }
  })
}

let offsets = {"2013": "10%",
               "2014": "22%",
               "2015": "34%",
               "2016": "46%",
               "2017": "58%",
               "2018": "70%",
               "2019": "79%"};

function addElementWithRevenue(row, offset) {
  let pathNumber = undefined;
  
  switch(row[1]) {
    case "PC Games": {
      pathNumber = 0;
      break;
    }
    case "Mobile Games": {
      pathNumber = 1;
      break;
    }
    case "Console Games": {
      pathNumber = 2;
      break;
    }
  }
  
  let revenueText = Math.round(row[3]/1000000000) + "bn";
  generateTextElement(revenueText, pathNumber, offset);

}
