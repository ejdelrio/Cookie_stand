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
    for (var key in this.weeklySales) {
      this.salesGen();
      this.weeklySales[key] = (this.dailySales);
      this.dailySales = [];
    }
  };
  storeLocation.weeklyGen();
}
