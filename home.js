
import {queens, competitionData, storage, currentStatus, universalDisplay, universalControl, images}  from "./script.js";

// Functions to generate display elements
const display = (function () {
    // Create div to store episode information
    const createEpisodeHeaders = function () {
        const episodeInfo = document.createElement("div");
        episodeInfo.id = "episode-info";
        episodeInfo.className = "subheading-div";
        document.body.appendChild(episodeInfo);
    }

    // Use compeitionData and current week to display relevant information for each epsiode
    const updateEpisodeHeaders = function() {
        // Get information from competitionData object
        const title  = `Episode ${currentStatus.week}: ${competitionData.episodes[currentStatus.week-1]}`;
        const lipSync = competitionData.lipSyncs[currentStatus.week-1];
        const synopsis = competitionData.synopses[currentStatus.week-1];
        const runway = competitionData.runways[currentStatus.week-1];

        const episodeInfo = document.getElementById("episode-info");

        // Add all information to the episode-info div
        episodeInfo.innerHTML = `
            <h2 id="episode-title">${title}</h2>
            <p id="synopsis">${synopsis}</p>
            ${runway ? `<p id="runway-theme"><b>Runway theme:</b> ${runway}</p>` : ""}
            <p id="lip-sync-song"><b>Lip-sync song:</b> ${lipSync}</p>`;
    }

    // Display queen images and names
    const displayQueens = function() {
        // Create div for images to go inside
        const queensDiv = document.createElement("div");
        queensDiv.id="queens-div";
        document.body.appendChild(queensDiv);

        // Cycle through each queen and create display elements
        for (let i = 0; i < queens.numberOfQueens; i++) {
            // Create div for each queen
            const queenDiv = document.createElement("div");
            queenDiv.id = `queen${i}`;
            queenDiv.className = "queen-div";

            // Create div for image to go inside so that coloured borders can be added to images with grayscale applied
            const queenImageBox = document.createElement("div");
            queenImageBox.id = `queen-image-box${i}`;
            queenImageBox.className = "queen-image";

            // Add image and set properties
            const queenImage = document.createElement("img");
            queenImage.src = queens.queens[i].img;
            queenImage.id = `queen-image${i}`;
            queenImage.className = "queen-image";
            queenImage.alt = queens.queens[i].queen;

            // Add queen name
            const queenNameH3 = document.createElement("h3");
            queenNameH3.class = "queen-name";
            queenNameH3.innerText = queens.queens[i].queen;

            // Set everything together
            queenDiv.appendChild(queenImageBox);
            queenImageBox.appendChild(queenImage);
            queenDiv.appendChild(queenNameH3);
            queensDiv.appendChild(queenDiv);

            // Add dropdown for placements
            createPlacementDropdown(queenDiv, `queen-dropdown${i}`);
        }
    }

    // Function to add returning button under each queen
    const createReturningButton = function () {
        for (let i = 0; i < queens.numberOfQueens; i++) {
            const queenDiv = document.getElementById(`queen${i}`);

            // Create overall div
            const returningDiv = document.createElement("div");
            returningDiv.id = `returning${i}`;
            returningDiv.className = "returningRadio";

            // Create label
            const labelReturning = document.createElement("p");
            labelReturning.textContent = "Returning?";

            // Put each button inside a div to help with formatting
            const elementsYes = document.createElement("div");
            elementsYes.className = "radio-elements";

            const elementsNo = document.createElement("div");
            elementsNo.className = "radio-elements";

            // Create Yes button and label
            const returningButtonYes = document.createElement("input");
            returningButtonYes.type = "radio";
            returningButtonYes.name = `returning_radio${i}`;
            returningButtonYes.value = "Yes";
            returningButtonYes.id = `returningYes${i}`;

            const labelYes = document.createElement("label");
            labelYes.htmlFor = `returningYes${i}`;
            labelYes.textContent = "Yes";

            // Create No button and label
            const returningButtonNo = document.createElement("input");
            returningButtonNo.type = "radio";
            returningButtonNo.name = `returning_radio${i}`;
            returningButtonNo.value = "No";
            returningButtonNo.id = `returningNo${i}`;

            const labelNo = document.createElement("label");
            labelNo.htmlFor = `returningNo${i}`;
            labelNo.textContent = "No";

            // Put everything together
            elementsYes.append(labelYes);
            elementsYes.append(returningButtonYes);
            elementsNo.append(labelNo);
            elementsNo.append(returningButtonNo);

            returningDiv.append(labelReturning);
            returningDiv.append(elementsYes);
            returningDiv.append(elementsNo);

            queenDiv.appendChild(returningDiv);
        }
    };

    // Update the display of the returning buttons based on week
    const updateReturningButton = function () {
        // Cycle through each queen
        for (let i = 0; i < queens.numberOfQueens; i++) {
            // Select relevant elements
            const returningDiv = document.getElementById(`returning${i}`);
            const yesRadio = document.getElementById(`returningYes${i}`);
            const noRadio = document.getElementById(`returningNo${i}`);

            // Get queen placement at previous week
            const placementAtPrevious = currentStatus.week>1 ? queens.queens[i].placement[currentStatus.week-2] : null;

            // Update which radio button is checked
            yesRadio.checked = queens.queens[i].return[currentStatus.week-1];
            noRadio.checked = !queens.queens[i].return[currentStatus.week-1];

            // If queen was out of the competition the previous week, then display returning button for the current week
            returningDiv.style.display = placementAtPrevious==="Out" || placementAtPrevious==="Quit" || placementAtPrevious==="Eliminated" ? "flex" : "none";
        }
    };

    // Create dropdown used to select queen placement for each week
    const createPlacementDropdown = function(div, id) {
        // Create the select dropdown
        const select = document.createElement("select");
        select.className = "placement-select";
        select.id=id;

        // Select different placements depending on whether or not it is the finale episode
        const placementsArray = currentStatus.week < competitionData.numberOfWeeks ? competitionData.placements.slice() : competitionData.finalePlacements.slice();

        // Add each placement to the dropdown
        for (let i = 0; i <= placementsArray.length-1; i++) {
            if ( placementsArray[i]!=="Out"){
                const option = document.createElement("option");
                option.textContent = placementsArray[i];
                option.value = placementsArray[i];
                select.appendChild(option);
            }
        };

        div.append(select);
    }

    // Replace placement dropdowns with new select items if moving from or to the finale episode where placements are different
    const updatePlacementDropdownWeek = function() {
        if ((currentStatus.week===competitionData.numberOfWeeks && control.getPreviousWeek()!==competitionData.numberOfWeeks) 
            || (currentStatus.week!==competitionData.numberOfWeeks && control.getPreviousWeek()===competitionData.numberOfWeeks)) {
            for (let i=0; i < queens.numberOfQueens; i++) {
                // Remove existing dropdown
                const queenDropdown = document.getElementById(`queen-dropdown${i}`);
                queenDropdown.remove();

                const innerDiv = document.getElementById(`queen${i}`);
                createPlacementDropdown(innerDiv, `queen-dropdown${i}`);
            };
            // Add event listener back to dropdown
            control.placementUpdateListener();
        }
    }

    // Update placement dropdowns and queen images
    const updatePlacementDropdown = function() {
        for (let i = 0; i < queens.numberOfQueens; i++) {
            // Select relevant elements
            const queenDropdown = document.getElementById(`queen-dropdown${i}`);
            const queenImage = document.getElementById(`queen-image${i}`);
            const queenImageBox = document.getElementById(`queen-image-box${i}`);
            const placementAtWeek = queens.queens[i].placement[currentStatus.week-1];

            // Update dropdown to show current placement and hide dropdown if queen is no longer in the competition
            queenDropdown.value = placementAtWeek;
            queenDropdown.style.display = placementAtWeek!=="Out" ? "inline-block" : "none";

            // Add class names to queen images so that formatting can be controlled through CSS
            queenImage.className = "queen-image " + placementAtWeek.toLowerCase().replaceAll(" ", "");
            queenImageBox.className = "queen-image-box " + placementAtWeek.toLowerCase().replaceAll(" ", "");
            if (currentStatus.week===competitionData.numberOfWeeks) {queenImageBox.className = queenImageBox.className + " finale"};

            // Add returning button if queen is out of the competition
            updateReturningButton();
        }
    }

    // Weeks dropdown used to navigate to different weeks in the competition
    const createWeeksDropdown = function() {
        // Create the select dropdown
        const select = document.createElement("select");
        select.id = "week-select";

        // Add options from 1 to numberOfWeeks
        for (let i = 1; i <= competitionData.numberOfWeeks; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = `Week ${i}`;
            select.appendChild(option);
        }

        return {select}
    }

    // Arrow buttons to navigate between consecutive weeks in the competition
    const createArrows = function() {
        // Create Div for navigation functions to sit inside
        const navDiv = document.getElementById("nav-div");
        const weeksNavDiv = document.createElement("div");
        weeksNavDiv.id = "nav-weeks";
        navDiv.appendChild(weeksNavDiv);

        // Create left arrow button and add properties
        const leftArrow = document.createElement("button");
        const leftArrowImage = document.createElement("img");
        leftArrow.id = "left-arrow";
        leftArrow.className = "arrow-button";
        leftArrowImage.alt = "Previous";
        leftArrowImage.src = images.arrowLeft;
        leftArrow.appendChild(leftArrowImage);

        // Create right arrow button and add properties
        const rightArrow = document.createElement("button");
        const rightArrowImage = document.createElement("img");
        rightArrow.id = "right-arrow";
        rightArrow.className = "arrow-button";
        rightArrowImage.alt = "Previous";
        rightArrowImage.src = images.arrowRight;
        rightArrow.appendChild(rightArrowImage);

        // Create weeks dropdown
        const dropdown = createWeeksDropdown ();

        // Put everything together
        weeksNavDiv.appendChild(leftArrow);
        weeksNavDiv.appendChild(dropdown.select);
        weeksNavDiv.appendChild(rightArrow);
    }

    // Create div for navigation to results page
    const createResultsNavDiv = function() {
        const navDiv = document.getElementById("nav-div");
        const navResults = document.createElement("div");
        navResults.id = "nav-results";
        navDiv.appendChild(navResults);
    }

    // Create button to go to results page
    const createResultsButton = function() {
        const navResults = document.getElementById("nav-results");

        // Create link and button and put these together
        const resultsLink = document.createElement("a");
        resultsLink.href = "results.html";
        const resultsButton = document.createElement("button");
        resultsButton.textContent="See Results";
        resultsButton.id="see-results";

        resultsLink.appendChild(resultsButton);
        navResults.appendChild(resultsLink);

        // Add event listener
        resultsButton.addEventListener("click", storage.saveData);
    }

    // Create init function with all of the display functions that need to be run on start up
    const init = function() {
        universalDisplay.createHeading();
        universalDisplay.createButtons(false, true, false, true);
        createEpisodeHeaders();
        displayQueens();
        createReturningButton();
        universalDisplay.createNavDiv();
        createArrows();
        createResultsNavDiv();
        createResultsButton();
        universalDisplay.createResetButton("nav-results");
    }

    // Create weekUpdate function with all of the display functions that need to be run when currentStatus.week is updated
    const weekUpdate = function() {
        console.log(`control.weekUpdate: Display updated for week ${currentStatus.week}`);
        document.getElementById("left-arrow").style.display = currentStatus.week > 1 ? "inline-block" : "none";
        document.getElementById("right-arrow").style.display = currentStatus.week < competitionData.numberOfWeeks ? "inline-block" : "none";

        const weekDropdown = document.getElementById("week-select");
        weekDropdown.value = currentStatus.week.toString();

        updateEpisodeHeaders();
        updatePlacementDropdownWeek();
        updatePlacementDropdown();
    }

    return {init, weekUpdate, updatePlacementDropdown};
})();

// Functions to link DOM elements with controlling the site
const control = (function () {
    let previousWeek=currentStatus.week;

    // Link arrow buttons with currentStatus.week
    const arrowListeners = function () {
        // Select arrow button elements
        const leftArrow = document.getElementById("left-arrow");
        const rightArrow = document.getElementById("right-arrow");

        // Create function to increment currentStatus.week by one 
        const incrementWeek = function(change) {
            previousWeek=currentStatus.week;
            if (change==="decrease" && currentStatus.week > 1) {currentStatus.week--};
            if (change==="increase" && currentStatus.week < competitionData.numberOfWeeks) {currentStatus.week++};

            console.log(`control.arrowListeners: Week updated to ${currentStatus.week}`);
            display.weekUpdate(); // Update display
        }

        // Add event listeners to arrow buttons
        leftArrow.addEventListener("click", function () {incrementWeek("decrease")});
        rightArrow.addEventListener("click", function () {incrementWeek("increase")});

        // Add event listener to arrow keys
        document.addEventListener("keyup", function(e) {
            if (e.key==="ArrowLeft" || e.key==="ArrowRight"){
                e.preventDefault();
                if (e.key==="ArrowLeft") {incrementWeek("decrease")};
                if (e.key==="ArrowRight") {incrementWeek("increase")};
            }
          });
    };

    // Add event listener to weeks dropdown
    const weekDropdownListener = function() {
        // Select dropdown
        const weekSelect = document.getElementById("week-select");

        // Update currentStatus.week to match dropdown
        weekSelect.addEventListener("change", function (e) {
            if (e.target.id === "week-select") {
                previousWeek=currentStatus.week;
                currentStatus.week = parseInt(e.target.value);
                console.log(`control.weekDropdownListener: Week updated to ${currentStatus.week}`);
                display.weekUpdate(); // Update display
            }
        });
    }

    // Function to get latest version of previousWeek from outside of the object
    const getPreviousWeek = function() {
        return previousWeek;
    }

    // Function to update placements for each queen based on what has been selected by user
    const placementUpdateListener = function () {
        // Cycle through each queen
        for (let i = 0; i < queens.numberOfQueens; i++) {
            // Select dropdown
            const dropdown=document.getElementById(`queen-dropdown${i}`);

            // Add event listener to track any changes in queen placement selected in the dropdown
            dropdown.addEventListener("change", function(e) {
                // Initialise eliminated as false, will be updated for each week
                let eliminated = false;

                // Get selected value and set queen placement equal to this value
                const dropdownValue = e.target.value;
                queens.queens[i].placement[currentStatus.week - 1] = dropdownValue;

                const isEliminated = function(val) {
                    return val==="Eliminated" || val==="Quit"
                }

                // Dropdown is set to Eliminated or Quit in the current week then set eliminated to true
                eliminated = isEliminated(dropdownValue);

                console.log(`control.placementUpdateListener: Function ran, week: ${currentStatus.week}, queen: ${queens.queens[i].queen}, placement: ${dropdownValue}`);

                // Cycle through the subsequent weeks
                for (let j = currentStatus.week; j < competitionData.numberOfWeeks; j++) {
                    // Get initial values of placement and return for this week and value from dropdown
                    const initialPlacement = queens.queens[i].initialPlacement[j];
                    const initialReturns = queens.queens[i].initialReturn[j];

                    // If queen returns then set value of eliminated back to false
                    if (queens.queens[i].return[j]===true && !isEliminated(queens.queens[i].placement[j])) {eliminated = false};

                    // Logic for if queen is eliminated
                    if (eliminated===true && queens.queens[i].placement[j]!=="Out") {
                        // Set all weeks where queen is eliminated to Out
                        if ((queens.queens[i].return[j]===false) || !isEliminated(queens.queens[i].placement[j])) {
                            queens.queens[i].placement[j]="Out"
                        };

                    } 

                    if (eliminated===false) {
                        // If queen is not eliminated and was not eliminated by this stage in the original competition results then set to original results
                        if (queens.queens[i].placement[j]==="Out" && initialPlacement!=="Out") {
                            queens.queens[i].placement[j] = initialPlacement;
                        };
                        // If queen was eliminated by this point then set to Safe
                        if (queens.queens[i].placement[j]==="Out" && initialPlacement==="Out") {
                            queens.queens[i].placement[j] = j < competitionData.numberOfWeeks-1 ? "Safe" : "Runner Up";
                        };

                        // Set returns back to false since in the competition
                        queens.queens[i].return[j]=false;
                    } 

                if (isEliminated(queens.queens[i].placement[j])) {eliminated=true};
                }
                display.updatePlacementDropdown(currentStatus.week);
            });
        }
    };

    // Function to update the returns macro for each queen depending on placements selected by user
    const returningUpdate = function () {
        const updatePlacements = function(queen, returning) {    
            if (returning==="Yes") {
                // If queen is returning then set subsequent results to Safe, or original placement in competition if queen had not been eliminated by that point 
                for (let j = currentStatus.week-1; j < competitionData.numberOfWeeks; j++) {
                    queen.return[j] = j===currentStatus.week-1 ? true : queen.initialReturn[j];
                    if (queen.initialPlacement[j]==="Out") {
                        queen.placement[j] = j < competitionData.numberOfWeeks-1 ? "Safe" : "Runner Up";
                    } else {
                        queen.placement[j] = queen.initialPlacement[j]
                    };
                };
            } else if (returning==="No") {
                // If queen is not returning then ensure all subsequent values are set to Out unless queen returns again
                for (let j = currentStatus.week-1; j < competitionData.numberOfWeeks; j++) {
                    queen.return[j] = j===currentStatus.week-1 ? false : queen.initialReturn[j];
                    queen.placement[j] = queen.return[j]===false ? "Out" :  queen.initialPlacement[j];
                };
            }
            display.updatePlacementDropdown(currentStatus.week); // Update display
        }

        // Attach listeners to radio buttons for each queen
        for (let i = 0; i < queens.numberOfQueens; i++) {
            const yesRadio = document.getElementById(`returningYes${i}`);
            const noRadio = document.getElementById(`returningNo${i}`);
            
            if (yesRadio) {yesRadio.addEventListener("change", () => updatePlacements(queens.queens[i], "Yes"))};
            if (noRadio) {noRadio.addEventListener("change", () => updatePlacements(queens.queens[i], "No"))};
        }
    };

    // Event listener for the Reset Results button which sets results back to the original competition placements
    const resetListener = function () {
        const resetButton = document.getElementById("reset-results");
        resetButton.addEventListener("click", function () {
            universalControl.resetResults();
            for (let i = 0; i < queens.numberOfQueens; i++) { display.updatePlacementDropdown()}
        });
    };

    // Group all event listeners together
    const eventListeners = function () {
        arrowListeners();
        weekDropdownListener();
        placementUpdateListener();
        returningUpdate();
        resetListener();
    }

    return { getPreviousWeek, eventListeners, placementUpdateListener };
})();

storage.getData();
display.init();
display.weekUpdate();
control.eventListeners();