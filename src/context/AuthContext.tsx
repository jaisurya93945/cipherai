import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        // Restore session on refresh
        const restoreSession = async () => {
            const { data } = await supabase.auth.getSession()

            if (data.session) {
                setUser(data.session.user)
            }

            setLoading(false)
        }

        restoreSession()

        // Listen for login/logout
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null)
            }
        )

        return () => {
            listener.subscription.unsubscribe()
        }

    }, [])

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)