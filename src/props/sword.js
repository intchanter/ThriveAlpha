import gameConfig from '../config/game.json';
import propConfig from '../config/props.json';

import Player from '../actors/player';

import Prop from '../generics/prop';

export default class Sword extends Prop {
    constructor (scene, x = propConfig.sword.startingX, y = propConfig.sword.startingY) {
        super(scene, x, y, propConfig.sword.frame);

        this.config = propConfig.sword;

        this.setCanCarry(Player);

        this.setCurrentRoom(this.config.startingRoom);
    }

    preUpdate (time, delta) {
        if (super.preUpdate) super.preUpdate(time, delta);
    }
}
