import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import InputField from '@/components/InputField';

interface StudentForm {
  personal: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    profileImage: string | null;
  };
  academic: {
    rollNumber: string;
    class: string;
    year: string;
    section: string;
    batch: string;
    admissionDate: string;
  };
  guardian: {
    name: string;
    relation: string;
    phone: string;
    email: string;
    occupation: string;
    address: string;
  };
  account: {
    username: string;
    password: string;
    confirmPassword: string;
  };
}

export default function AddStudent() {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState<StudentForm>({
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: 'male',
      profileImage: null,
    },
    academic: {
      rollNumber: '',
      year: '',
      class: '',
      section: '',
      batch: '',
      admissionDate: '',
    },
    guardian: {
      name: '',
      relation: '',
      phone: '',
      email: '',
      occupation: '',
      address: '',
    },
    account: {
      username: '',
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
        personal: { ...prev.personal, profileImage: result.assets[0].uri }
      }));
    }
  };

 

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <View>
            <Text style={{fontFamily: 'Poppins_600SemiBold'}}   className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Personal Information
            </Text>

            {/* Profile Image */}
            <View className="items-center mb-6">
              <TouchableOpacity onPress={pickImage}>
                <View className="relative">
                  {formData.personal.profileImage ? (
                    <Image
                      source={{ uri: formData.personal.profileImage }}
                      className="w-32 h-32 rounded-full"
                    />
                  ) : (
                    <View className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 items-center justify-center">
                      <FontAwesome name="user" size={50} color="#6b7280" />
                    </View>
                  )}
                  <View className="absolute bottom-0 right-0 bg-[#1a367b] rounded-full p-3">
                    <FontAwesome name="camera" size={16} color="white" />
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View className="flex-row gap-4">
              <View className="flex-1">
                <InputField
                  label="First Name"
                  value={formData.personal.firstName}
                  onChangeText={(text) => setFormData(prev => ({
                    ...prev,
                    personal: { ...prev.personal, firstName: text }
                  }))}
                  placeholder="Enter first name"
                  required
                />
              </View>
              <View className="flex-1">
                <InputField
                  label="Last Name"
                  value={formData.personal.lastName}
                  onChangeText={(text) => setFormData(prev => ({
                    ...prev,
                    personal: { ...prev.personal, lastName: text }
                  }))}
                  placeholder="Enter last name"
                  required
                />
              </View>
            </View>

            <InputField
              label="Email"
              value={formData.personal.email}
              onChangeText={(text) => setFormData(prev => ({
                ...prev,
                personal: { ...prev.personal, email: text }
              }))}
              placeholder="Enter email address"
              keyboardType="email-address"
              required
            />

            <InputField
              label="Phone"
              value={formData.personal.phone}
              onChangeText={(text) => setFormData(prev => ({
                ...prev,
                personal: { ...prev.personal, phone: text }
              }))}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              required
            />

            {/* Gender Selection */}
            <View className="mb-4">
              <Text style={{fontFamily: 'Poppins_400Regular'}}    className="text-gray-700 dark:text-gray-300 mb-2">
                Gender <Text className="text-red-500">*</Text>
              </Text>
              <View className="flex-row gap-4">
                {['male', 'female', 'other'].map((gender) => (
                  <TouchableOpacity
                    key={gender}
                    className={`
                      flex-1 py-3 rounded-lg border
                      ${formData.personal.gender === gender
                        ? 'bg-[#1a367b] border-[#1a367b]'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}
                    `}
                    onPress={() => setFormData(prev => ({
                      ...prev,
                      personal: { ...prev.personal, gender }
                    }))}
                  >
                    <Text className={`
                      text-center capitalize
                      ${formData.personal.gender === gender ? 'text-white' : 'text-gray-700 dark:text-gray-300'}
                    `}>
                      {gender}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        );

      case 2:
        return (
          <View>
            <Text style={{fontFamily: 'Poppins_600SemiBold'}}   className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Academic Information
            </Text>

            <InputField
              label="Roll Number"
              value={formData.academic.rollNumber}
              onChangeText={(text) => setFormData(prev => ({
                ...prev,
                academic: { ...prev.academic, rollNumber: text }
              }))}
              placeholder="Enter roll number"
              required
            />

            {/* Class Selection */}
            <View className="mb-4">
              <InputField
                label="Class"
                value={formData.academic.class}
                onChangeText={(text) => setFormData(prev => ({
                  ...prev,
                  academic: { ...prev.academic, class: text }
                }))}
                placeholder="Enter class"
                required
              />
            </View>

            {/* Section Selection */}
            <View className="mb-4">
              <Text style={{fontFamily: 'Poppins_400Regular'}}    className="text-gray-700 dark:text-gray-300 mb-2">Section</Text>
              <View className="flex-row gap-2">
                {sections.map((section) => (
                  <TouchableOpacity
                    key={section}
                    className={`
                      flex-1 py-2 rounded-lg border
                      ${formData.academic.section === section
                        ? 'bg-[#1a367b] border-[#1a367b]'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}
                    `}
                    onPress={() => setFormData(prev => ({
                      ...prev,
                      academic: { ...prev.academic, section }
                    }))}
                  >
                    <Text style={{fontFamily: 'Poppins_400Regular'}}    className={
                      formData.academic.section === section
                        ? 'text-white'
                        : 'text-gray-700 dark:text-gray-300'
                    } style={{ textAlign: 'center' }}>
                      {section}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <InputField
              label="Batch"
              value={formData.academic.batch}
              onChangeText={(text) => setFormData(prev => ({
                ...prev,
                academic: { ...prev.academic, batch: text }
              }))}
              placeholder="Enter batch (e.g., 2023-2027)"
              required
            />
          </View>
        );

      case 3:
        return (
          <View>
            <Text style={{fontFamily: 'Poppins_600SemiBold'}}   className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Guardian Information
            </Text>

            <InputField
              label="Guardian Name"
              value={formData.guardian.name}
              onChangeText={(text) => setFormData(prev => ({
                ...prev,
                guardian: { ...prev.guardian, name: text }
              }))}
              placeholder="Enter guardian's name"
              required
            />

            <InputField
              label="Relation"
              value={formData.guardian.relation}
              onChangeText={(text) => setFormData(prev => ({
                ...prev,
                guardian: { ...prev.guardian, relation: text }
              }))}
              placeholder="Enter relation (e.g., Father, Mother)"
              required
            />

            <InputField
              label="Phone"
              value={formData.guardian.phone}
              onChangeText={(text) => setFormData(prev => ({
                ...prev,
                guardian: { ...prev.guardian, phone: text }
              }))}
              placeholder="Enter guardian's phone number"
              keyboardType="phone-pad"
              required
            />

            <InputField
              label="Email"
              value={formData.guardian.email}
              onChangeText={(text) => setFormData(prev => ({
                ...prev,
                guardian: { ...prev.guardian, email: text }
              }))}
              placeholder="Enter guardian's email"
              keyboardType="email-address"
            />

            <InputField
              label="Occupation"
              value={formData.guardian.occupation}
              onChangeText={(text) => setFormData(prev => ({
                ...prev,
                guardian: { ...prev.guardian, occupation: text }
              }))}
              placeholder="Enter guardian's occupation"
            />

            <InputField
              label="Address"
              value={formData.guardian.address}
              onChangeText={(text) => setFormData(prev => ({
                ...prev,
                guardian: { ...prev.guardian, address: text }
              }))}
              placeholder="Enter guardian's address"
              multiline
            />
          </View>
        );

      case 4:
        return (
          <View>
            <Text style={{fontFamily: 'Poppins_600SemiBold'}}   className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Account Setup
            </Text>

            <InputField
              label="Username"
              value={formData.account.username}
              onChangeText={(text) => setFormData(prev => ({
                ...prev,
                account: { ...prev.account, username: text }
              }))}
              placeholder="Enter username"
              required
            />

            <InputField
              label="Password"
              value={formData.account.password}
              onChangeText={(text) => setFormData(prev => ({
                ...prev,
                account: { ...prev.account, password: text }
              }))}
              placeholder="Enter password"
              secureTextEntry
              required
            />

            <InputField
              label="Confirm Password"
              value={formData.account.confirmPassword}
              onChangeText={(text) => setFormData(prev => ({
                ...prev,
                account: { ...prev.account, confirmPassword: text }
              }))}
              placeholder="Confirm password"
              secureTextEntry
              required
            />

            <View className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4">
              <Text style={{fontFamily: 'Poppins_400Regular'}}    className="text-blue-800 dark:text-blue-200">
                Password requirements:
              </Text>
              <View className="mt-2 space-y-1">
                <Text style={{fontFamily: 'Poppins_400Regular'}}    className="text-blue-700 dark:text-blue-300">• Minimum 8 characters</Text>
                <Text style={{fontFamily: 'Poppins_400Regular'}}    className="text-blue-700 dark:text-blue-300">• At least one uppercase letter</Text>
                <Text style={{fontFamily: 'Poppins_400Regular'}}    className="text-blue-700 dark:text-blue-300">• At least one number</Text>
                <Text style={{fontFamily: 'Poppins_400Regular'}}    className="text-blue-700 dark:text-blue-300">• At least one special character</Text>
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
        <Text style={{fontFamily: 'Poppins_600SemiBold'}}    className="text-3xl font-bold text-white mb-2">
          Add New Student
        </Text>
        <Text style={{fontFamily: 'Poppins_400Regular'}}    className="text-gray-200 text-lg">
          Step {activeStep} of 4
        </Text>
      </View>

      {/* Progress Bar */}
      <View className="px-6 pt-4">
        <View className="h-2 bg-gray-200 rounded-full">
          <View 
            className="h-full bg-[#1a367b] rounded-full"
            style={{ width: `${(activeStep / 4) * 100}%` }}
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
              <Text style={{fontFamily: 'Poppins_400Regular'}}    className="text-gray-700 text-center font-semibold">
                Previous
              </Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            className="flex-1 bg-[#1a367b] py-3 rounded-xl"
            onPress={() => {
              if (activeStep < 4) {
                setActiveStep(activeStep + 1);
              } else {
                Alert.alert('Success', 'Student added successfully!');
                // Handle form submission
              }
            }}
          >
            <Text style={{fontFamily: 'Poppins_400Regular'}}    className="text-white text-center font-semibold">
              {activeStep === 4 ? 'Add Student' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
