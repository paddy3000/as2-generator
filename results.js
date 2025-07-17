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

        for (let i = 0; i < queens.numberOfQueens; i++) {
            const PPECell = document.getElementById(`ppe-cell-queen${i}`);
            PPECell.innerText=`${ppeScores[i].ppe}`;
        }

        graph.createGraph();
    };

    return {createTable, refreshPPE, calculatePPE};
})();

const control = (function () {
    const resetListener = function () {
        const resetButton = document.getElementById("reset-results");
        resetButton.addEventListener("click", function () {
            universalControl.resetResults();
            displayProgress.createTable();
        });
    };

    const eventListeners = function () {
        const settingsResetButton = document.getElementById("settings-reset-button");
        const settingsSaveButton = document.getElementById("settings-save-button");

        settingsResetButton.addEventListener("click", displayProgress.refreshPPE);
        settingsSaveButton.addEventListener("click", displayProgress.refreshPPE);

        resetListener();
    };



    return {eventListeners};
})();

// Code to create the graph

const graph = (function () {
    const createDatasets = function() {
        const datasets = new Array(queens.numberOfQueens);
        const ppeScores = displayProgress.calculatePPE();

        for (let i = 0; i < queens.numberOfQueens; i++) {
            datasets[i] = {label: queens.queens[i].queen,
                           data: ppeScores[i].totalPoints,
                           fill: false
            }
        }

        return datasets;
    };

    const createGraph = function() {
        const chartDiv = document.getElementById("results-chart-div");

        const datasets = createDatasets();
        const labels = new Array(competitionData.numberOfWeeks);
        for (let i = 0; i < competitionData.numberOfWeeks; i++) {
            labels[i] = i + 1;
        };

        const canvas = document.createElement("canvas");
        canvas.id = "results-chart";

        const chart = new Chart(canvas, {
            type: 'line',
            data: {
              labels: labels, 
              datasets: datasets
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: "Contestant Progress"
                    }
              }, 
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });

        chartDiv.innerHTML = "";
        chartDiv.appendChild(canvas);
    }

    return {createGraph}
})();



// Run everything

storage.getData();
displayGeneric.init();
displayProgress.createTable();
control.eventListeners();