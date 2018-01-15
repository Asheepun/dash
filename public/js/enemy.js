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
        add(enemy(vec(Math.random()*900, Math.random()*600)), "enemies", 1);
        player.dashCooldown = 0;
    }

    that.searchPlayer = ({ world: { player } }) => {
        that.velocity = v.pipe(
            v.sub(that.center, player.center),
            v.normalize,
            v.reverse,
            x => v.mul(x, 2),
        );
    }

    that.addMethods("searchPlayer");

    return that;
}

export default enemy;