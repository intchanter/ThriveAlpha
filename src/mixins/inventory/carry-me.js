export default (superclass) => class extends superclass {
    holdMe (target) {
        this.carryTarget = target;

        // setup my carry position to be relative to the target
        let deltaX = this.x - target.x;
        let deltaY = this.y - target.y;
        let signX = deltaX / Math.abs(deltaX);
        let signY = deltaY / Math.abs(deltaY);
        
        let minDeltaX = this.width / 2 + target.width / 2 + 1;
        let minDeltaY = this.height / 2 + target.height / 2 + 1;

        let overlapX = minDeltaX - Math.abs(deltaX);
        let overlapY = minDeltaY - Math.abs(deltaY);

        if (overlapX > 0 && overlapX < overlapY) {
            deltaX = signX * minDeltaX;
        }
        else if (overlapY > 0) {
            deltaY = signY * minDeltaY;
        }

        this.carryRelX = deltaX;
        this.carryRelY = deltaY;
    }

    dropMe () {
        // I don't know about my carrier anymore
        this.carryTarget = undefined; 
    }

    isCarried () {
        return this.carryTarget !== undefined;
    }

    getCarriedByTarget () {
        return this.carryTarget;
    }

    setCanCarry (ActorClass) {
        if (!this.canCarryList)
            this.canCarryList = [];

        this.canCarryList.push(ActorClass);
    }

    canBeCarried (actor) {
        // allow all to carry if there is no canCarryList
        if (!this.canCarryList) {
            return true;
        }

        for (let ActorClass of this.canCarryList) {
            if (actor instanceof ActorClass) {
                return true;
            }
        }

        return false;
    }

    canForgeWith (prop) {

        // TODO: Store in a smarter way what can forge with what
        if (prop.config.frame === 'dish' && this.config.frame === 'water') {
            return true;
        }

        // TODO: Store in a smarter way what can forge with what
        if (prop.config.frame === 'dish' && this.config.frame === 'food') {
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

        if (super.preUpdate) {
            super.preUpdate(time, delta);
        }
    }
}
