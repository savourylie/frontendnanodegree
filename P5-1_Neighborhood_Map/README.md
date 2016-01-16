# Neighbourhood Map Project
A map that shows you the cool places in your area.

## Installation
Installation is not required. Simply open the index.html with any browser to start using it.

## How it works
Upon opening the app a Google Map will show markers of places around where the developer lives. Click on the markers and more information about the places will be revealed from a pop up infoWindow on the map.

On the side there's a side bar showing the names of the same places. On top of the side bar there's a search field where you can type to see the places of your interest, filtering out other places.

The place names on the side bar are clickable too and the same infoWindows will pop up on the map.

## License
Neighbourhood Map Project is Copyright © from 2016 Calvin Ku. It is free software, and may be redistributed under the terms specified as below:

The MIT License (MIT)

Copyright (c) 2016 Calvin Ku

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## To-do List for Project Resummision
### Interface
1. I recommend to autohide list if infowindow is opened in mobile view. Currently infoWindow is not completely visible due to opened list

### App Functionality
N/A

### App Architecture (DOES NOT MEET REQUIREMENT!)
* **You should use Knockout bindings (not JQuery) where it is possible to manipulate DOM objects. See Code Review page for more details.**

* Student incorporates a build process allowing for production quality, minified code, to be delivered to the client.

* Data persists when the app is closed and reopened, either through localStorage or an external database (e.g. Firebase).

* In lieu of hardcoding locations, student populates a dynamic model with information retrieved from an API.

### Asynchronous Data Usage (DOES NOT MEET REQUIREMENT!)
* **Google Map API asynchronous loading and error handling should be updated a little bit. (See Code Review Section)**

### Filter Functionality
* Can be improved with an additaional autocomplete functionality. See:
** https://github.com/LeaVerou/awesomplete
** https://github.com/tombolaltd/awesomplete
** https://jqueryui.com/autocomplete/
