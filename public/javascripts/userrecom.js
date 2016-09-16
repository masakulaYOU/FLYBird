jQuery(document).ready(function($) {
	var map = new BMap.Map("map",{minZoom:5,maxZoom:18});
		map.centerAndZoom(new BMap.Point(108.9236, 34.5408),5);
		map.enableScrollWheelZoom();
	var hotPlaces = $('.recomul a');
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
			$('#searchnearby').removeClass('disabled');
		}
		//addClickHander(hotPlaces[i].innerHTML,marker);
	}

	var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
		{"input" : "address"
		,"location" : map
	});

	ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
	var str = "";
		var _value = e.fromitem.value;
		var value = "";
		if (e.fromitem.index > -1) {
			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		}    
		str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
		
		value = "";
		if (e.toitem.index > -1) {
			_value = e.toitem.value;
			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		}    
		str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
		G("searchResultPanel").innerHTML = str;
	});

	var myValue;
	ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
	var _value = e.item.value;
		myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
		
		setPlace();
	});

	function setPlace(){
		map.clearOverlays();
		function myFun(){
			var pp = local.getResults().getPoi(0).point;
			map.centerAndZoom(pp, 18);
			map.addOverlay(new BMap.Marker(pp));
		}
		var local = new BMap.LocalSearch(map, {
		  onSearchComplete: myFun
		});
		local.search(myValue);
		$('#searchnearby').removeClass('disabled');
	}

	function G(id) {
		return document.getElementById(id);
	}

	$('#search').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		setPlace();
	});

	$('#searchnearby').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		$('.nearby').css('display', 'block');
	});

	$('#doSearch').on('click',  function(event) {
		event.preventDefault();
		/* Act on the event */
		if(!$('#nearsearch').val()){
			$('#alert').removeClass('hidden');
		} else{
			map.clearOverlays();
			$('#alert').addClass('hidden');
			var content = $('#nearsearch').val();
			var center = map.getCenter();
			var circle = new BMap.Circle(center,5000,{fillColor:"blue",strokeWeight:1,fillOpacity:0.3,strokeOpacity:0.3});
			map.addOverlay(circle);
			var local = new BMap.LocalSearch(map,{renderOptions:{map:map,autoViewport:false}});
			local.searchNearby(content,center,5000);
		}
	});

	$('#searchlink a').on('click',function(events){
		map.clearOverlays();
		var content = $(this).text();
		alert(content);
		var local = new BMap.LocalSearch(map,{
			renderOptions:{map:map}
		});
		local.search(content);
	})
});