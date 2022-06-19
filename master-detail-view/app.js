import { Navigation } from "./navigation/navigationModel.js";
import { NavigationController } from "./navigation/navigationController.js";
import { NavigationProjector } from "./navigation/navigationProjector.js";
import { CarListController, CarSelectionController }           from "./navigation/pages/car/carController.js";
import { Car, carSelectionMold }                            from './navigation/pages/car/car.js';
import { PersonListController, PersonSelectionController }           from "./navigation/pages/person/personController.js";
import { Person, personSelectionMold }                            from './navigation/pages/person/person.js';

import { carPageCss }                                       from "./navigation/pages/car/instantUpdateProjector.js";
import { carProjectDetailView, carProjectMasterView }          from "./navigation/pages/car/masterDetailProjector.js";
import { personPageCss }                                       from "./navigation/pages/person/instantUpdateProjector.js";
import { personProjectDetailView, personProjectMasterView }          from "./navigation/pages/person/masterDetailProjector.js";
import { EventType } from "./navigation/EventType.js";

/********************************** SETUP ****************************************/

const carListController      = CarListController(Car);
const carSelectionController = CarSelectionController(carSelectionMold);

const personListController      = PersonListController(Person);
const personSelectionController = PersonSelectionController(personSelectionMold);

const h1 = document.createElement("h1");
const content = document.getElementById("content");

/********************************** NAVIGATION ****************************************/

const navModel = Navigation('home'); //@TODO implement logic for order

const navController = NavigationController(navModel);

const navProjector = NavigationProjector(navController);

navModel.addNavigationPoint('person');
navModel.addNavigationPoint('car');

navController.addModelChangeListener((navEvent) => {
    if (navEvent.getEventType() === EventType.PAGE_CHANGE && navEvent.getValue() === 'car') {
        // create the sub-views, incl. binding
        console.log("car");
        const [_, detail] = baseConstructForMDView();

        const carMaster = carProjectMasterView(carListController, carSelectionController, );
        document.getElementById('masterContainer').append(...carMaster);

        const carDetailForm = carProjectDetailView(carSelectionController, detail);
        document.getElementById('detailContainer').append(...carDetailForm);

        document.querySelector('head style').textContent += carPageCss;
        // binding of the main view

        document.getElementById('plus').onclick    = _ => carListController.addModel();
    }
})

/********************************** PERSON ****************************************/

navController.addModelChangeListener((navEvent) => {
    if (navEvent.getEventType() === EventType.PAGE_CHANGE && navEvent.getValue() === 'person') {
        // create the sub-views, incl. binding
        console.log("person");

        const personMaster = personProjectMasterView(personListController, personSelectionController, );
        document.getElementById('masterContainer').append(...personMaster);

        const personDetailForm = personProjectDetailView(personSelectionController, document.getElementById('detailCard'));
        document.getElementById('detailContainer').append(...personDetailForm);

        document.querySelector('head style').textContent += personPageCss;
        // binding of the main view

        document.getElementById('plus').onclick    = _ => personListController.addModel();
    }
})

const baseConstructForMDView = () => {
    const master = document.createElement('div');
    master.classList.add('card');

    const masterHolder = document.createElement('div');
    masterHolder.classList.add('holder');
    masterHolder.id = 'masterContainer';
    master.appendChild(masterHolder);

    const button = document.createElement('button');
    button.id = 'plus';
    button.autofocus = true;
    button.innerText = '+';
    masterHolder.appendChild(button);
    content.appendChild(master);

    const detail = document.createElement('div');
    detail.classList.add('card');
    detail.id = 'detailCard;'

    const detailHolder = document.createElement('div');
    detailHolder.classList.add('holder');
    detailHolder.id = 'detailContainer';
    detail.appendChild(detailHolder);
    content.appendChild(detail);

    return [master, detail];
}
