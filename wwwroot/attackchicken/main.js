(function () {
    "use strict";
    /**
     * ReInstall request animation frame
     */
    window.requestAnimationFrame = (function () {
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
        { name: "start_background" },
        { name: "start_button_history" },
        { name: "start_button_start" },
        { name: "start_message_box" },
        { name: "start_logo" },
        { name: "main_background" },
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
        { name: "history_background" },
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
        console.log(this.target, targetString);
    };
    ELEMENT.prototype.target = undefined;
    ELEMENT.prototype.type = "img";
    ELEMENT.prototype.click = function () { };
    ELEMENT.prototype.hide = function () {
        this.target.classList.add("hidden");
    };
    ELEMENT.prototype.show = function () {
        this.target.classList.remove("hidden");
    };
    /**
     * All actions click
     * @param {*} $elements : html elements
     */
    var CLICK = function ($elements) {
        for (var i = 0, l = $elements.length; i < l; i++) {
            if ($elements.target) {
                var e = $elements[i];
                var t = e.target;
                $elements[i].click = function (e) {
                    e.click();
                };
                $elements[i].target.addEventListener("click", $elements[i].click, false);
            }
        }
    };
    CLICK.prototype.enabledTouchSupport = false;
    CLICK.prototype.enabledMultiTouch = false;

    /**
     * animation common for element
     * @param {*} $element html elements
     */
    var ANIMATION = function ($element) {
        this.element = $element;
        var _this = this;
        this.size = {
            height: parseFloat(this.element.getAttribute("height")) || 0,
            width: parseFloat(this.element.getAttribute("width")) || 0
        }
        this.rootPosition = {
            x: parseFloat(this.element.getAttribute("x")) || 0,
            y: parseFloat(this.element.getAttribute("y")) || 0
        };
        this.centerPosition = {
            x: (this.rootPosition.x + this.size.width) / 2,
            y: (this.rootPosition.y + this.size.height) / 2
        };
        this.delaySecondsTime = 0;
        this.secondsTime = 0;
        this.rootScale = 1;
        this.rootRotate = 0;
        this.scaleFrame = 0;
        // setting move function
        this.moveValues = [];
        this.moveFramesCount = 0;
        this.framesCount = 0;
        this.timerFrames = 0;

        // setting rotate function
        this.rotateFrame = 0;
        this.rotateValues = [];
        this.settingRotate = function ($rotate, $secondstime) {
            $rotate = $rotate ? $rotate : 0;
            var distance = $rotate - this.rootRotate;
            this.rotateFrame = setFrameCount($secondstime);
        };
        this.settingScale = function ($scale, $secondstime) {
            $scale = $scale ? $scale : 1;
            var distance = $rotate - this.rootRotate;
            this.scaleFrame = setFrameCount($secondstime);
        };

        function runNow() {
        }
    };
    ANIMATION.prototype.settingMove = function ($x, $y) {
        $x = $x ? $x : 0;
        $x = $y ? $y : 0;
        var distanceWidth = $x - this.centerPosition.x;
        var distanceHeight = $y - this.centerPosition.y;
        return [distanceWidth, distanceHeight];
    }
    ANIMATION.prototype.setting = function ($x, $y) {
        var distances = this.settingMove($x, $y);
        this.delayFrame = setFrameCount(this.delaySecondsTime);
        this.framesCount = setFrameCount(this.secondsTime);
        this.timerFrames = this.framesCount;
        for (var i = 0; i < this.framesCount; i++) {
            this.moveValues.push({
                x: this.rootPosition.x + distances[0] * i / (this.framesCount - 1),
                y: this.rootPosition.y + distances[1] * i / (this.framesCount - 1),
            });
        }
    }; 
    ANIMATION.prototype.runAt = function (_frame) {
        var _toPosition = this.moveValues[_frame - 1];
        console.log(_toPosition);
        this.element.setAttribute("x", _toPosition.x);
        this.element.setAttribute("y", _toPosition.y);
    };

    function setFrameCount($secondstime) {
        $secondstime = $secondstime ? $secondstime * 1000 : 0;
        var tickTime = parseInt(1000 / fps, 10);
        var frameCount = parseInt($secondstime / tickTime, 10);
        return frameCount;
    }
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
                                console.log(_this.loadedImage, _this.loadedAudio);
                                if (_this.loadedImage && _this.loadedAudio) {
                                    process.hide();
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
     * Timeline for each item
     * time is seconds
     */
    var TIMELINE = function () { };
    TIMELINE.prototype.action = undefined;
    TIMELINE.prototype.time = 0;
    TIMELINE.prototype.frame = 0;
    TIMELINE.prototype.startTime = 0;
    TIMELINE.prototype.delayTime = 0;
    TIMELINE.prototype.hasLoop = false;
    TIMELINE.prototype.timelineChildren = [];

    /**
     * functions of game
     * click functions
     * load asset functions
     */

    function startGame() {
        hidePages();
        mainPage.show();
        runGame();
    }

    function gotoHistory() {
        hidePages();
        historyPage.show();
    }

    function endGame() {
        hidePages();
        resultPage.show();
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
    var historyBtn = new ELEMENT("#start_button");
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
    pageStart.show();
    new LOAD(images, "image");


    /**
     * Run game
     * RUn Timeline
     * uncomment if this is product
     * comment if this is develop mode
     * include attributes in game
    */
    // var fps = 25, isPause = false, isStop = false, done = false, hasLoop = false;
    // var frame = 0, startTime = 0, endTime = 0, pauseTime = 0, distancePauseTime = 0,
    //     currentTime = 0, currentFrame = 0, oldFrame = 0, time, secondsTime = 0;

    var mainTimeline = new TIMELINE();
    mainTimeline.delayTime = 3;
    mainTimeline.time = 10;

    /** 
     * ===================================
     * DEVELOP -- uncomment code below when test and debug
     * include fake attributes in game
     * ===================================
    */

    window.fps = 25;
    window.isPause = false; // has reset
    window.isStop = false; // has reset
    window.done = false; // has reset
    window.hasLoop = true;
    window.frame = 0;
    window.startTime = 0; // has reset
    window.endTime = 0; // has reset
    window.pauseTime = 0; // has reset
    window.distancePauseTime = 0; // has reset
    window.currentTime = 0; // has reset
    window.currentFrame = 0;
    window.oldFrame = 0; // has reset
    window.time = 0;
    window.secondsTime = 0;

    window.animation = new ANIMATION(document.getElementById("template_item"));
    window.animation.secondsTime = 10;
    window.animation.setting(200, 200);
    mainTimeline.animation = window.animation;
    //===================================

    var tick = 1000 / fps;
    function runGame() {
        if (mainTimeline.animation.timerFrames === 0) {
            if (!hasLoop) {
                isStop = true;
            } else {
                mainTimeline.animation.timerFrames = mainTimeline.animation.framesCount;
                startTime = 0;
                oldFrame = 0;
            }
        }
        if (!isPause && !isStop) {
            currentTime = Date.now();
            startTime = startTime === 0 ? currentTime : (startTime + distancePauseTime);
            time = currentTime - startTime;
            secondsTime = parseFloat(time / 1000, 10).toFixed(2);
            currentFrame = parseInt(time / tick, 10);
            if (oldFrame != currentFrame) {
                console.log(currentFrame);
                animation.timerFrames--;
                if (secondsTime > mainTimeline.delayTime) {
                    mainTimeline.animation.runAt(currentFrame);
                }
                oldFrame = currentFrame;
            }
            // if user pause game after user replay
            if (pauseTime !== 0) {
                pauseTime = 0;
                distancePauseTime = 0;
            }
        }
        // pause game keep position
        if (isPause) {
            if (pauseTime === 0) {
                pauseTime = currentTime;
            }
            distancePauseTime = currentTime - pauseTime;
            pauseGame();
        }
        // stop game or not
        if (!isStop) {
            requestAnimationFrame(runGame);
        }
    }
    function configRunGame() {
        isStop = false;
        isPause = false;
        resetGame();
    }

    function resetGame() {
        secondsTime = 0;
        startTime = 0;
        pauseTime = 0;
        distancePauseTime = 0;
        oldFrame = 0;
        animation.timerFrames = animation.framesCount;
    }

    function pauseGame() {

    }
    console.log("----RUN GAME----");
    configRunGame();
    runGame();
}());


