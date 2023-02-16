import fs from "fs";
import pkg from '@deepgram/sdk';
const { Deepgram } = pkg;
import dotenv from 'dotenv';
dotenv.config();

// Your Deepgram API Key
const deepgramApiKey = process.env.API_KEY;

// Location of the file you want to transcribe
const audioFilePath = "audio.mp3";

// MIME type for the file you want to transcribe (only necessary if transcribing a local file)
const audioFileMimetype = "audio/mp3";

// Initialize the Deepgram SDK with your API key
const deepgram = new Deepgram(deepgramApiKey);

// Check whether the audio file is local or remote, and prepare accordingly
let audioSource;

// Audio file is local
const audioFileBuffer = fs.readFileSync(audioFilePath);
audioSource = {
	buffer: audioFileBuffer,
	mimetype: audioFileMimetype,
};

// Set options for transcription
const transcriptionOptions = {
	punctuate: true,  // Include punctuation in the transcription
	language: "es",  // Transcribe audio in Spanish
	diarize: true,   // Distinguish between different speakers in the audio
};

// Send the audio to Deepgram for transcription and handle the response
deepgram.transcription
	.preRecorded(audioSource, transcriptionOptions)
	.then((transcriptionResponse) => {
		console.log("Transcription response:");
		console.dir(transcriptionResponse, { depth: null });
		// If you only want the transcript, you can access it like this:
		// console.log(transcriptionResponse.results.channels[0].alternatives[0].transcript);
	})
	.catch((error) => {
		console.error("Error during transcription:", error);
	});
