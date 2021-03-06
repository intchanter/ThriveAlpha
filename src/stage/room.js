import gameConfig from '../config/game.json';

export default class Room {
    constructor (number) {
        this.roomNumber = number;
        let roomConfig = gameConfig.rooms[number];
        this.map = roomConfig.map;
        this.fog = roomConfig.fog;
        this.scene.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    }
}
