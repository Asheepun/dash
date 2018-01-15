export const checkCol = (entity, candidate) => 
    entity.pos.x + entity.size.x > candidate.pos.x
    && entity.pos.x < candidate.pos.x + candidate.size.x
    && entity.pos.y + entity.size.y > candidate.pos.y
    && entity.pos.y < candidate.pos.y + candidate.size.y;

export const checkSetCol = (entity, set) => {
    for(let i = 0; i < set.length; i++){
        if(checkCol(entity, set[i]))
            return set[i];
    }
    return false;
}