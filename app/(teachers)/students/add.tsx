import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import InputField from '@/components/InputField';

interface FormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
    profileImage: string | null;
  };
  academicInfo: {
    rollNumber: string;
    class: string;
    year: string;
    section: string;
    batch: string;
    username: string;
  };
  accountInfo: {
    password: string;
    confirmPassword: string;
  };
}

export default function AddStudent() {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: 'male',
      profileImage: null,
    },
    academicInfo: {
      username: '',
      rollNumber: '',
      class: '',
      year: '',
      section: '',
      batch: '',
    },
    accountInfo: {
      password: '',
      confirmPassword: '',
    },
  });

  
  const sections = ['A', 'B', 'C', 'D'];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          profileImage: result.assets[0].uri,
        },
      }));
    }
  };



  const SelectField = ({
    label,
    value,
    options,
    onChange,
    required = false
  }) => (
    <View className="mb-4">
      <Text className="text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && <Text className="text-red-500">*</Text>}
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            className={`
              px-4 py-2 rounded-lg
              ${value === option
                ? 'bg-[#1a367b]'
                : 'bg-gray-100 dark:bg-gray-700'
              }
            `}
            onPress={() => onChange(option)}
          >
            <Text className={
              value === option
                ? 'text-white'
                : 'text-gray-700 dark:text-gray-300'
            }>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <View>
            <Text className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Personal Information
            </Text>

            {/* Profile Image Upload */}
            <TouchableOpacity
              className="items-center mb-6"
              onPress={pickImage}
            >
              <View className="relative">
                {formData.personalInfo.profileImage ? (
                  <Image
                    source={{ uri: formData.personalInfo.profileImage }}
                    className="w-24 h-24 rounded-full"
                  />
                ) : (
                  <View className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 items-center justify-center">
                    <FontAwesome name="user" size={40} color="#6b7280" />
                  </View>
                )}
                <View className="absolute bottom-0 right-0 bg-[#1a367b] rounded-full p-2">
                  <FontAwesome name="camera" size={14} color="white" />
                </View>
              </View>
              <Text className="text-[#1a367b] mt-2">Upload Photo</Text>
            </TouchableOpacity>
            <View className=" flex-1">

              <InputField
                label="Username"
                className="mb-4 flex-1"
                value={formData.academicInfo.username}
                onChangeText={(text) => setFormData(prev => ({
                  ...prev,
                  academicInfo: { ...prev.academicInfo, username: text }
                }))}
                placeholder="Enter username"
                required
              />
            </View>
            <View className="flex-row gap-4">

              <View className="flex-1">
                <InputField
                  label="First Name"
                  value={formData.personalInfo.firstName}
                  onChangeText={(text) => setFormData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, firstName: text }
                  }))}
                  placeholder="Enter first name"
                  required
                />
              </View>
              <View className="flex-1">
                <InputField
                  label="Last Name"
                  value={formData.personalInfo.lastName}
                  onChangeText={(text) => setFormData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, lastName: text }
                  }))}
                  placeholder="Enter last name"
                  required
                />
              </View>
            </View>

            <InputField
              label="Email"
              value={formData.personalInfo.email}
              onChangeText={(text) => setFormData(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, email: text }
              }))}
              placeholder="Enter email address"
              keyboardType="email-address"
              required
            />

            <InputField
              label="Phone Number"
              value={formData.personalInfo.phone}
              onChangeText={(text) => setFormData(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, phone: text }
              }))}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />

            <SelectField
              label="Gender"
              value={formData.personalInfo.gender}
              options={['male', 'female', 'other']}
              onChange={(value) => setFormData(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, gender: value }
              }))}
              required
            />
          </View>
        );

      case 2:
        return (
          <View>
            <Text className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Academic Information
            </Text>

            <Text className="text-gray-700 dark:text-gray-300 mb-1">Roll Number</Text>
            <InputField
              label="Roll Number"
              value={formData.academicInfo.rollNumber}
              onChangeText={(text) => setFormData(prev => ({
                ...prev,
                academicInfo: { ...prev.academicInfo, rollNumber: text }
              }))}
              placeholder="Enter roll number"
              required
            />
            <View className="flex-1">
              <Text className="text-gray-700 dark:text-gray-300 mb-1">Class</Text>
              <InputField
                label="Class"
                value={formData.academicInfo.class}
                onChangeText={(text) => setFormData(prev => ({
                  ...prev,
                  academicInfo: { ...prev.academicInfo, class: text }
                }))}
                placeholder="Enter class"
                required
              />
            </View>

            <View className="flex-col gap-4">
              <View className="">
                <SelectField
                  label="Section"
                  value={formData.academicInfo.section}
                  options={sections}
                  onChange={(value) => setFormData(prev => ({
                    ...prev,
                    academicInfo: { ...prev.academicInfo, section: value }
                  }))}
                  required
                />
              </View>
              <View className="">
                <Text className="text-gray-700 dark:text-gray-300 mb-1">Batch Year</Text>
                <InputField
                  label="Batch"
                  value={formData.academicInfo.batch}
                  onChangeText={(text) => setFormData(prev => ({
                    ...prev,
                    academicInfo: { ...prev.academicInfo, batch: text }
                  }))}
                  placeholder="Enter batch year"
                  required
                />
              </View>
            </View>
          </View>
        );

      case 3:
        return (
          <View>
            <Text className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Account Setup
            </Text>

            <InputField
              label="Password"
              value={formData.accountInfo.password}
              onChangeText={(text) => setFormData(prev => ({
                ...prev,
                accountInfo: { ...prev.accountInfo, password: text }
              }))}
              placeholder="Enter password"
              secureTextEntry
              required
            />

            <InputField
              label="Confirm Password"
              value={formData.accountInfo.confirmPassword}
              onChangeText={(text) => setFormData(prev => ({
                ...prev,
                accountInfo: { ...prev.accountInfo, confirmPassword: text }
              }))}
              placeholder="Confirm password"
              secureTextEntry
              required
            />

            <View className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4">
              <Text className="text-blue-800 dark:text-blue-200">
                Password must contain:
              </Text>
              <View className="mt-2 space-y-1">
                <Text className="text-blue-700 dark:text-blue-300">• At least 8 characters</Text>
                <Text className="text-blue-700 dark:text-blue-300">• One uppercase letter</Text>
                <Text className="text-blue-700 dark:text-blue-300">• One number</Text>
                <Text className="text-blue-700 dark:text-blue-300">• One special character</Text>
              </View>
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
          Add New Student
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

      {/* Form Content */}
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
                Alert.alert('Success', 'Student added successfully!');
                // Handle form submission
              }
            }}
          >
            <Text className="text-white text-center font-semibold">
              {activeStep === 3 ? 'Add Student' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
