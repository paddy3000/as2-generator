import { universalDisplay } from "./script.js";

const display = (function() {
    const createForm = function() {
        const formDiv = document.createElement("div");
        formDiv.id = "feedback-form-div";

        const iframe = document.createElement("iframe");
        iframe.src = "https://docs.google.com/forms/d/e/1FAIpQLSfJ_M9APrnvO-2_G7niZlBZrHVMLIPcp5lyz-aToGz-r5YTjw/viewform?embedded=true";
        iframe.innerText = "Loading...";
        iframe.id = "feedback-form";
        iframe.height = 900;
        iframe.width = 1000;
        
        formDiv.appendChild(iframe);
        document.body.appendChild(formDiv);
    }

    return { createForm };
})();

universalDisplay.createHeading();
universalDisplay.createButtons(true, true, false, false);
display.createForm();