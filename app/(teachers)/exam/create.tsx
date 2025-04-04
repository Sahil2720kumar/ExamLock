import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import InputField from '@/components/InputField';


interface Question {
  id: number;
  type: 'mcq' | 'descriptive' | 'image';
  question: string;
  options?: string[];
  correctOption?: number;
  marks: number;
  imageUrl?: string;
}



export default function CreateExam() {
  const [currentStep, setCurrentStep] = useState(1);
  const [examDetails, setExamDetails] = useState({
    title: '',
    description: '',
    duration: '',
    totalMarks: '',
    startDate: '',
    startTime: '',
    students: '',
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: 1,
    type: 'mcq',
    question: '',
    options: ['', '', '', ''],
    correctOption: 0,
    marks: 0,
  });

  const addQuestion = () => {
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({
      id: questions.length + 2,
      type: 'mcq',
      question: '',
      options: ['', '', '', ''],
      correctOption: 0,
      marks: 0,
    });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCurrentQuestion({
        ...currentQuestion,
        imageUrl: result.assets[0].uri,
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="px-6 py-8 bg-[#1a367b] dark:bg-[#0f1f4d]">
        <Text className="text-3xl font-bold text-white mb-2">
          Create New Exam
        </Text>
        <Text className="text-gray-200 text-lg">
          Step {currentStep} of 3
        </Text>
      </View>

      {/* Progress Bar */}
      <View className="px-6 pt-4">
        <View className="h-2 bg-gray-200 rounded-full">
          <View 
            className="h-full bg-[#1a367b] rounded-full"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </View>
      </View>

      <View className="p-6">
        {/* Step 1: Basic Details */}
        {currentStep === 1 && (
          <View className="space-y-2">
            <Text className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Exam Details
            </Text>
            
            <InputField
              label="Title"
              value={examDetails.title}
              onChangeText={(text) => setExamDetails({...examDetails, title: text})}
              placeholder="Enter a descriptive title"
              required
            />

            <InputField
              label="Description"
              value={examDetails.description}
              onChangeText={(text) => setExamDetails({...examDetails, description: text})}
              placeholder="Provide exam details and instructions"
              multiline
              numberOfLines={3}
            />

            <InputField
              label="Students"
              value={examDetails.students}
              onChangeText={(text) => setExamDetails({...examDetails, students: text})}
              placeholder="Enter total student numbers"
            />

            <View className="flex-row gap-4">
              <View className="flex-1">
                <InputField
                  label="Duration"
                  value={examDetails.duration}
                  onChangeText={(text) => setExamDetails({...examDetails, duration: text})}
                  placeholder="duration in minutes"
                  keyboardType="numeric"
                  required
                />
              </View>
              <View className="flex-1">
                <InputField
                  label="Total Marks"
                  value={examDetails.totalMarks}
                  onChangeText={(text) => setExamDetails({...examDetails, totalMarks: text})}
                  placeholder="Enter total marks"
                  keyboardType="numeric"
                  required
                />
              </View>
            </View>

            <View className="flex-row gap-4">
              <View className="flex-1">
                <InputField
                  label="Start Date"
                  value={examDetails.startDate}
                  onChangeText={(text) => setExamDetails({...examDetails, startDate: text})}
                  placeholder="Enter start date"
                  required
                />
              </View>
              <View className="flex-1">
                <InputField
                  label="Start Time"
                  value={examDetails.startTime}
                  onChangeText={(text) => setExamDetails({...examDetails, startTime: text})}
                  placeholder="Enter start time"
                  required
                />
              </View>
            </View>
          </View>
        )}

        {/* Step 2: Add Questions */}
        {currentStep === 2 && (
          <View>
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Add Questions
              </Text>
              <View className="flex-row gap-2">
                <TouchableOpacity
                  className={`px-3 py-1 rounded-lg ${
                    currentQuestion.type === 'mcq' ? 'bg-[#1a367b]' : 'bg-gray-200'
                  }`}
                  onPress={() => setCurrentQuestion({...currentQuestion, type: 'mcq'})}
                >
                  <Text className={currentQuestion.type === 'mcq' ? 'text-white' : 'text-gray-700'}>
                    MCQ
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`px-3 py-1 rounded-lg ${
                    currentQuestion.type === 'descriptive' ? 'bg-[#1a367b]' : 'bg-gray-200'
                  }`}
                  onPress={() => setCurrentQuestion({...currentQuestion, type: 'descriptive'})}
                >
                  <Text className={currentQuestion.type === 'descriptive' ? 'text-white' : 'text-gray-700'}>
                    Descriptive
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`px-3 py-1 rounded-lg ${
                    currentQuestion.type === 'image' ? 'bg-[#1a367b]' : 'bg-gray-200'
                  }`}
                  onPress={() => setCurrentQuestion({...currentQuestion, type: 'image'})}
                >
                  <Text className={currentQuestion.type === 'image' ? 'text-white' : 'text-gray-700'}>
                    Image
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
              <InputField
                className="flex-1"
                label="Question"
                value={currentQuestion.question}
                onChangeText={(text) => setCurrentQuestion({...currentQuestion, question: text})}
                placeholder="Enter your question"
                multiline
                required
              />

              {currentQuestion.type === 'mcq' && (
                <View className="space-y-2 mt-4">
                  {currentQuestion.options?.map((option, index) => (
                    <View key={index} className="flex-row items-center gap-2">
                      <TouchableOpacity
                        className={`
                          w-6 h-6 rounded-full border-2 
                          ${currentQuestion.correctOption === index 
                            ? 'bg-[#1a367b] border-[#1a367b]' 
                            : 'border-gray-300'
                          } justify-center items-center
                        `}
                        onPress={() => setCurrentQuestion({...currentQuestion, correctOption: index})}
                      >
                        {currentQuestion.correctOption === index && (
                          <FontAwesome name="check" size={12} color="white" />
                        )}
                      </TouchableOpacity>
                      <InputField
                        className="flex-1"
                        label={`Option ${index + 1}`}
                        value={option}
                        onChangeText={(text) => {
                          const newOptions = [...currentQuestion.options!];
                          newOptions[index] = text;
                          setCurrentQuestion({...currentQuestion, options: newOptions});
                        }}
                        placeholder={`Enter option ${index + 1}...`}
                      />
                    </View>
                  ))}
                </View>
              )}

              {currentQuestion.type === 'image' && (
                <View className="mb-4">
                  <TouchableOpacity
                    className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg items-center"
                    onPress={pickImage}
                  >
                    {currentQuestion.imageUrl ? (
                      <Image
                        source={{ uri: currentQuestion.imageUrl }}
                        className="w-full h-40 rounded-lg"
                        resizeMode="cover"
                      />
                    ) : (
                      <View className="items-center">
                        <FontAwesome name="image" size={24} color="#6b7280" />
                        <Text className="text-gray-500 mt-2">Upload Image</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              )}

              <View className="flex-row items-center gap-4 mt-4">
                <Text className="text-gray-600 dark:text-gray-400">Marks:</Text>
                <InputField
                  label="Marks"
                  value={currentQuestion.marks.toString()}
                  onChangeText={(text) => setCurrentQuestion({...currentQuestion, marks: parseInt(text) || 0})}
                  keyboardType="numeric"
                  required
                />
              </View>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-600 dark:text-gray-400">
                Total Questions: {questions.length}
              </Text>
              <TouchableOpacity
                className="bg-[#1a367b] px-4 py-2 rounded-lg"
                onPress={addQuestion}
              >
                <Text className="text-white">Add Question</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Step 3: Review */}
        {currentStep === 3 && (
          <View>
            <Text className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Review Exam
            </Text>
            
            <View className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
              <Text className="text-lg font-semibold">{examDetails.title}</Text>
              <Text className="text-gray-600 mt-2">{examDetails.description}</Text>
              <View className="flex-row gap-4 mt-4">
                <Text>Duration: {examDetails.duration} mins</Text>
                <Text>Marks: {examDetails.totalMarks}</Text>
              </View>
            </View>

            <Text className="text-lg font-semibold mb-2">Questions ({questions.length})</Text>
            {questions.map((q, index) => (
              <View key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-2">
                <Text className="font-medium">Q{index + 1}: {q.question}</Text>
                <Text className="text-gray-600 mt-1">Type: {q.type}</Text>
                <Text className="text-gray-600">Marks: {q.marks}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Navigation Buttons */}
        <View className="flex-row justify-between mt-8">
          {currentStep > 1 && (
            <TouchableOpacity
              className="bg-gray-200 px-6 py-2 rounded-lg"
              onPress={() => setCurrentStep(currentStep - 1)}
            >
              <Text>Previous</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            className="bg-[#1a367b] px-6 py-2 rounded-lg ml-auto"
            onPress={() => {
              if (currentStep < 3) {
                setCurrentStep(currentStep + 1);
              } else {
                // Handle exam submission
                console.log('Submit exam', { examDetails, questions });
              }
            }}
          >
            <Text className="text-white">
              {currentStep === 3 ? 'Create Exam' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
