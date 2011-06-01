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
    var context = undefined;

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
            switch(e.which) {
              // case 77: // m
              //   var is_muted = self.audio.toggle_mute();
              //   if (is_muted) {
              //       self.entities.audio_indicator = new Indicator(self,
              //                                                     self.canvas.width - 25,
              //                                                     self.canvas.height - 25,
              //                                                     'audio_mute');
              //   }
              //   else {
              //       self.entities.audio_indicator = new Indicator(self,
              //                                                     self.canvas.width - 25,
              //                                                     self.canvas.height - 25,
              //                                                     'audio',
              //                                                     5000);
              //   }
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

        // // Update everything's state

        // // Draw

        var time = (new Date()).getTime() - curTime;
        var delay = tics - time;
        if (delay < 0) {
            delay = 0;
            self.log("Main loop took too long: " + time);
        }

//        $.doTimeout('update-game', delay, update);
   };

    // Public methods:
    this.load = function () {
        /* Game initialization code.  Should run only once. */
        canvas = $('#cellar_canvas')[0];
        context = canvas.getContext("2d");

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = "#FF0000";

        context.fillRect(50,25,50,50);

        bindControls();

        $.doTimeout('update-game', tics, update);
    };

    return true;
};

// Init and run the game
$(document).ready(function () {
    var game = new Game();
    game.load();
});

