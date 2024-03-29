/*
 * File: app/controller/Player.js
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

Ext.define('RC.controller.Player', {
    extend: 'Ext.app.Controller',

    config: {
        control: {
            "container#playPause": {
                initialize: 'onPlayPauseInitialize'
            },
            "sliderfield#episodeSlider": {
                drag: 'onEpisodeSliderDrag',
                dragend: 'onEpisodeSliderDragEnd'
            }
        }
    },

    onPlayPauseInitialize: function(component, eOpts) {
        var main = Ext.getCmp('main');

        component.element.on('touchend', function() {


            if(main.sound.paused) {

                main.sound.play();

            } else {

                main.sound.pause();
            }


        });
    },

    onEpisodeSliderDrag: function(sliderfield, sl, thumb, e, eOpts) {
        var sound = Ext.getCmp('main').sound;

        sound.removeEventListener('timeupdate', RC.app.setSliderValue, false);

        newValue = sliderfield.getValue() / (100 / sound.duration);

        sound.currentTime = newValue;

    },

    onEpisodeSliderDragEnd: function(sliderfield, sl, thumb, value, e, eOpts) {
        // reattach listener that sets slider value whileplaying...
        var sound = Ext.getCmp('main').sound;

        setTimeout(function() {
            sound.addEventListener('timeupdate', RC.app.setSliderValue, false);
        }, 1000);
    }

});