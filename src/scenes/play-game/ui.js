import gameConfig from '../../config/game.json';

// UI Bar relatd constants
const UIBarAlpha = 0.7;

const UIBackgroundBarHeight = 30;
const UIBackgroundBarWidth = 210;

const UIScalableBarHeight = 26;
const UIScalableBarWidth = 200;

const OneHundredPercent = 1;

export default class UIScene extends Phaser.Scene {
    constructor (config, key = 'UI') {
        super({ key: key });
    }

    create () {
        this.game = this.scene.get('PlayGame');

        this.createHungerBar(); 

        this.createThirstBar();

        this.createActionBar();

        this.game.events.on('actionStart', data => {
            this.actionValue = data.value;
            this.actionMaxValue = data.maxValue;
            this.showActionBar();
        });

        this.game.events.on('actionReset', data => {
            this.actionValue = data.value;
            this.actionMaxValue = data.maxValue;
            this.showActionBar();
        });

        this.game.events.on('actionUpdate', data => {
            this.actionValue = data.value;
            this.actionMaxValue = data.maxValue;
        });

        this.game.events.on('actionComplete', data => {
            this.hideActionBar();
        });
    }

    update (time, delta) {
        this.updateHungerBar(time, delta); 

        this.updateThirstBar(time, delta); 

        this.updateActionBar(time, delta); 
    }

    //-------------------------------------------------------

    createHungerBar () {
        const uiBackgroundBarX = 20, uiBackgroundBarY = 20;
        const uiScalableBarX = 25, uiScalableBarY = 22;

        this.hungerBackground = this.add.image(0, 0, gameConfig.spriteAtlas.key, 'grey_panel');
        this.hungerBackground.setOrigin(0, 0);
        this.hungerBackground.setPosition(uiBackgroundBarX, uiBackgroundBarY);
        this.hungerBackground.setDisplaySize(UIBackgroundBarWidth, UIBackgroundBarHeight);
        this.hungerBackground.setAlpha(UIBarAlpha);

        this.hungerForeground = this.add.image(0, 0, gameConfig.spriteAtlas.key, 'yellow_panel');
        this.hungerForeground.setOrigin(0, 0);
        this.hungerForeground.setPosition(uiScalableBarX, uiScalableBarY);
        this.hungerForeground.setDisplaySize(UIScalableBarWidth, UIScalableBarHeight);
        this.hungerForeground.setAlpha(UIBarAlpha);
    }

    createThirstBar () {
        const uiBackgroundBarX = 20, uiBackgroundBarY = 50;
        const uiScalableBarX = 25, uiScalableBarY = 52;

        this.thirstBackground = this.add.image(0, 0, gameConfig.spriteAtlas.key, 'grey_panel');
        this.thirstBackground.setOrigin(0, 0);
        this.thirstBackground.setPosition(uiBackgroundBarX, uiBackgroundBarY);
        this.thirstBackground.setDisplaySize(UIBackgroundBarWidth, UIBackgroundBarHeight);
        this.thirstBackground.setAlpha(UIBarAlpha);

        this.thirstForeground = this.add.image(0, 0, gameConfig.spriteAtlas.key, 'blue_panel');
        this.thirstForeground.setOrigin(0, 0);
        this.thirstForeground.setPosition(uiScalableBarX, uiScalableBarY);
        this.thirstForeground.setDisplaySize(UIScalableBarWidth, UIScalableBarHeight);
        this.thirstForeground.setAlpha(UIBarAlpha);
    }

    createActionBar () {
        const uiBackgroundBarX = this.sys.game.config.width / 2 - UIBackgroundBarWidth / 2, uiBackgroundBarY = this.sys.game.config.height - 40;
        const uiScalableBarX = this.sys.game.config.width / 2 - UIBackgroundBarWidth / 2 + 5, uiScalableBarY = this.sys.game.config.height - 38;

        this.actionBackground = this.add.image(0, 0, gameConfig.spriteAtlas.key, 'grey_panel');
        this.actionBackground.setOrigin(0, 0);
        this.actionBackground.setPosition(uiBackgroundBarX, uiBackgroundBarY);
        this.actionBackground.setDisplaySize(UIBackgroundBarWidth, UIBackgroundBarHeight);
        this.actionBackground.setAlpha(UIBarAlpha);

        this.actionForeground = this.add.image(0, 0, gameConfig.spriteAtlas.key, 'green_panel');
        this.actionForeground.setOrigin(0, 0);
        this.actionForeground.setPosition(uiScalableBarX, uiScalableBarY);
        this.actionForeground.setDisplaySize(UIScalableBarWidth, UIScalableBarHeight);
        this.actionForeground.setAlpha(UIBarAlpha);

        this.hideActionBar();
    }

    hideActionBar () {
        this.actionBackground.setVisible(false);
        this.actionForeground.setVisible(false);
    }

    showActionBar () {
        this.actionBackground.setVisible(true);
        this.actionForeground.setVisible(true);
    }

    updateActionBar () {
        if (this.actionForeground.visible) {
           let actionPercentage = this.actionValue / this.actionMaxValue;
           if (actionPercentage > 1) actionPercentage = OneHundredPercent;
           let currentAction = (OneHundredPercent - actionPercentage) * UIScalableBarWidth;

           this.actionForeground.setDisplaySize(currentAction, UIScalableBarHeight);
        }
    }

    updateHungerBar () {
        let hungerPercentage = this.game.actors.player.hunger / this.game.actors.player.maxHunger;
        if (hungerPercentage > 1) hungerPercentage = OneHundredPercent;
        let currentHunger = (OneHundredPercent - hungerPercentage) * UIScalableBarWidth;

        this.hungerForeground.setDisplaySize(currentHunger, UIScalableBarHeight);
    }

    updateThirstBar () {
        let thirstPercentage = this.game.actors.player.thirst / this.game.actors.player.maxThirst;
        if (thirstPercentage > 1) thirstPercentage = OneHundredPercent;
        let currentThirst = (OneHundredPercent - thirstPercentage) * UIScalableBarWidth;

        this.thirstForeground.setDisplaySize(currentThirst, UIScalableBarHeight);
    }
}
