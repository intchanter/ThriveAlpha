export default (superclass) => class extends superclass {
    initializeHungerForSelf (hungerRate, maxHunger) {
        this.hunger = 0;
        this.hungerRate = hungerRate;
        this.maxHunger = maxHunger;
    }

    updateHungerForSelf (callback) {
        if ('function' !== typeof callback) callback = () => {};

        this.hunger += this.hungerRate;

        let isHungry = this.hunger >= this.maxHunger;

        callback(isHungry);
    }
}