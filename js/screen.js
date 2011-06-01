/*

   screen.js - Base class for screen.

   Copyright (c) 2011 Robin Norwood <robin.norwood@gmail.com>

 */

var Screen = function (game, canvas) {
    /* prototype for the screen/drawing surface in the game. */

    // Private vars:
    var self = this; // Reference back to 'this' for private functions.
    var context = undefined;

    // Private functions:

    var init = function () {
        // One-time init stuff
        context = canvas[0].getContext("2d");

    };

    // Public functions:

    this.getContext = function () {
        // getter for the context for raw access.
        return context;
    };

    init();

    return this;
};
