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

function random($from, $to, $step) {
    var step = $step || 1;
    var from = $from;
    var to = ($to - $from) / step;
    var value = Math.floor((Math.random() * to) + from) * step;
    return value;
}

function randomArrayNoLoop($count) {
    var values = [];
    for (var i = 0; i < $count; i++) {
        var value = random(-$count, $count);
        var isAdd = true;
        for (var j = 0; j < values.length; j++) {
            if (values[j] == value) {
                isAdd = false;
                break;
            }
        }
        if (isAdd) {
            values.push(value);
        } else {
            i--;
        }
    }
    return values;
}

function mathRound($number, $numberafterdot) {
    var num = Math.pow(10, $numberafterdot);
    return Math.round($number * num) / num;
}
var EVENT = function () {
    this.type = "";
    this.attack = function () { }
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
    * Timeline for each item
    * time is seconds
    */
var TIMELINE = function () {
    this.onend = undefined;
};
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
    } else {
        if (this.onend) {
            this.onend(this);
        }
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
        time: 0, // can not input when use speed mode
        corner: undefined, // corner move , when corner is seted then x, y only red
        speed: undefined // speed of item , default is disable, when set it then enable
    };
    this.viewbox = undefined;
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
ANIMATION.prototype.calculateWithCorner = function (startX, startY, distance, cornerValue) {
    // a^2 + b^2 = c^2
    // a = x, b =y, c=distance
    cornerValue = (startX == 0) ? (180 - cornerValue) : cornerValue;
    var radian = cornerValue * (Math.PI / 180);
    return {
        x: startX + mathRound(Math.cos(radian) * distance, 3),
        y: startY + mathRound(Math.sin(radian) * distance, 3)
    };
};
ANIMATION.prototype.reset = function ($options) {
    this.values = [];
    this.runAt(0);
};
ANIMATION.prototype.goto = function ($options) {
    var lastConfig = this.values[this.values.length - 1] || this.config;
    $options.x = $options.x || lastConfig.x;
    $options.y = $options.y || lastConfig.y;
    $options.rotate = $options.rotate || lastConfig.rotate;
    $options.scale = $options.scale || lastConfig.scale;
    $options.corner = $options.corner || lastConfig.corner || 0;
    $options.time = $options.time || lastConfig.time;
    $options.speed = $options.speed || lastConfig.speed;
    var distance = 0;
    var time = $options.time || lastConfig.time || 1;
    var speed = $options.speed || lastConfig.speed;
    if (speed) {
        var isCorner = this.config.corner || $options.corner;
        if (isCorner || isCorner == 0) {
            distance = time * $options.speed;
            var point = this.calculateWithCorner(lastConfig.x, lastConfig.y, distance, $options.corner);
            $options.x = point.x;
            $options.y = point.y;
        } else {
            distance = Math.sqrt(Math.pow($options.x - lastConfig.x, 2) + Math.pow($options.y - lastConfig.y, 2));
            time = distance / speed;
        }
    }
    var distances = this.settingMove($options.x, $options.y);
    var distancesRotate = this.settingRotate($options.rotate * 360 || lastConfig.rotate * 360);
    var distancesScale = this.settingScale($options.scale || lastConfig.scale);
    var delayFrame = this.setFrameCount($options.delay || 0);
    var framesCount = this.setFrameCount(time);
    var isSetNew = false;
    var crashTime = 0;
    var values = [];
    var isCrashXRight = false;
    var isCrashXLeft = false;
    var isCrashYBottom = false;
    var isCrashYTop = false;
    for (var i = 0; i < framesCount; i++) {
        var x = lastConfig.x + distances[0] * i / (framesCount - 1);
        var y = lastConfig.y + distances[1] * i / (framesCount - 1);
        var scale = lastConfig.scale + distancesScale * i / (framesCount - 1) || lastConfig.scale;
        var rotate = lastConfig.rotate + distancesRotate * i / (framesCount - 1) || lastConfig.rotate;
        if (this.viewbox) {
            if (x < this.viewbox.x) {
                isCrashXLeft = true;
                x = this.viewbox.x;
            }
            if (x > this.viewbox.width + this.viewbox.x) {
                isCrashXRight = true;
                x = this.viewbox.width + this.viewbox.x;
            }
            if (y < this.viewbox.y) {
                isCrashYTop = true;
                y = this.viewbox.y;
            }
            if (y > this.viewbox.height + this.viewbox.y) {
                isCrashYBottom = true;
                y = this.viewbox.height + this.viewbox.y;
            }
        }
        values.push({
            x: x,
            y: y,
            scale: scale,
            rotate: rotate,
            delayFrame: delayFrame,
            speed: $options.speed,
            corner: $options.corner,
            time: time
        });

        if (isCrashXLeft || isCrashXRight || isCrashYTop || isCrashYBottom) {
            crashTime = (i + 1) * this.tick / 1000;
            isSetNew = true;
            break;
        }
    }

    this.values = this.values.concat(values);
    if (isSetNew) {
        var corner = (isCrashYTop || isCrashYBottom) ? -$options.corner : 180 - $options.corner;
        this.goto({
            time: mathRound(time - crashTime, 3),
            corner: corner,
            speed: speed,
            name: "fake"
        });
    }
    this.framesCount += framesCount;
    this.timerFrames = this.framesCount;
    return this;
};
ANIMATION.prototype.setting = function () {
    this.runAt(0);
};
ANIMATION.prototype.runAt = function (_frame) {
    if (this.element) {
        this.currentFrame = _frame ? _frame : 1;
        var _toPosition = this.values[this.currentFrame - 1] || this.values[this.values.length - 1] || this.config;
        this.element.setAttribute("transform",
            "translate(" + _toPosition.x + ", " + _toPosition.y + ")" + "scale(" + _toPosition.scale + ") " + "rotate(" + _toPosition.rotate + ")" + "translate(" + (-this.config.width / 2) + "," + (-this.config.height / 2) + " )");
    }
    var outresult = typeof (this.onOutput) == "function" ? this.onOutput() : undefined;
    if (!this.element) {
        return;
    }
};
ANIMATION.prototype.run = function (_frame) {
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
            this.onEndRound(this);
        }
    }
};
ANIMATION.prototype.children = [];
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

var CHICKEN_GROUP = function ($name, $value) {
    this.name = $name;
    this.value = $value;
    this.event = function (e) { };
    this.element = new ELEMENT();
    this.chicken = new CHICKEN();
    this.egg = new EGG();
    this.avtivated = false;
    this.animation = new ANIMATION();
    var _this = this;
    this.setting = function ($tick) {
        this.element.add(this.chicken.staticElement);
        this.element.add(this.chicken.moveElement);
        this.element.add(this.chicken.endElement);
        this.element.add(this.egg.element);
        this.element.target.setAttribute("name", this.name);
        this.element.target.addEventListener("click", function (e) {
            _this.event(_this, e);
        });
        this.egg.element.hide();
        this.chicken.moveElement.hide();
        this.chicken.endElement.hide();
        this.configAnimation($tick);
    };
    this.configAnimation = function ($tick) {
        this.animation.tick = $tick;
        this.animation.delaySecondsTime = 0;
        this.animation.element = this.element.target;
        this.animation.config.width = 100;
        this.animation.config.height = 100;
        this.animation.setting();
    };
    this.addEvent = function (e) {
        if (typeof (e) == "function") {
            this.event = e;
        }
    };
};
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
    this.processPercentElement = undefined;
    this.processElement = undefined;
    this.onLoaded = undefined;
    this.run = function () {
        if ($type === "audio") {
            if (_this.loadedImage && _this.loadedAudio) {
                if (_this.onEnd && !_this.loaded) {
                    _this.images = loadedImageAssets;
                    _this.audios = loadedAudioAssets;
                    _this.loaded = true;
                    _this.onEnd();
                }
                if (this.processElement) { this.processElement.hide(); }
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
                        if (this.processPercentElement) { this.processPercentElement.setAttribute("width", _widthPercent); }
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
                                _this.processElement.hide();
                                if(typeof(_this.onLoaded) == "function") {
                                    _this.onLoaded(_this);
                                }
                            }
                        }
                    }
                };
            };
            new loadImages();
        }
    }
};