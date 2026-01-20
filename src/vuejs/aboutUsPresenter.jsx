import { AboutUsView } from "../views/aboutUsView.jsx";
import { useRouter } from "vue-router";
import { signOutUser } from "./authPresenter.jsx";

export function AboutUs(props) {
   const router = useRouter();

    const team = [
        {name: "Viola Bordbar", email: "viola.bordbar1@gmail.com", linkedin: "http://linkedin.com/in/viola-bordbar-a70082303"},
        {name: "Laiba Shahzadi", email: "khalidlaiba213@gmail.com", linkedin: "http://linkedin.com/in/laiba-shahzadi-137782263"},
        {name: "Sofia Mohamed", email: "sofia05mohamed@gmail.com", linkedin: "https://www.linkedin.com/in/sofia-mohamed-797bb53a1"},
        {name: "Sabila Khan", email: "sabila.khan275@gmail.com", linkedin: "http://linkedin.com/in/sabila-khan-821357378"}
    ];

    //redirect to auth on login click
    function handleSignInACB() {
        router.push('/auth');
    }

    //function to handle sign out
    function handleSignOutACB(){
        signOutUser();
    }

    function handleGoHomeACB() {
        router.push('/home');
    }
    
    function handleGoToMyTripsACB() {
        router.push('/myTrips');
    }

    return (
        <AboutUsView 
            team={team}
            user={props.model.user}
            onSignIn={handleSignInACB}
            onSignOut={handleSignOutACB}
            onHome={handleGoHomeACB}
            onMyTrips={handleGoToMyTripsACB} 
        />
    );
}