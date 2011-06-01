/*

   sprite.js - Base prototype for sprite.

   Copyright (c) 2011 Robin Norwood <robin.norwood@gmail.com>

 */

var Sprite = function (img_id, // id of the img dom element
                       sprite_size, // size of each sprite frame in the img: { w: #, h: # }
                       sprite_offset, // # of sprite frames before this sprite begins
                       sprite_count // # of sprite frames composing this sprite
                      ) {
    // Private vars:
    var self = this; // Reference back to 'this' for private functions.
    // Private functions:

    var init = function () {
        // One-time init stuff
        self.src_img = $('#' + img_id).get(0);
        self.frames = [];
        self.w = sprite_size.w;
        self.h = sprite_size.h;

        for(var i=0; i<sprite_count; i++) {
            var offset = sprite_offset * sprite_size.w + i * sprite_size.w;
            self.frames.push({
                x: offset % self.src_img.width,
                y: Math.floor(offset / self.src_img.width) * sprite_size.w
            });
        }
    };

    // Public functions:

    init();

    return this;
};
