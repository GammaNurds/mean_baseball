'use strict';

/**
 * @ngdoc service
 * @name baseballAngularApp.sound
 * @description
 * # sound
 * Service in the baseballAngularApp.
 */
angular.module('baseballAngularApp')
  .service('$SoundService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var currentSound;

    // available sound paths
    var soundFolder = "../sounds/";
    var introSounds = ['intro.mp3'];
    var ballSounds = ['ball1.mp3', "klirr.mp3", "schei.mp3"];
    var strikeSounds = ["strike1.mp3", "strike2.mp3", "strike3.mp3", "strike4.mp3", "strike5.mp3", "strike6.mp3", "strike7.mp3", "ohawwagradsoo.mp3"];  // check if all included
    var hitSounds = ['neeiiin.mp3', 'fangen.mp3', 'na toll nicht mal die vorlage.mp3'];
    var homerunSounds = ["homerun.mp3", "homerun2.mp3", "homerun3.mp3", "homerun4.mp3"];
    var winSounds = ["respekt.mp3", "jagutgewonnen.wav"];
    
    // options
    Howler.mobileAutoEnable = true;
    Howler.iOSAutoEnable = true;

    function getTrackByAction(action) {
        var currentSounds;
        if (action === "intro") {
            currentSounds = introSounds;
        } else if (action === "strike") {
            currentSounds = strikeSounds;
        } /*else if (action === "ball") {
            currentSounds = ballSounds;
        }*/else if (action === "hit") {
            currentSounds = hitSounds;
        } else if (action === "homerun") {
            currentSounds = homerunSounds;
        } else if (action ==="win") {
            currentSounds = winSounds;
        } else {
            console.log("unknown action");
        }

        if (currentSounds) {
            // play random track
            var randomNumber = Math.floor(Math.random() * currentSounds.length);
            var selectedTrack = soundFolder + currentSounds[randomNumber];

            return selectedTrack;
        } else {
            return false;
        }
        
    }

    // replaces currentSound with newly created one
    this.playSound = function(action) {
        this.stopAllSounds(); // stop all currently playing sounds

        if (getTrackByAction(action)) {  // skip if action has no sounds
            var selectedTrack = getTrackByAction(action);

            // set current sound to the selected track
            currentSound = new Howl({
                urls: [selectedTrack],
                volume: 1.0,
            });
        
            currentSound.play();
        }
        
    };

    this.stopAllSounds = function() {
        if (currentSound) {
            currentSound.stop();
        }
    };

  });
