import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

// Mock data - replace with actual data from your backend
const submissions = [
  {
    id: 1,
    studentName: "John Doe",
    studentId: "STD001",
    examTitle: "Advanced Mathematics Final",
    submittedAt: "2024-03-20 14:30",
    timeSpent: "1h 45m",
    status: "pending", // pending, grading, completed
    totalQuestions: 25,
    answeredQuestions: 23,
  },
  {
    id: 2,
    studentName: "Jane Smith",
    studentId: "STD002",
    examTitle: "Computer Science Midterm",
    submittedAt: "2024-03-20 14:30",
    timeSpent: "1h 45m",
    status: "pending", // pending, grading, completed
    totalQuestions: 25,
    answeredQuestions: 23,
  },
  // ... more submissions
];



export default function UncheckExam() {
  const [selectedSubmission, setSelectedSubmission] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [marks, setMarks] = useState<Record<number, number>>({});
  const [feedback, setFeedback] = useState<Record<number, string>>({});

  // Mock questions for the selected submission
  

  

  return (
    <View className="flex-1 bg-gray-50">
        <View className="flex-1">
          {/* Header */}
          <View className="bg-[#1a367b] p-6">
            <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-white text-xl font-bold">Unchecked Submissions</Text>
            <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-white/80 mt-1">
              Review and grade student submissions
            </Text>
          </View>

          {/* Stats Bar */}
          <View className="flex-row justify-around bg-white p-4 shadow-sm">
            <View className="items-center">
              <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-2xl font-bold text-[#1a367b]">
                {submissions.length}
              </Text>
              <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-500">Pending</Text>
            </View>
            <View className="items-center">
              <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-2xl font-bold text-green-600">
                {submissions.filter(s => s.status === 'completed').length}
              </Text>
              <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-500">Completed</Text>
            </View>
          </View>

          {/* Submissions List */}
          <ScrollView className="flex-1">
            {submissions.map((submission) => (
              <TouchableOpacity
                key={submission.id}
                className="bg-white mx-4 my-2 rounded-xl shadow-sm p-4"
                onPress={() => router.push(`/exam/uncheck-exam/${submission.id}`)}
              >
                <View className="flex-row justify-between items-start mb-3">
                  <View>
                    <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-lg font-semibold">{submission.studentName}</Text>
                    <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-500">{submission.studentId}</Text>
                  </View>
                  <View className="bg-yellow-100 px-3 py-1 rounded-full">
                    <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-yellow-700">Pending</Text>
                  </View>
                </View>

                <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-700 mb-3">{submission.examTitle}</Text>

                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center">
                    <FontAwesome name="clock-o" size={14} color="#6b7280" />
                    <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-500 ml-2">
                      Submitted: {submission.submittedAt}
                    </Text>
                  </View>
                  <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-500">
                    {submission.answeredQuestions}/{submission.totalQuestions} Questions
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
    </View>
  );
}
