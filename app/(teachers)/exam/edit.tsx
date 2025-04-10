import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Animated, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import InputField from '@/components/InputField';
import { router, useLocalSearchParams } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchExamById, fetchQuestionsByExamId, updateExam } from '@/api/teachers';
import { Exam, Question } from '@/types';
import DateTimePicker from '@react-native-community/datetimepicker';
import { convertTo12Hour } from '@/utils/dateTimeHelpers';
import { useProfileStore } from '@/store/profileStore';
import { useQueryClient } from '@tanstack/react-query';


export default function EditExam() {
  const { id: examId } = useLocalSearchParams();

  console.log("edit exam examId", examId);

  const { profile } = useProfileStore();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('details');
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isStartTimePickerVisible, setIsStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setIsEndTimePickerVisible] = useState(false);
  const [updatedExamDetails, setUpdatedExamDetails] = useState<Exam | null>(null);

  // Handle Date Change
  const handleDateChange = (event, selectedDate: any) => {
    setStartDate(selectedDate);
    console.log("start date", selectedDate);
    setUpdatedExamDetails({ ...updatedExamDetails, startDate: selectedDate.toLocaleDateString() });
    setIsDatePickerVisible(false);
  };

  // Handle Start Time Change
  const handleStartTimeChange = (event: any, selectedTime: any) => {
    console.log("selectedTime", selectedTime);
    setStartTime(selectedTime);
    console.log("start time", selectedTime.toLocaleTimeString());
    setUpdatedExamDetails({ ...updatedExamDetails, start_time: selectedTime.toLocaleTimeString() });
    setIsStartTimePickerVisible(false);
  };

  // Handle End Time Change
  const handleEndTimeChange = (event: any, selectedTime: any) => {
    setEndTime(selectedTime);
    console.log("end time", selectedTime.toLocaleTimeString());
    setUpdatedExamDetails({ ...updatedExamDetails, end_time: selectedTime.toLocaleTimeString() });
    setIsEndTimePickerVisible(false);
  };

  //  Fetch Exam Details
  const { data: fetchedExamDetails, isLoading, error } = useQuery<Exam, Error>({
    queryKey: ['exam', examId],
    queryFn: () => fetchExamById(examId as string),
  })

  // Fetch Questions
  const { data: fetchedQuestions, isLoading: isQuestionsLoading, error: questionsError } = useQuery<Question[], Error>({
    queryKey: ['questions', examId],
    queryFn: () => fetchQuestionsByExamId(examId as string),
    enabled: activeTab === 'questions',
  })

  // Update Exam Mutation
  const { mutate: updateExamMutation } = useMutation({
    mutationFn: () => updateExam(updatedExamDetails, examId as string),
    onSuccess: () => {
      console.log("Exam updated successfully");
      queryClient.invalidateQueries({ queryKey: ['exams', profile?.id] });
      queryClient.invalidateQueries({ queryKey: ['exam', examId] });

      Alert.alert("Success", "Changes saved successfully!");
      router.push('/(teachers)/exam');
    },
    onError: (error) => {
      console.log("Error updating exam", error);
    },
  })

 

  // Set Exam Details
  useEffect(() => {
    setUpdatedExamDetails({ ...fetchedExamDetails });
    setStartDate(new Date(fetchedExamDetails?.startDate));

    // Parse start_time
    if (fetchedExamDetails?.start_time) {
      const [hours, minutes, seconds] = fetchedExamDetails.start_time.split(':').map(Number);
      const year = new Date(fetchedExamDetails?.startDate).getFullYear();
      const month = new Date(fetchedExamDetails?.startDate).getMonth();
      const day = new Date(fetchedExamDetails?.startDate).getDate();
      const startDateTime = new Date(year, month, day, hours, minutes, seconds || 0);
      setStartTime(startDateTime);
    }

    // Parse end_time
    if (fetchedExamDetails?.end_time) {
      const [hours, minutes, seconds] = fetchedExamDetails.end_time.split(':').map(Number);
      const year = new Date(fetchedExamDetails?.startDate).getFullYear();
      const month = new Date(fetchedExamDetails?.startDate).getMonth();
      const day = new Date(fetchedExamDetails?.startDate).getDate();
      const endDateTime = new Date(year, month, day, hours, minutes, seconds || 0);
      setEndTime(endDateTime);
    }
  }, [fetchedExamDetails]);



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
            console.log("updatedExamDetails", updatedExamDetails);
            updateExamMutation();
          }
        }
      ]
    );
  };

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="px-6 py-8 bg-[#1a367b] dark:bg-[#0f1f4d]">
        <View className="flex-row justify-between items-center">
          <View>
            <Text style={{ fontFamily: 'Poppins_600SemiBold' }} className="text-3xl font-bold text-white mb-2">
              Edit Exam
            </Text>
            <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-gray-200 text-lg">
              {fetchedExamDetails?.title}
            </Text>
          </View>
          <View className={`px-3 py-1 rounded-full ${fetchedExamDetails?.status === 'scheduled' ? 'bg-blue-200' : 'bg-gray-200'
            }`}>
            <Text style={{ fontFamily: 'Poppins_400Regular' }} className="capitalize">{fetchedExamDetails?.status}</Text>
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
            <View>
              <Text style={{ fontFamily: 'Poppins_600SemiBold' }} className=" text-gray-800 dark:text-gray-200">Title</Text>
              <InputField
                label="Title"
                value={updatedExamDetails?.title}
                onChangeText={(text) => setUpdatedExamDetails({ ...updatedExamDetails, title: text })}
                placeholder="Enter exam title"
                required
              />
            </View>

            <View>
              <Text style={{ fontFamily: 'Poppins_600SemiBold' }} className=" text-gray-800 dark:text-gray-200">Description</Text>
              <InputField
                label="Description"
                value={updatedExamDetails?.description}
                onChangeText={(text) => setUpdatedExamDetails({ ...updatedExamDetails, description: text })}
                placeholder="Enter exam description"
                multiline
                numberOfLines={3}
              />
            </View>

            <View>
              <Text style={{ fontFamily: 'Poppins_600SemiBold' }} className=" text-gray-800 dark:text-gray-200">Students</Text>
              <InputField
                label="Students"
                value={String(updatedExamDetails?.students)}
                onChangeText={(text) => setUpdatedExamDetails({ ...updatedExamDetails, students: text })}
                placeholder="Enter total student numbers"
                required
                keyboardType="numeric"
              />
            </View>



            <View>
              <Text style={{ fontFamily: 'Poppins_600SemiBold' }} className=" text-gray-800 dark:text-gray-200">Duration (minutes)</Text>
              <InputField
                label="Duration (minutes)"
                value={String(updatedExamDetails?.duration)}
                onChangeText={(text) => setUpdatedExamDetails({ ...updatedExamDetails, duration: text })}
                keyboardType="numeric"
                required
              />
            </View>

            <View>
              <Text style={{ fontFamily: 'Poppins_600SemiBold' }} className=" text-gray-800 dark:text-gray-200">Total Marks</Text>
              <InputField
                label="Total Marks"
                value={String(updatedExamDetails?.totalMarks)}
                onChangeText={(text) => setUpdatedExamDetails({ ...updatedExamDetails, totalMarks: text })}
                keyboardType="numeric"
                required
              />
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
              <Text style={{ fontFamily: 'Poppins_600SemiBold' }} className=" text-gray-800 dark:text-gray-200">Start Date</Text>
              <InputField
                label="Start Date"
                value={startDate.toLocaleDateString()}
                onChangeText={(text) => setUpdatedExamDetails({ ...updatedExamDetails, startDate: text })}
                placeholder="Enter Start Date"
                required
                disabled
                className="opacity-100"
              />

            </Pressable>

            <View className="flex-row gap-4">

              <Pressable onPress={() => setIsStartTimePickerVisible(true)} className="flex-1">
                <Text style={{ fontFamily: 'Poppins_600SemiBold' }} className=" text-gray-800 dark:text-gray-200">Start Time</Text>
                <InputField
                  label="Start Time"
                  value={convertTo12Hour(updatedExamDetails?.start_time)}
                  onChangeText={(text) => setUpdatedExamDetails({ ...updatedExamDetails, startTime: text })}
                  placeholder="Enter Start Time"
                  required
                  disabled
                  className="opacity-100"
                />
              </Pressable>
              <Pressable onPress={() => setIsEndTimePickerVisible(true)} className="flex-1">
                <Text style={{ fontFamily: 'Poppins_600SemiBold' }} className=" text-gray-800 dark:text-gray-200">End Time</Text>
                <InputField
                  label="End Time"
                  value={convertTo12Hour(updatedExamDetails?.end_time)}
                  onChangeText={(text) => setUpdatedExamDetails({ ...updatedExamDetails, endTime: text })}
                  placeholder="Enter End Time"
                  required
                  disabled
                  className="opacity-100"
                />
              </Pressable>
            </View>
          </View>
        )}

        {/* Questions Tab */}
        {isQuestionsLoading && <Text>Loading...</Text>}
        {questionsError && <Text>Error: {questionsError.message}</Text>}
        {activeTab === 'questions' && !isQuestionsLoading && !questionsError && (
          <View>
            <View className="flex-row justify-between items-center mb-4">
              <Text style={{ fontFamily: 'Poppins_600SemiBold' }} className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Questions ({fetchedQuestions?.length})
              </Text>
              <TouchableOpacity
                className="bg-[#1a367b] px-4 py-2 rounded-lg flex-row items-center"
                onPress={() => router.push(`/exam/question/add?examId=${examId}`)}
              >
                <FontAwesome name="plus" size={14} color="white" />
                <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-white ml-2">Add Question</Text>
              </TouchableOpacity>
            </View>

            {fetchedQuestions?.map((question, index) => (
              <TouchableOpacity
                key={question.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm"
                onPress={() => router.push(`/exam/question/${question.id}?examId=${examId}`)}
              >
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Question {index + 1} • {question.type.toUpperCase()}
                    </Text>
                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-gray-900 dark:text-gray-100">
                      {question.question}
                    </Text>
                  </View>
                  <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-[#1a367b] font-semibold">
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
                        <View className={`w-4 h-4 rounded-full ${optIndex === Number(question.correct_option)
                          ? 'bg-green-500'
                          : 'bg-gray-200'
                          } mr-2`} />
                        <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-gray-700 dark:text-gray-300">
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
              <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-yellow-700 dark:text-yellow-300">
                Settings Warning: Feature Not Implemented
              </Text>
            </View>
            <View className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
              <Text style={{ fontFamily: 'Poppins_600SemiBold' }} className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Exam Settings
              </Text>

              <View className="gap-y-4">
                <View className="flex-row justify-between items-center">
                  <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-gray-700 dark:text-gray-300">
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
                  <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-gray-700 dark:text-gray-300">
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
                  <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-gray-700 dark:text-gray-300">
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
              <Text style={{ fontFamily: 'Poppins_600SemiBold' }} className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Advanced Settings
              </Text>

              <TouchableOpacity
                className="flex-row items-center justify-between py-2"
                onPress={() => {/* Handle navigation */ }}
              >
                <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-gray-700 dark:text-gray-300">
                  Access Control
                </Text>
                <FontAwesome name="chevron-right" size={14} color="#6b7280" />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center justify-between py-2"
                onPress={() => {/* Handle navigation */ }}
              >
                <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-gray-700 dark:text-gray-300">
                  Time Restrictions
                </Text>
                <FontAwesome name="chevron-right" size={14} color="#6b7280" />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center justify-between py-2"
                onPress={() => {/* Handle navigation */ }}
              >
                <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-gray-700 dark:text-gray-300">
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
          <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-white text-center font-semibold">
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
