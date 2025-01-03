"use client"

export function SearchBox({ 
    isProcessing,
    handleSubmit 
}: { 
    isProcessing: boolean,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void }
) {
    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-row gap-2 m-2 mx-auto justify-center
                w-[400px]
            "
        >
            <input
                type="text"
                disabled={isProcessing}
                name="question"
                placeholder="Search"
                className="
                    w-full
                    p-2
                    rounded-md
                    border-2
                    border-gray-300
                    focus:outline-none
                    focus:border-sky-500
                    text-black
                "
            />
            <button
                type="submit"
                disabled={isProcessing}
                className="p-2 rounded-md 
                    bg-gradient-to-b from-red-900 to-red-700
                "
            >
                Submit
            </button>
        </form>
    );
}