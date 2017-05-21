'use strict';
//array of minimums sales in order of locations
var mins = [23, 3, 11, 20, 2];
var maxes = [64, 28, 38, 38, 16];
var averages = [6.3, 1.2, 3.7, 2.3, 4.6];
var names = ['First and Pike', 'Seatac Airport', 'Seattle Center', 'Capital Hill', 'Alki'];
var openHour = 6; //var will be used to assign key value pairs, additionally, var will be uesed in for loops for DOM li elements
var closeHour = 21;
var packedStores = [];

//Test array collects hourly totals per index and a daily total as the last index for our
//total row
var hourlyTotals = ['<td>Total:</td>'];
for (var i = 0; i < (closeHour - openHour) + 1; i++) {
  hourlyTotals.push(0);
}

var masterTable = document.getElementById('table_head');
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
  masterTable.lastChild.appendChild(storeRow);
  packedStores.push(this);
};

function dropDownTime(newEntry, value, menuName) {
  //Takes 3 arguements, item to be entered as a dropdown options, it's value, and which dropdown it will be assigned to
  //Assigns var dropMenu to element with matchion menuName name
  var dropMenu = document.getElementsByName(menuName)[0];
  //Creates new option to append do dropMenu
  var menuItem = document.createElement('option');
  //Assigns value parameter to menuItem element
  menuItem.value = value;
  menuItem.innerHTML = newEntry;
  dropMenu.appendChild(menuItem);
}

function headGen() {
  //Generates a table head that is variable and based off of opening and closing time
  var headArray = ['<td>Locations</td>'];
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
  return tHead;
}

function formTable() {
  masterTable.appendChild(headGen());
  masterTable.appendChild(tableBody);
}


function alreadyExist() {
  //Generates predefined objects with array data
  for (var i = 0; i < names.length; i++) {
    var tempName = new Store(names[i], mins[i], maxes[i], averages[i]);
    tempName.salesGen();
    tempName.render();
    dropDownTime(tempName.storeLocation, packedStores.length - 1, 'location');

  }
}


function totalGen () {
  //uses hourlyTotals array to create a row of totals that is appended to table
  var totalArray = [hourlyTotals[0]];
  var totalRow = document.createElement('tr');
  for (var i = 1; i < hourlyTotals.length; i++){
    totalArray.push('<td>' + hourlyTotals[i] + '</td>');
  }
  totalRow.innerHTML = totalArray.join('');
  masterTable.lastChild.appendChild(totalRow);
  packageStore();
}

function packageStore () {
  //Retrieves session specific information and stores it as strings in sessionStorage Object
  var tableString = masterTable.innerHTML;
  sessionStorage.setItem('table', tableString);
  sessionStorage.setItem('allStores', JSON.stringify(packedStores));
  sessionStorage.setItem('totals', JSON.stringify(hourlyTotals));
}

function unpackStore () {
  // Re-assigns default variables with storageSession Objectsvariables
  masterTable.innerHTML = sessionStorage['table'];
  packedStores = JSON.parse(sessionStorage.allStores);
  hourlyTotals = JSON.parse(sessionStorage.totals);
  // Repopulates dropdown menu options
  for (var i = 0; i < packedStores.length; i++) {
    dropDownTime(packedStores[i].storeLocation, i, 'location');
  }
  for (i = 0; i < (closeHour - openHour); i++) {
    if (i + openHour <= 12) {
      dropDownTime((i + openHour)  + ' am', i+ 1, 'time');
    } else {
      dropDownTime((i - openHour)  + ' pm', i+ 1, 'time');
    }
  }
}


function restoreSession () {
  //Checkes to see if previous data has benn stored in sessionStorage
  if(sessionStorage.length === 0) {
    //If true, creates table, populates with precreated Store objects and generates a row with totals
    formTable();
    alreadyExist();
    totalGen();
  } else {
    //If false, retrieves old table, old store objects and populates dropdowns with previous options
    unpackStore();
  }
}

restoreSession();




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
  masterTable.lastChild.deleteRow(packedStores.length);
  //Calles object method to populate daily sales arrays
  tempStore.salesGen();
  //calls render method to append td elements to table
  tempStore.render();
  dropDownTime(tempStore.storeLocation, packedStores.length - 1, 'location');
  //recreates total row with new values added
  totalGen();
  form.reset();//Resets form input fields
}

function changeCell(e) {
  e.preventDefault();
  //Messy but functional :D
  //Recieves selected row and column, then takes text input and inserts innerHTML
  //Updates hourlyTotal array at selected column and the final value of hourlyTotals
  var colValue = parseInt(event.target.location.value);
  var rowValue = parseInt(event.target.time.value); //value of time dropdown menu
  var newCell = parseInt(event.target.new_value.value); //text input value
  var targetTD = masterTable.lastChild.childNodes[colValue].childNodes[rowValue];
  var oldValue = parseInt(targetTD.innerHTML);
  var total = parseInt(masterTable.lastChild.childNodes[colValue].lastChild.innerHTML);


  total += newCell - oldValue; //subtracts current value from total value and adds new value from input field
  masterTable.lastChild.childNodes[colValue].lastChild.innerHTML = total;
  targetTD.innerHTML = newCell;

  hourlyTotals[rowValue] += newCell - oldValue; //updates relative index of hourlyTotals array
  hourlyTotals[hourlyTotals.length -1] += newCell - oldValue; //updates final index of hourlyTotals with new totals
  //deletes total row and recreates it with new totals using totalGen().
  masterTable.lastChild.deleteRow(packedStores.length);
  totalGen();
  //console.log(hourlyTotals[colValue]);
  //console.log(newCell);
  cellForm.reset();
}
//Add's event listener to form that runs createStore function
form.addEventListener('submit', createStore);
cellForm.addEventListener('submit', changeCell);
