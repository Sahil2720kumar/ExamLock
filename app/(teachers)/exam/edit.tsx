import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import InputField from '@/components/InputField';
import { router } from 'expo-router';

export default function EditExam() {
  const [activeTab, setActiveTab] = useState('details');
  const [examDetails, setExamDetails] = useState({
    title: 'Final Exam - Advanced Mathematics',
    description: 'Comprehensive examination covering all topics from the semester',
    duration: '180',
    totalMarks: '100',
    students: '100',
    startDate: '2024-04-15',
    startTime: '09:00',
    status: 'scheduled'
  });

  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: 'mcq',
      question: 'What is the derivative of x²?',
      options: ['x', '2x', '2x²', 'x½'],
      correctOption: 1,
      marks: 5
    },
    {
      id: 2,
      type: 'descriptive',
      question: 'Explain the concept of limits in calculus.',
      marks: 10
    }
  ]);

  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const examSettings = {
    randomizeQuestions: true,
    showResultsImmediately: true,
    allowReviewAfterSubmit: true
  }

  const [allowExamSettings, setAllowExamSettings] = useState(examSettings);


  const handleSave = () => {
    Alert.alert(
      "Save Changes",
      "Are you sure you want to save these changes?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Save",
          onPress: () => {
            // Handle save logic
            Alert.alert("Success", "Changes saved successfully!");
          }
        }
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="px-6 py-8 bg-[#1a367b] dark:bg-[#0f1f4d]">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-3xl font-bold text-white mb-2">
              Edit Exam
            </Text>
            <Text className="text-gray-200 text-lg">
              {examDetails.title}
            </Text>
          </View>
          <View className={`px-3 py-1 rounded-full ${examDetails.status === 'scheduled' ? 'bg-blue-200' : 'bg-gray-200'
            }`}>
            <Text className="capitalize">{examDetails.status}</Text>
          </View>
        </View>
      </View>

      {/* Tab Navigation */}
      <View className="flex-row px-6 pt-4 border-b border-gray-200 dark:border-gray-700">
        {['details', 'questions', 'settings'].map((tab) => (
          <TouchableOpacity
            key={tab}
            className={`px-4 py-2 mr-4 ${activeTab === tab ? 'border-b-2 border-[#1a367b]' : ''
              }`}
            onPress={() => setActiveTab(tab)}
          >
            <Text className={`capitalize ${activeTab === tab
                ? 'text-[#1a367b] font-semibold'
                : 'text-gray-600 dark:text-gray-400'
              }`}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="p-6">
        {/* Details Tab */}
        {activeTab === 'details' && (
          <View>
            <InputField
              label="Title"
              value={examDetails.title}
              onChangeText={(text) => setExamDetails({ ...examDetails, title: text })}
              placeholder="Enter exam title"
              required
            />

            <InputField
              label="Description"
              value={examDetails.description}
              onChangeText={(text) => setExamDetails({ ...examDetails, description: text })}
              placeholder="Enter exam description"
              multiline
              numberOfLines={3}
            />

            <InputField
              label="Students"
              value={examDetails.students}
              onChangeText={(text) => setExamDetails({ ...examDetails, students: text })}
              placeholder="Enter total student numbers"
              required
            />

            <View className="flex-row gap-4">
              <View className="flex-1">
                <InputField
                  label="Duration (minutes)"
                  value={examDetails.duration}
                  onChangeText={(text) => setExamDetails({ ...examDetails, duration: text })}
                  keyboardType="numeric"
                  required
                />
              </View>
              <View className="flex-1">
                <InputField
                  label="Total Marks"
                  value={examDetails.totalMarks}
                  onChangeText={(text) => setExamDetails({ ...examDetails, totalMarks: text })}
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
                  onChangeText={(text) => setExamDetails({ ...examDetails, startDate: text })}
                  placeholder="YYYY-MM-DD"
                  required
                />
              </View>
              <View className="flex-1">
                <InputField
                  label="Start Time"
                  value={examDetails.startTime}
                  onChangeText={(text) => setExamDetails({ ...examDetails, startTime: text })}
                  placeholder="HH:MM"
                  required
                />
              </View>
            </View>
          </View>
        )}

        {/* Questions Tab */}
        {activeTab === 'questions' && (
          <View>
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Questions ({questions.length})
              </Text>
              <TouchableOpacity
                className="bg-[#1a367b] px-4 py-2 rounded-lg flex-row items-center"
                onPress={() => router.push('/exam/question/add')}
              >
                <FontAwesome name="plus" size={14} color="white" />
                <Text className="text-white ml-2">Add Question</Text>
              </TouchableOpacity>
            </View>

            {questions.map((question, index) => (
              <TouchableOpacity
                key={question.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm"
                onPress={() => router.push(`/exam/question/${question.id}`)}
              >
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Question {index + 1} • {question.type.toUpperCase()}
                    </Text>
                    <Text className="text-gray-900 dark:text-gray-100">
                      {question.question}
                    </Text>
                  </View>
                  <Text className="text-[#1a367b] font-semibold">
                    {question.marks} marks
                  </Text>
                </View>

                {question.type === 'mcq' && (
                  <View className="mt-2">
                    {question.options.map((option, optIndex) => (
                      <View
                        key={optIndex}
                        className="flex-row items-center mt-2"
                      >
                        <View className={`w-4 h-4 rounded-full ${optIndex === question.correctOption
                            ? 'bg-green-500'
                            : 'bg-gray-200'
                          } mr-2`} />
                        <Text className="text-gray-700 dark:text-gray-300">
                          {option}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <View>
            {/*  Settings Warning: Feature Not Implemented*/}
            <View className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mb-6">
              <Text className="text-yellow-700 dark:text-yellow-300">
                Settings Warning: Feature Not Implemented
              </Text>
            </View>
            <View className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
              <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Exam Settings
              </Text>

              <View className="gap-y-4">
                <View className="flex-row justify-between items-center">
                  <Text className="text-gray-700 dark:text-gray-300">
                    Randomize Questions
                  </Text>
                  {allowExamSettings.randomizeQuestions ? (
                    <TouchableOpacity onPress={() => setAllowExamSettings({ ...allowExamSettings, randomizeQuestions: false })} className="w-12 h-6 bg-[#1a367b] rounded-full">
                      <View className="w-5 h-5 bg-white rounded-full m-0.5 ml-auto" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setAllowExamSettings({ ...allowExamSettings, randomizeQuestions: true })} className="w-12 h-6 bg-gray-200 rounded-full">
                      <View className="w-5 h-5 bg-white rounded-full m-0.5" />
                    </TouchableOpacity>
                  )}
                </View>

                <View className="flex-row justify-between items-center">
                  <Text className="text-gray-700 dark:text-gray-300">
                    Show Results Immediately
                  </Text>
                  {allowExamSettings.showResultsImmediately ? (
                    <TouchableOpacity onPress={() => setAllowExamSettings({ ...allowExamSettings, showResultsImmediately: false })} className="w-12 h-6 bg-[#1a367b] rounded-full">
                      <View className="w-5 h-5 bg-white rounded-full m-0.5 ml-auto" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setAllowExamSettings({ ...allowExamSettings, showResultsImmediately: true })} className="w-12 h-6 bg-gray-200 rounded-full">
                      <View className="w-5 h-5 bg-white rounded-full m-0.5" />
                    </TouchableOpacity>
                  )}
                </View>

                <View className="flex-row justify-between items-center">
                  <Text className="text-gray-700 dark:text-gray-300">
                    Allow Review After Submit
                  </Text>
                  {allowExamSettings.allowReviewAfterSubmit ? (
                    <TouchableOpacity onPress={() => setAllowExamSettings({ ...allowExamSettings, allowReviewAfterSubmit: false })} className="w-12 h-6 bg-[#1a367b] rounded-full">
                      <View className="w-5 h-5 bg-white rounded-full m-0.5 ml-auto" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setAllowExamSettings({ ...allowExamSettings, allowReviewAfterSubmit: true })} className="w-12 h-6 bg-gray-200 rounded-full">
                      <View className="w-5 h-5 bg-white rounded-full m-0.5" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>

            <View className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Advanced Settings
              </Text>

              <TouchableOpacity
                className="flex-row items-center justify-between py-2"
                onPress={() => {/* Handle navigation */ }}
              >
                <Text className="text-gray-700 dark:text-gray-300">
                  Access Control
                </Text>
                <FontAwesome name="chevron-right" size={14} color="#6b7280" />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center justify-between py-2"
                onPress={() => {/* Handle navigation */ }}
              >
                <Text className="text-gray-700 dark:text-gray-300">
                  Time Restrictions
                </Text>
                <FontAwesome name="chevron-right" size={14} color="#6b7280" />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center justify-between py-2"
                onPress={() => {/* Handle navigation */ }}
              >
                <Text className="text-gray-700 dark:text-gray-300">
                  Grading Options
                </Text>
                <FontAwesome name="chevron-right" size={14} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Save Button */}
        <TouchableOpacity
          className="bg-[#1a367b] py-3 rounded-xl mt-6"
          onPress={handleSave}
        >
          <Text className="text-white text-center font-semibold">
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
