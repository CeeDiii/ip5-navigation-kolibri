import {Attribute} from "../kolibri/presentationModel";

const Navigation = () => {
    let navigationPoints = [];

    return {

    }
}

const NavigationEntry = (hash, projector) => {
    const id = idCounter++;
    const hashAttr = Attribute(hash, `NavigationEntry.${id}.hash`);

    const projectorAttr = Attribute(projector, `NavigationEntry.${id}.projector`);

    return /** @type NavigationEntry */ {
        hash:      hashAttr,
        projector: projectorAttr,
        toString: () => hashAttr.getObs(VALUE).getValue(),
    }
}

NavigationEntry('banana', function test(){console.log('bah...')})