import { PROXY_URL } from "/src/apiConfig.js";
import { PROXY_KEY } from "/src/apiConfig.js";

function responseACB(response){
    if(response.status !== 200) {
        throw new Error(response.status + " Error fetching data from API");
    }
    return response.json();
}

//function for getting a list of activities
export function getActivities(categoryTypes, maxResults, locationLat, locationLng){
    
        const body = {
        maxResultCount: maxResults,
        locationRestriction: {
            circle: {
                center: {
                    latitude: locationLat, 
                    longitude: locationLng, 
                },
                radius: 20000
            }
        },
    };

    if(categoryTypes.includes("surpriseMe")){
        body.includedTypes = combineCategories();
    }
    else{
        body.includedTypes= categoryTypes; 
    }

    return fetch(`${PROXY_URL}:searchNearby`, {   
        method: "POST",
        headers: {
            "x-rapidapi-key": PROXY_KEY,
            "x-rapidapi-host": "google-map-places-new-v2.p.rapidapi.com", 
            'Content-Type': 'application/json',
            "X-Goog-FieldMask": ["places.id", "places.name", "places.displayName", "places.types"].join(",")
        },
        body: JSON.stringify(body)
    }).then(responseACB); 
}

//function for getting the details of a activity/place
export function getPlaceDetails(place_id) {
    return fetch(`${PROXY_URL}/${place_id}`, {
        method: "GET",
        headers: {
            "x-rapidapi-key": PROXY_KEY,
            "x-rapidapi-host": "google-map-places-new-v2.p.rapidapi.com", 
            "X-Goog-FieldMask": ["displayName", "rating", "googleMapsUri", "generativeSummary", "editorialSummary", "id", "photos", "shortFormattedAddress"].join(",")
        }
        
    }).then(responseACB); 
}

export function getPlacePhoto(place_id, photo_resource) {
    return fetch(`${PROXY_URL}/${place_id}/photos/${photo_resource}/media?maxWidthPx=800&skipHttpRedirect=true`, {
        method: 'GET',
	    headers: {
		    'x-rapidapi-key': PROXY_KEY,
		    'x-rapidapi-host': 'google-map-places-new-v2.p.rapidapi.com'
	    }
    }).then(responseACB);
}

//function for getting coordinates of a location based on the users input
export function getLocationCoordinates(locationQuery) {

    function coordinatesACB(data) {
        const place = data.places?.[0];
        if(!place || !place.location) {
            throw new Error ("No matching place found for: " + locationQuery);
        }
        return {
            lat: place.location.latitude,
            lng: place.location.longitude
        };
    }

    const body = {
        textQuery: locationQuery,
    };

    return fetch(`${PROXY_URL}:searchText`, {  
        method: "POST",
        headers: {
            "x-rapidapi-key": PROXY_KEY,
            "x-rapidapi-host": "google-map-places-new-v2.p.rapidapi.com", 
            'Content-Type': 'application/json',
            "X-Goog-FieldMask": ["places.location", "places.displayName"].join(",")
        },
        body: JSON.stringify(body)
    }).then(responseACB).then(coordinatesACB);
}



