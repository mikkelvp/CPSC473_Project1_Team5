/*

Single page ajax & jquery
http://tutorialzine.com/2009/09/simple-ajax-website-jquery/


*/

var main = function () {

  $('#questionForm button').click(function() {
    // create JSON string by pulling from HTML DOM objects
    var jsonString = "";
    
    
    
    // parse JSON string to JSON object
    
  });

  //checkPage();
  
  $("a").click(function(e) {
  //$(".navbar-brand").click(function(e) {
    console.log("click");
    //checkPage(this.hash);
    //$("main").load("test.html", function() {});
    
    /*
    $.ajax({
      url: "test.html", dataType: "html"
    }).done(function(responseHtml) {
      $("#main").html(responseHtml);
    });
    */
    
  });

};

var prevUrl = "";

$(document).ready(main);

function checkPage(hash) {
// checks for hash url that will load content portion of page

  if (!hash) {
    hash = window.location.hash;
  }
  
  if (hash != prevUrl) {
    prevUrl = window.location.hash;
    loadPage(hash);
  }

}

function loadPage(hash) {
// loads content on the page

  //$("main").load("test.html", function() {});

}