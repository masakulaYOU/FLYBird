jQuery(document).ready(function($) {
	var map = new BMap.Map("map",{minZoom:5,maxZoom:18});
		map.centerAndZoom(new BMap.Point(108.9236, 34.5408),5);
		map.enableScrollWheelZoom();
	var hotPlaces = $('.indexRecomend a');
	var opts = {
		width:200,
		height:80,
		title:"景点",
		enableMessage:true
	}
	for(var i = 0; i<hotPlaces.length;i++){
		var point = new BMap.Point(hotPlaces[i].getAttribute('lat'),hotPlaces[i].getAttribute('lon'));
		var marker = new BMap.Marker(point);
		map.addOverlay(marker);
		var rm = new BMapLib.TextIconOverlay(point,hotPlaces[i].getAttribute('score'));
		map.addOverlay(rm);
		hotPlaces[i].onclick = function(){
			var lat = parseFloat(this.getAttribute('lat')),
			lon = parseFloat(this.getAttribute('lon')),
			name = this.innerHTML;
			map.clearOverlays();
			var point = new BMap.Point(lat,lon);
			var mark = new BMap.Marker(point);
			map.centerAndZoom(point,18);
			map.addOverlay(mark);
		}
		//addClickHander(hotPlaces[i].innerHTML,marker);
	}
});