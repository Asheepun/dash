import keyBinder         from "/js/keyBinder.js";
import vec               from "/js/vector.js";
import createCanvas      from "/js/canvas.js";
import player            from "/js/player.js";
import enemy             from "/js/enemy.js";
import gameWorld         from "/js/gameWorld.js";
import { playerDashBar } from "/js/hud.js";

Promise.all([
    createCanvas(900, 600),
]).then(([ { c, ctx, pointer } ]) => {

    const GAME = {
        pointer,
        world: gameWorld(),
    };

    //create world
    for(let i = 0; i < 3; i++){
        GAME.world.add(enemy(vec(100 + i*200, 100)), "enemies", 1);
    }
    GAME.world.add(player(vec(300, 300)), "player", 2, true);
    GAME.world.add(playerDashBar(), "hud", 5);

    const keys = keyBinder();

    keys.bind({
        keys: ["w", "W"],
        down: () => GAME.world.player.dir.y--,
        up: () => GAME.world.player.dir.y++,
    });
    keys.bind({
        keys: ["s", "S"],
        down: () => GAME.world.player.dir.y++,
        up: () => GAME.world.player.dir.y--,
    });
    keys.bind({
        keys: ["a", "A"],
        down: () => GAME.world.player.dir.x--,
        up: () => GAME.world.player.dir.x++,
    });
    keys.bind({
        keys: ["d", "D"],
        down: () => GAME.world.player.dir.x++,
        up: () => GAME.world.player.dir.x--,
    });

    const loop = () => {

        GAME.world.update(GAME);

        ctx.save();
        ctx.scale(c.scale, c.scale);

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, c.width, c.height);
        
        GAME.world.draw(ctx);

        ctx.restore();
    
        setTimeout(loop, 1000/60);
        GAME.pointer.reset();
    }
    
    loop();

});