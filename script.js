var week=1;

const competitionData = {
    numberOfWeeks: 8,
    episodes: ["All Star Talent Show Extravaganza", "All Stars Snatch Game", "HERstory of the World", "Drag Movie Shequels", "Revenge Of The Queens", "Drag Fish Tank", "Family That Drags Together", "All Stars Supergroup"],
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
    placements: ["Win", "Top 2", "High", "Safe", "Low", "Bottom", "Eliminated", "Out", "Quit"]
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
        img: "images/AdoreDelanoAS2.webp",
        initialPlacement: ["Bottom", "Quit", "Out", "Out", "Out", "Out", "Out", "Out"],
        initialReturn: Array(competitionData.numberOfWeeks).fill(false),
    };

    const queen1 = {
        queen: "Alaska",
        img: "images/AlaskaAS2.webp",
        initialPlacement: ["High", "Win", "Safe", "Win", "Win", "Win", "Bottom", "Win"],
        initialReturn: Array(competitionData.numberOfWeeks).fill(false)
    };

    const queen2 = {
        queen: "Alyssa Edwards",
        img: "images/AlyssaEdwardsAS2.webp",
        initialPlacement: ["Safe", "Safe", "Win", "Eliminated", "Win", "High", "Eliminated", "Out"],
        initialReturn: [false, false, false, false, true, false, false, false]
    };

    const queens = [queen0, queen1, queen2];

    queens.forEach((queen) => {
        queen.placement=queen.initialPlacement;
        queen.return=queen.initialReturn;
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
    episodeInfo: document.getElementById("episode-info")
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

            const dropdown = createPlacementDropdown();
            dropdown.select.id=`queen-dropdown${i}`;
            divs.queens.appendChild(displayObjects[i]);
            const innerDiv = document.getElementById(`queen${i}`);
            innerDiv.append(dropdown.select);
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

    const createPlacementDropdown = function() {
        // Create the select dropdown
        const select = document.createElement("select");
        select.className = "placement-select";

        // Add options from 1 to numberOfWeeks
        for (let i = 0; i <= competitionData.placements.length-1; i++) {
            if ( competitionData.placements[i]!=="Out"){
                const option = document.createElement("option");
                option.textContent = competitionData.placements[i];
                option.value = competitionData.placements[i];
                select.appendChild(option);
            }
        }

        // Append label and select to the container
        return {select}
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

            updateReturningButton();
            // if (placementAtWeek==="Out") {queenImage.className="queen-image out"}
            // else {queenImage.className="queen-image"};
        }
    }

    const update = function() {
        document.getElementById("left-arrow").style.display = week > 1 ? "inline-block" : "none";
        document.getElementById("right-arrow").style.display = week < competitionData.numberOfWeeks ? "inline-block" : "none";

        const weekDropdown = document.getElementById("week-select");
        weekDropdown.value = week.toString();

        challengeHeaders();

        updatePlacementDropdown();
    }

    const init = function() {
        displayArrows();
        displayQueens();
        createReturningButton();
    }

    return {init, update, updatePlacementDropdown};
})();


const interface = (function () {
    const arrowListeners = function () {
        divs.nav.addEventListener("click", function (e) {
            if (e.target.id === "left-arrow" && week > 1) {
                week--;
                display.update();
            } else if (e.target.id === "right-arrow" && week < competitionData.numberOfWeeks) {
                week++;
                display.update();
            }
        });

        divs.nav.addEventListener("change", function (e) {
            if (e.target.id === "week-select") {
                week = parseInt(e.target.value);
                display.update();
            }
        });
    }

    const placementUpdate = function () {
        for (let i = 0; i < queens.numberOfQueens; i++) {
            const dropdown=document.getElementById(`queen-dropdown${i}`);

            dropdown.addEventListener("change", function (e) {
                queens.queens[i].placement[week - 1] = e.target.value;

                if (e.target.value==="Eliminated" || e.target.value==="Quit") {
                    for (let j = week; j < competitionData.numberOfWeeks; j++) {
                        let queenReturns=false;
                        if (queens.queens[i].return[j]===true) {queenReturns=true};
                        if (!queenReturns) {queens.queens[i].placement[j]="Out"}; 
                    }
                } else {
                    if (queens.queens[i].placement[week]==="Out") {
                        // If elimination is reversed then set subsequent weeks to initial placement or Safe if queen was out by that stage
                        for (let k = week; k < competitionData.numberOfWeeks; k++) {
                            queens.queens[i].placement[k] = queens.queens[i].initialPlacement[k]==="Out" ? "Safe" :  queens.queens[i].initialPlacement[k];
                        };
                    }
                }
                display.updatePlacementDropdown();
            });
        }
    }

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
    }

    const eventListeners = function () {
        arrowListeners();
        placementUpdate();
        returningUpdate();
    }

    return { eventListeners };
})();

display.init();
display.update();
interface.eventListeners();