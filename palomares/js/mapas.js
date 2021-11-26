/*
SEEEEEEE:
https://embed.plnkr.co/plunk/UNrsy4SYbSMVrRRxTf1d
*/
var arrCentrosProv=[];
var map;
var layerLE;
var layerSA;
var layerVA;
var layerZA;

//https://github.com/pointhi/leaflet-color-markers
var greenIcon = new L.Icon({
	iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
})
var redIcon = new L.Icon({
	iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
})
var blueIcon = new L.Icon({
	iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
})
var yellowIcon = new L.Icon({
	iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
})
var orangeIcon = new L.Icon({
	iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
})
var violetIcon = new L.Icon({
	iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
})

var baselayers = {
	"Calles": L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3']}), 
	"Hibrido": L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3']}), 
	"Satelite": L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3']}), 
	"Superficie": L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3']})
};

var club160 = new L.LayerGroup();
var club161 = new L.LayerGroup();
var club162 = new L.LayerGroup();
var club163 = new L.LayerGroup();
var club164 = new L.LayerGroup();
var club165 = new L.LayerGroup();

var clubes = {
	"Club 160": club160,
	"Club 161": club161,
	"Club 162": club162, 
	"Club 163": club163,
	"Club 164": club164,
	"Club 165": club165,
	"Unidades administrativas": Spain_UnidadAdministrativa
};
			
function Procesa() {
	arrCentrosProv.length = 0;
	var req = $.getJSON('data/centrosprov.txt', function(datosCentrosProv){
		req.done(function(response){
			for (var i=0; i<datosCentrosProv.length; i++){
				var nuevo = {cod:datosCentrosProv[i].cod,lat:datosCentrosProv[i].lat,lon:datosCentrosProv[i].lon};
				arrCentrosProv.push(nuevo);
			}
		});
	 });
}

function dimeCentroProv(codProvincia){
	for (var i=0; i<arrCentrosProv.length; i++){
		if (arrCentrosProv[i].cod==codProvincia){
			return new Array(arrCentrosProv[i].lat,arrCentrosProv[i].lon);
		}
	}
}

function getLeon(feature) {
  if (feature.properties.cod_prov==="24") return true
}

function getZamora(feature) {
  if (feature.properties.cod_prov==="49") return true
}

function getSalamanca(feature) {
  if (feature.properties.cod_prov==="37") return true
}

function getValladolid(feature) {
  if (feature.properties.cod_prov==="47") return true
}

function Centrar(valor) {
	var prov = $('#provincia').val();
	switch(prov) {
		case "1": //Leon
			switch(valor) {
				case "1":
					map.setView([42.635377, -5.896341], 9); //centro provincia
					break;
				case "2": 
					map.setView([42.59812920933251, -5.57194023376353], 9); //centro capital (Plaza de Santo Domingo)
					break;
				case "3": 
				
					break;
			}
			break;
		case "2": //Salamanca
			switch(valor) {
				case "1":
					map.setView([40.759726, -6.002500], 9); //centro provincia
					break;
				case "2": 
					map.setView([40.970069, -5.663408], 9); //centro capital (Puerta de Zamora)
					break;
				case "3": 
				
					break;
			}
			break;
		case "3": //Valladolid
			switch(valor) {
				case "1":
					map.setView([41.705383, -4.754363], 9); //centro provincia
					break;
				case "2": 
					map.setView([41.647969, -4.729523], 9); //centro capital por google maps
					break;
				case "3": 
				
					break;
			}
			break;
		case "4": //Zamora
			switch(valor) {
				case "1":
					map.setView([41.503848, -5.743542], 9); //centro provincia
					break;
				case "2": 
					map.setView([41.503848, -5.743542], 9); //centro capital (Plaza del Mercado)
					break;
				case "3": 
				
					break;
			}
			break;
	}
}

function AddText(){
	var texto="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
	$("#datosdistancia").empty ();
	$('<p>' +texto+'</p>').appendTo('#datosdistancia');
}

function MuestraProvincia(prov) {
	switch(prov) {
		case "":
			clubes["Club 160"].remove(map);
			clubes["Club 161"].remove(map);
			clubes["Club 162"].remove(map);
			clubes["Club 163"].remove(map);
			clubes["Club 164"].remove(map);
			clubes["Club 165"].remove(map);
			map.setView([41.66, -4.72], 8); //centro CyL
			if (layerLE){layerLE.remove(map);}
			if (layerSA){layerSA.remove(map);}
			if (layerVA){layerVA.remove(map);}
			if (layerZA){layerZA.remove(map);}
			break;
		case "24": //Leon
			clubes["Club 160"].remove(map);
			clubes["Club 161"].remove(map);
			clubes["Club 164"].remove(map);
			clubes["Club 165"].remove(map);
			clubes["Club 162"].addTo(map);
			clubes["Club 163"].addTo(map);
			//map.setView([42.635377, -5.896341], 9); //centro provincia
			map.setView(dimeCentroProv(prov), 9); //centro provincia
			$('#centro').val("1");
			if (layerSA){layerSA.remove(map);}
			if (layerVA){layerVA.remove(map);}
			if (layerZA){layerZA.remove(map);}
			layerLE = new L.GeoJSON.AJAX("data/spain-provinces.geojson", {filter: getLeon}).addTo(map);
			break;
		case "37": //Salamanca
			clubes["Club 160"].remove(map);
			clubes["Club 162"].remove(map);
			clubes["Club 163"].remove(map);
			clubes["Club 164"].remove(map);
			clubes["Club 161"].addTo(map);
			clubes["Club 165"].addTo(map);
			//map.setView([40.759726, -6.002500], 9); //centro provincia
			map.setView(dimeCentroProv(prov), 9); //centro provincia
			$('#centro').val("1");
			if (layerLE){layerLE.remove(map);}
			if (layerVA){layerVA.remove(map);}
			if (layerZA){layerZA.remove(map);}
			layerSA = new L.GeoJSON.AJAX("data/spain-provinces.geojson", {filter: getSalamanca}).addTo(map);
			break;
		case "47": //Valladolid
			clubes["Club 161"].remove(map);
			clubes["Club 162"].remove(map);
			clubes["Club 163"].remove(map);
			clubes["Club 164"].remove(map);
			clubes["Club 165"].remove(map);
			clubes["Club 160"].addTo(map);
			//map.setView([41.705383, -4.754363], 9); //centro provincia
			map.setView(dimeCentroProv(prov), 9); //centro provincia
			$('#centro').val("1");
			if (layerLE){layerLE.remove(map);}
			if (layerSA){layerSA.remove(map);}
			if (layerZA){layerZA.remove(map);}
			layerVA = new L.GeoJSON.AJAX("data/spain-provinces.geojson", {filter: getValladolid}).addTo(map);
			break;
		case "49": //Zamora
			clubes["Club 160"].remove(map);
			clubes["Club 161"].remove(map);
			clubes["Club 162"].remove(map);
			clubes["Club 163"].remove(map);
			clubes["Club 165"].remove(map);
			clubes["Club 164"].addTo(map);
			//map.setView([41.673123, -6.131398], 9); //centro provincia
			map.setView(dimeCentroProv(prov), 9); //centro provincia
			$('#centro').val("1");
			if (layerLE){layerLE.remove(map);}
			if (layerSA){layerSA.remove(map);}
			if (layerVA){layerVA.remove(map);}
			layerZA = new L.GeoJSON.AJAX("data/spain-provinces.geojson", {filter: getZamora}).addTo(map);
			break;
	}  
}
