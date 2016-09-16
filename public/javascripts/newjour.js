jQuery(document).ready(function($) {
	var map = new BMap.Map("map",{minZoom:5,maxZoom:18});
		map.centerAndZoom(new BMap.Point(108.9236, 34.5408),5);
		map.enableScrollWheelZoom();

	$('#subdrive').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		var startplace = $('#drivestart').val();
		var endplace = $('#driveend').val();
		$('.mypanel').css('display', 'block');
		$('#r-result').html('');
		map.clearOverlays()
		var driving = new BMap.DrivingRoute(map,{
			renderOptions:{map:map,panel:"r-result",autoViewport:true}
		});
		driving.search(startplace,endplace);
	});

	$('#subride').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		var startplace = $('#ridestart').val();
		var endplace = $('#rideend').val();
		$('.mypanel').css('display', 'block');
		$('#r-result').html('');
		map.clearOverlays()
		var driving = new BMap.DrivingRoute(map,{
			renderOptions:{map:map,panel:"r-result",autoViewport:true}
		});
		driving.search(startplace,endplace);
	});

	$('#subwalk').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		var startplace = $('#walkstart').val();
		var endplace = $('#walkend').val();
		$('.mypanel').css('display', 'block');
		$('#r-result').html('');
		map.clearOverlays();
		var walking = new BMap.WalkingRoute(map,{
			renderOptions:{map:map,panel:"r-result",autoViewport:true}
		});
		walking.search(startplace,endplace);
	});

	$('#close').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		$('.mypanel').css('display', 'none');
	});

	$('#addNew').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		$('#newjour').css('display', 'block');
	});
});