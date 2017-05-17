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
var tableDays = [[], [], [], [], [], []];


function tableGen() {
  //Generates an empty table that store data can be appended to.
  for (var i = 0; i < days.length; i++) {
    var dayTitle = document.createElement('h1');
    var container = document.createElement('div');
    dayTitle.innerHTML = days[i];
    container.appendChild(dayTitle);

    var mainTable = document.createElement('table');
    container.appendChild(mainTable);

    var tableHeader = document.createElement('thead');
    mainTable.appendChild(tableHeader);

    var tableBody = document.createElement('tbody');
    mainTable.appendChild(tableBody);

    var hourRow = document.createElement('tr');
    tableBody.appendChild(hourRow);

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
      tableDays[n].push(locationRow);

      var locCell = document.createElement('td');
      locationRow.appendChild(locCell);
      locCell.innerHTML = storeKeys[n];
    }
    locCell.innerHTML = 'Total:';
  }
}


tableGen();

Store.prototype.render = function () {
  for (var i = 0; i < days.length; i++) {
    for (var n = 0; n < tableDays.length; n++) {
      var rowObject = tableDays[i][n];
      var dayArray = this.weeklySales[days[i]];
      var totalCounter = 0;
      for (var l = 0; l < dayArray.length; l++) {
        var hourCell = document.createElement('td');
        hourCell.innerHTML = dayArray[l];
        rowObject.appendChild(hourCell);
      }
    }
  }
};


cookieStores.firstAndPike.render();
// function tableGen() {
//   //Function that generates Daily tables for the entire week
//   //Tables have columns with hours and columns with locations
//   // Each cell indicates sales per hour per location
//   var days = Object.keys(cookieStores.firstAndPike.weeklySales);
//   for (var n = 0; n < days.length; n++) {
//     //creates div container for each tableGen
//     //And a title header for the day
//     var container = document.createElement('div');
//     var dayTitle = document.createElement('h1');
//     //Inserts the day title header
//     dayTitle.innerHTML = days[n];
//     container.appendChild(dayTitle);
//     //Creates the initial table and thead
//     var salesTable = document.createElement('table');
//     var tableHead = document.createElement('thead');
//     salesTable.appendChild(tableHead);
//     //creates initial row to house hours and a blank cell to go at the corner
//     var hourRow = document.createElement('tr');
//     var blankTd = document.createElement('td');
//     blankTd.innerHTML = '';
//     hourRow.appendChild(blankTd); //Append blank cell to initial row
//     //Itereates through the difference in hours and appends td element with time values
//     for (i = 0; i < (closeHour - openHour) + 1; i++) {
//       var tableTime = document.createElement('td');
//       if (i < 7) {
//         tableTime.innerHTML = (i + 6) + 'am: ';
//       } else if (i >= 7 && i <= (closeHour - openHour)-1) {
//         tableTime.innerHTML = (i - 6) + 'pm: ';
//       } else {
//         tableTime.innerHTML = 'Total: ';
//       }
//       hourRow.appendChild(tableTime);
//     }
//
//     //Creates the initial body and adds the row of hour headers
//     var tableBody = document.createElement('tableBody');
//     tableBody.appendChild(hourRow);
//
//     //Creates initial rows for location sales. Uses the array of store keys to insert the object names
//     for (var x = 0; x < storeKeys.length; x ++) {
//       var tableRow = document.createElement('tr');
//       var nameRow = document.createElement('td');
//       nameRow.innerHTML = storeKeys[x];
//       tableRow.appendChild(nameRow);
//
//       //Iterates through wekkly->day arrays and inserts the value by hour
//       for (i = 0; i < (closeHour - openHour) + 1; i++) {
//         var salesData = document.createElement('td');
//         salesData.innerHTML = cookieStores[storeKeys[x]].weeklySales[days[n]][i]; //Insert data in td element
//         tableRow.appendChild(salesData);
//       }
//       //Appends row of location sales into table body
//       tableBody.appendChild(tableRow);
//     }
//     var totalRow = document.createElement('tr');
//     var tableTotal = document.createElement('td');
//     tableTotal.innerHTML = 'Total';
//     // Iterates through each locations daily and hourly indexes and appends the sumation of each stores hourly value
//     totalRow.appendChild(tableTotal);
//     var finalTotal = 0;
//     for (i = 0; i < 15; i++) {
//       var totalCell = document.createElement('td');
//       for (var l = 0; l < storeKeys.length; l++) {
//         var totalCounter = 0;
//         for (var hour in cookieStores[storeKeys[l]].weeklySales) {
//           totalCounter += cookieStores[storeKeys[l]].weeklySales[hour][i];
//
//         }
//       }
//       //Increments an external counter to track total sales for the day for all locations
//       finalTotal += totalCounter;
//       totalCell.innerHTML = totalCounter;
//       totalRow.appendChild(totalCell);
//     }
//     var finalCell = document.createElement('td');
//     finalCell.innerHTML = finalTotal;
//     totalRow.appendChild(finalCell);
//     tableBody.appendChild(totalRow);
//
//
//     salesTable.appendChild(tableBody);
//     container.appendChild(salesTable);
//     document.body.appendChild(container);
//   }
// }
//
// tableGen();
