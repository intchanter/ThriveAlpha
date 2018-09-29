import gameConfig from '../../config/game.json';

import Key from '../../props/key';

export default class UIScene extends Phaser.Scene {
    constructor (config, key = 'UI') {
        super({ key: key });
    }

    create () {
        this.game = this.scene.get('PlayGame');

        this.hungerBackground = this.add.image(0, 0, gameConfig.spriteAtlas.key, 'grey_panel');
        this.hungerBackground.setOrigin(0, 0);
        this.hungerBackground.setPosition(20, 20);
        this.hungerBackground.setDisplaySize(210,30);

        this.hungerForeground = this.add.image(0, 0, gameConfig.spriteAtlas.key, 'yellow_panel');
        this.hungerForeground.setOrigin(0, 0);
        this.hungerForeground.setPosition(25, 22);
        this.hungerForeground.setDisplaySize(200,26);

        this.thirstBackground = this.add.image(0, 0, gameConfig.spriteAtlas.key, 'grey_panel');
        this.thirstBackground.setOrigin(0, 0);
        this.thirstBackground.setPosition(20, 50);
        this.thirstBackground.setDisplaySize(210,30);

        this.thirstForeground = this.add.image(0, 0, gameConfig.spriteAtlas.key, 'blue_panel');
        this.thirstForeground.setOrigin(0, 0);
        this.thirstForeground.setPosition(25, 52);
        this.thirstForeground.setDisplaySize(200,26);
    }

    update (time, delta) {
        let hungerPercentage = this.game.actors.player.hunger / this.game.actors.player.maxHunger;
        if (hungerPercentage > 1) hungerPercentage = 1;

        this.hungerForeground.setDisplaySize(hungerPercentage * 200, 26); 

        let thirstPercentage = this.game.actors.player.thirst / this.game.actors.player.maxThirst;
        if (thirstPercentage > 1) thirstPercentage = 1;

        this.thirstForeground.setDisplaySize(thirstPercentage * 200, 26); 
    }
}
