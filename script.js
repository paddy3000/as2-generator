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
    finalePlacements: ["Winner", "Runner Up", "Eliminated", "Out"]
};

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
        console.log(`storage.saveData: queens.queens array and currentStatus.week saved to local storage`);
        localStorage.setItem("queensData", JSON.stringify(queens.queens));  
        localStorage.setItem("currentStatus.week", JSON.stringify(currentStatus.week));  
    }

    // Read in queen data
    const getData = function() {
        let storedQueens = JSON.parse(localStorage.getItem("queensData"));   
        let storedWeek = JSON.parse(localStorage.getItem("currentStatus.week"));   
        
        if (storedQueens) {
            console.log(`storage.getData: queens.queens array retrieved from local storage`);
            queens.queens = storedQueens;
        }
        if (storedWeek) {
            currentStatus.week = storedWeek;
            console.log(`storage.getData: currentStatus.week ${currentStatus.week} retrieved from local storage`);
        }
    }

    return { saveData, getData };
})();

const createInfoBox = function() {
    const infoDiv = document.createElement("div");
    infoDiv.id = "info-div";

    const headerDiv = document.createElement("div");
    headerDiv.id = "info-header-div";


    const header = document.createElement("h3");
    header.innerText = "Info";
    headerDiv.appendChild(header);

    const closeButton = document.createElement("button");
    closeButton.id = "info-close-button";
    const closeImage = document.createElement("img");
    closeImage.src = images.close;
    closeButton.appendChild(closeImage);
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
        heading.textContent = "All Stars 2 Derigger";

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
        universalControl.infoButtonListener();
    }

    const createNavDiv = function() {
        const navDiv = document.createElement("div");
        navDiv.id = "nav-div";
        document.body.appendChild(navDiv);
    }

    return { createHeading, createNavDiv, createInfoBox };
})();

const universalControl = (function () {
    const infoCloseListener = function () {
        const infoCloseButton = document.getElementById("info-close-button");
        const infoDiv = document.getElementById("info-div");

        infoCloseButton.addEventListener("click", function() {infoDiv.style.display = "none"})
    };

    const infoButtonListener = function () {
        const infoButton = document.getElementById("info-button");
        const infoDiv = document.getElementById("info-div");

        infoButton.addEventListener("click", function() {infoDiv.style.display = "block"})
    };

    return {infoCloseListener, infoButtonListener};
})()

export {queens, competitionData, storage, currentStatus, universalDisplay, images};