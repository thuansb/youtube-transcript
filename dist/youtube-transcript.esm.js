import { parse } from 'node-html-parser';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36,gzip(gfe)';
var RE_PATH = /v|e(?:mbed)?|shorts/;
var ID_LENGTH = 11;
var YoutubeTranscriptError = /** @class */ (function (_super) {
    __extends(YoutubeTranscriptError, _super);
    function YoutubeTranscriptError(message) {
        return _super.call(this, "[YoutubeTranscript] " + message) || this;
    }
    return YoutubeTranscriptError;
}(Error));
var YoutubeTranscript = /** @class */ (function () {
    function YoutubeTranscript() {
    }
    /**
     * Fetch transcript from YouTube Video
     * @param videoId Video url or video identifier
     * @param config Object with lang param (eg: en, es, hk, uk) format.
     * Will just grab the first caption if it can find one, so no special lang caption support.
     */
    YoutubeTranscript.fetchTranscript = function (videoId, config) {
        var _a;
        if (config === void 0) { config = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var identifier, lang, transcriptUrl, transcriptXML, chunks, transcriptions, _i, chunks_1, chunk, _b, offset, duration, convertToMs, e_1;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        identifier = this.retrieveVideoId(videoId);
                        lang = (_a = config === null || config === void 0 ? void 0 : config.lang) !== null && _a !== void 0 ? _a : 'en';
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch("https://www.youtube.com/watch?v=" + identifier, {
                                headers: {
                                    'User-Agent': USER_AGENT,
                                },
                            })
                                .then(function (res) { return res.text(); })
                                .then(function (html) { return parse(html); })
                                .then(function (html) { return _this.parseTranscriptEndpoint(html, lang); })];
                    case 2:
                        transcriptUrl = _c.sent();
                        if (!transcriptUrl)
                            throw new Error('Failed to locate a transcript for this video!');
                        return [4 /*yield*/, fetch(transcriptUrl)
                                .then(function (res) { return res.text(); })
                                .then(function (xml) { return parse(xml); })];
                    case 3:
                        transcriptXML = _c.sent();
                        chunks = transcriptXML.getElementsByTagName('text');
                        transcriptions = [];
                        for (_i = 0, chunks_1 = chunks; _i < chunks_1.length; _i++) {
                            chunk = chunks_1[_i];
                            _b = chunk.rawAttrs.split(" "), offset = _b[0], duration = _b[1];
                            convertToMs = function (text) {
                                return parseFloat(text.split("=")[1].replace(/"/g, "")) * 1000;
                            };
                            transcriptions.push({
                                text: chunk.text,
                                offset: convertToMs(offset),
                                duration: convertToMs(duration),
                            });
                        }
                        return [2 /*return*/, transcriptions];
                    case 4:
                        e_1 = _c.sent();
                        throw new YoutubeTranscriptError(e_1.message);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    YoutubeTranscript.parseTranscriptEndpoint = function (document, langCode) {
        var _a, _b, _c, _d, _e, _f, _g;
        if (langCode === void 0) { langCode = null; }
        try {
            var scripts = document.getElementsByTagName('script');
            var playerScript = scripts.find(function (script) {
                return script.textContent.includes('var ytInitialPlayerResponse = {');
            });
            var dataString = ((_d = (_c = (_b = (_a = playerScript.textContent) === null || _a === void 0 ? void 0 : _a.split('var ytInitialPlayerResponse = ')) === null || _b === void 0 ? void 0 : _b[1]) === null || _c === void 0 ? void 0 : _c.split('};')) === null || _d === void 0 ? void 0 : _d[0]) + '}';
            var data = JSON.parse(dataString.trim());
            var availableCaptions = ((_f = (_e = data === null || data === void 0 ? void 0 : data.captions) === null || _e === void 0 ? void 0 : _e.playerCaptionsTracklistRenderer) === null || _f === void 0 ? void 0 : _f.captionTracks) || [];
            var captionTrack = availableCaptions === null || availableCaptions === void 0 ? void 0 : availableCaptions[0];
            if (langCode) {
                captionTrack = (_g = availableCaptions.find(function (track) { return track.languageCode.includes(langCode); })) !== null && _g !== void 0 ? _g : availableCaptions === null || availableCaptions === void 0 ? void 0 : availableCaptions[0];
            }
            return captionTrack === null || captionTrack === void 0 ? void 0 : captionTrack.baseUrl;
        }
        catch (e) {
            console.error("YoutubeTranscript.#parseTranscriptEndpoint " + e.message);
            return null;
        }
    };
    /**
     * Retrieve video id from url or string
     * @param videoId video url or video id
     */
    YoutubeTranscript.retrieveVideoId = function (videoUrlOrId) {
        var _a;
        if (!videoUrlOrId) {
            return null;
        }
        if (videoUrlOrId.length === ID_LENGTH) {
            return videoUrlOrId;
        }
        try {
            var url = new URL(videoUrlOrId);
            var segments = url.pathname.split('/');
            if (((_a = segments[1]) === null || _a === void 0 ? void 0 : _a.length) === ID_LENGTH) {
                return segments[1];
            }
            return ((RE_PATH.test(segments[1]) ? segments[2] : url.searchParams.get('v')) ||
                null);
        }
        catch (err) {
            return null;
        }
    };
    return YoutubeTranscript;
}());

export { YoutubeTranscript, YoutubeTranscriptError };
