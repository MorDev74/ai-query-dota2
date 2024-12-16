import { Result } from "@/utils/types"
import Image from "next/image";
import { URL_IMAGE_HERO } from "@/utils/config"

export function HeroCard({result}:{result: Result}) {

    const { name, name_loc } = result;
    const heroName = (name as string).replace("npc_dota_hero_", "");

    return (
        <div
            className="border rounded-md p-2 m-2
                flex-col gap-1
                border-gray-500
            "
        >
            <div className="font-bold">{name_loc}</div>

            <div className="flex flex-row">
                <Image
                    src={`${URL_IMAGE_HERO}${heroName}.png`}
                    alt="hero"
                    width={200}
                    height={112}
                >
                </Image>

                <div className={`flex flex-col justify-between m-1 p-2 min-w-32 border rounded-md
                    border-gray-500
                `}>
                    {Object.keys(result).map((key, index) => (
                        (["id","name","name_loc"].indexOf(key) === -1) && 
                        <div
                            key={index}
                            className="flex flex-row justify-between gap-4"
                        >
                            <div>{key}</div>
                            <div>{result[key]}</div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}