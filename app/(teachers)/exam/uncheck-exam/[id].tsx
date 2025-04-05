import { TouchableOpacity, View, Text, ScrollView, Image, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";


export default function UncheckExamByStudent() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [marks, setMarks] = useState<Record<number, number>>({});
  const [feedback, setFeedback] = useState<Record<number, string>>({});

  interface Question {
    id: number;
    type: 'mcq' | 'descriptive' | 'image';
    question: string;
    marks: number;
    studentAnswer: any;
    correctAnswer?: any;
    options?: string[];
  }

  const questions: Question[] = [
    {
      id: 1,
      type: 'descriptive',
      question: "Explain the concept of integration with examples.",
      marks: 5,
      studentAnswer: {
        text: "Integration is the reverse process of differentiation. For example...",
        images: ["https://example.com/image1.jpg"]
      }
    },
    {
      id: 2,
      type: 'mcq',
      question: "What is the derivative of f(x) = x²?",
      options: ["x", "2x", "3x", "4x"],
      marks: 2,
      studentAnswer: 1,
      correctAnswer: 1
    },
    // ... more questions
  ];

  const handleMarkSubmission = () => {
    // Implement submission logic
    router.back();
  };

  return (
      // Grading View
      <View className="flex-1">
        {/* Question Navigation */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="bg-white p-4 max-h-16"
        >
          {questions.map((_, index) => (
            <TouchableOpacity
              key={index}
              className={`
                w-10 h-10 rounded-full mr-2 items-center justify-center
                ${currentQuestion === index ? 'bg-[#1a367b]' : 'bg-gray-100'}
                ${marks[index] !== undefined ? 'border-2 border-green-500' : ''}
              `}
              onPress={() => setCurrentQuestion(index)}
            >
              <Text className={`
                font-medium
                ${currentQuestion === index ? 'text-white' : 'text-gray-700'}
              `}>
                {index + 1}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Question Content */}
        <ScrollView className="flex-1 p-6">
          <View className="bg-white rounded-xl p-6 shadow-sm">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {questions.length}
              </Text>
              <Text className="text-sm text-gray-500">
                Max Marks: {questions[currentQuestion].marks}
              </Text>
            </View>

            <Text className="text-lg text-gray-900 mb-6">
              {questions[currentQuestion].question}
            </Text>
            {questions[currentQuestion].type === 'mcq' && (
              <View className="mb-4">
                {questions[currentQuestion].options?.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`
                      flex-row items-center mb-2 p-2 rounded-lg
                      ${questions[currentQuestion].studentAnswer === index ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}
                    `}
                    onPress={() => setMarks(prev => ({ ...prev, [currentQuestion]: index }))}
                  >
                    <Text className="mr-2">{String.fromCharCode(65 + index)}</Text>
                    <Text>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            

            {/* Student's Answer */}
            <View className="bg-gray-50 p-4 rounded-lg mb-4">
              <Text className="text-gray-500 mb-2">Student's Answer:</Text>
              {questions[currentQuestion].type === 'mcq' && (
                <Text className="text-gray-700">
                  {questions[currentQuestion].options?.[questions[currentQuestion].studentAnswer]}
                </Text>
              )}
              {questions[currentQuestion].type === 'descriptive' && (
                <>
                  <Text className="text-gray-700">
                    {questions[currentQuestion].studentAnswer.text}
                  </Text>
                  {questions[currentQuestion].studentAnswer.images?.length > 0 && (
                    <ScrollView 
                      horizontal 
                      showsHorizontalScrollIndicator={false}
                      className="mt-3"
                    >
                      {questions[currentQuestion].studentAnswer.images.map((image: string, index: number) => (
                        <Image
                          key={index}
                          source={{ uri: image }}
                          className="w-24 h-24 rounded-lg mr-2"
                        />
                      ))}
                    </ScrollView>
                  )}
                </>
              )}
            </View>

            {/* Grading Section */}
            <View className="mt-4">
              <Text className="text-gray-700 font-medium mb-2">Marks:</Text>
              <TextInput
                keyboardType="numeric"
                className="border border-gray-200 rounded-lg p-3 mb-4"
                placeholder={`Enter marks (max: ${questions[currentQuestion].marks})`}
                value={marks[currentQuestion]?.toString()}
                onChangeText={(value) => {
                  const numValue = parseInt(value) || 0;
                  if (numValue <= questions[currentQuestion].marks) {
                    setMarks(prev => ({ ...prev, [currentQuestion]: numValue }));
                  }
                }}
              />

              <Text className="text-gray-700 font-medium mb-2">Feedback:</Text>
              <TextInput
                multiline
                numberOfLines={4}
                className="border border-gray-200 rounded-lg p-3"
                placeholder="Enter feedback for the student..."
                value={feedback[currentQuestion]}
                onChangeText={(value) => 
                  setFeedback(prev => ({ ...prev, [currentQuestion]: value }))
                }
              />
            </View>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View className="bg-white border-t border-gray-200 p-4">
          <View className="flex-row justify-between">
            {currentQuestion > 0 && (
              <TouchableOpacity
                className="bg-gray-100 px-4 py-2 rounded-lg"
                onPress={() => setCurrentQuestion(prev => prev - 1)}
              >
                <Text className="text-gray-700">Previous</Text>
              </TouchableOpacity>
            )}
            
            {currentQuestion < questions.length - 1 ? (
              <TouchableOpacity
                className="bg-[#1a367b] px-4 py-2 rounded-lg ml-auto"
                onPress={() => setCurrentQuestion(prev => prev + 1)}
              >
                <Text className="text-white">Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="bg-green-600 px-4 py-2 rounded-lg ml-auto"
                onPress={handleMarkSubmission}
              >
                <Text className="text-white">Submit Grading</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
  );
}
