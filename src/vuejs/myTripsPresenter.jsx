import { MyTripsView } from "../views/myTripsView.jsx";
import { useRouter } from "vue-router";
import { signOutUser } from "./authPresenter.jsx";

export function MyTrips(props) {

    const router = useRouter();

    if (!props.model.user) {
        router.push('/auth');
        return <div> Please log in to view your trips</div>
    }
   
    //redirect to auth on login click
    function handleSignInACB() {
        router.push('/auth');
    }

    //function to handle sign out
    function handleSignOutACB(){
        signOutUser();
    }

      function handleGoToAboutUs() {
       router.push('/aboutUs');
    }

    function handleGoToHome() {
        router.push('/home');
    }

    function handleGoToItinerary() {
        router.push('/itinerary');
    }

    function handleDeleteTripACB(tripId) {
        props.model.deleteTrip(tripId);
    }

    function handleOpenItineraryACB(tripId) {
        props.model.openTrip(tripId);
        router.push("/itinerary");
    }

    return (
        <MyTripsView 
            location={props.location} 
            numberOfActivitiesPerDay={props.numberOfActivitiesPerDay}
            selectedCategories={props.selectedCategories}
            durationDays={props.durationDays}
            user={props.model.user}
            trips={props.model.myTrips}
            onSignIn={handleSignInACB}
            onSignOut={handleSignOutACB}
            onDeleteTrip={handleDeleteTripACB}
            onOpenItinerary={handleOpenItineraryACB}
            onAboutUs={handleGoToAboutUs}
            onHome={handleGoToHome}
            onItinerary={handleGoToItinerary}
        />
    );
}