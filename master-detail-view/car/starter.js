import { ListController, SelectionController }           from "./carController.js";
import { Car, selectionMold }                            from './car.js';

import { pageCss }                                       from "./instantUpdateProjector.js";
import { projectDetailView, projectMasterView }          from "./masterDetailProjector.js";

const listController      = ListController(Car);
const selectionController = SelectionController(selectionMold);

// create the sub-views, incl. binding

const master = projectMasterView(listController, selectionController, );
document.getElementById('masterContainer').append(...master);

const detailForm = projectDetailView(selectionController, document.getElementById('detailCard'));
document.getElementById('detailContainer').append(...detailForm);

document.querySelector("head style").textContent += pageCss;
// binding of the main view

document.getElementById('plus').onclick    = _ => listController.addModel();
