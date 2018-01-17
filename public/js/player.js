import vec, * as v               from "/js/vector.js";
import traitHolder, * as traits  from "/js/traits.js";

const player = (pos) => {
    const that = traitHolder();

    traits.addEntityTrait({
        pos,
        size: vec(20, 30)
    })(that);

    traits.addSpriteTrait({
        color: "white",
    })(that);

    traits.addMoveTrait({})(that);

    traits.addCheckColTrait({
        sets: ["enemies"],
    })(that);

    that.enemiesCol = (enemy) => {
        if(!that.dashing){
        }
    }

    that.dir = vec(0, 0);
    that.speed = 2;

    that.calculateVelocity = () => {
        that.velocity = v.pipe(
            that.dir.copy(),
            v.normalize,
            x => v.mul(x, that.speed),
        );
    }

    that.dashCooldown = 0;
    that.dashed = 0;
    that.dashing = false;
    that.dashDir = vec(0, 0);

    that.checkPointer = ({ pointer }) => {
        if(pointer.pressed && that.dashCooldown <= 0 && that.dashed <= 0){
            that.dashCooldown = 60;
            that.dashed = 8;
            that.dashDir = v.getDir(v.sub(that.center, pointer.pos.copy()), 10);
            that.canMove = false;
        }
        if(that.dashCooldown > 0){
            that.dashCooldown--;
        }else{
            that.dashCooldown = 0;
            that.canMove = true;
        }
    }
    that.handleDash = () => {
        if(that.dashed > 0){
            that.dashing = true;
            that.dashed--;
            that.pos.add(that.dashDir);
        }else{
            that.dashing = false;
        }
    }

    that.addMethods("calculateVelocity", "checkPointer", "handleDash");

    return that;
}

export default player;