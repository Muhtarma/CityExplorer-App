import { categoryOptions } from "/src/categoriesConst.js";

/*function for spillting different activities to each day based on the users input for activities per day*/
export function splitActivitiesToDays(activities, activitiesPerDay) {
    const result = [];

    /*callback for grouping the activities into different days without choosing the same one more than once*/
    function chooseActivityCB(activity, index) {
        const groupIndex = Math.floor(index / activitiesPerDay); // Determine which day the activities belongs to
        if(!result[groupIndex]){
            result[groupIndex] = {  // Initialize the day object if it doesn't exist
                dayNumber: groupIndex + 1,
                dayActivities: []
            };
        }
        result[groupIndex].dayActivities.push(activity); // Add the activities to the corresponding day
    }

    activities.forEach(chooseActivityCB); 
    return result; 
}

/*function for combining category subtypes if the user chooses more than one category*/
export function combineCategories(categoryNames, categories) {
    if (categoryNames.includes("surpriseMe")) {
        const subtypes = Object.values(categories).flat();
        // Pick 5 random subtypes 
        subtypes.sort(function() { 
            return 0.5 - Math.random(); 
        });
        return subtypes.slice(0, 5);
    }

    const result = [];
    const alreadyChosen = {};

    function addCategoryTypeCB(type) { //callback for adding category types without choosing the same one more than once
        if(!alreadyChosen[type]){
            alreadyChosen[type] = true;
            result.push(type);
        }
    }

    function addCategoryCB(categoryName) { //callback for iterating through the chosen categories
        const types = categories[categoryName];
            if(types){
            types.forEach(addCategoryTypeCB);
        }
    }

    categoryNames.forEach(addCategoryCB); 
    return result; 
}

//function for mapping activity types to the users chosen categories
export function mapActivityTypesToCategories(activityTypes, selectedCategoryIds, categoriesById) {
    let bestCategoryMatch = null;
    let bestScore = 0;

    selectedCategoryIds.forEach(function (categoryId) {
        const subTypes = categoriesById[categoryId] || [];
        let score = 0;

        activityTypes.forEach(function (type) {
            if((subTypes.indexOf(type) !== -1)) {
                score++;
            }
        });

        if(score > bestScore) {
            bestScore = score;
            bestCategoryMatch = categoryId;
        }
    });

    return bestCategoryMatch || "surpriseMe";
}


//for matching category ids to their name & emojis
export const categoryIdToName = {};
export const categoryIdToIcons = {};

function mapCategoryToName(category) {
    categoryIdToName[category.id] = category.name;
    categoryIdToIcons[category.id] = category.icons;
}

categoryOptions.forEach(mapCategoryToName);



