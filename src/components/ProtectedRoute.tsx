import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function ProtectedRoute({ children }: any) {

    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className=" rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/auth/login" replace />
    }

    return children
}