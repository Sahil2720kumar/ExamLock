import { supabase } from "@/utils/supabase";
import { Exam } from "@/types";
import { formatDate } from "@/utils/dateTimeHelpers";


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

export const createExam = async (exam: any,teacherId:string) => {
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
    startDate: formatDate(exam.startDate),
    start_time: exam.startTime,
    end_time: exam.endTime,
    teacher_id: teacherId,
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


export const updateExam = async (exam: any, examId: string) => {
  // First, create a properly formatted exam object
  const updatedExam = {
    title: exam.title,
    description: exam.description,
    duration: exam.duration,
    totalMarks: exam.totalMarks,
    students: exam.students,
    subject: exam.subject,
    status: exam.status,
    venue: exam.venue,
    // Correctly handle date conversion for DD/MM/YYYY format
    date: new Date(), // Using a helper function defined below
    startDate: formatDate(exam.startDate), // Using a helper function defined below
    start_time: exam.start_time,
    end_time: exam.end_time,
    teacher_id: exam.teacher_id,
  };


  // Then use the formatted object for the update
  const { data, error } = await supabase
    .from('exams')
    .update(updatedExam)
    .eq('id', examId)
    .select('*');

  if (error) {
    console.error('Error updating exam:', error);
    throw error;
  }
  
  return data;
};



export const fetchExamsByTeacherId = async (teacherId:string) => {
  const {data,error}=await supabase.from('exams').select('*').eq('teacher_id',teacherId);
  if(error){
    console.error('Error fetching exams:', error);
    throw error;
  }
  return data;
}


export const fetchExamById = async (examId:string):Promise<Exam> => {
  console.log("calling fetchExamById", examId);
  
  const {data,error}=await supabase.from('exams').select('*').eq('id',examId).single();
  if(error){
    console.error('Error fetching exam:', error);
    throw error;
  }

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


export const fetchQuestionsByExamId = async (examId:string) => {
  console.log("calling fetchQuestionsByExamId", examId);
  const {data,error}=await supabase.from('questions').select('*').eq('exam_id',examId);
  if(error){
    console.error('Error fetching questions:', error);
    throw error;
  }

  console.log("Questions fetched successfully", data);
  return data;
}

export const fetchQuestionById = async (questionId:string) => {
  const {data,error}=await supabase.from('questions').select('*').eq('id',questionId).single();
  if(error){
    console.error('Error fetching question:', error);
    throw error;
  }

  console.log("single Question fetched successfully", data);
  return data;
}

export const createOneQuestion = async (question: any, examId: string) => {
  const { data, error } = await supabase.from('questions').insert(question).select('*');
  if (error) {
    console.error('Error creating question:', error);
    throw error;
  } 
  return data;
}


export const updateQuestionById = async (question: any, questionId: string) => {
  const { data, error } = await supabase
    .from('questions')
    .update(question)
    .eq('id', questionId)
    .select('*').single();

  console.log("updatedQuestion", data);

  if (error) {
    console.error('Error updating question:', error);
    throw error;
  }
  return data;
}


export const deleteOneExam = async (examId:string) => {
  const {data,error}=await supabase.from('exams').delete().eq('id',examId);
  if(error){
    console.error('Error deleting exam:', error);
    throw error;
  }
  return data;
}


export const deleteQuestion = async (questionId:string) => {
  const {data,error}=await supabase.from('questions').delete().eq('id',questionId);
  if(error){
    console.error('Error deleting question:', error);
    throw error;
  }
  return data;
}

