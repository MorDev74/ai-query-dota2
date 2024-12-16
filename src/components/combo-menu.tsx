"use client"

import React from "react";

export function ComboMenu({
    isProcessing,
    selectValue, 
    setSelectValue, 
    list
}:{
    isProcessing: boolean,
    selectValue:string, 
    setSelectValue: React.Dispatch<React.SetStateAction<string>>, 
    list:string[]}
) {

    function onSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();
        setSelectValue(e.target.value);
    }

    return (
        <div className="flex flex-row gap-2 items-center">
            <div className="font-bold">LLM Model</div>

            <select 
                value={selectValue || ""}
                onChange={onSelectChange}
                className="rounded-md p-2
                    bg-gradient-to-b from-red-600 to-red-900
                "
            >
                {list.map((item,index) => (
                    <option
                        key={index}
                        disabled={isProcessing}
                        className="
                            text-white
                            bg-red-900 
                        "
                        value={item}
                    >
                        {item}
                    </option>
                ))}
            </select>
        </div>
    );
}