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
    var process = document.getElementById("process");
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
    var ANIMATION = function ($elements) {
        $acceleration = $acceleration || 1;
        var e = $elements;
        var startX = e.getAttribute("x");
        var startY = e.getAttribute("y");
    };
    ANIMATION.prototype.rootPosition = { x: 0, y: 0 };
    ANIMATION.prototype.rootScale = 1;
    ANIMATION.prototype.rootRotate = 0;
    ANIMATION.prototype.moveFrame = 0;
    ANIMATION.prototype.rotateFrame = 0;
    ANIMATION.prototype.scaleFrame = 0;
    ANIMATION.prototype.move = function ($x, $y, $secondstime, $delayTime) {
        $x = $x ? $x : 0;
        $x = $y ? $y : 0;
        var distanceWidth = $x - this.rootPosition.x;
        var distanceHeight = $y - this.rootPosition.y;
        this.moveFrame = setFrameCount($secondstime);
    };
    ANIMATION.prototype.rotate = function ($rotate, $secondstime, $delayTime) {
        $rotate = $rotate ? $rotate : 0;
        var distance = $rotate - this.rootRotate;
        this.rotateFrame = setFrameCount($secondstime);
    };
    ANIMATION.prototype.scale = function ($scale, $secondstime, $delayTime) {
        $scale = $scale ? $scale : 1;
        var distance = $rotate - this.rootRotate;
        this.scaleFrame = setFrameCount($secondstime);
    };

    function setFrameCount($secondstime){
        $secondstime = $secondstime ? $secondstime : 0;
        var tickTime = parseInt(1000 / fps, 10);
        var frameCount = parseInt($secondstime / tickTime, 10);
        return frameCount;
    }

    var LOAD = function ($filenames, $type) {
        if ($type === "audio") {

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
                        }
                    };
            };

            new load();
        }
    };

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

    CLICK([startBtn, historyBtn]);

    hidePages();
    pageStart.show();
    new LOAD(images, "image");


    /**
     * Run game
     * RUn Timeline
     */
    var fps = 25;
    var isPause = false;
    var isStop = false;
    var mainTimeline = new TIMELINE();
    mainTimeline.delayTime = 3;
    mainTimeline.time = 10;
    var frame = 0;
    var startTime = 0, currentTime = 0, currentFrame = 0;
    var tick = 1000 / fps;
    var time;
    var secondTime = 0;
    function runGame() {
        if (!isPause && !isStop && secondsTime >= mainTimeline.delayTime) {
            startTime = startTime === 0 ? Date.now() : startTime;
            currentTime = Date.now();
            time = currentTime - startTime;
            secondsTime = parseInt(time / 1000, 10);
            currentFrame = parseInt(time / tick, 10).toFixed(2);
            console.log(secondsTime);
            for (var i = 0; i < mainTimeline.timelineChildren.length; i++) {

            }

            if (hasLoop) {
                startTime = Date.now();
            }
        }
        // pause game keep position
        if (isPause) {
            pauseGame();
        }
        // stop game or not
        if (!isStop) {
            requestAnimationFrame(runGame);
        } else {
            resetGame();
        }
    }
    function resetGame() {
        secondTime = 0;
        time = 0;
        startTime = 0;
        currentTime = 0;
        currentFrame = 0;
    }

    function pauseGame() {

    }
    console.log("----RUN GAME----");
    runGame();
}());


