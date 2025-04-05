import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Link, router } from 'expo-router';

// Mock data - replace with actual data from your backend
const completedExams = [
  {
    id: 1,
    title: "Advanced Mathematics Final Exam",
    subject: "Mathematics",
    completedOn: "2024-03-20",
    duration: "2 hours",
    marksObtained: 75,
    totalMarks: 100,
    status: "passed", // passed, failed, review_pending
    accuracy: 75,
    rank: 5,
    totalStudents: 50
  },
  {
    id: 2,
    title: "Physics Midterm",
    subject: "Physics",
    completedOn: "2024-03-15",
    duration: "1.5 hours",
    marksObtained: 45,
    totalMarks: 60,
    status: "passed",
    accuracy: 82,
    rank: 3,
    totalStudents: 45
  },
  {
    id: 3,
    title: "Chemistry Quiz",
    subject: "Chemistry",
    completedOn: "2024-03-10",
    duration: "30 minutes",
    marksObtained: 18,
    totalMarks: 30,
    status: "review_pending",
    accuracy: null,
    rank: null,
    totalStudents: 40
  },
  // ... more exams
];

export default function CompletedExams() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'bg-green-100 text-green-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      case 'review_pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'passed':
        return 'Passed';
      case 'failed':
        return 'Failed';
      case 'review_pending':
        return 'Under Review';
      default:
        return status;
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-[#1a367b] p-6">
        <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-white text-xl font-bold">Completed Exams</Text>
        <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-white/80 mt-1">
          View your exam history and performance
        </Text>
      </View>

      {/* Stats Overview */}
      <View className="flex-row justify-between mx-4 -mt-6">
        <View className="flex-1 bg-white rounded-xl shadow-sm p-4 mr-2">
          <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-500">Total Exams</Text>
          <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-2xl font-bold text-[#1a367b]">
            {completedExams.length}
          </Text>
        </View>
        <View className="flex-1 bg-white rounded-xl shadow-sm p-4 ml-2">
          <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-500">Avg. Score</Text>
            <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-2xl font-bold text-[#1a367b]">
            {Math.round(
              completedExams.reduce((acc, exam) => 
                acc + (exam.marksObtained / exam.totalMarks) * 100, 0
              ) / completedExams.length
            )}%
          </Text>
        </View>
      </View>

      {/* Exam List */}
      <ScrollView className="mt-4">
        {completedExams.map((exam) => (
          <TouchableOpacity
            key={exam.id}
            className="bg-white mx-4 mb-4 rounded-xl shadow-sm overflow-hidden"
            onPress={() => router.push(`/exam/result?id=${exam.id}`)}
          >
            <View className="p-4">
              {/* Exam Header */}
              <View className="flex-row justify-between items-start mb-3">
                <View className="flex-1">
                  <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-lg font-semibold text-gray-800">
                    {exam.title}
                  </Text>
                  <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-500">{exam.subject}</Text>
                </View>
                <View className={`px-3 py-1 rounded-full ${getStatusColor(exam.status)}`}>
                  <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-sm font-medium">
                    {getStatusText(exam.status)}
                  </Text>
                </View>
              </View>

              {/* Exam Details */}
              <View className="flex-row justify-between items-center mb-3">
                <View className="flex-row items-center">
                  <FontAwesome name="calendar" size={14} color="#6b7280" />
                  <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-500 ml-2">{exam.completedOn}</Text>
                </View>
                <View className="flex-row items-center">
                  <FontAwesome name="clock-o" size={14} color="#6b7280" />
                  <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-500 ml-2">{exam.duration}</Text>
                </View>
              </View>

              {/* Score Section */}
              <View className="bg-gray-50 rounded-lg p-3">
                <View className="flex-row justify-between mb-2">
                  <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-600">Score</Text>
                  <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="font-semibold text-[#1a367b]">
                    {exam.marksObtained}/{exam.totalMarks}
                  </Text>
                </View>

                {exam.status !== 'review_pending' && (
                  <View className="flex-row justify-between">
                    <View className="flex-row items-center">
                      <FontAwesome name="bullseye" size={14} color="#6b7280" />
                      <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-600 ml-2">
                        Accuracy: {exam.accuracy}%
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <FontAwesome name="trophy" size={14} color="#6b7280" />
                      <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-600 ml-2">
                        Rank: {exam.rank}/{exam.totalStudents}
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              {/* View Details Button */}
              <View className="flex-row justify-end mt-3">
                <View className="flex-row items-center">
                  <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-[#1a367b] mr-1">View Details</Text>
                  <FontAwesome name="chevron-right" size={12} color="#1a367b" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Empty State */}
      {completedExams.length === 0 && (
        <View className="flex-1 items-center justify-center p-4">
          <FontAwesome name="file-text-o" size={48} color="#9ca3af" />
          <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-500 text-lg mt-4">No completed exams yet</Text>
          <Link href="/exam" asChild>
            <TouchableOpacity className="mt-4 bg-[#1a367b] px-6 py-3 rounded-lg">
              <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-white">View Available Exams</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}
    </View>
  );
}
