/*

   cellar.js - Prototype for 'Game' object. 'Game' runs the whole show.

   Copyright (c) 2011 Robin Norwood <robin.norwood@gmail.com>

 */

/*
 * Some ideas and inspiration from:
 *  http://www.somethinghitme.com/projects/jslander/
 *  http://diveintohtml5.org/canvas.html
 */

"use strict";
// FIXME: This is mixing main control logic and the main 'viewport' handling
var Game = function () {
    this._entities = {};
    this._terrain = undefined;
    this._map = undefined;

    this._lastTime = (new Date()).getTime();

    this._tics = 66; // Minimum ms per update

    this._updateView = true; // We need to recalculate and update the view

    this._editMode = false;
    this._editor = undefined;
};

Game.prototype = new ViewPort();
$.extend(Game.prototype,
  {
    _bindControls: function () {
        /* Bind keyboard controls here */

        var self = this;
        $(window).bind('keydown', function (e) {
            self._log("Key '" + e.which + "' pressed");
            var caughtKey = false;
            switch(e.which) {
              case 37: // left
                self._entities.player.control_queue.push('left');
                caughtKey = true;
                break;
              case 38: // up
                self._entities.player.control_queue.push('up');
                caughtKey = true;
                break;
              case 39: // right
                self._entities.player.control_queue.push('right');
                caughtKey = true;
                break;
              case 40: // down
                self._entities.player.control_queue.push('down');
                caughtKey = true;
                break;
            }

            if (caughtKey) {
                self._updateView = true;
                e.preventDefault();
                return false;
            }

            return true;
        });

        this._canvas.bind('mousedown', function (event) {
            if (self._editMode) {
                self._editor.editLoc(self._map, self._screen, self._terrain, event.layerX, event.layerY);
                self._canvas.bind('mousemove', function (innerEvent) {
                    self._editor.editLoc(self._map, self._screen, self._terrain, innerEvent.layerX, innerEvent.layerY);
                });
            }
        });

        this._canvas.bind('mouseout', function(event) {
            if (self._editMode) {
                self._canvas.unbind('mousemove');
            }
        });

        this._canvas.bind('mouseup', function (event) {
            if (self._editMode) {
                self._canvas.unbind('mousemove');
            }
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

        if (this._updateView) {
            this._updateView = false;
            this._log("Recalculating _terrain");
            this._terrain.recalculate(this._map, this._screen, this._entities.player);
        }
        // // Animate

        // Clear the screen
        this._screen.getContext().clearRect(0,
                                            0,
                                            this._canvas.attr("width"),
                                            this._canvas.attr("height"));

        // Draw
        this._screen.getContext().save();
        this._terrain.animate(this._map, this._screen, deltaTime);
        this._screen.getContext().restore();

        var self = this;
        $.each(this._entities, function (k, entity) {
            self._screen.getContext().save();
            entity.animate(self._terrain, self._screen, deltaTime);
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

    _toggleEditMode: function () {
        this._editMode = !this._editMode;

        if (this._editMode) {
            // Turning on edit mode
            this._canvas.addClass('editing');
            this._editor = new Editor(this._terrain.types);
            $("#edit_palette").removeClass('hidden');
        }
        else {
            // Turning off edit mode
            this._canvas.removeClass('editing');
            $("#edit_palette").addClass('hidden');
        }
    },

    // Public methods:
    load: function (w, h) {
        /* Game initialization code.  Should run only once. */
        this._canvas = $('#cellar_viewport');
        this._resize_canvas(w, h, 25, 25);

        this._bindControls();

        this._map = new Map(wilderness_map);
        this._terrain = new Terrain(terrain_types);

        this._entities.player = new Player(Math.floor(this._map.width/2),
                                           Math.floor(this._map.height/2));

        var self = this;
        $('.resize_screen').click(function (event) {
            event.preventDefault();

            var size = event.target.value.split(' x ');
            self._resize_canvas(parseInt(size[0]), parseInt(size[1]), 25, 19);
            $(window).scrollTop(0);
            return false;
        });

        $('#edit_mode_toggle').click(function (event) {
            self._toggleEditMode();
            $(window).scrollTop(0);
            return true;
        });

        $.doTimeout('update-game', this._tics, function () { self._update(); });
    }
});

// Init and run the game
$(document).ready(function () {
    var game = new Game();
    game.load(640, 480);
});

