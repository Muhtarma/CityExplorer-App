import "/src/style.css";
import { categoryIdToName, categoryIdToIcons } from "../utilities.js";

export function MyTripsView(props) {

    function goToAboutUs() {
        props.onAboutUs();
    }

    function goToHome() {
        props.onHome();
    }

    function goToItinerary() {
        props.onItinerary();
    }

    function deleteACB(tripId) {
        if (window.confirm("Are you sure you want to delete this trip?")){
            props.onDeleteTrip(tripId);
        }
    }

    function openItineraryACB(tripId) {
        props.onOpenItinerary(tripId);
    }

    function renderChosenCategoriesCB(categoryId, index) {
        return (
            <div key={categoryId} className="day-text"> 
                {index > 0 && <div className="separator"> • </div>}
                <div>
                    {categoryIdToName[categoryId]}
                    {categoryIdToIcons[categoryId]}
                </div>
            </div>
        );
    }

   return (
        <div>
            <div className="top">
                {props.user ? (
                <a onClick = {props.onSignOut} >Log Out</a>
                ):(<a onClick = {props.onSignIn} >Login</a>)}
                <a onClick={goToAboutUs}>About us</a>
                <a className="active">My trips</a>
                <a onClick={goToHome}>Home</a>
                <span onClick={goToHome}> CityExplorer </span>
            </div>

            <div className="container">
                <div className="page-title">My Trips</div>

                <div className="align-itinerary">
                    {props.trips.map(function(trip){
                    const act = trip.numberOfActivitiesPerDay * trip.durationDays

                        return(
                            <div key={trip.id}>
                                <div  className="my-trip" onClick={function (){openItineraryACB(trip.id)}}>
                                    <div className="header">{trip.location}</div>
                                    <div className="day-text">{trip.durationDays} day trip</div>
                                    <div className="day-text">{act} {act=== 1 ? "activity" : "activities"} to explore</div>
                                    {(trip.selectedCategories ?? []).map(renderChosenCategoriesCB)}
                                </div>

                                <div>
                                    <button className="simple-button" onClick={function (){deleteACB(trip.id)}}>Delete</button>
                                </div>
                            </div>
                        );

                    })}
                       
                </div>

                <div className="start">
                    <div className="header">Back to itinerary</div>
                    <button className="arrow" onClick={goToItinerary}> ← </button>  
                </div>

            </div>
        </div>
    );
}