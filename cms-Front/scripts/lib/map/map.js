/**
 * Created by HJJ on 2017/3/10.
 *
 ━━━━━━神兽出没━━━━━━
 　　　┏┓　　　┏┓
 　　┏┛┻━━━┛┻┓
 　　┃　　　　　　　┃
 　　┃　　　━　　　┃
 　　┃　┳┛　┗┳　┃
 　　┃　　　　　　　┃
 　　┃　　　┻　　　┃
 　　┃　　　　　　　┃
 　　┗━┓　　　┏━┛Code is far away from bug with the animal protecting
 　　　　┃　　　┃    神兽保佑,代码无bug
 　　　　┃　　　┃
 　　　　┃　　　┗━━━┓
 　　　　┃　　　　　　　┣┓
 　　　　┃　　　　　　　┏┛
 　　　　┗┓┓┏━┳┓┏┛
 　　　　　┃┫┫　┃┫┫
 　　　　　┗┻┛　┗┻┛
 ━━━━━━感觉萌萌哒━━━━━━


 */
console.log($("#addrOpt").attr("disabled"))


	



function G(id) {
	return document.getElementById(id);
}

var map = new BMap.Map("container");
var point = new BMap.Point(120.2, 30.3);
map.centerAndZoom(point, 13);
map.enableScrollWheelZoom();
var localSearch = new BMap.LocalSearch(map);
localSearch.enableAutoViewport(); //允许自动调节窗体大小
map.enableInertialDragging();
var size = new BMap.Size(10, 20);
map.addControl(new BMap.CityListControl({
	anchor: BMAP_ANCHOR_TOP_LEFT,
	offset: size,
}));


$("#addrOpt").click(function(){
	
	var ac = new BMap.Autocomplete( //建立一个自动完成的对象
		{
			"input": "addrOpt",
			"location": map
		});
})


//------------------鼠标放在下拉列表上的事件--------------------------------
ac.addEventListener("onhighlight", function(e) {
	var str = "";
	var _value = e.fromitem.value;
	var value = "";
	if(e.fromitem.index > -1) {
		value = _value.province + _value.city + _value.district + _value.street + _value.business;
	}
	str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

	value = "";
	if(e.toitem.index > -1) {
		_value = e.toitem.value;
		value = _value.province + _value.city + _value.district + _value.street + _value.business;
	}
	str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
	G("searchResultPanel").innerHTML = str;
});
//----------鼠标点击下拉列表后的事件----------------------
var myValue;
ac.addEventListener("onconfirm", function(e) {
	var _value = e.item.value;
	myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
	G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

	setPlace();
});

function setPlace() { // 创建地址解析器实例
	var myGeo = new BMap.Geocoder(); // 将地址解析结果显示在地图上,并调整地图视野
	myGeo.getPoint(myValue, function(point) {
		if(point) {
			map.centerAndZoom(point, 16);
			map.addOverlay(new BMap.Marker(point));
		}
	}, "杭州");
}
//-------------获取经纬度
function searchByStationName() {
	map.clearOverlays(); //清空原来的标注
	var keyword = document.getElementById("addrOpt").value;
	localSearch.setSearchCompleteCallback(function(searchResult) {
		var poi = searchResult.getPoi(0);
		document.getElementById("longitude").value = poi.point.lng;
		document.getElementById("latitude").value = poi.point.lat;
		map.centerAndZoom(poi.point, 13);
		var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat)); // 创建标注，为要查询的地方对应的经纬度
		map.addOverlay(marker);
		var content = document.getElementById("addrOpt").value + "<br/><br/>经度：" + poi.point.lng + "<br/>纬度：" + poi.point.lat;
		console.log(content)
		var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + content + "</p>");
		marker.addEventListener("click", function() { this.openInfoWindow(infoWindow); });
	});
	localSearch.search(keyword);
}