import { supabase } from "@/utils/supabase";

export const fetchStudentProfileByEmail  = async (email: string) => {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('email', email);


  if (error) {
    console.error('Error fetching student profile:', error);
    return null;
  }

  return data[0];
}