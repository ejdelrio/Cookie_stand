'use strict';
//array of minimums sales in order of locations
var openHour = 6; //var will be used to assign key value pairs, additionally, var will be uesed in for loops for DOM li elements
var closeHour = 21;
var mins = [23, 3, 11, 20, 2];
//array of max sales in order of locations
var maxes = [64, 28, 38, 38, 16];
//Array of average sales per customer in order
var averages = [6.3, 1.2, 3.7, 2.3, 4.6];
//object called stores contains a list of stores with their location as the key for each location
var stores = {
  firstAndPike : '',
  seaTacAirport: '',
  seattleCenter: '',
  capitalHill: '',
  alki: '',
};

function StoreGen (minimum, maximum, averages) {
  //Assigns each store location to an write/read variable
  this.minPerHour = minimum;//Assigns minPerHour key to corresponding value.
  this.maxPerHour = maximum; //Assigns mxnPerHour key to corresponding value
  this.avgPerCustomer = averages; //Assigns avgPerCustomer key to corresponding value
  this.opening = openHour; //Assigns each location an opening time
  this.closing = closeHour; //Assigns each location a closing time
  this.cusPerHour = function () {
    //generates a random number that is between the minPerHour and maxPerHour
    return Math.floor(Math.random() * (this.maxPerHour - this.minPerHour) + this.minPerHour);
  },
  this.cookiesPerHour = function () {
    return this.cusPerHour() * this.avgPerCustomer;
  },
  this.dailySales = [],//Empty array that hold hourly sales
  this.salesGen = function () {
    //Generates 14 random numbers to append to dailySales
    var total = 0;//Counter that becomes total of hourly sales
    for (var n = 0; n < (this.closing - this.opening) + 1; n++) {
      var hourlySales = Math.floor(this.cookiesPerHour());
      this.dailySales.push(hourlySales);
      total += hourlySales;
    }
    this.dailySales.push(total);//Pushes total to the end of the array
  },
  //Creates a week object that will house each daily sales array
  this.weeklySales = {
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: ''
  },
  this.weeklyGen = function () {
    //runs dailySales function 7 times and defines each array one as a weeklySales value
    for (var key in this.weeklySales) {
      this.salesGen();
      this.weeklySales[key] = (this.dailySales);
      this.dailySales = [];
    }
  };
  this.weeklyGen();
}

var storeKeys = Object.keys(stores);
for (var i = 0; i < storeKeys.length; i++) {
  stores[storeKeys[i]] = new StoreGen(mins[i], maxes[i], averages[i]);
}


function postSales() {
  //Sort through stores Objectes and creates sorted DOM elements for each
  //location, day and hour with corresponding sales
  for (var keys in stores) {
    //creates a div that will house each list of days and hours
    var storeDiv = document.createElement('div');
    //title will hold the store name and display it at the top of the div
    var title = document.createElement('h1');
    title.innerHTML = keys;
    storeDiv.appendChild(title);


    for (var days in stores[keys].weeklySales) {
      //h2 will hold each indiviual day. Week object for each lement is accessed and each day key is iterated through.
      var dayTitle = document.createElement('h2');
      dayTitle.innerHTML = days;
      storeDiv.appendChild(dayTitle);
      var week = stores[keys].weeklySales;
      var listStart = document.createElement('ul');
      listStart.style.outline = '1px solid black';

      for (i = 0; i < (closeHour - openHour) + 1; i++) {
        var listInner = document.createElement('li');
        if (i < 7) {
          listInner.innerHTML = (i + 6) + 'am: ' + week[days][i];
        } else if (i >= 7 && i <= (closeHour - openHour)-1) {
          listInner.innerHTML = (i - 6) + 'pm: ' + week[days][i];
        } else {
          listInner.innerHTML = 'Total: ' + week[days][i +1];
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
    document.getElementsByTagName('div')[i].style.width = '350px';
  }
}


postSales();
