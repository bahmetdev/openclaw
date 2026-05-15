export async function answerTelegramGuestQuery(params: {
  token: string;
  guestQueryId: string;
  text: string;
}): Promise<void> {
  const response = await fetch(`https://api.telegram.org/bot${params.token}/answerGuestQuery`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      guest_query_id: params.guestQueryId,
      result: {
        type: "article",
        id: `openclaw-${Date.now()}`,
        title: "OpenClaw",
        input_message_content: {
          message_text: params.text.slice(0, 4096),
        },
      },
    }),
  });
  const json = (await response.json().catch(() => null)) as {
    ok?: boolean;
    description?: string;
  } | null;
  if (!response.ok || json?.ok !== true) {
    throw new Error(
      typeof json?.description === "string"
        ? json.description
        : `Telegram answerGuestQuery failed with HTTP ${response.status}`,
    );
  }
}
