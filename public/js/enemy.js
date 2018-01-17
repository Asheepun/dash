import traitHolder, * as traits  from "/js/traits.js";
import vec, * as v               from "/js/vector.js";

const enemy = (pos) => {
    const that = traitHolder();

    traits.addEntityTrait({
        pos,
        size: vec(20, 30),
    })(that);

    traits.addSpriteTrait({
        color: "red",
    })(that);

    traits.addMoveTrait({})(that);

    traits.addDeathTrait({
        health: 2,
    })(that);

    traits.addCheckColTrait({
        singles: ["player"],
    })(that);

    that.playerCol = (player) => {
        if(player.dashing){
            that.health--;
        }
    }
    that.handleDeath = ({ world: { player, remove, add } }) => {
        remove(that);
        add(punk(vec(Math.random()*900, Math.random()*600)), "enemies", 1);
        player.dashCooldown = 0;
    }

    return that;
}

export const punk = (pos) => {
    const that = enemy(pos);

    let walkCounter = 60;
    let walkedCounter = 0;

    that.AI = ({ world: { player } }) => {
        if(v.sub(player.center, that.center).mag < 150){
            that.velocity = v.pipe(
                v.sub(that.center, player.center),
                v.normalize,
                v.reverse,
                x => v.mul(x, 3),
                x => v.add(x, vec(Math.random()*2-1, Math.random()*2-1)),
            );
        }else{
            walkCounter--;
            walkedCounter--;
    
            if(walkCounter === 0){
                walkedCounter = Math.floor(20 + Math.random()*20);
                that.velocity = v.pipe(
                    v.sub(that.center, v.add(player.center, vec(Math.random()*200-100, Math.random()*200-100))),
                    v.normalize,
                    v.reverse,
                    x => v.mul(x, 2),
                );
            }
            if(walkedCounter === 0){
                walkCounter = 60 + Math.floor(Math.random()*60);
                that.velocity = vec(0, 0);
            }
        }
    }

    that.addMethods("AI");

    return that;
}

export default enemy;