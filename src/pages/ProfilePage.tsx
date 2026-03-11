import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"

export default function ProfilePage() {

    const navigate = useNavigate()

    const [user, setUser] = useState<any>(null)
    const [name, setName] = useState("")
    const [dob, setDob] = useState("")
    const [college, setCollege] = useState("")
    const [avatar, setAvatar] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const loadProfile = async () => {

            const { data } = await supabase.auth.getUser()
            const currentUser = data.user

            if (!currentUser) return

            setUser(currentUser)

            const { data: profile } = await supabase
                .from("users")
                .select("*")
                .eq("id", currentUser.id)
                .single()

            if (profile) {
                setName(profile.name || "")
                setDob(profile.dob || "")
                setCollege(profile.college || "")
                setAvatar(profile.avatar || "")
            }

        }

        loadProfile()

    }, [])

    const saveProfile = async () => {
        setLoading(true)

        const { data } = await supabase.auth.getUser()
        const user = data.user

        if (!user) {
            setLoading(false)
            return
        }

        const { error } = await supabase
            .from("users")
            .update({
                name: name,
                dob: dob,
                college: college,
                avatar: avatar
            })
            .eq("id", user.id)

        setLoading(false)

        if (error) {
            console.error(error)
            toast.error("Profile update failed")
        } else {
            toast.success("Profile updated successfully")
            navigate("/dashboard")
        }
    }

    return (

        <div className="min-h-screen bg-[#0f1117] text-white flex justify-center items-center">

            <div className="bg-white/5 p-8 rounded-xl w-[420px]">

                <h2 className="text-2xl mb-6 font-semibold">Edit Profile</h2>

                <div className="flex flex-col gap-4">

                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        className="p-3 rounded bg-white/10"
                    />

                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="p-3 rounded bg-white/10"
                    />

                    <input
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        placeholder="College Name"
                        className="p-3 rounded bg-white/10"
                    />

                    <input
                        value={user?.email}
                        disabled
                        className="p-3 rounded bg-white/10 opacity-50"
                    />

                    <input
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                        placeholder="Profile Image URL"
                        className="p-3 rounded bg-white/10"
                    />

                    <button
                        onClick={saveProfile}
                        className="bg-blue-600 p-3 rounded-lg mt-3"
                    >
                        {loading ? "Saving..." : "Save Profile"}
                    </button>

                </div>

            </div>

        </div>

    )

}