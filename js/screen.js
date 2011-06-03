/*

   screen.js - Base class for screen.

   Copyright (c) 2011 Robin Norwood <robin.norwood@gmail.com>

 */

var Screen = function (game, canvas) {
    // HINT: the size of the canvas should be divisible by the # of blocks
    this.blocks = { across: 32,
                    down: 24 }; // # of blocks accross and down the screen.

    this._canvas = canvas;
    this._context = canvas[0].getContext("2d");

};

Screen.prototype = {
    blit: function (sprite, frame_num, loc) { // loc = { x: #, y: # }
        // FIXME: screen should have a method for putting an entity on a grid,
        // instead of going directly to context here.
        var block_size = {w: this._canvas[0].width / this.blocks.across,
                          h: this._canvas[0].height / this.blocks.down};
        this._context.drawImage(sprite.src_img,
                                sprite.frames[frame_num].x,
                                sprite.frames[frame_num].y,
                                sprite.w,
                                sprite.h,
                                loc.x * block_size.w,
                                loc.y * block_size.h,
                                block_size.w,
                                block_size.h
                               );
    },
    getContext: function () {
        // getter for the context for raw access.
        // FIXME: Should never use this
        return this._context;
    }
};
