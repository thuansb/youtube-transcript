export declare class YoutubeTranscriptError extends Error {
    constructor(message: string);
}
export declare class YoutubeTranscript {
    /**
     * Fetch transcript from YouTube Video
     * @param videoId Video url or video identifier
     * @param config Object with lang param (eg: en, es, hk, uk) format.
     * Will just grab the first caption if it can find one, so no special lang caption support.
     */
    static fetchTranscript(videoId: string, config?: {
        lang?: string;
    }): Promise<any[]>;
    private static parseTranscriptEndpoint;
    /**
     * Retrieve video id from url or string
     * @param videoId video url or video id
     */
    static retrieveVideoId(videoId: string): string;
}
