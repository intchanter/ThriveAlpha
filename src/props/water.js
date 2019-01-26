import gameConfig from '../config/game.json';
import propConfig from '../config/props.json';

import Player from '../actors/player';

import Prop from '../generics/prop';

export default class Water extends Prop {
    constructor (scene, x = propConfig.water.startingX, y = propConfig.water.startingY) {
        super(scene, x, y, propConfig.water.frame);

        this.config = propConfig.water;

        this.drinkable = true;
        this.ingestible = true;

        this.setCurrentRoom(this.config.startingRoom);
    }

    canBeCarried() {
        return false;
    }

    preUpdate (time, delta) {
        if (super.preUpdate) super.preUpdate(time, delta);
    }
}
