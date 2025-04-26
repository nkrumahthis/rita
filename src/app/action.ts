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

		const data = await response.json();
		return data.text;
	} catch (error) {
		console.error("Error transcribing audio:", error);
    return null;
	}
}