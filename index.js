// var request = require('request');
// var cheerio = require('cheerio');
//
// request('http://www.visitseattle.org', function(error, response, data) {
//   var $ = cheerio.load(data);
//
//   var neighborhoods = $('.text-medium-small').map(function(index, element) {
//     return {
//       name: $(element).text(),
//       link: $(element).closest('a').attr('href')
//     };
//   }).get();
//   console.log(neighborhoods);
// });

///////////////////////////////////////////////////////////////////////////////

var async = require('async');
var request = require('request');
// series functions
function fun1(callback) {
  console.log("cl", 1);
  callback(null, 1);
}
function fun2(callback) {
  console.log("cl", 2);
  callback(null, 2);
}
function fun3(callback) {
  console.log("cl", 3);
  callback(null, 3);
}
// series method
// async.series([fun2, fun1, fun3], function(err, results) {
//   console.log("done!");
//   console.log(results); // result data comes back 1, 2, 3
// });

// parallel functions
function fun4(callback) {
  setTimeout(function() {
    console.log('cl', 4);
    callback(null, 4);
  }, 5000);
}
function fun5(callback) {
  setTimeout(function() {
    console.log('cl', 5);
    callback(null, 5);
  }, 1000);
}
function fun6(callback) {
  setTimeout(function() {
    console.log('cl', 6);
    callback(null, 6);
  }, 3000);
}
// parallel method
// async.parallel([fun4, fun5, fun6], function(err, results) {
//   console.log('done!');
//   console.log(results); // result data comes back 4, 5, 6 (order of appearance in the array)
// });

// waterfall functions
function fun7(callback) {
  var initial = 55;
  callback(null, initial);
}
function fun8(num1, callback) {
  num1 += 5;
  callback(null, num1);
}
function fun9(num1, callback) {
  num1 += 40;
  callback(null, num1);
}
// waterfall method
// async.waterfall([fun7, fun8, fun9], function(err, results) {
//   console.log('done!');
//   console.log(results);
// });

// concat functions
var urlsToGet = ['https://www.reddit.com/search.json?q=politics',
                 'https://www.reddit.com/search.json?q=puppies',
                 'https://www.reddit.com/search.json?q=drake'];

var getFirstTitle = function(url, callback) {
  request(url, function(error, response, data) {
    var firstTitle = JSON.parse(data).data.children[0].data.title;
    callback(null, firstTitle);
  })
};

async.concat(urlsToGet, getFirstTitle, function(err, results) {
  console.log(results);
});
