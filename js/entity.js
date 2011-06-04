/*

   entities.js - Base class for entities.

   Copyright (c) 2011 Robin Norwood <robin.norwood@gmail.com>

 */

var Entity = function (game) {
    /* Base prototype for entities in the game. */

    this.game = game;

    this.state = {x: 0,
                  y: 0,
                  fps: 4
                 };

};

Entity.prototype = {
    control: function(cur_time, delta_time) {
        // It is the entities turn to 'do stuff'.
        // Return false to destroy this entity and remove it from game.

        return true;
    },

    animate: function(cur_time, delta_time) {
        // draw a frame of animation for the entity.

        return;
    }
};
