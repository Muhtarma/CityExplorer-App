import "/src/style.css";
import { ref } from "vue";

export function HomeView(props) { 
    //ref for scrolling to bottom section
    const bottomSectionRef =  ref(null);

    //constant for surprise me id
    const SURPRISE_ID = "surpriseMe";

    //function for checking if the input form is complete or not
    function isFormComplete() {
        return props.location && props.chosenCategories.length > 0;
    }

    //below are functions for firing events

    function onLocationInputACB(event) {
        props.onLocationInput(event.target.value);
    }

    function minusDaysACB() { 
        props.onDaysChange(props.duration - 1);
    }

    function plusDaysACB() {
        props.onDaysChange(props.duration + 1);
    }

    function minusActivitiesACB() { 
        props.onNumOfActivitiesChange(props.activitiesPerDay - 1); 
    }

    function plusActivitiesACB() {
        props.onNumOfActivitiesChange(props.activitiesPerDay + 1);
    }

    //if an option is checked, the selected option is added to the array. The ones not chosen are filtered out from the array
    function checkBoxChangeACB(event) {
        const id = event.target.value;
        if(event.target.checked){
            props.onCategoryChange([...props.chosenCategories, id]);
        }
        else{
            props.onCategoryChange(props.chosenCategories.filter(function checkId(category){return category !== id;}));
        }
    }

    //Refs are used to access the bottom section. 
    //Suggestion given in the mid project review and information on how to use it from https://vuejs.org/guide/essentials/template-refs.html
    function scrollToBottomSection() {
        bottomSectionRef.value?.scrollIntoView({ behavior: "smooth" });
    }

    function generateItineraryClickedACB() {
        props.onGenerateItinerary();       
    }

    function seeAboutUs() {
        props.onAboutUs();
    }

    function toMyTrips() {
        props.onMyTrips();
    }

    return (
        <div>
            <div className="top">
                {props.user ? (
                    <a onClick = {props.onSignOut} >Log Out</a>
                ):(<a onClick = {props.onSignIn} >Login</a>)}
                <a onClick={seeAboutUs}>About us</a>
                 <a onClick={toMyTrips}>My trips</a>
                <a className="active">Home</a>
                <span> CityExplorer </span>
            </div>

            <div id="top-section"> 
                <div className="title">CITYEXPLORER</div>
    
                <div className="header">Plan your perfect trip in minutes!</div>
    
                <div className="main">
                    Choose your interests, set how many days you're traveling, and decide how full  you want your schedule to be. 
                    CityExplorer instantly creates a personalized, day-by-day itinerary with activities and useful details for your trip. 
                    No more endless searching, just a smooth and stress-free travel experience
                </div>

                <div className="start">
                    <div className="header">Start exploring!</div>
                    <a className="arrow" onClick={scrollToBottomSection}> ↓ </a>
                </div>
            
                <img src="https://imgur.com/sSjnWVY.png" className="globe-icon"/>
                <img src="https://imgur.com/bZCZ1tB.png" className="bag-icon"/>
                <img src="https://imgur.com/qUcfy2v.png" className="plane-icon"/>
                <img src="https://imgur.com/SgLOoIG.png" className="drink-icon"/> 
                <img src="https://imgur.com/TEFxsil.png" className="background-icon-top"/>
            </div>

            <div ref={bottomSectionRef} id="bottom-section">

                <div className="form-card">
                
                    <h2 className="form-title">Plan your trip</h2>
                    
                    <div className="form-row">
                        Enter your desired destination:
                        <input value={props.location || ""} onChange={onLocationInputACB}/>
                    </div>

                    <div className="check-list">
                        What activities would you like to do on your trip? You can select multiple options, but no more than 5.
                        {props.categoryTypeOptions.map(function renderOptionCB(option){
                            const surpriseSelected = 
                            props.chosenCategories.includes(SURPRISE_ID);
                            const isSurprise = option.id === SURPRISE_ID;

                            const maxReached = 
                            props.chosenCategories.length >= 5 && 
                            !props.chosenCategories.includes(option.id);

                            const shouldDisable= 
                            (surpriseSelected && !isSurprise) || 
                            (!surpriseSelected && props.chosenCategories.length > 0 && isSurprise) || maxReached;

                            return(
                                <div key={option.id}>
                                    <label>
                                        <input 
                                            className="check-box"
                                            type="checkbox" 
                                            value={option.id} 
                                            checked={props.chosenCategories.includes(option.id)}
                                            disabled={shouldDisable}
                                            onChange={checkBoxChangeACB}
                                        />
                                        {option.name}
                                        {option.icons}
                                    </label>
                                </div>
                            );
                        })}
                    </div>

                   

                    <div className="form-row">
                        How many days will your trip be? (maximum 6 days)
                        <div className="counter">
                            <button className="small-button" onClick={minusDaysACB} disabled={props.duration <= 1}>-</button>
                                <span className="counter-value">{props.duration}</span>
                            <button className="small-button" onClick={plusDaysACB} disabled={props.duration >= 6}>+</button>
                       </div> 
                    </div>
                  
                    <div className="form-row">
                        How many activities per day? (maximum 3 activities per day)
                        <div className="counter">
                            <button className="small-button" onClick={minusActivitiesACB} disabled={props.activitiesPerDay <= 1}>-</button>
                                <span className="counter-value">{props.activitiesPerDay}</span>
                            <button className="small-button" onClick={plusActivitiesACB} disabled={props.activitiesPerDay >= 3}>+</button>
                        </div>
                    </div>

                    <button 
                        className="button" 
                        onClick={generateItineraryClickedACB}
                        disabled={!props.location || props.chosenCategories.length === 0}
                    >
                        Generate Itinerary!
                    </button>

                    {!isFormComplete() && (
                        <div className="error-text">
                            Please fill in all the information above to generate your itinerary
                        </div>
                    )}

                </div>

                <img src="https://imgur.com/wTaYXer.png" className="background-icon-big"/>
                <img src="https://imgur.com/wTaYXer.png" className="background-icon-middle"/>
                <img src="https://imgur.com/wTaYXer.png" className="background-icon-small"/>

            </div>
        </div>
    );
}