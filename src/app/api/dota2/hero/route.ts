import { supabaseClient } from "@/utils/supabase";

export const maxDuration = 30;

export async function POST(req: Request): Promise<Response> {
    const { heroNames } = await req.json();

    if ( heroNames === undefined ) {
        return new Response("Missing required parameters", { status: 400 });
    }

    const { data, error } = await supabaseClient
                                .from("dota2hero")
                                .select("*")
                                .eq("name", heroNames);

    if (error) {
        throw new Error(`Error running query: ${error}`);
    }

    return new Response(JSON.stringify({ result: data }), {
        headers: { "Content-Type": "application/json" },
    });
}