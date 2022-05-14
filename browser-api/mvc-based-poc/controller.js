import { Model, Card } from './model.js';

const homeCard    = Card("home");
const aboutCard   = Card("about");
const galleryCard = Card("gallery");
const contactCard = Card("contact");
const helpCard    = Card("help");

const cards = [homeCard, aboutCard, galleryCard, contactCard, helpCard];

const model = Model(cards);

for (let card of cards) {
    console.log(card.getContent());
}