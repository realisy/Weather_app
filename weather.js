$(document).ready(function() {
  $( "#city" ).autocomplete({
    source: function( request, response ) {
      $.ajax( {
        url: "http://gd.geobytes.com/AutoCompleteCity?callback=?&filter=US&q="+request.term,
        dataType: "jsonp",
        success: function( data ) {
          response( data.length === 1 && data[ 0 ].length === 0 ? [] : data );
        }
      } );
    },
     minLength: 3,
     select: function( event, ui ) {
      console.log( "Selected: " + ui.item.label );
       getWunderground(ui.item.label);
     }
  });
});

function getWunderground(cityfqcn){
   var arr = cityfqcn.split(',')
  //  console.log(arr);
  var city = arr[0];
  var state = arr[1];
  var divRow = "<div class='row'>";
  var divCol2 = "<div class='col-md-2'>";
  var divCol4 = "<div class='col-md-4'>";
  var divCol6 = "<div class='col-md-6'>";
  var divEnd = "</div>";
  $.ajax({
    url : 'http://api.wunderground.com/api/d8ef478c4bd9add8/forecast/q/' + state + '/' + city + '.json' ,
    dataType : "jsonp",
    success : function(parsed_json) {

      console.log(parsed_json);
      $("#results").empty();
      $("#results").append("<hr>")
      for(i=0; i < 8; i++){
        var htmlStr = divRow;

        htmlStr += divCol2;
        htmlStr += parsed_json['forecast']['txt_forecast']['forecastday'][i]['title'];
        htmlStr += divEnd;

        htmlStr += divCol2;
        htmlStr += "<img src ='";
        htmlStr += parsed_json['forecast']['txt_forecast']['forecastday'][i]['icon_url'];
        htmlStr += "'/>";
        htmlStr += divEnd;

        htmlStr += divCol6;
        htmlStr += parsed_json['forecast']['txt_forecast']['forecastday'][i]['fcttext'];
        htmlStr += divEnd;
        htmlStr += divEnd;
        $("#results").append(htmlStr);
      }
    }
  });
 }
