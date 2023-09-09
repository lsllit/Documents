/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 506:
/***/ ((module) => {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ 154:
/***/ ((module) => {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;

/***/ }),

/***/ 354:
/***/ ((module) => {

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

module.exports = _inheritsLoose;

/***/ }),

/***/ 927:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*! @name @videojs/vhs-utils @version 2.3.0 @license MIT */


function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var window = _interopDefault(__webpack_require__(908));

var atob = function atob(s) {
  return window.atob ? window.atob(s) : Buffer.from(s, 'base64').toString('binary');
};

function decodeB64ToUint8Array(b64Text) {
  var decodedString = atob(b64Text);
  var array = new Uint8Array(decodedString.length);

  for (var i = 0; i < decodedString.length; i++) {
    array[i] = decodedString.charCodeAt(i);
  }

  return array;
}

module.exports = decodeB64ToUint8Array;


/***/ }),

/***/ 388:
/***/ ((module) => {

"use strict";
/*! @name @videojs/vhs-utils @version 2.3.0 @license MIT */


/**
 * @file stream.js
 */

/**
 * A lightweight readable stream implemention that handles event dispatching.
 *
 * @class Stream
 */
var Stream =
/*#__PURE__*/
function () {
  function Stream() {
    this.listeners = {};
  }
  /**
   * Add a listener for a specified event type.
   *
   * @param {string} type the event name
   * @param {Function} listener the callback to be invoked when an event of
   * the specified type occurs
   */


  var _proto = Stream.prototype;

  _proto.on = function on(type, listener) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }

    this.listeners[type].push(listener);
  }
  /**
   * Remove a listener for a specified event type.
   *
   * @param {string} type the event name
   * @param {Function} listener  a function previously registered for this
   * type of event through `on`
   * @return {boolean} if we could turn it off or not
   */
  ;

  _proto.off = function off(type, listener) {
    if (!this.listeners[type]) {
      return false;
    }

    var index = this.listeners[type].indexOf(listener); // TODO: which is better?
    // In Video.js we slice listener functions
    // on trigger so that it does not mess up the order
    // while we loop through.
    //
    // Here we slice on off so that the loop in trigger
    // can continue using it's old reference to loop without
    // messing up the order.

    this.listeners[type] = this.listeners[type].slice(0);
    this.listeners[type].splice(index, 1);
    return index > -1;
  }
  /**
   * Trigger an event of the specified type on this stream. Any additional
   * arguments to this function are passed as parameters to event listeners.
   *
   * @param {string} type the event name
   */
  ;

  _proto.trigger = function trigger(type) {
    var callbacks = this.listeners[type];

    if (!callbacks) {
      return;
    } // Slicing the arguments on every invocation of this method
    // can add a significant amount of overhead. Avoid the
    // intermediate object creation for the common case of a
    // single callback argument


    if (arguments.length === 2) {
      var length = callbacks.length;

      for (var i = 0; i < length; ++i) {
        callbacks[i].call(this, arguments[1]);
      }
    } else {
      var args = Array.prototype.slice.call(arguments, 1);
      var _length = callbacks.length;

      for (var _i = 0; _i < _length; ++_i) {
        callbacks[_i].apply(this, args);
      }
    }
  }
  /**
   * Destroys the stream and cleans up.
   */
  ;

  _proto.dispose = function dispose() {
    this.listeners = {};
  }
  /**
   * Forwards all `data` events on this stream to the destination stream. The
   * destination stream should provide a method `push` to receive the data
   * events as they arrive.
   *
   * @param {Stream} destination the stream that will receive all `data` events
   * @see http://nodejs.org/api/stream.html#stream_readable_pipe_destination_options
   */
  ;

  _proto.pipe = function pipe(destination) {
    this.on('data', function (data) {
      destination.push(data);
    });
  };

  return Stream;
}();

module.exports = Stream;


/***/ }),

/***/ 362:
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}(this,function(){"use strict";function a(e){return String(e).split("").map(function(e){return e.charCodeAt(0)})}function o(e){return new Uint8Array(a(e))}function u(e){var t=new Uint8Array(2*e.length);return new Uint16Array(t.buffer).set(a(e)),t}return function(){var e=t.prototype;function t(e){if(!(e&&"object"==typeof e&&"byteLength"in e))throw new Error("First argument should be an instance of ArrayBuffer or Buffer");this.arrayBuffer=e,this.padding=4096,this.frames=[],this.url=""}return e._setIntegerFrame=function(e,t){var a=parseInt(t,10);this.frames.push({name:e,value:a,size:11+a.toString().length})},e._setStringFrame=function(e,t){var a=t.toString();this.frames.push({name:e,value:a,size:13+2*a.length})},e._setPictureFrame=function(e,t,a,r){var n,s,i,c=function(e){if(!e||!e.length)return null;if(255===e[0]&&216===e[1]&&255===e[2])return"image/jpeg";if(137===e[0]&&80===e[1]&&78===e[2]&&71===e[3])return"image/png";if(71===e[0]&&73===e[1]&&70===e[2])return"image/gif";if(87===e[8]&&69===e[9]&&66===e[10]&&80===e[11])return"image/webp";var t=73===e[0]&&73===e[1]&&42===e[2]&&0===e[3],a=77===e[0]&&77===e[1]&&0===e[2]&&42===e[3];return t||a?"image/tiff":66===e[0]&&77===e[1]?"image/bmp":0===e[0]&&0===e[1]&&1===e[2]&&0===e[3]?"image/x-icon":null}(new Uint8Array(t)),o=a.toString();if(!c)throw new Error("Unknown picture MIME type");a||(r=!1),this.frames.push({name:"APIC",value:t,pictureType:e,mimeType:c,useUnicodeEncoding:r,description:o,size:(n=t.byteLength,s=c.length,i=o.length,11+s+1+1+(r?2+2*(i+1):i+1)+n)})},e._setLyricsFrame=function(e,t,a){var r,n,s=e.split("").map(function(e){return e.charCodeAt(0)}),i=t.toString(),c=a.toString();this.frames.push({name:"USLT",value:c,language:s,description:i,size:(r=i.length,n=c.length,16+2*r+2+2+2*n)})},e._setCommentFrame=function(e,t,a){var r,n,s=e.split("").map(function(e){return e.charCodeAt(0)}),i=t.toString(),c=a.toString();this.frames.push({name:"COMM",value:c,language:s,description:i,size:(r=i.length,n=c.length,16+2*r+2+2+2*n)})},e._setPrivateFrame=function(e,t){var a,r,n=e.toString();this.frames.push({name:"PRIV",value:t,id:n,size:(a=n.length,r=t.byteLength,10+a+1+r)})},e._setUserStringFrame=function(e,t){var a,r,n=e.toString(),s=t.toString();this.frames.push({name:"TXXX",description:n,value:s,size:(a=n.length,r=s.length,13+2*a+2+2+2*r)})},e._setUrlLinkFrame=function(e,t){var a=t.toString();this.frames.push({name:e,value:a,size:10+a.length})},e.setFrame=function(e,t){switch(e){case"TPE1":case"TCOM":case"TCON":if(!Array.isArray(t))throw new Error(e+" frame value should be an array of strings");var a="TCON"===e?";":"/",r=t.join(a);this._setStringFrame(e,r);break;case"TLAN":case"TIT1":case"TIT2":case"TIT3":case"TALB":case"TPE2":case"TPE3":case"TPE4":case"TRCK":case"TPOS":case"TMED":case"TPUB":case"TCOP":case"TKEY":case"TEXT":case"TSRC":this._setStringFrame(e,t);break;case"TBPM":case"TLEN":case"TDAT":case"TYER":this._setIntegerFrame(e,t);break;case"USLT":if(t.language=t.language||"eng",!("object"==typeof t&&"description"in t&&"lyrics"in t))throw new Error("USLT frame value should be an object with keys description and lyrics");if(t.language&&!t.language.match(/[a-z]{3}/i))throw new Error("Language must be coded following the ISO 639-2 standards");this._setLyricsFrame(t.language,t.description,t.lyrics);break;case"APIC":if(!("object"==typeof t&&"type"in t&&"data"in t&&"description"in t))throw new Error("APIC frame value should be an object with keys type, data and description");if(t.type<0||20<t.type)throw new Error("Incorrect APIC frame picture type");this._setPictureFrame(t.type,t.data,t.description,!!t.useUnicodeEncoding);break;case"TXXX":if(!("object"==typeof t&&"description"in t&&"value"in t))throw new Error("TXXX frame value should be an object with keys description and value");this._setUserStringFrame(t.description,t.value);break;case"WCOM":case"WCOP":case"WOAF":case"WOAR":case"WOAS":case"WORS":case"WPAY":case"WPUB":this._setUrlLinkFrame(e,t);break;case"COMM":if(t.language=t.language||"eng",!("object"==typeof t&&"description"in t&&"text"in t))throw new Error("COMM frame value should be an object with keys description and text");if(t.language&&!t.language.match(/[a-z]{3}/i))throw new Error("Language must be coded following the ISO 639-2 standards");this._setCommentFrame(t.language,t.description,t.text);break;case"PRIV":if(!("object"==typeof t&&"id"in t&&"data"in t))throw new Error("PRIV frame value should be an object with keys id and data");this._setPrivateFrame(t.id,t.data);break;default:throw new Error("Unsupported frame "+e)}return this},e.removeTag=function(){if(!(this.arrayBuffer.byteLength<10)){var e,t,a=new Uint8Array(this.arrayBuffer),r=a[3],n=((e=[a[6],a[7],a[8],a[9]])[0]<<21)+(e[1]<<14)+(e[2]<<7)+e[3]+10;if(!(73!==(t=a)[0]||68!==t[1]||51!==t[2]||r<2||4<r))this.arrayBuffer=new Uint8Array(a.subarray(n)).buffer}},e.addTag=function(){this.removeTag();var e,t,r=[255,254],a=10+this.frames.reduce(function(e,t){return e+t.size},0)+this.padding,n=new ArrayBuffer(this.arrayBuffer.byteLength+a),s=new Uint8Array(n),i=0,c=[];return c=[73,68,51,3],s.set(c,i),i+=c.length,i++,i++,c=[(e=a-10)>>>21&(t=127),e>>>14&t,e>>>7&t,e&t],s.set(c,i),i+=c.length,this.frames.forEach(function(e){var t,a;switch(c=o(e.name),s.set(c,i),i+=c.length,t=e.size-10,c=[t>>>24&(a=255),t>>>16&a,t>>>8&a,t&a],s.set(c,i),i+=c.length,i+=2,e.name){case"WCOM":case"WCOP":case"WOAF":case"WOAR":case"WOAS":case"WORS":case"WPAY":case"WPUB":c=o(e.value),s.set(c,i),i+=c.length;break;case"TPE1":case"TCOM":case"TCON":case"TLAN":case"TIT1":case"TIT2":case"TIT3":case"TALB":case"TPE2":case"TPE3":case"TPE4":case"TRCK":case"TPOS":case"TKEY":case"TMED":case"TPUB":case"TCOP":case"TEXT":case"TSRC":c=[1].concat(r),s.set(c,i),i+=c.length,c=u(e.value),s.set(c,i),i+=c.length;break;case"TXXX":case"USLT":case"COMM":c=[1],"USLT"!==e.name&&"COMM"!==e.name||(c=c.concat(e.language)),c=c.concat(r),s.set(c,i),i+=c.length,c=u(e.description),s.set(c,i),i+=c.length,c=[0,0].concat(r),s.set(c,i),i+=c.length,c=u(e.value),s.set(c,i),i+=c.length;break;case"TBPM":case"TLEN":case"TDAT":case"TYER":i++,c=o(e.value),s.set(c,i),i+=c.length;break;case"PRIV":c=o(e.id),s.set(c,i),i+=c.length,i++,s.set(new Uint8Array(e.value),i),i+=e.value.byteLength;break;case"APIC":c=[e.useUnicodeEncoding?1:0],s.set(c,i),i+=c.length,c=o(e.mimeType),s.set(c,i),i+=c.length,c=[0,e.pictureType],s.set(c,i),i+=c.length,e.useUnicodeEncoding?(c=[].concat(r),s.set(c,i),i+=c.length,c=u(e.description),s.set(c,i),i+=c.length,i+=2):(c=o(e.description),s.set(c,i),i+=c.length,i++),s.set(new Uint8Array(e.value),i),i+=e.value.byteLength}}),i+=this.padding,s.set(new Uint8Array(this.arrayBuffer),i),this.arrayBuffer=n},e.getBlob=function(){return new Blob([this.arrayBuffer],{type:"audio/mpeg"})},e.getURL=function(){return this.url||(this.url=URL.createObjectURL(this.getBlob())),this.url},e.revokeURL=function(){URL.revokeObjectURL(this.url)},t}()});

/***/ }),

/***/ 150:
/***/ ((module) => {

"use strict";


module.exports = string => {
	if (typeof string !== 'string') {
		throw new TypeError('Expected a string');
	}

	// Escape characters with special meaning either inside or outside character sets.
	// Use a simple backslash escape when it’s always valid, and a \unnnn escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
	return string
		.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
		.replace(/-/g, '\\x2d');
};


/***/ }),

/***/ 908:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof __webpack_require__.g !== "undefined") {
    win = __webpack_require__.g;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;


/***/ }),

/***/ 758:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LineStream": () => /* binding */ LineStream,
/* harmony export */   "ParseStream": () => /* binding */ ParseStream,
/* harmony export */   "Parser": () => /* binding */ Parser
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(354);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _videojs_vhs_utils_dist_stream_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(388);
/* harmony import */ var _videojs_vhs_utils_dist_stream_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_videojs_vhs_utils_dist_stream_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(154);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(506);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _videojs_vhs_utils_dist_decode_b64_to_uint8_array_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(927);
/* harmony import */ var _videojs_vhs_utils_dist_decode_b64_to_uint8_array_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_videojs_vhs_utils_dist_decode_b64_to_uint8_array_js__WEBPACK_IMPORTED_MODULE_4__);
/*! @name m3u8-parser @version 4.5.0 @license Apache-2.0 */






/**
 * A stream that buffers string input and generates a `data` event for each
 * line.
 *
 * @class LineStream
 * @extends Stream
 */

var LineStream =
/*#__PURE__*/
function (_Stream) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0___default()(LineStream, _Stream);

  function LineStream() {
    var _this;

    _this = _Stream.call(this) || this;
    _this.buffer = '';
    return _this;
  }
  /**
   * Add new data to be parsed.
   *
   * @param {string} data the text to process
   */


  var _proto = LineStream.prototype;

  _proto.push = function push(data) {
    var nextNewline;
    this.buffer += data;
    nextNewline = this.buffer.indexOf('\n');

    for (; nextNewline > -1; nextNewline = this.buffer.indexOf('\n')) {
      this.trigger('data', this.buffer.substring(0, nextNewline));
      this.buffer = this.buffer.substring(nextNewline + 1);
    }
  };

  return LineStream;
}((_videojs_vhs_utils_dist_stream_js__WEBPACK_IMPORTED_MODULE_1___default()));

/**
 * "forgiving" attribute list psuedo-grammar:
 * attributes -> keyvalue (',' keyvalue)*
 * keyvalue   -> key '=' value
 * key        -> [^=]*
 * value      -> '"' [^"]* '"' | [^,]*
 */

var attributeSeparator = function attributeSeparator() {
  var key = '[^=]*';
  var value = '"[^"]*"|[^,]*';
  var keyvalue = '(?:' + key + ')=(?:' + value + ')';
  return new RegExp('(?:^|,)(' + keyvalue + ')');
};
/**
 * Parse attributes from a line given the separator
 *
 * @param {string} attributes the attribute line to parse
 */


var parseAttributes = function parseAttributes(attributes) {
  // split the string using attributes as the separator
  var attrs = attributes.split(attributeSeparator());
  var result = {};
  var i = attrs.length;
  var attr;

  while (i--) {
    // filter out unmatched portions of the string
    if (attrs[i] === '') {
      continue;
    } // split the key and value


    attr = /([^=]*)=(.*)/.exec(attrs[i]).slice(1); // trim whitespace and remove optional quotes around the value

    attr[0] = attr[0].replace(/^\s+|\s+$/g, '');
    attr[1] = attr[1].replace(/^\s+|\s+$/g, '');
    attr[1] = attr[1].replace(/^['"](.*)['"]$/g, '$1');
    result[attr[0]] = attr[1];
  }

  return result;
};
/**
 * A line-level M3U8 parser event stream. It expects to receive input one
 * line at a time and performs a context-free parse of its contents. A stream
 * interpretation of a manifest can be useful if the manifest is expected to
 * be too large to fit comfortably into memory or the entirety of the input
 * is not immediately available. Otherwise, it's probably much easier to work
 * with a regular `Parser` object.
 *
 * Produces `data` events with an object that captures the parser's
 * interpretation of the input. That object has a property `tag` that is one
 * of `uri`, `comment`, or `tag`. URIs only have a single additional
 * property, `line`, which captures the entirety of the input without
 * interpretation. Comments similarly have a single additional property
 * `text` which is the input without the leading `#`.
 *
 * Tags always have a property `tagType` which is the lower-cased version of
 * the M3U8 directive without the `#EXT` or `#EXT-X-` prefix. For instance,
 * `#EXT-X-MEDIA-SEQUENCE` becomes `media-sequence` when parsed. Unrecognized
 * tags are given the tag type `unknown` and a single additional property
 * `data` with the remainder of the input.
 *
 * @class ParseStream
 * @extends Stream
 */


var ParseStream =
/*#__PURE__*/
function (_Stream) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0___default()(ParseStream, _Stream);

  function ParseStream() {
    var _this;

    _this = _Stream.call(this) || this;
    _this.customParsers = [];
    _this.tagMappers = [];
    return _this;
  }
  /**
   * Parses an additional line of input.
   *
   * @param {string} line a single line of an M3U8 file to parse
   */


  var _proto = ParseStream.prototype;

  _proto.push = function push(line) {
    var _this2 = this;

    var match;
    var event; // strip whitespace

    line = line.trim();

    if (line.length === 0) {
      // ignore empty lines
      return;
    } // URIs


    if (line[0] !== '#') {
      this.trigger('data', {
        type: 'uri',
        uri: line
      });
      return;
    } // map tags


    var newLines = this.tagMappers.reduce(function (acc, mapper) {
      var mappedLine = mapper(line); // skip if unchanged

      if (mappedLine === line) {
        return acc;
      }

      return acc.concat([mappedLine]);
    }, [line]);
    newLines.forEach(function (newLine) {
      for (var i = 0; i < _this2.customParsers.length; i++) {
        if (_this2.customParsers[i].call(_this2, newLine)) {
          return;
        }
      } // Comments


      if (newLine.indexOf('#EXT') !== 0) {
        _this2.trigger('data', {
          type: 'comment',
          text: newLine.slice(1)
        });

        return;
      } // strip off any carriage returns here so the regex matching
      // doesn't have to account for them.


      newLine = newLine.replace('\r', ''); // Tags

      match = /^#EXTM3U/.exec(newLine);

      if (match) {
        _this2.trigger('data', {
          type: 'tag',
          tagType: 'm3u'
        });

        return;
      }

      match = /^#EXTINF:?([0-9\.]*)?,?(.*)?$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'inf'
        };

        if (match[1]) {
          event.duration = parseFloat(match[1]);
        }

        if (match[2]) {
          event.title = match[2];
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-TARGETDURATION:?([0-9.]*)?/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'targetduration'
        };

        if (match[1]) {
          event.duration = parseInt(match[1], 10);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#ZEN-TOTAL-DURATION:?([0-9.]*)?/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'totalduration'
        };

        if (match[1]) {
          event.duration = parseInt(match[1], 10);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-VERSION:?([0-9.]*)?/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'version'
        };

        if (match[1]) {
          event.version = parseInt(match[1], 10);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-MEDIA-SEQUENCE:?(\-?[0-9.]*)?/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'media-sequence'
        };

        if (match[1]) {
          event.number = parseInt(match[1], 10);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-DISCONTINUITY-SEQUENCE:?(\-?[0-9.]*)?/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'discontinuity-sequence'
        };

        if (match[1]) {
          event.number = parseInt(match[1], 10);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-PLAYLIST-TYPE:?(.*)?$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'playlist-type'
        };

        if (match[1]) {
          event.playlistType = match[1];
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-BYTERANGE:?([0-9.]*)?@?([0-9.]*)?/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'byterange'
        };

        if (match[1]) {
          event.length = parseInt(match[1], 10);
        }

        if (match[2]) {
          event.offset = parseInt(match[2], 10);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-ALLOW-CACHE:?(YES|NO)?/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'allow-cache'
        };

        if (match[1]) {
          event.allowed = !/NO/.test(match[1]);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-MAP:?(.*)$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'map'
        };

        if (match[1]) {
          var attributes = parseAttributes(match[1]);

          if (attributes.URI) {
            event.uri = attributes.URI;
          }

          if (attributes.BYTERANGE) {
            var _attributes$BYTERANGE = attributes.BYTERANGE.split('@'),
                length = _attributes$BYTERANGE[0],
                offset = _attributes$BYTERANGE[1];

            event.byterange = {};

            if (length) {
              event.byterange.length = parseInt(length, 10);
            }

            if (offset) {
              event.byterange.offset = parseInt(offset, 10);
            }
          }
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-STREAM-INF:?(.*)$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'stream-inf'
        };

        if (match[1]) {
          event.attributes = parseAttributes(match[1]);

          if (event.attributes.RESOLUTION) {
            var split = event.attributes.RESOLUTION.split('x');
            var resolution = {};

            if (split[0]) {
              resolution.width = parseInt(split[0], 10);
            }

            if (split[1]) {
              resolution.height = parseInt(split[1], 10);
            }

            event.attributes.RESOLUTION = resolution;
          }

          if (event.attributes.BANDWIDTH) {
            event.attributes.BANDWIDTH = parseInt(event.attributes.BANDWIDTH, 10);
          }

          if (event.attributes['PROGRAM-ID']) {
            event.attributes['PROGRAM-ID'] = parseInt(event.attributes['PROGRAM-ID'], 10);
          }
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-MEDIA:?(.*)$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'media'
        };

        if (match[1]) {
          event.attributes = parseAttributes(match[1]);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-ENDLIST/.exec(newLine);

      if (match) {
        _this2.trigger('data', {
          type: 'tag',
          tagType: 'endlist'
        });

        return;
      }

      match = /^#EXT-X-DISCONTINUITY/.exec(newLine);

      if (match) {
        _this2.trigger('data', {
          type: 'tag',
          tagType: 'discontinuity'
        });

        return;
      }

      match = /^#EXT-X-PROGRAM-DATE-TIME:?(.*)$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'program-date-time'
        };

        if (match[1]) {
          event.dateTimeString = match[1];
          event.dateTimeObject = new Date(match[1]);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-KEY:?(.*)$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'key'
        };

        if (match[1]) {
          event.attributes = parseAttributes(match[1]); // parse the IV string into a Uint32Array

          if (event.attributes.IV) {
            if (event.attributes.IV.substring(0, 2).toLowerCase() === '0x') {
              event.attributes.IV = event.attributes.IV.substring(2);
            }

            event.attributes.IV = event.attributes.IV.match(/.{8}/g);
            event.attributes.IV[0] = parseInt(event.attributes.IV[0], 16);
            event.attributes.IV[1] = parseInt(event.attributes.IV[1], 16);
            event.attributes.IV[2] = parseInt(event.attributes.IV[2], 16);
            event.attributes.IV[3] = parseInt(event.attributes.IV[3], 16);
            event.attributes.IV = new Uint32Array(event.attributes.IV);
          }
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-START:?(.*)$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'start'
        };

        if (match[1]) {
          event.attributes = parseAttributes(match[1]);
          event.attributes['TIME-OFFSET'] = parseFloat(event.attributes['TIME-OFFSET']);
          event.attributes.PRECISE = /YES/.test(event.attributes.PRECISE);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-CUE-OUT-CONT:?(.*)?$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'cue-out-cont'
        };

        if (match[1]) {
          event.data = match[1];
        } else {
          event.data = '';
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-CUE-OUT:?(.*)?$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'cue-out'
        };

        if (match[1]) {
          event.data = match[1];
        } else {
          event.data = '';
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-CUE-IN:?(.*)?$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'cue-in'
        };

        if (match[1]) {
          event.data = match[1];
        } else {
          event.data = '';
        }

        _this2.trigger('data', event);

        return;
      } // unknown tag type


      _this2.trigger('data', {
        type: 'tag',
        data: newLine.slice(4)
      });
    });
  }
  /**
   * Add a parser for custom headers
   *
   * @param {Object}   options              a map of options for the added parser
   * @param {RegExp}   options.expression   a regular expression to match the custom header
   * @param {string}   options.customType   the custom type to register to the output
   * @param {Function} [options.dataParser] function to parse the line into an object
   * @param {boolean}  [options.segment]    should tag data be attached to the segment object
   */
  ;

  _proto.addParser = function addParser(_ref) {
    var _this3 = this;

    var expression = _ref.expression,
        customType = _ref.customType,
        dataParser = _ref.dataParser,
        segment = _ref.segment;

    if (typeof dataParser !== 'function') {
      dataParser = function dataParser(line) {
        return line;
      };
    }

    this.customParsers.push(function (line) {
      var match = expression.exec(line);

      if (match) {
        _this3.trigger('data', {
          type: 'custom',
          data: dataParser(line),
          customType: customType,
          segment: segment
        });

        return true;
      }
    });
  }
  /**
   * Add a custom header mapper
   *
   * @param {Object}   options
   * @param {RegExp}   options.expression   a regular expression to match the custom header
   * @param {Function} options.map          function to translate tag into a different tag
   */
  ;

  _proto.addTagMapper = function addTagMapper(_ref2) {
    var expression = _ref2.expression,
        map = _ref2.map;

    var mapFn = function mapFn(line) {
      if (expression.test(line)) {
        return map(line);
      }

      return line;
    };

    this.tagMappers.push(mapFn);
  };

  return ParseStream;
}((_videojs_vhs_utils_dist_stream_js__WEBPACK_IMPORTED_MODULE_1___default()));

/**
 * A parser for M3U8 files. The current interpretation of the input is
 * exposed as a property `manifest` on parser objects. It's just two lines to
 * create and parse a manifest once you have the contents available as a string:
 *
 * ```js
 * var parser = new m3u8.Parser();
 * parser.push(xhr.responseText);
 * ```
 *
 * New input can later be applied to update the manifest object by calling
 * `push` again.
 *
 * The parser attempts to create a usable manifest object even if the
 * underlying input is somewhat nonsensical. It emits `info` and `warning`
 * events during the parse if it encounters input that seems invalid or
 * requires some property of the manifest object to be defaulted.
 *
 * @class Parser
 * @extends Stream
 */

var Parser =
/*#__PURE__*/
function (_Stream) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0___default()(Parser, _Stream);

  function Parser() {
    var _this;

    _this = _Stream.call(this) || this;
    _this.lineStream = new LineStream();
    _this.parseStream = new ParseStream();

    _this.lineStream.pipe(_this.parseStream);
    /* eslint-disable consistent-this */


    var self = _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this);
    /* eslint-enable consistent-this */


    var uris = [];
    var currentUri = {}; // if specified, the active EXT-X-MAP definition

    var currentMap; // if specified, the active decryption key

    var _key;

    var noop = function noop() {};

    var defaultMediaGroups = {
      'AUDIO': {},
      'VIDEO': {},
      'CLOSED-CAPTIONS': {},
      'SUBTITLES': {}
    }; // This is the Widevine UUID from DASH IF IOP. The same exact string is
    // used in MPDs with Widevine encrypted streams.

    var widevineUuid = 'urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed'; // group segments into numbered timelines delineated by discontinuities

    var currentTimeline = 0; // the manifest is empty until the parse stream begins delivering data

    _this.manifest = {
      allowCache: true,
      discontinuityStarts: [],
      segments: []
    }; // keep track of the last seen segment's byte range end, as segments are not required
    // to provide the offset, in which case it defaults to the next byte after the
    // previous segment

    var lastByterangeEnd = 0; // update the manifest with the m3u8 entry from the parse stream

    _this.parseStream.on('data', function (entry) {
      var mediaGroup;
      var rendition;
      ({
        tag: function tag() {
          // switch based on the tag type
          (({
            'allow-cache': function allowCache() {
              this.manifest.allowCache = entry.allowed;

              if (!('allowed' in entry)) {
                this.trigger('info', {
                  message: 'defaulting allowCache to YES'
                });
                this.manifest.allowCache = true;
              }
            },
            byterange: function byterange() {
              var byterange = {};

              if ('length' in entry) {
                currentUri.byterange = byterange;
                byterange.length = entry.length;

                if (!('offset' in entry)) {
                  /*
                   * From the latest spec (as of this writing):
                   * https://tools.ietf.org/html/draft-pantos-http-live-streaming-23#section-4.3.2.2
                   *
                   * Same text since EXT-X-BYTERANGE's introduction in draft 7:
                   * https://tools.ietf.org/html/draft-pantos-http-live-streaming-07#section-3.3.1)
                   *
                   * "If o [offset] is not present, the sub-range begins at the next byte
                   * following the sub-range of the previous media segment."
                   */
                  entry.offset = lastByterangeEnd;
                }
              }

              if ('offset' in entry) {
                currentUri.byterange = byterange;
                byterange.offset = entry.offset;
              }

              lastByterangeEnd = byterange.offset + byterange.length;
            },
            endlist: function endlist() {
              this.manifest.endList = true;
            },
            inf: function inf() {
              if (!('mediaSequence' in this.manifest)) {
                this.manifest.mediaSequence = 0;
                this.trigger('info', {
                  message: 'defaulting media sequence to zero'
                });
              }

              if (!('discontinuitySequence' in this.manifest)) {
                this.manifest.discontinuitySequence = 0;
                this.trigger('info', {
                  message: 'defaulting discontinuity sequence to zero'
                });
              }

              if (entry.duration > 0) {
                currentUri.duration = entry.duration;
              }

              if (entry.duration === 0) {
                currentUri.duration = 0.01;
                this.trigger('info', {
                  message: 'updating zero segment duration to a small value'
                });
              }

              this.manifest.segments = uris;
            },
            key: function key() {
              if (!entry.attributes) {
                this.trigger('warn', {
                  message: 'ignoring key declaration without attribute list'
                });
                return;
              } // clear the active encryption key


              if (entry.attributes.METHOD === 'NONE') {
                _key = null;
                return;
              }

              if (!entry.attributes.URI) {
                this.trigger('warn', {
                  message: 'ignoring key declaration without URI'
                });
                return;
              } // check if the content is encrypted for Widevine
              // Widevine/HLS spec: https://storage.googleapis.com/wvdocs/Widevine_DRM_HLS.pdf


              if (entry.attributes.KEYFORMAT === widevineUuid) {
                var VALID_METHODS = ['SAMPLE-AES', 'SAMPLE-AES-CTR', 'SAMPLE-AES-CENC'];

                if (VALID_METHODS.indexOf(entry.attributes.METHOD) === -1) {
                  this.trigger('warn', {
                    message: 'invalid key method provided for Widevine'
                  });
                  return;
                }

                if (entry.attributes.METHOD === 'SAMPLE-AES-CENC') {
                  this.trigger('warn', {
                    message: 'SAMPLE-AES-CENC is deprecated, please use SAMPLE-AES-CTR instead'
                  });
                }

                if (entry.attributes.URI.substring(0, 23) !== 'data:text/plain;base64,') {
                  this.trigger('warn', {
                    message: 'invalid key URI provided for Widevine'
                  });
                  return;
                }

                if (!(entry.attributes.KEYID && entry.attributes.KEYID.substring(0, 2) === '0x')) {
                  this.trigger('warn', {
                    message: 'invalid key ID provided for Widevine'
                  });
                  return;
                } // if Widevine key attributes are valid, store them as `contentProtection`
                // on the manifest to emulate Widevine tag structure in a DASH mpd


                this.manifest.contentProtection = {
                  'com.widevine.alpha': {
                    attributes: {
                      schemeIdUri: entry.attributes.KEYFORMAT,
                      // remove '0x' from the key id string
                      keyId: entry.attributes.KEYID.substring(2)
                    },
                    // decode the base64-encoded PSSH box
                    pssh: _videojs_vhs_utils_dist_decode_b64_to_uint8_array_js__WEBPACK_IMPORTED_MODULE_4___default()(entry.attributes.URI.split(',')[1])
                  }
                };
                return;
              }

              if (!entry.attributes.METHOD) {
                this.trigger('warn', {
                  message: 'defaulting key method to AES-128'
                });
              } // setup an encryption key for upcoming segments


              _key = {
                method: entry.attributes.METHOD || 'AES-128',
                uri: entry.attributes.URI
              };

              if (typeof entry.attributes.IV !== 'undefined') {
                _key.iv = entry.attributes.IV;
              }
            },
            'media-sequence': function mediaSequence() {
              if (!isFinite(entry.number)) {
                this.trigger('warn', {
                  message: 'ignoring invalid media sequence: ' + entry.number
                });
                return;
              }

              this.manifest.mediaSequence = entry.number;
            },
            'discontinuity-sequence': function discontinuitySequence() {
              if (!isFinite(entry.number)) {
                this.trigger('warn', {
                  message: 'ignoring invalid discontinuity sequence: ' + entry.number
                });
                return;
              }

              this.manifest.discontinuitySequence = entry.number;
              currentTimeline = entry.number;
            },
            'playlist-type': function playlistType() {
              if (!/VOD|EVENT/.test(entry.playlistType)) {
                this.trigger('warn', {
                  message: 'ignoring unknown playlist type: ' + entry.playlist
                });
                return;
              }

              this.manifest.playlistType = entry.playlistType;
            },
            map: function map() {
              currentMap = {};

              if (entry.uri) {
                currentMap.uri = entry.uri;
              }

              if (entry.byterange) {
                currentMap.byterange = entry.byterange;
              }
            },
            'stream-inf': function streamInf() {
              this.manifest.playlists = uris;
              this.manifest.mediaGroups = this.manifest.mediaGroups || defaultMediaGroups;

              if (!entry.attributes) {
                this.trigger('warn', {
                  message: 'ignoring empty stream-inf attributes'
                });
                return;
              }

              if (!currentUri.attributes) {
                currentUri.attributes = {};
              }

              _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()(currentUri.attributes, entry.attributes);
            },
            media: function media() {
              this.manifest.mediaGroups = this.manifest.mediaGroups || defaultMediaGroups;

              if (!(entry.attributes && entry.attributes.TYPE && entry.attributes['GROUP-ID'] && entry.attributes.NAME)) {
                this.trigger('warn', {
                  message: 'ignoring incomplete or missing media group'
                });
                return;
              } // find the media group, creating defaults as necessary


              var mediaGroupType = this.manifest.mediaGroups[entry.attributes.TYPE];
              mediaGroupType[entry.attributes['GROUP-ID']] = mediaGroupType[entry.attributes['GROUP-ID']] || {};
              mediaGroup = mediaGroupType[entry.attributes['GROUP-ID']]; // collect the rendition metadata

              rendition = {
                default: /yes/i.test(entry.attributes.DEFAULT)
              };

              if (rendition.default) {
                rendition.autoselect = true;
              } else {
                rendition.autoselect = /yes/i.test(entry.attributes.AUTOSELECT);
              }

              if (entry.attributes.LANGUAGE) {
                rendition.language = entry.attributes.LANGUAGE;
              }

              if (entry.attributes.URI) {
                rendition.uri = entry.attributes.URI;
              }

              if (entry.attributes['INSTREAM-ID']) {
                rendition.instreamId = entry.attributes['INSTREAM-ID'];
              }

              if (entry.attributes.CHARACTERISTICS) {
                rendition.characteristics = entry.attributes.CHARACTERISTICS;
              }

              if (entry.attributes.FORCED) {
                rendition.forced = /yes/i.test(entry.attributes.FORCED);
              } // insert the new rendition


              mediaGroup[entry.attributes.NAME] = rendition;
            },
            discontinuity: function discontinuity() {
              currentTimeline += 1;
              currentUri.discontinuity = true;
              this.manifest.discontinuityStarts.push(uris.length);
            },
            'program-date-time': function programDateTime() {
              if (typeof this.manifest.dateTimeString === 'undefined') {
                // PROGRAM-DATE-TIME is a media-segment tag, but for backwards
                // compatibility, we add the first occurence of the PROGRAM-DATE-TIME tag
                // to the manifest object
                // TODO: Consider removing this in future major version
                this.manifest.dateTimeString = entry.dateTimeString;
                this.manifest.dateTimeObject = entry.dateTimeObject;
              }

              currentUri.dateTimeString = entry.dateTimeString;
              currentUri.dateTimeObject = entry.dateTimeObject;
            },
            targetduration: function targetduration() {
              if (!isFinite(entry.duration) || entry.duration < 0) {
                this.trigger('warn', {
                  message: 'ignoring invalid target duration: ' + entry.duration
                });
                return;
              }

              this.manifest.targetDuration = entry.duration;
            },
            totalduration: function totalduration() {
              if (!isFinite(entry.duration) || entry.duration < 0) {
                this.trigger('warn', {
                  message: 'ignoring invalid total duration: ' + entry.duration
                });
                return;
              }

              this.manifest.totalDuration = entry.duration;
            },
            start: function start() {
              if (!entry.attributes || isNaN(entry.attributes['TIME-OFFSET'])) {
                this.trigger('warn', {
                  message: 'ignoring start declaration without appropriate attribute list'
                });
                return;
              }

              this.manifest.start = {
                timeOffset: entry.attributes['TIME-OFFSET'],
                precise: entry.attributes.PRECISE
              };
            },
            'cue-out': function cueOut() {
              currentUri.cueOut = entry.data;
            },
            'cue-out-cont': function cueOutCont() {
              currentUri.cueOutCont = entry.data;
            },
            'cue-in': function cueIn() {
              currentUri.cueIn = entry.data;
            }
          })[entry.tagType] || noop).call(self);
        },
        uri: function uri() {
          currentUri.uri = entry.uri;
          uris.push(currentUri); // if no explicit duration was declared, use the target duration

          if (this.manifest.targetDuration && !('duration' in currentUri)) {
            this.trigger('warn', {
              message: 'defaulting segment duration to the target duration'
            });
            currentUri.duration = this.manifest.targetDuration;
          } // annotate with encryption information, if necessary


          if (_key) {
            currentUri.key = _key;
          }

          currentUri.timeline = currentTimeline; // annotate with initialization segment information, if necessary

          if (currentMap) {
            currentUri.map = currentMap;
          } // prepare for the next URI


          currentUri = {};
        },
        comment: function comment() {// comments are not important for playback
        },
        custom: function custom() {
          // if this is segment-level data attach the output to the segment
          if (entry.segment) {
            currentUri.custom = currentUri.custom || {};
            currentUri.custom[entry.customType] = entry.data; // if this is manifest-level data attach to the top level manifest object
          } else {
            this.manifest.custom = this.manifest.custom || {};
            this.manifest.custom[entry.customType] = entry.data;
          }
        }
      })[entry.type].call(self);
    });

    return _this;
  }
  /**
   * Parse the input string and update the manifest object.
   *
   * @param {string} chunk a potentially incomplete portion of the manifest
   */


  var _proto = Parser.prototype;

  _proto.push = function push(chunk) {
    this.lineStream.push(chunk);
  }
  /**
   * Flush any remaining input. This can be handy if the last line of an M3U8
   * manifest did not contain a trailing newline but the file has been
   * completely received.
   */
  ;

  _proto.end = function end() {
    // flush any buffered input
    this.lineStream.push('\n');
  }
  /**
   * Add an additional parser for non-standard tags
   *
   * @param {Object}   options              a map of options for the added parser
   * @param {RegExp}   options.expression   a regular expression to match the custom header
   * @param {string}   options.type         the type to register to the output
   * @param {Function} [options.dataParser] function to parse the line into an object
   * @param {boolean}  [options.segment]    should tag data be attached to the segment object
   */
  ;

  _proto.addParser = function addParser(options) {
    this.parseStream.addParser(options);
  }
  /**
   * Add a custom header mapper
   *
   * @param {Object}   options
   * @param {RegExp}   options.expression   a regular expression to match the custom header
   * @param {Function} options.map          function to translate tag into a different tag
   */
  ;

  _proto.addTagMapper = function addTagMapper(options) {
    this.parseStream.addTagMapper(options);
  };

  return Parser;
}((_videojs_vhs_utils_dist_stream_js__WEBPACK_IMPORTED_MODULE_1___default()));




/***/ }),

/***/ 202:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
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

"use strict";


var truncate = __webpack_require__(156);
var getLength = __webpack_require__(793);
module.exports = truncate.bind(null, getLength);


/***/ }),

/***/ 156:
/***/ ((module) => {

"use strict";


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

/***/ 136:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
const soundcloudApi_1 = __webpack_require__(246);
const logger_1 = __webpack_require__(473);
const compatibilityStubs_1 = __webpack_require__(534);
const metadataExtractor_1 = __webpack_require__(650);
const mp3TagWriter_1 = __webpack_require__(542);
const config_1 = __webpack_require__(913);
const mp4TagWriter_1 = __webpack_require__(823);
const m3u8_parser_1 = __webpack_require__(758);
const sanitize_filename_1 = __importDefault(__webpack_require__(202));
const soundcloudApi = new soundcloudApi_1.SoundCloudApi();
const logger = logger_1.Logger.create("Background");
const manifest = compatibilityStubs_1.getExtensionManifest();
logger.logInfo("Starting with version: " + manifest.version);
config_1.loadConfiguration(true);
function concatArrayBuffers(buffers) {
    const totalLength = buffers.reduce((acc, cur) => acc + cur.byteLength, 0);
    const mergedBuffer = new Uint8Array(totalLength);
    let bufferOffset = 0;
    for (const buffer of buffers) {
        mergedBuffer.set(new Uint8Array(buffer), bufferOffset);
        bufferOffset += buffer.byteLength;
    }
    return mergedBuffer.buffer;
}
function sanitize(input, options) {
    const sanitized = sanitize_filename_1.default(input, options);
    return sanitized.replace(/\s{2,}/, " ");
}
function handleDownload(data, reportProgress) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // todo: one big try-catch is not really good error handling :/
        try {
            logger.logInfo("Initiating download with payload", { payload: data });
            let artistsString = data.username;
            let titleString = data.title;
            if (config_1.getConfigValue("normalize-track")) {
                const extractor = new metadataExtractor_1.MetadataExtractor(data.title, data.username);
                let artists = extractor.getArtists();
                if (!config_1.getConfigValue("include-producers"))
                    artists = artists.filter((i) => i.type !== metadataExtractor_1.ArtistType.Producer);
                artistsString = artists.map((i) => i.name).join(", ");
                titleString = extractor.getTitle();
                const remixers = artists.filter((i) => i.type === metadataExtractor_1.ArtistType.Remixer);
                if (remixers.length > 0) {
                    const remixerNames = remixers.map((i) => i.name).join(" & ");
                    const remixTypeString = metadataExtractor_1.RemixType[remixers[0].remixType || metadataExtractor_1.RemixType.Remix].toString();
                    titleString += ` (${remixerNames} ${remixTypeString})`;
                }
            }
            const rawFilename = `${artistsString} - ${titleString}`;
            let artworkUrl = data.artworkUrl;
            if (!artworkUrl) {
                logger.logInfo("No Artwork URL could be determined. Fallback to User Avatar");
                artworkUrl = data.avatarUrl;
            }
            logger.logInfo(`Starting download of '${rawFilename}'...`);
            let streamBuffer;
            let streamHeaders;
            if (data.hls) {
                try {
                    const playlistReq = yield fetch(data.streamUrl);
                    const playlist = yield playlistReq.text();
                    // @ts-ignore
                    const parser = new m3u8_parser_1.Parser();
                    parser.push(playlist);
                    parser.end();
                    const segmentUrls = parser.manifest.segments.map((i) => i.uri);
                    const segments = [];
                    for (let i = 0; i < segmentUrls.length; i++) {
                        const segmentReq = yield fetch(segmentUrls[i]);
                        const segment = yield segmentReq.arrayBuffer();
                        segments.push(segment);
                        const progress = Math.round((i / segmentUrls.length) * 100);
                        reportProgress(progress);
                    }
                    reportProgress(100);
                    streamBuffer = concatArrayBuffers(segments);
                }
                catch (error) {
                    logger.logError("Failed to download m3u8 playlist", error);
                    throw error;
                }
            }
            else {
                try {
                    [streamBuffer, streamHeaders] = yield soundcloudApi.downloadStream(data.streamUrl, reportProgress);
                }
                catch (error) {
                    logger.logError("Failed to download stream", error);
                    throw error;
                }
            }
            if (!streamBuffer) {
                throw new Error("Undefined streamBuffer");
            }
            let contentType;
            if (!data.fileExtension && streamHeaders) {
                contentType = streamHeaders.get("content-type");
                let extension = "mp3";
                if (contentType.startsWith("audio/mp4"))
                    extension = "m4a";
                else if (contentType.startsWith("audio/x-wav"))
                    extension = "wav";
                data.fileExtension = extension;
                logger.logInfo("Inferred file extension from 'content-type' header", { contentType, extension });
            }
            let writer;
            let downloadBlob;
            try {
                if (data.fileExtension === "m4a") {
                    const mp4Writer = new mp4TagWriter_1.Mp4TagWriter(streamBuffer);
                    mp4Writer.setDuration(data.duration);
                    writer = mp4Writer;
                }
                else if (data.fileExtension === "mp3") {
                    writer = new mp3TagWriter_1.Mp3TagWriter(streamBuffer);
                }
                if (writer) {
                    writer.setTitle(titleString);
                    // todo: sanitize album as well
                    writer.setAlbum((_a = data.albumName) !== null && _a !== void 0 ? _a : titleString);
                    writer.setArtists([artistsString]);
                    writer.setComment("https://github.com/NotTobi/soundcloud-dl");
                    if (data.trackNumber > 0) {
                        writer.setTrackNumber(data.trackNumber);
                    }
                    const releaseYear = data.uploadDate.getFullYear();
                    writer.setYear(releaseYear);
                    if (artworkUrl) {
                        const sizeOptions = ["original", "t500x500", "large"];
                        let artworkBuffer = null;
                        let curArtworkUrl;
                        do {
                            const curSizeOption = sizeOptions.shift();
                            curArtworkUrl = artworkUrl.replace("-large.", `-${curSizeOption}.`);
                            artworkBuffer = yield soundcloudApi.downloadArtwork(curArtworkUrl);
                        } while (artworkBuffer === null && sizeOptions.length > 0);
                        if (artworkBuffer) {
                            writer.setArtwork(artworkBuffer);
                        }
                    }
                    else {
                        logger.logWarn("Skipping download of Artwork");
                    }
                    downloadBlob = writer.getBlob();
                }
            }
            catch (error) {
                logger.logError("Failed to set metadata", error);
                writer = null;
            }
            // todo: once we get here the streambuffer could've been corrupted
            if (!writer) {
                const options = {};
                if (contentType)
                    options.type = contentType;
                downloadBlob = new Blob([streamBuffer], options);
            }
            const saveAs = !config_1.getConfigValue("download-without-prompt");
            const defaultDownloadLocation = config_1.getConfigValue("default-download-location");
            let downloadFilename = rawFilename + "." + data.fileExtension;
            downloadFilename = sanitize(downloadFilename);
            if (!saveAs && defaultDownloadLocation) {
                downloadFilename = defaultDownloadLocation + "/" + downloadFilename;
            }
            logger.logInfo(`Downloading tack as \"${downloadFilename}\"`);
            let downloadUrl;
            try {
                downloadUrl = URL.createObjectURL(downloadBlob);
                yield compatibilityStubs_1.downloadToFile(downloadUrl, downloadFilename, saveAs);
                logger.logInfo(`Successfully downloaded '${rawFilename}'!`);
                reportProgress(101);
            }
            catch (error) {
                logger.logError("Failed to download track to file system", { downloadFilename, saveAs });
                reportProgress(undefined, "Failed to download track to file system");
            }
            finally {
                if (downloadUrl)
                    URL.revokeObjectURL(downloadUrl);
            }
        }
        catch (error) {
            logger.logError("Unknown error", error);
            reportProgress(undefined, "Encountered unknown error");
        }
    });
}
function getTranscodingDetails(details) {
    var _a, _b;
    if (((_b = (_a = details === null || details === void 0 ? void 0 : details.media) === null || _a === void 0 ? void 0 : _a.transcodings) === null || _b === void 0 ? void 0 : _b.length) < 1)
        return null;
    const mpegStreams = details.media.transcodings.filter((i) => {
        var _a, _b, _c, _d, _e, _f;
        return (((_a = i.format) === null || _a === void 0 ? void 0 : _a.protocol) === "progressive" || ((_b = i.format) === null || _b === void 0 ? void 0 : _b.protocol) === "hls") &&
            (((_d = (_c = i.format) === null || _c === void 0 ? void 0 : _c.mime_type) === null || _d === void 0 ? void 0 : _d.startsWith("audio/mpeg")) || ((_f = (_e = i.format) === null || _e === void 0 ? void 0 : _e.mime_type) === null || _f === void 0 ? void 0 : _f.startsWith("audio/mp4"))) &&
            !i.snipped;
    });
    if (mpegStreams.length < 1) {
        logger.logError("No streams could be found found!");
        return null;
    }
    // prefer 'progressive' streams
    const sortedStreams = mpegStreams.sort((a, b) => {
        if (a.format.protocol === "progressive" && b.format.protocol === "hls") {
            return -1;
        }
        else if (a.format.protocol === "hls" && b.format.protocol === "progressive") {
            return 1;
        }
        return 0;
    });
    const hqStreams = sortedStreams.filter((i) => i.quality === "hq");
    const nonHqStreams = sortedStreams.filter((i) => i.quality !== "hq");
    if (config_1.getConfigValue("download-hq-version") && hqStreams.length > 0) {
        logger.logInfo("Using High Quality Stream!");
        return {
            url: hqStreams[0].url,
            protocol: hqStreams[0].format.protocol,
        };
    }
    return {
        url: nonHqStreams[0].url,
        protocol: nonHqStreams[0].format.protocol,
    };
}
// -------------------- HANDLERS --------------------
const authRegex = new RegExp("OAuth (.+)");
const followerIdRegex = new RegExp("/me/followings/(\\d+)");
compatibilityStubs_1.onBeforeSendHeaders((details) => {
    let requestHasAuth = false;
    if (details.requestHeaders && config_1.getConfigValue("oauth-token") !== null) {
        for (let i = 0; i < details.requestHeaders.length; i++) {
            if (details.requestHeaders[i].name.toLowerCase() !== "authorization")
                continue;
            requestHasAuth = true;
            const authHeader = details.requestHeaders[i].value;
            const result = authRegex.exec(authHeader);
            if (!result || result.length < 2)
                continue;
            config_1.storeConfigValue("oauth-token", result[1]);
        }
        const oauthToken = config_1.getConfigValue("oauth-token");
        if (!requestHasAuth && oauthToken) {
            logger.logDebug("Adding OAuth token to request...", { oauthToken });
            details.requestHeaders.push({
                name: "Authorization",
                value: "OAuth " + oauthToken,
            });
            return {
                requestHeaders: details.requestHeaders,
            };
        }
    }
}, ["*://api-v2.soundcloud.com/*"], ["blocking", "requestHeaders"]);
compatibilityStubs_1.onBeforeRequest((details) => {
    const url = new URL(details.url);
    if (url.pathname === "/connect/session" && config_1.getConfigValue("oauth-token") === null) {
        logger.logInfo("User logged in");
        config_1.storeConfigValue("oauth-token", undefined);
    }
    else if (url.pathname === "/sign-out") {
        logger.logInfo("User logged out");
        config_1.storeConfigValue("oauth-token", null);
        config_1.storeConfigValue("user-id", null);
        config_1.storeConfigValue("client-id", null);
        config_1.storeConfigValue("followed-artists", []);
    }
    else if (url.pathname.startsWith("/me/followings/")) {
        const followerIdMatch = followerIdRegex.exec(url.pathname);
        if (followerIdMatch.length === 2) {
            const followerId = +followerIdMatch[1];
            if (!!followerId) {
                let followedArtists = config_1.getConfigValue("followed-artists");
                if (details.method === "POST") {
                    followedArtists = [...followedArtists, followerId];
                }
                else if (details.method === "DELETE") {
                    followedArtists = followedArtists.filter((i) => i !== followerId);
                }
                config_1.storeConfigValue("followed-artists", followedArtists);
            }
        }
    }
    else {
        const clientId = url.searchParams.get("client_id");
        const storedClientId = config_1.getConfigValue("client-id");
        if (clientId) {
            config_1.storeConfigValue("client-id", clientId);
        }
        else if (storedClientId) {
            logger.logDebug("Adding ClientId to unauthenticated request...", { url, clientId: storedClientId });
            url.searchParams.append("client_id", storedClientId);
            return {
                redirectUrl: url.toString(),
            };
        }
    }
}, ["*://api-v2.soundcloud.com/*", "*://api-auth.soundcloud.com/*"], ["blocking"]);
function isValidTrack(track) {
    return track && track.kind === "track" && track.state === "finished" && (track.streamable || track.downloadable);
}
function downloadTrack(track, trackNumber, albumName, reportProgress) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!isValidTrack(track)) {
            logger.logError("Track does not satisfy constraints needed to be downloadable", track);
            reportProgress(undefined, "Track does not satisfy constraints needed to be downloadable");
            return;
        }
        let stream;
        if (config_1.getConfigValue("download-original-version") && track.downloadable && track.has_downloads_left) {
            const originalDownloadUrl = yield soundcloudApi.getOriginalDownloadUrl(track.id);
            if (originalDownloadUrl) {
                stream = {
                    url: originalDownloadUrl,
                    hls: false,
                };
            }
        }
        if (!stream) {
            const streamDetails = getTranscodingDetails(track);
            if (!streamDetails) {
                logger.logError("Stream details could not be determined", track);
                reportProgress(undefined, "Stream details could not be determined");
                return;
            }
            stream = yield soundcloudApi.getStreamDetails(streamDetails.url);
        }
        if (!stream) {
            logger.logError("Stream could not be determined");
            reportProgress(undefined, "Stream could not be determined");
            return;
        }
        const downloadData = {
            duration: track.duration,
            uploadDate: new Date(track.display_date),
            streamUrl: stream.url,
            fileExtension: stream.extension,
            title: track.title,
            username: track.user.username,
            artworkUrl: track.artwork_url,
            avatarUrl: track.user.avatar_url,
            trackNumber,
            albumName,
            hls: stream.hls,
        };
        yield handleDownload(downloadData, reportProgress);
    });
}
function sendDownloadProgress(tabId, downloadId, progress, error) {
    const downloadProgress = {
        downloadId,
        progress,
        error,
    };
    compatibilityStubs_1.sendMessageToTab(tabId, downloadProgress);
}
compatibilityStubs_1.onMessage((sender, message) => __awaiter(void 0, void 0, void 0, function* () {
    const tabId = sender.tab.id;
    const { downloadId, url, type } = message;
    if (!tabId)
        return;
    try {
        if (type === "DOWNLOAD_SET") {
            const set = yield soundcloudApi.resolveUrl(url);
            const isAlbum = set.set_type === "album" || set.set_type === "ep";
            const trackIds = set.tracks.map((i) => i.id);
            const keyedTracks = yield soundcloudApi.getTracks(trackIds);
            const tracks = Object.values(keyedTracks).reverse();
            logger.logInfo(`Downloading ${isAlbum ? "album" : "playlist"}...`);
            const downloads = [];
            const progresses = {};
            const reportPlaylistProgress = (trackId) => (progress, error) => {
                if (progress) {
                    progresses[trackId] = progress;
                }
                const totalProgress = Object.values(progresses).reduce((acc, cur) => acc + cur, 0);
                sendDownloadProgress(tabId, downloadId, totalProgress / trackIds.length, error);
            };
            const treatAsAlbum = isAlbum && tracks.length > 1;
            for (let i = 0; i < tracks.length; i++) {
                const trackNumber = treatAsAlbum ? i + 1 : undefined;
                const albumName = treatAsAlbum ? set.title : undefined;
                const download = downloadTrack(tracks[i], trackNumber, albumName, reportPlaylistProgress(tracks[i].id));
                downloads.push(download);
            }
            yield Promise.all(downloads);
            logger.logInfo(`Downloaded ${isAlbum ? "album" : "playlist"}!`);
        }
        else if (type === "DOWNLOAD") {
            const track = yield soundcloudApi.resolveUrl(url);
            const reportTrackProgress = (progress, error) => {
                sendDownloadProgress(tabId, downloadId, progress, error);
            };
            yield downloadTrack(track, undefined, undefined, reportTrackProgress);
        }
        else {
            throw new Error("Unknown download type");
        }
    }
    catch (error) {
        sendDownloadProgress(tabId, downloadId, undefined, error);
        logger.logError("Failed init initialize download", error);
    }
}));
compatibilityStubs_1.onPageActionClicked(() => {
    compatibilityStubs_1.openOptionsPage();
});
const oauthTokenChanged = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token)
        return;
    const user = yield soundcloudApi.getCurrentUser();
    if (!user) {
        logger.logError("Failed to fetch currently logged in user");
        return;
    }
    config_1.storeConfigValue("user-id", user.id);
    logger.logInfo("Logged in as", user.username);
    const followedArtistIds = yield soundcloudApi.getFollowedArtistIds(user.id);
    if (!followedArtistIds) {
        logger.logError("Failed to fetch ids of followed artists");
        return;
    }
    config_1.storeConfigValue("followed-artists", followedArtistIds);
});
config_1.registerConfigChangeHandler("oauth-token", oauthTokenChanged);


/***/ }),

/***/ 534:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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

"use strict";

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

"use strict";

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

/***/ 650:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MetadataExtractor = exports.getRemixTypeFromString = exports.RemixType = exports.ArtistType = void 0;
const escape_string_regexp_1 = __importDefault(__webpack_require__(150));
var ArtistType;
(function (ArtistType) {
    ArtistType[ArtistType["Main"] = 0] = "Main";
    ArtistType[ArtistType["Feature"] = 1] = "Feature";
    ArtistType[ArtistType["Remixer"] = 2] = "Remixer";
    ArtistType[ArtistType["Producer"] = 3] = "Producer";
})(ArtistType = exports.ArtistType || (exports.ArtistType = {}));
var RemixType;
(function (RemixType) {
    RemixType[RemixType["Remix"] = 0] = "Remix";
    RemixType[RemixType["Flip"] = 1] = "Flip";
    RemixType[RemixType["Bootleg"] = 2] = "Bootleg";
    RemixType[RemixType["Mashup"] = 3] = "Mashup";
    RemixType[RemixType["Edit"] = 4] = "Edit";
})(RemixType = exports.RemixType || (exports.RemixType = {}));
function getRemixTypeFromString(input) {
    const loweredInput = input.toLowerCase().trim();
    switch (loweredInput) {
        case "flip":
            return RemixType.Flip;
        case "bootleg":
            return RemixType.Bootleg;
        case "mashup":
            return RemixType.Mashup;
        case "edit":
            return RemixType.Edit;
        case "remix":
        default:
            return RemixType.Remix;
    }
}
exports.getRemixTypeFromString = getRemixTypeFromString;
function stableSort(input, prop) {
    const storedPositions = input.map((data, index) => ({
        data,
        index,
    }));
    return storedPositions
        .sort((a, b) => {
        if (a.data[prop] < b.data[prop])
            return -1;
        if (a.data[prop] > b.data[prop])
            return 1;
        return a.index - b.index;
    })
        .map((i) => i.data);
}
class MetadataExtractor {
    constructor(title, username) {
        this.title = title;
        this.username = username;
    }
    getArtists() {
        let artists = [];
        const titleSplit = this.splitByTitleSeperators(this.title, true);
        // artists before the title seperator, e.g. >artist< - title
        artists = artists.concat(titleSplit.artistNames.map((name, index) => ({
            name,
            type: index === 0 ? ArtistType.Main : ArtistType.Feature,
        })));
        // producers after the title seperator, e.g. artist - title (prod. >artist<)
        // we expect the producer section to be last, if not everthing fails :(
        const producerSplit = this.splitByProducer(titleSplit.title, true);
        artists = artists.concat(producerSplit.artistNames.map((name) => ({
            name,
            type: ArtistType.Producer,
        })));
        // remixers after the title seperator, e.g. artist - title (>artist< Remix)
        const remixSplit = this.splitByRemix(producerSplit.title, true);
        artists = artists.concat(remixSplit.artists);
        // features after the title seperator, e.g. artist - title (ft. >artist<)
        const featureSplit = this.splitByFeatures(remixSplit.title, true);
        artists = artists.concat(featureSplit.artistNames.map((name) => ({
            name,
            type: ArtistType.Feature,
        })));
        const hasMainArtist = artists.some((i) => i.type === ArtistType.Main);
        if (!hasMainArtist) {
            const user = {
                name: this.sanitizeArtistName(this.username),
                type: ArtistType.Main,
            };
            if (artists.length > 0) {
                artists = [user, ...artists];
            }
            else {
                artists.push(user);
            }
        }
        artists = artists.map((artist) => this.removeTwitterHandle(artist));
        // Distinct (not sure if this works with objects)
        artists = [...new Set(artists)];
        // sort by importance
        artists = stableSort(artists, "type");
        return artists;
    }
    getTitle() {
        let title = this.title;
        title = this.splitByTitleSeperators(title, false).title;
        title = this.splitByProducer(title, false).title;
        title = this.splitByRemix(title, false).title;
        title = this.splitByFeatures(title, false).title;
        return this.sanitizeTitle(title);
    }
    removeTwitterHandle(artist) {
        const regex = new RegExp("^([^\\(]+)\\s?\\(?\\s?@.+\\)?$");
        const result = regex.exec(artist.name);
        if (result && result.length > 1) {
            artist.name = result[1].trimEnd();
        }
        return artist;
    }
    splitByTitleSeperators(title, extractArtists) {
        let artistNames = [];
        if (this.includes(title, MetadataExtractor.titleSeperators)) {
            const seperators = this.escapeRegexArray(MetadataExtractor.titleSeperators);
            const regex = new RegExp(`^((.+)\\s[${seperators}]\\s)(.+)$`);
            const result = regex.exec(title);
            if (result && result.length > 0) {
                const [_, artistSection, artistString] = result;
                if (extractArtists) {
                    artistNames = this.getArtistNames(artistString);
                }
                title = title.replace(artistSection, "");
            }
        }
        return {
            artistNames,
            title,
        };
    }
    splitByFeatures(title, extractArtists) {
        let artistNames = [];
        if (this.includes(title, MetadataExtractor.featureSeperators)) {
            const seperators = this.escapeRegexArray(MetadataExtractor.featureSeperators).join("|");
            const regex = new RegExp(`\\[?\\(?(${seperators})([^\\[\\]\\(\\)]+)\\[?\\]?\\(?\\)?`, "i");
            const result = regex.exec(title);
            if (result && result.length > 0) {
                const [featureSection, _, artistsString] = result;
                if (extractArtists) {
                    artistNames = this.getArtistNames(artistsString);
                }
                title = title.replace(featureSection, "");
            }
        }
        return {
            artistNames,
            title,
        };
    }
    splitByProducer(title, extractArtists) {
        let artistNames = [];
        if (this.includes(title, MetadataExtractor.producerIndicators)) {
            const seperators = this.escapeRegexArray(MetadataExtractor.producerIndicators).join("|");
            const regex = new RegExp(`\\[?\\(?(${seperators})([^\\[\\]\\(\\)]+)\\[?\\]?\\(?\\)?`, "i");
            const result = regex.exec(title);
            if (result && result.length > 0) {
                const [producerSection, _, artistsString] = result;
                if (extractArtists) {
                    artistNames = this.getArtistNames(artistsString);
                }
                title = title.replace(producerSection, "");
            }
        }
        return {
            artistNames,
            title,
        };
    }
    splitByRemix(title, extractArtists) {
        let artists = [];
        if (this.includes(title, MetadataExtractor.remixIndicators)) {
            const seperators = this.escapeRegexArray(MetadataExtractor.remixIndicators).join("|");
            const regex = new RegExp(`[\\[\\(](.+)(${seperators})[\\]\\)]`, "i");
            const result = regex.exec(title);
            if (result && result.length > 0) {
                const [remixSection, artistsString, remixTypeString] = result;
                if (extractArtists) {
                    const artistNames = this.getArtistNames(artistsString);
                    const remixType = getRemixTypeFromString(remixTypeString);
                    artists = artistNames.map((name) => ({
                        name,
                        type: ArtistType.Remixer,
                        remixType,
                    }));
                }
                title = title.replace(remixSection, "");
            }
        }
        return {
            artists,
            title,
        };
    }
    getArtistNames(input) {
        const seperators = this.escapeRegexArray(MetadataExtractor.combiningFeatureSeperators).join("|");
        const regex = new RegExp(`(.+)\\s?(${seperators})\\s?(.+)`, "i");
        const names = [];
        while (true) {
            const result = regex.exec(input);
            if (!result) {
                names.push(this.sanitizeArtistName(input));
                break;
            }
            names.push(this.sanitizeArtistName(result[3]));
            input = result[1];
        }
        return names.reverse();
    }
    sanitizeArtistName(input) {
        return input.trim();
    }
    sanitizeTitle(input) {
        return input.trim();
    }
    includes(input, seperators) {
        const loweredInput = input.toLowerCase();
        return seperators.some((seperator) => loweredInput.includes(seperator));
    }
    escapeRegexArray(input) {
        return input.map((i) => escape_string_regexp_1.default(i));
    }
}
exports.MetadataExtractor = MetadataExtractor;
MetadataExtractor.titleSeperators = ["-", "–", "—", "~"];
MetadataExtractor.featureSeperators = ["featuring", "feat.", "feat", "ft.", "ft", "w/", " w /"];
MetadataExtractor.combiningFeatureSeperators = [...MetadataExtractor.featureSeperators, ",", "&", " x "];
MetadataExtractor.remixIndicators = ["remix", "flip", "bootleg", "mashup", "edit"];
MetadataExtractor.producerIndicators = ["prod. by", "prod by", "prod.", "prod", "p."];
MetadataExtractor.promotions = ["free", "free download", "video in description"];


/***/ }),

/***/ 542:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Mp3TagWriter = void 0;
const browser_id3_writer_1 = __importDefault(__webpack_require__(362));
class Mp3TagWriter {
    constructor(buffer) {
        this.writer = new browser_id3_writer_1.default(buffer);
    }
    setTitle(title) {
        if (!title)
            throw new Error("Invalid value for title");
        this.writer.setFrame("TIT2", title);
    }
    setArtists(artists) {
        if (!artists || artists.length < 1)
            throw new Error("Invalid value for artists");
        this.writer.setFrame("TPE1", artists);
    }
    setAlbum(album) {
        if (!album)
            throw new Error("Invalid value for album");
        this.writer.setFrame("TALB", album);
    }
    setComment(comment) {
        if (!comment)
            throw new Error("Invalid value for comment");
        this.writer.setFrame("COMM", {
            text: comment,
            description: "",
        });
    }
    setTrackNumber(trackNumber) {
        // not sure what the highest track number is for ID3, but let's assume it's the max value of short
        if (trackNumber < 1 || trackNumber > 32767)
            throw new Error("Invalid value for trackNumber");
        this.writer.setFrame("TRCK", trackNumber);
    }
    setYear(year) {
        if (year < 1)
            throw new Error("Invalud value for year");
        this.writer.setFrame("TYER", year);
    }
    setArtwork(artworkBuffer) {
        if (!artworkBuffer || artworkBuffer.byteLength < 1)
            throw new Error("Invalid value for artworkBuffer");
        this.writer.setFrame("APIC", {
            type: 3,
            data: artworkBuffer,
            description: "",
        });
    }
    getBlob() {
        this.writer.addTag();
        return this.writer.getBlob();
    }
}
exports.Mp3TagWriter = Mp3TagWriter;


/***/ }),

/***/ 823:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Mp4TagWriter = void 0;
// length(4) + name(4)
const ATOM_HEAD_LENGTH = 8;
// data-length(4) + data-name(4) + data-flags(4)
const ATOM_DATA_HEAD_LENGTH = 16;
const ATOM_HEADER_LENGTH = ATOM_HEAD_LENGTH + ATOM_DATA_HEAD_LENGTH;
class Mp4 {
    constructor(buffer) {
        this._metadataPath = ["moov", "udta", "meta", "ilst"];
        this._atoms = [];
        this._buffer = buffer;
        this._bufferView = new DataView(buffer);
    }
    parse() {
        if (!this._buffer)
            throw new Error("Buffer can not be null");
        if (this._atoms.length > 0)
            throw new Error("Buffer already parsed");
        let offset = 0;
        let atom;
        while (true) {
            atom = this._readAtom(offset);
            if (!atom || atom.length < 1)
                break;
            this._atoms.push(atom);
            offset = atom.offset + atom.length;
        }
        if (this._atoms.length < 1)
            throw new Error("Buffer could not be parsed");
    }
    setDuration(duration) {
        const mvhdAtom = this._findAtom(this._atoms, ["moov", "mvhd"]);
        if (!mvhdAtom)
            throw new Error("'mvhd' atom could not be found");
        // version(4) + created(4) + modified(4) + timescale(4)
        const precedingDataLength = 16;
        this._bufferView.setUint32(mvhdAtom.offset + ATOM_HEAD_LENGTH + precedingDataLength, duration);
    }
    addMetadataAtom(name, data) {
        if (name.length > 4 || name.length < 1)
            throw new Error(`Unsupported atom name: '${name}'`);
        let dataBuffer;
        if (data instanceof ArrayBuffer) {
            dataBuffer = data;
        }
        else if (typeof data === "string") {
            dataBuffer = this._getBufferFromString(data);
        }
        else if (typeof data === "number") {
            dataBuffer = new ArrayBuffer(4);
            const dataView = new DataView(dataBuffer);
            dataView.setUint32(0, data);
        }
        else {
            throw new Error(`Unsupported data: '${data}'`);
        }
        const atom = {
            name,
            length: ATOM_HEADER_LENGTH + dataBuffer.byteLength,
            data: dataBuffer,
        };
        this._insertAtom(atom, this._metadataPath);
    }
    getBlob() {
        const buffers = [];
        let bufferIndex = 0;
        // we don't change the offsets, since it would add needless complexity without benefit
        for (const atom of this._atoms) {
            if (!atom.children) {
                // nothing has been added or removed
                const slice = this._buffer.slice(atom.offset, atom.offset + atom.length);
                buffers.push(slice);
                bufferIndex++;
                continue;
            }
            atom.length = ATOM_HEAD_LENGTH;
            const levels = [{ parent: atom, offset: bufferIndex, childIndex: 0 }];
            let levelIndex = 0;
            while (true) {
                const { parent, offset, childIndex } = levels[levelIndex];
                if (childIndex >= parent.children.length) {
                    // move one level up
                    levelIndex--;
                    levels.pop();
                    let parentHeadLength = ATOM_HEAD_LENGTH;
                    if (parent.name === "meta") {
                        parent.length += 4;
                        parentHeadLength += 4;
                    }
                    else if (parent.name === "stsd") {
                        parent.length += 8;
                        parentHeadLength += 8;
                    }
                    // set length of parent in buffer
                    this._bufferView.setUint32(parent.offset, parent.length);
                    const parentHeader = this._buffer.slice(parent.offset, parent.offset + parentHeadLength);
                    buffers.splice(offset, 0, parentHeader);
                    // we completed the last parent - exit
                    if (levelIndex < 0)
                        break;
                    // add our current parents length to new parent and move childIndex of new parent one ahead
                    const newParent = levels[levelIndex].parent;
                    newParent.length += parent.length;
                    levels[levelIndex].childIndex++;
                    continue;
                }
                const child = parent.children[childIndex];
                if (child.children) {
                    // move one level down
                    child.length = ATOM_HEAD_LENGTH;
                    levels.push({ parent: child, offset: bufferIndex, childIndex: 0 });
                    levelIndex++;
                    continue;
                }
                else if (child.data) {
                    // add new data to buffer
                    const headerBuffer = this._getHeaderBufferFromAtom(child);
                    buffers.push(headerBuffer);
                    buffers.push(child.data);
                }
                else {
                    // add entire child to buffer
                    const slice = this._buffer.slice(child.offset, child.offset + child.length);
                    buffers.push(slice);
                }
                bufferIndex++;
                parent.length += child.length;
                // move one child ahead
                levels[levelIndex].childIndex++;
            }
        }
        this._bufferView = null;
        this._buffer = null;
        this._atoms = [];
        return new Blob(buffers, { type: "audio/mp4" });
    }
    _insertAtom(atom, path) {
        if (!path)
            throw new Error("Path can not be empty");
        const parentAtom = this._findAtom(this._atoms, path);
        if (!parentAtom)
            throw new Error(`Parent atom at path '${path.join(" > ")}' could not be found`);
        if (parentAtom.children === undefined) {
            parentAtom.children = this._readChildAtoms(parentAtom);
        }
        let offset = parentAtom.offset + ATOM_HEAD_LENGTH;
        if (parentAtom.name === "meta") {
            offset += 4;
        }
        else if (parentAtom.name === "stsd") {
            offset += 8;
        }
        if (parentAtom.children.length > 0) {
            const lastChild = parentAtom.children[parentAtom.children.length - 1];
            offset = lastChild.offset + lastChild.length;
        }
        atom.offset = offset;
        parentAtom.children.push(atom);
    }
    _findAtom(atoms, path) {
        if (!path || path.length < 1)
            throw new Error("Path can not be empty");
        const curPath = [...path];
        const curName = curPath.shift();
        const curElem = atoms.find((i) => i.name === curName);
        if (curPath.length < 1)
            return curElem;
        if (!curElem)
            return null;
        if (curElem.children === undefined) {
            curElem.children = this._readChildAtoms(curElem);
        }
        if (curElem.children.length < 1)
            return null;
        return this._findAtom(curElem.children, curPath);
    }
    _readChildAtoms(atom) {
        const children = [];
        const childEnd = atom.offset + atom.length;
        let childOffset = atom.offset + ATOM_HEAD_LENGTH;
        if (atom.name === "meta") {
            childOffset += 4;
        }
        else if (atom.name === "stsd") {
            childOffset += 8;
        }
        while (true) {
            if (childOffset >= childEnd)
                break;
            const childAtom = this._readAtom(childOffset);
            if (!childAtom || childAtom.length < 1)
                break;
            childOffset = childAtom.offset + childAtom.length;
            children.push(childAtom);
        }
        return children;
    }
    _readAtom(offset) {
        const begin = offset;
        const end = offset + ATOM_HEAD_LENGTH;
        const buffer = this._buffer.slice(begin, end);
        if (buffer.byteLength < ATOM_HEAD_LENGTH) {
            return {
                length: buffer.byteLength,
                offset,
            };
        }
        const dataView = new DataView(buffer);
        let length = dataView.getUint32(0, false);
        let name = "";
        for (let i = 0; i < 4; i++) {
            name += String.fromCharCode(dataView.getUint8(4 + i));
        }
        return {
            name,
            length,
            offset,
        };
    }
    _getHeaderBufferFromAtom(atom) {
        if (!atom || atom.length < 1 || !atom.name || !atom.data)
            throw new Error("Can not compute header buffer for this atom");
        const headerBuffer = new ArrayBuffer(ATOM_HEADER_LENGTH);
        const headerBufferView = new DataView(headerBuffer);
        // length at 0, length = 4
        headerBufferView.setUint32(0, atom.length);
        // name at 4, length = 4
        const nameChars = this._getCharCodes(atom.name);
        for (let i = 0; i < nameChars.length; i++) {
            headerBufferView.setUint8(4 + i, nameChars[i]);
        }
        // data length at 8, length = 4
        headerBufferView.setUint32(8, ATOM_DATA_HEAD_LENGTH + atom.data.byteLength);
        // data name at 12, length = 4
        const dataNameChars = this._getCharCodes("data");
        for (let i = 0; i < dataNameChars.length; i++) {
            headerBufferView.setUint8(12 + i, dataNameChars[i]);
        }
        // data flags at 16, length = 4
        headerBufferView.setUint32(16, this._getFlags(atom.name));
        return headerBuffer;
    }
    _getBufferFromString(input) {
        // return new TextEncoder().encode(input).buffer;
        const buffer = new ArrayBuffer(input.length);
        const bufferView = new DataView(buffer);
        const chars = this._getCharCodes(input);
        for (let i = 0; i < chars.length; i++) {
            bufferView.setUint8(i, chars[i]);
        }
        return buffer;
    }
    _getCharCodes(input) {
        const chars = [];
        for (let i = 0; i < input.length; i++) {
            chars.push(input.charCodeAt(i));
        }
        return chars;
    }
    _getFlags(name) {
        switch (name) {
            case "covr":
                // 13 for jpeg, 14 for png
                return 13;
            case "trkn":
            case "disk":
                return 0;
            case "tmpo":
            case "cpil":
            case "rtng":
                return 21;
            default:
                return 1;
        }
    }
}
class Mp4TagWriter {
    constructor(buffer) {
        this._mp4 = new Mp4(buffer);
        this._mp4.parse();
    }
    setTitle(title) {
        if (!title)
            throw new Error("Invalid value for title");
        this._mp4.addMetadataAtom("©nam", title);
    }
    setArtists(artists) {
        if (!artists || artists.length < 1)
            throw new Error("Invalid value for artists");
        const artist = artists.join(", ");
        this._mp4.addMetadataAtom("©ART", artist);
    }
    setAlbum(album) {
        if (!album)
            throw new Error("Invalid value for album");
        this._mp4.addMetadataAtom("©alb", album);
    }
    setComment(comment) {
        if (!comment)
            throw new Error("Invalid value for comment");
        this._mp4.addMetadataAtom("©cmt", comment);
    }
    setTrackNumber(trackNumber) {
        // max trackNumber is max of Uint8
        if (trackNumber < 1 || trackNumber > 32767)
            throw new Error("Invalid value for trackNumber");
        this._mp4.addMetadataAtom("trkn", trackNumber);
    }
    setYear(year) {
        if (year < 1)
            throw new Error("Invalud value for year");
        this._mp4.addMetadataAtom("©day", year.toString());
    }
    setArtwork(artworkBuffer) {
        if (!artworkBuffer || artworkBuffer.byteLength < 1)
            throw new Error("Invalid value for artworkBuffer");
        this._mp4.addMetadataAtom("covr", artworkBuffer);
    }
    setDuration(duration) {
        if (duration < 1)
            throw new Error("Invalid value for duration");
        this._mp4.setDuration(duration);
    }
    getBlob() {
        return this._mp4.getBlob();
    }
}
exports.Mp4TagWriter = Mp4TagWriter;


/***/ }),

/***/ 246:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.SoundCloudApi = void 0;
const logger_1 = __webpack_require__(473);
class SoundCloudApi {
    constructor() {
        this.baseUrl = "https://api-v2.soundcloud.com";
        this.logger = logger_1.Logger.create("SoundCloudApi");
    }
    resolveUrl(url) {
        const reqUrl = `${this.baseUrl}/resolve?url=${url}`;
        return this.fetchJson(reqUrl);
    }
    getCurrentUser() {
        const url = `${this.baseUrl}/me`;
        return this.fetchJson(url);
    }
    getFollowedArtistIds(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.baseUrl}/users/${userId}/followings/ids`;
            const data = yield this.fetchJson(url);
            if (!data || !data.collection)
                return null;
            return data.collection;
        });
    }
    getTracks(trackIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.baseUrl}/tracks?ids=${trackIds.join(",")}`;
            this.logger.logInfo("Fetching tracks with Ids", { trackIds });
            const tracks = yield this.fetchJson(url);
            return trackIds.reduce((acc, cur, index) => {
                acc[cur] = tracks[index];
                return acc;
            }, {});
        });
    }
    getStreamDetails(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const stream = yield this.fetchJson(url);
            if (!stream || !stream.url) {
                this.logger.logError("Invalid stream response", stream);
                return null;
            }
            let extension;
            let hls = false;
            const regexResult = /(?:(\w{3,4})\/playlist)?\.(\w{3,4})(?:$|\?)/.exec(stream.url);
            if (regexResult.length >= 2) {
                if (regexResult[2] === "m3u8") {
                    extension = regexResult[1];
                    hls = true;
                }
                else {
                    extension = regexResult[2];
                }
            }
            return {
                url: stream.url,
                extension,
                hls,
            };
        });
    }
    getOriginalDownloadUrl(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.baseUrl}/tracks/${id}/download`;
            this.logger.logInfo("Getting original download URL for track with Id", id);
            const downloadObj = yield this.fetchJson(url);
            if (!downloadObj || !downloadObj.redirectUri) {
                this.logger.logError("Invalid original file response", downloadObj);
                return null;
            }
            return downloadObj.redirectUri;
        });
    }
    downloadArtwork(artworkUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const [buffer] = yield this.fetchArrayBuffer(artworkUrl);
            return buffer;
        });
    }
    downloadStream(streamUrl, reportProgress) {
        return this.fetchArrayBuffer(streamUrl, reportProgress);
    }
    fetchArrayBuffer(url, reportProgress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (reportProgress) {
                    return new Promise((resolve, reject) => {
                        const req = new XMLHttpRequest();
                        try {
                            const handleProgress = (event) => {
                                const progress = Math.round((event.loaded / event.total) * 100);
                                reportProgress(progress);
                            };
                            const handleReadyStateChanged = (event) => __awaiter(this, void 0, void 0, function* () {
                                if (req.readyState == req.DONE) {
                                    if (req.status !== 200 || !req.response) {
                                        resolve([null, null]);
                                        return;
                                    }
                                    reportProgress(100);
                                    const headers = new Headers();
                                    const headerString = req.getAllResponseHeaders();
                                    const headerMap = headerString
                                        .split("\r\n")
                                        .filter((i) => !!i)
                                        .map((i) => {
                                        const [name, value] = i.split(": ");
                                        return [name, value];
                                    });
                                    for (const [name, value] of headerMap) {
                                        headers.set(name, value);
                                    }
                                    resolve([req.response, headers]);
                                }
                            });
                            req.responseType = "arraybuffer";
                            req.onprogress = handleProgress;
                            req.onreadystatechange = handleReadyStateChanged;
                            req.onerror = reject;
                            req.open("GET", url, true);
                            req.send(null);
                        }
                        catch (error) {
                            this.logger.logError(`Failed to fetch ArrayBuffer with progress from: ${url}`, error);
                            reject(error);
                        }
                    });
                }
                const resp = yield fetch(url);
                if (!resp.ok)
                    return [null, null];
                const buffer = yield resp.arrayBuffer();
                if (!buffer)
                    return [null, null];
                return [buffer, resp.headers];
            }
            catch (error) {
                this.logger.logError(`Failed to fetch ArrayBuffer from: ${url}`, error);
                return [null, null];
            }
        });
    }
    fetchJson(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield fetch(url);
                if (!resp.ok)
                    return null;
                const json = (yield resp.json());
                if (!json)
                    return null;
                return json;
            }
            catch (error) {
                this.logger.logError("Failed to fetch JSON from", url);
                return null;
            }
        });
    }
}
exports.SoundCloudApi = SoundCloudApi;


/***/ }),

/***/ 793:
/***/ ((module) => {

"use strict";


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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	__webpack_require__(136);
/******/ })()
;