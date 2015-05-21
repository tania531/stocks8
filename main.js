// 'use strict';

var bal = 1000000;
var grandTotal = 0;
var sharesTotal = 0;
$(document).ready(init);

function init(){
  $('#get-quote').click(getQuote);
}

function getQuote(){
  var symbol = $('#symbol').val().toUpperCase();
  var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + symbol + '&callback=?';
  $.getJSON(url, function(response){
    var results = {};
    var shares = $("#shares").val();
    shares = parseInt(shares);
    var total = shares * response.LastPrice;

    $("tbody").append('<tr><td>  ' + response.LastPrice + '</td><td>'+ shares + '</td><td> ' + total.toFixed(2) + '</td></tr>');
    sharesTotal += shares;
    grandTotal += total;
    bal -= total;

    $("#sharesTotal").html(sharesTotal);
    $("#grandTotal").html(grandTotal);
    $("#bal").html('current balance: $' + bal.toFixed(2));
  });
}
