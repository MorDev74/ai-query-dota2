"use client"

export function SearchBox({ handleSubmit }: { handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) {
    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-row gap-2 m-2 mx-auto justify-center
                w-[400px]
            "
        >
            <input
                type="text"
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
                className="p-2 rounded-md 
                    bg-gradient-to-b from-red-600 to-red-900
                "
            >
                Submit
            </button>
        </form>
    );
}