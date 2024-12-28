"use client"

import React, { useState } from "react";
import { ComboMenu } from "@/components/ComboMenu";
import { RadioGroup } from "@/components/RadioGroup";
import { SearchBox } from "@/components/SearchBox";
import { QuestionExample } from "@/components/QuestionExample";
import { QueryResult } from "@/components/QueryResult";
import { categoryList, llmList } from "@/utils/config";
import { Result } from "@/utils/types";
import DevPanel from "@/components/DevPanel";

export default function Home() {

  const [modelName, setModelName] = useState(llmList[0]);
  const [category, setCategory] = useState<{ value: string, key: string, enabled: boolean }>(categoryList[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [question, setQuestion] = useState("");

  // async function handleEmbedding() {
  //   const response = await fetch("/api/dashscope/embedding", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       input: "Which hero has the hightest base strength?",
  //     }),
  //   });

  //   const result = await response.json();
  //   // result.messsage: data/id/model/object/usage
  //   const embedding = result.message.data[0].embedding;
  //   console.log(embedding);
  //   console.log(embedding.length);
  // }

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
    <div className="flex flex-col gap-4 m-4 h-full">

      <div className="flex flex-row gap-4 justify-between">
        <div className="text-2xl font-bold">AI Query Dota2</div>
        {/* <button onClick={handleEmbedding}>
          Embedding
        </button> */}
        <ComboMenu isProcessing={isProcessing} selectValue={modelName} setSelectValue={setModelName} list={llmList} />
      </div>


      <RadioGroup isProcessing={isProcessing} category={category} setCategory={setCategory} categoryList={categoryList} />

      <SearchBox isProcessing={isProcessing} handleSubmit={handleSubmit} />

      <QuestionExample isProcessing={isProcessing} category={category.key} handleClick={queryDota2} />

      <QueryResult question={question} results={results} />

      <DevPanel />

    </div>
  );
}
