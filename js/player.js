/*
   player.js - player class.

   Copyright (c) 2011 Robin Norwood <robin.norwood@gmail.com>
 */

var Player = function (game) {
    /* Base prototype for entities in the game. */

    // Private vars:
    var self = this; // Reference back to 'this' for private functions.
    var sprite = new Sprite('people_sprites', {w:32, h:32}, 12, 4);
    var which_sprite = 0;

    // Public vars:
    this.game = game;
    this.control_queue = [];

    // FIXME: This should get the 'x' and 'y' from base proto, but
    // I've messed up the inheritence somehow. Duplicate x and y here too.

    this.state = $.extend({}, this.state);
    $.extend(this.state, {
        x: 0,
        y: 0
    });

    // Private functions:

    var init = function () {
    };

    var log = function (msg) {
        if (console) {
            console.log(msg);
        }
    };

    // Public functions:

    this.control = function(cur_time, delta_time) {
        // Respond to keypresses, etc.
        var took_turn = false;

        if (this.control_queue.length > 0) {
            took_turn = true;
            var cmd = this.control_queue.shift();
            log("Shifted '" + cmd + "'");
            switch(cmd) {
                case 'left':
                  self.state.x -= 1;
                  break;
                case 'up':
                  self.state.y -= 1;
                  break;
                case 'right':
                  self.state.x += 1;
                  break;
                case 'down':
                  self.state.y += 1;
                  break;
            }
        }

        return took_turn;
    };

    this.animate = function(cur_time, delta_time) {
        // draw a frame of animation for the entity.
        // FIXME: Clean up and put in base prototype

        if (which_sprite == sprite.frames.length) {
            which_sprite = 0;
        }

        log("Player at (" + this.state.x + ", " + this.state.y + ")");

        // FIXME: screen should have a method for putting an entity on a grid,
        // instead of going directly to context here.
        this.game.getScreen().getContext().drawImage(sprite.src_img,
                                                     sprite.frames[which_sprite].x,
                                                     sprite.frames[which_sprite].y,
                                                     sprite.w,
                                                     sprite.h,
                                                     this.state.x * sprite.w,
                                                     this.state.y * sprite.h,
                                                     sprite.w,
                                                     sprite.h
                                                    );

        which_sprite++;

        return;
    };

    init();

    return this;
};

Player.prototype = Entity;