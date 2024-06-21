import { writeFile } from "node:fs/promises";
import "dotenv/config";
import { youtubeDl } from "youtube-dl-exec";
import { AssemblyAI } from "assemblyai";
const youtubeVideoUrl = "https://www.youtube.com/watch?v=wtolixa9XTg";
console.log("Retrieving audio URL from YouTube video");
const videoInfo = await youtubeDl(youtubeVideoUrl, {
    dumpSingleJson: true,
    preferFreeFormats: true,
    addHeader: ["referer:youtube.com", "user-agent:googlebot"],
});
const audioUrl = videoInfo.formats.reverse().find((format) => format.resolution === "audio only" && format.ext === "m4a")?.url;
if (!audioUrl) {
    throw new Error("No audio only format found");
}
console.log("Audio URL retrieved successfully");
console.log("Audio URL:", audioUrl);
console.log("Transcribing audio");
const aaiClient = new AssemblyAI({
    apiKey: process.env.ASSEMBLYAI_API_KEY,
});
const transcript = await aaiClient.transcripts.transcribe({
    // can also accept videos and local files
    audio: audioUrl,
});
if (transcript.status === "error") {
    throw new Error("Transcription failed: " + transcript.error);
}
console.log("Transcription complete");
console.log("Saving transcript to file");
await writeFile("./transcript.txt", transcript.text);
console.log("Transcript saved to file transcript.txt");
console.log("Retrieving transcript as SRT subtitles");
const subtitles = await aaiClient.transcripts.subtitles(transcript.id, "srt");
console.log("Saving subtitles to file");
await writeFile("./subtitles.srt", subtitles);
console.log("Subtitles saved to file subtitles.srt");
console.log("Prompting LeMUR to summarize the video");
const prompt = "Summarize this video using bullet points";
const lemurResponse = await aaiClient.lemur.task({
    transcript_ids: [transcript.id],
    prompt,
    final_model: "anthropic/claude-2-1"
});
console.log(prompt + ": " + lemurResponse.response);
