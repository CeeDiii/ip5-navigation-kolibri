import { Navigation } from "./navigationModel.js";
import { NavigationController } from "./navigationController.js";
import { NavigationProjector } from "./navigationProjector.js";

const model = Navigation('home'); //@TODO change logic for start point (create startpoint from constructor and implement logic for order)

const controller = NavigationController(model);

const projector = NavigationProjector(controller);

model.addNavigationPoint('shop');
model.addNavigationPoint('about');



//@TODO rename and relocate (one starter.js for navigation, car and person)