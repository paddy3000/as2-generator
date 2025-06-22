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
    queen0 = {
        queen: "Adore Delano",
        img: "images/AdoreDelanoAS2.webp",
        placement: ["Bottom", "Quit", "Out", "Out", "Out", "Out", "Out", "Out"],
        return: Array(competitionData.numberOfWeeks, false)
    };

    queen1 = {
        queen: "Alaska",
        img: "images/AlaskaAS2.webp",
        placement: ["High", "Win", "Safe", "Win", "Win", "Win", "Bottom", "Win"],
        return: Array(competitionData.numberOfWeeks, false)
    };

    const queens = [queen0, queen1];
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

    const createPlacementDropdown = function() {
        // Create the select dropdown
        const select = document.createElement("select");
        select.className = "placement-select";

        // Add options from 1 to numberOfWeeks
        for (let i = 0; i <= competitionData.placements.length-1; i++) {
            const option = document.createElement("option");
            // option.value = ;
            option.textContent = competitionData.placements[i];
            option.value = competitionData.placements[i];
            select.appendChild(option);
        }

        // Append label and select to the container
        return {select}
    }
    
    const updatePlacementDropdowns = function() {
        for (let i = 0; i < queens.numberOfQueens; i++) {
            const queenDropdown = document.getElementById(`queen-dropdown${i}`);
            const queenImage = document.getElementById(`queen-image${i}`);
            const placementAtWeek = queens.queens[i].placement[week-1];

            queenDropdown.value = placementAtWeek;
            queenDropdown.style.display = placementAtWeek!=="Out" ? "inline-block" : "none";

            queenImage.className = "queen-image " + placementAtWeek.toLowerCase().replaceAll(" ", "");

            // if (placementAtWeek==="Out") {queenImage.className="queen-image out"}
            // else {queenImage.className="queen-image"};
        }
    }

    const displayQueens = function() {
        const displayObjects = new Array(queens.numberOfQueens);
        for (let i = 0; i < queens.numberOfQueens; i++) {
            displayObjects[i]=document.createElement("div");
            displayObjects[i].id=`queen${i}`;
            displayObjects[i].innerHTML=`<img src=${queens.queens[i].img} class="queen-image" id="queen-image${i}">
                                         <h3 class="queen-name">${queens.queens[i].queen}</h3>`;

            const dropdown = createPlacementDropdown();
            dropdown.select.id=`queen-dropdown${i}`;
            divs.queens.appendChild(displayObjects[i]);
            const innerDiv = document.getElementById(`queen${i}`);
            innerDiv.append(dropdown.select);
        }
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

    const update = function() {
        document.getElementById("left-arrow").style.display = week > 1 ? "inline-block" : "none";
        document.getElementById("right-arrow").style.display = week < competitionData.numberOfWeeks ? "inline-block" : "none";

        const weekDropdown = document.getElementById("week-select");
        weekDropdown.value = week.toString();

        challengeHeaders();

        updatePlacementDropdowns();
    }

    const init = function() {
        displayArrows();
        displayQueens();
    }

    return {init, update};
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

    return { arrowListeners };
})();

display.init();
display.update();
interface.arrowListeners();