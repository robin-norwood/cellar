/*
   viewport.js - Base class for a viewport - something with a canvas
   and a screen to blit sprites onto.

   Copyright (c) 2011 Robin Norwood <robin.norwood@gmail.com>
 */

"use strict";
var ViewPort = function () {
    /* Base init for viewports. */

};

ViewPort.prototype = {
    _canvas: undefined,
    _screen: undefined,
    _log: function (msg) {
        if (console) {
            console.log(msg);
        }
    },
    getScreen: function () {
        return this._screen;
    },
    _resize_canvas: function (width, height, blocks_across, blocks_down) {
        this._canvas.css("width", width);
        this._canvas.css("height", height);
        this._canvas.attr("width", width);
        this._canvas.attr("height", height);
        this._screen = new Screen(this, this._canvas, blocks_across, blocks_down);
    }



};
