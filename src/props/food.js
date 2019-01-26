import gameConfig from '../config/game.json';
import propConfig from '../config/props.json';

import Player from '../actors/player';
import Water from '../props/water';

import Prop from '../generics/prop';

export default class Food extends Prop {
    constructor (scene, x = propConfig.food.startingX, y = propConfig.food.startingY) {
        super(scene, x, y, propConfig.food.frame);

        this.config = propConfig.food;

        this.edible = true;
        this.ingestible = true;

        this.setCanCarry(Player);

        this.setCurrentRoom(this.config.startingRoom);
    }

    preUpdate (time, delta) {
        if (super.preUpdate) super.preUpdate(time, delta);
    }
}
