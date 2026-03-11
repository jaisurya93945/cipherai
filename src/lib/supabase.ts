import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://lickmnrpevuommnzhtky.supabase.co"
const supabaseKey = "sb_publishable_6lTFRsWIZQ4Gbjy47BEwWQ_X0wvwyaZ"

export const supabase = createClient(supabaseUrl, supabaseKey)