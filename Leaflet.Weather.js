L.Control.Weather = L.Control.extend({
  options: {
    position: "bottomleft",
    units: "internal",
    lang: "en",
    cssClass: "leaflet-control-weather",
    iconUrlTemplate: "http://openweathermap.org/img/w/:icon",
    template: '<div class="weatherIcon"><img src=":iconurl"></div><div>T: :temperature°F</div><div>H: :humidity%</div><div>W: :winddirection :windspeed m/s</div>',
    translateWindDirection: function(text) {
      return text;
    },
    updateWidget: undefined
  },
  onAdd: function(map) {
    this._div = L.DomUtil.create('div', this.options.cssClass);
    this.onMoveEnd = onMoveEnd.bind(this);
    if (!this.options.updateWidget) {
      this.options.updateWidget = this._updateWidget.bind(this);
    }
    this.refresh(this.options.updateWidget.bind(this));
    this._map.on("moveend", this.onMoveEnd);

    function onMoveEnd() {
      var _this = this;
      this.refresh(function(weather) {
        _this.options.updateWidget(weather);
      });
    }
    return this._div;
  },
  onRemove: function(map) {
    this._map.off("moveend", this.onMoveEnd);
  },
  refresh: function(callback) {
    var _this = this,
      center = this._map.getCenter(),
      url = "http://api.openweathermap.org/data/2.5/weather?lat=:lat&lon=:lng&lang=:lang&units=:units";
    url = url.replace(":lang", this.options.lang);
    url = url.replace(":units", this.options.units);
    url = url.replace(":lat", center.lat);
    url = url.replace(":lng", center.lng);
    $.getJSON(url, function(weather) {
      callback(weather);
    });
  },
  _updateWidget: function(weather) {
    var iconUrl = this.options.iconUrlTemplate.replace(":icon", weather.weather[0].icon + ".png");
    var tpl = this.options.template;
    tpl = tpl.replace(":iconurl", iconUrl);
    tpl = tpl.replace(":temperature", weather.main.temp);
    tpl = tpl.replace(":humidity", weather.main.humidity);
    tpl = tpl.replace(":windspeed", weather.wind.speed);
    tpl = tpl.replace(":winddirection", this.mapWindDirection(weather.wind.deg));
    tpl = tpl.replace(":windegrees", weather.wind.deg);
    $(this._div).html(tpl);
  },
  /**
   * Maps from wind direction in degrees to cardinal points
   * According to :
   * http://climate.umn.edu/snow_fence/components/winddirectionanddegreeswithouttable3.htm
   */
  mapWindDirection: function(degrees) {
    var text = "";
    if (inRange(degrees, 11.25, 33.75)) {
      text = "NNE";
    } else if (inRange(degrees, 33.75, 56.25)) {
      text = "NE";
    } else if (inRange(degrees, 56.25, 78.75)) {
      text = "ENE";
    } else if (inRange(degrees, 78.75, 101.25)) {
      text = "E";
    } else if (inRange(degrees, 101.25, 123.75)) {
      text = "ESE";
    } else if (inRange(degrees, 123.75, 146.25)) {
      text = "SE";
    } else if (inRange(degrees, 146.25, 168.75)) {
      text = "SSE";
    } else if (inRange(degrees, 168.75, 191.25)) {
      text = "S";
    } else if (inRange(degrees, 191.25, 213.75)) {
      text = "SSW";
    } else if (inRange(degrees, 213.75, 236.25)) {
      text = "SW";
    } else if (inRange(degrees, 236.25, 258.75)) {
      text = "WSW";
    } else if (inRange(degrees, 258.75, 281.25)) {
      text = "W";
    } else if (inRange(degrees, 281.25, 303.75)) {
      text = "WNW";
    } else if (inRange(degrees, 303.75, 326.25)) {
      text = "NW";
    } else if (inRange(degrees, 326.25, 348.75)) {
      text = "NNW";
    } else if (inRange(degrees, 348.75, 11.25)) {
      text = "N";
    }
    return this.options.translateWindDirection(text);

    function inRange(val, min, max) {
      // Special case for north like comparation
      if (max < min) {
        if (val >= min && val < 360) {
          return true;
        }
        if (val > 0 && val < max) {
          return true;
        }
        return false;
      }
      // Al other directions
      if (val >= min && val <= max) {
        return true;
      }
      return false;
    }
  }
});



L.control.weather = function(options) {
  return new L.Control.Weather(options);
};