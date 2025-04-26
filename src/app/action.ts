'use server'

export async function transcribe(audioBlob: Blob) {
	try {
		if (!audioBlob) {
			console.error("Audio blob is required");
			return null;
		}

		const formData = new FormData();
		formData.append("file", audioBlob, "recording.wav");
		formData.append("model", "whisper-1");

		const response = await fetch(
			"https://api.openai.com/v1/audio/transcriptions",
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
				},
				body: formData,
			}
		);

		if (!response.ok) {
			console.error("Failed to transcribe audio:", response.statusText);
			return null;
		}

		console.log("Transcription response:", response);

		const data = await response.json();
		console.log("Transcription data:", data);

		return data.text;
	} catch (error) {
		console.error("Error transcribing audio:", error);
		return null;
	}
}

export async function findBibleVerses(text: string) {
	try {
		if (!text) {
			console.error("Text is required to find Bible verses");
			return null;
		}

		console.log("Finding Bible verses for text:", text);
		console.log(
			"prompt:",
			`Find Bible verses that align with the following text: \"${text}\"`
		);

		const response = await fetch("https://api.openai.com/v1/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
			},
			body: JSON.stringify({
				model: "gpt-4.1-nano",
				prompt: `Find Bible verses that align with the following text. strictly find the verses from the bible alone, no other source. Give me the verse and the text. e.g. John 3:16 For God so loved the world that he gave his only begotten son that whosoever believes in him should not perish but have everlasting life.: \"${text}\"`,
				max_tokens: 200,
			}),
		});

		if (!response.ok) {
			console.error("Failed to find Bible verses:", response.statusText);
			return null;
		}

		const data = await response.json();
		console.log("Bible verses response:", data);
		return data.choices[0]?.text.trim();
	} catch (error) {
		console.error("Error finding Bible verses:", error);
		return null;
	}
}