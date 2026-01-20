import { ActivityDetailsView } from "../views/activityDetailsView.jsx";
import { SuspenseView } from "../views/suspenseView.jsx";
import { useRouter } from "vue-router";
import { signOutUser } from "./authPresenter.jsx";

export function ActivityDetails(props){ 

    //redirect to auth if not logged in
    const router = useRouter();

    if (!props.model.user) {
        router.push('/auth');
        return <div> Please log in to view your activity details</div>
    }
   
    //redirect to auth on login click
    function handleSignInACB() {
        router.push('/auth');
    }

    //function to handle sign out
    function handleSignOutACB(){
        signOutUser();
    }

    function handleBackToItineraryACB() {
        router.push('/itinerary');
    }

    function handleBackToHomePageACB() {
        router.push('/home');
    }

    function handleToAboutUsACB() {
        router.push('/aboutUs');
    }

    function handleSeeMyTripsACB() {
        router.push('/myTrips');
    }

    // get current activity promise state from model
    const activity = props.model.currentActivityPromiseState;

    if(activity.data) {
        return (
            <ActivityDetailsView 
                activity={activity.data} 
                user={props.model.user}
                onSignIn={handleSignInACB}
                onSignOut={handleSignOutACB}
                onItinerary={handleBackToItineraryACB}
                onBackToHomePage={handleBackToHomePageACB}
                onToAboutUs={handleToAboutUsACB}
                onSeeMyTrips={handleSeeMyTripsACB}
            />
        );
    }

    return <SuspenseView promise={activity.promise} error={activity.error}/>;
}
