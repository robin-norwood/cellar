/*

   screen.js - Base class for screen.

   Copyright (c) 2011 Robin Norwood <robin.norwood@gmail.com>

 */

"use strict";
var Screen = function (game, canvas, across, down) {
    // HINT: the size of the canvas should be divisible by the # of blocks
    this._blocks = { across: 0,
                     down: 0 }; // # of blocks accross and down the screen.
    this._blockSize = { w: 0,
                        h: 0 }; // width and height of each block as rendered on the screen

    this._canvas = canvas;
    this._context = canvas[0].getContext("2d");

    this.setSize(across, down);
};

Screen.prototype = {
    blit: function (sprite, frame_num, loc) { // loc = { x: #, y: # }
        this._context.drawImage(sprite.src_img,
                                sprite.frames[frame_num].x,
                                sprite.frames[frame_num].y,
                                sprite.w,
                                sprite.h,
                                loc.x * this._blockSize.w,
                                loc.y * this._blockSize.h,
                                this._blockSize.w,
                                this._blockSize.h
                               );
    },
    getContext: function () {
        // getter for the context for raw access.
        // FIXME: Should never use this
        return this._context;
    },
    setSize: function (across, down) {
        this._blocks.across = across;
        this._blocks.down = down;

        this._blockSize.w = this._canvas[0].width / this._blocks.across;
        this._blockSize.h = this._canvas[0].height / this._blocks.down;
    },
    getBlocks: function () {
        return this._blocks;
    },
    locToBlock: function (x, y) {
        return {across: Math.floor(x/this._blockSize.w),
                down: Math.floor(y/this._blockSize.h)};
    }
};
