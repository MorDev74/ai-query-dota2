import { createOpenRouter } from '@openrouter/ai-sdk-provider';

const apiKey = process.env["OPENROUTER_API_KEY_QUERY_DOTA2"];

async function getOpenRouterClient() {
    const openRouterClient = createOpenRouter({
        apiKey: apiKey,
    });
    return openRouterClient;
}

export const openrouterClient = await getOpenRouterClient();