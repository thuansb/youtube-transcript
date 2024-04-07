export interface YoutubeTranscriptResponse {
    text: string;
    duration: number;
    offset: number;
}
export interface YoutubeFetchConfig {
    /**
     * Locale code
     * @example en, es, hk, uk
     */
    lang?: string;
}
export declare class YoutubeTranscriptError extends Error {
    constructor(message: string);
}
/**
 * Fetch transcript from Youtube Video
 * @param {string} videoUrlOrId - Video url or identifier
 * @param {YoutubeFetchConfig} [config]
 * @return {Promise<YoutubeTranscriptResponse[]>} - If locale available, the localized transcription or default or null.
 */
export declare const fetchTranscript: (videoUrlOrId: string, config?: YoutubeFetchConfig) => Promise<YoutubeTranscriptResponse[]>;
/**
 * @deprecated Use named export `fetchTranscript`.
 */
export declare const YoutubeTranscript: {
    fetchTranscript: (videoUrlOrId: string, config?: YoutubeFetchConfig) => Promise<YoutubeTranscriptResponse[]>;
};
