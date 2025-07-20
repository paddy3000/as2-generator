import { queens, competitionData, storage, universalDisplay, universalControl, points} from "./script.js";

const displayGeneric = (function() {
    const createHeaders = function() {
        const subheadingDiv = document.createElement("div");
        subheadingDiv.id = "results-subheading";
        subheadingDiv.className = "subheading-div";

        const subheading = document.createElement("h2");
        subheading.textContent = "Contestant Progress"

        subheadingDiv.appendChild(subheading);
        document.body.appendChild(subheadingDiv);
        console.log("displayGeneric.createHeaders: Subheading created");
    };
    
    const createResultsDiv = function () {
        const resultsDiv = document.createElement("div");
        resultsDiv.id = "results-div";

        const resultsTable = document.createElement("div");
        resultsTable.id = "results-table-div";

        const resultsChart = document.createElement("div");
        resultsChart.id = "results-chart-div";
        
        resultsDiv.appendChild(resultsTable);
        resultsDiv.appendChild(resultsChart);

        document.body.appendChild(resultsDiv);
    };

    const createNavDiv = function() {
        universalDisplay.createNavDiv();
        const navDiv = document.getElementById("nav-div");

        universalDisplay.createResetButton("nav-div");
    };

    const init = function () {
        universalDisplay.createHeading();
        universalDisplay.createButtons(true, true, true, true);
        createHeaders();
        createResultsDiv();
        createNavDiv();
        graph.createGraph();
    }


    return { init };
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
        const value = result!=="Quit" ? points.points.find(a => a.placement === result).value : 0;
        return Number(value);
    }

    // Function to create object with elimination order for the queens
    const eliminationOrder = function () {
        const weeksInCompetition = new Array(queens.numberOfQueens);
        for (let i=0; i < queens.numberOfQueens; i++) {
            var lastWeekIn=1;
            var finaleResult = 0;

            // Get last week where queen is not "Out"
            for (let j=0; j < competitionData.numberOfWeeks; j++){
                if (queens.queens[i].placement[j]!=="Out") {
                    lastWeekIn=j+1;
                    if (j===competitionData.numberOfWeeks-1) {
                        if (queens.queens[i].placement[j]==="Winner") {finaleResult=1};
                        if (queens.queens[i].placement[j]==="Runner Up") {finaleResult=2};
                        if (queens.queens[i].placement[j]==="Eliminated") {finaleResult=3};

                    }
                };
            }

            weeksInCompetition[i]={index: i,
                                   queen: queens.queens[i].queen,
                                   weeks: lastWeekIn,
                                   finaleResult: finaleResult
                                };

        }

        // Sort by number of points in the last week so that finale winner is shown first
        weeksInCompetition.sort((a,b) => a.finaleResult - b.finaleResult);
        weeksInCompetition.sort((a,b) => b.weeks - a.weeks);
        return weeksInCompetition;        
    }

    const calculatePPE = function () {
        const ppeScores = new Array(queens.numberOfQueens);

        for (let i = 0; i < queens.numberOfQueens; i++) {
            var weeksInCompetition=0;
            var totalPoints=0;
            const totalPointsArray = new Array(competitionData.numberOfWeeks);

            for (let j = 0; j < competitionData.numberOfWeeks; j++) {
                if (queens.queens[i].placement[j]!=="Out" && queens.queens[i].placement[j]!=="Quit" && competitionData.competitiveEpisode[j]) {
                    weeksInCompetition++;
                    totalPoints += resultPoints(queens.queens[i].placement[j]);
                }

                if (queens.queens[i].placement[j]!=="Out") {totalPointsArray[j] = totalPoints};
            }

            const ppe = totalPoints / weeksInCompetition;
            const ppeRounded = Math.round(ppe*100)/100;

            ppeScores[i] = {index: i,
                            queen: queens.queens[i].queen,
                            ppe: ppeRounded,
                            totalPoints: totalPointsArray
            }
        }

        return ppeScores;
    }

    const createTable = function () {
        const resultsTable = document.getElementById("results-table-div");

        // Create empty table elements
        const tbl = document.createElement("table");
        tbl.id = "results-table";
        const tblBody = document.createElement("tbody");
        const tblHeader=document.createElement("thead");

        const headerRow1=document.createElement("tr");
        const headerRow2=document.createElement("tr");
        const headerRow3=document.createElement("tr");

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
            for (let j = 0; j < competitionData.numberOfWeeks; j++) {
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

            const ppeScores = calculatePPE();
            const ppe = document.createElement("td");
            ppe.innerText = `${ppeScores[i].ppe}`;
            ppe.className = "ppe-cell";
            ppe.id = `ppe-cell-queen${i}`;
            row.appendChild(ppe);

            row.className="queen-result-row";
            row.id=`queen${i}-result-row`; // Initial index of queen, not row number in the table
            tblBody.appendChild(row);
        }

        // Add caption
        const tfoot = document.createElement("tfoot");
        const tfootTr = document.createElement("tr");
        const tfootTrTd = document.createElement("td");
        tfootTrTd.colSpan=queens.numberOfQueens+2;
        tfootTrTd.innerText = "To see points used in PPE calculation, open Settings in the top right corner";
        tfootTr.appendChild(tfootTrTd);
        tfoot.appendChild(tfootTr);

        tbl.appendChild(tblHeader);
        tbl.appendChild(tblBody);
        tbl.appendChild(tfoot);
        resultsTable.innerHTML = "";
        resultsTable.appendChild(tbl);
    };

    const refreshPPE = function () {
        const ppeScores = calculatePPE();

        if (settingsControl.updateDisplay[0] === true) {
            for (let i = 0; i < queens.numberOfQueens; i++) {
                const PPECell = document.getElementById(`ppe-cell-queen${i}`);
                PPECell.innerText=`${ppeScores[i].ppe}`;
            }
    
            graph.createGraph();
            settingsControl.updateDisplay[0] = false;
            console.log("displayProgress.refreshPPE: Chart and table updated");
        } else {
            console.log("displayProgress.refreshPPE: No update to chart or table");
        }
        
        }

    return {createTable, refreshPPE, calculatePPE};
})();

const control = (function () {
    ///////////////// Update name of this to placement reset or something to differentiate from points reset
    const resetListener = function () {
        const resetButton = document.getElementById("reset-results");
        resetButton.addEventListener("click", function () {
            for (let i=0; i < queens.numberOfQueens; i++) {
                if (JSON.stringify(queens.queens[i].placement)!==JSON.stringify(queens.queens[i].initialPlacement) || JSON.stringify(queens.queens[i].return)!==JSON.stringify(queens.queens[i].initialReturn)) {
                    console.log(`control.resetListener: results for ${queens.queens[i].queen} to be reset`);
                    
                    settingsControl.updateDisplay[0]=true;
                }
            }
            if (settingsControl.updateDisplay[0]===true) {
                universalControl.resetResults();
                displayProgress.createTable();
                graph.createGraph();
                settingsControl.updateDisplay[0]=false;
                console.log("control.resetListener: All results reset and table and chart updated");
            } else {
                console.log("control.resetListener: Results already equal to original results");
            }
        });
    };

    const eventListeners = function () {
        // const settingsResetButton = document.getElementById("settngs-reset-button");
        // const settingsSaveButton = document.getElementById("settings-save-button");

        // settingsResetButton.addEventListener("click", displayProgress.refreshPPE);
        // settingsSaveButton.addEventListener("click", displayProgress.refreshPPE);

        resetListener();
    };



    return {eventListeners};
})();

const settingsControl = (function() {
    const updateDisplay = [false];

    // Create the settings box
    // Initial display set to none
    const createSettingsBox = function() {
        // Overall container
        const settingsDiv = document.createElement("div");
        settingsDiv.id = "settings-div";
    
        // Header for settings box
        const headerDiv = document.createElement("div");
        headerDiv.id = "settings-header-div";

        const header = document.createElement("h3");
        header.innerText = "Settings";
        headerDiv.appendChild(header);
    
        // Create close button
        const closeButton = universalDisplay.createCloseButton("settings-close-button");
        headerDiv.appendChild(closeButton);
    
        // Set up for form inputs
        const settingsForm = document.createElement("form");
        settingsForm.id = "settings-form";
    
        const fieldSet = document.createElement("fieldset");
        fieldSet.id = "points-fieldset";
    
        const legend = document.createElement("legend");
        legend.innerText = "Points per placement";
    
        fieldSet.appendChild(legend);
    
        // Create inputs for each of the objects in the points array
        const addInput = function(text) {
            const div = document.createElement("div");
            const id = points.points.find(a => a.placement === text).id;
            div.className = "settings-input";
    
            const label = document.createElement("label");
            label.for = `points-settings-${id}`;
            label.innerText = text;
    
            const input = document.createElement("input");
            input.type = "number";
            input.label = id;
            input.id = `points-settings-${id}`; 
            input.value = points.points.find(a => a.placement === text).value;
    
            div.appendChild(label);
            div.appendChild(input);
            fieldSet.appendChild(div);
        };    
        
        for (let i = 0; i < competitionData.placements.length; i++) {
            if (competitionData.placements[i]!=="Out" && competitionData.placements[i]!=="Quit") {
                addInput(competitionData.placements[i]);
            }
        }
    
        // Create save button
        const saveButton = document.createElement("button");
        saveButton.type = "submit";
        saveButton.innerText = "Save";
        saveButton.id = "settings-save-button";
    
        // Create reset button
        const resetButton = document.createElement("button");
        resetButton.innerText = "Reset Points";
        resetButton.id = "settings-reset-button";
        
        // Put everything together
        settingsDiv.appendChild(headerDiv);
        settingsForm.appendChild(fieldSet);
        settingsForm.appendChild(resetButton);
        settingsForm.appendChild(saveButton);
        settingsDiv.appendChild(settingsForm);
        document.body.appendChild(settingsDiv);
    
        // Hide on startup
        settingsDiv.style.display = "none";
    
        // Add event listeners
        settingsCloseListener();
        settingsResetListener();
        settingsSaveListener();
    }

    // Close option required for multiple buttons so set up as separate function
    const settingsClose = function () {
        const settingsDiv = document.getElementById("settings-div");
        settingsDiv.style.display = "none";
        universalControl.popUpStatus.settingsOpen = false;
        displayProgress.refreshPPE(); 
    }

    // Add listener to main settings button to open and close the form
    const settingsButtonListener = function () {
        const settingsButton = document.getElementById("settings-button");
        const settingsDiv = document.getElementById("settings-div");

        settingsButton.addEventListener("click", function() {
            if (universalControl.popUpStatus.infoOpen===false  && universalControl.popUpStatus.settingsOpen===false) {
                settingsDiv.style.display = "block";
                universalControl.popUpStatus.settingsOpen = true;
                updateSettingsDisplay(points.points);
            } else if (universalControl.popUpStatus.settingsOpen===true) {
                settingsClose();
            }
        });
    };

    // Add functionality to close button
    const settingsCloseListener = function () {
        const settingsCloseButton = document.getElementById("settings-close-button");

        settingsCloseButton.addEventListener("click", settingsClose);
    };

    const savePointsFromForm = function () {
        const storedPoints = JSON.parse(localStorage.getItem("points"));

        // Check each placement against the form and update if necessary
        for (let i = 0; i < points.points.length; i++) {
            const id = points.points[i].id;
            const pointsValue = Number(document.getElementById(`points-settings-${id}`).value);
            if (Number(points.points[i].value) !== Number(pointsValue)) {
                console.log(`settingsControl.savePointsFromForm: Points for ${id} have been updated from ${points.points[i].value} to ${pointsValue}`);
                points.points[i].value = pointsValue;
            }
        }

        // If change to points then save new array
        if (JSON.stringify(points.points)!==JSON.stringify(storedPoints)) { 
            updateDisplay[0] = true;
            storage.savePoints();
        } else {
            console.log("settingsControl.savePointsFromForm: No update made to points");
        }
    }

    const settingsSaveListener = function () {
        const settingsSaveButton = document.getElementById("settings-save-button");
        settingsSaveButton.addEventListener("click", function(e) {
            e.preventDefault();
            savePointsFromForm();
            settingsClose();
        })
    }

    // Set values in form to points array
    const updateSettingsDisplay = function (pointsArray) {
        for (let i = 0; i < pointsArray.length; i++){
            const id = pointsArray[i].id;
            const input = document.getElementById(`points-settings-${id}`);
            input.value = pointsArray.find(a => a.id === id).value;
        }
    };

    // Reset points to initial values
    const settingsResetListener = function () {
        const settingsResetButton = document.getElementById("settings-reset-button");

        settingsResetButton.addEventListener("click", function(e) {
            e.preventDefault();
            // Get latest values of points
            savePointsFromForm();
            
            if (JSON.stringify(points.points)!==JSON.stringify(points.initialPoints)) {
                // Set back to initial values
                console.log("settingsControl.settingsResetButton: Points being reset to initialPoints");
                points.points = JSON.parse(JSON.stringify(points.initialPoints));
                storage.savePoints();
                // Update numbers that appear in the form
                updateSettingsDisplay(points.points);
                // Update needed for visual displays
                updateDisplay[0] = true;
            } else {
                console.log("settingsControl.settingsResetButton: points already equal to initialPoints");
            }
        })
    };

    const init = function() {
        createSettingsBox();
        settingsButtonListener();
    }

    return {init, updateDisplay};
})()

// Code to create the graph

const graph = (function () {
    const colours = ["#66c5cc", "#dcb0f2", "#f6cf71", "#f89c74", "#87c55f", "#9eb9f3", "#fe88b1", "#c9db74", "#8be0a4", "#b497e7", "#b3b3b3"];

    const createDatasets = function() {
        const datasets = new Array(queens.numberOfQueens);
        const ppeScores = displayProgress.calculatePPE();

        for (let i = 0; i < queens.numberOfQueens; i++) {
            datasets[i] = {label: queens.queens[i].queen,
                           data: ppeScores[i].totalPoints,
                           fill: false,
                           borderColor: colours[i],
                           borderWidth: 3
            }
        }

        return datasets;
    };

    const createGraph = function() {
        const chartDiv = document.getElementById("results-chart-div");

        const h3 = document.createElement("h3");
        h3.innerText = "Total Points by Episode";

        const footnote = document.createElement ("p");
        footnote.innerText = "For easier comparison, click on a queen's name to remove them from the chart";
        footnote.className = "results-chart-footnote";
        
        const datasets = createDatasets();
        const labels = new Array(competitionData.numberOfWeeks);
        for (let i = 0; i < competitionData.numberOfWeeks; i++) {
            labels[i] = i + 1;
        };

        const canvas = document.createElement("canvas");
        canvas.id = "results-chart";

        const fontFamily = "Rubik";
        const textColour = "black";

        const chart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: labels, 
                datasets: datasets
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                family: fontFamily,
                                size: 16
                            },
                            color: textColour,
                            usePointStyle: true,
                            pointStyle: "line"
                        },
                        position: "bottom",
                        padding: 20
                    }
                },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        text: "Episode",
                        display: true,
                        font: {
                            size: 20,
                            weight: 'bold',
                            family: fontFamily
                        },
                        color: textColour,
                        padding: {bottom: 20, top: 10}
                    },
                    ticks: {
                        color: textColour,
                        font: {
                            size: 16,
                            family: fontFamily
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        text: "Total Points",
                        display: true,
                        font: {
                            size: 20,
                            weight: 'bold',
                            family: fontFamily
                        },
                        color: textColour,
                        padding: { bottom: 20}
                    },
                    ticks: {
                        color: textColour,
                        font: {
                            size: 16,
                            family: fontFamily
                        }
                    }
                }
            }
        }
    });

    chartDiv.innerHTML = "";
    chartDiv.appendChild(h3);
    chartDiv.appendChild(canvas);
    chartDiv.appendChild(footnote);
    }

    return {createGraph}
})();



// Run everything

storage.getData();
displayGeneric.init();
displayProgress.createTable();
control.eventListeners();
settingsControl.init();