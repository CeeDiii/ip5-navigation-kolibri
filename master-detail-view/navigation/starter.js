import { Navigation } from "./navigationModel.js";
import { Controller } from "./navigationController.js";
import {Projector} from "./navigationProjector.js";

const model = Navigation('home'); //@TODO change logic for start point (create startpoint from constructor and implement logic for order)
model.addNavigationPoint('home');
model.addNavigationPoint('faq');

const controller = Controller(model);

const projector = Projector(controller);

document.getElementsByTagName('body')[0].innerHTML = projector;

//@TODO rename and relocate (one starter.js for navigation, car and person)