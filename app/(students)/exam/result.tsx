import { View, Text, ScrollView, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';

// Mock result data - replace with actual data from your backend
const examResult = {
  studentName: "John Doe",
  examTitle: "Advanced Mathematics Final Exam",
  totalMarks: 100,
  marksObtained: 75,
  timeTaken: "1h 45m",
  submittedAt: "2024-03-20 14:30",
  questions: [
    {
      id: 1,
      type: 'mcq',
      question: "What is the derivative of f(x) = x² with respect to x?",
      options: ['x', '2x', '2', 'x²'],
      correctAnswer: 1,
      studentAnswer: 1,
      marks: 2,
      marksObtained: 2
    },
    {
      id: 2,
      type: 'descriptive',
      question: "Explain the concept of integration.",
      studentAnswer: {
        text: "Integration is the reverse process of differentiation...",
        images: ["https://example.com/image1.jpg"]
      },
      marks: 5,
      marksObtained: 4,
      feedback: "Good explanation but missed some key points"
    }
    // ... more questions
  ],
  analysis: {
    correct: 15,
    incorrect: 5,
    partial: 3,
    unattempted: 2,
    accuracy: 75
  }
};

export default function ExamResult() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Result Header */}
      <View className="bg-[#1a367b] p-6">
        <Text className="text-white text-xl font-bold mb-2">
          {examResult.examTitle}
        </Text>
        <Text className="text-white/80">
          Submitted on {examResult.submittedAt}
        </Text>
      </View>

      {/* Score Card */}
      <View className="mx-4 -mt-6 bg-white rounded-xl shadow-sm p-6">
        <View className="items-center">
          <Text className="text-4xl font-bold text-[#1a367b]">
            {examResult.marksObtained}/{examResult.totalMarks}
          </Text>
          <Text className="text-gray-500 mt-2">
            Time Taken: {examResult.timeTaken}
          </Text>
        </View>

        {/* Performance Stats */}
        <View className="flex-row justify-between mt-6 bg-gray-50 rounded-lg p-4">
          <View className="items-center">
            <Text className="text-green-600 font-bold text-xl">{examResult.analysis.correct}</Text>
            <Text className="text-gray-600">Correct</Text>
          </View>
          <View className="items-center">
            <Text className="text-red-600 font-bold text-xl">{examResult.analysis.incorrect}</Text>
            <Text className="text-gray-600">Incorrect</Text>
          </View>
          <View className="items-center">
            <Text className="text-yellow-600 font-bold text-xl">{examResult.analysis.partial}</Text>
            <Text className="text-gray-600">Partial</Text>
          </View>
          <View className="items-center">
            <Text className="text-gray-600 font-bold text-xl">{examResult.analysis.accuracy}%</Text>
            <Text className="text-gray-600">Accuracy</Text>
          </View>
        </View>
      </View>

      {/* Detailed Questions Review */}
      <View className="m-4">
        <Text className="text-lg font-bold mb-4">Question Review</Text>
        
        {examResult.questions.map((question, index) => (
          <View key={question.id} className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-500">Question {index + 1}</Text>
              <View className="flex-row items-center">
                <Text className="text-gray-500">Marks: </Text>
                <Text className={`font-bold ${
                  question.marksObtained === question.marks ? 'text-green-600' :
                  question.marksObtained === 0 ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  {question.marksObtained}/{question.marks}
                </Text>
              </View>
            </View>

            <Text className="text-gray-800 mb-3">{question.question}</Text>

            {question.type === 'mcq' && (
              <View>
                {question.options.map((option, optIndex) => (
                  <View 
                    key={optIndex}
                    className={`flex-row items-center p-3 rounded-lg mb-2 ${
                      optIndex === question.correctAnswer ? 'bg-green-50' :
                      optIndex === question.studentAnswer && optIndex !== question.correctAnswer ? 'bg-red-50' :
                      'bg-gray-50'
                    }`}
                  >
                    <Text className={`flex-1 ${
                      optIndex === question.correctAnswer ? 'text-green-700' :
                      optIndex === question.studentAnswer && optIndex !== question.correctAnswer ? 'text-red-700' :
                      'text-gray-700'
                    }`}>
                      {option}
                    </Text>
                    {optIndex === question.correctAnswer && (
                      <FontAwesome name="check" size={16} color="#15803d" />
                    )}
                    {optIndex === question.studentAnswer && optIndex !== question.correctAnswer && (
                      <FontAwesome name="times" size={16} color="#b91c1c" />
                    )}
                  </View>
                ))}
              </View>
            )}

            {question.type === 'descriptive' && (
              <View>
                <View className="bg-gray-50 p-3 rounded-lg mb-2">
                  <Text className="text-gray-700">{question.studentAnswer.text}</Text>
                </View>
                {question.studentAnswer.images?.length > 0 && (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {question.studentAnswer.images.map((image, imgIndex) => (
                      <Image
                        key={imgIndex}
                        source={{ uri: image }}
                        className="w-24 h-24 rounded-lg mr-2"
                      />
                    ))}
                  </ScrollView>
                )}
                {question.feedback && (
                  <View className="mt-3 bg-blue-50 p-3 rounded-lg">
                    <Text className="text-blue-700 font-medium">Feedback:</Text>
                    <Text className="text-blue-600">{question.feedback}</Text>
                  </View>
                )}
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Action Buttons */}
      <View className="p-4 flex-row justify-center gap-4">
        <Link href="/" asChild>
          <View className="bg-gray-200 px-6 py-3 rounded-lg">
            <Text className="text-gray-700">Back to Home</Text>
          </View>
        </Link>
        <Link href="/exam" asChild>
          <View className="bg-[#1a367b] px-6 py-3 rounded-lg">
            <Text className="text-white">View All Exams</Text>
          </View>
        </Link>
      </View>
    </ScrollView>
  );
}
