import { generateObject } from "ai";
import { z } from "zod";
import { supabaseClient } from "@/utils/supabase";
import { openrouterClient } from "@/utils/openrouter";
import { Result } from "@/utils/types"
import {
  systemMessageHeroes,
  systemMessageItems,
  systemMessageAbilities,
  systemMessagePatchNotes,
} from "@/utils/config";

const modelGenSql="openai/gpt-3.5-turbo";

interface ToolCall {
  index: number;
  id: string;
  type: string;
  function: {
    name: string;
    arguments: string;
  }
}

const genSqlFuncMap = {
  "toolQueryHeroData": toolQueryHeroData,
  "toolQueryAbilityData": toolQueryAbilityData,
  "toolQueryItemData": toolQueryItemData,
  "toolQueryPatchNoteData": toolQueryPatchNoteData
} as const;
type genSqlFuncName = keyof typeof genSqlFuncMap;

export async function runFunction(toolCall: ToolCall) {
  try {
    if (toolCall.function.name in genSqlFuncMap) {
      const genSqlFunc = genSqlFuncMap[toolCall.function.name as genSqlFuncName];
      const args = JSON.parse(toolCall.function.arguments);
      return await genSqlFunc(modelGenSql, args.question);
    }
    else{
      return "error";
    }
  } catch (error) {
    void error;
    return "error";
  }
}

async function generateQuery(modelName: string, system: string, question: string) {
  const llmClient = openrouterClient;
  try {
    const result = await generateObject({
      model: llmClient(modelName),
      system: system,
      prompt: `Generate the query necessary to retrieve the data the user wants: ${question}`,
      schema: z.object({
        query: z.string(),
      }),
      temperature: 0,
    });
    return result.object.query;
  } catch (error) {
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

export async function toolQueryHeroData(modelName: string, question: string): Promise<Result[]> {
  const system = systemMessageHeroes;
  const query = await generateQuery(modelName, system, question);

  if (query === "error") { return []; }

  const queryData = await runQuery(query);
  return queryData;
}

export async function toolQueryAbilityData(modelName: string, question: string) {
  const system = systemMessageAbilities;
  const query = await generateQuery(modelName, system, question);

  if (query === "error") { return []; }

  const queryData = await runQuery(query);
  return queryData;
}

export async function toolQueryItemData(modelName: string, question: string) {
  const system = systemMessageItems;
  const query = await generateQuery(modelName, system, question);

  if (query === "error") { return []; }

  const queryData = await runQuery(query);
  return queryData;
}

export async function toolQueryPatchNoteData(modelName: string, question: string) {
  const system = systemMessagePatchNotes;
  const query = await generateQuery(modelName, system, question);

  if (query === "error") { return []; }

  const queryData = await runQuery(query);
  return queryData;
}

export function toolQueryHeroAbilityData() {

}

export function toolQueryWebSearch() {

}