import gameConfig from '../config/game.json';
import propConfig from '../config/props.json';

import Player from '../actors/player';

import Prop from '../generics/prop';

export default class Wood extends Prop {
    constructor (scene, x = propConfig.wood.startingX, y = propConfig.wood.startingY) {
        super(scene, x, y,  propConfig.wood.frame);

        this.config = propConfig.wood;

        this.setCanCarry(Player);

        this.setCurrentRoom(this.config.startingRoom);
    }

    preUpdate (time, delta) {
        if (super.preUpdate) super.preUpdate(time, delta);
    }
}
