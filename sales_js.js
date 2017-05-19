'use strict';
//array of minimums sales in order of locations
var mins = [23, 3, 11, 20, 2];
var maxes = [64, 28, 38, 38, 16];
var averages = [6.3, 1.2, 3.7, 2.3, 4.6];
var names = ['First and Pike', 'Seatac Airport', 'Seattle Center', 'Capital Hill', 'Alki'];
var openHour = 6; //var will be used to assign key value pairs, additionally, var will be uesed in for loops for DOM li elements
var closeHour = 21;
var objectCounter = 0;
//Test array collects hourly totals per index and a daily total as the last index for our
//total row
var hourlyTotals = ['<td>Total:</td>'];
for (var i = 0; i < (closeHour - openHour) + 1; i++) {
  hourlyTotals.push(0);
}

var tableBody = document.createElement('tbody');
var form = document.getElementById('store_entry');
var cellForm = document.getElementById('cell_select');

function Store (storeLocation, minimum, maximum, averages) {
  //Store constructor that creates new store Objects
  this.storeLocation = storeLocation;
  this.minPerHour = minimum;//Assigns minPerHour key to corresponding value.
  this.maxPerHour = maximum; //Assigns mxnPerHour key to corresponding value
  this.avgPerCustomer = averages; //Assigns avgPerCustomer key to corresponding value
  this.opening = openHour; //Assigns each location an opening time
  this.closing = closeHour; //Assigns each location a closing time
  this.dailySales = ['<td>' + storeLocation + '</td>'];
  //Empty array that hold hourly sales
  //Creates a week object that will house each daily sales array
}


Store.prototype.cusPerHour = function () {
  //generates a random number that is between the minPerHour and maxPerHour
  return Math.floor(Math.random() * (this.maxPerHour - this.minPerHour + 1) + this.minPerHour);
};


Store.prototype.cookiesPerHour = function () {
  return this.cusPerHour() * this.avgPerCustomer;
};

Store.prototype.salesGen = function () {
  //Generates random numbers to append to dailySales, 1 for every hour of operation and a total
  var total = 0;//Counter that becomes total of hourly sales
  for (var n = 0; n < (this.closing - this.opening); n++) {
    var hourlySales = Math.floor(this.cookiesPerHour());
    total += hourlySales;
    hourlyTotals[n + 1] += hourlySales;
    this.dailySales.push('<td>' + hourlySales + '</td>');
  }
  hourlyTotals[closeHour - openHour + 1] += total;
  this.dailySales.push('<td>' + total + '</td>');
};



Store.prototype.render = function () {
  //Functions creates table row and appends joined dailSales array
  //table row is then appended to tableBody
  var storeRow = document.createElement('tr');
  storeRow.innerHTML = this.dailySales.join('');
  tableBody.appendChild(storeRow);
};

function dropDownTime(newEntry, value, menuName) {
  var dropMenu = document.getElementsByName(menuName)[0];
  var menuItem = document.createElement('option');
  menuItem.value = value;
  menuItem.innerHTML = newEntry;
  dropMenu.appendChild(menuItem);
}

function headGen() {
  //Generates a table head that is variable and based off of opening and closing time
  var headArray = ['<td>Locations</td>'];
  var masterTable = document.getElementById('table_head');
  var tHead = document.createElement('thead');

  for (var i = 0; i < (closeHour - openHour); i++) {
    if (i + openHour <= 12) {
      headArray.push('<td>' + (i + openHour)  + ' am</td>');
      dropDownTime((i + openHour)  + ' am', i+ 1, 'time');
    } else {
      headArray.push('<td>' + (i - openHour) + ' pm</td>');
      dropDownTime((i - openHour)  + ' pm', i+ 1, 'time');
    }
  }
  headArray.push('<td>Totals</td>');
  tHead.innerHTML = headArray.join('');
  masterTable.appendChild(tHead);
  masterTable.appendChild(tableBody);
}

headGen();



function alreadyExist() {
  //Generates predefined objects with array data
  for (var i = 0; i < names.length; i++) {
    var tempName = new Store(names[i], mins[i], maxes[i], averages[i]);
    tempName.salesGen();
    tempName.render();
    dropDownTime(tempName.storeLocation, objectCounter, 'location');
    objectCounter+= 1;
  }
}

alreadyExist();

function totalGen () {
  //uses hourlyTotals to create a row of totals that is appended to table
  var totalArray = [hourlyTotals[0]];
  var totalRow = document.createElement('tr');
  for (var i = 1; i < hourlyTotals.length; i++){
    totalArray.push('<td>' + hourlyTotals[i] + '</td>');
  }
  totalRow.innerHTML = totalArray.join('');
  tableBody.appendChild(totalRow);
}
totalGen();



function createStore(e) {
  //prevents submit page from triggering html page reload
  e.preventDefault();
  //assigns user inputs to corresponding variables
  var name = event.target.store_location.value;
  var minimum = parseInt(event.target.min_customer.value);
  var maximum = parseInt(event.target.max_customer.value);
  var avg = parseInt(event.target.avg_sales.value);
  //plugs variables into object constructor and temporary object
  var tempStore = new Store(name, minimum, maximum, avg);
  //Deletes total row from table
  var rowLength = document.getElementsByTagName('tr').length;
  tableBody.deleteRow(rowLength - 2);
  //Calles object method to populate daily sales arrays
  tempStore.salesGen();
  //calls render method to append td elements to table
  tempStore.render();
  dropDownTime(tempStore.storeLocation, objectCounter, 'location');
  objectCounter+= 1;
  //recreates total row with new values added
  totalGen();
  form.reset();//Resets form input fields
}

function changeCell(e) {
  e.preventDefault();
  //Messy but functional :D
  //Recieves selected row and column, then takes text input and inserts innerHTML
  //Updates hourlyTotal array at selected column and the final value of hourlyTotals
  var colValue = event.target.time.value; //value of time dropdown menu
  var newCell = parseInt(event.target.new_value.value); //text input value
  var selectedRow = tableBody.getElementsByTagName('tr')[event.target.location.value]; //selects table row using value of locations selector
  var selectedCol = selectedRow.getElementsByTagName('td'); //selects specific cell in tr using the colValue as the index
  var total = selectedCol[selectedCol.length - 1].innerHTML; //Assigns final td of selected row to var total
  var oldValue = parseInt(selectedCol[colValue].innerHTML);//Assigns current td innerHTML to var oldValue.
  total += newCell - oldValue; //subtracts current value from total value and adds new value from input field
  selectedCol[selectedCol.length - 1].innerHTML = total;
  selectedCol[colValue].innerHTML = newCell;
  var rowLength = document.getElementsByTagName('tr').length;
  tableBody.deleteRow(rowLength - 2);
  hourlyTotals[colValue] += newCell - oldValue;
  hourlyTotals[hourlyTotals.length-1] += newCell - oldValue;
  totalGen();
  //console.log(hourlyTotals[colValue]);
  //console.log(newCell);
  cellForm.reset();
}
//Add's event listener to form that runs createStore function
form.addEventListener('submit', createStore);
cellForm.addEventListener('submit', changeCell);
