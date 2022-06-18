import { Navigation } from "./navigationModel.js";
import { Controller } from "./navigationController.js";
import {Projector} from "./navigationProjector.js";

const model = Navigation('home');
model.addNavigationPoint('jesus');
model.addNavigationPoint('direkt_zu_gott');

const controller = Controller(model);

const projector = Projector(controller);

document.getElementsByTagName('body')[0].innerHTML = projector;