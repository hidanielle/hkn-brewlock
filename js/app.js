$.noConflict();

jQuery( document ).ready(function( $ ) {
  $(window).stellar();
  $(".intro-lockup h1.en").fitText(1, { minFontSize: '20px', maxFontSize: '55px' });
  $(".fit-1").fitText(0.23, { minFontSize: '20px', maxFontSize: '258px' });
  $(".fit-2").fitText(0.5, { minFontSize: '20px', maxFontSize: '132px' });

  $(".intro-lockup h1.fr").fitText(1.8, { minFontSize: '15px', maxFontSize: '38px' });
  $(".fit-1-fr").fitText(0.33, { minFontSize: '20px', maxFontSize: '210px' });
  $(".fit-2-fr").fitText(0.5, { minFontSize: '20px', maxFontSize: '132px' });

  $(".toggleSocial").click(function() {
    $(".overlay").attr("state","active");
  })

  $(".hideSocial").click(function() {
    $(".overlay").attr("state","");
  })

  // MAP CONTROLS
  L.mapbox.accessToken = 'pk.eyJ1Ijoib25lYWR2ZXJ0aXNpbmciLCJhIjoiT0VVUHE2TSJ9.SHRxG7vsjOxGOgLVjF68TA';
  var map = L.mapbox.map('map', 'oneadvertising.p073c90o')
  .setView([51.468, -93.647], 4), markers = [];

  var starIcon = {
    "iconUrl": "images/map-star.png",
    "iconSize": [61, 68],
    "iconAnchor": [50, 50],
    "popupAnchor": [-20, -50],
    "className": "markerstar"
  };
  var musicIcon = {
      "iconUrl": "images/map-music.png",
      "iconSize": [55, 72],
      "iconAnchor": [50, 50],
      "popupAnchor": [-20, -50],
      "className": "markermusic"
  };
  var pintIcon = {
    "iconUrl": "images/map-pint.png",
    "iconSize": [61, 68],
    "iconAnchor": [50, 50],
    "popupAnchor": [-20, -50],
    "className": "markerpint"
  };
  var brewIcon = {
    "iconUrl": "images/map-brew.png",
    "iconSize": [61, 68],
    "iconAnchor": [50, 50],
    "popupAnchor": [-20, -50],
    "className": "markerbrew"
  };

  map.featureLayer.on('ready', function(e) {
    map.featureLayer.setFilter(function(f) {
      return f.properties['marker-symbol'] === 'embassy'  || f.properties['marker-symbol'] === 'star-stroked';
    });
    setStyle();
  });


  // LOGIC FOR FILTERING
  $('.btn-filter').click(function() {

      $('.btn-filter').removeClass('active');
      $(this).addClass('active');
      var type = $(this).attr('data-type');

      if (type == "brew") {
        map.featureLayer.setFilter(function(f) {
          return f.properties['marker-symbol'] === 'embassy'  || f.properties['marker-symbol'] === 'star-stroked';
        });
        map.setView([51.468, -93.647], 4);
        setStyle();
      } else {
        map.featureLayer.setFilter(function(f) {
          return f.properties['marker-symbol'] === 'car' || f.properties['marker-symbol'] === 'star' || f.properties['marker-symbol'] === 'marker';
        });
        map.setView([51.468, -93.647], 4);
        setStyle();
      }

      return false;
    
  })


  var setStyle = function () {

    map.featureLayer.eachLayer(function(marker) { 
        
        markers.push(marker); 

        // LOGIC FOR DIFFERENT TYPES OF ICONS
        if (marker.feature.properties['marker-symbol'] == "star-stroked") {
          marker.setIcon(L.icon(brewIcon));
          var content = 
            '<span class=\"map-title\">' + marker.feature.properties.title + 
            '<\/span> <span class=\"map-desc\">' + marker.feature.properties.address + 
            '<\/span> <div class=\"popup-details\"><div class=\"popup-time\"><span class=\"glyphicon glyphicon glyphicon-time\"><\/span> 8:00pm <\/div> <div class=\"popup-date\"><span class=\"glyphicon glyphicon-calendar\"><\/span>' + 
            marker.feature.properties.date + '<\/div><\/div>';
          marker.bindPopup(content);
        } else if (marker.feature.properties['marker-symbol'] == "embassy") {
          marker.setIcon(L.icon(brewIcon));
          var content = 
            '<span class=\"map-title\">' + marker.feature.properties.title + '<\/span>' +
            '<span class=\"map-desc\">' + marker.feature.properties.address + '<\/span>';
          marker.bindPopup(content);
        } else if (marker.feature.properties['marker-symbol'] == "pin") {
          marker.setIcon(L.icon(musicIcon));
          var content = 
            '<span class=\"map-title\">' + marker.feature.properties.title + 
            '<\/span> <span class=\"map-desc\">' + marker.feature.properties.description + 
            '<\/span> <div class=\"popup-details\"><div class=\"popup-time\"><span class=\"glyphicon glyphicon glyphicon-time\"><\/span>' + 
            marker.feature.properties.time + 
            '<\/div> <div class=\"popup-date\"><span class=\"glyphicon glyphicon-calendar\"><\/span>' + 
            marker.feature.properties.date + '<\/div><\/div>';
          marker.bindPopup(content);
        } else if (marker.feature.properties['marker-symbol'] == "car") {
          marker.setIcon(L.icon(starIcon));
          var content = 
            '<span class=\"map-title\">' + marker.feature.properties.title + '<\/span>' +
            '<span class=\"map-desc\">' + marker.feature.properties.description + '<\/span>';
          marker.bindPopup(content);
        } else if (marker.feature.properties['marker-symbol'] == "star") {
          marker.setIcon(L.icon(musicIcon));
          var content = 
            '<span class=\"map-title\">' + marker.feature.properties.title + 
            '<\/span> <span class=\"map-desc\">' + marker.feature.properties.dj + 
            '<\/span> <div class=\"popup-details\"><div class=\"popup-time\"><span class=\"glyphicon glyphicon glyphicon-time\"><\/span>' + 
            marker.feature.properties.time + 
            '<\/div> <div class=\"popup-date\"><span class=\"glyphicon glyphicon-calendar\"><\/span>' + 
            marker.feature.properties.date + '<\/div><\/div>';
          marker.bindPopup(content);
        } else if (marker.feature.properties['marker-symbol'] == "marker") {
          marker.setIcon(L.icon(pintIcon));
          var content = 
            '<span class=\"map-title\">' + marker.feature.properties.title + '<\/span>' +
            '<span class=\"map-desc\">' + marker.feature.properties.description + '<\/span>';
          marker.bindPopup(content);
        }

      });
  }
    
  // Change cities via Mapbox
  var geocoder = L.mapbox.geocoder('mapbox.places');
  function showMap(err, data) {
      map.setView([data.latlng[0], data.latlng[1]], 11);
  }

});

