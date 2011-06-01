/*

   player.js - player class.

   Copyright (c) 2011 Robin Norwood <robin.norwood@gmail.com>

 */

var Player = function (game) {
    /* Base prototype for entities in the game. */

    // Private vars:
    var self = this; // Reference back to 'this' for private functions.

    // Public vars:
    this.game = game;

    this.state = $.extend({}, this.state);
    $.extend(this.state, {
        img: $('#people_sprites')
    });

    // Private functions:

    // None yet

    // Public functions:

    this.control = function(cur_time, delta_time) {
        // Respond to keypresses, etc.

        return true;
    };

    this.animate = function(cur_time, delta_time) {
        // draw a frame of animation for the entity.

        this.game.getScreen().getContext().drawImage(this.state.img.get(0), 0, 0);

        return;
    };

    return this;
};

Player.prototype = Entity;