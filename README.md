# IP5: Research Project for Navigation Support Kolibri
Student project University of Applied Sciences Northwestern Switzerland<br>
Spring semester 2022, 21.02.2022 – 19.08.2022

The research paper can be found here: https://navigation-for-kolibri.gitbook.io/kolibri-navigation/

## Project experts/customers
•	Prof. Dierk König<br>
•	Fabian Affolter
## Project team
•	Florian Schnidrig, Student iCompetence<br>
•	Cedric Altermatt, Student Computer Science
## Project Idea
The goal of this project is to build a navigation support that can be used to navigate between views (routing) but also back again (browser backbutton). This routing includes the browser history and bookmarks set by the user. Bookmarks are either set natively in the browser or offered as a feature of the application to return to a navigation point saved by the user.
## Project Goal
Students develop solution approaches and discuss them with project customers in regular meetings. A solution approach must fit into the context of Kolibri and follow the Model View Controller approach. The abstraction of the navigation data is done in the Presentation Model. Projectors take care of displaying the data in the view. The goal of this work is a functional prototype that can be validated with the target audience.
For developers the implementation and management should be accessible and well documented. Users will find rich and interactive navigation visualization in Kolibri single page applications. 
## Project Methodology
The procedure in this research project is iterative and incremental. The findings of an iteration serve as a basis for the further procedure. Solution approaches that meet the requirements are refined and implemented. Prototypes are validated with user groups. Automated tests are provided for quality assurance.
## Acknowledgment 
We would like to express our sincere thanks to our lecturers, project clients and experts Prof. Dierk Koenig and Fabian Affolter. Without their regular feedback and exciting suggestions, this project would not have come about to the same extent and especially not in the same quality. Many thanks!

## Exchange the Projector
If you want to test out all available projectors, proceed as follows: 
1. Go to the file ./prototype/app.js
2. Comment out the currently active projector 
3. Comment in the requested projector
4. Refresh the page

```
/**************** 2. Comment out ****************/
import { NavigationProjector }      from "./navigation/navigationProjector.js";
// --- Example Navigations ---
/**************** 3. Comment in ****************/
// import { NavigationProjector }   from "./navigation/basic_navigation/navigationProjector.js";
// import { NavigationProjector }   from "./navigation/dashboard_navigation/navigationProjector.js";
// import { NavigationProjector }   from "./navigation/bubble_state_navigation/navigationProjector.js";
// import { NavigationProjector }   from "./navigation/flower_navigation/navigationProjector.js";
```

