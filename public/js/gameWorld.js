const gameWorld = () => {
    const that = {
        layers: [],
    };

    that.add = (entity, type, layer, single = false) => {
        entity.type = type;
        entity.layer = layer;

        //create and add to layer
        while(that.layers.length <= layer){
            that.layers.push([]);
        }
        that.layers[layer].push(entity);

        //create and add to set
        if(single){
            that[type] = entity;
        }
        else{
            if(that[type] === undefined) that[type] = [];
            that[type].push(entity);
        }
    }

    that.remove = (entity) => {
        that.layers[entity.layer].splice(that.layers[entity.layer].indexOf(entity), 1);
        if(that[entity.type].constructor = Array){
            that[entity.type].splice(that[entity.type].indexOf(entity), 1);
        }else delete that[entity.type];
        delete entity.type;
        delete entity.layer;
    }

    that.clearType = (type) => {
        delete that[type];
    }

    that.update = (GAME) => {
        for(let key in that){
            if(key !== "layers" && key !== "clearType" && key !== "draw" && key !== "update" && key !== "add" && key !== "remove"){
                if(that[key].constructor === Array){
                    that[key].forEach(entity => {
                        if(entity.update) entity.update(GAME);
                    });
                }else if(that[key].update) that[key].update(GAME);
            }
        }
    }

    that.draw = (ctx) => {
        that.layers.forEach(layer => layer.forEach(entity => {
            if(entity.draw) entity.draw(ctx);
        }));
    }

    return that;
}

export default gameWorld;