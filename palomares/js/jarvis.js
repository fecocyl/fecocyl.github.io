function DimeCentroPoligono(arrCoordenadas){
	var arrJarvis = Jarvis(arrCoordenadas);
	var polygon = arrJarvis.map(function(item){return [item.longr,item.latgr]});
	var mipoly = L.geoJson(turf.polygon([polygon]), {color:"red"}).addTo(map);
	polys.push(mipoly);
//	var centroid = turf.centroid(turf.polygon([polygon]));
	var centermass = turf.centerOfMass(turf.polygon([polygon]));
//	return [centroid.geometry.coordinates[1],centroid.geometry.coordinates[0]];
	return [centermass.geometry.coordinates[1],centermass.geometry.coordinates[0]];
}

function Jarvis(arrCoordenadas){
//http://www.geocodezip.com/v3_map-markers_ConvexHull.asp
	H = []; //hullPoints

	//arrCoordenadas.sort((a, b) => (a.longr > b.longr) ? 1 : -1);
	arrCoordenadas.sort((a, b) => a.longr - b.longr); //order Y
	arrCoordenadas.sort((a, b) => a.latgr - b.latgr); //order X

    // the output array H[] will be used as the stack
    var bot = 0,
    top = (-1); // indices for bottom and top of the stack
    var i; // array scan index
    // Get the indices of points with min x-coord and min|max y-coord
    var minmin = 0,
        minmax;
        
    var xmin = arrCoordenadas[0].longr;
    for (i = 1; i < arrCoordenadas.length; i++) {
        if (arrCoordenadas[i].longr != xmin) {
            break;
        }
    }
    
    minmax = i - 1;
    if (minmax == arrCoordenadas.length - 1) { // degenerate case: all x-coords == xmin 
        H[++top] = arrCoordenadas[minmin];
        if (arrCoordenadas[minmax].latgr != arrCoordenadas[minmin].latgr) // a nontrivial segment
            H[++top] = arrCoordenadas[minmax];
        H[++top] = arrCoordenadas[minmin]; // add polygon endpoint
        return top + 1;
    }

    // Get the indices of points with max x-coord and min|max y-coord
    var maxmin, maxmax = arrCoordenadas.length - 1;
    var xmax = arrCoordenadas[arrCoordenadas.length - 1].longr;
    for (i = arrCoordenadas.length - 2; i >= 0; i--) {
        if (arrCoordenadas[i].longr != xmax) {
            break; 
        }
    }
    maxmin = i + 1;

    // Compute the lower hull on the stack H
    H[++top] = arrCoordenadas[minmin]; // push minmin point onto stack
    i = minmax;
    while (++i <= maxmin) {
        // the lower line joins arrCoordenadas[minmin] with arrCoordenadas[maxmin]
        if (isLeft(arrCoordenadas[minmin], arrCoordenadas[maxmin], arrCoordenadas[i]) >= 0 && i < maxmin) {
            continue; // ignore arrCoordenadas[i] above or on the lower line
        }
        while (top > 0) { // there are at least 2 points on the stack
            // test if arrCoordenadas[i] is left of the line at the stack top
            if (isLeft(H[top - 1], H[top], arrCoordenadas[i]) > 0) {
                break; // arrCoordenadas[i] is a new hull vertex
            }
            else {
                top--; // pop top point off stack
            }
        }
        H[++top] = arrCoordenadas[i]; // push arrCoordenadas[i] onto stack
    }

    // Next, compute the upper hull on the stack H above the bottom hull
    if (maxmax != maxmin) { // if distinct xmax points
        H[++top] = arrCoordenadas[maxmax]; // push maxmax point onto stack
    }
    
    bot = top; // the bottom point of the upper hull stack
    i = maxmin;
    while (--i >= minmax) {
        // the upper line joins arrCoordenadas[maxmax] with arrCoordenadas[minmax]
        if (isLeft(arrCoordenadas[maxmax], arrCoordenadas[minmax], arrCoordenadas[i]) >= 0 && i > minmax) {
            continue; // ignore arrCoordenadas[i] below or on the upper line
        }
        
        while (top > bot) { // at least 2 points on the upper stack
            // test if arrCoordenadas[i] is left of the line at the stack top
            if (isLeft(H[top - 1], H[top], arrCoordenadas[i]) > 0) { 
                break;  // arrCoordenadas[i] is a new hull vertex
            }
            else {
                top--; // pop top point off stack
            }
        }

// breaks algorithm        
//        if (arrCoordenadas[i].longr == H[0].longr && arrCoordenadas[i].latgr == H[0].latgr) {
//            return top + 1; // special case (mgomes)
//        }
        
        H[++top] = arrCoordenadas[i]; // push arrCoordenadas[i] onto stack
    }
    
    if (minmax != minmin) {
        H[++top] = arrCoordenadas[minmin]; // push joining endpoint onto stack
    }
    
    if (H[H.length-1] != H[0]){
		H[++top] = H[0];
	}
	return H;
}

function isLeft(P0, P1, P2) {    
    return (P1.longr - P0.longr) * (P2.latgr - P0.latgr) - (P2.longr - P0.longr) * (P1.latgr - P0.latgr);
}