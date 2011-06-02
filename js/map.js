/*
   map.js - map classes.

   Copyright (c) 2011 Robin Norwood <robin.norwood@gmail.com>
 */

var Map = function (game, width, height) {

    // Private vars:
    var self = this; // Reference back to 'this' for private functions.
    var types = ['water', 'woods', 'forest', 'hills', 'mountains'];
    // Public vars:

    var the_map = [];
    this.state = $.extend({}, this.state);
    $.extend(this.state, {
    });

    // Private functions:

    var init = function () {
        for(var x=0;x<width;x++) {
            the_map.push([]);
            for(var y=0;y<height;y++) {
                var which = Math.floor(Math.random()*types.length);
                the_map[x].push({type: types[which]});
            }
        }
    };

    var log = function (msg) {
        if (console) {
            console.log(msg);
        }
    };

    // Public functions:

    this.get = function(x, y) {
        // return content at coordinates
        return the_map[x][y];
    };

    init();

    return this;
};
