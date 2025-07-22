# as2-generator
## Rupaul's Drag Race All Stars 2 Fantasy Results Generator

[Live Demo](https://paddy3000.github.io/as2-generator/)

The intention of this project was to create a JavaScript and HTML app where results of Rupaul's Drag Race All Stars 2 could be edited by the user by going through the competition episodes and reassigning challenge placements based on the user's preference. All Stars 2, while generally considered one of the best series of Rupaul's Drag Race, has decisions that some people do not agree with. In some ways these decisions make the season even more iconic, but it is also fun to consider alternate outcomes.

I have recently been working through [The Odin Project](https://www.theodinproject.com) to gain foundational knowledge in JavaScript, HTML, and CSS and this is my first big project that I have worked on to test my progress outside of the tasks given in the course.

## How to Use

To play with the app and edit queen progress, open the [live demo](https://paddy3000.github.io/as2-generator/)

- Click through episodes and adjust placements using the dropdown menus
- Press "See Results" to generate results table and graph which are updated in real time
- Use the Settings button to adjust the number of points awarded per placement
- If you have any feedback please fill out the feedback form by pressing the button with the speech bubble, I would love to hear it!

## Features

- Edit and reassign challenge placements for each episode to influence overall contestant progress
- Returning queen option included to change who returns to the competition and when
- Colour coded results table generated
- Automatically calculates PPE (Points Per Episode) scores with points per placement that can be updated by the user (e.g. challenge win = 5 points)
- Graphical display of results using Chart.js
- Reset button included to set back to original placements
- User cache used to store placement updates between visits to the site
- Google Forms used to add feedback functionality
- Display optimised for both desktop and mobile access
- Cute colour scheme and styling throughout :)

## Built With

- HTML5
- CSS3
- JavaScript (ES6)
- Chart.js

## Acknowledgments

- Inspired by discussions in the Drag Race fan community
- Styling elements for the results table and queen images taken from the [Rupaul's Drag Race Wiki](https://rupaulsdragrace.fandom.com/wiki/RuPaul%27s_Drag_Race_All_Stars_%28Season_2%29)
- Built using knowledge gained through [The Odin Project](https://www.theodinproject.com)

## Editor's Note

This is a continuation of a project that I did during the COVID lockdown of 2020 while Season 12 of Rupaul's Drag Race was airing in order to see how the season could have played out without a certain disqualified queen's involvement in that season. The previous version was created in R shiny which is not a very flexible language so I was never fully satisfied with the display or functionality of that version and I have wondered about creating a new version for a long time. If you would like to have a look at the Season 12 version you can do so [here](https://paddybacall.shinyapps.io/French_Vanilla_Generator/)

