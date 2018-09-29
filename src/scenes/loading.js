// json imports
import gameConfig from '../config/game.json';

// web fonts
// import WebFont from 'webfontloader';
// require('../../assets/css/fonts.css');
// require('../../assets/fonts/[font].ttf');

// require in other assets to be included but not added to cache at this time
// require('../../assets/sounds/sound.wav');
require('../../assets/images/sprite_atlas.json');
require('../../assets/images/sprite_atlas.png');
require('../../assets/images/map-tileset-tiny.png');
require('../../assets/images/play.png');

require('../../assets/json/room15.json');

export default class LoadingScene extends Phaser.Scene {
    constructor (config, key = 'Loading') {
        super({ key: key });
    }

    init () {
        // font loading
        this.areFontsLoaded = true;
    }

    preload () {
        // load sprite atlas
        this.load.atlas(gameConfig.spriteAtlas.key, gameConfig.spriteAtlas.imageFile, gameConfig.spriteAtlas.jsonFile);

        // load tilesets
        gameConfig.map.tilesets.forEach(tileset => {
            this.load.image(tileset.key, tileset.file);
        });

        // load room tilemap data
        Object.keys(gameConfig.rooms).forEach((roomId) => {
            let roomKey = `room${roomId}`;
            let roomFile = `room${roomId}.json`;

            this.load.tilemapTiledJSON(roomKey, roomFile);
        });
    }

    create () {
        this.scene.start('MainMenu');
    }
};
