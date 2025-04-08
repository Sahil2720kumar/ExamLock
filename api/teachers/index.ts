import { supabase } from "@/utils/supabase";

export const fetchTeacherProfileByEmail  = async (email: string) => {
  const { data, error } = await supabase
    .from('teachers')
    .select('*')
    .eq('email', email);


  if (error) {
    console.error('Error fetching teacher profile:', error);
    return null;
  }

  return data[0];
}