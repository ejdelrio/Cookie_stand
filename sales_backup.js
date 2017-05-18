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
  this.dailySales = [];//Empty array that hold hourly sales
  //Creates a week object that will house each daily sales array
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
    total += hourlySales;
    var dataCell = document.createElement('td');
    dataCell.innerHTML = hourlySales;
    this.dailySales.push(dataCell);
  }
  var totalCell = document.createElement('td');
  totalCell.innerHTML = total;
  this.dailySales.push(totalCell);
};

//Creates array of cookieStores keys
var storeKeys = Object.keys(cookieStores);

//Loops through keys and plugs them into cookieStores with corresponding values of mins, maxes and averages
for (var i = 0; i < storeKeys.length; i++) {
  cookieStores[storeKeys[i]] = new Store(mins[i], maxes[i], averages[i]);
  cookieStores[storeKeys[i]].salesGen(); //Calls weeklyGen to populate daily and hourly sales arrays
}

var tableRows = [];
function tableGen() {
  var salesHeader = document.createElement('h1');
  var container = document.createElement('div');
  salesHeader.innerHTML = 'Daily Sales';
  container.appendChild(salesHeader);
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
    tableRows.push(locationRow);

    var locCell = document.createElement('td');
    locationRow.appendChild(locCell);
    locCell.innerHTML = storeKeys[n];
  }
  locCell.innerHTML = 'Total:';
}

tableGen();

Store.prototype.render = function (index) {
  //function that recives a specific row index and appends daily sales td elements to tr
  for (var i = 0; i < this.dailySales.length; i++) {
    tableRows[index].appendChild(this.dailySales[i]);
  }
};

//Iterates through each table row and calls object method to append sales
for (i = 0; i < tableRows.length - 1; i++) {
  cookieStores[storeKeys[i]].render(i);
}


for (i = 0; i < cookieStores.firstAndPike.dailySales.length; i++) {
  var hourTotal = 0;
  for (var n = 0; n < storeKeys.length; n++) {
    hourTotal += parseInt(cookieStores[storeKeys[n]].dailySales[i].innerHTML);
  }
  var totalCol = document.createElement('td');
  totalCol.innerHTML = hourTotal;
  tableRows[tableRows.length - 1].appendChild(totalCol);
}
