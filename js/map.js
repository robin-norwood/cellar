/*
   map.js - map classes.

   Copyright (c) 2011 Robin Norwood <robin.norwood@gmail.com>
 */

"use strict";
var Map = function (the_map) {
    this._types = ['fr', 'wo', 'ws', 'wd', 'hi', 'gr', 'mo', 'gr'];
    this.the_map = the_map;
    this.width = the_map.map[0].length;
    this.height = the_map.map.length;

};

Map.prototype = {
    _log: function (msg) {
        if (console) {
            console.log(msg);
        }
    },
    get: function(x, y) {
        // return content at coordinates
        return this.the_map.map[x][y];
    },
    set: function(x, y, type) {
        // set content at coordinates
        return this.the_map.map[x][y] = type;
    }
};
