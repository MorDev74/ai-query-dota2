import { generateObject  } from "ai";
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { z } from "zod";
import { systemMessageHero } from "@/utils/config";

export const maxDuration = 30;

const apiKey = process.env["OPENROUTER_API_KEY_QUERY_DOTA2"];

async function getOpenRouterClient() {
    const openRouterClient = createOpenRouter({
        apiKey: apiKey,
    });
    return openRouterClient;
}

async function generateQuery(question: string, modelName: string, category: string) {
    // generate sql prompt

    let system = "";
    if (category === "hero") {
        system = systemMessageHero;
    }

    const llmClient = await getOpenRouterClient();

    try {
        const result = await generateObject({
            model: llmClient(modelName),
            system: system,
            prompt: `Generate the query necessary to retrieve the data the user wants: ${question}`,
            schema: z.object({
                query: z.string(),
            }),
        });
        return result.object.query;

    } catch (error) {
        throw new Error(`Error generating query: ${error}`);
    }
}

export async function POST(req: Request): Promise<Response> {
    const {question, modelName, category} = await req.json();

    if (category !== "hero" 
        || category !== "item" 
        || category !== "ability" 
        || category !== "patch_note") {
        return new Response(JSON.stringify({ result: "Cateogory not supported"}), {
            headers: { "Content-Type": "application/json" },
        });
    }

    if ( question === undefined || modelName  === undefined) {
        return new Response("Missing required parameters", { status: 400 });
    }

    const query = await generateQuery(question, modelName, category);

    return new Response(JSON.stringify({ result: query }), {
        headers: { "Content-Type": "application/json" },
    });
}