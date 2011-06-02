/*

   screen.js - Base class for screen.

   Copyright (c) 2011 Robin Norwood <robin.norwood@gmail.com>

 */

var Screen = function (game, canvas) {
    /* prototype for the screen/drawing surface in the game. */

    // Private vars:
    var self = this; // Reference back to 'this' for private functions.
    var context = undefined;
    var blocks = { across: 32,
                   down: 24 }; // # of blocks accross and down the screen.
    // HINT: the size of the canvas should be divisible by the # of blocks

    // Private functions:

    var init = function () {
        // One-time init stuff
        context = canvas[0].getContext("2d");

    };

    // Public functions:

    this.blit = function (sprite, frame_num, loc) { // loc = { x: #, y: # }
        // FIXME: screen should have a method for putting an entity on a grid,
        // instead of going directly to context here.
        context.drawImage(sprite.src_img,
                          sprite.frames[frame_num].x,
                          sprite.frames[frame_num].y,
                          sprite.w,
                          sprite.h,
                          loc.x * sprite.w,
                          loc.y * sprite.h,
                          canvas[0].width / blocks.across,
                          canvas[0].height / blocks.down
                         );
    };

    this.getContext = function () {
        // getter for the context for raw access.
        // FIXME: Should never use this
        return context;
    };

    init();

    return this;
};
