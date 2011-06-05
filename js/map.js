/*
   map.js - map classes.

   Copyright (c) 2011 Robin Norwood <robin.norwood@gmail.com>
 */

"use strict";
var Map = function (game, width, height) {
    this._types = ['deepwater', 'water', 'woods', 'forest', 'hills', 'mountains'];
    this.the_map = [];
    this.width = width;
    this.height = height;
    this.game = game;

    this._init();
};

Map.prototype = {
    _init: function () {
        for(var x=0;x<this.width;x++) {
            this.the_map.push([]);
            for(var y=0;y<this.height;y++) {
                var which = Math.floor(Math.random()*this._types.length);
                this.the_map[x].push({type: this._types[which]});
            }
        }
    },
    _log: function (msg) {
        if (console) {
            console.log(msg);
        }
    },
    get: function(x, y) {
        // return content at coordinates
        return this.the_map[x][y];
    }
};
