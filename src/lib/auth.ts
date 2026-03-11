import { supabase } from "./supabase"

const SITE_URL = import.meta.env.VITE_SITE_URL

export const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${SITE_URL}/dashboard`
        }
    })

    if (error) {
        console.error("Google auth error:", error.message)
    }
}

export const signInWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: `${SITE_URL}/dashboard`
        }
    })

    if (error) {
        console.error("GitHub auth error:", error.message)
    }
}