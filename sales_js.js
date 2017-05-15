'use strict';
//array of minimums sales in order of locations
var mins = [23, 3, 11, 20, 2];
//array of max sales in order of locations
var maxes = [64, 28, 38, 38, 16];
//Array of average sales per customer in order
var averages = [6.3, 1.2, 3.7, 2.3, 4.6];
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
  }
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
      var hourlySales = this.cookiesPerHour();
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
    //runs dailySales function 7 times and defines each array one as a weekly value
    for (var key in this.weeklySales) {
      this.salesGen();
      this.weeklySales[key] = (this.dailySales);
      this.dailySales = [];
    }
  };
  storeLocation.weeklyGen();
}


function postSales() {
  for (var keys in stores) {
    var title = document.createElement('h1');
    title.innerHTML = keys;
    document.body.appendChild(title);


    for (var days in stores[keys].weeklySales) {
      var dayTitle = document.createElement('h2');
      dayTitle.innerHTML = days;
      document.body.appendChild(dayTitle);
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

      document.body.appendChild(listStart);
    }
  }
}

postSales();
