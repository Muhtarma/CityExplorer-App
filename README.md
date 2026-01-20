

🌍 CityExplorer

CityExplorer is a web-based trip itinerary planner that helps users quickly create and customize travel plans based on their preferences. Users can choose a destination, select activity categories, and generate a personalized day-by-day itinerary with detailed information about each activity.

💫 Features

📍Destination-based itinerary generation
🗓️Day-by-day trip overview
🎯Category-based activity selection
🔁Drag and drop activities between days
✅Save and view trips
🔐User authentication (login/logout)
🖼️Activity details with images, ratings, and more
⚙️ Tools

Vue (JSX)
Vue Router
Firebase (authentication & firestore)
API: Google places API v2
🧩 3rd-party components

Loading animation

A third party loading animation is used in suspenseView.jsx, with custom styling and animation effects added in style.css.

Code reference: https://codepen.io/nateplusplus/pen/mKYrGg

Drag-and-drop functionality

Drag-and-drop functionality for rearranging activities between days was implemented in itineraryView.jsx and itineraryPresenter.jsx

Code reference: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

Sharing button visuals & functionality

The sharing button displayed in the itinerary overview is implemented in itineraryView.jsx with additional styling style.css.

Code reference: https://codepen.io/alphardex/pen/abzgYvz

📁 Project file structure

└── src
    ├── views/                 # JSX UI views
    │   ├── aboutUsView.jsx 
    │   ├── activityDetailsView.jsx  
    │   ├── authView.jsx   
    │   ├── homeView.jsx 
    │   ├── itineraryView.jsx 
    │   ├── myTripsView.jsx
    │   └── suspenseView.jsx
    ├── vuejs/                 # Presentation logic
    │   ├── aboutUsPresenter.jsx 
    │   ├── activityDetailsPresenter.jsx 
    │   ├── authPresenter.jsx 
    │   ├── homePresenter.jsx
    │   ├── itineraryPresenter.jsx 
    │   ├── myTripsPresenter.jsx 
    │   └── VueRoot.jsx 
    ├── activitiesFetch.js      # Application state, persistence & other logic 
    ├── apiConfig.js
    ├── categoriesConst.js 
    ├── firebaseConfig.js
    ├── firestoreModel.js 
    ├── index.jsx 
    ├── ItineraryModel.js 
    ├── resolvePromise.js
    ├── style.css
    ├── utilities.js 
    └── vueReactiveModel.js 
🚀 Getting started

Prerequisites

Download Node.js (latest version) from https://nodejs.org/en/download/current
Installation

Open a terminal in the project directory

Install dependencies:

npm install
Run the application

Start the development server:
npm run dev
After the server starts, a local host URL will be shown in the terminal. Open the URL shown in the terminal in your browser to view the application.
