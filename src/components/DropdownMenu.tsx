"use client"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export function DropMenu({
    isProcessing,
    name,
    selectValue, 
    setSelectValue, 
    list
}:{
    isProcessing: boolean,
    name: string,
    selectValue:string, 
    setSelectValue: React.Dispatch<React.SetStateAction<string>>, 
    list:string[]}
) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button 
                    disabled={isProcessing}
                    className="rounded-md p-2 bg-gradient-to-b from-red-600 to-red-900"
                >
                    {name}
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content className="rounded-md">
                    {list.map((item, index) => (
                        <DropdownMenu.Item
                            key={index}
                            className={`cursor-pointer p-2 bg-red-900 hover:bg-red-600
                                ${selectValue === item ? "bg-red-700" : ""}
                            `}
                            onSelect={() => setSelectValue(item)}
                        >
                            {item}
                        </DropdownMenu.Item>
                    ))}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}