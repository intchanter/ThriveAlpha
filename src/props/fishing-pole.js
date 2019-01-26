import propConfig from '../config/props.json';

import Prop from '../generics/prop';

import Player from '../actors/player';

export default class FishingPole extends Prop {
    constructor (scene, x = propConfig.fishingPole.startingX, y = propConfig.fishingPole.startingY) {
        super(scene, x, y, propConfig.fishingPole.frame);

        this.config = propConfig.fishingPole;

        this.enableFishing();

        this.setCanCarry(Player);

        this.setCurrentRoom(this.config.startingRoom);
    }

    preUpdate (time, delta) {
        if (super.preUpdate) super.preUpdate(time, delta);
    }
}
