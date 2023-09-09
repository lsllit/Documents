/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 202:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*jshint node:true*/


/**
 * Replaces characters in strings that are illegal/unsafe for filenames.
 * Unsafe characters are either removed or replaced by a substitute set
 * in the optional `options` object.
 *
 * Illegal Characters on Various Operating Systems
 * / ? < > \ : * | "
 * https://kb.acronis.com/content/39790
 *
 * Unicode Control codes
 * C0 0x00-0x1f & C1 (0x80-0x9f)
 * http://en.wikipedia.org/wiki/C0_and_C1_control_codes
 *
 * Reserved filenames on Unix-based systems (".", "..")
 * Reserved filenames in Windows ("CON", "PRN", "AUX", "NUL", "COM1",
 * "COM2", "COM3", "COM4", "COM5", "COM6", "COM7", "COM8", "COM9",
 * "LPT1", "LPT2", "LPT3", "LPT4", "LPT5", "LPT6", "LPT7", "LPT8", and
 * "LPT9") case-insesitively and with or without filename extensions.
 *
 * Capped at 255 characters in length.
 * http://unix.stackexchange.com/questions/32795/what-is-the-maximum-allowed-filename-and-folder-size-with-ecryptfs
 *
 * @param  {String} input   Original filename
 * @param  {Object} options {replacement: String | Function }
 * @return {String}         Sanitized filename
 */

var truncate = __webpack_require__(700);

var illegalRe = /[\/\?<>\\:\*\|"]/g;
var controlRe = /[\x00-\x1f\x80-\x9f]/g;
var reservedRe = /^\.+$/;
var windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
var windowsTrailingRe = /[\. ]+$/;

function sanitize(input, replacement) {
  if (typeof input !== 'string') {
    throw new Error('Input must be string');
  }
  var sanitized = input
    .replace(illegalRe, replacement)
    .replace(controlRe, replacement)
    .replace(reservedRe, replacement)
    .replace(windowsReservedRe, replacement)
    .replace(windowsTrailingRe, replacement);
  return truncate(sanitized, 255);
}

module.exports = function (input, options) {
  var replacement = (options && options.replacement) || '';
  var output = sanitize(input, replacement);
  if (replacement === '') {
    return output;
  }
  return sanitize(output, '');
};


/***/ }),

/***/ 700:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var truncate = __webpack_require__(156);
var getLength = __webpack_require__(793);
module.exports = truncate.bind(null, getLength);


/***/ }),

/***/ 156:
/***/ ((module) => {



function isHighSurrogate(codePoint) {
  return codePoint >= 0xd800 && codePoint <= 0xdbff;
}

function isLowSurrogate(codePoint) {
  return codePoint >= 0xdc00 && codePoint <= 0xdfff;
}

// Truncate string by size in bytes
module.exports = function truncate(getLength, string, byteLength) {
  if (typeof string !== "string") {
    throw new Error("Input must be string");
  }

  var charLength = string.length;
  var curByteLength = 0;
  var codePoint;
  var segment;

  for (var i = 0; i < charLength; i += 1) {
    codePoint = string.charCodeAt(i);
    segment = string[i];

    if (isHighSurrogate(codePoint) && isLowSurrogate(string.charCodeAt(i + 1))) {
      i += 1;
      segment += string[i];
    }

    curByteLength += getLength(segment);

    if (curByteLength === byteLength) {
      return string.slice(0, i + 1);
    }
    else if (curByteLength > byteLength) {
      return string.slice(0, i - segment.length + 1);
    }
  }

  return string;
};



/***/ }),

/***/ 534:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getPathFromExtensionFile = exports.getExtensionManifest = exports.getLocalStorage = exports.setLocalStorage = exports.getSyncStorage = exports.setSyncStorage = exports.onStorageChanged = exports.openOptionsPage = exports.onPageActionClicked = exports.sendMessageToTab = exports.sendMessageToBackend = exports.downloadToFile = exports.onMessage = exports.onBeforeRequest = exports.onBeforeSendHeaders = void 0;
const logger_1 = __webpack_require__(473);
const logger = logger_1.Logger.create("Compatibility Stubs");
const onBeforeSendHeaders = (callback, urls, extraInfos) => {
    if (typeof browser !== "undefined") {
        // @ts-ignore
        browser.webRequest.onBeforeSendHeaders.addListener(callback, { urls }, extraInfos);
    }
    else if (typeof chrome !== "undefined") {
        chrome.webRequest.onBeforeSendHeaders.addListener(callback, { urls }, extraInfos);
    }
    else {
        logger.logError("Browser does not support webRequest.onBeforeSendHeaders");
    }
};
exports.onBeforeSendHeaders = onBeforeSendHeaders;
const onBeforeRequest = (callback, urls, extraInfos) => {
    if (typeof browser !== "undefined") {
        // @ts-ignore
        browser.webRequest.onBeforeRequest.addListener(callback, { urls }, extraInfos);
    }
    else if (typeof chrome !== "undefined") {
        chrome.webRequest.onBeforeRequest.addListener(callback, { urls }, extraInfos);
    }
    else {
        logger.logError("Browser does not support webRequest.onBeforeRequest");
    }
};
exports.onBeforeRequest = onBeforeRequest;
const onMessage = (callback) => {
    if (typeof browser !== "undefined") {
        browser.runtime.onMessage.addListener((message, sender) => {
            if (sender.id !== browser.runtime.id || !message)
                return;
            callback(sender, message);
            return true;
        });
    }
    else if (typeof chrome !== "undefined") {
        chrome.runtime.onMessage.addListener((message, sender) => {
            if (sender.id !== chrome.runtime.id || !message)
                return;
            callback(sender, message);
            return true;
        });
    }
    else {
        logger.logError("Browser does not support runtime.onMessage");
    }
};
exports.onMessage = onMessage;
const downloadToFile = (url, filename, saveAs) => {
    const downloadOptions = {
        url,
        filename,
        saveAs,
    };
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        let downloadId;
        if (typeof browser !== "undefined") {
            const onChangedHandler = (delta) => {
                var _a, _b;
                if (delta.id === downloadId) {
                    if (((_a = delta.state) === null || _a === void 0 ? void 0 : _a.current) === "complete")
                        resolve();
                    if (((_b = delta.state) === null || _b === void 0 ? void 0 : _b.current) === "interrupted")
                        reject("Download was interrupted");
                    browser.downloads.onChanged.removeListener(onChangedHandler);
                }
            };
            browser.downloads.onChanged.addListener(onChangedHandler);
            try {
                downloadId = yield browser.downloads.download(downloadOptions);
            }
            catch (_a) {
                reject();
            }
        }
        else if (typeof chrome !== "undefined") {
            const onChangedHandler = (delta) => {
                if (delta.id === downloadId) {
                    resolve();
                    chrome.downloads.onChanged.removeListener(onChangedHandler);
                }
            };
            chrome.downloads.onChanged.addListener(onChangedHandler);
            chrome.downloads.download(downloadOptions, (id) => (downloadId = id));
        }
        else {
            return Promise.reject("Browser does not support downloads.download");
        }
    }));
};
exports.downloadToFile = downloadToFile;
const sendMessageToBackend = (message) => {
    if (typeof browser !== "undefined") {
        return browser.runtime.sendMessage(message);
    }
    else if (typeof chrome !== "undefined") {
        return new Promise((resolve) => chrome.runtime.sendMessage(message, resolve));
    }
    else {
        return Promise.reject("Browser does not support runtime.sendMessage");
    }
};
exports.sendMessageToBackend = sendMessageToBackend;
const sendMessageToTab = (tabId, message) => {
    if (typeof browser !== "undefined") {
        return browser.tabs.sendMessage(tabId, message);
    }
    else if (typeof chrome !== "undefined") {
        return new Promise((resolve) => chrome.tabs.sendMessage(tabId, message, resolve));
    }
    else {
        return Promise.reject("Browser does not support tabs.sendMessage");
    }
};
exports.sendMessageToTab = sendMessageToTab;
const onPageActionClicked = (callback) => {
    if (typeof browser !== "undefined") {
        browser.pageAction.onClicked.addListener((tab) => callback(tab.id));
    }
    else if (typeof chrome !== "undefined") {
        chrome.pageAction.onClicked.addListener((tab) => callback(tab.id));
    }
    else {
        logger.logError("Browser does not support pageAction.onClicked");
    }
};
exports.onPageActionClicked = onPageActionClicked;
const openOptionsPage = () => {
    if (typeof browser !== "undefined") {
        browser.runtime.openOptionsPage();
    }
    else if (typeof chrome !== "undefined") {
        chrome.runtime.openOptionsPage();
    }
    else {
        logger.logError("Browser does not support runtime.openOptionsPage");
    }
};
exports.openOptionsPage = openOptionsPage;
const onStorageChanged = (callback) => {
    if (typeof browser !== "undefined") {
        browser.storage.onChanged.addListener(callback);
    }
    else if (typeof chrome !== "undefined") {
        chrome.storage.onChanged.addListener(callback);
    }
    else {
        logger.logError("Browser does not support storage.onChanged");
    }
};
exports.onStorageChanged = onStorageChanged;
const setSyncStorage = (values) => {
    if (typeof browser !== "undefined") {
        return browser.storage.sync.set(values);
    }
    else if (typeof chrome !== "undefined") {
        return new Promise((resolve) => chrome.storage.sync.set(values, resolve));
    }
    else {
        return Promise.reject("Browser does not support storage.sync.set");
    }
};
exports.setSyncStorage = setSyncStorage;
const getSyncStorage = (keys) => {
    if (typeof browser !== "undefined") {
        return browser.storage.sync.get(keys);
    }
    else if (typeof chrome !== "undefined") {
        return new Promise((resolve) => chrome.storage.sync.get(keys, resolve));
    }
    else {
        return Promise.reject("Browser does not support storage.sync.get");
    }
};
exports.getSyncStorage = getSyncStorage;
const setLocalStorage = (values) => {
    if (typeof browser !== "undefined") {
        return browser.storage.local.set(values);
    }
    else if (typeof chrome !== "undefined") {
        return new Promise((resolve) => chrome.storage.local.set(values, resolve));
    }
    else {
        return Promise.reject("Browser does not support storage.local.set");
    }
};
exports.setLocalStorage = setLocalStorage;
const getLocalStorage = (keys) => {
    if (typeof browser !== "undefined") {
        return browser.storage.local.get(keys);
    }
    else if (typeof chrome !== "undefined") {
        return new Promise((resolve) => chrome.storage.local.get(keys, resolve));
    }
    else {
        return Promise.reject("Browser does not support storage.local.get");
    }
};
exports.getLocalStorage = getLocalStorage;
const getExtensionManifest = () => {
    if (typeof browser !== "undefined") {
        return browser.runtime.getManifest();
    }
    else if (typeof chrome !== "undefined") {
        return chrome.runtime.getManifest();
    }
    else {
        logger.logError("Browser does not support runtime.getManifest");
        return null;
    }
};
exports.getExtensionManifest = getExtensionManifest;
const getPathFromExtensionFile = (relativePath) => {
    if (typeof browser !== "undefined") {
        return browser.extension.getURL(relativePath);
    }
    else if (typeof chrome !== "undefined") {
        return chrome.extension.getURL(relativePath);
    }
    else {
        logger.logError("Browser does not support extension.getURL");
        return null;
    }
};
exports.getPathFromExtensionFile = getPathFromExtensionFile;


/***/ }),

/***/ 913:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerConfigChangeHandler = exports.getConfigValue = exports.resetConfig = exports.loadConfiguration = exports.loadConfigValue = exports.storeConfigValue = exports.configKeys = exports.setOnConfigValueChanged = void 0;
const logger_1 = __webpack_require__(473);
const compatibilityStubs_1 = __webpack_require__(534);
const sanitize_filename_1 = __importDefault(__webpack_require__(202));
const logger = logger_1.Logger.create("Config");
let isStorageMonitored = false;
let onConfigValueChanged;
function setOnConfigValueChanged(callback) {
    onConfigValueChanged = callback;
}
exports.setOnConfigValueChanged = setOnConfigValueChanged;
const config = {
    "download-hq-version": { sync: true, defaultValue: true },
    "download-original-version": { sync: true, defaultValue: false },
    "oauth-token": { secret: true },
    "client-id": { secret: true },
    "user-id": { secret: true },
    "default-download-location": { defaultValue: "SoundCloud", sanitize: (value) => sanitize_filename_1.default(value) },
    "download-without-prompt": { defaultValue: true },
    "normalize-track": { sync: true, defaultValue: true },
    "block-reposts": { sync: true, defaultValue: false },
    "block-playlists": { sync: true, defaultValue: false },
    "include-producers": { sync: true, defaultValue: true },
    "followed-artists": { defaultValue: [] },
};
exports.configKeys = Object.keys(config);
function isConfigKey(key) {
    return config[key] !== undefined;
}
function storeConfigValue(key, value) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!isConfigKey(key))
            return Promise.reject(`Invalid config key: ${key}`);
        const entry = config[key];
        if (entry.value === value)
            return Promise.resolve();
        const sync = entry.sync === true;
        if (entry.sanitize) {
            value = entry.sanitize(value);
        }
        logger.logInfo("Setting", key, "to", getDisplayValue(value, entry));
        entry.value = value;
        try {
            if (sync) {
                yield compatibilityStubs_1.setSyncStorage({ [key]: value });
            }
            else {
                yield compatibilityStubs_1.setLocalStorage({ [key]: value });
            }
            if (entry.onChanged)
                entry.onChanged(value);
        }
        catch (error) {
            const reason = "Failed to store configuration value";
            logger.logError(reason, { key, value, sync });
            return Promise.reject(reason);
        }
    });
}
exports.storeConfigValue = storeConfigValue;
function loadConfigValue(key) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!isConfigKey(key))
            return Promise.reject(`Invalid config key: ${key}`);
        const entry = config[key];
        const sync = entry.sync === true;
        let result;
        if (sync)
            result = yield compatibilityStubs_1.getSyncStorage(key);
        else
            result = yield compatibilityStubs_1.getLocalStorage(key);
        return (_a = result[key]) !== null && _a !== void 0 ? _a : entry.defaultValue;
    });
}
exports.loadConfigValue = loadConfigValue;
function loadConfigValues(keys) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!keys.every(isConfigKey))
            return Promise.reject("Invalid config keys");
        const syncKeys = keys.filter((key) => config[key].sync === true);
        const localKeys = keys.filter((key) => !config[key].sync);
        return Object.assign(Object.assign({}, (yield compatibilityStubs_1.getSyncStorage(syncKeys))), (yield compatibilityStubs_1.getLocalStorage(localKeys)));
    });
}
function loadConfiguration(monitorStorage = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const values = yield loadConfigValues(exports.configKeys);
        for (const key of exports.configKeys) {
            config[key].value = values[key];
        }
        if (monitorStorage && !isStorageMonitored) {
            compatibilityStubs_1.onStorageChanged(handleStorageChanged);
            isStorageMonitored = true;
        }
        return config;
    });
}
exports.loadConfiguration = loadConfiguration;
function resetConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const key of exports.configKeys) {
            yield storeConfigValue(key, config[key].defaultValue);
        }
    });
}
exports.resetConfig = resetConfig;
function getConfigValue(key) {
    return config[key].value;
}
exports.getConfigValue = getConfigValue;
function registerConfigChangeHandler(key, callback) {
    config[key].onChanged = callback;
}
exports.registerConfigChangeHandler = registerConfigChangeHandler;
const handleStorageChanged = (changes, areaname) => {
    for (const key in changes) {
        const { newValue } = changes[key];
        if (!isConfigKey(key))
            continue;
        const entry = config[key];
        if (entry.value === newValue)
            continue;
        if (areaname !== "local")
            logger.logInfo("Remote updating", key, "to", getDisplayValue(newValue, entry));
        entry.value = newValue;
        if (entry.onChanged)
            entry.onChanged(newValue);
        if (!entry.secret && onConfigValueChanged)
            onConfigValueChanged(key, newValue);
    }
};
function getDisplayValue(value, entry) {
    if (entry.secret && value)
        return "***CONFIDENTIAL***";
    return value;
}


/***/ }),

/***/ 144:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const domObserver_1 = __webpack_require__(385);
const logger_1 = __webpack_require__(473);
const compatibilityStubs_1 = __webpack_require__(534);
const config_1 = __webpack_require__(913);
const uuid_1 = __webpack_require__(614);
let observer = null;
const logger = logger_1.Logger.create("SoundCloud-Downloader");
const downloadButtons = {};
const setButtonText = (button, text, title) => {
    button.innerText = text;
    button.title = title !== null && title !== void 0 ? title : text;
};
const resetButtonBackground = (button) => {
    button.style.backgroundColor = "";
    button.style.background = "";
};
const handleMessageFromBackgroundScript = (_, message) => __awaiter(void 0, void 0, void 0, function* () {
    const { downloadId, progress, error } = message;
    const { elem: downloadButton, onClick: originalOnClick } = downloadButtons[downloadId];
    if (!downloadButton)
        return;
    if (progress === 101) {
        resetButtonBackground(downloadButton);
        downloadButton.style.backgroundColor = "#19a352";
        setButtonText(downloadButton, "Downloaded!");
        setTimeout(() => {
            resetButtonBackground(downloadButton);
            setButtonText(downloadButton, "Download");
            downloadButton.style.cursor = "pointer";
            downloadButton.onclick = originalOnClick;
            delete downloadButtons[downloadId];
        }, 2000);
    }
    else if (progress === 100) {
        setButtonText(downloadButton, "Finishing...");
        downloadButton.style.background = `linear-gradient(90deg, #ff5419 ${progress}%, transparent 0%)`;
    }
    else if (progress) {
        setButtonText(downloadButton, "Downloading...");
        downloadButton.style.background = `linear-gradient(90deg, #ff5419 ${progress}%, transparent 0%)`;
    }
    if (error) {
        resetButtonBackground(downloadButton);
        downloadButton.style.backgroundColor = "#d30029";
        setButtonText(downloadButton, "ERROR", error);
        delete downloadButtons[downloadId];
    }
});
compatibilityStubs_1.onMessage(handleMessageFromBackgroundScript);
const createDownloadButton = (small) => {
    const button = document.createElement("button");
    const buttonSizeClass = small ? "sc-button-small" : "sc-button-medium";
    button.className = `sc-button-download sc-button ${buttonSizeClass} sc-button-responsive`;
    setButtonText(button, "Download");
    return button;
};
const addDownloadButtonToParent = (parent, onClicked, small) => {
    const downloadButtonExists = parent.querySelector("button.sc-button-download") !== null;
    if (downloadButtonExists) {
        logger.logDebug("Download button already exists");
        return;
    }
    const button = createDownloadButton(small);
    button.onclick = () => __awaiter(void 0, void 0, void 0, function* () {
        const downloadId = uuid_1.v4();
        downloadButtons[downloadId] = {
            elem: button,
            onClick: button.onclick,
        };
        button.style.cursor = "default";
        button.onclick = null;
        setButtonText(button, "Preparing...");
        yield onClicked(downloadId);
    });
    parent.appendChild(button);
};
const removeElementFromParent = (element) => {
    element.parentNode.removeChild(element);
};
const removeElementsMatchingSelectors = (selectors) => {
    const elements = document.querySelectorAll(selectors);
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        removeElementFromParent(element);
    }
};
const removeBuyLinks = () => {
    const selector = "a.sc-buylink";
    removeElementsMatchingSelectors(selector);
    const event = {
        selector,
        callback: (node) => removeElementFromParent(node),
    };
    observer === null || observer === void 0 ? void 0 : observer.addEvent(event);
};
const removeDownloadButtons = () => {
    removeElementsMatchingSelectors("button.sc-button-download");
};
const createDownloadCommand = (url) => (downloadId) => {
    const set = url.includes("/sets/");
    return compatibilityStubs_1.sendMessageToBackend({
        type: set ? "DOWNLOAD_SET" : "DOWNLOAD",
        url,
        downloadId,
    });
};
const addDownloadButtonToTrackPage = () => {
    const selector = ".sc-button-group-medium > .sc-button-like";
    // ugly inline func
    const addDownloadButtonToPossiblePlaylist = (node) => {
        const downloadUrl = window.location.origin + window.location.pathname;
        const downloadCommand = createDownloadCommand(downloadUrl);
        addDownloadButtonToParent(node.parentNode, downloadCommand);
    };
    document.querySelectorAll(selector).forEach(addDownloadButtonToPossiblePlaylist);
    const event = {
        selector,
        callback: addDownloadButtonToPossiblePlaylist,
    };
    observer === null || observer === void 0 ? void 0 : observer.addEvent(event);
};
const addDownloadButtonToFeed = () => {
    const selector = ".sound.streamContext .sc-button-group > .sc-button-like";
    // ugly inline func
    const addDownloadButtonToPossiblePlaylist = (node) => {
        const soundBody = node.parentElement.closest(".sound__body");
        const titleLink = soundBody.querySelector("a.soundTitle__title");
        if (titleLink === null) {
            return;
        }
        const downloadUrl = window.location.origin + titleLink.getAttribute("href");
        const downloadCommand = createDownloadCommand(downloadUrl);
        addDownloadButtonToParent(node.parentNode, downloadCommand, true);
    };
    document.querySelectorAll(selector).forEach(addDownloadButtonToPossiblePlaylist);
    const event = {
        selector,
        callback: addDownloadButtonToPossiblePlaylist,
    };
    observer === null || observer === void 0 ? void 0 : observer.addEvent(event);
};
const handleBlockRepostsConfigChange = (blockReposts) => {
    let script = document.querySelector("#repost-blocker");
    if (blockReposts) {
        if (script) {
            logger.logWarn("Repost-Blocker script has already been injected!");
            return;
        }
        const payloadFile = compatibilityStubs_1.getPathFromExtensionFile("/js/repostBlocker.js");
        if (!payloadFile)
            return;
        logger.logInfo("Start blocking reposts");
        script = document.createElement("script");
        script.type = "text/javascript";
        script.id = "repost-blocker";
        script.src = payloadFile;
        document.documentElement.appendChild(script);
    }
    else {
        if (!script)
            return;
        logger.logInfo("Stop blocking reposts");
        const cleanupScript = document.createElement("script");
        cleanupScript.type = "text/javascript";
        cleanupScript.id = "cleanup-repost-blocker";
        cleanupScript.innerText = "XMLHttpRequest.prototype.resetSend();";
        document.documentElement.appendChild(cleanupScript);
        document.documentElement.removeChild(script);
        document.documentElement.removeChild(cleanupScript);
    }
};
const handlePageLoaded = () => __awaiter(void 0, void 0, void 0, function* () {
    observer = new domObserver_1.DomObserver();
    removeBuyLinks();
    removeDownloadButtons();
    addDownloadButtonToTrackPage();
    addDownloadButtonToFeed();
    observer.start(document.body);
    logger.logInfo("Attached!");
});
const documentState = document.readyState;
if (documentState === "complete" || documentState === "interactive") {
    setTimeout(handlePageLoaded, 0);
}
document.addEventListener("DOMContentLoaded", handlePageLoaded);
window.onbeforeunload = () => {
    observer === null || observer === void 0 ? void 0 : observer.stop();
    logger.logDebug("Unattached!");
};
function writeConfigValueToLocalStorage(key, value) {
    const item = JSON.stringify(value);
    window.localStorage.setItem("SOUNDCLOUD-DL-" + key, item);
}
config_1.loadConfiguration(true).then((config) => {
    for (const key of config_1.configKeys) {
        if (config[key].secret)
            continue;
        writeConfigValueToLocalStorage(key, config[key].value);
    }
    config_1.setOnConfigValueChanged(writeConfigValueToLocalStorage);
    if (config["block-reposts"].value)
        handleBlockRepostsConfigChange(true);
    config_1.registerConfigChangeHandler("block-reposts", handleBlockRepostsConfigChange);
});


/***/ }),

/***/ 385:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomObserver = void 0;
const logger_1 = __webpack_require__(473);
class DomObserver {
    constructor() {
        this.events = [];
        this.unqiueNodeId = 0;
        this.observer = new MutationObserver((mutations) => mutations.forEach((mutation) => this.handleMutation(mutation)));
        this.logger = logger_1.Logger.create("Observer");
    }
    start(node) {
        this.observer.observe(node, { subtree: true, attributes: true, childList: true });
        this.logger.logDebug("Started");
    }
    stop() {
        this.observer.disconnect();
        this.logger.logDebug("Stopped");
    }
    addEvent(event) {
        if (!event.selector) {
            this.logger.logWarn("Selector was not specified");
            return;
        }
        if (!event.callback) {
            this.logger.logWarn("Callback was not specified");
            return;
        }
        this.events.push(event);
        this.logger.logDebug("Event added", event);
    }
    removeEvent(name) {
        this.events = this.events.filter((event) => event.name !== name);
    }
    handleMutation(mutation) {
        var _a;
        const target = mutation.target;
        const newNodes = (_a = mutation.addedNodes) !== null && _a !== void 0 ? _a : [];
        for (const event of this.events) {
            if (newNodes.length > 0) {
                this.handleNodes(newNodes, event);
            }
            else if (mutation.type === "attributes") {
                this.handleNodes([target], event, false);
            }
        }
    }
    handleNodes(nodes, event, recursive = true) {
        var _a;
        if (!nodes)
            return;
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (this.matchesSelectors(node, event.selector)) {
                // We only want to emmit an event once
                if (node._id !== undefined)
                    return;
                node._id = ++this.unqiueNodeId;
                event.callback(node);
            }
            if (recursive && ((_a = node.childNodes) === null || _a === void 0 ? void 0 : _a.length) > 0)
                this.handleNodes(node.childNodes, event);
        }
    }
    matchesSelectors(element, selectors) {
        return element && element instanceof HTMLElement && element.matches(selectors);
    }
}
exports.DomObserver = DomObserver;


/***/ }),

/***/ 473:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Logger = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Debug"] = 0] = "Debug";
    LogLevel[LogLevel["Information"] = 1] = "Information";
    LogLevel[LogLevel["Warning"] = 2] = "Warning";
    LogLevel[LogLevel["Error"] = 3] = "Error";
    LogLevel[LogLevel["None"] = 4] = "None";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
class Logger {
    constructor(source, minLogLevel) {
        this.source = source;
        this.minLogLevel = minLogLevel;
    }
    log(logLevel, message, ...args) {
        if (logLevel < this.minLogLevel)
            return;
        const timestamp = `[${new Date().toJSON()}]`;
        const source = `[SOUNDCLOUD-DL:${this.source}]`;
        switch (logLevel) {
            case LogLevel.Error:
                console.error(timestamp, source, message, ...args);
                break;
            case LogLevel.Warning:
                console.warn(timestamp, source, message, ...args);
                break;
            case LogLevel.Information:
                console.info(timestamp, source, message, ...args);
                break;
            case LogLevel.Debug:
                console.debug(timestamp, source, message, ...args);
                break;
        }
    }
    logDebug(message, ...args) {
        this.log(LogLevel.Debug, message, ...args);
    }
    logInfo(message, ...args) {
        this.log(LogLevel.Information, message, ...args);
    }
    logWarn(message, ...args) {
        this.log(LogLevel.Warning, message, ...args);
    }
    logError(message, ...args) {
        this.log(LogLevel.Error, message, ...args);
    }
    static create(name, minLogLevel = LogLevel.Information) {
        return new Logger(name, minLogLevel);
    }
}
exports.Logger = Logger;


/***/ }),

/***/ 793:
/***/ ((module) => {



function isHighSurrogate(codePoint) {
  return codePoint >= 0xd800 && codePoint <= 0xdbff;
}

function isLowSurrogate(codePoint) {
  return codePoint >= 0xdc00 && codePoint <= 0xdfff;
}

// Truncate string by size in bytes
module.exports = function getByteLength(string) {
  if (typeof string !== "string") {
    throw new Error("Input must be string");
  }

  var charLength = string.length;
  var byteLength = 0;
  var codePoint = null;
  var prevCodePoint = null;
  for (var i = 0; i < charLength; i++) {
    codePoint = string.charCodeAt(i);
    // handle 4-byte non-BMP chars
    // low surrogate
    if (isLowSurrogate(codePoint)) {
      // when parsing previous hi-surrogate, 3 is added to byteLength
      if (prevCodePoint != null && isHighSurrogate(prevCodePoint)) {
        byteLength += 1;
      }
      else {
        byteLength += 3;
      }
    }
    else if (codePoint <= 0x7f ) {
      byteLength += 1;
    }
    else if (codePoint >= 0x80 && codePoint <= 0x7ff) {
      byteLength += 2;
    }
    else if (codePoint >= 0x800 && codePoint <= 0xffff) {
      byteLength += 3;
    }
    prevCodePoint = codePoint;
  }

  return byteLength;
};


/***/ }),

/***/ 614:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "NIL": () => /* reexport */ nil,
  "parse": () => /* reexport */ esm_browser_parse,
  "stringify": () => /* reexport */ esm_browser_stringify,
  "v1": () => /* reexport */ esm_browser_v1,
  "v3": () => /* reexport */ esm_browser_v3,
  "v4": () => /* reexport */ esm_browser_v4,
  "v5": () => /* reexport */ esm_browser_v5,
  "validate": () => /* reexport */ esm_browser_validate,
  "version": () => /* reexport */ esm_browser_version
});

;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/rng.js
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/regex.js
/* harmony default export */ const regex = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/validate.js


function validate(uuid) {
  return typeof uuid === 'string' && regex.test(uuid);
}

/* harmony default export */ const esm_browser_validate = (validate);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/stringify.js

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!esm_browser_validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const esm_browser_stringify = (stringify);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v1.js

 // **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;

var _clockseq; // Previous uuid creation time


var _lastMSecs = 0;
var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || new Array(16);
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || rng)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || esm_browser_stringify(b);
}

/* harmony default export */ const esm_browser_v1 = (v1);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/parse.js


function parse(uuid) {
  if (!esm_browser_validate(uuid)) {
    throw TypeError('Invalid UUID');
  }

  var v;
  var arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

/* harmony default export */ const esm_browser_parse = (parse);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v35.js



function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  var bytes = [];

  for (var i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
var URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
/* harmony default export */ function v35(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = esm_browser_parse(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    var bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return esm_browser_stringify(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/md5.js
/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (var i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  var output = [];
  var length32 = input.length * 32;
  var hexTab = '0123456789abcdef';

  for (var i = 0; i < length32; i += 8) {
    var x = input[i >> 5] >>> i % 32 & 0xff;
    var hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */


function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  var length8 = input.length * 8;
  var output = new Uint32Array(getOutputLength(length8));

  for (var i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

/* harmony default export */ const esm_browser_md5 = (md5);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v3.js


var v3 = v35('v3', 0x30, esm_browser_md5);
/* harmony default export */ const esm_browser_v3 = (v3);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v4.js



function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return esm_browser_stringify(rnds);
}

/* harmony default export */ const esm_browser_v4 = (v4);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/sha1.js
// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (var i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);

  for (var _i = 0; _i < N; ++_i) {
    var arr = new Uint32Array(16);

    for (var j = 0; j < 16; ++j) {
      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
    }

    M[_i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (var _i2 = 0; _i2 < N; ++_i2) {
    var W = new Uint32Array(80);

    for (var t = 0; t < 16; ++t) {
      W[t] = M[_i2][t];
    }

    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }

    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];

    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

/* harmony default export */ const esm_browser_sha1 = (sha1);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v5.js


var v5 = v35('v5', 0x50, esm_browser_sha1);
/* harmony default export */ const esm_browser_v5 = (v5);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/nil.js
/* harmony default export */ const nil = ('00000000-0000-0000-0000-000000000000');
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/version.js


function version(uuid) {
  if (!esm_browser_validate(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

/* harmony default export */ const esm_browser_version = (version);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/index.js










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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__(144);
/******/ })()
;