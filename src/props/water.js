import gameConfig from '../config/game.json';
import propConfig from '../config/props.json';

import Player from '../actors/player';

import CarryMe from '../mixins/inventory/carry-me';
import RoomLocation from '../mixins/room/location';

export default class Water extends
    RoomLocation(
        CarryMe(
            Phaser.Physics.Arcade.Image
        )
    ) {
    constructor (scene, x = propConfig.water.startingX, y = propConfig.water.startingY) {
        super(scene, x, y, gameConfig.spriteAtlas.key, propConfig.water.frame);

        this.config = propConfig.water;

        this.setCurrentRoom(this.config.startingRoom);
    }

    canBeCarried() {
        return false;
    }

    preUpdate (time, delta) {
        if (super.preUpdate) super.preUpdate(time, delta);
    }
}
