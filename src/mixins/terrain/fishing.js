import gameConfig from '../../config/game.json';

export default (superclass) => class extends superclass {
    enableFishing () {
        this._canFish = true;
    }

    canFish () {
        return this._canFish === undefined ? false : this._canFish;
    }

    startFishing () {
        this._isFishing = true;
    }

    stopFishing () {
        this._isFishing = false;
    }

    isFishing () {
        return this._isFishing === undefined ? false : this._isFishing; 
    }

    // whenever this is overlapping water this is called
    onOverlappingWater (tile) {
        const { materialTypes } = gameConfig.map;

        // don't continue if we are not water
        if (tile.properties.materialType !== materialTypes.WATER) { return; }

        // TODO: start fishing now that we are overlapping water
    }

    // NOTE! anything using this mixins will need to call super.preUpdate so we call this function
    // just this mixin does in case it is embedded in other mixins
    preUpdate (time, delta) {
        if (super.preUpdate) super.preUpdate(time, delta);
    }
}