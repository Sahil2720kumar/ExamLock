import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import InputField from '@/components/InputField';
import { useLocalSearchParams } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchQuestionById, updateQuestionById, deleteQuestion } from '@/api/teachers';
import { Question } from '@/types';
import { router } from 'expo-router';


export default function QuestionEdit() {
  const { id: questionId, examId } = useLocalSearchParams();

  const queryClient = useQueryClient();
  const [updatedQuestion, setUpdatedQuestion] = useState<Question>();

  const { data: fetchedQuestion, isLoading: isQuestionLoading, error: questionError } = useQuery({
    queryKey: ['question', questionId],
    queryFn: () => fetchQuestionById(questionId as string),
  });

  const { mutate: updateQuestionMutation, isPending: isUpdating } = useMutation({
    mutationFn: (question: Question) => updateQuestionById(question, questionId as string),
    onSuccess: () => {
      console.log("Question updated successfully");
      queryClient.invalidateQueries({ queryKey: ['questions', examId] });
      router.back();
    },
    onError: (error) => {
      console.log("Error updating question:", error);
    }
  });

  const { mutate: deleteQuestionMutation, isPending: isDeleting } = useMutation({
    mutationFn: (questionId: string) => deleteQuestion(questionId),
    onSuccess: () => {
      console.log("Question deleted successfully");
      queryClient.invalidateQueries({ queryKey: ['questions', examId] });
      router.back();
    },
    onError: (error) => {
      console.log("Error deleting question:", error);
    }
  });

  useEffect(() => {
    if (fetchedQuestion) {
      setUpdatedQuestion(fetchedQuestion);
    }
  }, [fetchedQuestion]);

  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const questionTypes = [
    { id: 'mcq', label: 'Multiple Choice', icon: 'list' },
    { id: 'descriptive', label: 'Descriptive', icon: 'pencil' },
    { id: 'image', label: 'Image Based', icon: 'image' },
  ];

  const difficultyLevels = [
    { id: 'easy', color: 'bg-green-500' },
    { id: 'medium', color: 'bg-yellow-500' },
    { id: 'hard', color: 'bg-red-500' },
  ];

  const pickImage = async (type: 'question' | 'solution') => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setQuestion(prev => ({
        ...prev,
        [type === 'question' ? 'imageUrl' : 'solutionImageUrl']: result.assets[0].uri
      }));
    }
  };

  const updateQuestionHandler = () => {
    console.log("updatedQuestion",updatedQuestion);
    updateQuestionMutation(updatedQuestion as Question);
  }

  const deleteQuestionHandler = () => {
    console.log("deletedQuestion",updatedQuestion);
    deleteQuestionMutation(questionId as string);
  }

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View  className={`bg-red-500 p-1 ${isDeleting ? 'block' : 'hidden'}`}>
          <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-center font-bold text-white">
            Deleting Question...
          </Text>
        </View>
      <View className="px-6 py-8 bg-[#1a367b] dark:bg-[#0f1f4d]">
        <View className="flex-row justify-between items-center">
          <Text  style={{fontFamily: 'Poppins_600SemiBold'}} className="text-3xl font-bold text-white">
            Edit Question
          </Text>
          <View className="flex-row gap-3">
            <TouchableOpacity
              className="bg-white/20 px-4 py-2 rounded-lg"
              onPress={() => setIsPreviewMode(!isPreviewMode)}
            >
              <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-white">
                {isPreviewMode ? 'Edit Mode' : 'Preview'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteQuestionHandler()} disabled={isDeleting} className="bg-red-500 px-4 py-2 rounded-lg">
              <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-white" >{isDeleting ? 'Deleting...' : 'Delete'}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>

      <View className="p-6">
        {!isPreviewMode ? (
          <>
            {/* Question Type Selection */}
            <View className="mb-6">
              <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                Question Type
              </Text>
              <View className="flex-row flex-wrap gap-3">
                {questionTypes.map((type) => (
                  <TouchableOpacity
                    key={type.id}
                    className={`
                      flex-row items-center px-4 py-2 rounded-lg
                      ${updatedQuestion?.type === type.id
                        ? 'bg-[#1a367b]'
                        : 'bg-white dark:bg-gray-800'
                      }
                    `}
                    onPress={() => setUpdatedQuestion(prev => ({ ...prev, type: type.id }) as Question)}
                  >
                    <FontAwesome
                      name={type.icon}
                      size={16}
                      color={updatedQuestion?.type === type.id ? 'white' : '#6b7280'}
                    />
                    <Text style={{fontFamily: 'Poppins_400Regular'}} className={`
                      ml-2
                      ${updatedQuestion?.type === type.id
                        ? 'text-white'
                        : 'text-gray-700 dark:text-gray-300'
                      }
                    `}>
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Question Content */}
            <View className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6">
              <InputField
                label="Question Text"
                value={updatedQuestion?.question}
                onChangeText={(text) => setUpdatedQuestion(prev => ({ ...prev, question: text } as Question))}
                placeholder="Enter your question"
                multiline
                numberOfLines={3}
                required
              />

              {/* Image Upload for Question */}
              <TouchableOpacity
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 mt-4 items-center"
                onPress={() => pickImage('question')}
              >
                {updatedQuestion?.image_url ? (
                  <View>
                    <Image
                      source={{ uri: updatedQuestion?.image_url }}
                      className="w-full h-40 rounded-lg"
                      resizeMode="cover"
                    />
                    <TouchableOpacity
                      className="absolute top-2 right-2 bg-red-500 rounded-full p-2"
                      onPress={() => setUpdatedQuestion(prev => ({ ...prev, image_url: null } as Question))}
                    >
                      <FontAwesome name="trash" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    <FontAwesome name="image" size={24} color="#6b7280" />
                    <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-500 mt-2">Add Image (Optional)</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Options Section for MCQ */}
            {updatedQuestion?.type === 'mcq' && (
              <View className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6">
                <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Options
                </Text>
                {updatedQuestion?.options?.map((option, index) => (
                  <View key={index} className="flex-row items-center mb-3">
                    <TouchableOpacity
                      className={`
                        w-6 h-6 rounded-full border-2 mr-3
                        ${Number(updatedQuestion?.correct_option) === index
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300'
                        }
                        justify-center items-center
                      `}
                      onPress={() => setUpdatedQuestion(prev => ({ ...prev, correct_option: index } as Question))}
                    >
                      {Number(updatedQuestion?.correct_option) === index && (
                        <FontAwesome name="check" size={12} color="white" />
                      )}
                    </TouchableOpacity>
                    <InputField
                      label={`Option ${index + 1}`}
                      value={option}
                      onChangeText={(text) => {
                        const newOptions = [...updatedQuestion?.options];
                        newOptions[index] = text;
                        setUpdatedQuestion(prev => ({ ...prev, options: newOptions } as Question));
                      }}
                      placeholder={`Option ${index + 1}`}
                    />
                  </View>
                ))}
                <TouchableOpacity
                  className="flex-row items-center justify-center mt-2"
                  onPress={() => setUpdatedQuestion(prev => ({
                    ...prev,
                    options: [...prev.options, '']
                  } as Question ))}
                >
                  <FontAwesome name="plus" size={14} color="#1a367b" />
                  <Text style={{fontFamily: 'Poppins_400Regular'}}  className="text-[#1a367b] ml-2">Add Option</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Additional Settings */}
            <View className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6">
              <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                Settings
              </Text>

              {/* Marks */}
              <View className="mb-4">
                <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-600 dark:text-gray-400 mb-2">Marks</Text>
                <InputField
                  value={updatedQuestion?.marks?.toString()}
                  onChangeText={(text) => setUpdatedQuestion(prev => ({
                    ...prev,
                    marks: parseInt(text) || 0
                  }))}
                  placeholder="Enter marks"
                  keyboardType="numeric"
                  required
                />
              </View>

              {/* Difficulty Level */}
              {/* <Text className="text-gray-600 dark:text-gray-400 mb-2">
                Difficulty Level
              </Text>
              <View className="flex-row gap-3 mb-4">
                {difficultyLevels.map(level => (
                  <TouchableOpacity
                    key={level.id}
                    className={`
                      px-4 py-2 rounded-lg capitalize
                      ${question.difficulty === level.id ? level.color : 'bg-gray-200'}
                    `}
                    onPress={() => setQuestion(prev => ({ ...prev, difficulty: level.id }))}
                  >
                    <Text className={question.difficulty === level.id ? 'text-white' : 'text-gray-700'}>
                      {level.id}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View> */}

              {/* Tags */}
              {/* <View className="mb-4">
                <InputField
                  label="Tags (comma separated)"
                  value={question.tags.join(', ')}
                  onChangeText={(text) => setQuestion(prev => ({
                    ...prev,
                    tags: text.split(',').map(tag => tag.trim())
                  }))}
                  placeholder="calculus, derivatives, etc."
                />
              </View> */}

              {/* Explanation */}
              {/* <InputField
                label="Explanation"
                value={question.explanation}
                onChangeText={(text) => setQuestion(prev => ({ ...prev, explanation: text }))}
                placeholder="Explain the correct answer"
                multiline
                numberOfLines={3}
              /> */}
            </View>
          </>
        ) : (
          // Preview Mode
          <View className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Question Preview
            </Text>
            {/* Preview content here */}
            <View className="flex flex-row justify-between">
              <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">{updatedQuestion?.question}</Text>
              <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-700 dark:text-gray-300">Marks: {updatedQuestion?.marks}</Text>
            </View>
              {updatedQuestion?.image_url && (
              <Image
                source={{ uri: updatedQuestion?.image_url }}
                className="w-full h-40 rounded-lg"
                resizeMode="cover"
              />
            )}
            {updatedQuestion?.type === 'mcq' && updatedQuestion?.options?.map((option, index) => (
              <View key={index} className="flex-row items-center mb-3">
                <TouchableOpacity
                  className={`
                    w-6 h-6 rounded-full border-2 mr-3
                    ${Number(updatedQuestion?.correct_option) === index
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300'
                    }
                    justify-center items-center 
                  `}
                >
                  {Number(updatedQuestion?.correct_option) === index && (
                    <FontAwesome name="check" size={12} color="white" />
                  )}
                </TouchableOpacity>
                <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-700 dark:text-gray-300">{option}</Text>
              </View>
            ))}

              {(updatedQuestion?.type === 'descriptive' || updatedQuestion?.type === 'image') && (
              <Image
                source={{ uri: updatedQuestion?.image_url }}
                className="w-full h-40 rounded-lg min-h-40 "
                resizeMode="cover"
              />
            )}

          </View>
        )}

        {/* Action Buttons */}
        <View className="flex-row gap-3 mt-6">
          <TouchableOpacity
            className="flex-1 bg-gray-200 py-3 rounded-xl"
            onPress={() => router.back()}
          >
            <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-700 text-center font-semibold">
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-[#1a367b] py-3 rounded-xl"
            onPress={updateQuestionHandler}
            disabled={isUpdating}
          >
            <Text style={{fontFamily: 'Poppins_400Regular'}}  className="text-white text-center font-semibold">
              {isUpdating ? 'Saving...' : 'Save Question'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
