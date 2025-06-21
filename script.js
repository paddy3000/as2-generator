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
            select.appendChild(option);
        }

        // Append label and select to the container
        return {select}
    }

    dropdown = createDropdown ();

    const displayArrows = function() {
        divs.navDiv.innerHTML="";

        const leftArrowDiv = document.createElement("div");
        const rightArrowDiv = document.createElement("div");
        // const weekSelectDiv = document.createElement("div");

        leftArrowDiv.innerHTML=`<input type="image" id="left-arrow" alt="Previous" src=${images.arrowLeft} width="60px"/>`;
        rightArrowDiv.innerHTML=`<input type="image" id="right-arrow" alt="Next" src=${images.arrowRight} width="60px"/>`;
        // weekSelectDiv.innerHTML=dropdown.label + dropdown.select;


        divs.navDiv.appendChild(leftArrowDiv);
        divs.navDiv.appendChild(dropdown.select);
        divs.navDiv.appendChild(rightArrowDiv);
    }

    return {displayArrows};
})();

display.displayArrows();