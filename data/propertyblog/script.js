// Fetching data from json file //////////////////////////////////////////////////////////////////////////////////////////////////////////

let newPropertyPricesArray = JSON.parse(newProperty);
let existingPropertyPricesArray = JSON.parse(existingProperty);


// Creating arrays that will be used to create cityObjects //////////////////////////////////////////////////////////////////////////////////////////////////////////

let cityNames = Object.keys(newPropertyPricesArray[0]);

const colorArray = ['#FF6633', '#FFB399', '#FF33FF', 'red', '#00B3E6',
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];


let [date, bialystok, bydgoszcz, gdansk, gdynia, katowice, kielce, krakow, lublin, lodz, olsztyn, opole, poznan, rzeszow, szczecin, warszawa, wroclaw, zielonagora] = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

let arrayOfCities = [date, bialystok, bydgoszcz, gdansk, gdynia, katowice, kielce, krakow, lublin, lodz, olsztyn, opole, poznan, rzeszow, szczecin, warszawa, wroclaw, zielonagora];

// SECOND CHART - EXISTING PROPERTY PRICES /////////////////////////////////////////////////////////////////////
let [dateE, bialystokE, bydgoszczE, gdanskE, gdyniaE, katowiceE, kielceE, krakowE, lublinE, lodzE, olsztynE, opoleE, poznanE, rzeszowE, szczecinE, warszawaE, wroclawE, zielonagoraE] = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

let arrayOfCitiesExisting = [dateE, bialystokE, bydgoszczE, gdanskE, gdyniaE, katowiceE, kielceE, krakowE, lublinE, lodzE, olsztynE, opoleE, poznanE, rzeszowE, szczecinE, warszawaE, wroclawE, zielonagoraE];


// Inserting prices into city arrays //////////////////////////////////////////////////////////////////////////////////////////////////////////

newPropertyPricesArray.forEach(function(object) {
  for(let i =0; i<arrayOfCities.length;i++) {
    arrayOfCities[i].push(object[cityNames[i]].replace(/,/g, '.'));
  };
})

existingPropertyPricesArray.forEach(function(object) {
	for(let i=0; i<arrayOfCitiesExisting.length; i++) {
		arrayOfCitiesExisting[i].push(object[cityNames[i]].replace(/,/g, '.'));
	}
})


// Constructor functions //////////////////////////////////////////////////////////////////////////////////////////////////////////

function CityObjects (i) {
  this.label = cityNames[i];
  this.data = arrayOfCities[i];
  this.fill = false;
  this.borderColor = colorArray[i];
}

function CityObjectsExisting (i) {
  this.label = cityNames[i];
  this.data = arrayOfCitiesExisting[i];
  this.fill = false;
  this.borderColor = colorArray[i];
}

// Creating city objects //////////////////////////////////////////////////////////////////////////////////////////////////////////

let [bialystokObject, bydgoszczObject, gdanskObject, gdyniaObject, katowiceObject, kielceObject, krakowObject, lublinObject, lodzObject, olsztynObject, opoleObject, poznanObject, rzeszowObject, szczecinObject, warszawaObject, wroclawObject, zielonagoraObject] = [new CityObjects(1),new CityObjects(2),new CityObjects(3),new CityObjects(4),new CityObjects(5),new CityObjects(6),new CityObjects(7),new CityObjects(8),new CityObjects(9),new CityObjects(10),new CityObjects(11),new CityObjects(12),new CityObjects(13),new CityObjects(14),new CityObjects(15),new CityObjects(16),new CityObjects(17)];

let [bialystokEObject, bydgoszczEObject, gdanskEObject, gdyniaEObject, katowiceEObject, kielceEObject, krakowEObject, lublinEObject, lodzEObject, olsztynEObject, opoleEObject, poznanEObject, rzeszowEObject, szczecinEObject, warszawaEObject, wroclawEObject, zielonagoraEObject] = [new CityObjectsExisting(1),new CityObjectsExisting(2),new CityObjectsExisting(3),new CityObjectsExisting(4),new CityObjectsExisting(5),new CityObjectsExisting(6),new CityObjectsExisting(7),new CityObjectsExisting(8),new CityObjectsExisting(9),new CityObjectsExisting(10),new CityObjectsExisting(11),new CityObjectsExisting(12),new CityObjectsExisting(13),new CityObjectsExisting(14),new CityObjectsExisting(15),new CityObjectsExisting(16),new CityObjectsExisting(17)];



// Chart.js //////////////////////////////////////////////////////////////////////////////////////////////////////////

// New Properties Chart

let newPropertyPricesChartObject = {
  type: 'line',
  data: {
    labels: date,
    datasets:
    [
      gdanskObject,
      gdyniaObject,
      krakowObject,
      poznanObject,
      warszawaObject,
      wroclawObject
    ]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          stepSize: 0.5
        },
				scaleLabel: {
					display: true,
					labelString: `PLN/1 sq.m`
				}
      }]
    }
  }
}

// Existing Properties Chart


let existingPropertyPricesChartObject = {
  type: 'line',
  data: {
    labels: date,
    datasets:
    [
      gdanskEObject,
      gdyniaEObject,
      krakowEObject,
			poznanEObject,
      warszawaEObject,
      wroclawEObject

    ]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          stepSize: 0.5
        },
				scaleLabel: {
					display: true,
					labelString: `PLN/1 sq.m`
				}
      }]
    }
  }
}



	let propertyPrices = document.getElementById('propertyPrices').getContext('2d');
	let propertyPricesChart = new Chart(propertyPrices, newPropertyPricesChartObject);



	let existingPropertyPrices = document.getElementById('existingPropertyPrices').getContext('2d');
	let existingPropertyPricesChart = new Chart(existingPropertyPrices, existingPropertyPricesChartObject);

	//  INTEREST RATES CHART /////////////////////////////////////////////////////////////////////////////////////////


	const interestRatesJSON = JSON.parse(rates2);

	const interestDates = [];
	const interestValues = [];

	interestRatesJSON.forEach(function(object) {
		interestDates.push(object['Date']);
		interestValues.push(object['Rate'].replace(/,/g, '.'));
	})

	const interestRates = document.getElementById('interestRates').getContext('2d');

	let interestRatesObject = {
		type: "line",
		data: {
			labels: interestDates,
			datasets: [{
				label: 'Interest Rates',
				data: interestValues,
				fill: false,
				borderColor: "red"
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true,
						stepSize: 1
					}
				}],
				xAxes: [{
				}]
			}
		}
	}

	const interestRatesChart = new Chart(interestRates, interestRatesObject);




// Adding checkboxes with city names to DOM //////////////////////////////////////////////////////////////////////////////////////////////////////////

let citiesForm = document.getElementById('citiesForm');
let existingCitiesForm = document.getElementById('existingCitiesForm');

for (let i=1; i<arrayOfCities.length; i++) {
  citiesForm.innerHTML +=
  `<div class="form-check form-check-inline">`
  +
  `<input type="checkbox" class="form-check-input" id="${cityNames[i].toLowerCase().replace(/ /g,'')}">`
  +
  `<label class="form-check-label" for="${cityNames[i].toLowerCase().replace(/ /g,'')}">${cityNames[i]}</label>`
  +
  `</div>`

	existingCitiesForm.innerHTML +=
  `<div class="form-check form-check-inline">`
  +
  `<input type="checkbox" class="form-check-input" id="${cityNames[i].toLowerCase().replace(/ /g,'')}E">`
  +
  `<label class="form-check-label" for="${cityNames[i].toLowerCase().replace(/ /g,'')}E">${cityNames[i]}</label>`
  +
  `</div>`
}


// Adding checked attribute to chosen cities (!!make sure that you added datasets) //////////////////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById('gdansk').checked = true;
document.getElementById('gdynia').checked = true;
document.getElementById('krakow').checked = true;
document.getElementById('poznan').checked = true;
document.getElementById('warszawa').checked = true;
document.getElementById('wroclaw').checked = true;

document.getElementById('gdanskE').checked = true;
document.getElementById('gdyniaE').checked = true;
document.getElementById('krakowE').checked = true;
document.getElementById('poznanE').checked = true;
document.getElementById('warszawaE').checked = true;
document.getElementById('wroclawE').checked = true;


// Adding and Removing datasets when checkbox is checked/unchecked //////////////////////////////////////////////////////////////////////////////////////////////////////////

let cities = document.querySelectorAll('#citiesForm input');
let existingCities = document.querySelectorAll('#existingCitiesForm input');

cities.forEach(function(element) {
  element.addEventListener('change', citiesChartUpdate)
});

existingCities.forEach(function (element) {
	element.addEventListener('change', existingCitiesChartUpdate)
});

function citiesChartUpdate() {
  if(this.checked) {
    propertyPricesChart.data.datasets.push(eval(this.id+"Object"));
    propertyPricesChart.update();
  }else {
    const index = propertyPricesChart.data.datasets.indexOf(eval(this.id+"Object"));
    propertyPricesChart.data.datasets.splice(index,1);
    propertyPricesChart.update();
  }
}

function existingCitiesChartUpdate() {
  if(this.checked) {
    existingPropertyPricesChart.data.datasets.push(eval(this.id+"Object"));
    existingPropertyPricesChart.update();
  }else {
    const index = existingPropertyPricesChart.data.datasets.indexOf(eval(this.id+"Object"));
    existingPropertyPricesChart.data.datasets.splice(index,1);
    existingPropertyPricesChart.update();
  }
}



//  BLOG POSTS /////////////////////////////////////////////////////////////////////////////////////////

// HEIGHT OF L CONTEINER EQUAL TO HEIGHT OF R CONTAINER /////////////////////

let blogPosts = document.getElementById('blogPostsCarousel');
let lastChart = document.getElementById('lastChart');


let relativeHeight = lastChart.getBoundingClientRect().bottom + window.pageYOffset;
let blogPostsTop = blogPosts.getBoundingClientRect().top + window.pageYOffset;


// Moved to eventListeners below

// blogPosts.style.height = relativeHeight-blogPostsTop+"px";
// blogPosts.style.overflowY= "auto";


// CAROUSEL OBJECT /////////////////////

$('.carousel').carousel({
    interval: false,
    keyboard: true,
    wrap: true,
  });


  // ADDING/REMOVING CLASS TO CAROUSEL ITEMS (MAKING CAROUSEL ONLY FOR SMALL SCREEN)//////////////////////////////////////////////////////////////////////////////////////


    let carouselItems = document.querySelectorAll('.addClass');

    window.addEventListener('resize', function () {
      if(window.innerWidth<991) {
        carouselItems.forEach(function(item) {
          item.classList.add("carousel-item")
        })
				blogPosts.style.height = "auto";
				blogPosts.style.overflowY= "auto";
      } else {
        carouselItems.forEach(function(item) {
          item.classList.remove("carousel-item")
        })
				blogPosts.style.height = relativeHeight-blogPostsTop+"px";
				blogPosts.style.overflowY= "auto";
      }
    })

    window.addEventListener('load', function () {
      if(window.innerWidth<991) {

        carouselItems.forEach(function(item) {
          item.classList.add("carousel-item")
        })
				blogPosts.style.height = "auto";
				blogPosts.style.overflowY= "auto";
      } else {
        carouselItems.forEach(function(item) {
          item.classList.remove("carousel-item")
        })
				blogPosts.style.height = relativeHeight-blogPostsTop+"px";
				blogPosts.style.overflowY= "auto";
      }
    })


//  MODAL- making chart visible in modal  /////////////////////////////////////////////////////////////////////////////////////////


let newPropertyButton = document.getElementById('newPropertyButton');

newPropertyButton.addEventListener('click', function () {
	let modalTitle = document.getElementById('modalTitle');
	let newPropertiesTitle = document.getElementById(`newPropertiesTitle`);

	modalTitle.innerHTML= newPropertiesTitle.innerHTML;

  let propertyPrices2 = document.getElementById('propertyPrices2').getContext('2d');

  let propertyPricesChart = new Chart(propertyPrices2, newPropertyPricesChartObject)

})


let existingPropertyButton = document.getElementById('existingPropertyButton');

existingPropertyButton.addEventListener('click', function () {
	let existingModalTitle = document.getElementById('existingModalTitle');
	let existingPropertiesTitle = document.getElementById('existingPropertiesTitle');

	existingModalTitle.innerHTML= existingPropertiesTitle.innerHTML;

  let existingPropertyPrices2 = document.getElementById('existingPropertyPrices2').getContext('2d');

  let existingPropertyPricesChart = new Chart(existingPropertyPrices2, existingPropertyPricesChartObject)

})


let interestRatesButton = document.getElementById('interestRatesButton');

interestRatesButton.addEventListener('click', function () {
	let interestRatesModalTitle = document.getElementById('interestRatesModalTitle');
	let interestRatesTitle = document.getElementById('interestRatesTitle');

	interestRatesModalTitle.innerHTML= interestRatesTitle.innerHTML;

  let interestRates2 = document.getElementById('interestRates2').getContext('2d');

  let existingPropertyPricesChart = new Chart(interestRates2, interestRatesObject)

})


//  MORTGAGE CALCULATOR /////////////////////////////////////////////////////////////////////////////////////////

const mortageAmount = document.getElementById('amount');
const mortageRate = document.getElementById('rate');
const mortagePeriod = document.getElementById('period');

const mortgageMonthlyCost = document.getElementById('monthly');
const mortgageTotalCost = document.getElementById('total');

function calculateMortgage () {
	const monthsInYear = 12;
	const amount = mortageAmount.value;
	const rate = mortageRate.value /monthsInYear/100;
	const period = mortagePeriod.value *monthsInYear;


	let tempMortageMonthlyCost = amount*(rate*Math.pow((1+rate),period))/(Math.pow((1+rate),period)-1);

	mortgageMonthlyCost.innerText = tempMortageMonthlyCost.toFixed(2);



	mortgageTotalCost.innerText = (period * tempMortageMonthlyCost).toFixed(2);
}

calculateMortgage()

mortageAmount.addEventListener('input', calculateMortgage);
mortageRate.addEventListener('input', calculateMortgage);
mortagePeriod.addEventListener('input', calculateMortgage);
