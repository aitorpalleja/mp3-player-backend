const fs = require("fs");
const { Deepgram } = require("@deepgram/sdk");
require('dotenv').config();


// Your Deepgram API Key
const deepgramApiKey = process.env.API_KEY;

// Location of the file you want to transcribe. Should include filename and extension.
// Example of a local file: ../../Audio/life-moves-pretty-fast.wav
// Example of a remote file: https://static.deepgram.com/examples/interview_speech-analytics.wav
const file = "afor.mp3";

// Mimetype for the file you want to transcribe
// Only necessary if transcribing a local file
// Example: audio/wav
const mimetype = "audio/mp3";

// Initialize the Deepgram SDK
const deepgram = new Deepgram(deepgramApiKey);

// Check whether requested file is local or remote, and prepare accordingly
if (file.startsWith("http")) {
	// File is remote
	// Set the source
	source = {
		url: file,
	};
} else {
	// File is local
	// Open the audio file
	const audio = fs.readFileSync(file);

	// Set the source
	source = {
		buffer: audio,
		mimetype: mimetype,
	};
}

// Send the audio to Deepgram and get the response
deepgram.transcription
	.preRecorded(source, {
		punctuate: true,
        language: "es",
	})
	.then((response) => {
		// Write the response to the console
		console.dir(response, { depth: null });

		// Write only the transcript to the console
		//console.dir(response.results.channels[0].alternatives[0].transcript, { depth: null });
	})
	.catch((err) => {
		console.log(err);
	});