L.Control.Weather = L.Control.extend({
  options: {
    position: "bottomleft",
    units: "internal",
    lang: "en",
    iconUrlTemplate: "http://openweathermap.org/img/w/:icon"
  },
  onAdd: function(map) {
    this._div = L.DomUtil.create('div', '');
    this._temperature = L.DomUtil.create('div', '');
    this._humidity = L.DomUtil.create('div', '');
    this._wind = L.DomUtil.create('div', '');
    this._icon = L.DomUtil.create('div', 'weatherIcon');
    this.$div = $(this._div);
    this.$div.addClass("leaflet-control-weather");
    $(this._icon).append($("<img />"));
    this.$div.append(this._icon);
    this.$div.append(this._temperature);
    this.$div.append(this._humidity);
    this.$div.append(this._wind);
    this.onMoveEnd = onMoveEnd.bind(this);
    this.refresh(this.updateWidget.bind(this));
    this._map.on("moveend", this.onMoveEnd);

    function onMoveEnd() {
      var _this = this;
      this.refresh(function(weather) {
        _this.updateWidget(weather);
      });
    }
    return this.$div.get(0);
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
  updateWidget: function(weather) {
    var iconUrl = this.options.iconUrlTemplate.replace(":icon", weather.weather[0].icon + ".png");
    console.log(weather);
    $(this._icon).find("img").attr("src", iconUrl);
    $(this._temperature).html(weather.main.temp);
    $(this._humidity).html(weather.main.humidity);
    $(this._wind).html(weather.wind.speed);
  }
});



L.control.weather = function(options) {
  return new L.Control.Weather(options);
};