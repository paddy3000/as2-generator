var week=1;

const competitionData = {
    numberOfWeeks: 8,
    episodes: ["All Star Talent Show Extravaganza", "All Stars Snatch Game", "HERstory of the World", "Drag Movie Shequels", "Revenge Of The Queens", "Drag Fish Tank", "Family That Drags Together", "All Stars Supergroup"],
    episodeType: ["Talent Show", "Snatch Game", "Rusical", "Acting", "Stand-up", "Advert", "Makeover", "Finale"],
    lipSyncs: ["Shake It Off by Taylor Swift", "Le Freak (Freak Out) by Chic", "Tell It To My Heart by Taylor Dayne", "Got To Be Real by Cheryl Lynn", "Shut Up & Drive by Rihanna", "Cherry Bomb by Joan Jett and the Blackhearts", "Step It Up by RuPaul feat. Dave Audé", "If I Were Your Woman by Gladys Knight & The Pips"],
    synopses: ["10 queens return to compete for $100,000 and a place in the Drag Race Hall of Fame. The first test is to compete in a drag talent show. With guest judge Raven-Symoné.",
               "The queens impersonate celebrities in a quick-witted TV game show and burn rubber in a latex runway. With guest judge Ross Mathews.",
               "The queens are challenged to perform in a lip-syncing dance number inspired by the legendary historical women. Fashion designer Jeremy Scott guest judges.",
               "The queens' acting chops are tested in parody movie sequels of RuPaul's favorite movies. Pussycat Doll Nichole Scherzinger guest judges.",
               "The queens must perform a live stand-up comedy act in front of an audience of judgmental drag queens. Ross Mathews returns to guest judge.",
               "The queens design and market drag-influenced products. Entrepreneur Marcus Lemonis (CNBC’s The Profit) co-stars, and comedian Graham Norton guest judges.",
               "The queens must makeover family members and vogue the house down. Aubrey Plaza (Parks and Recreation) guest judges.",
               "The winner of RuPaul’s Drag Race All Stars is crowned. But first, the queens must write original rap lyrics and perform as the ultimate girl group."] ,
    runways: [null, "Latex Eleganza", "The Future of Drag", "Two Looks in One", null, "Pants on the Runway", "Makeover Challenge", "Final Eleganza"],
    competitiveEpisode: [true, true, true, true, true, true, true, false],
    placements: ["Win", "Top 2", "High", "Safe", "Low", "Bottom", "Eliminated", "Out", "Quit"],
    finalePlacements: ["Winner", "Runner Up", "Eliminated", "Out"]
}

const competitionMechanics = {
    calculatePoints: function(placement) {
        if (placement="Win") {let points=6}
        else if (placement==="Top 2") {points=5}
        else if (placement==="High") {points=4}
        else if (placement==="Safe") {points=3}
        else if (placement==="Low") {points=2}
        else if (placement==="Bottom") {points=1}
        else if (placement==="Eliminated") {points=0}
        else if (placement==="Out" || placement==="Quit") {points=0};
        return points;
    }
}

const queens = (function () {
    const queen0 = {
        queen: "Adore Delano",
        initialPlacement: ["Bottom", "Quit", "Out", "Out", "Out", "Out", "Out", "Out"],
        initialReturn: Array(competitionData.numberOfWeeks).fill(false),
    };

    const queen1 = {
        queen: "Alaska",
        initialPlacement: ["High", "Win", "Safe", "Win", "Top 2", "Win", "Bottom", "Winner"],
        initialReturn: Array(competitionData.numberOfWeeks).fill(false)
    };

    const queen2 = {
        queen: "Alyssa Edwards",
        initialPlacement: ["Safe", "Safe", "Win", "Eliminated", "Win", "High", "Eliminated", "Out"],
        initialReturn: [false, false, false, false, true, false, false, false]
    };

    const queen3 = {
        queen: "Coco Montrese",
        initialPlacement: ["Eliminated", "Out", "Out", "Out", "Out", "Out", "Out", "Out"],
        initialReturn: Array(competitionData.numberOfWeeks).fill(false),
    };
    
    const queen4 = {
        queen: "Detox",
        initialPlacement: ["Safe", "Bottom", "Top 2", "Safe", "Top 2", "Safe", "Win", "Runner Up"],
        initialReturn: Array(competitionData.numberOfWeeks).fill(false),
    };
    
    const queen5 = {
        queen: "Ginger Minj",
        initialPlacement: ["High", "Safe", "Eliminated", "Out", "Out", "Out", "Out", "Out"],
        initialReturn: Array(competitionData.numberOfWeeks).fill(false),
    };
    
    const queen6 = {
        queen: "Katya",
        initialPlacement: ["Safe", "Top 2", "Bottom", "Bottom", "Safe", "Top 2", "Top 2", "Runner Up"],
        initialReturn: Array(competitionData.numberOfWeeks).fill(false),
    };
    
    const queen7 = {
        queen: "Phi Phi O'Hara",
        initialPlacement: ["Bottom", "High", "Safe", "Top 2", "Eliminated", "Out", "Out", "Out"],
        initialReturn: Array(competitionData.numberOfWeeks).fill(false),
    };
    
    const queen8 = { 
        queen: "Roxxxy Andrews",
        initialPlacement: ["Win", "Bottom", "Safe", "Bottom", "Bottom", "Bottom", "Bottom", "Eliminated"],
        initialReturn: Array(competitionData.numberOfWeeks).fill(false),
    };
    
    const queen9 = {
        queen: "Tatianna",
        initialPlacement: ["Top 2", "Eliminated", "Out", "Out", "Win", "Eliminated", "Out", "Out"],
        initialReturn: [false, false, false, false, true, false, false, false],
    };

    const queens = [queen0, queen1, queen2, queen3, queen4, queen5, queen6, queen7, queen8, queen9];

    queens.forEach((queen) => {
        queen.placement=queen.initialPlacement.slice();
        queen.return=queen.initialReturn.slice();
        queen.img=`images/${queen.queen.replaceAll(" ", "").replaceAll("'","")}AS2.webp`
    })

    const numberOfQueens = queens.length;
    return {queens, numberOfQueens};
})();

const images = {
    arrowLeft: "images/leftArrow.png",
    arrowRight: "images/rightArrow.png"
}

const divs = {
    queens: document.getElementById("queens-div"),
    nav: document.getElementById("nav-div"),
    navResults: document.getElementById("nav-results"),
    episodeInfo: document.getElementById("episode-info"),
    resultsTable: document.getElementById("results-table-div")
}

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

    const displayArrows = function() {
        divs.nav.innerHTML="";

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

        divs.nav.appendChild(leftArrow);
        divs.nav.appendChild(dropdown.select);
        divs.nav.appendChild(rightArrow);
    }

    const displayResultsButton = function() {
        const resultsButton = document.createElement("button");
        resultsButton.textContent="See Results";
        resultsButton.id="see-results";
        divs.navResults.appendChild(resultsButton);
    }

    const displayResetButton = function() {
        const resetButton = document.createElement("button");
        resetButton.textContent="Reset Results";
        resetButton.id="reset-results";
        divs.navResults.appendChild(resetButton);
    }

    const challengeHeaders = function() {
        title  = competitionData.episodes[week-1];
        lipSync = competitionData.lipSyncs[week-1];
        synopsis = competitionData.synopses[week-1];
        runway = competitionData.runways[week-1];

        divs.episodeInfo.innerHTML = `
            <h2 id="episode-title">${title}</h2>
            <p id="synopsis">${synopsis}</p>
            ${runway ? `<p id="runway-theme"><b>Runway theme:</b> ${runway}</p>` : ""}
            <p id="lip-sync-song"><b>Lip-sync song:</b> ${lipSync}</p>`;
    }

    const displayQueens = function() {
        const displayObjects = new Array(queens.numberOfQueens);
        for (let i = 0; i < queens.numberOfQueens; i++) {
            displayObjects[i]=document.createElement("div");
            displayObjects[i].id=`queen${i}`;
            displayObjects[i].innerHTML=`<div id="queen-image-box${i}"><img src=${queens.queens[i].img} class="queen-image" id="queen-image${i}"></div>
                                         <h3 class="queen-name">${queens.queens[i].queen}</h3>`;

            divs.queens.appendChild(displayObjects[i]);
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
            const placementAtWeek = queens.queens[i].placement[week-1];
            const placementAtPrevious = week>1 ? queens.queens[i].placement[week-2] : null;
            const returnAtPrevious= week>1 ? queens.queens[i].return[week-2] : null;
            const returningDiv = document.getElementById(`returning${i}`);


            const yesRadio = document.getElementById(`returningYes${i}`);
            const noRadio = document.getElementById(`returningNo${i}`);

            yesRadio.checked = queens.queens[i].return[week-1];
            noRadio.checked = !queens.queens[i].return[week-1];

            returningDiv.style.display = placementAtPrevious==="Out" || placementAtPrevious==="Quit" || placementAtPrevious==="Eliminated" ? "flex" : "none";
        }
    };

    const createPlacementDropdown = function(div, id) {
        // Create the select dropdown
        const select = document.createElement("select");
        select.className = "placement-select";

        placementsArray = week < competitionData.numberOfWeeks ? competitionData.placements.slice() : competitionData.finalePlacements.slice();

        // Add options from 1 to numberOfWeeks
        for (let i = 0; i <= placementsArray.length-1; i++) {
            if ( placementsArray[i]!=="Out"){
                const option = document.createElement("option");
                option.textContent = placementsArray[i];
                option.value = placementsArray[i];
                select.appendChild(option);
            }
        }
        
        select.id=id;
        div.append(select);
    }

    const updatePlacementDropdownWeek = function() {
        if ((week===competitionData.numberOfWeeks && interface.getPreviousWeek()!==competitionData.numberOfWeeks) 
            || (week!==competitionData.numberOfWeeks && interface.getPreviousWeek()===competitionData.numberOfWeeks)) {
            for (i=0; i < queens.numberOfQueens; i++) {
                const queenDropdown = document.getElementById(`queen-dropdown${i}`);
                queenDropdown.remove();

                const innerDiv = document.getElementById(`queen${i}`);
                createPlacementDropdown(innerDiv, `queen-dropdown${i}`);
            };
            // Add event listener back to dropdown
            interface.placementUpdateListener();
        }
    }

    const updatePlacementDropdown = function() {
        for (let i = 0; i < queens.numberOfQueens; i++) {
            const queenDropdown = document.getElementById(`queen-dropdown${i}`);
            const queenImage = document.getElementById(`queen-image${i}`);
            const queenImageBox = document.getElementById(`queen-image-box${i}`);
            const placementAtWeek = queens.queens[i].placement[week-1];

            queenDropdown.value = placementAtWeek;
            queenDropdown.style.display = placementAtWeek!=="Out" ? "inline-block" : "none";

            queenImage.className = "queen-image " + placementAtWeek.toLowerCase().replaceAll(" ", "");
            queenImageBox.className = "queen-image-box " + placementAtWeek.toLowerCase().replaceAll(" ", "");
            if (week===competitionData.numberOfWeeks) {queenImageBox.className = queenImageBox.className + " finale"};

            updateReturningButton();
            // if (placementAtWeek==="Out") {queenImage.className="queen-image out"}
            // else {queenImage.className="queen-image"};
        }
    }

    const init = function() {
        displayQueens();
        createReturningButton();
        displayArrows();
        displayResultsButton();
        displayResetButton();
    }

    const weekUpdate = function() {
        document.getElementById("left-arrow").style.display = week > 1 ? "inline-block" : "none";
        document.getElementById("right-arrow").style.display = week < competitionData.numberOfWeeks ? "inline-block" : "none";

        const weekDropdown = document.getElementById("week-select");
        weekDropdown.value = week.toString();

        challengeHeaders();
        updatePlacementDropdownWeek();
        updatePlacementDropdown();
    }

    return {init, weekUpdate, updatePlacementDropdown};
})();


const interface = (function () {
    var previousWeek=week;

    const arrowListeners = function () {
        divs.nav.addEventListener("click", function (e) {
            if (e.target.id === "left-arrow" && week > 1) {
                previousWeek=week;
                week--;
                display.weekUpdate();
            } else if (e.target.id === "right-arrow" && week < competitionData.numberOfWeeks) {
                previousWeek=week;
                week++;
                display.weekUpdate();
            }
        });

        divs.nav.addEventListener("change", function (e) {
            if (e.target.id === "week-select") {
                previousWeek=week;
                week = parseInt(e.target.value);
                display.weekUpdate();
            }
        });
    }

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
                queens.queens[i].placement[week - 1] = dropdownValue;

                // Cycle through the subsequent weeks
                for (let j = week; j < competitionData.numberOfWeeks; j++) {
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
                display.updatePlacementDropdown();
            });
        }
    };

    const returningUpdate = function () {
        const updatePlacements = function(queen, returning) {
            // const placementAtWeek = queen.placement[week-1];
            const placementAtNext = week<competitionData.numberOfWeeks ? queen.placement[week] : null;
            const returningAtNext = week<competitionData.numberOfWeeks ? queen.return[week] : null;

            
            if (returning==="Yes") {
                for (let j = week-1; j < competitionData.numberOfWeeks; j++) {
                    queen.return[j] = j===week-1 ? true : queen.initialReturn[j];
                    queen.placement[j] = queen.initialPlacement[j]==="Out" ? "Safe" :  queen.initialPlacement[j];
                };
            } else if (returning==="No") {
                for (let j = week-1; j < competitionData.numberOfWeeks; j++) {
                    queen.return[j] = j===week-1 ? false : queen.initialReturn[j];
                    queen.placement[j] = queen.return[j]===false ? "Out" :  queen.initialPlacement[j];
                };
            }
            display.updatePlacementDropdown();
        }

        for (let i = 0; i < queens.numberOfQueens; i++) {
            const yesRadio = document.getElementById(`returningYes${i}`);
            const noRadio = document.getElementById(`returningNo${i}`);
            
            if (yesRadio) {yesRadio.addEventListener("change", () => updatePlacements(queens.queens[i], "Yes"))};
            if (noRadio) {noRadio.addEventListener("change", () => updatePlacements(queens.queens[i], "No"))};
        }
    };

    const updateResultsTable = function () {
        const resultsButton = document.getElementById("see-results");

        resultsButton.addEventListener("click", displayProgress.createTable)
    };

    const resetResults = function () {
        const resetButton = document.getElementById("reset-results");

        resetButton.addEventListener("click", function () {
            for (i=0; i < queens.numberOfQueens; i++) {
                queens.queens[i].placement = queens.queens[i].initialPlacement.slice();

                display.updatePlacementDropdown();
            }
        });
    };

    const eventListeners = function () {
        arrowListeners();
        placementUpdateListener();
        returningUpdate();
        updateResultsTable();
        resetResults();
    }

    return { getPreviousWeek, eventListeners, placementUpdateListener };
})();

const displayProgress = (function () {
    // Format to change full typed out results to what appears in the results table
    const formatResult = function(result) {
        if (result==="Bottom") {return "BTM"}
        else if (result==="Eliminated") {return "ELIM"}
        else if (result==="Out") {return ""}
        else {return result.toUpperCase()}
    };

    // Points per episode function
    const resultPoints = function(result) {
        if (result==="Eliminated") {return 0}
        else if (result==="Quit") {return 0}
        else if (result==="Bottom") {return 1}
        else if (result==="Low") {return 2}
        else if (result==="Safe") {return 3}
        else if (result==="High") {return 4}
        else if (result==="Top 2") {return 5}
        else if (result==="Win") {return 6}
        else if (result==="Winner") {return 999}
        else if (result==="Runner Up") {return 998}
        else {console.log(`Warning: Update resultPoints format to account for ${result}`)}

    }

    // Function to create object with elimination order for the queens
    const eliminationOrder = function () {
        weeksInCompetition = new Array(queens.numberOfQueens);
        for (let i=0; i < queens.numberOfQueens; i++) {
            var lastWeekIn=1;
            var lastPoints=0;

            // Get last week where queen is not "Out"
            for (let j=0; j < competitionData.numberOfWeeks; j++){
                if (queens.queens[i].placement[j]!=="Out") {
                    lastWeekIn=j+1;
                    lastPoints=resultPoints(queens.queens[i].placement[j]);
                };
            }

            weeksInCompetition[i]={index: i,
                                   queen: queens.queens[i].queen,
                                   weeks: lastWeekIn,
                                   lastPoints: lastPoints
                                };

        }

        // Sort by number of points in the last week so that finale winner is shown first
        weeksInCompetition.sort((a,b) => b.lastPoints - a.lastPoints);
        weeksInCompetition.sort((a,b) => b.weeks - a.weeks);
        return weeksInCompetition;        
    }

    const calculatePPE = function () {
        ppeScores = new Array(queens.numberOfQueens);

        for (i = 0; i < queens.numberOfQueens; i++) {
            var weeksInCompetition=0;
            var totalPoints=0;

            for (j = 0; j < competitionData.numberOfWeeks; j++) {
                if (queens.queens[i].placement[j]!=="Out" && queens.queens[i].placement[j]!=="Quit" && competitionData.competitiveEpisode[j]) {
                    weeksInCompetition++;
                    totalPoints += resultPoints(queens.queens[i].placement[j]);
                }
            }

            ppe = totalPoints / weeksInCompetition;

            ppeRounded = Math.round(ppe*100)/100;

            ppeScores[i] = {index: i,
                            queen: queens.queens[i].queen,
                            ppe: ppeRounded
            }
        }

        return ppeScores;
    }

    const createTable = function () {
        // Create empty table elements
        const tbl = document.createElement("table");
        tbl.id = "results-table";
        const tblBody = document.createElement("tbody");
        const tblHeader=document.createElement("thead");

        headerRow1=document.createElement("tr");
        headerRow2=document.createElement("tr");
        headerRow3=document.createElement("tr");

        // Create blank cell which will appear above the queen names
        const queensHeader=document.createElement("th");
        queensHeader.textContent="";
        queensHeader.className="queen-name"
        queensHeader.rowSpan=3;

        // Create weeks header that says "Epsiodes"
        const weeksHeader=document.createElement("th");
        weeksHeader.textContent="Epsiode";
        weeksHeader.className="weeks-header";
        weeksHeader.colSpan=competitionData.numberOfWeeks;

        // Create blank cell with "PPE"
        const ppeHeader=document.createElement("th");
        ppeHeader.textContent="PPE";
        ppeHeader.className="ppe-header";
        ppeHeader.rowSpan=3;

        // Put together the two cells to create the first row of the header
        headerRow1.appendChild(queensHeader);
        headerRow1.appendChild(weeksHeader);
        headerRow1.appendChild(ppeHeader);

        // Loop through each week to create headers and short episode summary
        for (let i=0; i < competitionData.numberOfWeeks; i++) {
            const weekNum = document.createElement("th");
            weekNum.textContent=`${i+1}`;
            headerRow2.appendChild(weekNum);

            const episodeType = document.createElement("th");
            episodeType.textContent=`${competitionData.episodeType[i]}`;
            episodeType.className="episode-type";
            headerRow3.appendChild(episodeType);
        };

        // Put header rows all together
        tblHeader.appendChild(headerRow1);
        tblHeader.appendChild(headerRow2);
        tblHeader.appendChild(headerRow3);

        // Get elimination order of queens
        const sortedQueens = eliminationOrder();

        // Get content for table body
        for (let k = 0; k < queens.numberOfQueens; k++) {
            // Replace index k with index i which selects the queens in order of elimination
            const i = sortedQueens[k].index;

            // Get queen name
            const row = document.createElement("tr");
            const queenNameCell = document.createElement("th");
            const queenName = document.createTextNode(queens.queens[i].queen);
      
            // Append queen name to row
            queenNameCell.appendChild(queenName);
            queenNameCell.className="queen-name"
            row.appendChild(queenNameCell);

            // Get results for each week and add to row
            for (j = 0; j < competitionData.numberOfWeeks; j++) {
                // Formatted result for table
                const formattedResult = formatResult(queens.queens[i].placement[j]);
                const weekCell = document.createElement("td");
                const weekResult = document.createTextNode(formattedResult);
                weekCell.className="result " + formattedResult.toLowerCase().replaceAll(" ", "");
                if (j === competitionData.numberOfWeeks-1) {
                    weekCell.className += " finale-cell";
                };
                weekCell.appendChild(weekResult);
                row.appendChild(weekCell);
            }

            ppeScores = calculatePPE();
            const ppe = document.createElement("td");
            const ppeText = document.createTextNode(`${ppeScores[i].ppe}`);
            ppe.className = "ppe-cell";
            ppe.appendChild(ppeText);
            row.appendChild(ppe);

            row.className="queen-result-row";
            row.id=`queen${i}-result-row`; // Initial index of queen, not row number in the table
            tblBody.appendChild(row);        
        }

        // Reset HTML and add complete table
        divs.resultsTable.innerHTML="";
        tbl.appendChild(tblHeader);
        tbl.appendChild(tblBody);
        divs.resultsTable.appendChild(tbl);
    };

    return {createTable};
})();

display.init();
display.weekUpdate();
displayProgress.createTable();
interface.eventListeners();