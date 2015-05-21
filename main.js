// 'use strict';

$(document).ready(init);

function init(){
  $('#get-quote').click(getQuote);
}
var symbol = $("#symbol").val();
// var symbol = 'AAPL';
var bal = 1000000;
$("#bal").html('initial balance: ' + bal);


var shares = $("#shares")[0];

var total = 0;
var results = {};
function getQuote(){
  var symbol = $('#symbol').val().toUpperCase();
  var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + symbol + '&callback=?';
  $.getJSON(url, function(response){
    $('#quote').text(JSON.stringify(response));
    // console.log(response);

    shares = $("#shares").val();
    total = shares * response.LastPrice;
    // console.log('total: ', total);
    results.price = response.LastPrice;
    results.shares = shares;
    results.total = total.toFixed(2);
    // $("#price").html(response.LastPrice);
    // $("#numShares").html( shares);
    // $("#total").html( total.toFixed(2));
    $("tbody").append('<tr><td>  ' + results.price + '</td><td>'+ results.shares + '</td><td> ' + results.total + '</td></tr>');


    bal = bal - total;
    $("#bal").html('current balance: $' + bal.toFixed(2));

    return results;
  });

  $("button").click(getQuote);
}
