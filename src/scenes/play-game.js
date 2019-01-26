import gameConfig from '../config/game.json';

import AdminConsole from '../mixins/admin-console';

import Player from '../actors/player';
import Sword from '../props/sword';
import Wood from '../props/wood';
import Water from '../props/water';
import Dish from '../props/dish';
import Food from '../props/food';

export default class PlayGameScene extends AdminConsole(Phaser.Scene) {
    constructor (config, key = 'PlayGame') {
        super({ key: key });

        this.actors = {};

        this.props = {};

        this.isGameOver = false;
    }

    init () {
        this.setupAdminConsole(); // if admin console is enabled via app, set it up

        this.cursor = this.input.keyboard.createCursorKeys();

        this.dropItem = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    create () {
        this.currentRoom = this.scene.get('CurrentRoom');
        this.ui = this.scene.get('UI');

        this.createPlayer();

        this.createSword();

        this.createWood();

        this.createWater();

        this.createDish();

        this.createFood();

        // load current room
        this.scene.launch('CurrentRoom', { roomId: this.actors.player.getCurrentRoom() });

        // load the ui
        this.scene.launch('UI');
    }

    update (time, delta) {
    }

    createPlayer () {
        this.actors.player = new Player(this);
    }

    createSword () {
        this.props.sword = new Sword(this);
    }

    createWood () {
        this.props.wood = new Wood(this);
    }

    createWater () {
        this.props.water = new Water(this);
    }

    createDish () {
        this.props.dish = new Dish(this);
    }

    createFood () {
        this.props.food = new Food(this);
    }

    gameOver (reason) {
        // TODO: remove this console.log when we are ready for real game over
        if (!this.isGameOver) console.log(`Game Over! ${reason}`);

        this.isGameOver = true;

        // TODO: remove this return when are ready for real game over
        return;

        this.scene.stop('UI');
        this.scene.stop('CurrentRoom');

        this.scene.start('MainMenu');
    }
};
