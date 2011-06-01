/*

   audio.js - Audio manager

   Copyright (c) 2011 Robin Norwood <robin.norwood@gmail.com>

      This file is part of AudioManager.

    AudioManager is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    AudioManager is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with AudioManager.  If not, see <http://www.gnu.org/licenses/>.

 */

/*
 * Inspired by:
 * http://www.storiesinflight.com/html5/audio.html
 */

var AudioManager = function (selector) {
    // Manage audio streams for multi-channel audio.
    //
    // Supports either named streams, for long-running audio channels,
    // or transient streams, for sound effects, etc.
    //
    // By default, will load all audio streams with an id. Use
    // 'selector' to limit.
    //
    // // Usage:
    //   <html><body>
    //     <audio class="my_sounds" id="music_one" src="..."/>
    //     <audio class="my_sounds" id="music_two" src="..."/>
    //     <audio class="my_sounds" id="effect_one" src="..."/>
    //     <audio class="my_sounds" id="effect_two" src="..."/>
    //     <audio id="other_sound" src="..."/>
    //   </body></html>
    //
    // var am = new AudioManager(); // Loads all audio tags.
    // am.play('music_one', 'music'); // Starts playing first track
    // am.play('effect_one'); // Play sound effect
    // am.play('effect_two'); // Play same efect twice in a row
    // am.play('effect_two'); // All three playing at once, along with music
    //
    // // There are four audio streams playing now
    //
    // am.play('music_two', 'music'); // Skips to next track
    //
    // // Still just four audio streams - the 'music' stream was reused
    //
    // Use jQuery selectors to avoid loading all audio:
    //
    // var am = new AudioManager('.my_sounds'); // 'other_sound' not loaded.
    //
    // // Mute:
    //
    // am.toggle_mute();
    // am.toggle_mute();
    //
    // // Load without playing:
    //
    // am.load('music_two', 'music');

    if (!selector) {
        selector = "audio";
    }

    // Private vars:

    var self = this;

    var library = new Object(); // Library of audio objects
    var named_streams = new Object(); // For longrunning streams, like music.
    var transient_streams = new Array(); // For transient sounds, like sound effects.

    // Public vars:

    this.muted = false;

    // Private functions:

    var init = function () {
        // Object initialization code.  Should run only once.

        $(selector).each(function (idx, obj) {
            if (obj.attr("id")) {
                library[obj.attr("id")] = obj;
            }
        });
    };

    var mute_stream = function (idx, stream) {
        stream.mute();
    };

    var unmute_stream = function (idx, stream) {
        stream.unmute();
    };

    // Public functions:

    this.toggle_mute = function () {
        if (this.muted) {
            $.each(transient_streams, unmute_stream);
            $.each(named_streams, unmute_stream);
        }
        else {
            $.each(transient_streams, mute_stream);
            $.each(named_streams, mute_stream);
        }

        this.muted = !this.muted;

        return this.muted;
    };

    this.get = function (name) {
        // Get a named stream. Transient streams cannot be retrieved.
        return named_streams[name];
    };

    this.play = function (id, name) {
        // Shortcut that loads sound and plays it.
        var snd = this.load(id, name);
        snd.play();

        return snd;
    };

    this.load = function (id, name) {
        // Load sound, return AudioStream object.
        //
        // id: id of <audio> tag
        // name: Name of audio stream, if a named stream

        var the_stream = null;

        if (name) {
            if (named_streams[name]) { // Existing named stream
                the_stream = named_streams[name];
                the_stream.load(library[id]);
            }
            else { // Create a new named stream
                the_stream = new AudioStream();
                named_streams[name] = the_stream;
                named_streams[name].load(library[id]);
            }
        }
        else {
            $.each(transient_streams, function (idx, stream) {
                if (stream.is_ended()) { // Re-use existing transient stream
                    the_stream = stream;
                    stream.load(library[id]);
                    return false; // terminate 'each' loop
                }
                return true;
            });

            if (!the_stream) { // Create a new transient stream
                the_stream = new AudioStream();
                the_stram.load(library[id]);
                transient_streams.push(the_stream);
            }
        }

        return the_stream;
    };

    // Init:

    init();
};

var AudioStream = function() {
    // A single Audio() object and other data. Generally returned by
    // AudioManager functions like 'play' and 'load'.
    //
    // Usage:
    //
    // am = new AudioManager();
    //
    // as = am.play('music_two', 'music'); // AudioStream object
    // as.pause();
    // as.play();
    //
    // as2 = am.load('effect_one');
    // as2.play();
    //
    // // Access to underlying Audio object:
    // as2.audio_obj.volume = 50;

    // Private vars:

    var self = this;

    // Public vars:

    this.audio_obj = null;
    this.muted = false;

    // Private functions:

    var init = function () {
        // Object initialization code.  Should run only once.
        self.audio_obj = new Audio();
        self.orig_volume = self.audio_obj.volume;
    };

    // Public functions:
    this.play_obj = function (orig) {
        // Load and play given audio source.
        this.load(orig);
        this.play();
    };

    this.load = function (orig) {
        // Start loading given audio object, but do not play it yet.

        this.audio_obj.src = orig.src;
        this.audio_obj.load();
    };

    this.unmute = function () {
        this.audio_obj.volume = this.orig_volume;
    };

    this.mute = function () {
        this.orig_volume = this.audio_obj.volume;
        this.audio_obj.volume = 0;
    };

    this.is_ended = function () {
        return this.audio_obj.ended;
    };

    this.play = function() {
        this.audio_obj.play();
    };

    this.pause = function() {
        this.audio_obj.pause();
    };

    // Init:

    init();
};
