import gameConfig from '../config/game.json';
import propConfig from '../config/props.json';

import Player from '../actors/player';
import Water from '../props/water';

import CarryMe from '../mixins/inventory/carry-me';
import RoomLocation from '../mixins/room/location';

export default class Food extends
    RoomLocation(
        CarryMe(
            Phaser.Physics.Arcade.Image
        )
    ) {
    constructor (scene, x = propConfig.food.startingX, y = propConfig.food.startingY) {
        super(scene, x, y, gameConfig.spriteAtlas.key, propConfig.food.frame);

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
