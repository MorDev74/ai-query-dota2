"use client"

import React,{useState} from "react";
export function RadioGroup({
    optionList,
}: {
    optionList: { value: string, enabled: boolean }[],
}) {
    const [selectedOption, setSelectedOption] = useState(optionList[0].value);

    function handleOptionChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSelectedOption(e.target.value);
    }

    return (
        <div className="flex flex-row justify-center">
            <div className="relative flex flex-row gap-1">
                {optionList.map((optionInfo, index) => (
                    <div
                        key={index}
                        className={`-skew-x-12`}
                    >

                        <input
                            key={`input-${index}`}
                            type="radio"
                            id={`${optionInfo.value}-${index}`}
                            name="options"
                            value={optionInfo.value}
                            onChange={handleOptionChange}
                            disabled={!optionInfo.enabled}
                            checked={selectedOption === optionInfo.value}
                            className="appearance-none"
                        />

                        <label
                            key={`label-${index}`}
                            htmlFor={`${optionInfo.value}-${index}`}
                            className={`border border-gray-300 px-4 py-2 cursor-pointer
                                transition-all duration-500 ease-in-out
                                font-bold text-xl
                                text-white
                                ${optionInfo.enabled
                                ? selectedOption === optionInfo.value
                                                    ? "bg-gradient-to-b from-red-600 to-red-900"
                                                    : "bg-gray-900"
                                : "bg-gray-700"
                                }
                            `}
                        >{optionInfo.value}</label>

                    </div>
                ))}
            </div>
        </div>
    );
}