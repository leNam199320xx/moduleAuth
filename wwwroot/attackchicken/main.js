(function () {
    "use strict";


    /**
    * ReInstall request animation frame
    */
    var raf = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFame ||
            window.msRequestAnimationFrame ||
            function (callback, element) {
                return window.setTimeout(
                    function () {
                        callback(Date.now());
                    }, 1000 / 60);
            };
    })();
    /**
     * Set default config
     */
    var height = 600;
    var width = 360;
    var pages = ["history", "start", "main", "result"];
    var assetsLoaded = false;
    var images = [
        { name: "start_background", height: 600, width: 360 },
        { name: "start_button_history" },
        { name: "start_button_start" },
        { name: "start_message_box" },
        { name: "start_logo" },
        { name: "main_background", height: 600, width: 360 },
        { name: "main_egg_white" },
        { name: "main_egg_gold" },
        { name: "main_egg_orange" },
        { name: "main_egg_broken" },
        { name: "main_num_0" },
        { name: "main_num_1" },
        { name: "main_num_2" },
        { name: "main_num_3" },
        { name: "main_num_4" },
        { name: "main_num_5" },
        { name: "main_num_6" },
        { name: "main_num_7" },
        { name: "main_num_8" },
        { name: "main_num_9" },
        { name: "main_gift_box" },
        { name: "main_chicken_wing_up" },
        { name: "main_chicken_wing_down" },
        { name: "main_chicken_inclined_45deg" },
        { name: "main_chicken_inclined_45deg_wingup" },
        { name: "main_time_1" },
        { name: "main_time_2" },
        { name: "main_time_3" },
        { name: "main_hammer" },
        { name: "result_background", height: 600, width: 360 },
        { name: "history_background", height: 600, width: 360 },
        { name: "history_panel" },
        { name: "history_next_button" },
        { name: "history_back_button" },
        { name: "history_home_button" }
    ];

    /**
     * Load component
     */
    var container = document.getElementById("game_container");
    // var process = document.getElementById("process");
    var processPercent = document.getElementById("process_percent");
    var ns = "http://www.w3.org/2000/svg";
    if (typeof (container) !== "object") {
        container = document.createElementNS(ns, "svg");
        container.id = "game_container";
        container.classList.add("game_container");
    }

    container.setAttribute("viewBox", "0 0 " + width + " " + height);
    container.setAttribute("width", width);
    container.setAttribute("heght", height);
    /**
     * Common actions and animations
     */
    var ELEMENT = function (targetString) {
        if (targetString.indexOf("#") === 0) {
            this.target = document.getElementById(targetString.replace("#", ""));
        } else if (targetString.indexOf(".") === 0) {
            this.target = document.getElementsByClassName(targetString.replace(".", ""));
        } else {
            this.target = document.getElementsByTagName(targetString);
        }
    };
    ELEMENT.prototype.target = undefined;
    ELEMENT.prototype.type = "img";
    ELEMENT.prototype.click = function () { };
    ELEMENT.prototype.hide = function () {
        if (this.target) {
            this.target.classList.add("hidden");
        }
    };
    ELEMENT.prototype.show = function () {
        if (this.target) {
            this.target.classList.remove("hidden");
        }
    };
    /**
     * All actions click
     * @param {*} $elements : html elements
     */
    var CLICK = function ($elements) {
        for (var i = 0, l = $elements.length; i < l; i++) {
            var e = $elements[i];
            new addEvent(e);
        }
    };
    var addEvent = function ($element) {
        if ($element.target) {
            $element.target.addEventListener("click", function ($event) {
                $element.click();
                console.log("-->click", $element);
            }, false);
        }
    };
    CLICK.prototype.enabledTouchSupport = false;
    CLICK.prototype.enabledMultiTouch = false;

    /**
     * animation common for element
     * @param {*} $element html elements
     */
    var ANIMATION = function ($element, $config) {
        var _this = this;
        this.element = $element;
        this.config = {
            startPosition: {
                x: 0,
                y: 0
            },
            height: 30,
            width: 30,
            startRotate: 0,
            startScale: 1,
            delaySecondsTime: 0,
            fromCenter: false
        };
        this.config = $config || this.config;
        this.size = {
            height: this.config.height || 50,
            width: this.config.width || 50
        };
        this.rootPosition = this.config.startPosition ? this.config.startPosition : {
            x: 0,
            y: 0
        };

        this.centerPosition = {
            x: (this.rootPosition.x + this.size.width) / 2,
            y: (this.rootPosition.y + this.size.height) / 2
        };
        this.delaySecondsTime = this.config.delaySecondsTime || 0;
        this.delayFrame = 0;
        this.secondsTime = 0;
        this.rootScale = this.config.startScale || 1;
        this.rootRotate = this.config.startRotate || 0;
        // setting move function
        this.moveValues = [];
        this.framesCount = 0;
        this.timerFrames = 0;

        // setting rotate function
        this.rotateValues = [];

        // setting scale 
        this.scaleValues = [];
        this.tick = this.config.tick || 60;

        this.setFrameCount = function ($secondstime) {
            $secondstime = $secondstime ? $secondstime * 1000 : 0;
            var frameCount = Math.round($secondstime / this.tick);
            return frameCount;
        };

        this.setSize = function () {
            this.element.setAttribute("height", this.size.height);
            this.element.setAttribute("width", this.size.width);
            this.element.setAttribute("x", (-this.size.width / 2));
            this.element.setAttribute("y", (-this.size.height / 2));
        };
        this.children = [];

        this.onEndRound = undefined;
    };
    ANIMATION.prototype.currentFrame = 0;
    ANIMATION.prototype.audio = document.createElement("audio");
    ANIMATION.prototype.settingMove = function ($x, $y) {
        $x = $x ? $x : 0;
        $y = $y ? $y : 0;
        var distanceWidth = $x - this.rootPosition.x;
        var distanceHeight = $y - this.rootPosition.y;
        return [distanceWidth, distanceHeight];
    };
    ANIMATION.prototype.settingScale = function ($scale) {
        $scale = $scale ? $scale : 1;
        return $scale - this.rootScale;
    };
    ANIMATION.prototype.settingRotate = function ($rotate) {
        $rotate = $rotate ? $rotate : 0;
        return $rotate - this.rootRotate;
    };
    ANIMATION.prototype.setting = function ($x, $y, $scale, $round) {
        var distances = this.settingMove($x || 0, $y || 0);
        var distancesRotate = this.settingRotate($round * 360 || 0);
        var distancesScale = this.settingScale($scale || 1);
        this.delayFrame = this.setFrameCount(this.delaySecondsTime);
        this.framesCount = this.setFrameCount(this.secondsTime - this.delaySecondsTime);
        this.timerFrames = this.framesCount;
        for (var i = 0; i < this.framesCount; i++) {
            this.moveValues.push({
                x: this.rootPosition.x + distances[0] * i / (this.framesCount - 1),
                y: this.rootPosition.y + distances[1] * i / (this.framesCount - 1),
            });

            this.scaleValues.push(this.rootScale + distancesScale * i / (this.framesCount - 1));
            this.rotateValues.push(this.rootRotate + distancesRotate * i / (this.framesCount - 1));
        }
        console.log("-->delaySecondsTime", this.delaySecondsTime, this.secondsTime, this.framesCount);
        this.runAt(1);
    };
    ANIMATION.prototype.runAt = function (_frame) {
        // console.log("-->frame: ", _frame);
        if (this.element) {
            this.currentFrame = _frame ? _frame : 1;
            var _toPosition = this.moveValues[this.currentFrame - 1] || { x: 0, y: 0 };
            var _toScale = this.scaleValues[this.currentFrame - 1] || 1;
            var _toRotate = this.rotateValues[this.currentFrame - 1] || 0;

            this.element.setAttribute("transform",
                "translate(" + _toPosition.x + ", " + _toPosition.y + ")" + "scale(" + _toScale + ") " + "rotate(" + _toRotate + ")" + "translate(" + (-this.size.width / 2) + "," + (-this.size.height / 2) + " )");
        } else {
            return;
        }
    };
    ANIMATION.prototype.run = function (_frame) {
        this.currentFrame = _frame - this.delayFrame;
        var _f = this.currentFrame;
        this.runAt(_f);
        this.timerFrames = this.framesCount - _f;
        if (this.children.length > 0) {
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].run(_f);
            }
        }

        if (this.timerFrames === 1) {
            if (typeof (this.onEndRound) === "function") {
                this.onEndRound();
            }
        }
    };
    ANIMATION.prototype.children = [];
    /**
    * Timeline for each item
    * time is seconds
    */
    var TIMELINE = function () { };
    TIMELINE.prototype.action = undefined;
    TIMELINE.prototype.time = 0;
    TIMELINE.prototype.fps = 0;
    TIMELINE.prototype.frame = 0;
    TIMELINE.prototype.startTime = 0;
    TIMELINE.prototype.hasLoop = false;
    TIMELINE.prototype.tick = 1;
    TIMELINE.prototype.runGame = function () {
        var _this = this;
        this.currentTime = Date.now();
        if (!this.isPause && !this.isStop) {
            this.startTime = this.startTime === 0 ? this.currentTime : (this.startTime + this.distancePauseTime);
            this.time = this.currentTime - this.startTime;
            this.secondsTime = parseFloat(this.time / 1000, 10).toFixed(2);
            this.currentFrame = Math.ceil(this.time / this.tick, 10);
            if (this.oldFrame != this.currentFrame) {
                console.log("-->real time", this.time, this.animation.secondsTime * 1000, this.animation.timerFrames);
                if (this.secondsTime >= this.animation.delaySecondsTime && this.currentFrame <= this.animation.framesCount) {
                    // console.log("-->current frame: ", this.currentFrame, this.animation.timerFrames, this.animation.framesCount);
                    this.animation.run(this.currentFrame);
                }
                this.oldFrame = this.currentFrame;
            }
            // if user replay game
            if (this.pauseTime !== 0) {
                this.pauseTime = 0;
                this.distancePauseTime = 0;
            }
        }
        if (this.animation.timerFrames <= 0) {
            if (!this.hasLoop) {
                this.isStop = true;
            } else {
                this.animation.timerFrames = this.animation.framesCount;
                this.startTime = 0;
                this.oldFrame = 0;
            }
        }
        // pause game keep position
        if (this.isPause) {
            this.pause();
        }
        // stop game or not
        if (!this.isStop) {
            raf(function () {
                _this.runGame();
            });
        }
    };
    TIMELINE.prototype.pause = function () {
        if (this.pauseTime === 0) {
            this.pauseTime = this.currentTime;
        } else {
            this.distancePauseTime = this.currentTime - this.pauseTime;
            // console.log("->pause time: ", this.pauseTime, this.currentTime);
            // console.log("->distance pause time: ", this.distancePauseTime);
        }
    };
    TIMELINE.prototype.configRunGame = function () {
        this.isStop = false;
        this.isPause = false;
        this.resetGame();
    };
    TIMELINE.prototype.resetGame = function () {
        this.secondsTime = 0;
        this.startTime = 0;
        this.pauseTime = 0;
        this.distancePauseTime = 0;
        this.oldFrame = 0;
        this.animation.timerFrames = this.animation.framesCount;
    };
    /**
     * @param {*} $filenames file names 
     * @param {*} $type type of file
     */
    var LOAD = function ($filenames, $type) {
        var _this = this;
        _this.loadedAudio = true;
        if ($type === "audio") {
            if (_this.loadedImage && _this.loadedAudio) {
                process.hide();
            }
        } else if ($type === "image") {
            var loadingImages = [];
            for (var i = 0, l = $filenames.length; i < l; i++) {
                var img = new Image();
                img.srcString = "assets/page_" + $filenames[i].name.split("_")[0] + "/" + $filenames[i].name + (($filenames[i].ext) || ".png");
                loadingImages.push(img);
            }
            var loadingCount = loadingImages.length;
            var loadedCount = 0;
            var load = function () {
                loadingImages[loadedCount].src = loadingImages[loadedCount].srcString;
                loadingImages[loadedCount].onload =
                    loadingImages[loadedCount].onerror = function () {
                        loadedCount++;
                        if (loadedCount < loadingCount) {
                            var _widthPercent = (((loadedCount + 1) / loadingCount) * 280);
                            processPercent.setAttribute("width", _widthPercent);
                            assetsLoaded = true;
                            new load();
                        } else {
                            // hide process bar when load images done
                            if (process) {
                                _this.loadedImage = true;
                                if (_this.loadedImage && _this.loadedAudio) {
                                    process.hide();
                                    pageStart.show();
                                }
                            }
                        }
                    };
            };

            new load();
        }
    };
    LOAD.prototype.loadedAudio = false;
    LOAD.prototype.loadedImage = false;

    /**
     * functions of game
     * click functions
     * load asset functions
     */

    function startGame() {
        hidePages();
        pageMain.show();
        // runGame();
        console.log("-->start game");
        mainTimeline.configRunGame();
        mainTimeline.runGame();
    }

    function gotoHistory() {
        hidePages();
        pageHistory.show();
    }

    function endGame() {
        hidePages();
        pageResult.show();
    }

    function hidePages() {
        pageStart.hide();
        pageMain.hide();
        pageHistory.hide();
        pageResult.hide();
    }

    var startBtn = new ELEMENT("#start_button");
    startBtn.click = function (target) {
        startGame();
    };
    var historyBtn = new ELEMENT("#history_button");
    historyBtn.click = function (target) {
        gotoHistory();
    };
    var pageStart = new ELEMENT("#page_start");
    var pageMain = new ELEMENT("#page_main");
    var pageHistory = new ELEMENT("#page_history");
    var pageResult = new ELEMENT("#page_result");
    var process = new ELEMENT("#process");

    CLICK([startBtn, historyBtn]);

    hidePages();
    // pageStart.show();
    new LOAD(images, "image");

    var mainTimeline = new TIMELINE();

    window.game = mainTimeline; // if this is developer mode

    mainTimeline.fps = 60;
    mainTimeline.isPause = false; // has reset
    mainTimeline.isStop = false; // has reset
    mainTimeline.isDone = false; // has reset
    mainTimeline.hasLoop = false;
    mainTimeline.frame = 0;
    mainTimeline.startTime = 0; // has reset
    mainTimeline.endTime = 0; // has reset
    mainTimeline.pauseTime = 0; // has reset
    mainTimeline.distancePauseTime = 0; // has reset
    mainTimeline.currentTime = 0; // has reset
    mainTimeline.currentFrame = 0;
    mainTimeline.oldFrame = 0; // has reset
    mainTimeline.time = 0;
    mainTimeline.secondsTime = 0;
    mainTimeline.tick = 1000 / mainTimeline.fps;


    var timer = new ANIMATION();
    timer.secondsTime = 3;
    timer.tick = mainTimeline.tick;
    timer.setting();
    timer.onEndRound = function () {
        timer = null;
        var element = document.getElementById("template_item");
        mainTimeline.animation = new ANIMATION(element);
        mainTimeline.animation.secondsTime = 5;
        mainTimeline.animation.tick = mainTimeline.tick;
        mainTimeline.animation.setting(200, 200, 0, 5);

        var element2 = document.getElementById("template_item2");
        var anim2 = new ANIMATION(element2);
        anim2.delaySecondsTime = 3;
        anim2.secondsTime = 5;
        anim2.tick = mainTimeline.tick;
        anim2.setting(200, 300, 2, 5);
        mainTimeline.animation.children.push(anim2);


        var element3 = document.getElementById("template_item3");
        var anim3 = new ANIMATION(element3);
        anim3.delaySecondsTime = 2;
        anim3.secondsTime = 5;
        anim3.tick = mainTimeline.tick;
        anim3.setting(300, 200, 3, 5);
        mainTimeline.animation.children.push(anim3);
        mainTimeline.configRunGame();
        mainTimeline.runGame();
    };
    mainTimeline.animation = timer;


    // when browser is not active
    document.onvisibilitychange = function ($event) {
        console.log("-->stop browser: ", document.hidden);
        mainTimeline.currentTime = Date.now();
        mainTimeline.pause();

        if (document.hidden) {
            mainTimeline.isPause = true;
        } else {
            mainTimeline.isPause = false;
        }
    };
}());


