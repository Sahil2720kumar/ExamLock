import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import InputField from '@/components/InputField';


export default function AddQuestion() {
  const [activeStep, setActiveStep] = useState(1);
  const [question, setQuestion] = useState({
    type: 'mcq',
    question: '',
    options: ['', '', '', ''],
    correctOption: 0,
    marks: 0,
    explanation: '',
    difficulty: 'medium',
    tags: [],
    imageUrl: null,
    solutionImageUrl: null,
  });

  const questionTypes = [
    { 
      id: 'mcq', 
      label: 'Multiple Choice', 
      icon: 'list',
      description: 'Create a question with multiple options'
    },
    { 
      id: 'descriptive', 
      label: 'Descriptive', 
      icon: 'pencil',
      description: 'Long form answers and explanations'
    },
    { 
      id: 'image', 
      label: 'Image Based', 
      icon: 'image',
      description: 'Upload an image with your question'
    }
  ];

  const difficultyLevels = [
    { id: 'easy', color: 'bg-green-500', label: 'Easy' },
    { id: 'medium', color: 'bg-yellow-500', label: 'Medium' },
    { id: 'hard', color: 'bg-red-500', label: 'Hard' },
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

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <View className="space-y-4">
            <Text className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Select Question Type
            </Text>
            {questionTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                className={`
                  bg-white dark:bg-gray-800 rounded-xl p-4
                  ${question.type === type.id ? 'border-2 border-[#1a367b]' : ''}
                `}
                onPress={() => setQuestion(prev => ({ ...prev, type: type.id }))}
              >
                <View className="flex-row items-center">
                  <View className={`
                    w-10 h-10 rounded-full 
                    ${question.type === type.id ? 'bg-[#1a367b]' : 'bg-gray-100 dark:bg-gray-700'}
                    justify-center items-center
                  `}>
                    <FontAwesome 
                      name={type.icon} 
                      size={20} 
                      color={question.type === type.id ? 'white' : '#6b7280'} 
                    />
                  </View>
                  <View className="ml-3 flex-1">
                    <Text className="font-semibold text-gray-800 dark:text-gray-200">
                      {type.label}
                    </Text>
                    <Text className="text-gray-500 dark:text-gray-400 text-sm">
                      {type.description}
                    </Text>
                  </View>
                  <FontAwesome 
                    name="chevron-right" 
                    size={16} 
                    color="#6b7280" 
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 2:
        return (
          <View className="space-y-6">
            <Text className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Question Content
            </Text>
            
            <View className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <InputField
                label="Question Text"
                value={question.question}
                onChangeText={(text) => setQuestion(prev => ({ ...prev, question: text }))}
                placeholder="Enter your question here"
                multiline
                numberOfLines={3}
                required
              />

              <TouchableOpacity
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 mt-4"
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
                  <View className="items-center">
                    <FontAwesome name="image" size={24} color="#6b7280" />
                    <Text className="text-gray-500 mt-2">Add Image (Optional)</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {question.type === 'mcq' && (
              <View className="bg-white dark:bg-gray-800 rounded-xl p-4">
                <Text className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Answer Options
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
                    <View className="flex-1">
                      <InputField
                        value={option}
                        onChangeText={(text) => {
                          const newOptions = [...question.options];
                          newOptions[index] = text;
                          setQuestion(prev => ({ ...prev, options: newOptions }));
                        }}
                        placeholder={`Option ${index + 1}`}
                      />
                    </View>
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
          </View>
        );

      case 3:
        return (
          <View className="space-y-6">
            <Text className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Additional Details
            </Text>

            <View className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <View className="mb-4">
                <Text className="text-gray-600 dark:text-gray-400 mb-2">Marks</Text>
                <InputField
                  label="Marks"
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

              {/* <Text className="text-gray-600 dark:text-gray-400 mb-2">
                Difficulty Level
              </Text>
              <View className="flex-row gap-3 mb-4">
                {difficultyLevels.map(level => (
                  <TouchableOpacity
                    key={level.id}
                    className={`
                      flex-1 px-4 py-2 rounded-lg
                      ${question.difficulty === level.id ? level.color : 'bg-gray-200'}
                      justify-center items-center
                    `}
                    onPress={() => setQuestion(prev => ({ ...prev, difficulty: level.id }))}
                  >
                    <Text className={
                      question.difficulty === level.id ? 'text-white font-medium' : 'text-gray-700'
                    }>
                      {level.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <InputField
                label="Tags (comma separated)"
                value={question.tags.join(', ')}
                onChangeText={(text) => setQuestion(prev => ({
                  ...prev,
                  tags: text.split(',').map(tag => tag.trim())
                }))}
                placeholder="e.g., math, algebra, equations"
              />

              <InputField
                label="Explanation"
                value={question.explanation}
                onChangeText={(text) => setQuestion(prev => ({ ...prev, explanation: text }))}
                placeholder="Explain the correct answer"
                multiline
                numberOfLines={3}
              /> */}
            </View>
          </View>
        );
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="px-6 py-8 bg-[#1a367b] dark:bg-[#0f1f4d]">
        <Text className="text-3xl font-bold text-white mb-2">
          Add New Question
        </Text>
        <Text className="text-gray-200 text-lg">
          Step {activeStep} of 3
        </Text>
      </View>

      {/* Progress Bar */}
      <View className="px-6 pt-4">
        <View className="h-2 bg-gray-200 rounded-full">
          <View 
            className="h-full bg-[#1a367b] rounded-full"
            style={{ width: `${(activeStep / 3) * 100}%` }}
          />
        </View>
      </View>

      {/* Content */}
      <View className="p-6">
        {renderStepContent()}

        {/* Navigation Buttons */}
        <View className="flex-row gap-3 mt-8">
          {activeStep > 1 && (
            <TouchableOpacity
              className="flex-1 bg-gray-200 py-3 rounded-xl"
              onPress={() => setActiveStep(activeStep - 1)}
            >
              <Text className="text-gray-700 text-center font-semibold">
                Previous
              </Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            className="flex-1 bg-[#1a367b] py-3 rounded-xl"
            onPress={() => {
              if (activeStep < 3) {
                setActiveStep(activeStep + 1);
              } else {
                Alert.alert('Success', 'Question added successfully!');
                // Handle question submission
              }
            }}
          >
            <Text className="text-white text-center font-semibold">
              {activeStep === 3 ? 'Add Question' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
