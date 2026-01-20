//Code layout and structure is mostly taken from the lab 
import { ActivityDetails } from "./activityDetailsPresenter.jsx";
import { Home } from "./homePresenter.jsx";
import { Itinerary } from "./itineraryPresenter.jsx";
import { MyTrips } from "./myTripsPresenter.jsx";
import { AboutUs } from "./aboutUsPresenter.jsx";
import { AuthPresenter } from "./authPresenter.jsx";
import { createRouter, createWebHashHistory, RouterView } from "vue-router";
import { SuspenseView } from "../views/suspenseView.jsx";


export function VueRoot(props){

    //for authentication,
    const model = props.model;

    if (model.user === undefined) {
        return <SuspenseView/>;
    }

    if (!model.ready) {
        return <SuspenseView/>;
    }

    return(
        <div>
            <RouterView/>
        </div>
    );
}

//Router setup for navigation between views
export function makeRouter(model) {
    return createRouter({
        history: createWebHashHistory(),
        routes: [
            {
                path:"/",
                component:<Home model={model}/>,
            },

            {
                path:"/home",
                component:<Home model={model}/>,
            },

            {
                path:"/auth",
                component:<AuthPresenter model={model}/>,
            },
            
            {
                path:"/itinerary",
                component:<Itinerary model={model}/>,
            },

            {
                path:"/myTrips",
                component:<MyTrips model={model}/>,
            },
            
            {
                path:"/details",
                component:<ActivityDetails model={model}/>,
            },

            {
                path:"/aboutUs",
                component:<AboutUs model={model}/>,
            }
        ]
    });
}