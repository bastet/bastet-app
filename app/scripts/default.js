var watchId;
var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        watchId = navigator.geolocation.watchPosition(app.onSuccess, app.onError, { timeout: 30000 });
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
    },
    onSuccess: function(position) {
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' + 
            'Longitude: ' + position.coords.longitude + '<br />' + 
            'Altitude: ' + position.coords.altitude + '<br />' + 
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' + 
            'Heading: ' + position.coords.heading + '<br />' + 
            'Speed: ' + position.coords.speed + '<br />' + 
            'Accuracy: ' + position.coords.accuracy + '<br />' + 
            'Timestamp: ' + position.timestamp;
    },
    onError: function(error) {
        var element = document.getElementById('geolocation-error');
        element.innerHTML = 'Code: ' + error.code + '<br />' + 
            'Message: ' + error.message;
    }
};

app.initialize();
