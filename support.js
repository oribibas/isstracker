
var userLocation = document.getElementById("userlocation");
var issLocation = document.getElementById("isslocation");
var distance = document.getElementById("distance");
var element = document.getElementById("myButton");

var user_latitude;
var user_longitude;
var iss_latitude;
var iss_longitude;

var ISSURL = 'http://api.open-notify.org/iss-now.json';

function getLocation(){

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        userLocation.innerHTML = "Geolocation has failed. Please check your your location settings.";
    }
}

function showPosition(position){

    userLocation.innerHTML = "<b>CURRENT LOCATION COORDINATES:</b><br><br>Latitude:    " + position.coords.latitude + "<br>Longitude:    " + position.coords.longitude;
    user_latitude = position.coords.latitude;
    user_longitude = position.coords.longitude;

    getSpaceStationLocation();
}

function getSpaceStationLocation(){
    $.getJSON(ISSURL, function(data){

        iss_latitude = data.iss_position.latitude;
        iss_longitude = data.iss_position.longitude;

        issLocation.innerHTML = "<b>SPACE STATION COORDINATES:</b><br><br>Latitude:    " + iss_latitude + "<br>Longitude:    " + iss_longitude;
        calculateDistance(user_latitude, user_longitude, iss_latitude, iss_longitude);
    });
}

if(element){
    element.addEventListener("click", function(){
        getLocation();
    });
}

// lat1 = user_latitude, lat2 = iss_latitude, lon1 = user_longitude, lot2 = iss_longitude
// Haversine formula computes the distance between two pairs of geocoordinates on a sphere.

function degree2radians(deg){
    return deg * (Math.PI/180);
}

function square(num){
    return Math.pow(num, 2);
}

function calculateDistance(lat1, lon1, lat2, lon2){

    var radius = 6378; // radius of earth in km
    var diffLat = degree2radians(lat2 - lat1);
    var diffLon = degree2radians(lon2 - lon1);
    var lat1 = degree2radians(lat1);
    var lat2 = degree2radians(lat2);

    var a = Math.sin(diffLat/2) * Math.sin(diffLat/2) +
    Math.sin(diffLon/2) * Math.sin(diffLon/2) * Math.cos(lat1) *
    Math.cos(lat2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var disKm = radius * c;
    var disMi = disKm * 0.621371;

    distance.innerHTML = "<b>DISTANCE:</b><br><br>KILOMETERS:    " + disKm.toLocaleString() + " KM<br>MILES:    " + disMi.toLocaleString() + " MI";

}
