import gameConfig from '../../config/game.json';

export default class CurrentRoomScene extends Phaser.Scene {
    constructor (config, key = 'CurrentRoom') {
        super({ key: key });
    }

    init (data) {
        // set roomId to startingRoom unless defined
        this.roomId = data.roomId || gameConfig.map.startingRoom;
    }

    create () {
        this.game = this.scene.get('PlayGame');

        this.setupMap();

        this.setupEdges();

        this.setupActors();

        this.setupProps();

        // correct tilemap flashing by using roundPixels on the camera
        this.cameras.main.setRoundPixels(true);

        // cleanup when we shutdown (change rooms)
        this.events.once('shutdown', () => (this.cleanup()));
    }

    changeRoom (roomId) {
        if (gameConfig.rooms[roomId]) {
            this.scene.pause();
            this.scene.restart({ roomId });
        }
    }

    setupMap () {
        this.tilemap = this.make.tilemap({ key: `room${this.roomId}` });

        this.tilesets = {};
        gameConfig.map.tilesets.forEach(tileset => {
            this.tilesets[tileset.key] = this.tilemap.addTilesetImage(tileset.key);
        });

        this.tileLayers = {};
        gameConfig.map.tileLayers.forEach(layer => {
            this.tileLayers[layer.name] = this.tilemap.createDynamicLayer(layer.name, this.tilesets[layer.tileset], 0, 0);
        });

        // resize world to match the tilemap
        this.physics.world.setBounds(0, 0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);
        this.cameras.main.setBounds(0, 0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);
    }

    setupActors () {
        let { player } = this.game.actors;

        this.add.existing(player); // makes player.preUpdate get called
        this.physics.add.existing(player, false);

        player.setCollideWorldBounds(true);

        this.onEdge(player); // room edge detection

        // set collision on walls
        this.tileLayers.walls.setCollisionByExclusion([-1]);
        this.physics.add.collider(player, this.tileLayers.walls); // map collisions with wall layer

        // player overlapping with props
        Object.values(this.game.props).forEach((prop) => {
            // the collision event (this actor with ANY prop)
            this.physics.add.overlap(player, prop, () => {
                // player is carrying a prop and it can be forged with the collided one
                if (player.isHoldingObject()) { 
                    let carriedObject = player.heldObject();
                    if(carriedObject !== prop && prop.canForgeWith(carriedObject)) {
                        // execute the forge
                        // TODO:
                        // 1) Handle which of the two objects are consumed and remove them
                        // 2) Handle the effect on the player by the merge (e.g. thirst decreased)
                        // 3) Add any newly formed props, and whether they are held or just on the ground
                        carriedObject.forgeWith(player, prop);
                    }
                }

                // picking up another prop when player isn't carrying anything
                else {
                    player.holdObject(prop);
                }
            });
        });
        this.cameras.main.startFollow(player);
    }

    setupProps () {
        Object.values(this.game.props).forEach((prop) => {
            if (prop.getCurrentRoom() === this.roomId) {
                this.add.existing(prop);
                this.physics.add.existing(prop);
            }

            // props overlapping with wall layer (where water is)
            if (prop.canFish()) {
                // walls layer
                this.physics.add.overlap(prop, this.tileLayers.walls, (ourProp, tile) => {
                    if (tile === undefined) { return; }

                    ourProp.onOverlappingWater(tile);
                });
            }
        });
    }

    setupEdges () {
        // I was attempting to get the worldbounds emitted event to show up somewhere, but that was proving hard to setup
        this.edge = {};

        var W = this.cameras.main.width;
        var H = this.cameras.main.height;
        var dir = {
            north: [0, 0,   W, 1],
            south: [0, H-1, W, 1],
            west:  [0,   0, 1, H],
            east:  [W-1, 0, 1, H]
        };

        for (let d in dir) {
            let [x, y, w, h] = dir[d];

            this.edge[d] = this.add.zone(x, y, w, h);

            this.edge[d].setOrigin(0, 0);

            // need to add an arcade physics body to the zone for collision
            this.physics.add.existing(this.edge[d], true);
            this.edge[d].body.width  = w;
            this.edge[d].body.height = h;
            this.edge[d].width = w;
        }
    }

    onEdge (entity) {
        if (! entity.onEdge) { console.log("Object "+entity+" does not have onEdge"); return }

        for (let direction in this.edge)
            this.physics.add.overlap(entity, this.edge[direction], () => { entity.onEdge(this, direction) }, null);
    }

    cleanup () {
        // undo actors and props physics bodies because they may not be in the next room
        [...Object.values(this.game.actors), ...Object.values(this.game.props)].forEach((thing) => {
            if (thing.getCurrentRoom() === this.roomId && thing.body) {
                thing.body.destroy();
                thing.body = null;
            }
        });
    }
}
