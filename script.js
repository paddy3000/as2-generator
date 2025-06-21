var week=1;

const competitionData = {
    numberOfWeeks: 8
}

const images = {
    arrowLeft: "images/leftArrow.png",
    arrowRight: "images/rightArrow.png"
}

const divs = {
    queensDiv: document.getElementById("queens-div"),
    navDiv: document.getElementById("nav-div")
}

const display = (function () {
    const createDropdown = function() {
        // Create the select dropdown
        const select = document.createElement("select");
        select.id = "week-select";

        // Add options from 1 to numberOfWeeks
        for (let i = 1; i <= competitionData.numberOfWeeks; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = `Week ${i}`;
            if (i === week) option.selected = true;
            select.appendChild(option);
        }

        // Append label and select to the container
        return {select}
    }

    const displayArrows = function() {
        divs.navDiv.innerHTML="";

        const leftArrowDiv = document.createElement("div");
        const rightArrowDiv = document.createElement("div");
        // const weekSelectDiv = document.createElement("div");

        leftArrowDiv.innerHTML=`<input type="image" id="left-arrow" alt="Previous" src=${images.arrowLeft} width="60px"/>`;
        rightArrowDiv.innerHTML=`<input type="image" id="right-arrow" alt="Next" src=${images.arrowRight} width="60px"/>`;
        dropdown = createDropdown ();


        if (week>1) {divs.navDiv.appendChild(leftArrowDiv)};
        divs.navDiv.appendChild(dropdown.select);
        if (week<competitionData.numberOfWeeks) {divs.navDiv.appendChild(rightArrowDiv)};
    }

    return {displayArrows};
})();


const interface = (function () {
    const arrowListeners = function () {
        divs.navDiv.addEventListener("click", function (e) {
            if (e.target.id === "left-arrow" && week > 1) {
                week--;
                display.displayArrows();
                console.log(week);
            } else if (e.target.id === "right-arrow" && week < competitionData.numberOfWeeks) {
                week++;
                display.displayArrows();
                console.log(week);
            }
        });

        divs.navDiv.addEventListener("change", function (e) {
            if (e.target.id === "week-select") {
                week = parseInt(e.target.value);
                display.displayArrows();
                console.log(week);
            }
        });
    }

    return { arrowListeners };
})();

display.displayArrows();
interface.arrowListeners();