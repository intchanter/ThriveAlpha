import gameConfig from '../config/game.json';
import propConfig from '../config/props.json';

import Player from '../actors/player';
import Water from '../props/water';

import CarryMe from '../mixins/inventory/carry-me';
import RoomLocation from '../mixins/room/location';

export default class Dish extends
    RoomLocation(
        CarryMe(
            Phaser.Physics.Arcade.Image
        )
    ) {
    constructor (scene, x = propConfig.dish.startingX, y = propConfig.dish.startingY) {
        super(scene, x, y, gameConfig.spriteAtlas.key, propConfig.dish.frame);

        this.config = propConfig.dish;

        this.setCanCarry(Player);

        this.setCurrentRoom(this.config.startingRoom);
    }

    // if you are holding a dish and you forge it with food and water
    forgeWith(player, prop) {
        // decrease the player's thirst
        if (!prop.injestible) return false;
        if (prop.drinkable) {
            (player.thirst > 1000) ? player.thirst -= 1000 : player.thirst = 0;
        } else if (prop.edible) {
            (player.hunger > 1000) ? player.hunger -= 1000 : player.hunger = 0;
        }
    }

    preUpdate (time, delta) {
        if (super.preUpdate) super.preUpdate(time, delta);
    }
}
