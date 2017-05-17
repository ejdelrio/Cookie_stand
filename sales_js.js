'use strict';
//array of minimums sales in order of locations
// var mins = [23, 3, 11, 20, 2];
// var maxes = [64, 28, 38, 38, 16];
// var averages = [6.3, 1.2, 3.7, 2.3, 4.6];
var openHour = 6; //var will be used to assign key value pairs, additionally, var will be uesed in for loops for DOM li elements
var closeHour = 21;

var tableBody = document.getElementById('table_body');
var form = document.getElementById('Store Entry');
//Array of average sales per customer in order
//object called cookieStores contains a list of cookieStores with their location as the key for each location

function Store (storeLocation, minimum, maximum, averages) {
  //Store constructor that creates new store Objects
  this.storeLocation = storeLocation;
  this.minPerHour = minimum;//Assigns minPerHour key to corresponding value.
  this.maxPerHour = maximum; //Assigns mxnPerHour key to corresponding value
  this.avgPerCustomer = averages; //Assigns avgPerCustomer key to corresponding value
  this.opening = openHour; //Assigns each location an opening time
  this.closing = closeHour; //Assigns each location a closing time
  this.dailySales = ['<td>' + storeLocation + '</td>'];//Empty array that hold hourly sales
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
  //Generates 14 random numbers to append to dailySales
  var total = 0;//Counter that becomes total of hourly sales
  for (var n = 0; n < (this.closing - this.opening); n++) {
    var hourlySales = Math.floor(this.cookiesPerHour());
    total += hourlySales;
    this.dailySales.push('<td>' + hourlySales + '</td>');
  }
  this.dailySales.push('<td>' + total + '</td>');
};

Store.prototype.render = function () {
  var storeRow = document.createElement('tr');
  storeRow.innerHTML = this.dailySales.join('');
  tableBody.appendChild(storeRow);
};

function createStore(e) {
  e.preventDefault();

  var name = event.target.store_location.value;
  var minimum = parseInt(event.target.min_customer.value);
  var maximum = parseInt(event.target.max_customer.value);
  var avg = parseInt(event.target.avg_sales.value);

  var tempStore = new Store(name, minimum, maximum, avg);

  tempStore.salesGen();
  tempStore.render();

  form.reset();
}

form.addEventListener('submit', createStore);
