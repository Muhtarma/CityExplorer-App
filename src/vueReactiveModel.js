//most of the code taken from the lab
import { reactive  } from "vue";
import {model} from "/src/ItineraryModel.js";
import { connectToPersistence } from "./firestoreModel.js";
import { watch } from "vue";

export const reactiveModel= reactive(model);

window.myModel= reactiveModel;

watch(function(){
        return reactiveModel.currentActivity},
    function(){
        reactiveModel.currentActivitySideEffect();
    }); 

watch(function(){
    return [
        reactiveModel.location,
        reactiveModel.activityTypes,
        reactiveModel.durationDays,
        reactiveModel.numberOfActivitiesPerDay
    ];
}, function(){
     reactiveModel.itinerarySideEffect();
});

connectToPersistence(reactiveModel, watch);