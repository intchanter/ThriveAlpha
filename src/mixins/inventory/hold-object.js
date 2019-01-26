export default (superclass) => class extends superclass {
    heldObject () {
        return this.objectCarried;
    }

    isHoldingObject () {
        return this.objectCarried !== undefined;
    }

    holdObject (prop) {
        // If we are already holding something, don't hold this prop
        if (this.isHoldingObject()) {
            return;
        }

        // It's already being held
        if (prop.isCarried()) {
            return;
        }

        // Don't hold this prop if we are not allowed to hold it
        if (!prop.canBeCarried(this)) {
            return;
        }

        this.objectCarried = prop;
        prop.holdMe(this);

        console.log(prop);
        console.log(this);
        Object.values(this.scene.props).forEach((propFromList) => {
            console.log(propFromList);
            this.scene.physics.add.overlap(prop, propFromList, () => {
                let player = 'ihguasdf';
                console.log('asdff');
                if (player.isHoldingObject()) { 
                    let carriedObject = player.heldObject();
                    console.log(carriedObject);
                    if(carriedObject !== prop && prop.canForgeWith(carriedObject)) {
                        // execute the forge
                        // TODO:
                        // 1) Handle which of the two objects are consumed and remove them
                        // 2) Handle the effect on the player by the merge (e.g. thirst decreased)
                        // 3) Add any newly formed props, and whether they are held or just on the ground
                        carriedObject.forgeWith(player, prop, carriedObject);
                    }
                }
            });
        });
    }

    dropObject () {
        // If we are not holding something we can't drop it
        if (!this.isHoldingObject()) {
            return;
        }

        // tell object it is being dropped
        this.heldObject().dropMe();

        this.objectCarried = undefined;
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
