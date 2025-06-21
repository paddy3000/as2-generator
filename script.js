const images = {
    arrowLeft: "images/leftArrow.png",
    arrowRight: "images/rightArrow.png"
}

const divs = {
    queensDiv: document.getElementById("queens-div"),
    navDiv: document.getElementById("nav-div")
}

const display = (function () {
    const displayArrows = function() {
        const leftArrowDiv = document.createElement("div");
        const rightArrowDiv = document.createElement("div");
        const weekSelectDiv = document.createElement("div");

        leftArrowDiv.innerHTML=`<input type="image" id="left-arrow" alt="Previous" src="images/leftArrow.png" width="80px"/>`;
        rightArrowDiv.innerHTML=`<input type="image" id="right-arrow" alt="Next" src="images/rightArrow.png" width="80px"/>`;
        weekSelectDiv.innerHTML=`Select Week`;


        divs.navDiv.appendChild(leftArrowDiv);
        divs.navDiv.appendChild(weekSelectDiv);
        divs.navDiv.appendChild(rightArrowDiv);
    }

    return {displayArrows};
})();

display.displayArrows();
