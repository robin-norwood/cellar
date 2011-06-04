/*
   terrain.js - terrain classes.

   Copyright (c) 2011 Robin Norwood <robin.norwood@gmail.com>
 */

var Terrain = function (game) {
    this.types = {
        deepwater: { sprite: new Sprite('terrain_sprites', {w:32, h:32}, 4, 1) },
        water: { sprite: new Sprite('terrain_sprites', {w:32, h:32}, 5, 2) },
        woods: { sprite: new Sprite('terrain_sprites', {w:32, h:32}, 20, 1) },
        forest: { sprite: new Sprite('terrain_sprites', {w:32, h:32}, 21, 1) },
        hills: { sprite: new Sprite('terrain_sprites', {w:32, h:32}, 22, 1) },
        mountains: { sprite: new Sprite('terrain_sprites', {w:32, h:32}, 23, 1) }
    };
    this._which_frame = 0;
    this._game = game;
    this.fps = 4;

    // FIXME: This should get the 'x' and 'y' from base proto, but
    // I've messed up the inheritence somehow. Duplicate x and y here too.

    this.state = $.extend({}, this.state);
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
    animate: function(map, deltaTime) {
        // draw a frame of animation for the terrain.
        // FIXME: ...lots of stuff. Next make a big map and the screen only show part of it.

        if (this._which_frame > 10) { // arbitrary - max 10 frames of terrain animation
            this._which_frame = 0;
        }

        var screen = this._game.getScreen();
        for(var x=0;x<screen.blocks.across;x++) {
            for(var y=0;y<screen.blocks.down;y++) {
                var which_terrain = this.types[map.get(x, y).type];
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
    }
};
