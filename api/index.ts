import { supabase } from "@/utils/supabase";

export const fetchUserByEmail=async(email:string)=>{
  console.log("fetching user by email", email);
    const {data, error}=await supabase.from('users').select('*').eq('email', email).single();
    return data;
}
