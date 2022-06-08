var map;
var arrAniosPalomares=[];
var arrProvincias=[];
var arrCentrosProv=[];
var arrPalomares=[];
var arrSocios=[];
var arrAllSocios=[];
var arrAllClubes=[];
var arrSueltas=[];
var arrPSuelta=[];
var layerLE;
var layerSA;
var layerVA;
var layerZA;
var arrMarkers=[];
var arrPuntoSuelta=[];
var theMarker=[];
var polylines=[];
var centers=[];
var circles=[];
var polys=[];
var CentroPoligono;
var geocodeService = L.esri.Geocoding.geocodeService();
var chkoptions=[];

var baselayers = {
	"Calles": L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3']}), 
	"Híbrido": L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3']}), 
	"Satélite": L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3']}), 
	"Superficie": L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3']})
};

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
	//iconUrl: 'img/iconos/home2.png',
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

var greyIcon = new L.Icon({
	iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
})

function Procesa() {
	arrCentrosProv.length = 0;
	arrPalomares.length = 0;
	arrSueltas.length = 0;
	var req = $.getJSON('data/centrosprov.txt', function(datosCentrosProv){
		req.done(function(response){
			for (var i=0; i<datosCentrosProv.length; i++){
				var nuevo = {cod:datosCentrosProv[i].cod,lat:datosCentrosProv[i].lat,lon:datosCentrosProv[i].lon};
				arrCentrosProv.push(nuevo);
			}
			var req1 = $.getJSON('data/palomares.txt', function(datosPalomares){
				req1.done(function(response1){
					for (var j=0; j<datosPalomares.length; j++){
						var nuevo1 = {anio:datosPalomares[j].anio,latgr:datosPalomares[j].latgr,longr:datosPalomares[j].longr,codprov:datosPalomares[j].codprov,provclub:datosPalomares[j].provclub,codclub:datosPalomares[j].codclub,nomclub:datosPalomares[j].nomclub,socio:datosPalomares[j].socio,loc:datosPalomares[j].loc,codloc:datosPalomares[j].codloc,prov:datosPalomares[j].prov,utmx:datosPalomares[j].utmx,utmy:datosPalomares[j].utmy,huso:datosPalomares[j].huso,utmx2:datosPalomares[j].utmx2,utmy2:datosPalomares[j].utmy2,huso2:datosPalomares[j].huso2,activo:datosPalomares[j].activo}
						arrPalomares.push(nuevo1);
					}
					var req2 = $.getJSON('data/sueltas.txt', function(datosSueltas){
						req2.done(function(response2){
							for (var k=0; k<datosSueltas.length; k++){
								var nuevo2 = {anio:datosSueltas[k].anio,codprov:datosSueltas[k].codprov,suelta:datosSueltas[k].suelta,provsuelta:datosSueltas[k].provsuelta,abrprovsuelta:datosSueltas[k].abrprovsuelta,fenceste:datosSueltas[k].fenceste,fsuelta:datosSueltas[k].fsuelta,hsuelta:datosSueltas[k].hsuelta,comunidad:datosSueltas[k].comunidad,latgr:datosSueltas[k].latgr,longr:datosSueltas[k].longr,utmx:datosSueltas[k].utmx,utmy:datosSueltas[k].utmy,huso:datosSueltas[k].huso,utmx2:datosSueltas[k].utmx2,utmy2:datosSueltas[k].utmy2,huso2:datosSueltas[k].huso2,activo:datosSueltas[k].activo}
								arrSueltas.push(nuevo2);
							}
						});
					});
					CargarAniosPalomares();
				});
			});
			
		});
	});
}

function MuestraProvincia(prov, visible){
	switch(parseInt(prov)) {
		case 0:
			map.setView([41.66, -4.72], 8, { animation: true }); //centro CyL
			if (layerLE){layerLE.remove(map);}
			if (layerSA){layerSA.remove(map);}
			if (layerVA){layerVA.remove(map);}
			if (layerZA){layerZA.remove(map);}
			break;
		case 24: //Leon
			//map.setView([42.635377, -5.896341], 9, { animation: true }); //centro provincia
			map.setView(dimeCentroProv(prov), 9, { animation: true }); //centro provincia
			if (layerSA){layerSA.remove(map);}
			if (layerVA){layerVA.remove(map);}
			if (layerZA){layerZA.remove(map);}
			if (visible){layerLE = new L.GeoJSON.AJAX("data/spain-provinces.geojson", {filter: getLeon}).addTo(map);}
			break;
		case 37: //Salamanca
			//map.setView([40.759726, -6.002500], 9, { animation: true }); //centro provincia
			map.setView(dimeCentroProv(prov), 9, { animation: true }); //centro provincia
			if (layerLE){layerLE.remove(map);}
			if (layerVA){layerVA.remove(map);}
			if (layerZA){layerZA.remove(map);}
			if (visible){layerSA = new L.GeoJSON.AJAX("data/spain-provinces.geojson", {filter: getSalamanca}).addTo(map);}
			break;
		case 47: //Valladolid
			//map.setView([41.705383, -4.754363], 9, { animation: true }); //centro provincia
			map.setView(dimeCentroProv(prov), 9, { animation: true }); //centro provincia
			if (layerLE){layerLE.remove(map);}
			if (layerSA){layerSA.remove(map);}
			if (layerZA){layerZA.remove(map);}
			if (visible){layerVA = new L.GeoJSON.AJAX("data/spain-provinces.geojson", {filter: getValladolid}).addTo(map);}
			break;
		case 49: //Zamora
			//map.setView([41.673123, -6.131398], 9, { animation: true }); //centro provincia
			map.setView(dimeCentroProv(prov), 9, { animation: true }); //centro provincia
			if (layerLE){layerLE.remove(map);}
			if (layerSA){layerSA.remove(map);}
			if (layerVA){layerVA.remove(map);}
			if (visible){layerZA = new L.GeoJSON.AJAX("data/spain-provinces.geojson", {filter: getZamora}).addTo(map);}
			break;
	}  
}

function CargarAniosPalomares(){
	arrAniosPalomares.length = 0;
	for (var i=0; i<arrPalomares.length; i++){
		if (arrPalomares[i].activo==true){
			var encontrado=false;
			for (var j=0; j<arrAniosPalomares.length; j++){
				if (arrPalomares[i].anio==arrAniosPalomares[j].anio){
					encontrado=true;
					break;
				}
			}
			if (!encontrado){
				arrAniosPalomares.push({anio:arrPalomares[i].anio});
			}
		}
	}
	arrAniosPalomares.sort((a, b) => (a.anio > b.anio) ? 1 : -1);
	var miSelect = document.getElementById("anio");
	document.querySelector('#anio').innerHTML = '';
	//var aTag = document.createElement('option');
	//aTag.value = -1;
	//aTag.text = "Seleccione año";
	//miSelect.appendChild(aTag);
	for (var i=0; i<arrAniosPalomares.length; i++){
		aTag = document.createElement('option');
		aTag.value = arrAniosPalomares[i].anio;
		aTag.text = arrAniosPalomares[i].anio;
		if (i==arrAniosPalomares.length-1){ //último
			anio=arrAniosPalomares[i].anio;
			aTag.selected=true;
		}
		miSelect.appendChild(aTag);
	}
	if (arrAniosPalomares.length > 0){
		$("#aniosettings").slider('setAttribute', 'min', arrAniosPalomares[0].anio);
		$("#aniosettings").slider('setAttribute', 'max', arrAniosPalomares[arrAniosPalomares.length-1].anio);
		$("#aniosettings").slider('refresh');
		$("#aniosettings").slider('setValue', arrAniosPalomares[arrAniosPalomares.length-1].anio);
		$('#aniosettings').slider('disable');
	}
	if (arrAniosPalomares.length > 0){
		if (CargarProvincias(anio) > 0){
			document.getElementById('selectprovincia').style.display='block';
		} else {
			document.getElementById('selectprovincia').style.display='none';
		}
	}
}

function CargarProvincias(anio){
	arrProvincias.length = 0;
	for (var i=0; i<arrPalomares.length; i++){
		if ((arrPalomares[i].activo==true)&&(arrPalomares[i].anio==anio)){
			var encontrado=false;
			for (var j=0; j<arrProvincias.length; j++){
				if (arrProvincias[j].provclub==arrPalomares[i].provclub){
					encontrado=true;
				}
			}
			if ((!encontrado)&&(arrPalomares[i].provclub.length != 0)){
				var nuevo={codprov:arrPalomares[i].codprov,provclub:arrPalomares[i].provclub};
				arrProvincias.push(nuevo);
			}
		}
	}
	//arrProvincias.sort((a, b) => (a.provclub > b.provclub) ? 1 : -1);
	arrProvincias.sort((a, b) => (a.provclub).localeCompare(b.provclub));
	var miSelect = document.getElementById("provincia");
	document.querySelector('#provincia').innerHTML = '';
	var aTag = document.createElement('option');
	aTag.value = -1;
	aTag.text = "Seleccione provincia";
	miSelect.appendChild(aTag);
	for (var i=0; i<arrProvincias.length; i++){
		aTag = document.createElement('option');
		aTag.value = arrProvincias[i].codprov;
		aTag.text = arrProvincias[i].provclub;
		miSelect.appendChild(aTag);
	}
	return arrProvincias.length;
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

function getSalamanca(feature) {
  if (feature.properties.cod_prov==="37") return true
}

function getValladolid(feature) {
  if (feature.properties.cod_prov==="47") return true
}

function getZamora(feature) {
  if (feature.properties.cod_prov==="49") return true
}

function Centrar(prov, centro) {
	switch(prov) {
		case "24": //Leon
			switch(centro) {
				case "1":
					map.setView([42.635377, -5.896341], 9, { animation: true }); //centro provincia
					break;
				case "2": 
					map.setView([42.59812920933251, -5.57194023376353], 9, { animation: true }); //centro capital (Plaza de Santo Domingo)
					break;
				case "3": 
				
					break;
			}
			break;
		case "37": //Salamanca
			switch(centro) {
				case "1":
					map.setView([40.759726, -6.002500], 9, { animation: true }); //centro provincia
					break;
				case "2": 
					map.setView([40.970069, -5.663408], 9, { animation: true }); //centro capital (Puerta de Zamora)
					break;
				case "3": 
				
					break;
			}
			break;
		case "47": //Valladolid
			switch(centro) {
				case "1":
					map.setView([41.705383, -4.754363], 9, { animation: true }); //centro provincia
					break;
				case "2": 
					map.setView([41.647969, -4.729523], 9, { animation: true }); //centro capital por google maps
					break;
				case "3": 
				
					break;
			}
			break;
		case "49": //Zamora
			switch(centro) {
				case "1":
					map.setView([41.503848, -5.743542], 9, { animation: true }); //centro provincia
					break;
				case "2": 
					map.setView([41.503848, -5.743542], 9, { animation: true }); //centro capital (Plaza del Mercado)
					break;
				case "3": 
				
					break;
			}
			break;
	}
}

function CargarClubes(anio, codProvincia){
	var arrClubes=[];
	var miSelect = document.getElementById("club");
	for (var i=0; i<arrPalomares.length; i++){
		if ((arrPalomares[i].activo==true)&&(arrPalomares[i].codprov==codProvincia)&&(arrPalomares[i].anio==anio)){
			var encontrado=false;
			for (var j=0; j<arrClubes.length; j++){
				if (arrClubes[j].codclub==arrPalomares[i].codclub){
					encontrado=true;
				}
			}
			if (!encontrado){
				var nuevo={codclub:arrPalomares[i].codclub,nomclub:arrPalomares[i].nomclub};
				arrClubes.push(nuevo);
			}
		}
	}
	//arrClubes.sort((a, b) => (a.nomclub > b.nomclub) ? 1 : -1);
	arrClubes.sort((a, b) => (a.nomclub).localeCompare(b.nomclub));
	document.querySelector('#club').innerHTML = '';
	var aTag = document.createElement('option');
	aTag.value = -1;
	aTag.text = "Seleccione club";
	miSelect.appendChild(aTag);
	for (var i=0; i<arrClubes.length; i++){
		aTag = document.createElement('option');
		aTag.value = arrClubes[i].codclub;
		aTag.text = arrClubes[i].nomclub;
		//aTag.setAttribute('club',arrClubes[i].codclub);
		//aTag.innerHTML = arrClubes[i].nomclub;
		miSelect.appendChild(aTag);
	}
	if (arrClubes.length>1){
		aTag = document.createElement('option');
		aTag.value = 999;
		aTag.text = "Todos los clubes";
		miSelect.appendChild(aTag);
	}
	return arrClubes.length;
}

function CargarSocios(anio, codProv, codClub){
	arrSocios=[];
	var miSelect = document.getElementById("socio");
	miSelect.length = 0;
	for (var i=0; i<arrPalomares.length; i++){
		if (codClub == 999){
			if ((arrPalomares[i].activo==true)&&(arrPalomares[i].codprov==codProv)&&(arrPalomares[i].anio==anio)){
				var nuevo={codsocio:i,socio:'('+arrPalomares[i].codclub+') '+arrPalomares[i].socio,latgr:arrPalomares[i].latgr,longr:arrPalomares[i].longr,codprov:arrPalomares[i].codprov,provclub:arrPalomares[i].provclub,codclub:arrPalomares[i].codclub,nomclub:arrPalomares[i].nomclub,socio:arrPalomares[i].socio,loc:arrPalomares[i].loc,prov:arrPalomares[i].prov,utmx:arrPalomares[i].utmx,utmy:arrPalomares[i].utmy,huso:arrPalomares[i].huso};
				arrSocios.push(nuevo);
			}
		} else {
			if ((arrPalomares[i].activo==true)&&(arrPalomares[i].codprov==codProv)&&(arrPalomares[i].anio==anio)&&(arrPalomares[i].codclub==codClub)){
				var nuevo={codsocio:i,socio:'('+arrPalomares[i].codclub+') '+arrPalomares[i].socio,latgr:arrPalomares[i].latgr,longr:arrPalomares[i].longr,codprov:arrPalomares[i].codprov,provclub:arrPalomares[i].provclub,codclub:arrPalomares[i].codclub,nomclub:arrPalomares[i].nomclub,socio:arrPalomares[i].socio,loc:arrPalomares[i].loc,prov:arrPalomares[i].prov,utmx:arrPalomares[i].utmx,utmy:arrPalomares[i].utmy,huso:arrPalomares[i].huso};
				arrSocios.push(nuevo);
			}
		}
	}
	//arrSocios.sort((a, b) => (a.socio > b.socio) ? 1 : -1);
	arrSocios.sort((a, b) => (a.socio).localeCompare(b.socio));
	//document.querySelector('#socio').innerHTML = '';
	var aTag = document.createElement('option');
	aTag.value = -1;
	aTag.text = "Seleccione socio";
	miSelect.appendChild(aTag);
	for (var i=0; i<arrSocios.length; i++){
		aTag = document.createElement('option');
		aTag.value = arrSocios[i].codsocio;
		if (codClub == 999){
			aTag.text = "(" + arrSocios[i].codclub + ") "+ arrSocios[i].socio;
		} else {
			aTag.text = arrSocios[i].socio;
		}
		miSelect.appendChild(aTag);
	}
	aTag = document.createElement('option');
	aTag.value = 999;
	aTag.text = "Todos los socios";
	miSelect.appendChild(aTag);
	return arrSocios.length;
}

function CentraSocio(codSocio, codProv){
	switch(parseInt(codSocio)){
			case -1:
				break;
			case 999:
				Centrar(codProv, "1");
				break;
			default:
				map.setView([arrPalomares[codSocio].latgr.replace(",","."), arrPalomares[codSocio].longr.replace(",",".")], 20, { animation: true });
	}
}

function CargarPalomar(socio){
	var color;
	switch(arrPalomares[socio].codclub){
		case 160: //Castilla
			color=violetIcon;
			break;
		case 161: //Salmantino
			color=yellowIcon;
			break;
		case 162: //San Francisco
			color=orangeIcon;
			break;
		case 163: //Leonés
			color=redIcon;
			break;
		case 164: //Zamora
			color=blueIcon;
			break;
		case 165: //Bellota Charra
			color=greenIcon;
			break;
		case 167: //Cigales
			color=greyIcon;
			break;
		default:
			color=redIcon;
	}
	//var marker = new L.Marker(e.latlng, {draggable:true});
	if (arrPalomares[socio].huso==arrPalomares[socio].huso2){
		var txtUTM="UTM: X="+parseFloat(arrPalomares[socio].utmx.replace(",",".")).toFixed(2)+", Y="+parseFloat(arrPalomares[socio].utmy.replace(",",".")).toFixed(2)+", HUSO: "+arrPalomares[socio].huso;
	} else {
		var txtUTM = "UTM: X="+parseFloat(arrPalomares[socio].utmx.replace(",",".")).toFixed(2)+", Y="+parseFloat(arrPalomares[socio].utmy.replace(",",".")).toFixed(2)+", HUSO: "+arrPalomares[socio].huso+"<br>UTM: X="+parseFloat(arrPalomares[socio].utmx2.replace(",",".")).toFixed(2)+", Y="+parseFloat(arrPalomares[socio].utmy2.replace(",",".")).toFixed(2)+", HUSO: "+arrPalomares[socio].huso2;
	}
	var marker = new L.marker([arrPalomares[socio].latgr.replace(",","."),arrPalomares[socio].longr.replace(",",".")], {icon: color}, {title: arrPalomares[socio].socio,draggable:true,opacity:1}).bindPopup("CLUB: "+arrPalomares[socio].codclub+" - "+arrPalomares[socio].nomclub+" ("+arrPalomares[socio].provclub+")<br>PALOMAR: "+arrPalomares[socio].socio+"<br>LOCALIDAD: "+arrPalomares[socio].loc+" ("+arrPalomares[socio].prov+")<br><br>"+txtUTM+"<br>GEO: LAT="+parseFloat(arrPalomares[socio].latgr.replace(",",".")).toFixed(12)+", LON="+parseFloat(arrPalomares[socio].longr.replace(",",".")).toFixed(12)+"<br>GEO: LAT="+DegToDMS(arrPalomares[socio].latgr,5)+", LON="+DegToDMS(arrPalomares[socio].longr,5));
	map.addLayer(marker);
	//arrMarkers[marker._leaflet_id] = marker;
	arrMarkers.push(marker);
}	

function TrataSocio(socio, psuelta, codProv){
	if (socio != 999){
		CargarPalomar(socio);
		CentraSocio(socio, codProv);
	} else {
		for (var i=0; i<arrSocios.length; i++){
			CargarPalomar(arrSocios[i].codsocio);
		}
	}
}

function DegToDMS (deg, dplaces=0){
	if (!isNaN(deg) && String(deg).includes('.')) {
		var d = Math.abs(Math.trunc(parseFloat(deg))); //grados
		var m = Math.trunc(((Math.abs(parseFloat(deg)) - d) * 60)); //minutos
		var s = (Math.abs(parseFloat(deg)) - d - (m / 60)) * 3600; //segundos
		return (parseFloat(deg) < 0) ? (-d + "° " + m + "' " + s.toFixed(dplaces) + '"') : (d + "° " + m + "' " + s.toFixed(dplaces) + '"'); //salida en formato º ' "
	} else { //el separador decimal es la coma
		var d = Math.abs(Math.trunc(parseFloat(deg.replace(',','.')))); //grados
		var m = Math.trunc(((Math.abs(parseFloat(deg.replace(',','.'))) - d) * 60)); //minutos
		var s = (Math.abs(parseFloat(deg.replace(',','.'))) - d - (m / 60)) * 3600; //segundos
		return (parseFloat(deg.replace(',','.')) < 0) ? (-d + "° " + m + "' " + s.toFixed(dplaces) + '"') : (d + "° " + m + "' " + s.toFixed(dplaces) + '"'); //salida en formato º ' "
	}
}

function DMSToDeg(degrees, minutes, seconds, direction){
	if (!isNaN(deg) && String(deg).includes('.')) {
		var neseconds=parseFloat(seconds);
	} else { //el separador decimal es la coma
		var neseconds=parseFloat(seconds.replace(',','.'));
	}
	let dd = degrees + minutes / 60 + nseconds / (60 * 60);
	if (direction == 'S' || direction == 'W'){
		dd = dd * -1;
	} // Don't do anything for N or E
	return dd;
}

function BorrarPalomares(){
	for (var i=0; i<arrMarkers.length; i++){
		map.removeLayer(arrMarkers[i]);
		delete arrMarkers[i];
	}
	arrMarkers=[];
}

function BorrarPuntoSuelta(){
	for (var i=0; i<arrPuntoSuelta.length; i++){
		map.removeLayer(arrPuntoSuelta[i]);
		delete arrPuntoSuelta[i];
	}
	arrPuntoSuelta=[];
}

function cargarSueltas_old(anio, codprov, codsuelta){
	arrPSuelta=[];
	var miSelect = document.getElementById("psuelta");
	for (var i=0; i<arrSueltas.length; i++){
		if ((arrSueltas[i].activo==true)&&(arrSueltas[i].anio==anio)&&(arrSueltas[i].codprov==codprov)){
			var nuevo={codsuelta:i,suelta:arrSueltas[i].suelta,provsuelta:arrSueltas[i].provsuelta,abrprovsuelta:arrSueltas[i].abrprovsuelta,fsuelta:arrSueltas[i].fsuelta,hsuelta:arrSueltas[i].hsuelta,comunidad:arrSueltas[i].comunidad,utmx:arrSueltas[i].utmx,utmy:arrSueltas[i].utmy,huso:arrSueltas[i].huso,latgr:arrSueltas[i].latgr,longr:arrSueltas[i].longr};
			arrPSuelta.push(nuevo);
		}
	}
	//arrPSuelta.sort((a, b) => (a.suelta > b.suelta) ? 1 : -1);
	arrPSuelta.sort((a, b) => (a.suelta).localeCompare(b.suelta));
	document.querySelector('#psuelta').innerHTML = '';
	var aTag = document.createElement('option');
	aTag.value = -1;
	aTag.text = "Seleccione punto suelta";
	miSelect.appendChild(aTag);
	for (var i=0; i<arrPSuelta.length; i++){
		aTag = document.createElement('option');
		aTag.title = arrPSuelta[i].fsuelta;
		aTag.value = arrPSuelta[i].codsuelta;
		aTag.text = arrPSuelta[i].suelta+" ["+arrPSuelta[i].abrprovsuelta+"]";
		miSelect.appendChild(aTag);
	}
	aTag = document.createElement('option');
	aTag.value = 999;
	aTag.text = "Todos los puntos suelta";
	miSelect.appendChild(aTag);
	aTag = document.createElement('option');
	aTag.value = 888;
	aTag.text = "Crear un punto suelta";
	miSelect.appendChild(aTag);
	return arrPSuelta.length;
}

function cargarSueltas(anio, codprov, codsuelta){
	arrPSuelta=[];
	var miSelect = document.getElementById("psuelta");
	for (var i=0; i<arrSueltas.length; i++){
		if ((arrSueltas[i].activo==true)&&(arrSueltas[i].anio==anio)&&(arrSueltas[i].codprov==codprov)){
			var nuevo={codsuelta:i,suelta:arrSueltas[i].suelta,provsuelta:arrSueltas[i].provsuelta,abrprovsuelta:arrSueltas[i].abrprovsuelta,fsuelta:arrSueltas[i].fsuelta,comunidad:arrSueltas[i].comunidad,utmx:arrSueltas[i].utmx,utmy:arrSueltas[i].utmy,huso:arrSueltas[i].huso,latgr:arrSueltas[i].latgr,longr:arrSueltas[i].longr};
			arrPSuelta.push(nuevo);
		}
	}
	//arrPSuelta.sort((a, b) => (a.fsuelta > b.fsuelta) ? 1 : -1);
	//arrPSuelta.sort((a, b) => (a.fsuelta).localeCompare(b.fsuelta));
	arrPSuelta.sort(function (a, b) {
		a = a.fsuelta.split('/');
		b = b.fsuelta.split('/');
		return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
	});
	document.querySelector('#psuelta').innerHTML = '';
	miSelect.appendChild(new Option("Seleccione opción", -1));
	var optGroup = document.createElement('optgroup');
	optGroup.setAttribute('label', 'Sueltas activas');
	for (var i=0; i<arrPSuelta.length; i++){
		//var myOption = new Option(arrPSuelta[i].fsuelta+" "+"["+arrPSuelta[i].abrprovsuelta+"] "+arrPSuelta[i].suelta, arrPSuelta[i].codsuelta);
		var myOption = new Option(arrPSuelta[i].fsuelta+" "+arrPSuelta[i].suelta, arrPSuelta[i].codsuelta);
		myOption.setAttribute('title',arrPSuelta[i].provsuelta);
		//optGroup.appendChild(new Option("["+arrPSuelta[i].abrprovsuelta+"] "+arrPSuelta[i].suelta, arrPSuelta[i].codsuelta));
		optGroup.appendChild(myOption);
	}
	optGroup.appendChild(new Option("Todos los puntos suelta", 999));
	miSelect.appendChild(optGroup);
	optGroup = document.createElement('optgroup');
	optGroup.setAttribute('label', 'Nueva suelta');
	optGroup.appendChild(new Option("Crear un punto de suelta", 888));
	miSelect.appendChild(optGroup);
	return arrPSuelta.length;
}

function marcarPuntoSuelta(psuelta, codClub){
	var color;
	switch(parseInt(codClub)) {
		case 160: //Castilla
			color=violetIcon;
			break;
		case 161: //Salmantino
			color=yellowIcon;
			break;
		case 162: //San Francisco
			color=orangeIcon;
			break;
		case 163: //Leonés
			color=redIcon;
			break;
		case 164: //Zamora
			color=blueIcon;
			break;
		case 165: //Bellota Charra
			color=greenIcon;
			break;
		case 167: //Cigales
			color=greyIcon;
			break;
		default:
			color=redIcon;
	}
	if(arrSueltas[psuelta].huso==arrSueltas[psuelta].huso2){
		var txtUTM = "UTM: X="+parseFloat(arrSueltas[psuelta].utmx.replace(",",".")).toFixed(2)+", Y="+parseFloat(arrSueltas[psuelta].utmy.replace(",",".")).toFixed(2)+", HUSO: "+arrSueltas[psuelta].huso;
	} else {
		txtUTM = "UTM: X="+parseFloat(arrSueltas[psuelta].utmx.replace(",",".")).toFixed(2)+", Y="+parseFloat(arrSueltas[psuelta].utmy.replace(",",".")).toFixed(2)+", HUSO: "+arrSueltas[psuelta].huso+"<br>UTM: X="+parseFloat(arrSueltas[psuelta].utmx2.replace(",",".")).toFixed(2)+", Y="+parseFloat(arrSueltas[psuelta].utmy2.replace(",",".")).toFixed(2)+", HUSO: "+arrSueltas[psuelta].huso2;
	}
	var marker = new L.marker([arrSueltas[psuelta].latgr.replace(",","."),arrSueltas[psuelta].longr.replace(",",".")], {icon: color}, {title: arrSueltas[psuelta].suelta,draggable:true,opacity:1}).bindPopup("SUELTA: "+arrSueltas[psuelta].suelta+"<br>PROVINCIA: "+arrSueltas[psuelta].provsuelta+" ("+arrSueltas[psuelta].comunidad+")<br>FECHA: "+arrSueltas[psuelta].fsuelta+", HORA: "+arrSueltas[psuelta].hsuelta+"<br><br>"+txtUTM+"<br>GEO: LAT="+parseFloat(arrSueltas[psuelta].latgr.replace(",",".")).toFixed(12)+", LON="+parseFloat(arrSueltas[psuelta].longr.replace(",",".")).toFixed(12)+"<br>GEO: LAT="+DegToDMS(arrSueltas[psuelta].latgr,5)+", LON="+DegToDMS(arrSueltas[psuelta].longr,5));
	map.addLayer(marker);
	arrPuntoSuelta.push(marker);
	map.setView([arrSueltas[psuelta].latgr.replace(",","."), arrSueltas[psuelta].longr.replace(",",".")], 20, { animation: true });
}

function CentraPuntoSuelta(psuelta, codSocio){
	if ((psuelta != 999)&&(psuelta != -1)){
		map.setView([arrSueltas[psuelta].latgr.replace(",","."), arrSueltas[psuelta].longr.replace(",",".")], 20, { animation: true });
	} else {
		map.setView([40.239748, -4.239292], 6, { animation: true }); //centro península
	}
}

function TrataPuntoSuelta(anio, codProv, codClub, psuelta){
	if (psuelta != 999){
		marcarPuntoSuelta(psuelta, codClub);
		CentraPuntoSuelta(psuelta);
	} else{
		for (var i=0; i<arrPSuelta.length; i++){
			marcarPuntoSuelta(arrPSuelta[i].codsuelta, codClub);
		}
		CentraPuntoSuelta(psuelta);
	}
}

function CalcularDistancia(anio, codProv, codClub, nsocio, psuelta){
	var distanciaEuclides = $('#sortEuclides').DataTable();
	var distanciaHaversine = $('#sortHaversine').DataTable();
	$('#datosdistancia_euclides').empty();
	$('#datosdistancia_haversine').empty();
	$('#title_table_Euclides').empty();
	$('#title_table_Haversine').empty();
	distanciaEuclides.clear();
	distanciaHaversine.clear();
	switch(parseInt(psuelta)){
		case -1:
			break;
		case 999:
			if ((nsocio != 999) && (nsocio != -1)){ // 1 socio n puntos de suelta
				AddTextEuclides('Distancia desde el palomar de<br><b>'+arrPalomares[nsocio].socio+'</b><br>hasta ');
				AddTextHaversine('Distancia desde el palomar de<br><b>'+arrPalomares[nsocio].socio+'</b><br>hasta ');
				for (var i=0; i<arrPSuelta.length; i++){
					var from = turf.point([arrPalomares[nsocio].latgr.replace(",","."), arrPalomares[nsocio].longr.replace(",",".")]);
					var to = turf.point([arrPSuelta[i].latgr.replace(",","."), arrPSuelta[i].longr.replace(",",".")]);
					//var options = {units: 'metres'};
					//var distance = turf.distance(from, to, options);
					var distance = HaversineDistance([arrPalomares[nsocio].latgr.replace(",","."), arrPalomares[nsocio].longr.replace(",",".")],[arrPSuelta[i].latgr.replace(",","."), arrPSuelta[i].longr.replace(",",".")]);
					var distance_utm = Math.sqrt(Math.pow(arrPSuelta[i].utmx.replace(",",".")-arrPalomares[nsocio].utmx.replace(",","."), 2)+Math.pow(arrPSuelta[i].utmy.replace(",",".")-arrPalomares[nsocio].utmy.replace(",","."), 2));
					//addToMap
					var milinea = new L.Polyline([new L.LatLng(arrPSuelta[i].latgr.replace(",","."), arrPSuelta[i].longr.replace(",",".")), new L.LatLng(arrPalomares[nsocio].latgr.replace(",","."), arrPalomares[nsocio].longr.replace(",","."))], {
						color: 'red',
						weight: 5,
						opacity: 0.5,
						smoothFactor: 1
					}).bindPopup('Distancia desde el palomar de<br><b>'+arrPalomares[nsocio].socio+'</b><br>hasta<br><b>'+arrPSuelta[i].suelta+' ('+arrPSuelta[i].provsuelta+'):</b><br><br><a href="https://es.wikipedia.org/wiki/Distancia_euclidiana" target="_blank">Euclides</a><br><ul style="list-style-position: inside;padding-left: 0;"><li><b>'+parseFloat(distance_utm).toFixed(4)+'</b> metros</li><li><b>'+parseFloat(distance_utm/1000).toFixed(4)+'</b> km</li></ul><a href="https://es.wikipedia.org/wiki/F%C3%B3rmula_del_semiverseno" target="_blank">Haversine:</a><br><ul style="list-style-position: inside;padding-left: 0;"><li><b>'+parseFloat(distance).toFixed(4)+'</b> metros</li><li><b>'+parseFloat(distance/1000).toFixed(4)+'</b> km</li></ul>');
					milinea.addTo(map);
					polylines.push(milinea);
					AddTextEuclides('<b><a href="javascript:CentraPuntoSuelta('+arrPSuelta[i].codsuelta+', '+nsocio+');">'+arrPSuelta[i].suelta+' ('+arrPSuelta[i].provsuelta+'):</a></b><br><ul style="list-style-position: inside;padding-left: 0;"><li><b>'+parseFloat(distance_utm).toFixed(4)+'</b> metros</li><li><b>'+parseFloat(distance_utm/1000).toFixed(4)+'</b> km</li></ul>');
					AddTextHaversine('<b><a href="javascript:CentraPuntoSuelta('+arrPSuelta[i].codsuelta+', '+nsocio+');">'+arrPSuelta[i].suelta+' ('+arrPSuelta[i].provsuelta+'):</a></b><br><ul style="list-style-position: inside;padding-left: 0;"><li><b>'+parseFloat(distance).toFixed(4)+'</b> metros</li><li><b>'+parseFloat(distance/1000).toFixed(4)+'</b> km</li></ul>');
					distanciaEuclides.row.add([arrPSuelta[i].suelta+' ('+arrPSuelta[i].provsuelta+')', parseFloat(distance_utm).toFixed(4), parseFloat(distance_utm/1000).toFixed(4)]);
					distanciaHaversine.row.add([arrPSuelta[i].suelta+' ('+arrPSuelta[i].provsuelta+')', parseFloat(distance).toFixed(4), parseFloat(distance/1000).toFixed(4)]);
				}
				$("#title_table_Euclides").append('Distancias desde el palomar de '+arrPalomares[nsocio].socio+', año '+anio);
				distanciaEuclides.columns(0).header().to$().text('Suelta');
				distanciaEuclides.columns.adjust().draw();
				//distanciaEuclides.draw();
				$("#title_table_Haversine").append('Distancias desde el palomar de '+arrPalomares[nsocio].socio+', año '+anio);
				distanciaHaversine.columns(0).header().to$().text('Suelta');
				distanciaHaversine.columns.adjust().draw();
			}
 			break;
		default:
			if ((nsocio == 999)&&(nsocio != -1)&&(psuelta != 888)){ // 1 punto de suelta n socios
				AddTextEuclides('Distancia desde<br><b>'+arrSueltas[psuelta].suelta+'</b><br>hasta el palomar de');
				AddTextHaversine('Distancia desde<br><b>'+arrSueltas[psuelta].suelta+'</b><br>hasta el palomar de');
				for (var i=0; i<arrSocios.length; i++){
					var from = turf.point([arrSueltas[psuelta].latgr.replace(",","."), arrSueltas[psuelta].longr.replace(",",".")]);
					var to = turf.point([arrSocios[i].latgr.replace(",","."), arrSocios[i].longr.replace(",",".")]);
					//var options = {units: 'metres'};
					//var distance = turf.distance(from, to, options);
					var distance = HaversineDistance([arrSueltas[psuelta].latgr.replace(",","."), arrSueltas[psuelta].longr.replace(",",".")],[arrSocios[i].latgr.replace(",","."), arrSocios[i].longr.replace(",",".")]);
					var distance_utm = Math.sqrt(Math.pow(arrSueltas[psuelta].utmx.replace(",",".")-arrSocios[i].utmx.replace(",","."), 2)+Math.pow(arrSueltas[psuelta].utmy.replace(",",".")-arrSocios[i].utmy.replace(",","."), 2));
					//addToMap
					var milinea = new L.Polyline([new L.LatLng(arrSueltas[psuelta].latgr.replace(",","."), arrSueltas[psuelta].longr.replace(",",".")), new L.LatLng(arrSocios[i].latgr.replace(",","."), arrSocios[i].longr.replace(",","."))], {
						color: 'red',
						weight: 5,
						opacity: 0.5,
						smoothFactor: 1
					}).bindPopup('Distancia desde<br><b>'+arrSueltas[psuelta].suelta+' ('+arrSueltas[psuelta].provsuelta+')</b><br>hasta el palomar de<br><b>'+arrSocios[i].socio+':</b><br><br><a href="https://es.wikipedia.org/wiki/Distancia_euclidiana" target="_blank">Euclides</a><br><ul style="list-style-position: inside;padding-left: 0;"><li><b>'+parseFloat(distance_utm).toFixed(4)+'</b> metros</li><li><b>'+parseFloat(distance_utm/1000).toFixed(4)+'</b> km</li></ul><a href="https://es.wikipedia.org/wiki/F%C3%B3rmula_del_semiverseno" target="_blank">Haversine:</a><br><ul style="list-style-position: inside;padding-left: 0;"><li><b>'+parseFloat(distance).toFixed(4)+'</b> metros</li><li><b>'+parseFloat(distance/1000).toFixed(4)+'</b> km</li></ul>');
					milinea.addTo(map);
					polylines.push(milinea);
					AddTextEuclides('<b><a href="javascript:CentraSocio('+arrSocios[i].codsocio+', '+codProv+');">'+arrSocios[i].socio+':</a></b><br><ul style="list-style-position: inside;padding-left: 0;"><li><b>'+parseFloat(distance_utm).toFixed(4)+'</b> metros</li><li><b>'+parseFloat(distance_utm/1000).toFixed(4)+'</b> km</li></ul>');
					AddTextHaversine('<b><a href="javascript:CentraSocio('+arrSocios[i].codsocio+', '+codProv+');">'+arrSocios[i].socio+':</a></b><br><ul style="list-style-position: inside;padding-left: 0;"><li><b>'+parseFloat(distance).toFixed(4)+'</b> metros</li><li><b>'+parseFloat(distance/1000).toFixed(4)+'</b> km</li></ul>');
					distanciaEuclides.row.add([arrSocios[i].socio, parseFloat(distance_utm).toFixed(4), parseFloat(distance_utm/1000).toFixed(4)]);
					distanciaHaversine.row.add([arrSocios[i].socio, parseFloat(distance).toFixed(4), parseFloat(distance/1000).toFixed(4)]);
				}
				$("#title_table_Euclides").append('Distancias desde '+arrSueltas[psuelta].suelta+' ('+arrSueltas[psuelta].provsuelta+')'+', año '+anio);
				distanciaEuclides.columns(0).header().to$().text('Palomar');
				distanciaEuclides.columns.adjust().draw();
				//distanciaEuclides.draw();
				$("#title_table_Haversine").append('Distancias desde '+arrSueltas[psuelta].suelta+' ('+arrSueltas[psuelta].provsuelta+')'+', año '+anio);
				distanciaHaversine.columns(0).header().to$().text('Palomar');
				distanciaHaversine.columns.adjust().draw();
			} else if ((nsocio == 999)&&(psuelta == 888)){ // 1 punto de suelta creado por el usuario n socios
alert ("El cálculo de la distancia euclidiana desde un punto creado por el usuario no está implementado. Revise las distancias por Haversine");
				AddTextEuclides('Distancia desde<br><b>Punto usuario</b><br>hasta el palomar de');
				AddTextHaversine('Distancia desde<br><b>Punto usuario</b><br>hasta el palomar de');
				for (var i=0; i<arrSocios.length; i++){
					var from = turf.point([theMarker._latlng.lat, theMarker._latlng.lng]);
					var to = turf.point([arrSocios[i].latgr.replace(",","."), arrSocios[i].longr.replace(",",".")]);
					//var options = {units: 'metres'};
					//var distance = turf.distance(from, to, options);
					var distance = HaversineDistance([theMarker._latlng.lat, theMarker._latlng.lng],[arrSocios[i].latgr.replace(",","."), arrSocios[i].longr.replace(",",".")]);
var distance_utm = 0//Math.sqrt(Math.pow(arrSueltas[psuelta].utmx.replace(",",".")-arrSocios[i].utmx.replace(",","."), 2)+Math.pow(arrSueltas[psuelta].utmy.replace(",",".")-arrSocios[i].utmy.replace(",","."), 2));
					//addToMap
					var milinea = new L.Polyline([new L.LatLng(theMarker._latlng.lat, theMarker._latlng.lng), new L.LatLng(arrSocios[i].latgr.replace(",","."), arrSocios[i].longr.replace(",","."))], {
						color: 'red',
						weight: 5,
						opacity: 0.5,
						smoothFactor: 1
					}).bindPopup('Distancia desde<br><b>Punto usuario</b><br>hasta el palomar de<br><b>'+arrSocios[i].socio+':</b><br><br><a href="https://es.wikipedia.org/wiki/Distancia_euclidiana" target="_blank">Euclides</a><br><ul style="list-style-position: inside;padding-left: 0;"><li><b>'+parseFloat(distance_utm).toFixed(4)+'</b> metros</li><li><b>'+parseFloat(distance_utm/1000).toFixed(4)+'</b> km</li></ul><a href="https://es.wikipedia.org/wiki/F%C3%B3rmula_del_semiverseno" target="_blank">Haversine:</a><br><ul style="list-style-position: inside;padding-left: 0;"><li><b>'+parseFloat(distance).toFixed(4)+'</b> metros</li><li><b>'+parseFloat(distance/1000).toFixed(4)+'</b> km</li></ul>');
					milinea.addTo(map);
					polylines.push(milinea);
					AddTextEuclides('<b><a href="javascript:CentraSocio('+arrSocios[i].codsocio+', '+codProv+');">'+arrSocios[i].socio+':</a></b><br><ul style="list-style-position: inside;padding-left: 0;"><li><b>'+parseFloat(distance_utm).toFixed(4)+'</b> metros</li><li><b>'+parseFloat(distance_utm/1000).toFixed(4)+'</b> km</li></ul>');
					AddTextHaversine('<b><a href="javascript:CentraSocio('+arrSocios[i].codsocio+', '+codProv+');">'+arrSocios[i].socio+':</a></b><br><ul style="list-style-position: inside;padding-left: 0;"><li><b>'+parseFloat(distance).toFixed(4)+'</b> metros</li><li><b>'+parseFloat(distance/1000).toFixed(4)+'</b> km</li></ul>');
					distanciaEuclides.row.add([arrSocios[i].socio, parseFloat(distance_utm).toFixed(4), parseFloat(distance_utm/1000).toFixed(4)]);
					distanciaHaversine.row.add([arrSocios[i].socio, parseFloat(distance).toFixed(4), parseFloat(distance/1000).toFixed(4)]);
				}
				$("#title_table_Euclides").append('Distancias desde Punto usuario, año '+anio);
				distanciaEuclides.columns(0).header().to$().text('Palomar');
				distanciaEuclides.columns.adjust().draw();
				//distanciaEuclides.draw();
				$("#title_table_Haversine").append('Distancias desde Punto usuario, año '+anio);
				distanciaHaversine.columns(0).header().to$().text('Palomar');
				distanciaHaversine.columns.adjust().draw();				
			} else { // 1 punto de suelta 1 socio
				if (psuelta != 888){ //punto de suelta fijo
					var from = turf.point([arrSueltas[psuelta].latgr.replace(",","."), arrSueltas[psuelta].longr.replace(",",".")]);
					var to = turf.point([arrPalomares[nsocio].latgr.replace(",","."), arrPalomares[nsocio].longr.replace(",",".")]);
					//var options = {units: 'metres'};
					//var distance = turf.distance(from, to, options);
					var distance = HaversineDistance([arrSueltas[psuelta].latgr.replace(",","."), arrSueltas[psuelta].longr.replace(",",".")],[arrPalomares[nsocio].latgr.replace(",","."), arrPalomares[nsocio].longr.replace(",",".")]);
					var distance_utm = Math.sqrt(Math.pow(arrSueltas[psuelta].utmx.replace(",",".")-arrPalomares[nsocio].utmx.replace(",","."), 2)+Math.pow(arrSueltas[psuelta].utmy.replace(",",".")-arrPalomares[nsocio].utmy.replace(",","."), 2));
					//addToMap
					var milinea = new L.Polyline([new L.LatLng(arrSueltas[psuelta].latgr.replace(",","."), arrSueltas[psuelta].longr.replace(",",".")), new L.LatLng(arrPalomares[nsocio].latgr.replace(",","."), arrPalomares[nsocio].longr.replace(",","."))], {
						color: 'red',
						weight: 5,
						opacity: 0.5,
						smoothFactor: 1
					}).bindPopup('Distancia desde<br><b>'+arrSueltas[psuelta].suelta+' ('+arrSueltas[psuelta].provsuelta+')</b><br>hasta el palomar de<br><b>'+arrPalomares[nsocio].socio+':</b><br><br><a href="https://es.wikipedia.org/wiki/Distancia_euclidiana" target="_blank">Euclides:</a><br><ul style="list-style-position: inside;padding-left: 0;"><li><b>'+parseFloat(distance_utm).toFixed(4)+'</b> metros</li><li><b>'+parseFloat(distance_utm/1000).toFixed(4)+'</b> km</li></ul><a href="https://es.wikipedia.org/wiki/F%C3%B3rmula_del_semiverseno" target="_blank">Haversine:</a><br><ul style="list-style-position: inside;padding-left: 0;"><li><b>'+parseFloat(distance).toFixed(4)+'</b> metros</li><li><b>'+parseFloat(distance/1000).toFixed(4)+'</b> km</li></ul>');
					milinea.addTo(map);
					polylines.push(milinea);
					AddTextEuclides('Distancia desde<br><b>'+arrSueltas[psuelta].suelta+' ('+arrSueltas[psuelta].provsuelta+')</b><br>hasta el palomar de<br><b>'+arrPalomares[nsocio].socio+':</b><br><ul style="list-style-position: inside;padding-left: 0;"><li><b>'+parseFloat(distance_utm).toFixed(4)+'</b> metros</li><li><b>'+parseFloat(distance_utm/1000).toFixed(4)+'</b> km</li></ul>');
					AddTextHaversine('Distancia desde<br><b>'+arrSueltas[psuelta].suelta+' ('+arrSueltas[psuelta].provsuelta+')</b><br>hasta el palomar de<br><b>'+arrPalomares[nsocio].socio+':</b><br><ul style="list-style-position: inside;padding-left: 0;"><li><b>'+parseFloat(distance).toFixed(4)+'</b> metros</li><li><b>'+parseFloat(distance/1000).toFixed(4)+'</b> km</li></ul>');
					distanciaEuclides.row.add([arrPalomares[nsocio].socio, parseFloat(distance_utm).toFixed(4), parseFloat(distance_utm/1000).toFixed(4)]);
					distanciaHaversine.row.add([arrPalomares[nsocio].socio, parseFloat(distance).toFixed(4), parseFloat(distance/1000).toFixed(4)]);
					$("#title_table_Euclides").append('Distancias desde '+arrSueltas[psuelta].suelta+' ('+arrSueltas[psuelta].provsuelta+')'+', año '+anio);
					distanciaEuclides.columns(0).header().to$().text('Palomar');
					distanciaEuclides.columns.adjust().draw();
					$("#title_table_Haversine").append('Distancias desde '+arrSueltas[psuelta].suelta+' ('+arrSueltas[psuelta].provsuelta+')'+', año '+anio);
					distanciaHaversine.columns(0).header().to$().text('Palomar');
					distanciaHaversine.columns.adjust().draw();
				} else { //punto de suelta creado por el usuario 1 socio
alert ("El cálculo de la distancia euclidiana desde un punto creado por el usuario no está implementado. Revise las distancias por Haversine");
					var from = turf.point([theMarker._latlng.lat, theMarker._latlng.lng]);
					var to = turf.point([arrPalomares[nsocio].latgr.replace(",","."), arrPalomares[nsocio].longr.replace(",",".")]);
					//var options = {units: 'metres'};
					//var distance = turf.distance(from, to, options);
					var distance = HaversineDistance([theMarker._latlng.lat, theMarker._latlng.lng],[arrPalomares[nsocio].latgr.replace(",","."), arrPalomares[nsocio].longr.replace(",",".")]);
var distance_utm = 0; //Math.sqrt(Math.pow(arrSueltas[psuelta].utmx.replace(",",".")-arrPalomares[nsocio].utmx.replace(",","."), 2)+Math.pow(arrSueltas[psuelta].utmy.replace(",",".")-arrPalomares[nsocio].utmy.replace(",","."), 2));
					//addToMap
					var milinea = new L.Polyline([new L.LatLng(theMarker._latlng.lat, theMarker._latlng.lng), new L.LatLng(arrPalomares[nsocio].latgr.replace(",","."), arrPalomares[nsocio].longr.replace(",","."))], {
						color: 'red',
						weight: 5,
						opacity: 0.5,
						smoothFactor: 1
					}).bindPopup('Distancia desde<br><b>Punto usuario</b><br>hasta el palomar de<br><b>'+arrPalomares[nsocio].socio+':</b><br><br><a href="https://es.wikipedia.org/wiki/Distancia_euclidiana" target="_blank">Euclides:</a><br><ul style="list-style-position: inside;padding-left: 0;"><li><b>'+parseFloat(distance_utm).toFixed(4)+'</b> metros</li><li><b>'+parseFloat(distance_utm/1000).toFixed(4)+'</b> km</li></ul><a href="https://es.wikipedia.org/wiki/F%C3%B3rmula_del_semiverseno" target="_blank">Haversine:</a><br><ul style="list-style-position: inside;padding-left: 0;"><li><b>'+parseFloat(distance).toFixed(4)+'</b> metros</li><li><b>'+parseFloat(distance/1000).toFixed(4)+'</b> km</li></ul>');
					milinea.addTo(map);
					polylines.push(milinea);
					AddTextEuclides('Distancia desde<br><b>Punto usuario</b><br>hasta el palomar de<br><b>'+arrPalomares[nsocio].socio+':</b><br><ul style="list-style-position: inside;padding-left: 0;"><li><b>'+parseFloat(distance_utm).toFixed(4)+'</b> metros</li><li><b>'+parseFloat(distance_utm/1000).toFixed(4)+'</b> km</li></ul>');
					AddTextHaversine('Distancia desde<br><b>Punto usuario</b><br>hasta el palomar de<br><b>'+arrPalomares[nsocio].socio+':</b><br><ul style="list-style-position: inside;padding-left: 0;"><li><b>'+parseFloat(distance).toFixed(4)+'</b> metros</li><li><b>'+parseFloat(distance/1000).toFixed(4)+'</b> km</li></ul>');
					distanciaEuclides.row.add([arrPalomares[nsocio].socio, parseFloat(distance_utm).toFixed(4), parseFloat(distance_utm/1000).toFixed(4)]);
					distanciaHaversine.row.add([arrPalomares[nsocio].socio, parseFloat(distance).toFixed(4), parseFloat(distance/1000).toFixed(4)]);
					$("#title_table_Euclides").append('Distancias desde Punto usuario, año '+anio);
					distanciaEuclides.columns(0).header().to$().text('Palomar');
					distanciaEuclides.columns.adjust().draw();
					$("#title_table_Haversine").append('Distancias desde Punto usuario, año '+anio);
					distanciaHaversine.columns(0).header().to$().text('Palomar');
					distanciaHaversine.columns.adjust().draw();
				}
			}
	}
}

function AddTextEuclides(texto){
	$('<p>' +texto+'</p>').appendTo('#datosdistancia_euclides');
}
function AddTextHaversine(texto){
	$('<p>' +texto+'</p>').appendTo('#datosdistancia_haversine');
}

function round(num) {
	//redondeo a dos decimales
	num=num.replace(',','.')
	var m = Number((Math.abs(num) * 100).toPrecision(15));
	return (Math.round(m) / 100 * Math.sign(num)).toString().replace('.',',');
}

function marcarPuntoSueltaManual(latgr, longr, codClub){
	var color;
	switch(parseInt(codClub)) {
		case 160: //Castilla
			color=violetIcon;
			break;
		case 161: //Salmantino
			color=yellowIcon;
			break;
		case 162: //San Francisco
			color=orangeIcon;
			break;
		case 163: //Leonés
			color=redIcon;
			break;
		case 164: //Zamora
			color=blueIcon;
			break;
		case 165: //Bellota Charra
			color=greenIcon;
			break;
		case 167: //Cigales
			color=greyIcon;
			break;
		default:
			color=redIcon;
	}
	var marker = new L.marker([latgr, longr], {icon: color}, {title: "Punto usuario",draggable:true,opacity:1});
	var arrUTM = marker.getLatLng().utm().toString().split(',');
	geocodeService.reverse().latlng([latgr, longr]).run(function(error, result){
		var direccion = result.address.Match_addr;
		marker.bindPopup("Punto usuario<br>"+direccion+"<br><br>UTM: X="+parseFloat(arrUTM[0]).toFixed(2)+", Y="+parseFloat(arrUTM[1]).toFixed(2)+", HUSO: "+arrUTM[2]+"<br>GEO: LAT="+latgr.toFixed(12)+", LON="+longr.toFixed(12)+"<br>GEO: LAT="+DegToDMS(latgr,5)+", LON="+DegToDMS(longr,5));
		map.addLayer(marker);
		arrPuntoSuelta.push(marker);
		map.setView([latgr, longr], 20, { animation: true });
	});
	return marker;
}

function CargarTodosSocios(anio){
	arrAllSocios=[];
	for (var i=0; i<arrPalomares.length; i++){
		if ((arrPalomares[i].activo==true)&&(arrPalomares[i].anio==anio)){
			var nuevo={codsocio:i,socio:'('+arrPalomares[i].codclub+') '+arrPalomares[i].socio,latgr:arrPalomares[i].latgr,longr:arrPalomares[i].longr,codprov:arrPalomares[i].codprov,provclub:arrPalomares[i].provclub,codclub:arrPalomares[i].codclub,nomclub:arrPalomares[i].nomclub,socio:arrPalomares[i].socio,loc:arrPalomares[i].loc,prov:arrPalomares[i].prov,utmx:arrPalomares[i].utmx,utmy:arrPalomares[i].utmy,huso:arrPalomares[i].huso};
			arrAllSocios.push(nuevo);
		}
	}
	//arrAllSocios.sort((a, b) => (a.socio > b.socio) ? 1 : -1);
	arrAllSocios.sort((a, b) => (a.socio).localeCompare(b.socio));
	return arrAllSocios.length;
}

function CargarTodosClubes(anio){
	arrAllClubes=[];
	for (var i=0; i<arrPalomares.length; i++){
		if ((arrPalomares[i].activo==true)&&(arrPalomares[i].anio==anio)){
			var encontrado=false;
			for (var j=0; j<arrAllClubes.length; j++){
				if (arrAllClubes[j].codclub==arrPalomares[i].codclub){
					encontrado=true;
				}
			}
			if (!encontrado){
				var nuevo={codclub:arrPalomares[i].codclub,nomclub:arrPalomares[i].nomclub};
				arrAllClubes.push(nuevo);
			}
		}
	}	
	//arrAllClubes.sort((a, b) => (a.socio > b.socio) ? 1 : -1);
	arrAllClubes.sort((a, b) => (a.nomclub).localeCompare(b.nomclub));
	return arrAllClubes.length;
}

function toRad(x) { return x * Math.PI / 180.0; }

function HaversineDistance(pos1, pos2){
	var selectradio = $('#radiotierra').val(); //var earthRadius = 6371000; //6371000; 6378137;
	switch(parseInt(selectradio)) {
		case -1: //Devuelve la distancia Leaflet
			return map.distance(pos1, pos2); 
			break;
		case 0: //Media (6371.0088 km)
			earthRadius = 6371.0088*1000;
			break;
		case 1: //Ecuador (6378.1370 km)
			earthRadius = 6378.1370*1000;
			break;
	}
	var deltaLat = pos2[0] - pos1[0];
	var deltaLng = pos2[1] - pos1[1];
	var alpha = deltaLat / 2;
	var beta = deltaLng / 2;
	var a = Math.sin(toRad(alpha)) * Math.sin(toRad(alpha)) + Math.cos(toRad(pos1[0])) * Math.cos(toRad(pos2[0])) * Math.sin(toRad(beta)) * Math.sin(toRad(beta)) ;
	c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	distance = earthRadius * c;
	return distance;
}
  
function PalomarMasCercano(anio, clave, provoclub, direccion){
	var arrCercano=[];
	switch (clave){
		case 0: //provincia
			for (var i=0; i<arrPalomares.length; i++){
				if ((arrPalomares[i].activo==true)&&(arrPalomares[i].anio==anio)&&(arrPalomares[i].codprov==provoclub)){
					var nuevo={latgr:parseFloat(arrPalomares[i].latgr.replace(",",".")),longr:parseFloat(arrPalomares[i].longr.replace(",","."))};
					arrCercano.push(nuevo);
				}
			}
			break;
		case 1: //club
			for (var i=0; i<arrPalomares.length; i++){
				if ((arrPalomares[i].activo==true)&&(arrPalomares[i].anio==anio)&&(arrPalomares[i].codclub==provoclub)){
					var nuevo={latgr:parseFloat(arrPalomares[i].latgr.replace(",",".")),longr:parseFloat(arrPalomares[i].longr.replace(",","."))};
					arrCercano.push(nuevo);
				}
			}
	}
	if ((direccion==1) || (direccion==2)){
		arrCercano.sort((a, b) => (a.latgr > b.latgr) ? 1 : -1);
		if (direccion==1){ //norte
			return [arrCercano[arrCercano.length-1].latgr,arrCercano[arrCercano.length-1].longr];
		} else { //sur
			return [arrCercano[0].latgr,arrCercano[0].longr];
		}
	}
	if ((direccion==3) || (direccion==4)){
		arrCercano.sort((a, b) => (a.longr > b.longr) ? 1 : -1);
		if (direccion==3){ //este
			return [arrCercano[arrCercano.length-1].latgr,arrCercano[arrCercano.length-1].longr];
		} else { //oeste
			return [arrCercano[0].latgr,arrCercano[0].longr];
		}
	}
}

function ProvinciaClub(anio, codClub){
	for (var i=0; i<arrPalomares.length; i++){
		if ((arrPalomares[i].activo==true)&&(arrPalomares[i].anio==anio)&&(arrPalomares[i].codclub==codClub)){
			return (arrPalomares[i].codprov);
		}
	}
}
