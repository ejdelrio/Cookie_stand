'use strict';
//array of minimums sales in order of locations
var mins = [23, 3, 11, 20, 2, 30];
//array of max sales in order of locations
var maxes = [64, 28, 38, 38, 16, 12];
//Array of average sales per customer in order
var averages = [6.3, 1.2, 3.7, 2.3, 4.6, 10];
//object called stores contains a list of stores with their location as the key for each location
var stores = {
  firstAndPike : {
  },
  seaTacAirport: {
  },
  seattleCenter: {
  },
  capitalHill: {
  },
  alki: {
  },
  NewYork: {}
};
//array of values from stores object
var storeKeys = Object.keys(stores);

for (var i = 0, l = storeKeys.length; i < l; i ++) {
  //Assigns each store location to an write/read variable
  var storeLocation = stores[storeKeys[i]];
  storeLocation.minPerHour = mins[i];
  storeLocation.maxPerHour = maxes[i];
  storeLocation.avgPerCustomer = averages[i];
  storeLocation.cusPerHour = function () {
    return Math.floor(Math.random() * (this.maxPerHour - this.minPerHour) + this.minPerHour);
  },
  storeLocation.cookiesPerHour = function () {
    return this.cusPerHour() * this.avgPerCustomer;
  },
  storeLocation.dailySales = [],
  storeLocation.salesGen = function () {
    //Generates 14 random numbers to append to dailySales
    var total = 0;
    for (var n = 0; n < 14; n++) {
      var hourlySales = Math.floor(this.cookiesPerHour());
      this.dailySales.push(hourlySales);
      total += hourlySales;
    }
    this.dailySales.push(total);
  },
  //Creates a week object that will house each daily sales array
  storeLocation.weeklySales = {
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: ''
  },
  storeLocation.weeklyGen = function () {
    //runs dailySales function 7 times and defines each array one as a weeklySales value
    for (var key in this.weeklySales) {
      this.salesGen();
      this.weeklySales[key] = (this.dailySales);
      this.dailySales = [];
    }
  };
  storeLocation.weeklyGen();
}


function postSales() {
  //Sort through stores Objectes and creates sorted DOM elements for each
  //location, day and hour with corresponding sales
  for (var keys in stores) {
    var storeDiv = document.createElement('div');
    var title = document.createElement('h1');
    title.innerHTML = keys;
    storeDiv.appendChild(title);


    for (var days in stores[keys].weeklySales) {
      var dayTitle = document.createElement('h2');
      dayTitle.innerHTML = days;
      storeDiv.appendChild(dayTitle);
      var week = stores[keys].weeklySales;
      var listStart = document.createElement('ul');


      for (i = 0; i < 15; i++) {
        var listInner = document.createElement('li');
        if (i < 7) {
          listInner.innerHTML = (i + 6) + 'am: ' + week[days][i];
        } else if (i >= 7 && i < 14) {
          listInner.innerHTML = (i - 6) + 'pm: ' + week[days][i];
        } else {
          listInner.innerHTML = 'Total: ' + week[days][i];
        }
        listStart.appendChild(listInner);
      }

      storeDiv.appendChild(listStart);
    }
    document.body.appendChild(storeDiv);
  }
  for (var i = 0; i < Object.keys(stores).length; i++) {
    document.getElementsByTagName('div')[i].style.display = 'inline-block';
    document.getElementsByTagName('div')[i].style.outline = '1px solid black';
    document.getElementsByTagName('div')[i].style.width = '200px';
  }
}



postSales();
