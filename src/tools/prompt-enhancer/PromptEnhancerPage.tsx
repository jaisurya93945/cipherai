import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function PromptEnhancerPage() {

    const [prompt, setPrompt] = useState("")
    const [result, setResult] = useState("")
    const [loading, setLoading] = useState(false)
    const [length, setLength] = useState("medium")

    const enhancePrompt = async () => {

        if (!prompt.trim()) return

        setLoading(true)
        setResult("Enhancing prompt...")

        try {

            // get user
            const { data: authData } = await supabase.auth.getUser()
            const user = authData.user

            if (!user) {
                alert("Please login")
                return
            }

            // get credits
            const { data: userData } = await supabase
                .from("users")
                .select("daily_credits, paid_credits")
                .eq("id", user.id)
                .single()

            const totalCredits =
                userData?.daily_credits + userData?.paid_credits

            if (totalCredits < 1) {
                alert("Not enough credits")
                return
            }

            // choose enhancement level
            let instruction = ""

            if (length === "small") {
                instruction =
                    "Improve the prompt slightly while keeping it concise."
            }

            if (length === "medium") {
                instruction =
                    "Rewrite the prompt clearly with better structure and clarity."
            }

            if (length === "large") {
                instruction =
                    "Rewrite the prompt professionally with detailed instructions, structure, context, and clear task breakdown for AI models."
            }

            const response = await fetch(
                "https://openrouter.ai/api/v1/chat/completions",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        model: "deepseek/deepseek-chat",
                        messages: [
                            {
                                role: "system",
                                content:
                                    "You are a professional AI prompt engineer who creates powerful prompts for AI systems."
                            },
                            {
                                role: "user",
                                content: `${instruction}

Original Prompt:
${prompt}`
                            }
                        ]
                    })
                }
            )

            const data = await response.json()

            const enhanced =
                data.choices?.[0]?.message?.content || "Enhancement failed."

            setResult(enhanced)

            // deduct credits
            let newDaily = userData?.daily_credits
            let newPaid = userData?.paid_credits

            if (newDaily >= 1) {
                newDaily -= 1
            } else {
                newPaid -= 1
            }

            await supabase
                .from("users")
                .update({
                    daily_credits: newDaily,
                    paid_credits: newPaid
                })
                .eq("id", user.id)

        } catch (error) {

            setResult("Error enhancing prompt.")

        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen pt-28 w-full mx-auto px-6 max-w-5xl">

            <h1 className="text-3xl font-bold mb-6">
                Prompt Enhancer
            </h1>

            {/* Prompt Input */}
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt..."
                className="w-full h-40 p-4 rounded-xl bg-black/30 border border-white/10 resize-none"
            />

            {/* Length Selector */}
            <div className="flex gap-3 mt-4">

                <button
                    onClick={() => setLength("small")}
                    className={`px-4 py-2 rounded-lg ${length === "small"
                        ? "bg-blue-500"
                        : "bg-gray-800"
                        }`}
                >
                    Small
                </button>

                <button
                    onClick={() => setLength("medium")}
                    className={`px-4 py-2 rounded-lg ${length === "medium"
                        ? "bg-blue-500"
                        : "bg-gray-800"
                        }`}
                >
                    Medium
                </button>

                <button
                    onClick={() => setLength("large")}
                    className={`px-4 py-2 rounded-lg ${length === "large"
                        ? "bg-blue-500"
                        : "bg-gray-800"
                        }`}
                >
                    Large
                </button>

            </div>

            {/* Enhance Button */}
            <button
                onClick={enhancePrompt}
                disabled={loading}
                className="mt-5 px-6 py-3 bg-blue-600 rounded-lg"
            >
                {loading ? "Enhancing..." : "Enhance Prompt"}
            </button>

            {/* Result */}
            {result && (
                <div className="mt-6 p-4 bg-black/30 rounded-xl border border-white/10">

                    <div className="flex justify-between mb-3">

                        <h2 className="font-semibold">
                            Enhanced Prompt
                        </h2>

                        <button
                            onClick={() => navigator.clipboard.writeText(result)}
                            className="text-sm text-blue-400"
                        >
                            Copy
                        </button>

                    </div>

                    <pre className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                        {result}
                    </pre>

                </div>
            )}

        </div>
    )
}