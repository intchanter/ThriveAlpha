import gameConfig from '../../config/game.json';

export default (superclass) => class extends superclass {
    enableFishing () {
        this._canFish = true;
    }

    canFish () {
        return this._canFish === undefined ? false : this._canFish;
    }

    startFishing () {
        // reset fishing timer and position tracking if we weren't already fishing
        if (!this.isFishing()) {
            this.resetFishing();
        }

        this._isFishing = true;
    }

    isFishingActorStationary () {
        if (!this.isCarried()) { return false; }

        const { x, y } = this.getCarriedByTarget();
        return this.fishingActorX === x && this.fishingActorY === y;
    }

    generateFishingActionEventData () {
        return {
            type: 'fishing',
            value: this.fishingTimer,
            maxValue: gameConfig.fishing.requiredTime
        };
    }

    resetFishing () {
        if (!this.isCarried()) { return; }

        const { x, y } = this.getCarriedByTarget();
        this.fishingActorX = x;
        this.fishingActorY = y;
        this.fishingTimer = 0;

        this.scene.events.emit('actionStart', this.generateFishingActionEventData());
    }

    stopFishing () {
        this._isFishing = false;
    }

    isFishing () {
        return this._isFishing === undefined ? false : this._isFishing; 
    }

    // closest tile is for tracking if our prop is over water more than anything else
    updateClosestTileForFishing (tile) {
        if (tile === undefined) { return; }

        // we want to set a closest tile if we are undefined
        if (this.closestTileForFishing === undefined ) { this.closestTileForFishing = tile; }

        // ignore if we are the same tile
        if (this.closestTileForFishing.x === tile.x && this.closestTileForFishing.y == tile.y) { return; }

        // ignore if our current tile is closer
        if (Phaser.Math.Distance.Between(this.x, this.y, tile.pixelX, tile.pixelY)
            > Phaser.Math.Distance.Between(this.x, this.y, this.closestTileForFishing.pixelX, this.closestTileForFishing.pixelY)) {
           return; 
        } 

        // set our new closest tile to test against so that we can see if we can fish
        this.closestTileForFishing = tile;
    }

    getClosetTileForFishing () {
        return this.closestTileForFishing;
    }

    // whenever this is overlapping water this is called
    onOverlappingWater (tile) {
        const { materialTypes } = gameConfig.map;

        this.updateClosestTileForFishing(tile);

        // don't continue if we are not water
        if (this.getClosetTileForFishing().properties.materialType !== materialTypes.WATER) { 
            this.stopFishing();
            return;
        }

        this.startFishing();
    }

    // NOTE! anything using this mixins will need to call super.preUpdate so we call this function
    // just this mixin does in case it is embedded in other mixins
    preUpdate (time, delta) {
        if (this.isFishing()) {
            if (!this.isCarried()) {
                this.stopFishing();
                this.scene.events.emit('actionComplete', this.generateFishingActionEventData());
            }
            else {
                this.fishingTimer += delta;
                this.scene.events.emit('actionUpdate', this.generateFishingActionEventData());

                if (!this.isFishingActorStationary()) {
                    this.resetFishing();
                    this.scene.events.emit('actionReset', this.generateFishingActionEventData());
                }

                if (this.fishingTimer > gameConfig.fishing.requiredTime) {
                    this.scene.events.emit('actionComplete', this.generateFishingActionEventData());
                    this.resetFishing();
                }
            }
        }

        if (super.preUpdate) super.preUpdate(time, delta);
    }
}