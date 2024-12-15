import { generateObject  } from "ai";
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { z } from "zod";

export const maxDuration = 30;

const apiKey = process.env["OPENROUTER_API_KEY_QUERY_DOTA2"];

async function getOpenRouterClient() {
    const openRouterClient = createOpenRouter({
        apiKey: apiKey,
    });
    return openRouterClient;
}

async function generateQuery(question: string, modelName: string) {
    // generate sql prompt
    const system = `You are a SQL (postgres) and data visualization expert. Your job is to help the user write a SQL query to retrieve the data they need. The table schema is as follows:
        DOTA2Hero (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            name_loc TEXT NOT NULL,
            primary_attr INTEGER NOT NULL,
            complexity INTEGER NOT NULL,
            str_base FLOAT NOT NULL,
            str_gain FLOAT NOT NULL,
            agi_base FLOAT NOT NULL,
            agi_gain FLOAT NOT NULL,
            int_base FLOAT NOT NULL,
            int_gain FLOAT NOT NULL,
            attack_capability INTEGER NOT NULL,
            damage_min FLOAT NOT NULL,
            damage_max FLOAT NOT NULL,
            attack_rate FLOAT NOT NULL,
            attack_range FLOAT NOT NULL,
            projectile_speed FLOAT NOT NULL,
            armor FLOAT NOT NULL,
            magic_resistance FLOAT NOT NULL,
            movement_speed FLOAT NOT NULL,
            turn_rate FLOAT NOT NULL,
            sight_range_day FLOAT NOT NULL,
            sight_range_night FLOAT NOT NULL,
            max_health FLOAT NOT NULL,
            health_regen FLOAT NOT NULL,
            max_mana FLOAT NOT NULL,
            mana_regen FLOAT NOT NULL
        );

        Only retrieval queries are allowed.
    `;

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
    const {question, modelName} = await req.json();

    if ( question === undefined || modelName  === undefined) {
        return new Response("Missing required parameters", { status: 400 });
    }

    const query = await generateQuery(question, modelName);
    // const query = "SELECT * FROM DOTA2Hero LIMIT 10;"
    console.log(`
    input: ${question} , ${modelName}
    query: ${query}
    type: ${typeof query}
    `)

    return new Response(JSON.stringify({ result: query }), {
        headers: { "Content-Type": "application/json" },
    });
    // return result.toDataStreamResponse();
}