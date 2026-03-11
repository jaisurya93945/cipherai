import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function CoursesPage() {
    const [courses, setCourses] = useState<any[]>([])

    useEffect(() => {
        const loadCourses = async () => {
            const { data, error } = await supabase
                .from("courses")
                .select("*")

            if (!error) setCourses(data || [])
        }

        loadCourses()
    }, [])

    return (
        <div className="min-h-screen px-10 py-20 bg-[#0a0a0f]">

            {/* Title */}
            <h1 className="text-3xl font-bold mb-10 text-white">
                Explore Courses
            </h1>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                {courses.map((course) => (

                    <div
                        key={course.id}
                        className="bg-[#11131a] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
                    >

                        {/* Image */}
                        <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-44 object-cover"
                        />

                        {/* Content */}
                        <div className="p-4">

                            <h3 className="text-lg font-semibold text-white mb-2">
                                {course.title}
                            </h3>

                            <p className="text-blue-400 font-semibold mb-4">
                                ₹{course.price}
                            </p>

                            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 py-2 rounded-lg text-white font-medium hover:opacity-90">
                                Buy Course
                            </button>

                        </div>

                    </div>

                ))}

            </div>
        </div>
    )
}