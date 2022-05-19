import { Card, Model } from "./model.js";
import { Controller } from "./controller.js";
import { Projector } from "./projector.js";

const homeCard    = Card("home");
const aboutCard   = Card("about");
const galleryCard = Card("gallery");
const contactCard = Card("contact");
const helpCard    = Card("help");

const cards = [homeCard, aboutCard, galleryCard, contactCard, helpCard];

const model = Model(homeCard, cards);

const controller = Controller(model) 

const projector = Projector(controller)