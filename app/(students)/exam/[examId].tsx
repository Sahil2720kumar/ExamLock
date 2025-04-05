import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

interface Question {
  id: number;
  type: 'mcq' | 'descriptive' | 'image';
  question: string;
  options?: string[];
  correctAnswer?: string | number;
  marks: number;
  imageUrl?: string;
}

interface ExamDetails {
  title: string;
  duration: number; // in minutes
  totalQuestions: number;
  totalMarks: number;
  subject: string;
  instructions: string[];
}

interface Answer {
  text: string;
  images: string[];  // URLs of uploaded images
}

type AnswerValue = number | { images: string[]; text: string };

export default function TakeExam() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, AnswerValue>>({});
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);

  const examDetails: ExamDetails = {
    title: "Advanced Mathematics Final Exam",
    duration: 120,
    totalQuestions: 50,
    totalMarks: 100,
    subject: "Mathematics",
    instructions: [
      "Read each question carefully before answering",
      "Each MCQ has only one correct answer",
      "You can mark questions for review and return to them later",
      "Ensure you submit before the timer ends",
      "Don't refresh or close the browser window"
    ]
  };

  const questions: Question[] = [
    {
      id: 1,
      type: 'mcq',
      question: "What is the derivative of f(x) = x² with respect to x?",
      options: ['x', '2x', '2', 'x²'],
      correctAnswer: 1,
      marks: 2
    },
    {
      id: 5,
      type: 'mcq',
      question: "what is the capital of india?",
      options: ['delhi', 'mumbai', 'kolkata', 'chennai'],
      correctAnswer: 0,
      marks: 2
    },
    {
      id: 2,
      type: 'mcq',
      question: "The integral of f(x) = 2x is x² + C",
      options: ['True', 'False'],
      correctAnswer: 0,
      marks: 1
    },
    {
      id: 3,
      type: 'descriptive',
      question: "What is the sum of the first 10 natural numbers?",
      correctAnswer: 55,
      marks: 3
    },
    {
      id: 4,
      type: 'image',
      question: "What is the derivative of f(x) = x³ with respect to x?",
      imageUrl: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      correctAnswer: 0,
      marks: 2
    }
    // Add more questions...
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId: number, value: number | string) => {
    console.log("questionId", questionId);
    console.log("value", value);

    const question = questions[currentQuestion];
    
    if (question.type === 'mcq') {
      setSelectedAnswers(prev => ({
        ...prev,
        [questionId]: value as number
      }));
    } else {
      setSelectedAnswers(prev => ({
        ...prev,
        [questionId]: {
          text: value as string,
          images: (prev[questionId] as { images: string[]; text: string })?.images || []
        }
      }));
    }
  };

  const toggleMarkForReview = (questionId: number) => {
    setMarkedForReview(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleSubmit = () => {
    console.log("final selectedAnswers", selectedAnswers);
    
    Alert.alert(
      "Submit Exam",
      `Are you sure you want to submit?\n\nAnswered: ${Object.keys(selectedAnswers).length}/${questions.length} questions`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Submit", 
          style: "default",
          onPress: () => {
            // Handle exam submission
            router.replace("/exam/result");
          }
        }
      ]
    );
  };

  const pickImage = async (questionId: number) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setSelectedAnswers(prev => ({
        ...prev,
        [questionId]: {
          text: (prev[questionId] as { images: string[]; text: string })?.text || '',
          images: [
            ...((prev[questionId] as { images: string[]; text: string })?.images || []),
            result.assets[0].uri
          ]
        }
      }));
    }
  };

  const removeImage = (questionId: number, imageIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: {
        text: (prev[questionId] as { images: string[]; text: string })?.text || '',
        images: (prev[questionId] as { images: string[]; text: string })?.images.filter((_, idx) => idx !== imageIndex) || []
      }
    }));
  };

  const getAnswerText = (questionId: number): string => {
    const answer = selectedAnswers[questionId];
    if (typeof answer === 'object' && answer !== null) {
      return answer.text;
    }
    return '';
  };

  const getAnswerImages = (questionId: number): string[] => {
    const answer = selectedAnswers[questionId];
    if (typeof answer === 'object' && answer !== null) {
      return answer.images;
    }
    return [];
  };

  const renderImageUploadSection = (questionId: number) => (
    <View className="mt-4">
      <View className="flex-row items-center justify-between mb-3">
        <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-700 dark:text-gray-300 font-medium">
          Attach Images
        </Text>
        <TouchableOpacity
          onPress={() => pickImage(questionId)}
          className="bg-blue-500 px-4 py-2 rounded-lg flex-row items-center"
        >
          <FontAwesome name="camera" size={16} color="white" />
          <Text style={{fontFamily: 'Poppins_400Regular'}}  className="text-white ml-2">Upload</Text>
        </TouchableOpacity>
      </View>

      {selectedAnswers[questionId]?.images?.length > 0 && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="flex-row gap-x-2"
        >
          {selectedAnswers[questionId].images.map((uri, index) => (
            <View key={index} className="relative">
              <Image
                source={{ uri }}
                className="w-24 h-24 rounded-lg"
                resizeMode="cover"
              />
              <TouchableOpacity
                onPress={() => removeImage(questionId, index)}
                className="absolute top-1 right-1 bg-red-500 rounded-full p-1"
              >
                <FontAwesome name="times" size={12} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header with Timer */}
      <View className="bg-[#1a367b] dark:bg-[#0f1f4d] px-6 py-4">
        <View className="flex-row justify-between items-center">
          <Text style={{fontFamily: 'Poppins_700Bold'}} className="text-xl font-bold text-white">
            {examDetails.title}
          </Text>
          <View className="bg-white/20 px-4 py-2 rounded-lg">
            <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-white font-mono text-lg">
              {formatTime(timeLeft)}
            </Text>
          </View>
        </View>
      </View>

      {/* Question Navigation */}
      <View className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="px-6 py-3"
        >
          {questions.map((q, index) => (
            <TouchableOpacity
              key={q.id}
              onPress={() => setCurrentQuestion(index)}
              className={`
                w-10 h-10 rounded-full mr-2 items-center justify-center
                ${currentQuestion === index ? 'bg-[#1a367b]' : 'bg-gray-100 dark:bg-gray-700'}
                ${selectedAnswers[q.id] ? 'border-2 border-green-500' : ''}
                ${markedForReview.includes(q.id) ? 'border-2 border-yellow-500' : ''}
              `}
            >
              <Text style={{fontFamily: 'Poppins_600SemiBold'}} className={`
                font-medium
                ${currentQuestion === index ? 'text-white' : 'text-gray-700 dark:text-gray-300'}
              `}>
                {index + 1}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Question Content */}
      <ScrollView className="flex-1 p-6">
        <View className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <View className="flex-row justify-between items-center mb-4">
            <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-sm text-gray-500 dark:text-gray-400">
              Question {currentQuestion + 1} of {questions.length}
            </Text>
            <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-sm text-gray-500 dark:text-gray-400">
              Marks: {questions[currentQuestion].marks}
            </Text>
          </View>

          <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-lg text-gray-900 dark:text-gray-100 mb-6">
            {questions[currentQuestion].question}
          </Text>

          {/* Question type specific content */}
          {questions[currentQuestion].type === 'mcq' && (
            <View className="gap-y-3">
              {questions[currentQuestion].options?.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  className={`
                    p-4 rounded-lg border
                    ${selectedAnswers[questions[currentQuestion].id] === index+1
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                      : 'border-gray-200 dark:border-gray-700'}
                  `}
                  onPress={() => handleAnswer(questions[currentQuestion].id, index+1)}
                >
                  <Text style={{fontFamily: 'Poppins_400Regular'}} className={`
                    ${selectedAnswers[questions[currentQuestion].id] === index+1
                      ? 'text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300'}
                  `}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {questions[currentQuestion].type === 'descriptive' && (
            <View className="gap-y-2">
              <TextInput
                multiline
                numberOfLines={4}
                placeholder="Type your answer here..."
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-gray-700 dark:text-gray-300 min-h-[120px]"
                value={getAnswerText(questions[currentQuestion].id)}
                onChangeText={(text) => handleAnswer(questions[currentQuestion].id, text)}
              />
              {renderImageUploadSection(questions[currentQuestion].id)}
            </View>
          )}

          {questions[currentQuestion].type === 'image' && (
            <View className="gap-y-4">
              <Image
                source={{ uri: questions[currentQuestion].imageUrl }}
                className="w-full h-48 rounded-lg bg-gray-100"
                resizeMode="contain"
              />
              <TextInput
                multiline
                numberOfLines={4}
                placeholder="Write your answer based on the image..."
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-gray-700 dark:text-gray-300 min-h-[120px]"
                value={getAnswerText(questions[currentQuestion].id)}
                onChangeText={(text) => handleAnswer(questions[currentQuestion].id, text)}
              />
              {renderImageUploadSection(questions[currentQuestion].id)}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => toggleMarkForReview(questions[currentQuestion].id)}
          >
            <FontAwesome 
              name={markedForReview.includes(questions[currentQuestion].id) ? "flag" : "flag-o"} 
              size={20} 
              color="#eab308"
            />
            <Text style={{fontFamily: 'Poppins_400Regular'}} className="ml-2 text-gray-700 dark:text-gray-300">
              Mark for Review
            </Text>
          </TouchableOpacity>

          <View className="flex-row gap-3">
            {currentQuestion > 0 && (
              <TouchableOpacity
                className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg"
                onPress={() => setCurrentQuestion(prev => prev - 1)}
              >
                <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-700 dark:text-gray-300">Previous</Text>
              </TouchableOpacity>
            )}
            
            {currentQuestion < questions.length - 1 ? (
              <TouchableOpacity
                className="bg-[#1a367b] px-4 py-2 rounded-lg"
                onPress={() => setCurrentQuestion(prev => prev + 1)}
              >
                <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-white">Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="bg-green-600 px-4 py-2 rounded-lg"
                onPress={handleSubmit}
              >
                <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-white">Submit</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
