import { TestSuite }            from "../kolibri/util/test.js";
import { NavigationController } from "./navigationController.js";
import { Navigation }           from "./navigationModel.js";


const ncSuite = TestSuite("navigationController");

ncSuite.add('getLocation-homepage' , assert => {
    const controller = NavigationController(Navigation('home'));
    assert.is(controller.getLocation(), 'home');
});

ncSuite.add('getLocation-homepage-multiple-navpoints', assert => {
    const controller = NavigationController(Navigation('home'));
    controller.addNavigationPoint('1', () => {});
    controller.addNavigationPoint('2', () => {});
    controller.addNavigationPoint('3', () => {});
    assert.is(controller.getLocation(), 'home');
});

ncSuite.add('getNavigationPoints', assert => {
    const controller = NavigationController(Navigation('home'));
    assert.is(controller.getNavigationPoints().length, 1);
    assert.is(controller.getNavigationPoints()[0], 'home');
});

ncSuite.add('addNavigationPoint', assert => {
    const controller = NavigationController(Navigation("0"));
    controller.addNavigationPoint("1", () => {});
    controller.addNavigationPoint("2", () => {});
    controller.addNavigationPoint("3", () => {});
    assert.is(controller.getNavigationPoints().length, 4);
    for (let i = 0; i < controller.getNavigationPoints(); i++) {
        assert.is(controller.getNavigationPoints()[i], i.toString());
    }
});

ncSuite.add('setOrderOfNavigationPoint', assert => {
    const controller = NavigationController(Navigation("0"));
    controller.addNavigationPoint("1", () => {});
    controller.addNavigationPoint("2", () => {});
    controller.addNavigationPoint("3", () => {});
    controller.setOrderOfNavigationPoint("0", 3);
    controller.setOrderOfNavigationPoint("1", 2);
    controller.setOrderOfNavigationPoint("2", 1);
    controller.setOrderOfNavigationPoint("3", 0);
    assert.is(controller.getNavigationPoints().length, 4);
    for (let i = 0; i < controller.getNavigationPoints(); i++) {
        assert.is(controller.getNavigationPoints()[i], (3 - i).toString());
    }
});

ncSuite.run();