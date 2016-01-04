// Setting up the fav places
var mcCawleys, starbucksCoco, dreamGym, yongHeDaWang, mujiRetail;

mcCawleys = {
  title: "McCawley's, Shenzhen",
  id: "mccawleys",
  coords: [22.5349443, 114.0532382]
};

dreamGym = {
  title: "Dream Gym, Shenzhen",
  id: "dreamgym",
  coords: [22.5368787, 114.0526949]
};

starbucksCoco = {
  title: "Starbucks Coffee, Shenzhen",
  id: "starbuckscoco",
  coords: [22.534225, 114.053237]
};

yongHeDaWang = {
  title: "YongHeDaWang Restraunt, Shenzhen",
  id: "yonghedawang",
  coords: [22.53210445, 114.05315946]
};

mujiRetail = {
  title: "MUJI Coco Park, Shenzhen",
  id: "mujiretail",
  coords: [22.53301615, 114.0547527]
};

// var markers = [mcCawleys, starbucksCoco, dreamGym, yongHeDaWang, mujiRetail];
var markers = {
  "mccawleys": mcCawleys,
  "starbuckscoco": starbucksCoco,
  "dreamgym": dreamGym,
  "yonghedawang": yongHeDaWang,
  "mujiretail": mujiRetail
}

// Declare a global map variable
var map;
var markers_R = [];

function initMap() {

  // Declare the boundary of the maps to better fit in the fav places
  // var bounds = new google.maps.LatLngBounds();

  // Create a map object and specify the DOM element for display.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 22.5345598, lng: 114.0518504},
    scrollwheel: false,
    zoom: 17
  });

  // for (i = 0; i < markers.length; i++)
    for (var key in markers) {
    // Get positions of all the fav places

    var position = new google.maps.LatLng(markers[key].coords[0], markers[key].coords[1]);

    // Set markers
    marker = new google.maps.Marker({
      position: position,
      map: map,
      title: markers[key].title
    });

    markers_R[key] = marker;
    console.dir(marker);

    // // Allow each marker to have an info window
    // google.maps.event.addListener(marker, 'click', (function(marker, i) {
    //  return function() {
    //    infoWindow.setContent(infoWindowContent[i][0]);
    //    infoWindow.open(map, marker);
    //  }
    // })(marker, i));

    // Add each position to the bounds
    // bounds.extend(position);

    // Automatically center the map fitting all markers on the screen
    // map.fitBounds(bounds);
  }

  // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
  // var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
  //   this.setZoom(14);
  //   google.maps.event.removeListener(boundsListener);
  // });

  console.log("initMap run successfully.");
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var key in markers_R) {
    if (!markers_R.hasOwnProperty(key)) continue;

    var obj = markers_R[key];
    for (var prop in obj) {
        // skip loop if the property is from prototype
        if(!obj.hasOwnProperty(prop)) continue;

        markers_R[key].setMap(map);
        console.log("SMOA working.");
    }
  }
}

// Sets the map on the wished markers in the array.
function setMapOnOneMarker(map, marker) {
    marker.setMap(map);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

$('#menu-button').click(function(e) {
  console.log("menu-button working");
  $('#sidebar').toggleClass('open');
  e.stopPropagation();
})

var ViewModel = function() {
  var self = this;

  // Make an observableArray of the fav places
  this.favPlaces = ko.observableArray();

  for (var place in markers) {
    this.favPlaces.push(markers[place]);
  }

  this.filter = ko.observable();

  $('#filter').keyup(function() {
    var substring = $('#filter').val();

    var favPlacesObj = {
      // "mccawleys": mcCawleys,
      // "starbuckscoco": starbucksCoco,
      // "dreamgym": dreamGym,
      // "yonghedawang": yongHeDaWang,
      // "mujiretail": mujiRetail
    };

    for (var place = 0; place < self.favPlaces().length; place++) {
      var string = self.favPlaces()[place].title;
      if (string.toLowerCase().indexOf(substring.toLowerCase()) === -1) {
        // Hide the item from the list in the DOM
        $('#' + self.favPlaces()[place].id).addClass('out-of-filter');
        // Remove the marker index of the place
        delete favPlacesObj[self.favPlaces()[place].id];
      }

      else {
        $('#' + self.favPlaces()[place].id).removeClass('out-of-filter');
        // Add the marker index of the place
        favPlacesObj[self.favPlaces()[place].id] = self.favPlaces()[place];
      }
    }
    console.log($('#filter').val());
    console.log(favPlacesObj);
    setMapOnAll(null);
    console.log("markers cleared.");

    for (var key in favPlacesObj) {
        setMapOnOneMarker(map, markers_R[key]);
        console.log("added once.");
    }

  })

	// initialCats.forEach(function(catItem) {
	// 	self.catList.push(new Cat(catItem));
	// });
  //
	// this.currentCat = ko.observable(this.catList()[0]);
  //
	// this.incrementCounter = function() {
	// 	self.currentCat().clickCount(self.currentCat().clickCount() + 1);
	// 	console.log("counter is working");
	// 	console.log(self.currentCat());
	// };
  //
	// this.setCat = function(clickedCat) {
	// 	self.currentCat(clickedCat);
	// };

};

ko.applyBindings(new ViewModel());

// MISC
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
