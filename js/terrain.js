/*
   terrain.js - terrain classes.

   Copyright (c) 2011 Robin Norwood <robin.norwood@gmail.com>
 */

"use strict";
var Terrain = function (types) {
    this.types = types;

    $.each(types, function (idx, t) {
        t.sprite = new Sprite(t.spriteDomId,
                              {w:t.spriteWidth, h:t.spriteHeight},
                              t.spriteStart,
                              t.frames);
    });

    this._which_frame = 0;
    this.fps = 4;

    // FIXME: This should get the 'x' and 'y' from base proto, but
    // I've messed up the inheritence somehow. Duplicate x and y here too.

    this.state = {};
    $.extend(this.state, {
        x: 0,
        y: 0,
        msSinceNewFrame: 0
    });
};

Terrain.prototype = {
    _log: function (msg) {
        if (console) {
            console.log(msg);
        }
    },
    animate: function(map, screen, deltaTime) {
        // draw a frame of animation for the terrain.
        // FIXME: ...lots of stuff. Next make a big map and the screen only show part of it.

        if (this._which_frame > 10) { // arbitrary - max 10 frames of terrain animation
            this._which_frame = 0;
        }

        for(var x=0;x<screen.getBlocks().across;x++) {
            for(var y=0;y<screen.getBlocks().down;y++) {
                var which_terrain = this.types[map.get(this.state.x+x, this.state.y+y)];
                screen.blit(which_terrain.sprite,
                            this._which_frame % which_terrain.sprite.frames.length,
                            { x: x, y: y });
            }
        }

        this.state.msSinceNewFrame += deltaTime;
        if (this.state.msSinceNewFrame > 1000/this.fps) {
            this._which_frame++;
            this.state.msSinceNewFrame = 0;
        }

        return;
    },
    recalculate: function(map, screen, player) {
        // Recalculate x and y based upon player location.
        var blocks = screen.getBlocks();
        var centerX = Math.floor(blocks.across/2);
        var centerY = Math.floor(blocks.down/2);

        var newX = player.state.x - centerX;
        var newY = player.state.y - centerY;

        newX = newX < 0 ? 0 : newX;
        newY = newY < 0 ? 0 : newY;
        newX = newX > map.width - blocks.across ? map.width - blocks.across : newX;
        newY = newY > map.height - blocks.down ? map.height - blocks.down : newY;

        this.state.x = newX;
        this.state.y = newY;

        this._log("Now terrain at: (" + newX + "," + newY + ")");
        return;
    }
};
