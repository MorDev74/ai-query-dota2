"use client"

import { Result } from "@/utils/types";
import { HeroCard } from "./HeroCard";

export function QueryResult({
  question,
  results
}:{
  question: string;
  results: Result[];
}) {
  return (
    <div className={`flex flex-col mx-auto
        sm:max-w-[700px] lg:max-w-[700px] 2xl:max-w-[1000px]
    `}>
      {question && <div className="border border-gray-600 p-2 rounded-md text-2xl font-bold">
        {`Question:  ${question}`}
      </div>}

      <div className={`overflow-y-auto flex flex-wrap gap-2 rounded-md`}>
        {results.map((result,index) => (
          <HeroCard key={index} result={result} />
        ))}
      </div>
    </div>
  );
}
