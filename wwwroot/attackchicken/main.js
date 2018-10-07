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
        { index: 0, name: "start_background", height: 600, width: 360 },
        { index: 1, name: "start_button_history" },
        { index: 2, name: "start_button_start" },
        { index: 3, name: "start_message_box" },
        { index: 4, name: "start_logo" },
        { index: 5, name: "main_background", height: 600, width: 360 },
        { index: 6, name: "main_egg_white" },
        { index: 7, name: "main_egg_gold" },
        { index: 8, name: "main_egg_orange" },
        { index: 9, name: "main_egg_broken" },
        { index: 10, name: "main_num_0" },
        { index: 11, name: "main_num_1" },
        { index: 12, name: "main_num_2" },
        { index: 13, name: "main_num_3" },
        { index: 14, name: "main_num_4" },
        { index: 15, name: "main_num_5" },
        { index: 16, name: "main_num_6" },
        { index: 17, name: "main_num_7" },
        { index: 18, name: "main_num_8" },
        { index: 19, name: "main_num_9" },
        { index: 20, name: "main_gift_box", height: 60, width: 60 },
        { index: 21, name: "main_chicken_wing_up", height: 100, width: 100 },
        { index: 22, name: "main_chicken_wing_down", height: 100, width: 100 },
        { index: 23, name: "main_chicken_inclined_45deg", height: 100, width: 100 },
        { index: 24, name: "main_chicken_inclined_45deg_wingup", height: 100, width: 100 },
        { index: 25, name: "main_time_1" },
        { index: 26, name: "main_time_2" },
        { index: 27, name: "main_time_3" },
        { index: 28, name: "main_hammer" },
        { index: 29, name: "result_background", height: 600, width: 360 },
        { index: 30, name: "history_background", height: 600, width: 360 },
        { index: 31, name: "history_panel" },
        { index: 32, name: "history_next_button" },
        { index: 33, name: "history_back_button" },
        { index: 34, name: "history_home_button" }
    ];

    /**
     * Load component
     */
    var container = document.getElementById("game_container");
    // var process = document.getElementById("process");
    var processPercent = document.getElementById("process_percent");
    var ns = "http://www.w3.org/2000/svg";
    if (typeof (container) !== "object") {
        container = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        container.id = "game_container";
        container.classList.add("game_container");
    }

    container.setAttribute("viewBox", "0 0 " + width + " " + height);
    container.setAttribute("width", width);
    container.setAttribute("heght", height);
    /**
     * Common actions and animations
     */
    var EVENT = function () {
        this.type = "";
        this.attack = undefined;
    };
    var ELEMENT = function (targetString) {
        var _this = this;
        if (targetString) {
            if (targetString.indexOf("#") === 0) {
                this.target = document.getElementById(targetString.replace("#", ""));
            } else if (targetString.indexOf(".") === 0) {
                this.target = document.getElementsByClassName(targetString.replace(".", ""));
            } else {
                this.target = document.getElementsByTagName(targetString);
            }
        } else {
            this.target = document.createElementNS("http://www.w3.org/2000/svg", "g");
        }
        this.children = [];
        this.add = function ($newElement) {
            this.target.appendChild($newElement.target);
            this.children.push($newElement);
        };
        this.addEvent = function ($config) {
            $config = $config || new EVENT();
            var isAdd = true;
            for (var i = 0; i < this.events.length; i++) {
                if (this.events[i].type === $config.type) {
                    isAdd = false;
                    break;
                }
            }
            if (isAdd) {
                this.events.push($config);
                this.target.addEventListener($config.type, function ($event) {
                    $event.yourElement = _this;
                    for (var i = 0; i < _this.events.length; i++) {
                        if (_this.events[i].type === $config.type) {
                            _this.events[i].attack(_this);
                            break;
                        }
                    }
                }, false);
            }
        };
        this.events = [];
        this.hide = function () {
            if (this.target) {
                this.target.classList.add("hidden");
            }
        };
        this.show = function () {
            if (this.target) {
                this.target.classList.remove("hidden");
            }
        };
        this.config = {};
        this.parent = {};
        this.type = "g";
        this.width = 0;
        this.height = 0;
        this.createSvgElement = function ($type, $config, $parent) {
            this.config = $config || this.config;
            this.height = this.config.height || 0;
            this.width = this.config.width || 0;
            this.parent = $parent;
            this.type = $type;
            this.target = document.createElementNS("http://www.w3.org/2000/svg", this.type || "g");
            this.target.setAttribute("x", this.config.x || 0);
            this.target.setAttribute("y", this.config.y || 0);
            this.target.setAttribute("height", this.height);
            this.target.setAttribute("width", this.width);
            var time = Date.now();
            this.target.id = "id_" + time;
            if (this.config.link) {
                this.target.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.config.link);
            }
            if (this.parent) {
                this.parent.appendChild(this.target);
            }
        };
    };

    /**
     * animation common for element
     * @param {*} $element html elements
     */
    var ANIMATION = function ($element, $config) {
        var _this = this;
        this.element = $element;
        $config = $config || {};
        this.config = {
            x: $config.x || 0,
            y: $config.y || 0,
            scale: $config.scale || 1,
            rotate: $config.rotate || 0,
            height: $config.height || 50,
            width: $config.width || 50,
            delay: 0,
            time: 0
        };
        this.centerPosition = {
            x: (this.config.x + this.config.width) / 2,
            y: (this.config.y + this.config.height) / 2
        };
        this.delayFrame = 0;
        this.secondsTime = 0;
        // setting move function
        this.values = [];
        this.framesCount = 0;
        this.timerFrames = 0;

        this.tick = this.config.tick || 60;

        this.setFrameCount = function ($secondstime) {
            $secondstime = $secondstime ? $secondstime * 1000 : 0;
            var frameCount = Math.round($secondstime / this.tick);
            return frameCount;
        };
        this.children = [];

        this.onEndRound = undefined;
        this.onOutput = undefined;
        // only read
        this._configs = [];
    };
    ANIMATION.prototype.currentFrame = 0;
    ANIMATION.prototype.audio = document.createElement("audio");
    ANIMATION.prototype.settingMove = function ($x, $y) {
        var lastConfig = this.values[this.values.length - 1] || this.config;
        $x = $x ? $x : 0;
        $y = $y ? $y : 0;
        var distanceWidth = $x - lastConfig.x;
        var distanceHeight = $y - lastConfig.y;
        return [distanceWidth, distanceHeight];
    };
    ANIMATION.prototype.settingScale = function ($scale) {
        var lastConfig = this.values[this.values.length - 1] || this.config;
        $scale = $scale ? $scale : 1;
        return $scale - lastConfig.scale;
    };
    ANIMATION.prototype.settingRotate = function ($rotate) {
        var lastConfig = this.values[this.values.length - 1] || this.config;
        $rotate = $rotate ? $rotate : 0;
        return $rotate - lastConfig.rotate;
    };
    ANIMATION.prototype.goto = function ($options) {
        console.log('last', this.values[this.values.length - 1]);
        var lastConfig = this.values[this.values.length - 1] || this.config;
        this._configs.push({
            x: lastConfig.x || 0,
            y: lastConfig.y || 0,
            scale: lastConfig.scale || 1,
            rotate: lastConfig.rotate || 0,
            delay: $options.delay || 0,
            time: $options.time || 0
        });
        var distances = this.settingMove($options.x || lastConfig.x, $options.y || lastConfig.y);
        var distancesRotate = this.settingRotate($options.rotate * 360 || lastConfig.rotate * 360);
        var distancesScale = this.settingScale($options.scale || lastConfig.scale);
        var delayFrame = this.setFrameCount($options.delay || 0);
        var framesCount = this.setFrameCount($options.time || 1);
        for (var i = 0; i < framesCount; i++) {
            this.values.push({
                x: lastConfig.x + distances[0] * i / (framesCount - 1),
                y: lastConfig.y + distances[1] * i / (framesCount - 1),
                scale: lastConfig.scale + distancesScale * i / (framesCount - 1) || lastConfig.scale,
                rotate: lastConfig.rotate + distancesRotate * i / (framesCount - 1) || lastConfig.rotate,
                delayFrame: delayFrame
            });
        }
        this.framesCount += framesCount;
        this.timerFrames = this.framesCount;
        console.log(this);
        return this;
    };
    ANIMATION.prototype.setting = function ($options) {
        this.runAt(0);
    };
    ANIMATION.prototype.runAt = function (_frame) {
        if (this.element) {
            this.currentFrame = _frame ? _frame : 1;
            var _toPosition = this.values[this.currentFrame - 1] || this.config;
            this.element.setAttribute("transform",
                "translate(" + _toPosition.x + ", " + _toPosition.y + ")" + "scale(" + _toPosition.scale + ") " + "rotate(" + _toPosition.rotate + ")" + "translate(" + (-this.config.width / 2) + "," + (-this.config.height / 2) + " )");
        }
        var outresult = typeof (this.onOutput) == "function" ? this.onOutput() : undefined;
        if (!this.element) {
            return;
        }
    };
    ANIMATION.prototype.run = function (_frame) {
        console.log("timer: ", this.timerFrames);
        if (this.timerFrames < 1) {
            return;
        }
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
    TIMELINE.prototype.animation = undefined;
    TIMELINE.prototype.runGame = function () {
        var _this = this;
        this.currentTime = Date.now();
        if (!this.isPause && !this.isStop) {
            this.startTime = this.startTime === 0 ? this.currentTime : (this.startTime + this.distancePauseTime);
            this.time = this.currentTime - this.startTime;
            this.currentFrame = Math.ceil(this.time / this.tick, 10);
            if (this.oldFrame != this.currentFrame || this.currentFrame == 0) {
                if (this.animation && this.currentFrame <= this.animation.framesCount) {
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
        if (this.animation && this.animation.timerFrames <= 0) {
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
        }
    };
    TIMELINE.prototype.configRunGame = function () {
        this.isStop = false;
        this.isPause = false;
        this.resetGame();
    };
    TIMELINE.prototype.resetGame = function () {
        this.startTime = 0;
        this.pauseTime = 0;
        this.distancePauseTime = 0;
        this.oldFrame = 0;
        if (this.animation) {
            this.animation.timerFrames = this.animation.framesCount;
        }
    };
    TIMELINE.prototype.assets = [];
    /**
     * @param {*} $filenames file names 
     * @param {*} $type type of file
     */
    var LOAD = function ($filenames, $type) {
        var _this = this;
        this.loadedAudio = true;
        this.loadedImage = false;
        this.onEnd = undefined;
        this.images = [];
        this.audios = [];
        var loadedImageAssets = [];
        var loadedAudioAssets = [];
        this.loaded = false;
        if ($type === "audio") {
            if (_this.loadedImage && _this.loadedAudio) {
                if (_this.onEnd && !_this.loaded) {
                    _this.images = loadedImageAssets;
                    _this.audios = loadedAudioAssets;
                    _this.loaded = true;
                    _this.onEnd();
                }
                process.hide();
            }
        } else if ($type === "image") {
            var loadingImages = [];
            for (var i = 0, l = $filenames.length; i < l; i++) {
                var img = new Image();
                img.srcString = "assets/page_" + $filenames[i].name.split("_")[0] + "/" + $filenames[i].name + (($filenames[i].ext) || ".png");
                loadingImages.push(img);

                var svgImg = {
                    height: $filenames[i].height || img.height,
                    width: $filenames[i].width || img.width,
                    link: img.srcString
                };
                loadedImageAssets.push(svgImg);
            }
            var loadingCount = loadingImages.length;
            var loadedCount = 0;
            var loadImages = function () {
                loadingImages[loadedCount].src = loadingImages[loadedCount].srcString;
                loadingImages[loadedCount].onload = loadingImages[loadedCount].onerror = function () {
                    loadedCount++;
                    if (loadedCount < loadingCount) {
                        var _widthPercent = (((loadedCount + 1) / loadingCount) * 280);
                        processPercent.setAttribute("width", _widthPercent);
                        assetsLoaded = true;
                        new loadImages();
                    } else {
                        // hide process bar when load images done
                        if (process) {
                            _this.loadedImage = true;
                            if (_this.loadedImage && _this.loadedAudio && !_this.loaded) {
                                if (_this.onEnd) {
                                    _this.images = loadedImageAssets;
                                    _this.audios = loadedAudioAssets;
                                    _this.loaded = true;
                                    _this.onEnd();
                                }
                                process.hide();
                                pageStart.show();
                            }
                        }
                    }
                };
            };
            new loadImages();
        }
    };

    /**
     * functions of game
     * click functions
     * load asset functions
     */

    function startGame() {
        hidePages();
        pageMain.show();
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
    startBtn.addEvent({
        type: "click",
        attack: function ($event) {
            console.log($event);
            startGame();
        }
    });
    var historyBtn = new ELEMENT("#history_button");
    historyBtn.addEvent({
        type: "click",
        attack: function ($event) {
            console.log($event);
            gotoHistory();
        }
    });
    var pageStart = new ELEMENT("#page_start");
    var pageMain = new ELEMENT("#page_main");
    var pageHistory = new ELEMENT("#page_history");
    var pageResult = new ELEMENT("#page_result");
    var process = new ELEMENT("#process");


    document.body.addEventListener("mousedown", function ($event) {
    });

    hidePages();
    // pageStart.show();
    var loadedAssets = new LOAD(images, "image");
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

    /**
     * Chicken model
     */
    var CHICKEN = function () {
        this.staticElement = new ELEMENT();
        this.moveElement = new ELEMENT();
        this.endElement = new ELEMENT();
        this.name = "default";
    };

    var EGG = function () {
        this.element = new ELEMENT();
        this.value = 0;
    };

    var CHICKEN_GROUP = function ($name) {
        this.name = $name;
        this.element = new ELEMENT();
        this.chicken = new CHICKEN();
        this.egg = new EGG();
        this.avtivated = false;
        this.animation = new ANIMATION();
    };
    CHICKEN_GROUP.prototype.setting = function () {
        this.element.add(this.chicken.staticElement);
        this.element.add(this.chicken.moveElement);
        this.element.add(this.chicken.endElement);
        this.element.add(this.egg.element);
        this.egg.element.hide();
        this.chicken.moveElement.hide();
        this.chicken.endElement.hide();
        this.configAnimation();
    };
    CHICKEN_GROUP.prototype.configAnimation = function () {
        this.animation.tick = mainTimeline.tick;
        this.animation.delaySecondsTime = 0;
        this.animation.element = this.element.target;
        this.animation.config.width = 100;
        this.animation.config.height = 100;
        this.animation.setting();
    };
    var gameIntro = new ELEMENT("#game_intro");
    var gamePlay = new ELEMENT("#game_play");
    gamePlay.click = function ($event) {
    };
    gameIntro.click = function ($event) {
    };

    window.gamePlay = gamePlay;
    window.gameIntro = gameIntro;
    var chicken1 = new CHICKEN_GROUP();
    var chicken2 = new CHICKEN_GROUP();
    var chicken3 = new CHICKEN_GROUP();
    var chicken4 = new CHICKEN_GROUP();
    var chicken5 = new CHICKEN_GROUP();
    var chicken6 = new CHICKEN_GROUP();
    gamePlay.addEvent({
        type: "click",
        attack: function (params) {
            console.log(params);
        }
    });
    loadedAssets.onEnd = function () {
        var dataChicken = loadedAssets.images[22];
        var type = "image";
        var center = {
            x: width / 2,
            y: height / 2
        };
        var viewarea = {
            minX: 50,
            minY: 50,
            maxX: width - 50,
            maxY: height - 50
        };
        chicken1.element.createSvgElement("g");
        chicken1.chicken.staticElement.createSvgElement(type, dataChicken);
        chicken1.chicken.moveElement.createSvgElement(type, dataChicken);
        chicken1.chicken.endElement.createSvgElement(type, dataChicken);
        chicken1.animation.config.x = center.x;
        chicken1.animation.config.y = center.y;
        chicken1.setting();
        gamePlay.add(chicken1.element);

        chicken2.element.createSvgElement("g");
        chicken2.chicken.staticElement.createSvgElement(type, dataChicken);
        chicken2.chicken.moveElement.createSvgElement(type, dataChicken);
        chicken2.chicken.endElement.createSvgElement(type, dataChicken);
        chicken2.animation.config.x = center.x;
        chicken2.animation.config.y = center.y;
        chicken2.setting();
        gamePlay.add(chicken2.element);

        chicken3.element.createSvgElement("g");
        chicken3.chicken.staticElement.createSvgElement(type, dataChicken);
        chicken3.chicken.moveElement.createSvgElement(type, dataChicken);
        chicken3.chicken.endElement.createSvgElement(type, dataChicken);
        chicken3.animation.config.x = center.x;
        chicken3.animation.config.y = center.y;
        chicken3.setting();
        gamePlay.add(chicken3.element);

        chicken4.element.createSvgElement("g");
        chicken4.chicken.staticElement.createSvgElement(type, dataChicken);
        chicken4.chicken.moveElement.createSvgElement(type, dataChicken);
        chicken4.chicken.endElement.createSvgElement(type, dataChicken);
        chicken4.animation.config.x = center.x;
        chicken4.animation.config.y = center.y;
        chicken4.setting();
        gamePlay.add(chicken4.element);

        chicken5.element.createSvgElement("g");
        chicken5.chicken.staticElement.createSvgElement(type, dataChicken);
        chicken5.chicken.moveElement.createSvgElement(type, dataChicken);
        chicken5.chicken.endElement.createSvgElement(type, dataChicken);
        chicken5.animation.config.x = center.x;
        chicken5.animation.config.y = center.y;
        chicken5.setting();
        gamePlay.add(chicken5.element);

        chicken6.element.createSvgElement("g");
        chicken6.chicken.staticElement.createSvgElement(type, dataChicken);
        chicken6.chicken.moveElement.createSvgElement(type, dataChicken);
        chicken6.chicken.endElement.createSvgElement(type, dataChicken);
        chicken6.animation.config.x = center.x;
        chicken6.animation.config.y = center.y;
        chicken6.setting();
        gamePlay.add(chicken6.element);

        var elementTimerStart = new ELEMENT("#large_timer");
        var timer = new ANIMATION();
        timer.tick = mainTimeline.tick;
        timer.goto({ time: 3 });
        timer.onOutput = function () {
            elementTimerStart.target.textContent = timer.timerFrames - 1;
        };

        mainTimeline.animation = timer;
        timer.onEndRound = function () {
            console.log("end round");
            var element = new ELEMENT();
            var anim = new ANIMATION();
            anim.tick = mainTimeline.tick;
            anim.setting();
            anim.onOutput = function () {
            };
            anim.goto({ time: 10 });
            chicken1.animation.goto({ x: 200, y: 100, time: 7 }).goto({ x: 100, y: 300, time: 3 });
            anim.children.push(chicken1.animation);
            chicken2.animation.goto({ x: 100, y: 50, time: 5 }).goto({ x: 300, y: 300, time: 5 });
            anim.children.push(chicken2.animation);
            chicken3.animation.goto({ x: 10, y: 50, time: 5 }).goto({ x: 300, y: 30, time: 5 });
            anim.children.push(chicken3.animation);
            chicken4.animation.goto({ x: 1, y: 250, time: 5 }).goto({ x: 35, y: 340, time: 5 });
            anim.children.push(chicken4.animation);
            chicken5.animation.goto({ x: 300, y: 50, time: 5 }).goto({ x: 310, y: 30, time: 5 });
            anim.children.push(chicken5.animation);
            chicken6.animation.goto({ x: 10, y: 500, time: 5 }).goto({ x: 30, y: 200, time: 5 });
            anim.children.push(chicken6.animation);

            mainTimeline.animation = anim;
            mainTimeline.configRunGame();
            mainTimeline.runGame();
        };
    };
}());

// var cs = function () { };
// cs.prototype.cs = "123";
// var test = function () {

// };
// test.prototype.text = "";
// test.prototype.child = new cs();
// var t1 = new test();
// var t2 = new test();
// var t3 = new test();

// t1.text = "hello";
// t1.child.text = "123";
// t2.child.cs = "333";
// console.log(t1, t2, t3);