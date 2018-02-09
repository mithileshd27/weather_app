$(document).ready(function() {
  $(".show_weather").hide();
});

function cTof(num){
  return ((num*9)/(5))+32;
}

var targetDate = new Date();
var timestamp = targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60;
var googleMapsTimeZoneAPI = "AIzaSyBwYw369_JsS_swg42YhxAB7RzwZt0hIzc";

var iconURLs = {
  210: "https://image.ibb.co/fLc4BH/25.png",
  211: "https://image.ibb.co/fLc4BH/25.png",
  212: "https://image.ibb.co/fLc4BH/25.png",
  221: "https://image.ibb.co/fLc4BH/25.png",
  200: "https://image.ibb.co/jvp6Qc/16.png",
  201: "https://image.ibb.co/jvp6Qc/16.png",
  202: "https://image.ibb.co/jvp6Qc/16.png",
  230: "https://image.ibb.co/jvp6Qc/16.png",
  231: "https://image.ibb.co/jvp6Qc/16.png",
  232: "https://image.ibb.co/jvp6Qc/16.png",
  300: "https://image.ibb.co/kcdNyx/28.png",
  301: "https://image.ibb.co/kcdNyx/28.png",
  302: "https://image.ibb.co/kcdNyx/28.png",
  310: "https://image.ibb.co/kcdNyx/28.png",
  311: "https://image.ibb.co/kcdNyx/28.png",
  312: "https://image.ibb.co/kcdNyx/28.png",
  313: "https://image.ibb.co/kcdNyx/28.png",
  314: "https://image.ibb.co/kcdNyx/28.png",
  321: "https://image.ibb.co/kcdNyx/28.png",
  500: "https://image.ibb.co/n8sRQc/34.png",
  501: "https://image.ibb.co/n8sRQc/34.png",
  502: "https://image.ibb.co/n8sRQc/34.png",
  503: "https://image.ibb.co/bDTY5c/26.png",
  504: "https://image.ibb.co/bDTY5c/26.png",
  511: "https://image.ibb.co/bDTY5c/26.png",
  520: "https://image.ibb.co/ihkrrH/39.png",
  521: "https://image.ibb.co/ihkrrH/39.png",
  522: "https://image.ibb.co/ihkrrH/39.png",
  531: "https://image.ibb.co/ihkrrH/39.png",
  600: "https://image.ibb.co/cFHt5c/36.png",
  601: "https://image.ibb.co/cFHt5c/36.png",
  602: "https://image.ibb.co/cFHt5c/36.png",
  611: "https://image.ibb.co/cFHt5c/36.png",
  612: "https://image.ibb.co/cFHt5c/36.png",
  615: "https://image.ibb.co/cFHt5c/36.png",
  616: "https://image.ibb.co/cFHt5c/36.png",
  620: "https://image.ibb.co/cFHt5c/36.png",
  621: "https://image.ibb.co/cFHt5c/36.png",
  622: "https://image.ibb.co/cFHt5c/36.png",
  701: "https://image.ibb.co/f7MxWH/30.png",
  711: "https://image.ibb.co/f7MxWH/30.png",
  721: "https://image.ibb.co/f7MxWH/30.png",
  731: "https://image.ibb.co/f7MxWH/30.png",
  741: "https://image.ibb.co/f7MxWH/30.png",
  751: "https://image.ibb.co/f7MxWH/30.png",
  761: "https://image.ibb.co/f7MxWH/30.png",
  762: "https://image.ibb.co/f7MxWH/30.png",
  771: "https://image.ibb.co/f7MxWH/30.png",
  781: "https://image.ibb.co/f7MxWH/30.png",
  800: ["https://image.ibb.co/kBNhyx/33.png","https://image.ibb.co/mutcWH/38.png"],
  801: ["https://image.ibb.co/hygLkc/32.png", "https://image.ibb.co/cSwxWH/night.png"],
  802: ["https://image.ibb.co/hygLkc/32.png", "https://image.ibb.co/cSwxWH/night.png"],
  803: ["https://image.ibb.co/hygLkc/32.png", "https://image.ibb.co/cSwxWH/night.png"],
  804: "https://image.ibb.co/fMEHWH/37.png"
};

if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var myLatitude = position.coords.latitude.toFixed(7);
    var myLongitude = position.coords.longitude.toFixed(7)
    var myWeatherURL = "https://fcc-weather-api.glitch.me/api/current?lat="+myLatitude+"&lon="+myLongitude;
    var tzURL = "https://maps.googleapis.com/maps/api/timezone/json?location="+myLatitude+","+myLongitude+"&timestamp="+timestamp+"&key="+googleMapsTimeZoneAPI;
    var convertButtons = '<button type="button" class="btn btn-primary" id="degC">&#186C</button><button type="button" class="btn btn-primary" id="degF">&#186F</button>'
    var localDate = 0;
    $.getJSON( tzURL, function(json) {
      var offsets = json.dstOffset * 1000 + json.rawOffset * 1000;
      localDate = new Date(timestamp * 1000 + offsets).getHours();
    })
     
    $.getJSON( myWeatherURL, function(json) {
      var locale = JSON.stringify(json.name).slice(1,JSON.stringify(json.name).length - 1 );
      var temp_c = JSON.stringify(json.main.temp);
      var temp_f = cTof(Number(temp_c)).toFixed(2);
      var description = JSON.stringify(json.weather[0].description).slice(1,JSON.stringify(json.weather[0].description).length-1);
      var weatherIconURL = "https://i.imgur.com/XBztLFX.png";
      var weather_main = JSON.stringify(json.weather[0].main).slice(1,JSON.stringify(json.weather[0].main).length-1);
      var weather_id = Number(JSON.stringify(json.weather[0].id));
      var country = JSON.stringify(json.sys.country).slice(1,JSON.stringify(json.sys.country).length-1);
      var whichIcon = '';
      if ( weather_id >= 800 && weather_id <=803 ) {
        if ( localDate > 7 && localDate < 18 ) {
          whichIcon = iconURLs[weather_id][0];
        } else {
          whichIcon = iconURLs[weather_id][1];
        }
      } else {
        whichIcon = iconURLs[weather_id];
      }
      $("#location").html(locale+", "+country);
      $("#weather_icon").html("<img class='small-image center-img' src='"+whichIcon+"' alt='"+description+"'>");
      $("#temperature").html(temp_c + " &#186C");
      $(".center-button").html(convertButtons);
      $("#weather_description").html(description);
      $(".show_weather").fadeIn("slow");
      $("#degC").on("click", function(){
        $("#temperature").html(temp_c + " &#186C");
      });
      $("#degF").on("click", function(){
        $("#temperature").html(temp_f + " &#186F");
      });
      console.log(json);
    });
  });
} else {
  alert("Please allow for the page to access your location for this to work. Thanks and Cheers!!");
}