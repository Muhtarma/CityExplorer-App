import { SuspenseView } from "../views/suspenseView.jsx";
import { ItineraryView } from "../views/itineraryView.jsx";
import { splitActivitiesToDays, mapActivityTypesToCategories } from "../utilities.js";
import { categories } from "/src/categoriesConst.js";
import { useRouter } from "vue-router";
import { signOutUser } from "./authPresenter.jsx";


export function Itinerary(props) {

  const router = useRouter();
  if(!props.model.user) {
    router.push('/auth');
    return <div> Please log in to view your generated itinerary</div>;
  }

  const itineraryData = props.model.itineraryPromiseState;
  const firestoreItinerary = props.model.itinerary;

  function handleActivityClickACB(activityId) {
    props.model.setCurrentActivity(activityId);
    props.model.currentActivitySideEffect();
  }

  function handleMoveActivityACB(sourceDay, targetDay, activityIndex) {
    props.model.moveActivity(sourceDay, targetDay, activityIndex);
  }

  //redirect to auth on login click
  function handleSignInACB() {
    router.push('/auth');
  }
    
  //function to handle sign out
  function handleSignOutACB() {
    signOutUser();
  }

  function handleBackToHomeACB() {
    router.push('/home');
  }

  function handleToMyTrips() {
    router.push('/myTrips');
  }

  function handleToAboutUs() {
    router.push('/aboutUs');
  }

  function handleToDetailsACB() {
    router.push('/details');
  }

  function handleSaveItineraryACB() {
    props.model.saveTrip();
  }

  if (firestoreItinerary && firestoreItinerary.length > 0) {
    return (
      <ItineraryView
        itinerary={firestoreItinerary}
        onActivityClick={handleActivityClickACB}
        onMoveActivity={handleMoveActivityACB}
        onSaveItinerary={handleSaveItineraryACB}
        user={props.model.user}
        onSignIn= {handleSignInACB}
        onSignOut={handleSignOutACB}
        onHome={handleBackToHomeACB}
        onToMyTrips={handleToMyTrips}
        onAboutUs={handleToAboutUs}
        onToDetails={handleToDetailsACB}

      />
    );
  }
  
  //loading/error
  if(!itineraryData.data) {
    return (
      <SuspenseView
        promise={itineraryData.promise}
        error={itineraryData.error}
      />
    );
  }

  //init itinerary once when data arrives
  if (itineraryData.data && props.model.itinerary.length === 0) {
    const places = itineraryData.data.places || [];
    const groupedPlaces = places.map(function (place) {
      const categoryId = mapActivityTypesToCategories(place.types || [], props.model.selectedCategories || [], categories);
      return { ...place, categoryId: categoryId };
    });

    props.model.setItinerary(
      splitActivitiesToDays(
        groupedPlaces || [],
        props.model.numberOfActivitiesPerDay
      )
    );
  }

  return (
    <ItineraryView
      itinerary={props.model.itinerary}
      onActivityClick={handleActivityClickACB}
      onMoveActivity={handleMoveActivityACB}
      onSaveItinerary={handleSaveItineraryACB}
      user={props.model.user}
      onSignIn= {handleSignInACB}
      onSignOut={handleSignOutACB}
      onHome={handleBackToHomeACB}
      onToMyTrips={handleToMyTrips}
      onAboutUs={handleToAboutUs}
      onToDetails={handleToDetailsACB}
    />
  );
}
