/*
   editor.js - Map editor

   Copyright (c) 2011 Robin Norwood <robin.norwood@gmail.com>
 */

"use strict";
var Editor = function (terrain_types) {
    this._canvas = $('#edit_palette');
    this._screen = null;
    this._resize_canvas(64, 160, 2, 5);

    this.terrain_types = $.extend({}, terrain_types);
    this.selected = null;

    var blocks = this._screen.getBlocks();
    var self = this;
    var idx=0;

    $.each(this.terrain_types, function (k, type) {
        self._log("idx: " + idx, " across: " + blocks.across);
        type.loc = {across: idx % blocks.across,
                    down: Math.floor(idx/blocks.across)
                   };
        self._screen.blit(type.sprite,
                          0,
                          { x: type.loc.across, y: type.loc.down });
        idx++;
    });

    this.select('mo');

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
        }

});
