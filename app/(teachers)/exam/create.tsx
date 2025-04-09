import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Animated, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import InputField from '@/components/InputField';
import DateTimePicker from '@react-native-community/datetimepicker';
import { convertTo12Hour } from '@/utils/dateTimeHelpers';

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
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isStartTimePickerVisible, setIsStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setIsEndTimePickerVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const handleDateChange = (event: any, selectedDate: any) => {
    setStartDate(selectedDate);
    console.log("start date", selectedDate);
    setExamDetails({ ...examDetails, startDate: selectedDate.toLocaleDateString() });
    setIsDatePickerVisible(false);
  };

  const handleStartTimeChange = (event: any, selectedTime: any) => {
    setStartTime(selectedTime);
    console.log("start time", selectedTime.toLocaleTimeString());
    setExamDetails({ ...examDetails, startTime: selectedTime.toLocaleTimeString() });
    setIsStartTimePickerVisible(false);
  };

  const handleEndTimeChange = (event: any, selectedTime: any) => {
    setEndTime(selectedTime);
    console.log("end time", selectedTime.toLocaleTimeString());
    setExamDetails({ ...examDetails, endTime: selectedTime.toLocaleTimeString() });
    setIsEndTimePickerVisible(false);
  };

  const [examDetails, setExamDetails] = useState({
    title: '',
    description: '',
    duration: '',
    totalMarks: '',
    students: '',
    subject: '',
    status: 'scheduled',
    venue: '',
    startDate: '',
    startTime: '',
    endTime: '',
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
    // Check if the current question already exists in the questions array
    const existingQuestionIndex = questions.findIndex(q => q.id === currentQuestion.id);
    
    if (existingQuestionIndex !== -1) {
      // If it exists, we're in "add new" mode, so create a fresh question
      console.log("existing question index: ", existingQuestionIndex);
      
      const existingPreviousQuestion = questions.find(q => q.id === currentQuestion.id);
      setQuestions([...questions]);
      setCurrentQuestion({
        id: questions.length + 1, // Make sure ID is unique
        type: existingPreviousQuestion?.type || 'mcq',
        question: '',
        options: ['', '', '', ''],
        correctOption: 0,
        marks: 0,
      });
      
    } else {
      // If it doesn't exist, add the current question to the array
      // console.log("else questions", questions);
      
      // Create a new array with the current questions plus the new one
      const updatedQuestions = [...questions, currentQuestion];
      
      // Update the state with the new array
      setQuestions(updatedQuestions);
      
      // Use the updated array for finding the existing question
      const existingQuestion = updatedQuestions.find(q => q.id === currentQuestion.id);
      
      // console.log("existing question", existingQuestion);
      
      setCurrentQuestion({
        id: existingQuestion?.id || 0, // Make sure the next ID is unique
        type: existingQuestion?.type || 'mcq',
        question: existingQuestion?.question || 'no question',
        options: existingQuestion?.options || ['', '', '', ''],
        correctOption: existingQuestion?.correctOption || 0,
        marks: existingQuestion?.marks || 0,
      });
    }
    
    // These logs will still show the old state values
    // console.log("current question", currentQuestion);
    // console.log("questions: ", questions);
    // console.log("question length: ", questions.length);
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

  const handleSubmit = async () => {
    console.log('Submit exam', { examDetails, questions });

  };

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="px-6 py-8 bg-[#1a367b] dark:bg-[#0f1f4d]">
        <Text style={{ fontFamily: 'Poppins_600SemiBold' }} className="text-3xl font-bold text-white mb-2">
          Create New Exam
        </Text>
        <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-gray-200 text-lg">
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
            <Text style={{ fontFamily: 'Poppins_600SemiBold' }} className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Exam Details
            </Text>

            <InputField
              label="Title"
              value={examDetails.title}
              onChangeText={(text) => setExamDetails({ ...examDetails, title: text })}
              placeholder="Enter a descriptive title"
              required
            />

            <InputField
              label="Description"
              value={examDetails.description}
              onChangeText={(text) => setExamDetails({ ...examDetails, description: text })}
              placeholder="Provide exam details and instructions"
              multiline
              numberOfLines={3}
            />

            <InputField
              label="Students"
              value={examDetails.students}
              onChangeText={(text) => setExamDetails({ ...examDetails, students: text })}
              placeholder="Enter total student numbers"
            />

            <InputField
              label="Subject"
              value={examDetails.subject}
              onChangeText={(text) => setExamDetails({ ...examDetails, subject: text })}
              placeholder="Enter subject"
            />

            <InputField
              label="Venue"
              value={examDetails.venue}
              onChangeText={(text) => setExamDetails({ ...examDetails, venue: text })}
              placeholder="Enter venue"
            />

            <InputField
              label="Duration"
              value={examDetails.duration}
              onChangeText={(text) => setExamDetails({ ...examDetails, duration: text })}
              placeholder="Duration in minutes (1 hour = 60 minutes)"
              required
              keyboardType="numeric"
            />
            <View className="flex-row gap-4">
              <View className="flex-1">
                <InputField
                  label="Total Marks"
                  value={examDetails.totalMarks}
                  onChangeText={(text) => setExamDetails({ ...examDetails, totalMarks: text })}
                  placeholder="Enter total marks"
                  keyboardType="numeric"
                  required
                />
              </View>
            </View>

            {isDatePickerVisible && <DateTimePicker
              value={startDate || new Date()}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
            />}

            {isStartTimePickerVisible && <DateTimePicker
              value={startTime || new Date()}
              mode="time"
              display="spinner"
              onChange={handleStartTimeChange}
            />}

            {isEndTimePickerVisible && <DateTimePicker
              value={endTime || new Date()}
              mode="time"
              display="spinner"
              onChange={handleEndTimeChange}
            />}


            <Pressable onPress={() => setIsDatePickerVisible(true)}>
              <InputField
                label="Start Date"
                value={examDetails.startDate}
                onChangeText={(text) => setExamDetails({ ...examDetails, startDate: text })}
                placeholder="Enter start date"
                required
                disabled={true}
                className="opacity-100"
              />
            </Pressable>

            <View className="flex-row gap-4">
              <Pressable className="flex-1" onPress={() => setIsStartTimePickerVisible(true)}>
                <InputField
                  label="Start Time"
                  value={convertTo12Hour(examDetails.startTime)}
                  onChangeText={(text) => setExamDetails({ ...examDetails, startTime: text })}
                  placeholder="Enter start time"
                  required
                  type="datetime"
                  disabled={true}
                  className="opacity-100"
                />
              </Pressable>
              <Pressable className="flex-1" onPress={() => setIsEndTimePickerVisible(true)}>
                <InputField
                  label="End Time"
                  value={convertTo12Hour(examDetails.endTime)}
                  onChangeText={(text) => setExamDetails({ ...examDetails, endTime: text })}
                  placeholder="Enter end time"
                  required
                  type="datetime"
                  disabled={true}
                  className="opacity-100"
                />
              </Pressable>
            </View>
          </View>
        )}

        {/* Step 2: Add Questions */}
        {currentStep === 2 && (
          <View>
            <View className="flex-row justify-between items-center mb-6">
              <Text style={{ fontFamily: 'Poppins_600SemiBold' }} className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Add Questions
              </Text>
              <View className="flex-row gap-2">
                <TouchableOpacity
                  className={`px-3 py-1 rounded-lg ${currentQuestion.type === 'mcq' ? 'bg-[#1a367b]' : 'bg-gray-200'}`}
                  onPress={() => setCurrentQuestion({ ...currentQuestion, type: 'mcq' })}
                >
                  <Text style={{ fontFamily: 'Poppins_400Regular' }} className={currentQuestion.type === 'mcq' ? 'text-white' : 'text-gray-700'}>
                    MCQ
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`px-3 py-1 rounded-lg ${currentQuestion.type === 'descriptive' ? 'bg-[#1a367b]' : 'bg-gray-200'}`}
                  onPress={() => setCurrentQuestion({ ...currentQuestion, type: 'descriptive' })}
                >
                  <Text style={{ fontFamily: 'Poppins_400Regular' }} className={currentQuestion.type === 'descriptive' ? 'text-white' : 'text-gray-700'}>
                    Descriptive
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`px-3 py-1 rounded-lg ${currentQuestion.type === 'image' ? 'bg-[#1a367b]' : 'bg-gray-200'}`}
                  onPress={() => setCurrentQuestion({ ...currentQuestion, type: 'image' })}
                >
                  <Text style={{ fontFamily: 'Poppins_400Regular' }} className={currentQuestion.type === 'image' ? 'text-white' : 'text-gray-700'}>
                    Image
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Question Navigation */}
            {questions.length > 0 && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
                <TouchableOpacity
                  className="bg-[#1a367b] px-4 py-2 rounded-lg mr-2"
                  onPress={() => setCurrentQuestion({
                    id: questions.length + 1,
                    type: 'mcq',
                    question: '',
                    options: ['', '', '', ''],
                    correctOption: 0,
                    marks: 0,
                  })}
                >
                  <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-white">+ New</Text>
                </TouchableOpacity>

                {questions.map((q, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`px-4 py-2 rounded-lg mr-2 ${currentQuestion.id === q.id
                      ? 'bg-[#1a367b]'
                      : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    onPress={() => setCurrentQuestion(q)}
                  >
                    <Text
                      style={{ fontFamily: 'Poppins_400Regular' }}
                      className={currentQuestion.id === q.id ? 'text-white' : 'text-gray-700 dark:text-gray-300'}
                    >
                      Q{index + 1}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            <View className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
              <InputField
                className="flex-1"
                label="Question"
                value={currentQuestion.question}
                onChangeText={(text) => setCurrentQuestion({ ...currentQuestion, question: text })}
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
                        onPress={() => setCurrentQuestion({ ...currentQuestion, correctOption: index })}
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
                          setCurrentQuestion({ ...currentQuestion, options: newOptions });
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
                        <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-gray-500 mt-2">Upload Image</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              )}

              <View className="flex-row items-center gap-4 mt-4">
                <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-gray-600 dark:text-gray-400">Marks:</Text>
                <InputField
                  label="Marks"
                  value={currentQuestion.marks.toString()}
                  onChangeText={(text) => setCurrentQuestion({ ...currentQuestion, marks: parseInt(text) || 0 })}
                  keyboardType="numeric"
                  required
                />
              </View>
            </View>

            <View className="flex-row justify-between">
              <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-gray-600 dark:text-gray-400">
                Total Questions: {questions.length}
              </Text>

              {/* update and add New Button */}
              <View className="flex-row gap-2">
                {/* Update Button */}
                {questions.some(q => q.id === currentQuestion.id) && (
                  <TouchableOpacity
                    className="bg-amber-500 px-4 py-2 rounded-lg"
                    onPress={() => {
                      const updatedQuestions = questions.map(q =>
                        q.id === currentQuestion.id ? currentQuestion : q
                      );
                      setQuestions(updatedQuestions);
                    }}
                  >
                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-white">Update</Text>
                  </TouchableOpacity>
                )}

                {/* Add Button */}
                <TouchableOpacity
                  className="bg-[#1a367b] px-4 py-2 rounded-lg"
                  onPress={addQuestion}
                >
                  <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-white">
                    {questions.some(q => q.id === currentQuestion.id) ? 'Add New' : 'Add Question'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Step 3: Review */}
        {currentStep === 3 && (
          <View>
            <Text style={{ fontFamily: 'Poppins_600SemiBold' }} className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Review Exam
            </Text>

            <View className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
              <Text style={{ fontFamily: 'Poppins_600SemiBold' }} className="text-lg font-semibold text-gray-900 dark:text-gray-100">{examDetails.title}</Text>
              <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-gray-600 mt-2 dark:text-gray-400">{examDetails.description}</Text>
              <View className="flex-row gap-4 mt-4">
                <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-gray-600 dark:text-gray-400">Duration: {examDetails.duration} mins</Text>
                <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-gray-600 dark:text-gray-400">Marks: {examDetails.totalMarks}</Text>
              </View>
            </View>

            <Text style={{ fontFamily: 'Poppins_600SemiBold' }} className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Questions ({questions.length})</Text>
            {questions.map((q, index) => (
              <View key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-2">
                <Text style={{ fontFamily: 'Poppins_400Regular' }} className="font-medium">Q{index + 1}: {q.question}</Text>
                <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-gray-600 mt-1">Type: {q.type}</Text>
                <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-gray-600">Marks: {q.marks}</Text>
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
              <Text style={{ fontFamily: 'Poppins_400Regular' }}>Previous</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            className="bg-[#1a367b] px-6 py-2 rounded-lg ml-auto"
            onPress={() => {
              if (currentStep < 3) {
                setCurrentStep(currentStep + 1);
              } else {
                // Handle exam submission
                handleSubmit();
              }
            }}
          >
            <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-white">
              {currentStep === 3 ? 'Create Exam' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
