import { generateObject  } from "ai";
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { z } from "zod";
import { categoryKeys,systemMessageHero } from "@/utils/config";
import { supabaseClient } from "@/utils/supabase";
import { Result } from "@/utils/types"

export const maxDuration = 30;

// const apiKey = process.env["OPENROUTER_API_KEY_QUERY_DOTA2"];
const apiKey = "OPENROUTER_API_KEY_QUERY_DOTA2";


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
        // throw new Error(`Error generating query: ${error}`);
        void error;
        return "error";
    }
}

async function runQuery(query: string) {
    if (
        !query.trim().toLowerCase().startsWith("select") ||
        query.trim().toLowerCase().includes("drop") ||
        query.trim().toLowerCase().includes("delete") ||
        query.trim().toLowerCase().includes("insert") ||
        query.trim().toLowerCase().includes("update") ||
        query.trim().toLowerCase().includes("alter") ||
        query.trim().toLowerCase().includes("truncate") ||
        query.trim().toLowerCase().includes("create") ||
        query.trim().toLowerCase().includes("grant") ||
        query.trim().toLowerCase().includes("revoke")
    ) {
        // throw new Error("Only SELECT queries are allowed");
        return [];
    }

    const { data, error } = await supabaseClient.rpc('execute_read_only_sql', { query });

    if (error) {
        // throw new Error(`Error running query: ${error}`);
        void error;
        return [];
    }

    return data as Result[];
}

export async function POST(req: Request): Promise<Response> {
    const {question, modelName, category} = await req.json();

    if ( question === undefined 
        || modelName === undefined
        || category === undefined
    ) {
        return new Response("Missing required parameters", { status: 400 });
    }

    if (categoryKeys.indexOf(category) === -1) {
        return new Response(JSON.stringify({ result: "Cateogory not supported"}), {
            headers: { "Content-Type": "application/json" },
        });
    }

    const query = await generateQuery(question, modelName, category);
    if (query === "error") {
        return new Response(JSON.stringify({ result: "Error generating query"}), {
            headers: { "Content-Type": "application/json" },
        });
    }

    const data = await runQuery(query);

    return new Response(JSON.stringify({ result: data }), {
        headers: { "Content-Type": "application/json" },
    });
}