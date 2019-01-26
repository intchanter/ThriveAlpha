import gameConfig from '../config/game.json';

import CarryMe from '../mixins/inventory/carry-me';
import Fishing from '../mixins/terrain/fishing';
import RoomLocation from '../mixins/room/location';

export default class Prop extends
    RoomLocation(
        CarryMe(
            Fishing(
                Phaser.Physics.Arcade.Image
            )
        )
    ) {
    constructor (scene, x, y, frame) {
        super(scene, x, y, gameConfig.spriteAtlas.key, frame);
    }

    preUpdate (time, delta) {
        if (super.preUpdate) super.preUpdate(time, delta);
    }
}