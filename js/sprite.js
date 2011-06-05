/*

   sprite.js - Base prototype for sprite.

   Copyright (c) 2011 Robin Norwood <robin.norwood@gmail.com>

 */

"use strict";
var Sprite = function (img_id, // id of the img dom element
                       sprite_size, // size of each sprite frame in the img: { w: #, h: # }
                       sprite_offset, // # of sprite frames before this sprite begins
                       sprite_count // # of sprite frames composing this sprite
                      ) {
    this.src_img = $('#' + img_id).get(0);
    this.frames = [];
    this.w = sprite_size.w;
    this.h = sprite_size.h;

    for(var i=0; i<sprite_count; i++) {
        var offset = sprite_offset * sprite_size.w + i * sprite_size.w;
        this.frames.push({
            x: offset % this.src_img.width,
            y: Math.floor(offset / this.src_img.width) * sprite_size.w
        });
    }
};
