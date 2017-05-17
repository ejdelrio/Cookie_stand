'use strict';
//array of minimums sales in order of locations
var openHour = 6; //var will be used to assign key value pairs, additionally, var will be uesed in for loops for DOM li elements
var closeHour = 21;
var mins = [23, 3, 11, 20, 2];
var tableBody = document.getElementById('table_body');
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

function Week () {
  this.monday = [];
  this.tuesday = [];
  this.wednesday= [];
  this. thursday = [];
  this.friday = [];
  this.saturday = [];
  this.sunday = [];
}

function Store (minimum, maximum, averages) {
  //Store constructor that creates new store Objects
  this.minPerHour = minimum;//Assigns minPerHour key to corresponding value.
  this.maxPerHour = maximum; //Assigns mxnPerHour key to corresponding value
  this.avgPerCustomer = averages; //Assigns avgPerCustomer key to corresponding value
  this.opening = openHour; //Assigns each location an opening time
  this.closing = closeHour; //Assigns each location a closing time
  this.dailySales = [],//Empty array that hold hourly sales
  //Creates a week object that will house each daily sales array
  this.weeklySales = new Week();
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
  for (var n = 0; n < (this.closing - this.opening); n++) {
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
    this.weeklySales[day] = this.dailySales;
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

var days = Object.keys(cookieStores.firstAndPike.weeklySales);
var tableDays = [];

function tableGen() {
  //Generates an empty table that store data can be appended to.
  for (var i = 0; i < days.length; i++) {
    //creates div with h1 header for each day
    var dayTitle = document.createElement('h1');
    var container = document.createElement('div');
    dayTitle.innerHTML = days[i];
    container.appendChild(dayTitle);
    //initial table declaration
    var mainTable = document.createElement('table');
    container.appendChild(mainTable);
    //Empty table header
    var tableHeader = document.createElement('thead');
    mainTable.appendChild(tableHeader);

    var tableBody = document.createElement('tbody');
    mainTable.appendChild(tableBody);

    var hourRow = document.createElement('tr');
    tableBody.appendChild(hourRow);
    //Blank cell to fill top right corner
    var blankCell = document.createElement('td');
    hourRow.appendChild(blankCell);
    document.body.appendChild(container);
    for (var n = 0; n < (closeHour - openHour) + 1; n++) {
      var tableTime = document.createElement('td');
      if (n < 7) {
        tableTime.innerHTML = (n + 6) + 'am: ';
      } else if (n >= 7 && n <= (closeHour - openHour)-1) {
        tableTime.innerHTML = (n - 6) + 'pm: ';
      } else {
        tableTime.innerHTML = 'Total: ';
      }
      hourRow.appendChild(tableTime);
    }
    for (n =0 ; n < storeKeys.length + 1; n++) {
      var locationRow = document.createElement('tr');
      tableBody.appendChild(locationRow);
      tableDays.push(locationRow);

      var locCell = document.createElement('td');
      locationRow.appendChild(locCell);
      locCell.innerHTML = storeKeys[n];
    }
    locCell.innerHTML = 'Total:';
  }
}
tableGen();

Store.prototype.render = function (target, day) {
  //Method that recieves a specific table day and row. Populates it with
  // this.weeklySales matching day
  var counter = 0; //Counter to accumilate the total

  for (var i = 0; i < this.weeklySales[day].length - 1; i++) {
    var hourCell = document.createElement('td');
    hourCell.innerHTML = this.weeklySales[day][i];
    target.appendChild(hourCell);
    counter += this.weeklySales[day][i];
  }
  var totalCell = document.createElement('td');
  totalCell.innerHTML = counter;
  target.appendChild(totalCell);
};

//Loops through table rows. If table row name is the same as location,
//Days are looped through and arrays are pushed into each row with a matching name
for (i = 0; i < tableDays.length; i++) {
  for (var n = 0; n < storeKeys.length; n++){
    var dayCounter = 0;
    if (tableDays[i].firstChild.innerHTML === storeKeys[n] & dayCounter != 7) {
      cookieStores[storeKeys[n]].render(tableDays[i], days[dayCounter]);
      dayCounter += 1;
    }
  }
}
