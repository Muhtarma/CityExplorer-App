import { HomeView } from "../views/homeView.jsx";
import { categoryOptions } from "/src/categoriesConst.js";
import { useRouter } from "vue-router";
import { signOutUser } from "./authPresenter.jsx";

export function Home(props) {
    const router = useRouter();

    function handleLocationInputACB(newLocation) {
        props.model.setLocation(newLocation);
    }

    function handleGenerateItineraryACB() {
        props.model.itinerarySideEffect();
        router.push("/itinerary");
    }

    function handleOnNumOfActivitiesChangeACB(newNumberOfActivitiesPerDay) {
        props.model.setNumberOfActivitiesPerDay(newNumberOfActivitiesPerDay);
    }

    function handleOnNumOfDaysChangeACB(newDurationDays) {
        props.model.setTripDuration(newDurationDays);
    }

    function handleCheckBoxChangeACB(finalChosenCategories) {
        props.model.setTripCategory(finalChosenCategories);
    }

    //redirect to auth on login click
    function handleSignInACB() {
        router.push('/auth');
    }

    //function to handle sign out
    function handleSignOutACB() {
        signOutUser();
    }

    function goToAboutUsACB() {
        router.push('/aboutUs');
    }

    function goToMyTripsACB() {
        router.push('/myTrips');
    }

    return (
        <HomeView
            user={props.model.user}
            location={props.model.location}
            tripType={props.model.activityTypes}
            activitiesPerDay={props.model.numberOfActivitiesPerDay}
            chosenCategories={props.model.selectedCategories}
            duration={props.model.durationDays}
            categoryTypeOptions={categoryOptions}
            onNumOfActivitiesChange={handleOnNumOfActivitiesChangeACB}
            onDaysChange={handleOnNumOfDaysChangeACB}
            onCategoryChange={handleCheckBoxChangeACB}
            onLocationInput={handleLocationInputACB}
            onGenerateItinerary={handleGenerateItineraryACB}
            onSignIn= {handleSignInACB}
            onSignOut= {handleSignOutACB}
            onAboutUs={goToAboutUsACB}
            onMyTrips={goToMyTripsACB} 
        />
    );
}