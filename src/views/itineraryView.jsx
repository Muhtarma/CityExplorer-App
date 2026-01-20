import "/src/style.css";
import { categoryIdToIcons } from "../utilities.js";

export function ItineraryView(props) {
  const itinerary = props.itinerary;

  function dragStartACB(sourceDay, activityIndex) {
    return function(evt){
      evt.dataTransfer.setData(
        "text/plain",
        JSON.stringify({ sourceDay: sourceDay, activityIndex: activityIndex })
      );
    };
  }

  function dragOverACB(evt) {
    evt.preventDefault();
  }

  function dropACB(evt, targetDay) {
    evt.preventDefault();
    const data = JSON.parse(evt.dataTransfer.getData("text/plain"));
    props.onMoveActivity(data.sourceDay, targetDay, data.activityIndex);
  }

  function backToHome() {
    props.onHome();
  }

  function toMyTrips() {
    props.onToMyTrips();
  }

  function toAboutUs() {
    props.onAboutUs();
  }

  function oneTablePerDayCB(dayObject, dayIndex) {
    return (
      <div 
        key={dayObject.dayNumber} 
        className="border"
        onDragenter={(evt) => evt.preventDefault()}   
        onDragover={dragOverACB}
        onDrop={function(evt){dropACB(evt, dayIndex);}} 
      >
      <div className="day-text">Day {dayObject.dayNumber}</div>
        {dayObject.dayActivities.map(function(act, actIndex){
          return itineraryCB(act, actIndex, dayIndex);
        })}
      </div>
    );     
  }
    
  function itineraryCB(act, actIndex, dayIndex) {

    function activityClickACB() {
      props.onActivityClick(act.id);
      props.onToDetails();
    }
    return (
      <div 
        key={act.id}
        draggable
        onDragstart={function(evt){
        dragStartACB(dayIndex, actIndex)(evt);
        }}
        onClick={activityClickACB}
      >
        <div className="activity-box">
          {act.displayName.text} {categoryIdToIcons[act.categoryId]}
        </div>
      </div>
    );
  }

  function saveItineraryACB() {
    alert("Itinerary saved!");
    props.onSaveItinerary();
  }

  function myItinerary() {
    return props.itinerary.map(function(day, index){
      const activities = day.dayActivities.map(function(act){
        return "-" + act.displayName.text}).join("\n");

      return "Day " + (index + 1) + ":\n" + activities;
    })
    .join("\n\n");
  }

  return (
    <div>
      <div className="top">
        {props.user ? (
        <a onClick = {props.onSignOut} >Log Out</a>
        ):(<a onClick = {props.onSignIn} >Login</a>)}
        <a onClick={toAboutUs}>About us</a>
        <a onClick={toMyTrips}>My trips</a>
        <a onClick={backToHome}>Home</a>
        <span onClick={backToHome}> CityExplorer </span>
      </div>

      <div className="page">
        <div className="container">

          <div className="page-title">Your itinerary overview</div>

          <div className="page-subtitle">
            Drag and drop the activities to customize!
          </div>

          <div className="page-subtitle"> 
            <button className="button" onClick={saveItineraryACB}>Save Itinerary</button> 
          </div>

            <div className="page-subtitle">Share your itinerary!</div>

            <div className="page-subtitle">
              <button className="btn-share">
                <span className="btn-icon">
                  <svg
                    viewBox="0 0 1024 1024"
                    width="18"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M767.99994 585.142857q75.995429 0 129.462857 53.394286t53.394286 129.462857-53.394286 129.462857-129.462857 53.394286-129.462857-53.394286-53.394286-129.462857q0-6.875429 1.170286-19.456l-205.677714-102.838857q-52.589714 49.152-124.562286 49.152-75.995429 0-129.462857-53.394286t-53.394286-129.462857 53.394286-129.462857 129.462857-53.394286q71.972571 0 124.562286 49.152l205.677714-102.838857q-1.170286-12.580571-1.170286-19.456 0-75.995429 53.394286-129.462857t129.462857-53.394286 129.462857 53.394286 53.394286 129.462857-53.394286 129.462857-129.462857 53.394286q-71.972571 0-124.562286-49.152l-205.677714 102.838857q1.170286 12.580571 1.170286 19.456t-1.170286 19.456l205.677714 102.838857q52.589714-49.152 124.562286-49.152z"
                      fill="#ffffff"
                    />
                  </svg>
                </span>

                <ul className="social-icons">
                  <li>
                    <a
                      href= {
                        "mailto:?subject=" + encodeURIComponent( "My Itinerary - " + props.itineraryLocation + ", CityExplorer")
                        + "&body=" + encodeURIComponent(myItinerary())
                      }
                    >
                      📧
                    </a>
                  </li>
                  <li>
                    <a
                      href={
                        "sms:?body=" + encodeURIComponent(myItinerary())
                      }
                    >
                      💬
                    </a>
                  </li>
                  <li>
                    <a
                      href={
                        "https://wa.me/?text=" +
                        encodeURIComponent(myItinerary())
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <svg
                        viewBox="0 0 32 32"
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="white"
                          d="M16.02 3C9.39 3 4 8.38 4 15.01c0 2.64.86 5.08 2.31 7.05L4 29l7.13-2.27a12.92 12.92 0 0 0 4.89.94h.01c6.63 0 12.02-5.38 12.02-12.01C28.05 8.38 22.66 3 16.02 3zm6.98 17.37c-.29.81-1.69 1.57-2.35 1.66-.61.08-1.38.12-2.23-.14-.52-.17-1.19-.39-2.06-.77-3.62-1.56-5.97-5.22-6.15-5.47-.18-.26-1.47-1.96-1.47-3.74 0-1.78.93-2.66 1.26-3.03.33-.37.72-.46.96-.46.24 0 .48 0 .69.01.22.01.52-.08.81.62.29.7.99 2.43 1.08 2.61.09.18.15.39.03.65-.12.26-.18.39-.35.61-.17.22-.36.49-.52.66-.17.17-.35.36-.15.71.2.35.9 1.49 1.93 2.41 1.33 1.18 2.46 1.55 2.81 1.72.35.17.55.15.75-.09.2-.24.86-1 1.09-1.35.23-.35.46-.29.78-.17.32.12 2.02.95 2.37 1.12.35.17.58.26.66.4.08.14.08.81-.21 1.62z"
                        />
                      </svg>
                    </a>
                  </li>       
                </ul>
              </button>
            </div> 
  
          <div  className="align-itinerary">
            {itinerary.map(oneTablePerDayCB)}
          </div>

        </div>

        <div className="start">
          <div className="header">Back to home</div>
          <button className="arrow" onClick={backToHome}> ← </button>  
        </div>

      </div>

      <div className="itinerary-icon-right">
        <img src="https://imgur.com/TEFxsil.png" className="background-icon-top"/>
      </div>

      <div className="itinerary-icon-left">
        <img src="https://imgur.com/TEFxsil.png" className="background-icon-top"/>
      </div>
      
    </div>
  );
 
}
