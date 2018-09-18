(function() {
    "use strict";
    /**
     * Set default config
     */
    var height = 600;
    var width = 360;
    var pages = ["history", "start", "main", "result"];
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
    var ELEMENT = function(targetString) {
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
    ELEMENT.prototype.click = function() { };
    ELEMENT.prototype.hide = function() {
        this.target.classList.add("hidden");
    };
    ELEMENT.prototype.show = function() {
        this.target.classList.remove("hidden");
    };
    var CLICK = function($elements) {
        for (var i = 0, l = $elements.length; i < l; i++) {
            if ($elements.target) {
                var e = $elements[i];
                var t = e.target;
                $elements[i].click = function(e) {
                    e.click();
                };
                $elements[i].target.addEventListener("click", $elements[i].click, false);
            }
        }
    };
    CLICK.prototype.enabledTouchSupport = false;
    CLICK.prototype.enabledMultiTouch = false;
    var ANIMATION = function($elements, $actionName) {

    };

    var LOAD = function($filenames, $type) {
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
            var load = function() {
                loadingImages[loadedCount].src = loadingImages[loadedCount].srcString;
                loadingImages[loadedCount].onload =
                    loadingImages[loadedCount].onerror = function() {
                        loadedCount++;
                        if (loadedCount < loadingCount) {
                            new load();
                        }
                    };
            };

            new load();
        }
    };

    /**
     * Excute game
     */

    function startGame() {
        hidePages();
        mainPage.show();
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
    startBtn.click = function(target) {
        startGame();
    };
    var historyBtn = new ELEMENT("#start_button");
    historyBtn.click = function(target) {
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
}());


