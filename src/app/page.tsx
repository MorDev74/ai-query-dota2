"use client"

import React, { useState } from "react";
import { ComboMenu } from "@/components/combo-menu";
import { RadioGroup } from "@/components/radio-group";
import { SearchBox } from "@/components/search-box";
import { QuestionExample } from "@/components/question-example";
import { QueryResult } from "@/components/query-result";
import { categoryList, llmList } from "@/utils/config";
import { Result } from "@/utils/types"

export default function Home() {

  const [modelName, setModelName] = useState(llmList[0]);
  const [category, setCategory] = useState<{ value: string, key: string, enabled: boolean }>(categoryList[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [question, setQuestion] = useState("");

  async function queryDota2(question: string) {
    setQuestion(question);
    setIsProcessing(true);
    const response = await fetch("/api/openrouter/completion", {
      method: "POST",
      body: JSON.stringify({
        question: question,
        modelName: modelName,
        category: category.key,
      }),
    });

    const data = await response.json();
    const rows = data.result;

    setResults(rows);

    setIsProcessing(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const question = formData.get("question") as string;
    queryDota2(question);
  }

  return (
    <div className="flex flex-col gap-4 m-4">

      <div className="flex flex-row gap-4 justify-between">
        <div className="text-2xl font-bold">AI Query Dota2</div>
        <ComboMenu isProcessing={isProcessing} selectValue={modelName} setSelectValue={setModelName} list={llmList} />
      </div>

      <RadioGroup isProcessing={isProcessing} category={category} setCategory={setCategory} categoryList={categoryList} />

      <SearchBox isProcessing={isProcessing} handleSubmit={handleSubmit} />

      <QuestionExample isProcessing={isProcessing} category={category.key} handleClick={queryDota2} />

      <QueryResult question={question} results={results}/>

    </div>
  );
}
