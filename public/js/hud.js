import traitHolder, * as traits from "/js/traits.js";
import vec                      from "/js/vector.js";

export const playerDashBar = (pos = vec(0, 0)) => {
    const that = traitHolder();
    
    traits.addEntityTrait({
        pos,
        size: vec(30, 10),
    })(that);
    traits.addSpriteTrait({
        color: "white",
    })(that);

    that.checkPlayerStatus = ({ world: { player } }) => {
        that.center.x = player.center.x;
        that.center.y = player.center.y-35;
        that.size.x = player.dashCooldown/2;
    }

    that.addMethods("checkPlayerStatus");

    return that;
}