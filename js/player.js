/*
   player.js - player class.

   Copyright (c) 2011 Robin Norwood <robin.norwood@gmail.com>
 */

var Player = function (game) {
    /* Base prototype for entities in the game. */

    this._sprite = new Sprite('people_sprites', {w:32, h:32}, 12, 4);
    this._which_frame = 0;
    this._game = game;

    this.control_queue = [];

    // FIXME: This should get the 'x' and 'y' from base proto, but
    // I've messed up the inheritence somehow. Duplicate x and y here too.

    this.state = $.extend({}, this.state);
    $.extend(this.state, {
        x: 0,
        y: 0
    });
};

Player.prototype = {
    _log: function (msg) {
        if (console) {
            console.log(msg);
        }
    },
    control: function(cur_time, delta_time) {
        // Respond to keypresses, etc.
        var took_turn = false;

        if (this.control_queue.length > 0) {
            took_turn = true;
            var cmd = this.control_queue.shift();
            this._log("Shifted '" + cmd + "'");
            switch(cmd) {
                case 'left':
                  this.state.x -= 1;
                  break;
                case 'up':
                  this.state.y -= 1;
                  break;
                case 'right':
                  this.state.x += 1;
                  break;
                case 'down':
                  this.state.y += 1;
                  break;
            }
        }

        return took_turn;
    },
    animate: function(cur_time, delta_time) {
        // draw a frame of animation for the entity.
        // FIXME: Clean up and put in base prototype

        if (this._which_frame == this._sprite.frames.length) {
            this._which_frame = 0;
        }

        this._log("Player at (" + this.state.x + ", " + this.state.y + ")");

        this._game.getScreen().blit(this._sprite, this._which_frame, { x: this.state.x, y: this.state.y });

        this._which_frame++;

        return;
    }
};
