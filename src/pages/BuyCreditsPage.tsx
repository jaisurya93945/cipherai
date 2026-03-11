import { motion } from "framer-motion"

export default function BuyCreditsPage() {

    const plans = [
        {
            name: "Starter",
            price: "₹99",
            credits: "500 Credits",
            description: "Perfect for trying CipherAI",
            popular: false
        },
        {
            name: "Pro",
            price: "₹299",
            credits: "2000 Credits",
            description: "Most popular choice",
            popular: true
        },
        {
            name: "Creator",
            price: "₹999",
            credits: "10000 Credits",
            description: "Best for power users",
            popular: false
        }
    ]

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white px-6 py-20">

            {/* TITLE */}
            <div className="max-w-6xl mx-auto text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">Buy Credits</h1>
                <p className="text-gray-400">
                    Purchase credits to use CipherAI tools
                </p>
            </div>

            {/* PRICING CARDS */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

                {plans.map((plan, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05, y: -8 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className={`relative bg-zinc-900 border rounded-xl p-8 text-center ${plan.popular
                                ? "border-cyan-500 shadow-[0_0_25px_rgba(0,255,255,0.3)]"
                                : "border-zinc-800"
                            }`}
                    >

                        {plan.popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-sm px-3 py-1 rounded-full">
                                Most Popular
                            </div>
                        )}

                        <h2 className="text-2xl font-semibold mb-3">{plan.name}</h2>

                        <p className="text-4xl font-bold mb-2">{plan.price}</p>

                        <p className="text-cyan-400 mb-3">{plan.credits}</p>

                        <p className="text-gray-400 mb-6">{plan.description}</p>

                        <button
                            onClick={() => alert(`Buying ${plan.credits}`)}
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition"
                        >
                            Buy Credits
                        </button>

                    </motion.div>
                ))}

            </div>

            {/* HOW CREDITS WORK */}
            <div className="max-w-4xl mx-auto mt-20 text-center">

                <h2 className="text-2xl font-semibold mb-8">
                    ⚡ How Credits Work
                </h2>

                <div className="grid md:grid-cols-3 gap-6">

                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                        <p className="text-xl font-semibold text-cyan-400 mb-2">
                            1 Credit
                        </p>
                        <p className="text-gray-400">
                            1 AI request (chat, text tools)
                        </p>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                        <p className="text-xl font-semibold text-cyan-400 mb-2">
                            5 Credits
                        </p>
                        <p className="text-gray-400">
                            Image generation
                        </p>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                        <p className="text-xl font-semibold text-cyan-400 mb-2">
                            20 Credits
                        </p>
                        <p className="text-gray-400">
                            Video generation
                        </p>
                    </div>

                </div>

            </div>

        </div>
    )
}