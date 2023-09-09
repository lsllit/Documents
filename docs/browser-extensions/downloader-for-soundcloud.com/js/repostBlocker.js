/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 443:
/***/ ((__unused_webpack_module, exports) => {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
function isStreamUrl(url) {
    return url && url.hostname === "api-v2.soundcloud.com" && url.pathname === "/stream";
}
function getFromLocalStorage(key) {
    const item = window.localStorage.getItem("SOUNDCLOUD-DL-" + key);
    return JSON.parse(item);
}
const twentyDaysInSeconds = 864000;
function filterReposts(collection) {
    var _a;
    if (!collection)
        return [];
    const nowTimestamp = new Date().getTime() / 1000;
    const blockPlaylists = getFromLocalStorage("block-playlists");
    const followedArtistIds = (_a = getFromLocalStorage("followed-artists")) !== null && _a !== void 0 ? _a : [];
    const filtered = [];
    for (const item of collection) {
        if (item.type === "track-promoted")
            continue;
        if (item.type === "track-repost") {
            // if a track has been reposted in the stream by a user it won't be shown afterwards
            // so we show the track, if it is a repost of a artist we follow
            if (!followedArtistIds.includes(item.track.user_id))
                continue;
            const trackCreatedAtTimestamp = new Date(item.track.created_at).getTime() / 1000;
            if (nowTimestamp - trackCreatedAtTimestamp > twentyDaysInSeconds)
                continue;
            item.type = "track";
            item.user = item.track.user;
            item.created_at = item.track.display_date;
        }
        if (blockPlaylists && item.type === "playlist")
            continue;
        if (item.type === "playlist-repost") {
            if (blockPlaylists)
                continue;
            // if a playlist has been reposted in the stream by a user it won't be shown afterwards
            // so we show the playlist, if it is a repost of a artist we follow
            if (!followedArtistIds.includes(item.playlist.user_id))
                continue;
            const playlistCreatedAtTimestamp = new Date(item.playlist.created_at).getTime() / 1000;
            if (nowTimestamp - playlistCreatedAtTimestamp > twentyDaysInSeconds)
                continue;
            item.type = "playlist";
            item.user = item.playlist.user;
            item.created_at = item.playlist.display_date;
        }
        filtered.push(item);
    }
    return filtered;
}
function removeReposts(json) {
    if (!json)
        return json;
    const data = JSON.parse(json);
    const filteredData = Object.assign(Object.assign({}, data), { collection: filterReposts(data.collection) });
    return JSON.stringify(filteredData);
}
const originalSendMethod = XMLHttpRequest.prototype.send;
function hijackedSendMethod(body) {
    const url = new URL(this.__state.url);
    const onload = this.onload;
    if (onload && isStreamUrl(url)) {
        this.onload = function (event) {
            Object.defineProperty(this, "responseText", {
                value: removeReposts(this.responseText),
            });
            onload.call(this, event);
        };
    }
    return originalSendMethod.call(this, body);
}
XMLHttpRequest.prototype.send = hijackedSendMethod;
Object.defineProperty(XMLHttpRequest.prototype, "resetSend", {
    value: () => (XMLHttpRequest.prototype.send = originalSendMethod),
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__(443);
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;