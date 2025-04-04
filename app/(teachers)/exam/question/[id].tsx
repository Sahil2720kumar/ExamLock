import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import InputField from '@/components/InputField';



export default function QuestionEdit() {
  const [question, setQuestion] = useState({
    id: 1,
    type: 'mcq',
    question: 'What is the derivative of x²?',
    options: ['x', '2x', '2x²', 'x½'],
    correctOption: 1,
    marks: 5,
    explanation: 'The derivative of x² is 2x because...',
    difficulty: 'medium',
    tags: ['calculus', 'derivatives'],
    imageUrl: null,
    solutionImageUrl: null,
  });

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

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="px-6 py-8 bg-[#1a367b] dark:bg-[#0f1f4d]">
        <View className="flex-row justify-between items-center">
          <Text className="text-3xl font-bold text-white">
            Edit Question
          </Text>
          <View className="flex-row gap-3">
            <TouchableOpacity
              className="bg-white/20 px-4 py-2 rounded-lg"
              onPress={() => setIsPreviewMode(!isPreviewMode)}
            >
              <Text className="text-white">
                {isPreviewMode ? 'Edit Mode' : 'Preview'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-red-500 px-4 py-2 rounded-lg">
              <Text className="text-white" >Delete</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>

      <View className="p-6">
        {!isPreviewMode ? (
          <>
            {/* Question Type Selection */}
            <View className="mb-6">
              <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                Question Type
              </Text>
              <View className="flex-row flex-wrap gap-3">
                {questionTypes.map((type) => (
                  <TouchableOpacity
                    key={type.id}
                    className={`
                      flex-row items-center px-4 py-2 rounded-lg
                      ${question.type === type.id
                        ? 'bg-[#1a367b]'
                        : 'bg-white dark:bg-gray-800'
                      }
                    `}
                    onPress={() => setQuestion(prev => ({ ...prev, type: type.id }))}
                  >
                    <FontAwesome
                      name={type.icon}
                      size={16}
                      color={question.type === type.id ? 'white' : '#6b7280'}
                    />
                    <Text className={`
                      ml-2
                      ${question.type === type.id
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
                value={question.question}
                onChangeText={(text) => setQuestion(prev => ({ ...prev, question: text }))}
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
                {question.imageUrl ? (
                  <View>
                    <Image
                      source={{ uri: question.imageUrl }}
                      className="w-full h-40 rounded-lg"
                      resizeMode="cover"
                    />
                    <TouchableOpacity
                      className="absolute top-2 right-2 bg-red-500 rounded-full p-2"
                      onPress={() => setQuestion(prev => ({ ...prev, imageUrl: null }))}
                    >
                      <FontAwesome name="trash" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    <FontAwesome name="image" size={24} color="#6b7280" />
                    <Text className="text-gray-500 mt-2">Add Image (Optional)</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Options Section for MCQ */}
            {question.type === 'mcq' && (
              <View className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6">
                <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Options
                </Text>
                {question.options.map((option, index) => (
                  <View key={index} className="flex-row items-center mb-3">
                    <TouchableOpacity
                      className={`
                        w-6 h-6 rounded-full border-2 mr-3
                        ${question.correctOption === index
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300'
                        }
                        justify-center items-center
                      `}
                      onPress={() => setQuestion(prev => ({ ...prev, correctOption: index }))}
                    >
                      {question.correctOption === index && (
                        <FontAwesome name="check" size={12} color="white" />
                      )}
                    </TouchableOpacity>
                    <InputField
                      label={`Option ${index + 1}`}
                      value={option}
                      onChangeText={(text) => {
                        const newOptions = [...question.options];
                        newOptions[index] = text;
                        setQuestion(prev => ({ ...prev, options: newOptions }));
                      }}
                      placeholder={`Option ${index + 1}`}
                    />
                  </View>
                ))}
                <TouchableOpacity
                  className="flex-row items-center justify-center mt-2"
                  onPress={() => setQuestion(prev => ({
                    ...prev,
                    options: [...prev.options, '']
                  }))}
                >
                  <FontAwesome name="plus" size={14} color="#1a367b" />
                  <Text className="text-[#1a367b] ml-2">Add Option</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Additional Settings */}
            <View className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6">
              <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                Settings
              </Text>

              {/* Marks */}
              <View className="mb-4">
                <Text className="text-gray-600 dark:text-gray-400 mb-2">Marks</Text>
                <InputField
                  value={question.marks.toString()}
                  onChangeText={(text) => setQuestion(prev => ({
                    ...prev,
                    marks: parseInt(text) || 1
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
            <Text className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Question Preview
            </Text>
            {/* Preview content here */}
            <View className="flex flex-row justify-between">
              <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">{question.question}</Text>
              <Text className="text-gray-700 dark:text-gray-300">Marks: {question.marks}</Text>
            </View>
            {question.imageUrl && (
              <Image
                source={{ uri: question.imageUrl }}
                className="w-full h-40 rounded-lg"
                resizeMode="cover"
              />
            )}
            {question.type === 'mcq' && question.options.map((option, index) => (
              <View key={index} className="flex-row items-center mb-3">
                <TouchableOpacity
                  className={`
                    w-6 h-6 rounded-full border-2 mr-3
                    ${question.correctOption === index
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300'
                    }
                    justify-center items-center 
                  `}
                >
                  {question.correctOption === index && (
                    <FontAwesome name="check" size={12} color="white" />
                  )}
                </TouchableOpacity>
                <Text className="text-gray-700 dark:text-gray-300">{option}</Text>
              </View>
            ))}

            {(question.type === 'descriptive' || question.type === 'image') && (
              <Image
                source={{ uri: 'https://www.alexbirkett.com/wp-content/uploads/2022/11/iamalexbirkett_jacked_aliens_wandering_through_lord_of_the_ring_0bee4dd7-c4a1-4f73-9b1b-f407f052054f.png' }}
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
            onPress={() => Alert.alert('Discard Changes?')}
          >
            <Text className="text-gray-700 text-center font-semibold">
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-[#1a367b] py-3 rounded-xl"
            onPress={() => Alert.alert('Success', 'Question saved successfully!')}
          >
            <Text className="text-white text-center font-semibold">
              Save Question
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
