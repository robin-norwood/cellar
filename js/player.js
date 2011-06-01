/*

   player.js - player class.

   Copyright (c) 2011 Robin Norwood <robin.norwood@gmail.com>

 */

var Player = function (game) {
    /* Base prototype for entities in the game. */

    // Private vars:
    var self = this; // Reference back to 'this' for private functions.
    var src_img = $('#people_sprites').get(0);
    var src_sprite_size = [32,32];
    var sprite_count = 4;
    var sprite_start = [0,0];
    var which_sprite = 0;

    // Public vars:
    this.game = game;

    this.state = $.extend({}, this.state);
    $.extend(this.state, {
        img: undefined
    });

    // Private functions:

    var init = function () {
        self.state.img = new Image();
        self.state.img.src = src_img.src;
    };

    // Public functions:

    this.control = function(cur_time, delta_time) {
        // Respond to keypresses, etc.

        return true;
    };

    this.animate = function(cur_time, delta_time) {
        // draw a frame of animation for the entity.

        if (which_sprite == sprite_count) {
            which_sprite = 0;
        }

        this.game.getScreen().getContext().drawImage(this.state.img,
                                                     sprite_start[0] + src_sprite_size[0] * which_sprite,
                                                     sprite_start[1],
                                                     src_sprite_size[0],
                                                     src_sprite_size[1],
                                                     0,
                                                     0,
                                                     32,
                                                     32
                                                    );

        which_sprite++;

        return;
    };

    init();

    return this;
};

Player.prototype = Entity;