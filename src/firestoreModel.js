//Code layout and structure is mostly taken from the lab
import { initializeApp } from "firebase/app";
import {getFirestore, doc, setDoc, getDoc} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "/src/firebaseConfig.js";

const app= initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db= getFirestore(app);

window.db= db
window.doc= doc;  
window.setDoc= setDoc;

const COLLECTION="CityExplorer";

export function connectToPersistence(model, watch) {
    model.ready = false;
    model.user = undefined;

    function followModelChangesACB() {
        return [
            model.itinerary, 
            model.durationDays, 
            model.selectedCategories, 
            model.numberOfActivitiesPerDay, 
            model.currentActivity,
            model.myTrips
        ];
    }

    function saveModelToFirestoreACB() {
        if (!model.ready || !model.user) {
           return;
        }

        const docRef = doc(db, COLLECTION, model.user.uid);

        const savedData = {
            itinerary: model.itinerary,
            durationDays: model.durationDays,
            selectedCategories: model.selectedCategories,
            numberOfActivitiesPerDay: model.numberOfActivitiesPerDay,
            currentActivity: model.currentActivity,
            myTrips: model.myTrips
        };

        setDoc(docRef, savedData,{ merge: true });
    }

    function loadUserDataACB(firebaseUser) {
        model.user = firebaseUser;

        // Case 1: user logged out then wipe model
        if (!firebaseUser) {
            model.itinerary = [];
            model.durationDays = 1;
            model.selectedCategories = [];
            model.numberOfActivitiesPerDay = 1;
            model.currentActivity = null;
            model.myTrips = [];
            model.ready = true;
            return;
        }

        // Case 2: user logged in then load their document
        const docRef = doc(db, COLLECTION, firebaseUser.uid);

        getDoc(docRef)
        .then(snapshot => {
            const data = snapshot.data() || {};
            model.itinerary = data.itinerary || [];
            model.durationDays = data.durationDays || 1;
            model.selectedCategories = data.selectedCategories || [];
            model.numberOfActivitiesPerDay = data.numberOfActivitiesPerDay || 1;
            model.currentActivity = data.currentActivity || null;
            model.myTrips = data.myTrips || [];
            model.ready = true;
        })
        .catch(error => {
            model.itinerary = [];
            model.durationDays = 1;
            model.selectedCategories = [];
            model.numberOfActivitiesPerDay = 1;
            model.currentActivity = null;
            model.ready = true;
        });
    }

    //  check for login/logout
    onAuthStateChanged(auth, loadUserDataACB);
    
    watch(followModelChangesACB, saveModelToFirestoreACB, {deep: true});
}

