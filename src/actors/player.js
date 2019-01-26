import gameConfig from '../config/game.json';
import actorConfig from '../config/actors.json';

import HoldObject from '../mixins/inventory/hold-object';
import RoomLocation from '../mixins/room/location';
import Thirst from './mixins/thirst';
import Hunger from './mixins/hunger';

export default class Player extends
    Thirst (
        Hunger (
            RoomLocation(
                HoldObject(
                    Phaser.Physics.Arcade.Sprite
                )
            )
        )
    ) {
    constructor (scene, x = actorConfig.player.startingX, y = actorConfig.player.startingY) {
        super(scene, x, y, gameConfig.spriteAtlas.key, actorConfig.player.frame);

        this.controls = {
            cursor: scene.cursor,
            dropItem: scene.dropItem
        };

        this.config = actorConfig.player;

        let {thirstRate, maxThirst, hungerRate, maxHunger, startingRoom} = this.config;

        this.initializeThirstForSelf(thirstRate, maxThirst); 

        this.initializeHungerForSelf(hungerRate, maxHunger);

        this.setCurrentRoom(this.config.startingRoom);
    }

    // will only be invoked if added to gameobject (not just physics object)
    preUpdate (time, delta) {

        let { cursor, dropItem } = this.controls;

        let v  = this.config.velocity;

        let vx = cursor.left.isDown  ? -v
               : cursor.right.isDown ? v
               : 0;
        this.setVelocityX(vx);

        let vy = cursor.up.isDown  ? -v
               : cursor.down.isDown ? v
               : 0;
        this.setVelocityY(vy);

        if (dropItem.isDown && this.heldObject()) this.dropObject();

        this.updateThirstForSelf(isThirsty => {
            if (isThirsty) {
                // player dies!
                this.scene.gameOver('You died from Thirst!');
            }
        });

        this.updateHungerForSelf(isHungry => {
            if (isHungry) {
                // player dies!
                this.scene.gameOver('You died from Hunger!');
            }
        });
        
        if (super.preUpdate) super.preUpdate(time, delta);
    }
}
