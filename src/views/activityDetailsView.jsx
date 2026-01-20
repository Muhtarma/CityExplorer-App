import "/src/style.css";

export function ActivityDetailsView(props) { 

    function backToItinerary() {
        props.onItinerary();
    }

    function backToHomePage() {
        props.onBackToHomePage();
    }

    function toAboutUs() {
        props.onToAboutUs();
    }

    function seeMyTrips() {
        props.onSeeMyTrips();
    }
     
    return (
        <div>
            <div className="top">
                {props.user ? (
                <a onClick = {props.onSignOut} >Log Out</a>
                ):(<a onClick = {props.onSignIn} >Login</a>)}
                <a onClick={toAboutUs}>About us</a>
                <a onClick={seeMyTrips}>My trips</a>
                <a onClick={backToHomePage}>Home</a>
                <span onClick={backToHomePage}> CityExplorer </span>
            </div>

            <div className="activity-details">
                <div className="activity-wrap">  
                    <div className="form">
                        <div className="form-card">

                            {/*Title*/}
                            <div className="title">{props.activity.displayName.text}</div>

                            {/*Image*/}
                            {props.activity.photoUrl ? (
                                <img src={props.activity.photoUrl || "No photo available"} height="150" className="place-photo"/>): 
                                <div>No image available</div>
                            }

                            {/*Description*/}
                            <div className="form-row">
                                <div className="day-text">Description:</div>
                                <div className="main">{props.activity.editorialSummary?.text || props.activity.generativeSummary?.text || "No description available, follow the link at the bottom of the page for more information"}</div>
                            </div>

                            {/*Rating*/}
                            <div className="form-row">
                                <div className="day-text">Rating:</div>
                                <div className="main">
                                    {props.activity.rating || "No ratings available"}{" "}
                                    {props.activity.rating && "★".repeat(Math.round(props.activity.rating))}
                                </div>
                            </div>

                            {/*Address*/}
                            <div className="form-row">
                                <div className="day-text">Address:</div>
                                <div className="main">{props.activity.shortFormattedAddress || "No address available, follow the link below for more information"}</div>
                            </div>

                            {/*link for more information*/}
                            <div className="form-row">
                                <a className="day-text" href={props.activity.googleMapsUri} target="blank">Find out more</a>
                            </div>
            
                        </div>
                        
                        {/* Button to go back to Itinerary page */}      
                        <div className="start">  
                            <div className="header">Back to Itinerary</div>
                            <button className="arrow" onClick={backToItinerary}> ← </button>
                        </div>  
                    </div> 
                </div> 
            </div>
        </div>
    );
}