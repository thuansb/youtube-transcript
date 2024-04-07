import { load } from 'cheerio';

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

var RE_YOUTUBE = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;
var RE_CAPTION_TRACKS = /"captionTracks":\s*(\[.*?\])/;
var USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36,gzip(gfe)';
var YoutubeTranscriptError = /** @class */ (function (_super) {
    __extends(YoutubeTranscriptError, _super);
    function YoutubeTranscriptError(message) {
        return _super.call(this, "[YoutubeTranscript] ".concat(message)) || this;
    }
    return YoutubeTranscriptError;
}(Error));
/**
 * Fetch transcript from Youtube Video
 * @param {string} videoUrlOrId - Video url or identifier
 * @param {YoutubeFetchConfig} [config]
 * @return {Promise<YoutubeTranscriptResponse[]>} - If locale available, the localized transcription or default or null.
 */
var fetchTranscript = function (videoUrlOrId, config) {
    if (config === void 0) { config = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var videoId, url, err_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    videoId = getVideoId(videoUrlOrId);
                    if (!videoId) {
                        throw new Error('Invalid Youtube video identifier.');
                    }
                    return [4 /*yield*/, getTranscriptUrl(videoId, (_a = config === null || config === void 0 ? void 0 : config.lang) !== null && _a !== void 0 ? _a : 'en')];
                case 1:
                    url = _b.sent();
                    if (!url) {
                        throw new Error('Transcription unavailable.');
                    }
                    return [4 /*yield*/, getTranscript(url)];
                case 2: return [2 /*return*/, _b.sent()];
                case 3:
                    err_1 = _b.sent();
                    throw new YoutubeTranscriptError(err_1);
                case 4: return [2 /*return*/];
            }
        });
    });
};
/**
 * @deprecated Use named export `fetchTranscript`.
 */
var YoutubeTranscript = {
    fetchTranscript: fetchTranscript
};
var getTranscriptUrl = function (identifier, lang) { return __awaiter(void 0, void 0, void 0, function () {
    var response, body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://www.youtube.com/watch?v=".concat(identifier), {
                    headers: {
                        'User-Agent': USER_AGENT,
                    },
                })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.text()];
            case 2:
                body = _a.sent();
                return [2 /*return*/, getCaptionTrack(body, lang)];
        }
    });
}); };
/**
 * @see https://github.com/Kakulukian/youtube-transcript/issues/19
 * @param {string} url
 * @returns {Promise<YoutubeTranscriptResponse[]>}
 */
var getTranscript = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var response, body, $;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(url)];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.text()];
            case 2:
                body = _a.sent();
                $ = load(body);
                return [2 /*return*/, $('text')
                        .map(function (_, element) {
                        return {
                            text: $(element).text(),
                            offset: toMs($(element).attr('start')),
                            duration: toMs($(element).attr('dur')),
                        };
                    })
                        .get()];
        }
    });
}); };
/**
 * Extract caption track URL from raw HTML string.
 * @param {string} html - The raw HTML string.
 * @param {string} [lang] - The language code to filter the caption tracks by. Default is undefined.
 * @returns {string|null} - The URL of the caption track, or null if not found or an error occurred.
 */
var getCaptionTrack = function (html, lang) {
    var _a, _b, _c, _d;
    try {
        var captionTracks = JSON.parse((_b = (_a = html.match(RE_CAPTION_TRACKS)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : '[]');
        return ((_d = (_c = ((lang && captionTracks.find(function (e) { return e.languageCode.includes(lang); })) || captionTracks[0])) === null || _c === void 0 ? void 0 : _c.baseUrl) !== null && _d !== void 0 ? _d : null);
    }
    catch (err) {
        return null;
    }
};
/**
 * Get video id from url or string
 * @param videoId - video url or video id
 * @returns {string|null} - the identifier of null
 */
var getVideoId = function (videoId) {
    var _a;
    if (videoId.length === 11) {
        return videoId;
    }
    return getVideoIdFromSearchParams(videoId) || ((_a = videoId.match(RE_YOUTUBE)) === null || _a === void 0 ? void 0 : _a[1]) || null;
};
var getVideoIdFromSearchParams = function (videoId) {
    try {
        return new URL(videoId).searchParams.get('v');
    }
    catch (err) {
        return null;
    }
};
var toMs = function (n) { return Math.round(parseFloat(n) * 1000); };

export { YoutubeTranscript, YoutubeTranscriptError, fetchTranscript };
