
import {queens, competitionData, storage, currentStatus, universalDisplay, images}  from "./script.js";

const display = (function () {
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

        // Append label and select to the container
        return {select}
    }

    const createArrows = function() {
        const navDiv = document.getElementById("nav-div");
        const weeksNavDiv = document.createElement("div");
        weeksNavDiv.id = "nav-weeks";
        navDiv.appendChild(weeksNavDiv);

        const leftArrow = document.createElement("input");
        leftArrow.type = "image";
        leftArrow.id = "left-arrow";
        leftArrow.alt = "Previous";
        leftArrow.src = images.arrowLeft;
        leftArrow.width = 60;

        const rightArrow = document.createElement("input");
        rightArrow.type = "image";
        rightArrow.id = "right-arrow";
        rightArrow.alt = "Next";
        rightArrow.src = images.arrowRight;
        rightArrow.width = 60;

        const dropdown = createWeeksDropdown ();

        weeksNavDiv.appendChild(leftArrow);
        weeksNavDiv.appendChild(dropdown.select);
        weeksNavDiv.appendChild(rightArrow);
    }

    const createResultsNavDiv = function() {
        const navDiv = document.getElementById("nav-div");
        const navResults = document.createElement("div");
        navResults.id = "nav-results";
        navDiv.appendChild(navResults);
    }

    const createResultsButton = function() {
        const navResults = document.getElementById("nav-results");

        const resultsLink = document.createElement("a");
        resultsLink.href = "results.html";

        const resultsButton = document.createElement("button");
        resultsButton.textContent="See Results";
        resultsButton.id="see-results";

        resultsButton.addEventListener("click", storage.saveData);

        resultsLink.appendChild(resultsButton);
        navResults.appendChild(resultsLink);
    }

    const createResetButton = function() {
        const navResults = document.getElementById("nav-results");
        
        const resetButton = document.createElement("button");
        resetButton.textContent="Reset Results";
        resetButton.id="reset-results";
        
        navResults.appendChild(resetButton);
    }

    const createEpisodeHeaders = function () {
        const episodeInfo = document.createElement("div");
        episodeInfo.id = "episode-info";
        episodeInfo.className = "subheading-div";
        document.body.appendChild(episodeInfo);
    }

    const updateEpisodeHeaders = function() {
        const title  = `Episode ${currentStatus.week}: ${competitionData.episodes[currentStatus.week-1]}`;
        const lipSync = competitionData.lipSyncs[currentStatus.week-1];
        const synopsis = competitionData.synopses[currentStatus.week-1];
        const runway = competitionData.runways[currentStatus.week-1];

        const episodeInfo = document.getElementById("episode-info");

        episodeInfo.innerHTML = `
            <h2 id="episode-title">${title}</h2>
            <p id="synopsis">${synopsis}</p>
            ${runway ? `<p id="runway-theme"><b>Runway theme:</b> ${runway}</p>` : ""}
            <p id="lip-sync-song"><b>Lip-sync song:</b> ${lipSync}</p>`;
    }

    const displayQueens = function() {
        const displayObjects = new Array(queens.numberOfQueens);
        const queensDiv = document.createElement("div");
        queensDiv.id="queens-div";
        document.body.appendChild(queensDiv);

        for (let i = 0; i < queens.numberOfQueens; i++) {
            displayObjects[i]=document.createElement("div");
            displayObjects[i].id=`queen${i}`;
            displayObjects[i].innerHTML=`<div id="queen-image-box${i}"><img src=${queens.queens[i].img} class="queen-image" id="queen-image${i}"></div>
                                         <h3 class="queen-name">${queens.queens[i].queen}</h3>`;

            
            queensDiv.appendChild(displayObjects[i]);
            const innerDiv = document.getElementById(`queen${i}`);
            createPlacementDropdown(innerDiv, `queen-dropdown${i}`);
        }
    }

    const createReturningButton = function () {
        for (let i = 0; i < queens.numberOfQueens; i++) {
            const queenDiv = document.getElementById(`queen${i}`);

            const returningDiv = document.createElement("div");
            returningDiv.id = `returning${i}`;
            returningDiv.className = "returningRadio";

            const elementsYes = document.createElement("div");
            elementsYes.className = "radio-elements";

            const elementsNo = document.createElement("div");
            elementsNo.className = "radio-elements";

            const labelReturning = document.createElement("p");
            labelReturning.textContent = "Returning?";

            const returningButtonYes = document.createElement("input");
            returningButtonYes.type = "radio";
            returningButtonYes.name = `returning_radio${i}`;
            returningButtonYes.value = "Yes";
            returningButtonYes.id = `returningYes${i}`;

            const labelYes = document.createElement("label");
            labelYes.htmlFor = `returningYes${i}`;
            labelYes.textContent = "Yes";

            const returningButtonNo = document.createElement("input");
            returningButtonNo.type = "radio";
            returningButtonNo.name = `returning_radio${i}`;
            returningButtonNo.value = "No";
            returningButtonNo.id = `returningNo${i}`;

            const labelNo = document.createElement("label");
            labelNo.htmlFor = `returningNo${i}`;
            labelNo.textContent = "No";

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

    const updateReturningButton = function () {
        for (let i = 0; i < queens.numberOfQueens; i++) {
            const placementAtWeek = queens.queens[i].placement[currentStatus.week-1];
            const placementAtPrevious = currentStatus.week>1 ? queens.queens[i].placement[currentStatus.week-2] : null;
            const returnAtPrevious= currentStatus.week>1 ? queens.queens[i].return[currentStatus.week-2] : null;
            const returningDiv = document.getElementById(`returning${i}`);


            const yesRadio = document.getElementById(`returningYes${i}`);
            const noRadio = document.getElementById(`returningNo${i}`);

            yesRadio.checked = queens.queens[i].return[currentStatus.week-1];
            noRadio.checked = !queens.queens[i].return[currentStatus.week-1];

            returningDiv.style.display = placementAtPrevious==="Out" || placementAtPrevious==="Quit" || placementAtPrevious==="Eliminated" ? "flex" : "none";
        }
    };

    const createPlacementDropdown = function(div, id) {
        // Create the select dropdown
        const select = document.createElement("select");
        select.className = "placement-select";

        const placementsArray = currentStatus.week < competitionData.numberOfWeeks ? competitionData.placements.slice() : competitionData.finalePlacements.slice();

        // Add options from 1 to numberOfWeeks
        for (let i = 0; i <= placementsArray.length-1; i++) {
            if ( placementsArray[i]!=="Out"){
                const option = document.createElement("option");
                option.textContent = placementsArray[i];
                option.value = placementsArray[i];
                select.appendChild(option);
            }
        };
        
        console.log(`display.createPlacementDropdown: Dropdown ${id} created`);

        select.id=id;
        div.append(select);
    }

    const updatePlacementDropdownWeek = function() {
        if ((currentStatus.week===competitionData.numberOfWeeks && control.getPreviousWeek()!==competitionData.numberOfWeeks) 
            || (currentStatus.week!==competitionData.numberOfWeeks && control.getPreviousWeek()===competitionData.numberOfWeeks)) {
            for (let i=0; i < queens.numberOfQueens; i++) {
                const queenDropdown = document.getElementById(`queen-dropdown${i}`);
                queenDropdown.remove();

                const innerDiv = document.getElementById(`queen${i}`);
                createPlacementDropdown(innerDiv, `queen-dropdown${i}`);
                console.log(`display.createPlacementDropdown: Dropdown created for ${queens.queens[i].queen}`);
            };
            // Add event listener back to dropdown
            control.placementUpdateListener();
        }
    }

    const updatePlacementDropdown = function() {
        for (let i = 0; i < queens.numberOfQueens; i++) {
            const queenDropdown = document.getElementById(`queen-dropdown${i}`);
            const queenImage = document.getElementById(`queen-image${i}`);
            const queenImageBox = document.getElementById(`queen-image-box${i}`);
            const placementAtWeek = queens.queens[i].placement[currentStatus.week-1];

            queenDropdown.value = placementAtWeek;
            queenDropdown.style.display = placementAtWeek!=="Out" ? "inline-block" : "none";

            queenImage.className = "queen-image " + placementAtWeek.toLowerCase().replaceAll(" ", "");
            queenImageBox.className = "queen-image-box " + placementAtWeek.toLowerCase().replaceAll(" ", "");
            if (currentStatus.week===competitionData.numberOfWeeks) {queenImageBox.className = queenImageBox.className + " finale"};

            updateReturningButton();
            // if (placementAtWeek==="Out") {queenImage.className="queen-image out"}
            // else {queenImage.className="queen-image"};
        }
    }

    const init = function() {
        universalDisplay.createHeading();
        createEpisodeHeaders();
        displayQueens();
        createReturningButton();
        universalDisplay.createNavDiv();
        createArrows();
        createResultsNavDiv();
        createResultsButton();
        createResetButton();
    }

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


const control = (function () {
    let previousWeek=currentStatus.week;

    const arrowListeners = function () {
        const leftArrow = document.getElementById("left-arrow");
        const rightArrow = document.getElementById("right-arrow");

        leftArrow.addEventListener("click", function (e) {
            previousWeek=currentStatus.week;
            currentStatus.week--;
            console.log(`control.arrowListeners: Week decreased to ${currentStatus.week}`);
            display.weekUpdate();
        });

        rightArrow.addEventListener("click", function (e) {
            previousWeek=currentStatus.week;
            currentStatus.week++;
            console.log(`control.arrowListeners: Week increased to ${currentStatus.week}`);
            display.weekUpdate();
        });

        const weekSelect = document.getElementById("week-select");

        weekSelect.addEventListener("change", function (e) {
            if (e.target.id === "week-select") {
                previousWeek=currentStatus.week;
                currentStatus.week = parseInt(e.target.value);
                console.log(`arrowListeners: Week updated to ${currentStatus.week}`);
                display.weekUpdate(currentStatus.week);
            }
        });
    };

    const getPreviousWeek = function() {
        return previousWeek;
    } 

    const placementUpdateListener = function () {
        for (let i = 0; i < queens.numberOfQueens; i++) {
            const dropdown=document.getElementById(`queen-dropdown${i}`);
            
            let eliminated = false;

            dropdown.addEventListener("change", function(e) {
                const dropdownValue = e.target.value;

                // Initialise eliminated as false, will be updated for each week
                let eliminated = false;

                const isEliminated = function(val) {
                    return val==="Eliminated" || val==="Quit"
                }
                // Dropdown is set to Eliminated or Quit in the current week then set eliminated to true
                eliminated = isEliminated(dropdownValue);
                queens.queens[i].placement[currentStatus.week - 1] = dropdownValue;

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

                        // If queen returns in original competition results (like Tatianna) then set returns to true
                        // if (queens.queens[i].return[j]===false && initialReturns===true) {queens.queens[i].return[j]=true};
                        // queens.queens[i].return[j]=initialReturns;
                    } 
                    if (eliminated===false) {
                        // If queen is not eliminated and was not eliminated by this stage in the original competition results then set to original results
                        if (queens.queens[i].placement[j]==="Out" && initialPlacement!=="Out") {
                            queens.queens[i].placement[j] = initialPlacement;
                        };
                        // If queen was eliminated by this point then set to Safe
                        if (queens.queens[i].placement[j]==="Out" && initialPlacement==="Out") {
                            queens.queens[i].placement[j] = j<competitionData.numberOfWeeks-1 ? "Safe" : "Runner Up";
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

    const returningUpdate = function () {
        const updatePlacements = function(queen, returning) {
            // const placementAtWeek = queen.placement[currentStatus.week-1];
            const placementAtNext = currentStatus.week<competitionData.numberOfWeeks ? queen.placement[currentStatus.week] : null;
            const returningAtNext = currentStatus.week<competitionData.numberOfWeeks ? queen.return[currentStatus.week] : null;

            
            if (returning==="Yes") {
                for (let j = currentStatus.week-1; j < competitionData.numberOfWeeks; j++) {
                    queen.return[j] = j===currentStatus.week-1 ? true : queen.initialReturn[j];
                    queen.placement[j] = queen.initialPlacement[j]==="Out" ? "Safe" :  queen.initialPlacement[j];
                };
            } else if (returning==="No") {
                for (let j = currentStatus.week-1; j < competitionData.numberOfWeeks; j++) {
                    queen.return[j] = j===currentStatus.week-1 ? false : queen.initialReturn[j];
                    queen.placement[j] = queen.return[j]===false ? "Out" :  queen.initialPlacement[j];
                };
            }
            display.updatePlacementDropdown(currentStatus.week);
        }

        for (let i = 0; i < queens.numberOfQueens; i++) {
            const yesRadio = document.getElementById(`returningYes${i}`);
            const noRadio = document.getElementById(`returningNo${i}`);
            
            if (yesRadio) {yesRadio.addEventListener("change", () => updatePlacements(queens.queens[i], "Yes", currentStatus.week))};
            if (noRadio) {noRadio.addEventListener("change", () => updatePlacements(queens.queens[i], "No", currentStatus.week))};
        }
    };

    // Code from when the results table was included on the main page
    // const updateResultsTable = function () {
    //     const resultsButton = document.getElementById("see-results");

    //     resultsButton.addEventListener("click", displayProgress.createTable)
    // };

    const resetResults = function () {
        const resetButton = document.getElementById("reset-results");

        resetButton.addEventListener("click", function () {
            for (let i = 0; i < queens.numberOfQueens; i++) {
                queens.queens[i].placement = queens.queens[i].initialPlacement.slice();

                display.updatePlacementDropdown();
            }

            storage.saveData();
        });
    };

    const eventListeners = function () {
        arrowListeners();
        placementUpdateListener();
        returningUpdate();
        resetResults();
    }

    return { getPreviousWeek, eventListeners, placementUpdateListener };
})();

storage.getData();
display.init();
display.weekUpdate();
control.eventListeners();