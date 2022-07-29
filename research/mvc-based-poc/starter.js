import { Card, Model } from "./Model.js";
import { Controller } from "./Controller.js";
import { Projector } from "./Projector.js";

const homeCard    = Card("home");
const aboutCard   = Card("about");
const galleryCard = Card("gallery");
const contactCard = Card("contact");
const helpCard    = Card("help");

const cards = [homeCard, aboutCard, galleryCard, contactCard, helpCard];

const model = Model(homeCard, cards);

const controller = Controller(model) 

const projector = Projector(controller)