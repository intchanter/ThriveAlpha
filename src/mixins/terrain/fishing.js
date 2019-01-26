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
        const { x, y } = this.getCarriedByTarget();
        return this.fishingActorX === x && this.fishingActorY === y;
    }

    resetFishing () {
        const { x, y } = this.getCarriedByTarget();
        this.fishingActorX = x;
        this.fishingActorY = y;
        this.fishingTimer = 0;
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
        if (!this.isCarried()) {
            this.stopFishing();
        }

        if (this.isFishing()) {
            this.fishingTimer += delta;

            if (!this.isFishingActorStationary()) {
                this.resetFishing();
            }

            if (this.fishingTimer > gameConfig.fishing.requiredTime) {
                console.log('we caught a fish!');
                this.resetFishing();
            }
        }

        if (super.preUpdate) super.preUpdate(time, delta);
    }
}