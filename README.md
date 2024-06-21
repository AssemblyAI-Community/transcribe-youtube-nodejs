# Transcribe and subtitle YouTube videos

This sample shows how you can transcribe YouTube videos and generate subtitles for the video.
Additionally, the sample shows how you can prompt the YouTube video using LeMUR.

For step-by-step instructions on how to build this sample yourself, see [Transcribe and subtitle YouTube videos with Node.js](https://www.assemblyai.com/blog/transcribe-youtube-nodejs).

To run the sample, you'll need the following:

- [Node.js](https://nodejs.org/)
- [Python 3.7](https://www.python.org/downloads/) or above on your system as `python3`
- An AssemblyAI account with a credit card set up

Clone or download the sample, then install the dependencies:

```bash
npm install
```

Configure the `ASSEMBLYAI_API_KEY` environment variable in your shell, or create a `.env` file with the following contents and replace `[YOUR_ASSEMBLYAI_API_KEY]` with your API key:

```plaintext
ASSEMBLYAI_API_KEY=[YOUR_ASSEMBLYAI_API_KEY]
```

Run the sample:

```bash
npm run start
```
