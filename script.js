// Week used in display for home screen
const currentStatus = {
    week: 1
}

// General competition data
// This data will not be updated anywhere
const competitionData = {
    numberOfWeeks: 8,
    episodes: ["All Star Talent Show Extravaganza", "All Stars Snatch Game", "HERstory of the World", "Drag Movie Shequels", "Revenge Of The Queens", "Drag Fish Tank", "Family That Drags Together", "All Stars Supergroup"],
    episodeType: ["Talent Show", "Snatch Game", "Rusical", "Acting", "Stand-up", "Advert", "Makeover", "Finale"],
    lipSyncs: ["Shake It Off by Taylor Swift", "Le Freak (Freak Out) by Chic", "Tell It To My Heart by Taylor Dayne", "Got To Be Real by Cheryl Lynn", "Shut Up & Drive by Rihanna", "Cherry Bomb by Joan Jett and the Blackhearts", "Step It Up by RuPaul feat. Dave Audé", "If I Were Your Woman by Gladys Knight & The Pips"],
    synopses: ["10 queens return to compete for $100,000 and a place in the Drag Race Hall of Fame. The first test is to compete in a drag talent show. With guest judge Raven-Symoné.",
               "The queens impersonate celebrities in a quick-witted TV game show and burn rubber in a latex runway. With guest judge Ross Mathews.",
               "The queens are challenged to perform in a lip-syncing dance number inspired by the legendary historical women. Fashion designer Jeremy Scott guest judges.",
               "The queens' acting chops are tested in parody movie sequels of RuPaul's favorite movies. Pussycat Doll Nichole Scherzinger guest judges.",
               "The queens must perform a live stand-up comedy act in front of an audience of judgmental drag queens. The eliminated queens choose their partners in reverse elimination order. Ross Mathews returns to guest judge.",
               "The queens design and market drag-influenced products. Entrepreneur Marcus Lemonis (CNBC’s The Profit) co-stars, and comedian Graham Norton guest judges.",
               "The queens must makeover family members and vogue the house down. Aubrey Plaza (Parks and Recreation) guest judges.",
               "The winner of RuPaul’s Drag Race All Stars is crowned. But first, the queens must write original rap lyrics and perform as the ultimate girl group."] ,
    runways: [null, "Latex Eleganza", "The Future of Drag", "Two Looks in One", null, "Pants on the Runway", "Makeover Challenge", "Final Eleganza"],
    competitiveEpisode: [true, true, true, true, true, true, true, false],
    placements: ["Win", "Top 2", "High", "Safe", "Low", "Bottom", "Eliminated", "Out", "Quit"],
    finalePlacements: ["Winner", "Runner Up", "Eliminated", "Out"],
};

// Number of points for each placement
const points = (function () {
    const points =  [{id: "win",  placement: "Win", value: 6},
                     {id: "top2", placement: "Top 2", value: 5},
                     {id: "high", placement: "High", value: 4},
                     {id: "safe", placement: "Safe", value: 3},
                     {id: "low",  placement: "Low", value: 2},
                     {id: "btm",  placement: "Bottom", value: 1},
                     {id: "elim", placement: "Eliminated", value: 0}];

    const initialPoints = points.slice();

    return {points, initialPoints};
})();

// Information for each of the queens
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

    // Set together in one array
    const queens = [queen0, queen1, queen2, queen3, queen4, queen5, queen6, queen7, queen8, queen9];

    // Set placement and return equal to initial values, will be updated by user
    queens.forEach((queen) => {
        queen.placement=queen.initialPlacement.slice();
        queen.return=queen.initialReturn.slice();
        queen.img=`images/${queen.queen.replaceAll(" ", "").replaceAll("'","")}AS2.webp`
    })

    // Number of queens in competition
    const numberOfQueens = queens.length;

    return {queens, numberOfQueens};
})();

// Links to images
const images = {
    arrowLeft: "images/leftArrow.png",
    arrowRight: "images/rightArrow.png",
    settings: "images/settings.png",
    close: "images/close.png",
    feedback: "images/feedback.png",
    home: "images/home.png"
}

// Functions for saving and retrieving data
const storage = (function() {
    // Save data
    const saveData = function() {
        localStorage.setItem("queensData", JSON.stringify(queens.queens));  
        localStorage.setItem("currentStatus.week", JSON.stringify(currentStatus.week));  
        console.log(`storage.saveData: queens.queens array and currentStatus.week saved to local storage`);
    }

    const savePoints = function () {
        localStorage.setItem("points", JSON.stringify(points.points));
        console.log(`storage.savePoints: points saved to local storage`);
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

// Display functions that will be used across different pages
const universalDisplay = (function() {
    // Close button that will appear within Settings and Info pop-ups
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
    
    // Function to create Info pop-up
    const createInfoBox = function() {
        // Create divs
        const infoDiv = document.createElement("div");
        infoDiv.id = "info-div";
        const headerDiv = document.createElement("div");
        headerDiv.id = "info-header-div";

        document.body.appendChild(infoDiv);
        infoDiv.appendChild(headerDiv);
    
        // Create header
        const header = document.createElement("h3");
        header.innerText = "Info";
        headerDiv.appendChild(header);
    
        // Close button
        const closeButton = createCloseButton("info-close-button");
        headerDiv.appendChild(closeButton);
    
        // Add <p> elements
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
    
        // Set initial display to none and only pop-up when info button is clicked
        infoDiv.style.display = "none";

        // Add listener to close button
        universalControl.infoCloseListener();
    };

    // Create main heading for page
    const createHeading = function() {
        // Main heading div
        const headingDiv = document.createElement("div");
        headingDiv.id = "main-heading";
        document.body.appendChild(headingDiv);

        // Left and right divs to go inside main header div
        const leftDiv = document.createElement("div");
        leftDiv.id = "main-heading-left";
        const rightDiv = document.createElement("div");
        rightDiv.id = "main-heading-right";
        headingDiv.appendChild(leftDiv);
        headingDiv.appendChild(rightDiv);

        // Create main heading
        const heading = document.createElement("h1");
        heading.textContent = "All Stars 2 Simulator";
        leftDiv.appendChild(heading);
    };

    // Create Home Button
    const createHomeButton = function() {
        // Get div that button will sit inside
        const rightDiv = document.getElementById("main-heading-right");
        
        // Link to home page
        const homeLink = document.createElement("a");
        homeLink.href = "index.html";

        // Home button
        const homeButton = document.createElement("button");
        homeButton.id = "home-button";

        // Add image
        const homeImg = document.createElement("img");
        homeImg.src = images.home;
        homeImg.alt = "Home";

        // Put everything together
        homeLink.appendChild(homeButton);
        homeButton.appendChild(homeImg);
        rightDiv.appendChild(homeLink);
    };

    // Create info button
    const createInfoButton = function() {
        // Get div that button will sit inside
        const rightDiv = document.getElementById("main-heading-right");

        // Create info button
        const info = document.createElement("button");
        info.id = "info-button";
        info.innerText = "i";
        rightDiv.appendChild(info);

        // Create info pop-up and add listener to button
        createInfoBox();
        universalControl.infoButtonListener();
    };

    // Create settings button
    const createSettingsButton = function() {
        // Get div that button will sit inside
        const rightDiv = document.getElementById("main-heading-right");

        // Create setting button
        const settings = document.createElement("button");
        settings.id = "settings-button";
        rightDiv.appendChild(settings);

        // Add image
        const settingsImg = document.createElement("img");
        settingsImg.src = images.settings;
        settingsImg.alt = "Settings";
        settings.appendChild(settingsImg);
    };

    // Create feedback button
    const createFeedbackButton = function() {
        // Get div that button will sit inside
        const rightDiv = document.getElementById("main-heading-right");
        
        // Create button
        const feedbackButton = document.createElement("button");
        feedbackButton.id = "feedback-button";

        // Link to feedback page
        const feedbackLink = document.createElement("a");
        feedbackLink.href = "feedback.html";

        // Add image
        const feedbackImg = document.createElement("img");
        feedbackImg.src = images.feedback;
        feedbackImg.alt = "Feedback";

        // Put everything together
        feedbackLink.appendChild(feedbackButton);
        feedbackButton.appendChild(feedbackImg);
        rightDiv.appendChild(feedbackLink);
    };

    // General function for creating buttons that should take boolean inputs
    const createButtons = function(createHome, createInfo, createSettings, createFeedback) {
        if (createHome) {createHomeButton()};
        if (createInfo) {createInfoButton()};
        if (createSettings) {createSettingsButton()};
        if (createFeedback) {createFeedbackButton()};
    }

    // Option to reset queen progress
    // Event listener added individually to each page
    const createResetButton = function(navID) {
        // Get div that button will sit inside
        const navResults = document.getElementById(navID);
        
        // Create button
        const resetButton = document.createElement("button");
        resetButton.textContent="Reset Results";
        resetButton.id="reset-results";
        
        navResults.appendChild(resetButton);
    }

    // Create navigation div
    const createNavDiv = function() {
        const navDiv = document.createElement("div");
        navDiv.id = "nav-div";
        document.body.appendChild(navDiv);
    };

    return { createHeading, createButtons, createNavDiv, createInfoBox, createResetButton, createCloseButton};
})();

// Create functions that will be used to control the site
const universalControl = (function () {
    // Object to track which pop-ups are open
    const popUpStatus = {
        infoOpen: false,
        settingsOpen: false
    };

    // Function to close the info pop-up
    const infoClose = function () {
        if (popUpStatus.infoOpen===true) {
            const infoDiv = document.getElementById("info-div");
            infoDiv.style.display = "none";
            popUpStatus.infoOpen = false;
        }
    };

    // Create listener for close button in info pop-up
    const infoCloseListener = function () {
        const infoCloseButton = document.getElementById("info-close-button");
        infoCloseButton.addEventListener("click", infoClose)
    };

    // Create listener for info button in main heading div at top of page
    const infoButtonListener = function () {
        // Select relevant elements
        const infoButton = document.getElementById("info-button");
        const infoDiv = document.getElementById("info-div");

        // If info pop-up is not being displayed then info button will display the pop-up
        // If info pop-up is already open then info button will close the pop-up
        infoButton.addEventListener("click", function() {
            if (popUpStatus.settingsOpen===false && popUpStatus.infoOpen===false) {
                infoDiv.style.display = "block";
                popUpStatus.infoOpen = true;
            } else if (popUpStatus.infoOpen===true) {
                infoClose();
            }
        });
    };

    // Function for resetting all queen results back to original competition placements
    const resetResults = function() {
        for (let i = 0; i < queens.numberOfQueens; i++) {
                queens.queens[i].placement = queens.queens[i].initialPlacement.slice();
                queens.queens[i].return = queens.queens[i].initialReturn.slice();
            };

            storage.saveData();
    }

    return {infoCloseListener, infoButtonListener, resetResults, popUpStatus};
})()

export {queens, competitionData, storage, currentStatus, universalDisplay, universalControl, images, points};