"use client"

import React from "react";

type Props = {
    value: string, key:string, enabled: boolean
};
export function RadioGroup({
    isProcessing,
    category, 
    setCategory,
    categoryList,
}: {
    isProcessing: boolean,
    category: Props, 
    setCategory:React.Dispatch<React.SetStateAction<Props>>,
    categoryList: Props[],
}) {
    function handleCategoryChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value:string  = e.target.value;

        const selectedItem = categoryList.find(item => item.value === value);
        if (selectedItem) {
            setCategory(selectedItem);
        }
    }

    return (
        <div className="flex flex-row justify-center">
            <div className="relative flex flex-row gap-1">
                {categoryList.map((categoryInfo, index) => (
                    <div
                        key={index}
                        className={`-skew-x-12`}
                    >
                        <input
                            key={`input-${index}`}
                            type="radio"
                            id={`${categoryInfo.value}-${index}`}
                            name="options"
                            value={categoryInfo.value}
                            onChange={handleCategoryChange}
                            disabled={!categoryInfo.enabled || isProcessing}
                            checked={category.value === categoryInfo.value}
                            className="appearance-none"
                        />

                        <label
                            key={`label-${index}`}
                            htmlFor={`${categoryInfo.value}-${index}`}
                            className={`border border-gray-300 px-4 py-2 cursor-pointer
                                transition-all duration-500 ease-in-out
                                font-bold text-xl
                                text-white
                                ${categoryInfo.enabled
                                ? category.value === categoryInfo.value
                                                    ? "bg-gradient-to-b from-red-600 to-red-900"
                                                    : "bg-gray-900"
                                : "bg-gray-700"
                                }
                            `}
                        >{categoryInfo.value}</label>

                    </div>
                ))}
            </div>
        </div>
    );
}