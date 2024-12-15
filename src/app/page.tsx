"use client"

import React, { useState } from "react";
import { RadioGroup } from "@/components/radio-group";
import { SearchBox } from "@/components/search-box";
import { QueryResult } from "@/components/query-result";
import { ComboMenu } from "@/components/combo-menu";

export default function Home() {

  const optionList = [
    { value: "Hero", enabled: true, },
    { value: "Item", enabled: true, },
    { value: "Ability", enabled: false, },
    { value: "Patch Note", enabled: true, },
  ];

  const llmList = [
    "openai/gpt-4o-2024-11-20"
  ];

  const [modelName, setModelName] = useState(llmList[0]);
  console.log(modelName);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const question = formData.get("question") as string;

    const response = await fetch("/api/openrouter/completion", {
      method: "POST",
      body: JSON.stringify({
        question: question,
        modelName: modelName,
      }),
    });

    response.json().then(data => console.log(data));
    // console.log(result.json());
  }

  return (
    <div className="flex flex-col gap-4 m-4">

      <div className="flex flex-row gap-4 justify-between">
        <div className="text-2xl font-bold">AI Query Dota2</div>
        <ComboMenu selectValue={modelName} setSelectValue={setModelName} list={llmList}/>
      </div>

      <RadioGroup optionList={optionList} />

      <SearchBox handleSubmit={handleSubmit} />

      <QueryResult />

    </div>
  );
}
