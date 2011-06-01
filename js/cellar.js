/*

   cellar.js - Prototype for 'Game' object. 'Game' runs the whole show.

   Copyright (c) 2010 Robin Norwood <robin.norwood@gmail.com>

 */

/*
 * Some ideas and inspiration from:
 *  http://www.somethinghitme.com/projects/jslander/
 *  http://diveintohtml5.org/canvas.html
 */

var Game = function () {
    // Private vars:

    var self = this;

    var canvas = undefined;
    var screen = undefined;

    var entities = {};

    var lastTime = (new Date()).getTime();

    var tics = 250; // Minimum ms per update

    // Private methods:
    // Use 'self' instead of 'this' because JavaScript is broken.

    var log = function (msg) {
        if (console) {
            console.log(msg);
        }
    };

    var bindControls = function () {
        /* Bind keyboard controls here */

        $(window).bind('keydown', function (e) {
            log("Key '" + e.which + "' pressed");
            switch(e.which) {
              // case 37: // left
              // case 38: // up
              // case 39: // right
              // case 40: // down
            }
            return true;
        });

        $(window).bind('keyup', function (e) {
            return true;
        });

    };

    var update = function () {
        /* Main loop */
        var curTime = (new Date()).getTime();
        var deltaTime = curTime - lastTime;
        lastTime = curTime;

        // // Update everything's state - if $player has moved, let
        // the rest of the world take its turn.


        // // Animate

        // Clear the screen
        screen.getContext().clearRect(0, 0, canvas.width, canvas.height);

        // Draw
        $.each(entities, function (k, entity) {
            screen.getContext().save();
            entity.animate();
            screen.getContext().restore();
        });

        var time = (new Date()).getTime() - curTime;
        var delay = tics - time;
        if (delay < 0) {
            delay = 0;
            log("Main loop took too long: " + time);
        }

        $.doTimeout('update-game', delay, update);
   };

    // Public methods:
    this.load = function () {
        /* Game initialization code.  Should run only once. */
        canvas = $('#cellar_canvas')[0];
        screen = new Screen(self, canvas);

        bindControls();

        entities.player = new Player(this);
        $.doTimeout('update-game', tics, update);
    };

    this.getScreen = function () {
        return screen;
    };

    return true;
};

// Init and run the game
$(document).ready(function () {
    var game = new Game();
    game.load();
});

