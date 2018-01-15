import vec, * as v               from "/js/vector.js";
import { checkCol, checkSetCol } from "/js/colission.js";

const traitHolder = () => {
    const that = {};
    that.methods = [];

    that.update = (GAME) => {
        that.methods.forEach(method => {
            that[method](GAME);
        });
    }

    that.addMethods = (...methods) => {
        methods.forEach(method => that.methods.push(method));
    }

    return that;
}

export default traitHolder;

export const addDeathTrait = ({ health }) => (that) => {
    that.health = health;

    that.checkDeath = (GAME) => {
        if(that.health <= 0){
            that.handleDeath(GAME);
        }
    }

    that.addMethods("checkDeath");
}

export const addCheckColTrait = ({ singles = [], sets = [] }) => (that) => {
    let setCol = false;
    that.checkCol = ({ world }) => {
        singles.forEach(single => {
            if(checkCol(that, world[single])){
                that[`${single}Col`](world[single]);
            }
        });
        sets.forEach(set => {
            setCol = checkSetCol(that, world[set]);
            if(setCol){
                that[`${set}Col`](setCol);
            }
        });
    }

    that.addMethods("checkCol");
}

export const addEntityTrait = ({ pos, size }) => (that) => {
    that.pos = pos;
    that.size = size;

    that.fixCenter = () => {
        that.center = v.add(that.pos, v.half(that.size));
    }

    that.fixCenter();

    that.addMethods("fixCenter");
}

export const addMoveTrait = ({ velocity = vec(0, 0), canMove = true }) => (that) => {
    that.velocity = velocity;
    that.canMove = canMove;

    that.move = ({ world: {  } }) => {
        if(that.canMove){
            that.pos.x += that.velocity.x;

            that.pos.y += that.velocity.y;

            that.fixCenter();
        }
    }

    that.addMethods("move");
}

export const addSpriteTrait = ({ color, alpha = 1, rotation = 0 }) => (that) => {
    that.color = color;
    that.alpha = alpha;
    that.rotation = rotation;

    that.draw = (ctx) => {
        ctx.save();
        ctx.translate(that.center.x, that.center.y);
        ctx.rotate(that.rotation);
        ctx.globalAlpha = that.alpha;
        ctx.fillStyle = color;
        ctx.fillRect(-that.size.x/2, -that.size.y/2, that.size.x, that.size.y);
        ctx.globalApha = 1;
        ctx.restore();
    }
}