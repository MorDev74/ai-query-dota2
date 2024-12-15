"use client"

import Image from "next/image";
import { URL_IMAGE_HERO } from "@/utils/config"

export function QueryResult() {
  const heroName = "tiny";
  return (
    <div className="border">
      Query Result
      <Image
        src={`${URL_IMAGE_HERO}${heroName}.png`}
        alt="hero"
        width={200}
        height={112}
      >
      </Image>
    </div>
  );
}
