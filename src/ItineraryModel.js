import { combineCategories } from "./utilities.js"; 
import { categories } from "./categoriesConst.js";
import { getPlaceDetails, getActivities, getLocationCoordinates, getPlacePhoto} from "./activitiesFetch.js";
import { resolvePromise } from "./resolvePromise.js";

export const model = {
  location: "",                    
  durationDays: 1,                 
  activityTypes: [],                  //Array of subtypes based on selected categories
  selectedCategories: [],             //Array of chosen categories
  numberOfActivitiesPerDay: 1,   
  itinerary: [],     
  currentActivity: null,              //Current activity (for activity details)
  currentActivityPromiseState: {},    //Promise state for current activity details fetch
  itineraryPromiseState: {},         //Promise state for itinerary generation fetch
  myTrips: [],

  setLocation(location) {
    this.location = location;
  },
     
  //We use math.max to ensure that the value is at leat 1 and durationDays are never 0, and max is 3 
  setTripDuration(days) {
    this.durationDays = Math.max(1, Math.min(6, Number(days)));
  },

  //setter to limit categories, chosen categories,  also updates activityTypes based on selected categories,
  setTripCategory(selected) {
    const finalCategories = !selected ? [] : Array.isArray(selected) ? 
    selected.includes("surpriseMe") ? ["surpriseMe"] : selected.slice(0, 5) : [selected];
    this.selectedCategories = finalCategories;
    this.activityTypes = combineCategories(this.selectedCategories,categories)
  },
     
  //Setter for number of activities per day, ensures it's at least 1 and max 6 
  setNumberOfActivitiesPerDay(number) {
    const num = Number(number);
    if(num < 1) {
      this.numberOfActivitiesPerDay = 1;
    }
    else if(num > 3) {
      this.numberOfActivitiesPerDay = 3;
    }
    else {
      this.numberOfActivitiesPerDay = num;
    }
  },
    
  //Setter for current activity (for activity details)
  setCurrentActivity(activity) {
    this.currentActivity = activity;
  },
  
  //Setter for the itinerary 
  setItinerary(data) {
    this.itinerary = data;
  },

  //Moves an activity between two days (drag and drop)
  moveActivity(sourceDay, targetDay, activityIndex) {
    const newItinerary = [...this.itinerary];
    const activity = newItinerary[sourceDay].dayActivities.splice(activityIndex, 1)[0];
    newItinerary[targetDay].dayActivities.push(activity);
    this.itinerary = newItinerary;
  },

  //Side effect for current activity details fetch
  currentActivitySideEffect: function () {
    if (!this.currentActivity) return;

    const promise = getPlaceDetails(this.currentActivity)
      .then(function (place) {
        if (place.photos && place.photos.length > 0) {
          const photoResource = place.photos[0].name.split("/").pop();

          return getPlacePhoto(place.id, photoResource)
            .then(function (photo) {
              place.photoUrl = photo.photoUri;
              return place;
            })
            .catch(function () {
              place.photoUrl = null;
              return place;
            }
          );
        }

        place.photoUrl = null;
        return place;
      });

    resolvePromise(promise, this.currentActivityPromiseState);
  },

  //Side effect for itinerary generation (activities fetch)
  itinerarySideEffect() {
    const current = this;
    current.itinerary = []; 

    if(!current.location || current.selectedCategories.length === 0 || current.durationDays <= 0 || current.numberOfActivitiesPerDay <= 0) {
      resolvePromise(undefined, current.itineraryPromiseState);
      return;
    }

    const maxResults =current.numberOfActivitiesPerDay * current.durationDays;

    function generateItinerary(coordinates) {
      const promise = getActivities(current.activityTypes, maxResults, coordinates.lat, coordinates.lng);
      return promise;
    }

    const promise = getLocationCoordinates(current.location).then(generateItinerary);
    resolvePromise(promise, current.itineraryPromiseState);
  }, 

  saveTrip(){
    if(this.itinerary.length === 0){
      return;
    }

    const trip = {
      id: Date.now().toString(),
      location: this.location,
      durationDays: this.durationDays, 
      numberOfActivitiesPerDay: this.numberOfActivitiesPerDay, 
      selectedCategories: this.selectedCategories,
      itinerary: JSON.parse(JSON.stringify(this.itinerary)),
    };

    this.myTrips = [...this.myTrips, trip];
  },

  deleteTrip(tripId){
    this.myTrips = this.myTrips.filter(function(trip){
      return trip.id !== tripId;
    });
  }, 

  openTrip(tripId){
    const trip = this.myTrips.find(function(trip){
      return trip.id === tripId;
    });

    if(!trip){
      return;
    }  

    this.location = trip.location;
    this.durationDays = trip.durationDays;
    this.numberOfActivitiesPerDay = trip.numberOfActivitiesPerDay;
    this.selectedCategories = trip.selectedCategories;
    this.itinerary = JSON.parse(JSON.stringify(trip.itinerary));
    this.currentActivity = null;
  }
};