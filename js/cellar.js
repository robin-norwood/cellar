/*

   cellar.js - Prototype for 'Game' object. 'Game' runs the whole show.

   Copyright (c) 2010 Robin Norwood <robin.norwood@gmail.com>

 */

/*
 * Some ideas and inspiration from:
 *  http://www.somethinghitme.com/projects/jslander/
 *  http://diveintohtml5.org/canvas.html
 */

// FIXME: This is really just becoming the 'view', not the whole game.
var Game = function () {
    // Private vars:

    var self = this;

    var canvas = undefined;
    var screen = undefined;

    var entities = {};
    var terrain = undefined;

    var map = undefined;

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
              case 37: // left
                entities.player.control_queue.push('left');
                break;
              case 38: // up
                entities.player.control_queue.push('up');
                break;
              case 39: // right
                entities.player.control_queue.push('right');
                break;
              case 40: // down
                entities.player.control_queue.push('down');
                break;
            }
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

        entities.player.control();

        // // Animate

        // Clear the screen
        screen.getContext().clearRect(0, 0, canvas.attr("width"), canvas.attr("height"));

        // Draw
        screen.getContext().save();
        terrain.animate(map);
        screen.getContext().restore();

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

    var resize_canvas = function (width, height) {
        canvas.css("width", width);
        canvas.css("height", height);
        canvas.attr("width", width);
        canvas.attr("height", height);
        screen = new Screen(self, canvas);
    };

    // Public methods:
    this.load = function (w, h) {
        /* Game initialization code.  Should run only once. */
        canvas = $('#cellar_canvas');
        resize_canvas(w, h);

        bindControls();

        map = new Map(this, 32, 24);
        terrain = new Terrain(this);

        entities.player = new Player(this);

        $('.resize_screen').click(function (event) {
            event.preventDefault();

            var size = event.target.value.split(' x ');
            resize_canvas(parseInt(size[0]), parseInt(size[1]));
            return false;
        });

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
    game.load(1024, 768);
});

