var isDrawing = false;
var area = document.getElementById('area'), x1 = 0, y1 = 0, x2 = 0, y2 = 0;
var selected_bounds = {
    _northEast: {lat:0, lng:0},
    _southWest: {lat:0, lng:0}
};
document.addEventListener('keydown', function (e) {
    if (e.keyCode == 77) {
        if(isDrawing === false)
        {
            alert('Start selecting area');
            isDrawing = true;
        }
    }
});

function reCalc() {
    var x3 = Math.min(x1,x2);
    var x4 = Math.max(x1,x2);
    var y3 = Math.min(y1,y2);
    var y4 = Math.max(y1,y2);
    area.style.left = x3 + 'px';
    area.style.top = y3 + 'px';
    area.style.width = x4 - x3 + 'px';
    area.style.height = y4 - y3 + 'px';
}

window.onload = function(){
    google.maps.event.addListener(map, 'mousedown', function (event) {
        if(isDrawing === true){
            area.hidden = 0;
            x1 = event.pixel.x;
            y1 = event.pixel.y;
            reCalc();
            selected_bounds._northEast.lat = event.latLng.lat();
            selected_bounds._northEast.lng = event.latLng.lng();
            map.setOptions({gestureHandling: "none", keyboardShortcuts: false});
        }
    });
    google.maps.event.addListener(map, 'mousemove', function (event) {
        if (isDrawing === true){
            x2 = event.pixel.x;
            y2 = event.pixel.y;
            reCalc();
        }
    });
    google.maps.event.addListener(map, 'mouseup', function (event) {
        if (isDrawing === true){
            area.hidden = 1;
            selected_bounds._southWest.lat = event.latLng.lat();
            selected_bounds._southWest.lng = event.latLng.lng();
            isDrawing = false;
            map.setOptions({gestureHandling: "auto", keyboardShortcuts: true});
            alert('Check console');
            console.log(selected_bounds);
        }
    });
}