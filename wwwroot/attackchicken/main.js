(function () {
    "use strict";

    /**
     * Set default config
     */
    var height = 600;
    var width = 360;
    var pages = ["history", "start", "main", "result"];
    var assetsLoaded = false;
    var maxItems = 6;
    var images = [{
        index: 0,
        name: "start_background",
        height: 600,
        width: 360
    }, {
        index: 1,
        name: "start_button_history"
    }, {
        index: 2,
        name: "start_button_start"
    }, {
        index: 3,
        name: "start_message_box"
    }, {
        index: 4,
        name: "start_logo"
    }, {
        index: 5,
        name: "main_background",
        height: 600,
        width: 360
    }, {
        index: 6,
        name: "main_egg_white"
    }, {
        index: 7,
        name: "main_egg_gold"
    }, {
        index: 8,
        name: "main_egg_orange"
    }, {
        index: 9,
        name: "main_egg_broken"
    }, {
        index: 10,
        name: "main_num_0"
    }, {
        index: 11,
        name: "main_num_1"
    }, {
        index: 12,
        name: "main_num_2"
    }, {
        index: 13,
        name: "main_num_3"
    }, {
        index: 14,
        name: "main_num_4"
    }, {
        index: 15,
        name: "main_num_5"
    }, {
        index: 16,
        name: "main_num_6"
    }, {
        index: 17,
        name: "main_num_7"
    }, {
        index: 18,
        name: "main_num_8"
    }, {
        index: 19,
        name: "main_num_9"
    }, {
        index: 20,
        name: "main_gift_box",
        height: 60,
        width: 60
    }, {
        index: 21,
        name: "main_chicken_wing_up",
        height: 100,
        width: 100
    }, {
        index: 22,
        name: "main_chicken_wing_down",
        height: 100,
        width: 100
    }, {
        index: 23,
        name: "main_chicken_inclined_45deg",
        height: 100,
        width: 100
    }, {
        index: 24,
        name: "main_chicken_inclined_45deg_wingup",
        height: 100,
        width: 100
    }, {
        index: 25,
        name: "main_time_1"
    }, {
        index: 26,
        name: "main_time_2"
    }, {
        index: 27,
        name: "main_time_3"
    }, {
        index: 28,
        name: "main_hammer"
    }, {
        index: 29,
        name: "result_background",
        height: 600,
        width: 360
    }, {
        index: 30,
        name: "history_background",
        height: 600,
        width: 360
    }, {
        index: 31,
        name: "history_panel"
    }, {
        index: 32,
        name: "history_next_button"
    }, {
        index: 33,
        name: "history_back_button"
    }, {
        index: 34,
        name: "history_home_button"
    }];

    var chickenValues = [{ value: 5 }, { value: 10 }, { value: 50 }, { value: 100 }, { value: 0, name: "special" }, { value: -1, name: "broken" }];
    
    /**
     * Load component
     */
    var container = new ELEMENT("#game_container");
    // var process = document.getElementById("process");
    var processPercent = document.getElementById("process_percent");
    var ns = "http://www.w3.org/2000/svg";
    if (typeof (container.target) !== "object") {
        container.target = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        container.target.id = "game_container";
        container.target.classList.add("game_container");
    }

    container.target.setAttribute("viewBox", "0 0 " + width + " " + height);
    container.target.setAttribute("width", width);
    container.target.setAttribute("heght", height);

    /**
     * functions of game
     * click functions
     * load asset functions
     */

    function startGame() {
        pageStart.hide();
        pageMain.show();
        mainTimeline.configRunGame();
        mainTimeline.runGame();
    }

    function gotoHistory() {
        pageStart.hide();
        pageResult.hide();
        pageHistory.show();
    }

    function endGame() {
        pageMain.hide();
        pageResult.show();
    }

    function hidePages() {
        pageMain.hide();
        pageHistory.hide();
        pageResult.hide();
    }

    var startBtn = new ELEMENT("#start_button");
    startBtn.target.addEventListener("click", startGame, false);
    var historyBtn = new ELEMENT("#history_button");
    historyBtn.target.addEventListener("click", gotoHistory, false);

    var pageStart = new ELEMENT("#page_start");
    var pageMain = new ELEMENT("#page_main");
    var pageHistory = new ELEMENT("#page_history");
    var pageResult = new ELEMENT("#page_result");
    var process = new ELEMENT("#process");


    document.body.addEventListener("mousedown", function ($event) { });

    hidePages();
    // pageStart.show();
    var loadedAssets = new LOAD(images, "image");
    loadedAssets.processPercentElement = processPercent;
    loadedAssets.processElement = process;
    loadedAssets.onLoaded = function ($event) {
        pageStart.show();
    };
    loadedAssets.run();
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

    // when browser is not active
    document.onvisibilitychange = function ($event) {
        if (mainTimeline.isStop) {
            return;
        }
        mainTimeline.currentTime = Date.now();
        mainTimeline.pause();
        if (document.hidden) {
            mainTimeline.isPause = true;
        } else {
            mainTimeline.isPause = false;
        }
    };
    var gameIntro = new ELEMENT("#game_intro");
    var gamePlay = new ELEMENT("#game_play");

    window.gamePlay = gamePlay;
    window.gameIntro = gameIntro;
    loadedAssets.onEnd = function () {
        var dataChicken = loadedAssets.images[22];
        var type = "image";
        var center = {
            x: width / 2,
            y: height / 2
        };
        var viewbox = {
            x: 0,
            y: 0,
            width: width,
            height: height
        };

        var elementTimerStart = new ELEMENT("#large_timer");
        var timer = new ANIMATION();
        timer.tick = mainTimeline.tick;
        timer.goto({
            time: 1
        });
        timer.onOutput = function () {
            elementTimerStart.target.textContent = timer.timerFrames - 1;
        };

        var anim = new ANIMATION();
        anim.tick = mainTimeline.tick;
        anim.setting();
        anim.onOutput = function () { };
        anim.goto({
            time: 10
        });
        var corners = randomArrayNoLoop(maxItems);
        var step = 30;
        var row = 0;
        var col = 0;
        var isStarting = false;
        var selectedValue;
        var attack = function (e) {
            if (isStarting) {
                mainTimeline.isStop = true;
                selectedValue = e.value;
            }
        };
        chickenValues = chickenValues.shuffle();
        for (var i = 0; i < maxItems; i++) {
            row = Math.floor(i / 3);
            col = i - row * 3;
            var chicken_group = new CHICKEN_GROUP("chicken_" + (i + 1), chickenValues[i]);
            chicken_group.element.createSvgElement("g");
            chicken_group.chicken.staticElement.createSvgElement(type, dataChicken);
            chicken_group.chicken.moveElement.createSvgElement(type, dataChicken);
            chicken_group.chicken.endElement.createSvgElement(type, dataChicken);
            chicken_group.animation.config.x = 80 + col * 100;
            chicken_group.animation.config.y = center.y - 100 + row * 160;
            chicken_group.animation.viewbox = viewbox;
            chicken_group.addEvent(attack);
            chicken_group.setting(mainTimeline.tick);
            gamePlay.add(chicken_group.element);
            anim.children.push(chicken_group.animation);
        }
        mainTimeline.animation = timer;
        function endGame($event) {
            isStarting = false;

        }
        timer.onEndRound = function () {
            for (var i = 0; i < maxItems; i++) {
                anim.children[i].reset();
                anim.children[i].config.x = center.x;
                anim.children[i].config.y = center.y;
                anim.children[i].goto({
                    corner: corners[i] * step, // deg
                    speed: 300, // pixel/s
                    time: 10
                });
            }
            mainTimeline.animation = anim;
            mainTimeline.configRunGame();
            mainTimeline.runGame();
            anim.onEndRound = endGame;
            isStarting = true;
        };
    };
}());