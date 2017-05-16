'use strict';
//array of minimums sales in order of locations
var openHour = 6; //var will be used to assign key value pairs, additionally, var will be uesed in for loops for DOM li elements
var closeHour = 21;
var mins = [23, 3, 11, 20, 2];
//array of max sales in order of locations
var maxes = [64, 28, 38, 38, 16];
//Array of average sales per customer in order
var averages = [6.3, 1.2, 3.7, 2.3, 4.6];
//object called cookieStores contains a list of cookieStores with their location as the key for each location
var cookieStores = {
  firstAndPike : '',
  seaTacAirport: '',
  seattleCenter: '',
  capitalHill: '',
  alki: '',
};

function Store (minimum, maximum, averages) {
  //Store constructor that creates new store Objects
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
//Creates array of cookieStores keys
var storeKeys = Object.keys(cookieStores);
//Loops through keys and plugs them into cookieStores with corresponding values of mins, maxes and averages
for (var i = 0; i < storeKeys.length; i++) {
  cookieStores[storeKeys[i]] = new Store(mins[i], maxes[i], averages[i]);
  cookieStores[storeKeys[i]].weeklyGen(); //Calls weeklyGen to populate daily and hourly sales arrays
}

function tableGen(cookieKey) {
  var container = document.createElement('div');
  var title = document.createElement('h1');
  title.innerHTML = cookieKey;
  container.appendChild(title);
  for (var day in cookieStores[cookieKey].weeklySales) {
    var dayTitle = document.createElement('h2');
    dayTitle.innerHTML = day;
    container.appendChild(dayTitle);
    var salesTable = document.createElement('table');
    var tableHead = document.createElement('thead')
  }




}


/*      for (i = 0; i < (closeHour - openHour) + 1; i++) {
        var listInner = document.createElement('tr');
        if (i < 7) {
          listInner.innerHTML = (i + 6) + 'am: ' + week[days][i];
        } else if (i >= 7 && i <= (closeHour - openHour)-1) {
          listInner.innerHTML = (i - 6) + 'pm: ' + week[days][i];
        } else {
          listInner.innerHTML = 'Total: ' + week[days][i +1];
        }
        listStart.appendChild(listInner);*/
