import { tools } from "@/utils/tools_schema";
import { runFunction } from "@/utils/tools_function";

export const maxDuration = 30;

const systemLanguageConverter = "You are a multilingual expert who accurately translates any question from the user into English, without any extra responses.";
const systemToolCalling = "You are an AI assistant that helps users get information about Dota 2. Your task is to understand the user's question and determine which API tools to use to get the relevant information.";
const systemAnwser = `You are an AI assistant that helps users get information about Dota 2. Your task is to understand the user's question, and provide the answer based on the given CONTEXT.\n[CONTEXT]\n`;

export async function POST(req: Request): Promise<Response> {
  try {
    const { question } = await req.json();

    if (!question) {
      return new Response(
        JSON.stringify({ error: "Question is required" }), 
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 1. Convert language to English
    let modelName = "qwen/qwen-2-7b-instruct:free"
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY_QUERY_DOTA2}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: "system", content: systemLanguageConverter },
          { role: "user", content: question }
        ],
        temperature: 0,
      }),
    });

    const translatedData = await response.json();
    const translatedQuestion = translatedData.choices[0].message.content;
    console.log(`=====\ntranslated question: ${JSON.stringify(translatedQuestion)}`);

    // 2. Supervisor determines which tools to use
    modelName = "openai/gpt-4o"
    const toolResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY_QUERY_DOTA2}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: "system", content: systemToolCalling },
          { role: "user", content: `Generate the query necessary to retrieve the data the user wants: ${translatedQuestion}` }
        ],
        tools: tools,
        temperature: 0,
      }),
    });

    const toolData = await toolResponse.json();
    const toolSelection = toolData.choices[0].message.tool_calls;
    console.log(`=====\ntool selection: ${JSON.stringify(toolSelection)}`);

    if (toolSelection.length === 0) {
      // TODO: if not tool calls, try answer user by llm self
      return new Response(
        JSON.stringify({ error: "No tool calls available" }), 
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Execute the function and wait for results
    const result = await runFunction(toolSelection[0]);
    console.log(`=====\nrun function: ${JSON.stringify(result)}`);

    // 3. generate answer
    modelName = "qwen/qwen-2-7b-instruct:free"
    const systemFinalAnwser = `${systemAnwser}${JSON.stringify(result)}`
    const responseAnswer = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY_QUERY_DOTA2}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: "system", content: systemFinalAnwser },
          { role: "user", content: question }
        ],
        temperature: 0,
      }),
    });

    const dataAnwser = await responseAnswer.json();
    const contentAnwser = dataAnwser.choices[0].message.content;
    console.log(`=====\nfinal anwser: ${JSON.stringify(contentAnwser)}`);

    // Return the results
    return new Response(
      JSON.stringify({
        contentAnwser,
        translatedQuestion,
        toolSelection,
        result,
        status: "completed"
      }), 
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error('Error in agent route:', error);
    // Add type checking for the error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: "Internal server error", details: errorMessage }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}