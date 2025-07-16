const currentStatus = {
    week: 1
}

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
    finalePlacements: ["Winner", "Runner Up", "Eliminated", "Out"],
};

const points = (function () {
    const points =  [{id: "win",    value: 6},
                     {id: "top2",   value: 5},
                     {id: "high",   value: 4},
                     {id: "safe",   value: 3},
                     {id: "low",    value: 2},
                     {id: "bottom", value: 1},
                     {id: "elim",   value: 0}];

    const initialPoints = points.slice();

    return {points, initialPoints};
})();

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
    arrowRight: "images/rightArrow.png",
    settings: "images/settings.png",
    close: "images/close.png"
}

const storage = (function() {
    // Save data
    const saveData = function() {
        localStorage.setItem("queensData", JSON.stringify(queens.queens));  
        localStorage.setItem("currentStatus.week", JSON.stringify(currentStatus.week));  
        console.log(`storage.saveData: queens.queens array and currentStatus.week saved to local storage`);
    }

    const savePoints = function () {
        localStorage.setItem("points", JSON.stringify(points.points));
        console.log(`storage.saveData: points saved to local storage`);
    }

    // Read in queen data
    const getData = function() {
        let storedQueens = JSON.parse(localStorage.getItem("queensData"));   
        let storedWeek = JSON.parse(localStorage.getItem("currentStatus.week"));
        let storedPoints = JSON.parse(localStorage.getItem("points"));   
        
        if (storedQueens) {
            console.log(`storage.getData: queens.queens array retrieved from local storage`);
            queens.queens = storedQueens;
        }

        if (storedWeek) {
            currentStatus.week = storedWeek;
            console.log(`storage.getData: currentStatus.week ${currentStatus.week} retrieved from local storage`);
        }

        if (storedPoints) {
            points.points = storedPoints;
            console.log(`storage.getData: points retrieved from local storage`);
        }
    }

    return { saveData, savePoints, getData };
})();

const createCloseButton = function(id) {
    const closeButton = document.createElement("button");
    closeButton.id = id;
    closeButton.className = "close-button";
    const closeImage = document.createElement("img");
    closeImage.src = images.close;
    closeImage.className = "close-button-image";
    closeButton.appendChild(closeImage);

    return closeButton;
}

const createInfoBox = function() {
    const infoDiv = document.createElement("div");
    infoDiv.id = "info-div";

    const headerDiv = document.createElement("div");
    headerDiv.id = "info-header-div";


    const header = document.createElement("h3");
    header.innerText = "Info";
    headerDiv.appendChild(header);

    const closeButton = createCloseButton("info-close-button");

    headerDiv.appendChild(closeButton);

    infoDiv.appendChild(headerDiv);

    const addParagraph = function(innerText) {
        const paragraph = document.createElement("p");
        paragraph.innerText = innerText;
        infoDiv.appendChild(paragraph);
    };

    addParagraph("Welcome to the RuPaul's Drag Race All Stars 2 fantasy generator");
    addParagraph("Use the arrows to move through the weeks and reassign placements for the queens to change the outcome of the competition");
    addParagraph(`Answer questions like "What if Adore had never quit?", "What if this season was non-elimination", and "What if Roxxxy had never leant Alaska that rhinestone tank top?"`);
    addParagraph(`To see the results summary press "See Results"`);
    addParagraph(`To reset the results back to the original placements from the competition press "Reset Results"`);

    infoDiv.style.display = "none";
    
    document.body.appendChild(infoDiv);

    universalControl.infoCloseListener();
}

const createSettingsBox = function() {
    const settingsDiv = document.createElement("div");
    settingsDiv.id = "settings-div";

    const headerDiv = document.createElement("div");
    headerDiv.id = "settings-header-div";


    const header = document.createElement("h3");
    header.innerText = "Settings";
    headerDiv.appendChild(header);

    const closeButton = createCloseButton("settings-close-button");

    headerDiv.appendChild(closeButton);

    const settingsForm = document.createElement("form");
    settingsForm.id = "settings-form";

    const fieldSet = document.createElement("fieldset");
    fieldSet.id = "points-fieldset";

    const legend = document.createElement("legend");
    legend.innerText = "Points per placement";

    fieldSet.appendChild(legend);


    const addInput = function(id, text) {
        const div = document.createElement("div");
        div.className = "settings-input";

        const label = document.createElement("label");
        label.for = `points-settings-${id}`;
        label.innerText = text;

        const input = document.createElement("input");
        input.type = "number";
        input.label = id;
        input.id = `points-settings-${id}`; 
        input.value = points.points.find(a => a.id === id).value;

        div.appendChild(label);
        div.appendChild(input);
        fieldSet.appendChild(div);
    };
    
    addInput("win", "Win");
    addInput("top2", "Top 2");
    addInput("high", "High");
    addInput("safe", "Safe");
    addInput("low", "Low");
    addInput("bottom", "Bottom");
    addInput("elim", "Eliminated");

    const saveButton = document.createElement("button");
    saveButton.type = "submit";
    saveButton.innerText = "Save";
    saveButton.id = "settings-save-button";

    const resetButton = document.createElement("button");
    resetButton.innerText = "Reset Points";
    resetButton.id = "settings-reset-button";
    
    settingsDiv.appendChild(headerDiv);
    settingsForm.appendChild(fieldSet);
    settingsForm.appendChild(resetButton);
    settingsForm.appendChild(saveButton);
    settingsDiv.appendChild(settingsForm);
    document.body.appendChild(settingsDiv);

    settingsDiv.style.display = "none";

    universalControl.settingsCloseListener();
    universalControl.settingsResetListener();
    universalControl.settingsSaveListener();
}

const universalDisplay = (function() {
    const createHeading = function() {
        // Main heading div
        const headingDiv = document.createElement("div");
        headingDiv.id = "main-heading";

        // Left and right divs to go inside main header div
        const leftDiv = document.createElement("div");
        leftDiv.id = "main-heading-left";
        const rightDiv = document.createElement("div");
        rightDiv.id = "main-heading-right";

        // Create main heading
        const heading = document.createElement("h1");
        heading.textContent = "All Stars 2 Simulator";

        // Create setting button
        const settings = document.createElement("button");
        settings.id = "settings-button";
        const settingsImg = document.createElement("img");
        settingsImg.src = images.settings;
        settings.appendChild(settingsImg);

        // Create info button
        const info = document.createElement("button");
        info.id = "info-button";
        info.innerText = "i";

        leftDiv.appendChild(heading);

        rightDiv.appendChild(info);
        rightDiv.appendChild(settings);

        headingDiv.appendChild(leftDiv);
        headingDiv.appendChild(rightDiv);
        document.body.appendChild(headingDiv);

        createInfoBox();
        createSettingsBox();
        universalControl.infoButtonListener();
        universalControl.settingsButtonListener();
    }

    const createNavDiv = function() {
        const navDiv = document.createElement("div");
        navDiv.id = "nav-div";
        document.body.appendChild(navDiv);
    }

    return { createHeading, createNavDiv, createInfoBox };
})();

const universalControl = (function () {
    const popUpStatus = {
        infoOpen: false,
        settingsOpen: false
    }

    const infoClose = function () {
        const infoDiv = document.getElementById("info-div");
        infoDiv.style.display = "none";
        popUpStatus.infoOpen = false;
    }

    const settingsClose = function () {
        const settingsDiv = document.getElementById("settings-div");
        settingsDiv.style.display = "none";
        popUpStatus.settingsOpen = false;
    }

    const infoCloseListener = function () {
        const infoCloseButton = document.getElementById("info-close-button");

        infoCloseButton.addEventListener("click", infoClose)
    };

    const settingsCloseListener = function () {
        const settingsCloseButton = document.getElementById("settings-close-button");

        settingsCloseButton.addEventListener("click", settingsClose);
    };

    const settingsSaveListener = function () {
        const settingsSaveButton = document.getElementById("settings-save-button");

        settingsSaveButton.addEventListener("click", function(e) {
            e.preventDefault();
            for (let i = 0; i < points.points.length; i++) {
                const id = points.points[i].id;
                const pointsValue = document.getElementById(`points-settings-${id}`).value;
                points.points[i].value = pointsValue;
                console.log(`universalControl.settingsSaveListener: Points for ${id} have been set to ${pointsValue}`);
            }
            storage.savePoints();
            settingsClose();
        })
    }

    const updateSettingsDisplay = function (pointsArray) {
        for (let i = 0; i < pointsArray.length; i++){
            const id = pointsArray[i].id;
            const input = document.getElementById(`points-settings-${id}`);
            input.value = pointsArray.find(a => a.id === id).value;
        }
    }

    const settingsResetListener = function () {
        const settingsResetButton = document.getElementById("settings-reset-button");

        settingsResetButton.addEventListener("click", function(e) {
            e.preventDefault();
            points.points = points.initialPoints.slice();
            storage.savePoints();
            updateSettingsDisplay(points.points);
        })
    }

    const infoButtonListener = function () {
        const infoButton = document.getElementById("info-button");
        const infoDiv = document.getElementById("info-div");

        infoButton.addEventListener("click", function() {
            if (popUpStatus.settingsOpen===false && popUpStatus.infoOpen===false) {
                infoDiv.style.display = "block";
                popUpStatus.infoOpen = true;
            } else if (popUpStatus.infoOpen===true) {
                infoClose();
            }
        });
    };

    const settingsButtonListener = function () {
        const settingsButton = document.getElementById("settings-button");
        const settingsDiv = document.getElementById("settings-div");

        settingsButton.addEventListener("click", function() {
            if (popUpStatus.infoOpen===false  && popUpStatus.settingsOpen===false) {
                settingsDiv.style.display = "block";
                popUpStatus.settingsOpen = true;
                updateSettingsDisplay(points.points);
            } else if (popUpStatus.settingsOpen===true) {
                settingsClose();
            }
        });
    };

    return {infoCloseListener, infoButtonListener, settingsCloseListener, settingsButtonListener, settingsResetListener, settingsSaveListener, updateSettingsDisplay};
})()

export {queens, competitionData, storage, currentStatus, universalDisplay, images, points};