'use strict';

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
var markers_R = {};
var mapReady = false;
var fsCounter;
var fsCcount;

var Place = function(data) {
    this.title = ko.observable(data.title);
    this.id = ko.observable(data.id);
    this.coords = ko.observableArray(data.coords);
    // this.visibility = '';
    this.visibility = ko.computed(function() {
        // return filterInput();
        return;
    }, this);
    this.queryTerm = ko.computed(function() {
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

    // From Google Maps API
    // this.marker;
    this.infoWindowContent = ko.computed(function() {
        var add, phone, url;

        if (Boolean(this.formattedAddress())) {
            add = this.formattedAddress();
        } else {
            add = "";
        }

        if (Boolean(this.phone())) {
            phone = this.phone();
        } else {
            phone = "";
        }

        if (Boolean(this.url())) {
            url = this.url();
        } else {
            url = "";
        }

        return '<h2 class="firstHeading word_wrap">' + this.title() + '</h2>' +
            '<h4 class="word_wrap">' + add + '</h4>' +
            '<h4 class="word_wrap">' + phone + '</h4>' +
            '<h4 class="word_wrap">' + url + '</h4>';
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

    this.getFsContent = ko.observable();

    this.setFsContent = function(clickedPlace) {
        self.getFsContent(clickedPlace.infoWindowContent());
    };

    this.clickEvents = function(clickedPlace) {
        self.setFsContent(clickedPlace);
        self.callWindow(clickedPlace);
    };
    
    // Declare the filterInput observable
    this.filterInput = ko.observable('');

    this.filteredItems = ko.computed(function() {
        var rtrn_arr = [];
        var substring = self.filterInput().toLowerCase();
        self.getFsContent('');


        if (substring === "") {
            self.favPlaces().forEach(function(place) {
                rtrn_arr.push(place);
            });

            if (mapReady === true) {
                setMapOnAll(null);

                rtrn_arr.forEach(function(place) {
                    setMapOnOneMarker(map, markers_R[place.id()]);
                });
            }

            return rtrn_arr;
        }

        else {
            self.favPlaces().forEach(function(place) {
                var string = place.title();
                if (string.toLowerCase().indexOf(substring.toLowerCase()) !== -1) {
                    rtrn_arr.push(place);
                }
            });

            setMapOnAll(null);

            rtrn_arr.forEach(function(place) {
                setMapOnOneMarker(map, markers_R[place.id()]);
            });

            return rtrn_arr;
        }
    }, this);



    this.toggleStatus = ko.observable('close');

    this.toggleBar = function(clickItem) {
        if (self.toggleStatus() === 'close') {
            self.toggleStatus('open');
        }

        else {
            self.toggleStatus('close');
        }
    };


    // Foursquare API AJAX Section
    //////////////////////////////

    var fourSquareURLQuery = "https://api.foursquare.com/v2/venues/search?client_id=TRNYXMSMSGYF0DXCBPEP1R35GH0FIMVJL3YKHAF5G4LB1AAR&client_secret=RYZNRJUVHDBPOCVDABFNOX5IIGYPOE3ZILRPD1HR2D1BBVS5&v=20160101&ll=22.5345598,114.0518504&query=";

    // Get place data from Foursquare
    self.favPlaces().forEach(function(place) {
        //   var queryTerm  = self.favPlaces()[i_place].queryTerm();
        var queryTerm = place.queryTerm();

        $.ajax({
                url: fourSquareURLQuery + queryTerm,
                dataType: "json",
                jsonp: false,
                // async: false,
                success: function(data) {
                    // Getting the phone number
                    //   self.favPlaces()[i_place].phone(data.response.venues[0].contact.formattedPhone);
                    place.phone(data.response.venues[0].contact.formattedPhone);
                    // Getting the address lines
                    for (var j = 0; j < data.response.venues[0].location.formattedAddress.length; j++) {
                        //   self.favPlaces()[i_place].address.push(data.response.venues[0].location.formattedAddress[j]);
                        place.address.push(data.response.venues[0].location.formattedAddress[j]);
                    }

                    // Getting the URL
                    //   self.favPlaces()[i_place].url(data.response.venues[0].url);
                    place.url(data.response.venues[0].url);
                }
            })
            .fail(function() {
                place.address.push("Sorry! Foursquare is down.");
                // self.favPlaces()[i_place].address.push("Sorry! Foursquare is down.");
            });
    });
    ////////////////////////
    // End of Foursquare API

    // The Filter (Old)
    // this.filter = ko.observable();
    //
    // this.favPlacesObj_global = {};
    //
    // $('#filter').keyup(function() {
    //     var substring = $('#filter').val();
    //
    //     var favPlacesObj = {};
    //
    //     for (var place = 0; place < self.favPlaces().length; place++) {
    //         var string = self.favPlaces()[place].title();
    //         if (string.toLowerCase().indexOf(substring.toLowerCase()) === -1) {
    //             // Hide the item from the list in the DOM
    //             $('#' + self.favPlaces()[place].id()).addClass('out-of-filter');
    //             // Remove the marker index of the place
    //             delete favPlacesObj[self.favPlaces()[place].id()];
    //         } else {
    //             $('#' + self.favPlaces()[place].id()).removeClass('out-of-filter');
    //             // Add the marker index of the place
    //             favPlacesObj[self.favPlaces()[place].id()] = self.favPlaces()[place];
    //         }
    //     }
    //
    //     // if (JSON.stringify(favPlacesObj) !== JSON.stringify(self.favPlacesObj_global))
    //     if (!Object.is(favPlacesObj, self.favPlacesObj_global)) {
    //         setMapOnAll(null);
    //         self.favPlacesObj_global = favPlacesObj;
    //
    //         for (var key in favPlacesObj) {
    //             setMapOnOneMarker(map, markers_R[key]);
    //         }
    //     }
    // });

    // Call infoWindow from the Sidebar
    this.callWindow = function(clickedPlace) {

        for (var i = 0; i < self.favPlaces().length; ++i) {
            self.favPlaces()[i].marker.infoWindow.close();
        }

        clickedPlace.marker.infoWindow.open(map, clickedPlace.marker);
    };

    // Animation when mouseovered/mouseout to/from the item in the Sidebar
    this.activateAnime = function(hoveredPlace) {
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

myVM.favPlaces().forEach(function(placeItem) {
    markers[placeItem.id()] = placeItem;
});

function initMap() {
        // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 22.5345598,
            lng: 114.0518504
        },
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
    mapReady = true;
    ko.applyBindings(myVM);
}

function errorHandling() {
    $('#map').append("<span id='sorry'>Sorry! No Map!</span>");
    $('#sorry').addClass("move_right");
  // this function will be called when the google maps api is failed to load
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var key in markers_R) {
        if (!markers_R.hasOwnProperty(key)) continue;

        var obj = markers_R[key];
        for (var prop in obj) {
            // skip loop if the property is from prototype
            if (!obj.hasOwnProperty(prop)) continue;

            markers_R[key].setMap(map);
        }
    }
}

// Sets the map on the wished markers in the array.
function setMapOnOneMarker(map, marker) {
    marker.setMap(map);
}

// MISC
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
