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
  stores[storeKeys[i]].minPerHour = mins[i];
  stores[storeKeys[i]].maxPerHour = maxes[i];
  stores[storeKeys[i]].avgPerCustomer = averages[i];
  stores[storeKeys[i]].cusPerHour = function () {
    return Math.floor(Math.random() * (this.maxPerHour - this.minPerHour) + this.maxPerHour);
  },
  stores[storeKeys[i]].cookiesPerHour = function () {
    return this.cusPerHour * this.avgPerCustomer;
  },
  stores[storeKeys[i]].dailySales = {
    six: '',
  }
}
