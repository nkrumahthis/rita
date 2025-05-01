"use server";

export async function requestEphemeralKey() {
	try {
		const response = await fetch(
			"https://api.openai.com/v1/realtime/transcription_sessions",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
				},
				body: JSON.stringify({}),
			}
		);

		if (!response.ok) {
			console.error("Failed to generate ephemeral key:", response.statusText);
			return null;
		}

		const data = await response.json();
		return data.client_secret;
	} catch (error) {
		console.error("Error generating ephemeral key:", error);
		return null;
	}
}
