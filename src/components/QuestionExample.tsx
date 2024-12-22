import { questionExampleHero,questionExampleItem,questionExampleAbility,questionExamplePatchNote } from "@/utils/config"; 
export function QuestionExample({ 
    isProcessing,
    category, 
    handleClick 
}: { 
    isProcessing: boolean,
    category: string; 
    handleClick: (question:string) => void
}) {
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
                    disabled={isProcessing}
                    className="border border-gray-500 text-white p-2 rounded-md
                        transition-all duration-500 ease-in-out
                        bg-gradient-to-r from-slate-900 to-slate-700
                        hover:bg-slate-600
                        disabled:bg-slate-600
                    "
                    onClick={() => handleClick(item)}
                >
                    {item}
                </button>
            ))}
        </div>
    );
}