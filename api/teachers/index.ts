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

export const createExam = async (exam: any) => {
  // console.log("Exam data being sent:", exam);
  
  // Convert empty strings to null for integer fields
  // or provide default values where appropriate
  const examData = {
    title: exam.title,
    description: exam.description,
    duration: exam.duration === "" ? null : parseInt(exam.duration),
    totalMarks: exam.totalMarks === "" ? null : parseInt(exam.totalMarks),
    students: exam.students === "" ? null : parseInt(exam.students),
    subject: exam.subject,
    status: 'scheduled',
    venue: exam.venue,
    date: new Date(),
    startDate: exam.startDate,
    start_time: exam.startTime,
    end_time: exam.endTime,
  };
  
  // console.log("Processed exam data:", examData);
  
  const { data, error } = await supabase.from('exams').insert(examData).select('*');

  if (error) {
    console.error('Error creating exam:', error);
    throw error; // Throw the error so it can be caught in the calling function
  }

  // console.log("Exam created successfully");
  // console.log("api Exam data", data);
  return data;
}

export const createQuestion = async (question: any, examId: string) => {
  // console.log(question);
  const questionData = question.map((q: any) => ({
    question: q.question,
    options: q.options,
    exam_id: examId,
    type: q.type,
    correct_option: q.correctOption,
    marks: q.marks,
    image_url: q?.imageUrl,
  }));
  const { data, error } = await supabase.from('questions').insert(questionData).select('*');
  if (error) {
    console.error('Error creating question:', error);
    throw error; // Throw the error so it can be caught in the calling function
  }
  // console.log("Question created successfully");
  // console.log("api Question data", data);
  return data;
}

