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

export async function findBibleVerses(text: string): Promise<string[] | null> {
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
				prompt: `Given the following text, find Bible verses that align with its meaning. Only provide verses from the Bible separated by the | symbol, formatted as "Book Chapter:Verse - Verse text | Book Chapter:Verse - Verse text | Book Chapter:Verse - Verse text". For example: "John 8:36 - If the Son therefore shall make you free, ye shall be free indeed. | 2 Corinthians 3:17 - Now the Lord is that Spirit: and where the Spirit of the Lord | Luke 10:19 - Behold, I give unto you power to tread on serpents and scorpions, and over all the power of the enemy: and nothing shall by any means hurt you." Text: "${text}" Please provide your answer in the format described above.`,
				max_tokens: 300,
			}),
		});

		if (!response.ok) {
			console.error("Failed to find Bible verses:", response.statusText);
			return null;
		}

		const data = await response.json();
		console.log("Bible verses response:", data);
		let answer = data.choices[0]?.text.trim();

		if (answer.includes("Answer:")) answer = answer.split("Answer:")[1].trim();

		return answer.split("|");
	} catch (error) {
		console.error("Error finding Bible verses:", error);
		return null;
	}
}