//var csv is the CSV file with headers
function csvToJson(csv){

  var lines=csv.split("\n");

  var result = [];

  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

	  var obj = {};
	  var currentline=lines[i].split(",");

	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }

	  result.push(obj);

  }
  
  return result; //JavaScript object
  /* return JSON.stringify(result) */; //JSON
}

$.ajax({
	type: "GET",  
	url: "https://download.data.world/s/zmqby6p6sgpvaqujb6kps76ixistpo",
	dataType: "text",       
	success: function(response) {
		/* console.log(response) */;
		/* data = $.csv.toArrays(response) */;
    var data = csvToJson(response);
		/* console.log(data) */;
    
   /*  var districts = getDistincts(data, "district");
    console.log(districts);
    
    var ages = getDistincts(data, "age");
    console.log(ages); */
    
    /* console.log(getAverageAgePerDistrictAtYear(data, 2011)); */
    
    console.log(JSON.stringify(getNewTable(data)));
	}
});

function getNewTable(data) {
	var array = [];
  
  getDistincts(data, "district").forEach(district => {
  	for(var year = 2011; year <= 2050; year++) {
    
    	var agesMap = new Map();
    	getDistincts(data, "age").forEach(age => {
        data
          .filter(row => row.age === age && row.district === district)
          .forEach(row => {
          	var ageRange = getAgeRange(age);
            if (agesMap.get(ageRange) === undefined) {
            	agesMap.set(ageRange, 0);
            }
            agesMap.set(ageRange, agesMap.get(ageRange) + Math.floor(row[year]));
          });
      });
      
      agesMap.forEach((people, ageRange) => {
      	var newRow = {};
        newRow.district = district;
        newRow.year = year;
        newRow.ageRange = ageRange;
        newRow.people = people;
        
        array.push(newRow);
      });
    }
  });
  
  return array;
}

function getAgeRange(age) {
	if (age <= 10) {
  	return "0 - 10";
  } else if(age <= 20) {
  	return "11 - 20";
  } else if(age <= 30) {
  	return "21 - 30";
  } else if(age <= 40) {
  	return "31 - 40";
  } else if(age <= 50) {
  	return "41 - 50";
  } else if(age <= 60) {
  	return "51 - 60";
  } else if(age <= 70) {
  	return "61 - 70";
  } else if(age <= 80) {
  	return "71 - 80";
  } else {
  	return "81 - 90";
  }
}

function getDistincts(dataset, property) {
	var values = new Set();
	dataset.forEach(row => {
  	values.add(row[property]);
  });
  return values;
}

function getAverageAgePerDistrictAtYear(dataset, year) {
	var districtsMap = new Map();
  var districts = getDistincts(dataset, "district");
  districts.forEach(district => {
  
  	var totalPeople = 0;
    var agesSum = 0;
    
  	dataset
    	.filter(row => row.district === district)
    	.forEach(row => {
      	var people = row[year];
        var sum = people * row.age;
        if (people >= 0 && sum >= 0) {
        	totalPeople += people;
        	agesSum += sum;
        }
        if (!(isNaN(totalPeople) || isNaN(agesSum))) {
        	console.log(row);
        }
    		/* console.log(totalPeople) */;
    });
  
  	var avgAge = agesSum / totalPeople;
  	districtsMap.set(district, avgAge);
	});
  
  return districtsMap;
}
