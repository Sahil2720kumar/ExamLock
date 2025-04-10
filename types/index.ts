export interface Exam {
  id: string;
  title: string;
  description: string;
  duration: number;
  totalMarks: number;
  students: number;
  subject: string;
  venue: string;
  date: Date;
  startDate: Date;
  start_time: Date;
  end_time: Date;
  teacher_id: string;
  status: 'draft' | 'scheduled' | 'active' | 'completed';
}

export interface Question {
  id?: string;
  question: string;
  options: string[];
  exam_id: string;
  type: 'mcq' | 'descriptive' | 'image';
  correct_option?: number;
  marks: number;
  image_url?: string;
}

