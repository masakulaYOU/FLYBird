jQuery(document).ready(function($) {
	var map = new BMap.Map("map",{minZoom:5,maxZoom:18});
		map.centerAndZoom(new BMap.Point(108.9236, 34.5408),5);
		map.enableScrollWheelZoom();

	var hislist = new Array();
	hislistplace = new Array();
	var olist = document.getElementById('hislist');
	if(olist){
		var oli = olist.getElementsByTagName('li');
		for(var i = 0; i<oli.length;i++){
			var a = oli[i].getElementsByTagName('a');
			var item = [];
			item.push(a[0].getAttribute('place'),a[1].getAttribute('place'));
			hislist.push(item);
		}

		for(var i = 0;i<hislist.length;i++){
			for(var j = 0;j<hislist[0].length;j++){
				var myGeo = new BMap.Geocoder();
				myGeo.getPoint(hislist[i][j],function(point){
					if(point){
						hislistplace.push(point);
					}
				})
			}
		}
	}
	$('#showmap').on('click', function(event) {
		event.preventDefault();
		for(var i=0;i<hislistplace.length;i++){
			var points = [hislistplace[i],hislistplace[i+1]];
			var curve = new BMapLib.CurveLine(points,{strokeColor:"blue",strokeWeight:3,strokeOpacity:0.5});
			i++;
			map.addOverlay(curve);
		}
	});
	
	$('#hislist li a').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		var name = $(this).text();
		var myGeo = new BMap.Geocoder();
		myGeo.getPoint(name,function(point){
			if(point){
				map.clearOverlays();
				map.centerAndZoom(point,13);
			}
		})
	});
})