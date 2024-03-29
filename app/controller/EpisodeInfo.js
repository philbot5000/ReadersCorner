/*
 * File: app/controller/EpisodeInfo.js
 *
 * This file was generated by Sencha Architect version 2.2.3.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.2.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('RC.controller.EpisodeInfo', {
    extend: 'Ext.app.Controller',

    config: {
        control: {
            "panel#episodeInfo": {
                show: 'onEpisodeInfoShow'
            },
            "button#playButton": {
                tap: 'onPlayButtonTap'
            },
            "button#closeButton": {
                tap: 'onCloseButtonTap'
            }
        }
    },

    onEpisodeInfoShow: function(component, eOpts) {
        component.on('hide', function() {
            component.destroy();

        });
    },

    onPlayButtonTap: function(button, e, eOpts) {
        var playerControls = Ext.ComponentQuery.query('#playerControls')[0],
            episodeInfo = Ext.ComponentQuery.query('#episodeInfo')[0],
            main = Ext.getCmp('main');

        if(playerControls.isHidden()) {
            playerControls.show();

        }

        if(button.getText() === 'Play') {

            if(main.episode !== button.episode) {
                if(typeof main.episode !== 'undefined') {
                    main.sound.pause();
                }
                main.episode = button.episode;
                this.createAudio(button.episode);
            } else {
                main.episode = button.episode;
                this.createAudio(button.episode);

            }
        }

        main.sound.play();
        episodeInfo.hide();
    },

    onCloseButtonTap: function(button, e, eOpts) {
        var episodeInfo = Ext.ComponentQuery.query('#episodeInfo')[0];

        episodeInfo.hide();
    },

    createAudio: function(episode) {
        var main = Ext.getCmp('main'),
            playButton = Ext.ComponentQuery.query('#playPause')[0],
            me = this;

        playButton.setHtml('<div style="margin-top: 18px; margin-left: auto; margin-right: auto;" class="x-loading-spinner"><span class="x-loading-top"></span><span class="x-loading-right"></span><span class="x-loading-bottom"></span><span class="x-loading-left"></span></div>');


        main.sound = new Audio(episode.Podcast);
        this.setAudioListeners(main.sound);

        main.sound.play();
        /*
        main.sound = soundManager.createSound({
        id: 'episode',
        url: episode.mp3_url,
        whileplaying: function() {

        me.setSliderValue(this.position, this.duration);
        me.setTimeRemaining(this.duration, this.position);
        me.setTimeElapsed(this.position);
        },
        onplay: function() {
        playButton.setHtml('<img src="img/pause2.png" width="100%" />');
        },
        onpause: function() {
        playButton.setHtml('<img src="img/play2.png" width="100%" />');

        }
        });
        */
    },

    setAudioListeners: function(sound) {
        var playButton = Ext.ComponentQuery.query('#playPause')[0],
            me = this;

        sound.addEventListener('playing', function(){
            playButton.setHtml('<img src="img/pause2.png" width="100%" />');

        });
        sound.addEventListener('pause', function(){
            playButton.setHtml('<img src="img/play2.png" width="100%" />');

        });

        sound.addEventListener('timeupdate', me.setTimeElapsed, false);
        sound.addEventListener('timeupdate', me.setTimeRemaining, false);
        sound.addEventListener('timeupdate', RC.app.setSliderValue, false);
        sound.addEventListener('progress', me.setPercentLoaded, false);
    },

    setTimeElapsed: function(e, sound) {
        var timeElapsed = Ext.ComponentQuery.query('#timeElapsed')[0],
            main = Ext.getCmp('main'),
            position = main.sound.currentTime;

        var s = Math.floor(position % 60),
            seconds = s < 10 ? "0"+s : s;

        var m = Math.floor((position / 60) % 60),
            minutes = m < 10 ? "0"+m : m;

        timeElapsed.setHtml(minutes+':'+seconds);
    },

    setTimeRemaining: function() {
        var timeRemaining = Ext.ComponentQuery.query('#timeRemaining')[0],
            main = Ext.getCmp('main'),
            position = main.sound.currentTime,
            duration = main.sound.duration,
            timeLeft = duration - position;


        var s = Math.floor(timeLeft % 60) || 0,
            seconds = s < 10 ? "0"+s : s;

        var m = Math.floor((timeLeft / 60) % 60) || 0,
            minutes = m < 10 ? "0"+m : m;

        timeRemaining.setHtml('-'+minutes+':'+seconds);
    },

    setPercentLoaded: function(bytesLoaded, bytesTotal) {
        var val = (100 / bytesTotal) * bytesLoaded || 0;

        console.log(bytesTotal);
    }

});