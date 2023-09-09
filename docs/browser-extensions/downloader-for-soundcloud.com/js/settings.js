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

/***/ 310:
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
const config_1 = __webpack_require__(913);
const logger_1 = __webpack_require__(473);
const logger = logger_1.Logger.create("Settings");
function resetSettings(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        logger.logInfo("Resetting settings...");
        yield config_1.resetConfig();
        yield restoreSettings();
    });
}
function saveSettings(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        logger.logInfo("Saving settings...");
        for (const configKey of config_1.configKeys) {
            const elem = document.querySelector(`#${configKey}`);
            if (elem === null)
                continue;
            let value;
            if (elem.type === "checkbox")
                value = elem.checked;
            else
                value = elem.value;
            yield config_1.storeConfigValue(configKey, value);
        }
        yield restoreSettings();
    });
}
function restoreSettings() {
    return __awaiter(this, void 0, void 0, function* () {
        logger.logInfo("Restoring settings...");
        try {
            yield config_1.loadConfiguration();
            for (const configKey of config_1.configKeys) {
                const elem = document.querySelector(`#${configKey}`);
                if (elem === null)
                    continue;
                const value = config_1.getConfigValue(configKey);
                if (typeof value === "boolean")
                    elem.checked = value;
                else if (typeof value === "string")
                    elem.value = value;
                const changeEvent = document.createEvent("HTMLEvents");
                changeEvent.initEvent("change", false, true);
                elem.dispatchEvent(changeEvent);
            }
        }
        catch (error) {
            logger.logError("Failed to restore settings!", error);
        }
    });
}
const downloadWithoutPromptElem = document.querySelector("#download-without-prompt");
const defaultDownloadLocationElem = document.querySelector("#default-download-location");
downloadWithoutPromptElem.onchange = (event) => {
    defaultDownloadLocationElem.disabled = !event.target.checked;
};
const blockReposts = document.querySelector("#block-reposts");
const blockPlaylists = document.querySelector("#block-playlists");
blockReposts.onchange = (event) => {
    if (!event.target.checked)
        blockPlaylists.checked = false;
};
document.addEventListener("DOMContentLoaded", restoreSettings);
document.querySelector("form").addEventListener("submit", saveSettings);
document.querySelector("form").addEventListener("reset", resetSettings);


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
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__(310);
/******/ })()
;