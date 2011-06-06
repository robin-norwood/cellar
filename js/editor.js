/*
   editor.js - Map editor

   Copyright (c) 2011 Robin Norwood <robin.norwood@gmail.com>
 */

"use strict";
var Editor = function (terrain_types) {
    this._canvas = $('#edit_palette');
    this._screen = null;
    this._resize_canvas(64, 192, 2, 5);

    this.terrain_types = $.extend({}, terrain_types);
    this.selected = null;

    this.select('mo');
    this.draw();

    var self = this;
    this._canvas.bind('click', function (event) {
        var block = self._screen.locToBlock(event.layerX, event.layerY);

        var which_type = self.typeAtLoc(block);
        if (which_type) {
            self.select(which_type);
        }
    });
};

Editor.prototype = new ViewPort();
$.extend(
    Editor.prototype,
    {
        typeAtLoc: function (loc) {
            var which = null;
            $.each(this.terrain_types, function (k, type) {
                if (loc.across == type.loc.across &&
                    loc.down == type.loc.down) {
                    which = k;

                    return false;
                }

                return true;
            });

            return which;
        },
        select: function (which_type) {
            this.selected = which_type;
            this._resize_canvas(64, 192, 2, 5);
            this.draw();
        },
        draw: function () {
            var blocks = this._screen.getBlocks();
            var idx = 0;
            var self = this;

            $.each(this.terrain_types, function (k, type) {
                type.loc = {across: idx % blocks.across,
                            down: Math.floor(idx/blocks.across)
                           };
                self._screen.blit(type.sprite,
                                  0,
                                  { x: type.loc.across, y: type.loc.down });
                idx++;
            });

            this._screen.drawBox(this.terrain_types[this.selected].loc, 'red', 2);
        },
        editLoc: function (map, screen, terrain, x, y) {
            var block = screen.locToBlock(x, y);

            map.set(block.across + terrain.state.x,
                    block.down + terrain.state.y,
                    this.selected);
            this.updateJSONView(map);
        },
        updateJSONView: function (map) {
            $('#map_content').html(JSON.stringify(map.the_map.map));
            $(window).scrollTop(0);
        }

});
