// MODEL: Setting up the fav places
var mcCawleys, starbucksCoco, dreamGym, yongHeDaWang, mujiRetail;

mcCawleys = {
  title: "McCawley's, Shenzhen",
  id: "mccawleys",
  coords: [22.5349443, 114.0532382]
};

dreamGym = {
  title: "Dream Fitness, Shenzhen",
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

var initialPlaces = [mcCawleys, dreamGym, starbucksCoco, yongHeDaWang, mujiRetail];

// Google Maps Implementation
// Declare a global map variable
var map;
var markers;
var markers_R = [];

var Place = function(data) {
  this.title = ko.observable(data.title);
  this.id = ko.observable(data.id);
  this.coords = ko.observableArray(data.coords);
  this.queryTerm  = ko.computed(function() {
    return this.title().split(", ")[0];
  }, this);

  this.address = ko.observableArray(); // From Foursquare API
  this.formattedAddress = ko.computed(function() {
      var result = "";

      for (var i = 0; i < this.address().length; ++i) {
        result = result + this.address()[i] + "<br/>";
      }
      return result;
  }, this);
  this.phone = ko.observable(); // From Foursquare API
  this.url = ko.observable(); // From Foursquare API

  this.marker; // From Google Maps API
  this.infoWindowContent = ko.computed(function() {
      var add, phone, url;

      if (Boolean(this.formattedAddress())) {
          add = this.formattedAddress();
      }

      else {
          add = "";
      }

      if (Boolean(this.phone())) {
          phone = this.phone();
      }

      else {
          phone = "";
      }

      if (Boolean(this.url())) {
          url = this.url();
      }

      else {
          url = "";
      }

    return '<h2 class="firstHeading">' + this.title() + '</h2>' +
          '<h4>' + add + '</h4>' +
          '<h4>' + phone + '</h4>' +
          '<h4>' + url + '</h4>';
  }, this);
};

var ViewModel = function() {
  var self = this;

  // Make an observableArray of the fav places
  this.favPlaces = ko.observableArray();

  // Populate the FavPlaces with initial data
  initialPlaces.forEach(function(placeItem) {
		self.favPlaces.push(new Place(placeItem));
	});


  // Foursquare API AJAX Section
  //////////////////////////////

  var fourSquareURLQuery = "https://api.foursquare.com/v2/venues/search?client_id=TRNYXMSMSGYF0DXCBPEP1R35GH0FIMVJL3YKHAF5G4LB1AAR&client_secret=RYZNRJUVHDBPOCVDABFNOX5IIGYPOE3ZILRPD1HR2D1BBVS5&v=20160101&ll=22.5345598,114.0518504&query=";

  // Get place data from Foursquare
  for (var i_place = 0; i_place < self.favPlaces().length; ++i_place) {

    var queryTerm  = self.favPlaces()[i_place].queryTerm();

    $.ajax({
      url: fourSquareURLQuery + queryTerm,
      dataType: "json",
      jsonp: false,
      async: false,
      success: function(data) {
        // Getting the phone number
        self.favPlaces()[i_place].phone(data.response.venues[0].contact.formattedPhone);

        // Getting the address lines
        for (var j = 0; j < data.response.venues[0].location.formattedAddress.length; j++) {
            self.favPlaces()[i_place].address.push(data.response.venues[0].location.formattedAddress[j]);
        }

        // Getting the URL
        self.favPlaces()[i_place].url(data.response.venues[0].url);

      }
    })
      .fail(function() {
          self.favPlaces()[i_place].address.push("Sorry! Foursquare is down.");
       });
  }
  ////////////////////////
  // End of Foursquare API

  this.filter = ko.observable();

  this.favPlacesObj_global = {};

  $('#filter').keyup(function() {
    var substring = $('#filter').val();

    var favPlacesObj = {};

    for (var place = 0; place < self.favPlaces().length; place++) {
      var string = self.favPlaces()[place].title();
      if (string.toLowerCase().indexOf(substring.toLowerCase()) === -1) {
        // Hide the item from the list in the DOM
        $('#' + self.favPlaces()[place].id()).addClass('out-of-filter');
        // Remove the marker index of the place
        delete favPlacesObj[self.favPlaces()[place].id()];
      }

      else {
        $('#' + self.favPlaces()[place].id()).removeClass('out-of-filter');
        // Add the marker index of the place
        favPlacesObj[self.favPlaces()[place].id()] = self.favPlaces()[place];
      }
    }
    console.log($('#filter').val());

    if (JSON.stringify(favPlacesObj) !== JSON.stringify(self.favPlacesObj_global)) {
        setMapOnAll(null);
        console.log("markers cleared.");
        self.favPlacesObj_global = favPlacesObj;

        for (var key in favPlacesObj) {
            setMapOnOneMarker(map, markers_R[key]);
            console.log("added once.");
        }
    }
  });

  // Call infoWindow from the Sidebar
  this.callWindow = function(clickedPlace) {

    console.log(clickedPlace);
    for (var i = 0; i < self.favPlaces().length; ++i) {
        console.log(self.favPlaces()[i]);
        self.favPlaces()[i].marker.infoWindow.close();
    }

    clickedPlace.marker.infoWindow.open(map, clickedPlace.marker);
  }

  // Animation when mouseovered/mouseout to/from the item in the Sidebar
  this.activateAnime = function(hoveredPlace) {
      console.log('hi');
      console.log(hoveredPlace);
      hoveredPlace.marker.setAnimation(google.maps.Animation.BOUNCE);
  };

  this.deactivateAnime = function(hoveredPlace) {
      hoveredPlace.marker.setAnimation(null);
  };
};

// Instantiate ViewModel

var myVM = new ViewModel();
markers = {};

// Google Maps API related
//////////////////////////
// Object version of initialPlaces

myVM.favPlaces().forEach(function(placeItem){
    markers[placeItem.id()] = placeItem;
});

function initMap() {
  console.log("initMap called...");

  // Create a map object and specify the DOM element for display.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 22.5345598, lng: 114.0518504},
    scrollwheel: false,
    zoom: 17
  });

  for (var key in markers) {
    // Get positions of all the fav places
    var position = new google.maps.LatLng(markers[key].coords()[0], markers[key].coords()[1]);

    // Set markers
    markers[key].marker = new google.maps.Marker({
      position: position,
      map: map,
      title: markers[key].title()
    });

    markers[key].marker.addListener('mouseover', (function(copyMarker) {
        return function() {
            copyMarker.setAnimation(google.maps.Animation.BOUNCE);
        };
    })(markers[key].marker));

    markers[key].marker.addListener('mouseout', (function(copyMarker) {
        return function() {
            copyMarker.setAnimation(null);
        };
    })(markers[key].marker));

    markers[key].marker.infoWindowContent = markers[key].infoWindowContent();

    markers[key].marker.infoWindow = new google.maps.InfoWindow({
      content: markers[key].marker.infoWindowContent
    });

    google.maps.event.addListener(markers[key].marker, 'click', (function(copyMarker, copyMarkers) {
      return function() {
          copyMarker.infoWindow.open(map, copyMarker);

      };
  })(markers[key].marker, markers));

    markers_R[key] = markers[key].marker;

  }

  ko.applyBindings(myVM);
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
};

// Sets the map on the wished markers in the array.
function setMapOnOneMarker(map, marker) {
    marker.setMap(map);
}

$('#menu-button').click(function(e) {
  console.log("menu-button working");
  $('#sidebar').toggleClass('open');
  e.stopPropagation();
});

// MISC
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

// // ANIME
//
// function toggleBounce() {
//   if (marker.getAnimation() !== null) {
//     marker.setAnimation(null);
//   } else {
//     marker.setAnimation(google.maps.Animation.BOUNCE);
//   }
// }
