import { Navigation } from "./navigation/navigationModel.js";
import { NavigationController } from "./navigation/navigationController.js";
import { NavigationProjector } from "./navigation/navigationProjector.js";
import { CarListController, CarSelectionController }           from "./navigation/pages/car/carController.js";
import { Car, carSelectionMold }                            from './navigation/pages/car/car.js';
import { PersonListController, PersonSelectionController }           from "./navigation/pages/person/personController.js";
import { Person, personSelectionMold }                            from './navigation/pages/person/person.js';

import { pageCss }                                       from "./navigation/pages/person/instantUpdateProjector.js";
import { projectDetailView, projectMasterView }          from "./navigation/pages/person/masterDetailProjector.js";

/********************************** NAVIGATION ****************************************/

const navModel = Navigation('home'); //@TODO implement logic for order

const navController = NavigationController(navModel);

const navProjector = NavigationProjector(navController);

navModel.addNavigationPoint('shop');
navModel.addNavigationPoint('about');

navController.addNavigationListener()


/********************************** CAR ****************************************/

const personListController      = CarListController(Car);
const personSelectionController = CarSelectionController(carSelectionMold);

// create the sub-views, incl. binding

const carMaster = projectMasterView(listController, selectionController, );
document.getElementById('masterContainer').append(...master);

const carDetailForm = projectDetailView(selectionController, document.getElementById('detailCard'));
document.getElementById('detailContainer').append(...detailForm);

document.querySelector("head style").textContent += pageCss;
// binding of the main view

document.getElementById('plus').onclick    = _ => listController.addModel();

/********************************** PERSON ****************************************/

const listController      = PersonListController(Person);
const selectionController = PersonSelectionController(personSelectionMold);

// create the sub-views, incl. binding
personMaster
const personMaster = projectMasterView(listController, selectionController, );
document.getElementById('masterContainer').append(...master);
personDetailForm
const personDetailForm = projectDetailView(selectionController, document.getElementById('detailCard'));
document.getElementById('detailContainer').append(...detailForm);

document.querySelector("head style").textContent += pageCss;
// binding of the main view

document.getElementById('plus').onclick    = _ => listController.addModel();
