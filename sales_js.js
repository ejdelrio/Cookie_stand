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



function tableGen() {


  var days = Object.keys(cookieStores.firstAndPike.weeklySales);
  for (var n = 0; n < days.length; n++) {

    var container = document.createElement('div');
    var dayTitle = document.createElement('h1');

    dayTitle.innerHTML = days[n];
    container.appendChild(dayTitle);

    var salesTable = document.createElement('table');
    var tableHead = document.createElement('thead');
    salesTable.appendChild(tableHead);
    var hourRow = document.createElement('tr');
    var blankTd = document.createElement('td');
    blankTd.innerHTML = '';
    hourRow.appendChild(blankTd);

    for (i = 0; i < (closeHour - openHour) + 1; i++) {
      var tableTime = document.createElement('td');
      if (i < 7) {
        tableTime.innerHTML = (i + 6) + 'am: ';
      } else if (i >= 7 && i <= (closeHour - openHour)-1) {
        tableTime.innerHTML = (i - 6) + 'pm: ';
      } else {
        tableTime.innerHTML = 'Total: ';
      }
      hourRow.appendChild(tableTime);
    }


    var tableBody = document.createElement('tableBody');
    tableBody.appendChild(hourRow);


    for (var x = 0; x < storeKeys.length; x ++) {
      var tableRow = document.createElement('tr');
      var nameRow = document.createElement('td');
      nameRow.innerHTML = storeKeys[x];
      tableRow.appendChild(nameRow);


      for (i = 0; i < (closeHour - openHour) + 2; i++) {
        var salesData = document.createElement('td');
        salesData.innerHTML = cookieStores[storeKeys[x]].weeklySales[days[n]][i];
        tableRow.appendChild(salesData);
      }
      tableBody.appendChild(tableRow);
    }
    var totalRow = document.createElement('tr');
    var tableTotal = document.createElement('td');
    tableTotal.innerHTML = 'Total';
    totalRow.appendChild(tableTotal);
    for (i = 0; i < 15; i++) {
      var totalCell = document.createElement('td');
      var totalCounter = 0;
      for (var l = 0; l < storeKeys.length; l++) {
        for (var hour in cookieStores[storeKeys[l]].weeklySales) {
          totalCounter += cookieStores[storeKeys[l]].weeklySales[hour][i];
        }
      }
      totalCell.innerHTML = totalCounter;
      tableRow.appendChild(totalCell);
    }

    tableBody.appendChild(totalRow);


    salesTable.appendChild(tableBody);
    container.appendChild(salesTable);
    document.body.appendChild(container);
  }
}

tableGen();
