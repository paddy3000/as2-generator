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
            select.appendChild(option);
        }

        // Append label and select to the container
        return {select}
    }

    const displayArrows = function() {
        divs.navDiv.innerHTML="";

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

        dropdown = createDropdown ();

        divs.navDiv.appendChild(leftArrow);
        divs.navDiv.appendChild(dropdown.select);
        divs.navDiv.appendChild(rightArrow);

        update();
    }

    const update = function() {
        document.getElementById("left-arrow").style.display = week > 1 ? "inline-block" : "none";
        document.getElementById("right-arrow").style.display = week < competitionData.numberOfWeeks ? "inline-block" : "none";

        const dropdown = document.getElementById("week-select");
        dropdown.value = week.toString();
    }

    const init = function() {
        displayArrows();
    }

    return {init, update};
})();


const interface = (function () {
    const arrowListeners = function () {
        divs.navDiv.addEventListener("click", function (e) {
            if (e.target.id === "left-arrow" && week > 1) {
                week--;
                display.update();
            } else if (e.target.id === "right-arrow" && week < competitionData.numberOfWeeks) {
                week++;
                display.update();
            }
        });

        divs.navDiv.addEventListener("change", function (e) {
            if (e.target.id === "week-select") {
                week = parseInt(e.target.value);
                display.update();
            }
        });
    }

    return { arrowListeners };
})();

display.init();
interface.arrowListeners();