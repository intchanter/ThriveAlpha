export default (superclass) => class extends superclass {
    holdMe (target) {
        this.carryTarget = target;

        // setup my carry position to be relative to the target
        this.carryRelX = this.x - target.x;
        this.carryRelY = this.y - target.y;
    }

    dropMe () {
        // my current carry target should know they are carrying me anymore
        if (this.carryTarget && this.carryTarget.objectCarried === this) this.carryTarget.objectCarried = null;

        // I don't know about my carry target anymore
        this.carryTarget = null;

        // I don't want to be moving when I drop
        this.setVelocity(0, 0);
    }

    isCarried () {
        return this.carryTarget != null;
    }

    setCanCarry (ActorClass) {
        if (!this.canCarryList)
            this.canCarryList = [];

        this.canCarryList.push(ActorClass);
    }

    canBeCarried (actor) {
        // allow all to carry if there is no canCarryList
        if (!this.canCarryList)
            return true;

        for (let ActorClass of this.canCarryList) {
            if (actor instanceof ActorClass)
                return true;
        }

        return false;
    }

    canForgeWith (prop) {

        // TODO: Store in a smarter way what can forge with what
        if (prop.config.frame === 'dish' && this.config.frame === 'water') {
            return true;
        }

        return false;
    }

    // NOTE! anything using this mixins will need to call super.preUpdate so we call this function
    // just this mixin does in case it is embedded in other mixins
    preUpdate (time, delta) {
        if (this.carryTarget) {
            this.setPosition(this.carryTarget.x + this.carryRelX, this.carryTarget.y + this.carryRelY);
        }

        if (super.preUpdate) super.preUpdate(time, delta);
    }
}
