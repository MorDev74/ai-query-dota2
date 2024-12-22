const baseUrlHttps = "https://dashscope.aliyuncs.com/compatible-mode/v1/embeddings"
const modelName = "text-embedding-v3";

const dashscopeApiKey = process.env.DASHSCOPE_API_KEY_EMBEDDING;
export async function POST(request: Request) {
    const { input } = await request.json();
    const response = await fetch(baseUrlHttps, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${dashscopeApiKey}`
        },
        body: JSON.stringify({
            model: modelName,
            input: input,
            encoding_format: "float",
        })
    });

    if (!response.ok) {
        return Response.json({ error: "Failed to fetch from DashScope API" }, { status: 500 });
    }

    const data = await response.json();

    console.log(response);
    console.log(data);

    return Response.json({ message: data });
}