import "/src/style.css";

export function AboutUsView(props) {

    function backHome() {
        props.onHome();
    }

    function toMyTrips() {
        props.onMyTrips();
    }

    function personInfoCB(person) {
        return (
            <div className="border" key={person.name}>
                <div className="header">{person.name}</div>
                <div className="day-text">Contact info:</div>
                <div className="activity-box">
                    <div className="main">
                        <a href={`mailto:${person.email}`}>{person.email}</a>
                    </div>
                </div>
                <div className="activity-box">
                    <div className="main">
                        <a href={person.linkedin} className="main">LinkedIn</a>
                    </div>
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
                <a className="active">About us</a>
                <a onClick={toMyTrips}>My trips</a>
                <a onClick={backHome}>Home</a>
                <span onClick={backHome}> CityExplorer </span>
            </div>

            <div className="page-title">About us</div>

            <div className="container">
                <div className="main">
                    CityExplorer is a web application that generates personalized trip itineraries based on user preferences and inputs. 
                    The application was developed as part of a university course and focuses on interaction design, usability, 
                    the use of external APIs, and the Model–View–Presenter (MVP) architecture. The full source code and project documentation 
                    is available in the GitHub repository linked below.
                </div>

                <div className="main">
                    <a href="https://gits-15.sys.kth.se/iprog-students/laiba-sabila-sofmoh-violab-HT25-Project">GitHub</a>
                </div>
            </div>

            <div className="page-title">Project team</div>

            <div className="align-itinerary">
                {props.team.map(personInfoCB)}
            </div>

        </div>
    );
}