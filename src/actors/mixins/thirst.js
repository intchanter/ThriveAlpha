export default (superclass) => class extends superclass {
    initializeThirstForSelf (thirstRate, maxThirst) {
        this.thirst = 0;
        this.thirstRate = thirstRate;
        this.maxThirst = maxThirst;
    }

    updateThirstForSelf (callback) {
        if ('function' !== typeof callback) callback = () => {};

        this.thirst += this.thirstRate;

        let isThirsty = this.thirst >= this.maxThirst;

        callback(isThirsty);
    }
}