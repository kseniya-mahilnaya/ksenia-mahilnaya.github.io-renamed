/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function loadItems(items) {
    var html = '';
    var videoItem = '';
    var base = "https://www.youtube.com/embed/";

    items.forEach(function (item, index) {
        var snipTitle = item.snippet.title;
        var snipDescription = item.snippet.description;
        var snipPublishedAt = item.snippet.publishedAt;
        snipPublishedAt = snipPublishedAt.slice(0, snipPublishedAt.indexOf('T'));
        var snipChannelTitle = item.snippet.channelTitle;
        var snipThumbnailUrl = item.snippet.thumbnails.medium.url;
        var vidUrl = base + item.id.videoId;

        if (index % 4 === 0) {
            videoItem = '<li><div class="video-item"><img width="280" height="158" src=' + snipThumbnailUrl + '></img><p class="title"><a href=' + vidUrl + '>' + snipTitle + '</a></p><p class="author">' + snipChannelTitle + '</p><p class="date">' + snipPublishedAt + '</p><p class="description">' + snipDescription + '</p></div>';
        } else if (index % 4 === 3) {
            videoItem = '<div class="video-item">' + '<img width="280" height="158" src=' + snipThumbnailUrl + '></img>' + '<p class="title"><a href=' + vidUrl + '>' + snipTitle + '</a></p><p  class="author">' + snipChannelTitle + '</p><p class="date">' + snipPublishedAt + '</p><p class="description">' + snipDescription + '</p></div></li>';
        } else {
            videoItem = '<div class="video-item">' + '<img width="280" height="158" src=' + snipThumbnailUrl + '></img>' + '<p class="title"><a href=' + vidUrl + '>' + snipTitle + '</a></p><p class="author">' + snipChannelTitle + '</p><p class="date">' + snipPublishedAt + '</p><p class="description">' + snipDescription + '</p></div>';
        }
        html += videoItem;
    });
    document.getElementById("result").innerHTML += html;
}

module.exports = { loadItems: loadItems };

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function pagination() {
    var paginDiv = document.getElementById('pagination-div');
    paginDiv.appendChild(document.createElement('span'));
    paginDiv.appendChild(document.createElement('span'));
    paginDiv.appendChild(document.createElement('span'));
    paginDiv.appendChild(document.createElement('span'));

    var spans = document.querySelectorAll('div span');
    var el = document.getElementById('swipegallery'); // reference gallery's main DIV container
    var width = document.documentElement.clientWidth;
    var ul = el.getElementsByTagName('ul')[0];
    var gallerywidth = 1281;

    spans.forEach(function (item, index) {
        item.addEventListener('click', function () {
            ul.style.left = -index * gallerywidth + 'px';
            activeItem(item, index, spans);
        });
    });
}

function activeItem(item, index, spans) {
    spans.forEach(function (i) {
        i.classList.remove('item-active');
        i.innerHTML = '';
    });
    item.classList.add('item-active');
    item.innerHTML = '' + (index + 1);
}

module.exports = { pagination: pagination, activeItem: activeItem };

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function ontouch(el, callback) {
    var touchsurface = el;
    var dir = void 0;
    var swipeType = void 0;
    var startX = void 0;
    var startY = void 0;
    var distX = void 0;
    var distY = void 0;
    var dist = 0;
    var threshold = 150;
    var restraint = 100;
    var allowedTime = 500;
    var elapsedTime = void 0;
    var startTime = void 0;
    var mouseisdown = false;
    var detecttouch = !!('ontouchstart' in window) || !!('ontouchstart' in document.documentElement) || !!window.ontouchstart || !!window.Touch || !!window.onmsgesturechange || window.DocumentTouch && window.document instanceof window.DocumentTouch;
    var handletouch = callback || function (evt, dir, phase, swipetype, distance) {};

    touchsurface.addEventListener('touchstart', function (e) {
        var touchobj = e.changedTouches[0];
        dir = 'none';
        swipeType = 'none';
        dist = 0;
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime(); // record time when finger first makes contact with surface
        handletouch(e, 'none', 'start', swipeType, 0); // fire callback function with params dir="none", phase="start", swipetype="none" etc
        e.preventDefault();
    }, false);

    touchsurface.addEventListener('touchmove', function (e) {
        var touchobj = e.changedTouches[0];
        distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
        if (Math.abs(distX) > Math.abs(distY)) {
            // if distance traveled horizontally is greater than vertically, consider this a horizontal movement
            dir = distX < 0 ? 'left' : 'right';
            handletouch(e, dir, 'move', swipeType, distX); // fire callback function with params dir="left|right", phase="move", swipetype="none" etc
        } else {
            // else consider this a vertical movement
            dir = distY < 0 ? 'up' : 'down';
            handletouch(e, dir, 'move', swipeType, distY); // fire callback function with params dir="up|down", phase="move", swipetype="none" etc
        }
        e.preventDefault(); // prevent scrolling when inside DIV
    }, false);

    touchsurface.addEventListener('touchend', function (e) {
        var touchobj = e.changedTouches[0];
        elapsedTime = new Date().getTime() - startTime; // get time elapsed
        if (elapsedTime <= allowedTime) {
            // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                // 2nd condition for horizontal swipe met
                swipeType = dir; // set swipeType to either "left" or "right"
            } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
                // 2nd condition for vertical swipe met
                swipeType = dir; // set swipeType to either "top" or "down"
            }
        }
        // fire callback function with params dir="left|right|up|down", phase="end", swipetype=dir etc:
        handletouch(e, dir, 'end', swipeType, dir == 'left' || dir == 'right' ? distX : distY);
        e.preventDefault();
    }, false);

    touchsurface.addEventListener('mousedown', function (e) {
        var touchobj = e;
        dir = 'none';
        swipeType = 'none';
        dist = 0;
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime(); // record time when finger first makes contact with surface
        handletouch(e, 'none', 'start', swipeType, 0); // fire callback function with params dir="none", phase="start", swipetype="none" etc
        mouseisdown = true;
        e.preventDefault();
    }, false);

    document.body.addEventListener('mousemove', function (e) {
        if (mouseisdown) {
            var touchobj = e;
            distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
            distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
            if (Math.abs(distX) > Math.abs(distY)) {
                // if distance traveled horizontally is greater than vertically, consider this a horizontal movement
                dir = distX < 0 ? 'left' : 'right';
                handletouch(e, dir, 'move', swipeType, distX); // fire callback function with params dir="left|right", phase="move", swipetype="none" etc
            } else {
                // else consider this a vertical movement
                dir = distY < 0 ? 'up' : 'down';
                handletouch(e, dir, 'move', swipeType, distY); // fire callback function with params dir="up|down", phase="move", swipetype="none" etc
            }
            e.preventDefault(); // prevent scrolling when inside DIV
        }
    }, false);

    document.body.addEventListener('mouseup', function (e) {
        if (mouseisdown) {
            var touchobj = e;
            elapsedTime = new Date().getTime() - startTime; // get time elapsed
            if (elapsedTime <= allowedTime) {
                // first condition for awipe met
                if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                    // 2nd condition for horizontal swipe met
                    swipeType = dir; // set swipeType to either "left" or "right"
                } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
                    // 2nd condition for vertical swipe met
                    swipeType = dir; // set swipeType to either "top" or "down"
                }
            }
            // fire callback function with params dir="left|right|up|down", phase="end", swipetype=dir etc:
            handletouch(e, dir, 'end', swipeType, dir == 'left' || dir == 'right' ? distX : distY);
            mouseisdown = false;
            e.preventDefault();
        }
    }, false);
}

module.exports = {
    ontouch: ontouch
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    loadItems = _require.loadItems;

var _require2 = __webpack_require__(2),
    ontouch = _require2.ontouch;

var _require3 = __webpack_require__(1),
    pagination = _require3.pagination,
    activeItem = _require3.activeItem;

var pgToken = void 0;
var liscount = void 0;
var curindex = 0;

window.addEventListener('load', function () {
    var form = document.createElement('form');
    var inputText = '<input type="text" id="search">';
    var inputSubmit = '<input type="submit" value="search">';
    var div = document.createElement('div');
    div.id = "swipegallery";
    div.className = "touchgallery";
    div.innerHTML = "<ul id='result'></ul>";

    document.body.insertBefore(form, document.body.firstChild);
    document.body.insertBefore(div, form.nextSibling);
    form.innerHTML = '<div class="input-border">' + inputText + inputSubmit + '</div>';

    var paginDiv = document.createElement('div');
    paginDiv.id = "pagination-div";
    document.body.insertBefore(paginDiv, div.nextSibling);

    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();

        // prepare the request
        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent(document.getElementById("search").value).replace(/%20/g, "+"),
            maxResults: 16,
            order: "viewCount"
        });
        // execute the request
        request.execute(function (response) {
            var result = response.result;
            pgToken = result.nextPageToken;
            loadItems(result.items);
            liscount = document.getElementsByTagName("li").length;
            ul.style.width = gallerywidth * liscount + 'px';
            pagination();
            var firstSpan = document.querySelector('div span');
            firstSpan.classList.add('item-active');
            firstSpan.innerHTML = '1';
        });
    });

    var el = document.getElementById('swipegallery'); // reference gallery's main DIV container
    //const gallerywidth = el.offsetWidth;
    var gallerywidth = 1281;
    var ul = el.getElementsByTagName('ul')[0];
    var ulLeft = 0;
    liscount = 4;
    ul.style.width = gallerywidth * liscount + 'px'; // set width of gallery to parent container's width * total li

    ontouch(el, function (evt, dir, phase, swipetype, distance) {
        if (phase == 'start') {
            // on touchstart

            if (curindex === liscount - 2) {
                var request = gapi.client.youtube.search.list({
                    part: "snippet",
                    type: "video",
                    q: encodeURIComponent(document.getElementById("search").value).replace(/%20/g, "+"),
                    maxResults: 16,
                    pageToken: pgToken,
                    order: "viewCount"
                });
                request.execute(function (response) {
                    var result = response.result;
                    pgToken = result.nextPageToken;
                    loadItems(result.items);
                    liscount = document.getElementsByTagName("li").length;
                    ul.style.width = gallerywidth * liscount + 'px';
                    pagination();
                });
            }
            ulLeft = parseInt(ul.style.left) || 0; // initialize ulLeft var with left position of UL
        } else if (phase == 'move' && (dir == 'left' || dir == 'right')) {
            //  on touchmove and if moving left or right

            var totaldist = distance + ulLeft; // calculate new left position of UL based on movement of finger
            var width = document.documentElement.clientWidth;
            gallerywidth = 1281;
            /*if (width < 670) {
                gallerywidth = 320;
            } else if ((width >= 670) && (width < 1024)) {
                gallerywidth = 640;
            } else if ((width >= 1024) && (width < 1300)) {
                gallerywidth = 960;
            } else {
                gallerywidth = 1281;
            }*/
            ul.style.left = Math.min(totaldist, (curindex + 1) * gallerywidth) + 'px'; // set gallery to new left position
        } else if (phase == 'end') {
            // on touchend
            if (swipetype == 'left' || swipetype == 'right') {
                // if a successful left or right swipe is made
                curindex = swipetype == 'left' ? Math.min(curindex + 1, liscount - 1) : Math.max(curindex - 1, 0);
            }
            ul.style.left = -curindex * gallerywidth + 'px'; // move UL to show the new image
            var spans = document.querySelectorAll('div span');
            spans.forEach(function (item, index) {
                if (index === curindex) {
                    activeItem(item, index, spans);
                }
            });
        }
    }); // end ontouch
}, false);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map