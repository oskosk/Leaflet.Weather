# Leaflet.Weather
A Leaflet plugin for adding a weather widget to the map using [OpenWeatherMap](http://openweathermap.org/) API

## Dependencies

**This version depends on jQuery for DOM manipulation**.

## Installation

Include the CSS and JS in your HTML.

    <link href="Leaflet.Weather.css" rel="stylesheet" type="text/css" />
    <script src="Leaflet.Weather.js"></script>  

## Example

    // Create a map in the "map" div, set the view to a given place and zoom
     map = L.map('map').setView([-34, -59], 13);

    // add an OpenStreetMap tile layer
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    }).addTo(map);

    // add the weather control
    L.control.weather({
      lang: "es",
      units: "metric"
    }).addTo(map);      


## Usage

    var weatherControl = new L.Control.Weather(options);
    map.addControl(weatherControl);

### Factory usage


    L.control.weather(options).addTo(map); 

### Options

* `position` - Leaflet [position option](http://leafletjs.com/reference.html#control-positions) for Controls.
* `lang` - The language for response API.
* `units` - The units of measurment for API responses.

## License 

The MIT License (MIT)

Copyright (c) 2015 osk &lt;oskosk@gmail.com&gt;

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
