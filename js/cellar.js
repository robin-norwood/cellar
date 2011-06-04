/*

   cellar.js - Prototype for 'Game' object. 'Game' runs the whole show.

   Copyright (c) 2011 Robin Norwood <robin.norwood@gmail.com>

 */

/*
 * Some ideas and inspiration from:
 *  http://www.somethinghitme.com/projects/jslander/
 *  http://diveintohtml5.org/canvas.html
 */

// FIXME: This is really just becoming the 'view', not the whole game.
var Game = function () {
    this._canvas = undefined;
    this._screen = undefined;

    this._entities = {};
    this._terrain = undefined;

    this._map = undefined;

    this._lastTime = (new Date()).getTime();

    this._tics = 33; // Minimum ms per update
};

Game.prototype = {
    _log: function (msg) {
        if (console) {
            console.log(msg);
        }
    },
    _bindControls: function () {
        /* Bind keyboard controls here */

        var self = this;
        $(window).bind('keydown', function (e) {
            self._log("Key '" + e.which + "' pressed");
            switch(e.which) {
              case 37: // left
                self._entities.player.control_queue.push('left');
                break;
              case 38: // up
                self._entities.player.control_queue.push('up');
                break;
              case 39: // right
                self._entities.player.control_queue.push('right');
                break;
              case 40: // down
                self._entities.player.control_queue.push('down');
                break;
            }
            return true;
        });

    },
    _update: function () {
        /* Main loop */
        var curTime = (new Date()).getTime();
        var deltaTime = curTime - this._lastTime;
        this._lastTime = curTime;

        // // Update everything's state - if $player has moved, let
        // the rest of the world take its turn.

        this._entities.player.control();

        // // Animate

        // Clear the screen
        this._screen.getContext().clearRect(0,
                                            0,
                                            this._canvas.attr("width"),
                                            this._canvas.attr("height"));

        // Draw
        this._screen.getContext().save();
        this._terrain.animate(this._map, deltaTime);
        this._screen.getContext().restore();

        var self = this;
        $.each(this._entities, function (k, entity) {
            self._screen.getContext().save();
            entity.animate(deltaTime);
            self._screen.getContext().restore();
        });

        var time = (new Date()).getTime() - curTime;
        var delay = this._tics - time;
        if (delay < 0) {
            delay = 0;
            this._log("Main loop took too long: " + time);
        }

        $.doTimeout('update-game', delay, function () { self._update(); });
    },

    _resize_canvas: function (width, height) {
        this._canvas.css("width", width);
        this._canvas.css("height", height);
        this._canvas.attr("width", width);
        this._canvas.attr("height", height);
        this._screen = new Screen(this, this._canvas);
    },

    // Public methods:
    load: function (w, h) {
        /* Game initialization code.  Should run only once. */
        this._canvas = $('#cellar_canvas');
        this._resize_canvas(w, h);

        this._bindControls();

        this._map = new Map(this, 32, 24);
        this._terrain = new Terrain(this);

        this._entities.player = new Player(this);

        var self = this;
        $('.resize_screen').click(function (event) {
            event.preventDefault();

            var size = event.target.value.split(' x ');
            self._resize_canvas(parseInt(size[0]), parseInt(size[1]));
            return false;
        });

        $.doTimeout('update-game', this._tics, function () { self._update(); });
    },

    getScreen: function () {
        return this._screen;
    }
};

// Init and run the game
$(document).ready(function () {
    var game = new Game();
    game.load(1024, 768);
});

