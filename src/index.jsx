//Code is mostly taken from the lab
import { VueRoot } from "./vuejs/VueRoot.jsx";
import { reactiveModel } from "./vueReactiveModel.js"; 
import { connectToPersistence } from "./firestoreModel.js";
import { makeRouter } from "./vuejs/VueRoot.jsx";
import { createApp } from "vue";

import { watch } from "vue";
//import reactiveModel and run the persistence connection 
connectToPersistence(reactiveModel, watch);

const app= createApp(function render(){ 
    return <VueRoot model={reactiveModel} />});
app.use(makeRouter(reactiveModel));
app.mount("#root");

