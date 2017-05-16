'use strict';
//array of minimums sales in order of locations
var openHour = 6; //var will be used to assign key value pairs, additionally, var will be uesed in for loops for DOM li elements
var closeHour = 21;
var mins = [23, 3, 11, 20, 2];
//array of max sales in order of locations
var maxes = [64, 28, 38, 38, 16];
//Array of average sales per customer in order
var averages = [6.3, 1.2, 3.7, 2.3, 4.6];
//object called allStores contains a list of allStores with their location as the key for each location
var allStores = {
  firstAndPike : '',
  seaTacAirport: '',
  seattleCenter: '',
  capitalHill: '',
  alki: '',
};

function Store (minimum, maximum, averages) {
  //Assigns each store location to an write/read variable
  this.minPerHour = minimum;//Assigns minPerHour key to corresponding value.
  this.maxPerHour = maximum; //Assigns mxnPerHour key to corresponding value
  this.avgPerCustomer = averages; //Assigns avgPerCustomer key to corresponding value
  this.opening = openHour; //Assigns each location an opening time
  this.closing = closeHour; //Assigns each location a closing time
  this.dailySales = [],//Empty array that hold hourly sales
  //Creates a week object that will house each daily sales array
  this.weeklySales = {
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: ''
  };
}

Store.prototype.cusPerHour = function () {
  //generates a random number that is between the minPerHour and maxPerHour
  return Math.floor(Math.random() * (this.maxPerHour - this.minPerHour) + this.minPerHour);
};

Store.prototype.cookiesPerHour = function () {
  return this.cusPerHour() * this.avgPerCustomer;
};

Store.prototype.salesGen = function () {
  //Generates 14 random numbers to append to dailySales
  var total = 0;//Counter that becomes total of hourly sales
  for (var n = 0; n < (this.closing - this.opening) + 1; n++) {
    var hourlySales = Math.floor(this.cookiesPerHour());
    this.dailySales.push(hourlySales);
    total += hourlySales;
  }
  this.dailySales.push(total);//Pushes total to the end of the array
};

Store.prototype.weeklyGen = function () {
    //runs dailySales function 7 times and defines each array one as a weeklySales value
  for (var day in this.weeklySales) {
    this.salesGen();
    this.weeklySales[day] = (this.dailySales);
    this.dailySales = [];
  }
};



var storeKeys = Object.keys(allStores);
for (var i = 0; i < storeKeys.length; i++) {
  allStores[storeKeys[i]] = new Store(mins[i], maxes[i], averages[i]);
  allStores[storeKeys[i]].weeklyGen();
}


function postSales() {
  //Sort through allStores Objectes and creates sorted DOM elements for each
  //location, day and hour with corresponding sales
  for (var keys in allStores) {
    //creates a div that will house each list of days and hours
    var storeDiv = document.createElement('div');
    //title will hold the store name and display it at the top of the div
    var title = document.createElement('h1');
    title.innerHTML = keys;
    storeDiv.appendChild(title);


    for (var days in allStores[keys].weeklySales) {
      //h2 will hold each indiviual day. Week object for each lement is accessed and each day key is iterated through.
      var dayTitle = document.createElement('h2');
      dayTitle.innerHTML = days;
      storeDiv.appendChild(dayTitle);
      var week = allStores[keys].weeklySales;
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
  for (var i = 0; i < Object.keys(allStores).length; i++) {
    document.getElementsByTagName('div')[i].style.display = 'inline-block';
    document.getElementsByTagName('div')[i].style.outline = '1px solid black';
    document.getElementsByTagName('div')[i].style.width = '350px';
  }
}


postSales();
