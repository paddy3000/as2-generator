import { queens, competitionData } from "./script.js";

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


displayProgress.createTable();