import { questionExampleHero,questionExampleItem,questionExampleAbility,questionExamplePatchNote } from "@/utils/config"; 
export function QuestionExample({ category, handleClick }: { category: string; handleClick: (question:string) => void  }) {
    console.log(category)

    let exampleList:string[] = [];
    if (category === "hero") {
        exampleList = questionExampleHero;
    } else if (category === "item") {
        exampleList = questionExampleItem;
    } else if (category === "ability") {
        exampleList = questionExampleAbility;
    } else if (category === "patch_note") {
        exampleList = questionExamplePatchNote;
    }

    // sm	640px	小屏幕，例如手机
    // md	768px	中等屏幕，例如平板
    // lg	1024px	大屏幕，例如笔记本
    // xl	1280px	更大屏幕，例如台式机显示器
    // 2xl	1536px	超大屏幕

    return (
        <div className="flex flex-wrap gap-3 mx-auto 
            sm:max-w-[500px] lg:max-w-[700px] 2xl:max-w-[1000px]
        ">
            {exampleList.map((item, index) => (
                <button
                    key={index}
                    className="border border-white text-white p-2 rounded-md
                        transition-all duration-500 ease-in-out
                        bg-slate-900
                        hover:bg-slate-600
                    "
                    onClick={() => handleClick(item)}
                >
                    {item}
                </button>
            ))}
        </div>
    );
}